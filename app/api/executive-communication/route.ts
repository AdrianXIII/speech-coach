import { NextRequest, NextResponse } from "next/server";
import { evaluateExecutiveComm } from "@/lib/executiveCommEngine";
import { saveAttempt, listAttempts } from "@/lib/executiveCommHistory";
import { geminiErrorResponse } from "@/lib/gemini";
import { hasDatabase } from "@/lib/db";
import { requireUser, requireApiUser } from "@/lib/requireUser";
import { checkRateLimit } from "@/lib/rateLimit";
import { isPremium } from "@/lib/subscription";
import { canUseToday, markUsedToday } from "@/lib/usageLimitServer";
import { execModelsForLanguage } from "@/lib/structureModels";
import { scenariosForLanguage, RECOMMENDED_SECONDS } from "@/lib/executiveCommScenarios";
import { getLanguage, LANGUAGES, type LanguageCode } from "@/lib/languages";

const MAX_CUSTOM_PROMPT_CHARS = 600;
const ALLOWED_SECONDS = [30, 60, 90];
const MAX_AUDIO_BYTES = 15 * 1024 * 1024;
export const maxDuration = 60;
const FEATURE = "execcomm";

/** GET /api/executive-communication — recent attempt scores for the signed-in account's progress panel. */
export async function GET() {
  if (!hasDatabase()) {
    return NextResponse.json({ attempts: [], databaseConfigured: false });
  }
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const attempts = await listAttempts(user.id);
  return NextResponse.json({ attempts, databaseConfigured: true });
}

/**
 * POST /api/executive-communication
 * multipart/form-data: audio, modelId, language, targetSeconds, and either
 * scenarioId (looked up server-side, not trusted from the client — same as
 * app/api/tutor/evaluate/route.ts's caseId) or customPrompt (the user's own
 * real situation, length-capped).
 */
export async function POST(req: NextRequest) {
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;
  const user = gate;

  if (!(await checkRateLimit(String(user.id)))) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  const premium = await isPremium(user.id);
  if (!premium && !(await canUseToday(user.id, FEATURE))) {
    return NextResponse.json({ error: "Free daily use already used today.", upgradeUrl: "/pricing" }, { status: 402 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const audio = formData.get("audio");
  const modelId = formData.get("modelId")?.toString();
  const scenarioId = formData.get("scenarioId")?.toString();
  const customPrompt = formData.get("customPrompt")?.toString().trim().slice(0, MAX_CUSTOM_PROMPT_CHARS);
  const languageRaw = formData.get("language")?.toString();
  const targetRaw = Number(formData.get("targetSeconds"));

  if (!audio || !(audio instanceof Blob)) {
    return NextResponse.json({ error: "Missing 'audio' file in form data." }, { status: 400 });
  }
  if (audio.size === 0) {
    return NextResponse.json({ error: "Uploaded audio file is empty." }, { status: 400 });
  }
  if (audio.size > MAX_AUDIO_BYTES) {
    return NextResponse.json({ error: "Recording too large." }, { status: 413 });
  }
  if (!modelId || (!scenarioId && !customPrompt)) {
    return NextResponse.json({ error: "Missing 'modelId', or both 'scenarioId' and 'customPrompt'." }, { status: 400 });
  }

  const language = LANGUAGES.some((l) => l.code === languageRaw) ? (languageRaw as LanguageCode) : "en";

  const model = execModelsForLanguage(language).find((m) => m.id === modelId);
  if (!model) {
    return NextResponse.json({ error: `Unknown modelId '${modelId}'.` }, { status: 404 });
  }

  let scenarioPrompt: string;
  let resolvedScenarioId: string;
  let category: string;
  if (customPrompt) {
    scenarioPrompt = customPrompt;
    resolvedScenarioId = "custom";
    category = "custom";
  } else {
    const scenario = scenariosForLanguage(language).find((s) => s.id === scenarioId);
    if (!scenario) {
      return NextResponse.json({ error: `Unknown scenarioId '${scenarioId}'.` }, { status: 404 });
    }
    scenarioPrompt = scenario.prompt;
    resolvedScenarioId = scenario.id;
    category = scenario.category;
  }

  const targetSeconds = ALLOWED_SECONDS.includes(targetRaw)
    ? targetRaw
    : category in RECOMMENDED_SECONDS
      ? RECOMMENDED_SECONDS[category as keyof typeof RECOMMENDED_SECONDS]
      : 60;

  try {
    const buffer = await audio.arrayBuffer();
    const result = await evaluateExecutiveComm({
      audio: { base64: Buffer.from(buffer).toString("base64"), mimeType: audio.type || "audio/webm" },
      model,
      scenarioPrompt,
      targetSeconds,
      languageName: getLanguage(language).name,
    });

    if (!result.mocked) {
      await saveAttempt(user.id, {
        scenarioId: resolvedScenarioId,
        category,
        modelId,
        language,
        overallScore: result.overallScore,
        scores: result.scores,
      });
      if (!premium) await markUsedToday(user.id, FEATURE);
    }

    return NextResponse.json(result);
  } catch (err) {
    return geminiErrorResponse(err, "Evaluation failed.");
  }
}
