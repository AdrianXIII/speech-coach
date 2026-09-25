import { NextRequest, NextResponse } from "next/server";
import { evaluateExecutiveComm } from "@/lib/executiveCommEngine";
import { geminiErrorResponse } from "@/lib/gemini";
import { execModelsForLanguage } from "@/lib/structureModels";
import { scenariosForLanguage } from "@/lib/executiveCommScenarios";
import { getLanguage, LANGUAGES, type LanguageCode } from "@/lib/languages";

/**
 * POST /api/executive-communication
 * Accepts multipart/form-data: audio, modelId, scenarioId, language. The
 * model/scenario themselves are looked up server-side from their id (not
 * trusted from the client) — same defensive pattern as
 * app/api/tutor/evaluate/route.ts's caseId lookup.
 */
export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const audio = formData.get("audio");
  const modelId = formData.get("modelId")?.toString();
  const scenarioId = formData.get("scenarioId")?.toString();
  const languageRaw = formData.get("language")?.toString();

  if (!audio || !(audio instanceof Blob)) {
    return NextResponse.json({ error: "Missing 'audio' file in form data." }, { status: 400 });
  }
  if (audio.size === 0) {
    return NextResponse.json({ error: "Uploaded audio file is empty." }, { status: 400 });
  }
  if (!modelId || !scenarioId) {
    return NextResponse.json({ error: "Missing 'modelId' or 'scenarioId'." }, { status: 400 });
  }

  const language = LANGUAGES.some((l) => l.code === languageRaw)
    ? (languageRaw as LanguageCode)
    : "en";

  const model = execModelsForLanguage(language).find((m) => m.id === modelId);
  if (!model) {
    return NextResponse.json({ error: `Unknown modelId '${modelId}'.` }, { status: 404 });
  }
  const scenario = scenariosForLanguage(language).find((s) => s.id === scenarioId);
  if (!scenario) {
    return NextResponse.json({ error: `Unknown scenarioId '${scenarioId}'.` }, { status: 404 });
  }

  try {
    const buffer = await audio.arrayBuffer();
    const result = await evaluateExecutiveComm({
      audio: { base64: Buffer.from(buffer).toString("base64"), mimeType: audio.type || "audio/webm" },
      model,
      scenario,
      languageName: getLanguage(language).name,
    });
    return NextResponse.json(result);
  } catch (err) {
    return geminiErrorResponse(err, "Evaluation failed.");
  }
}
