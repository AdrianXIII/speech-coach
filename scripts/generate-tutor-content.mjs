#!/usr/bin/env node
/**
 * Bulk-generates AI Tutor teaching content for every profession/category
 * that doesn't already have it, using this app's own Gemini API key — the
 * "generate this content with AI once and save it" pipeline for scaling
 * past the hand-authored flagship categories in lib/tutorTeachingContent.ts.
 *
 * Run it from the repo root:
 *   node --no-warnings scripts/generate-tutor-content.mjs
 *
 * Needs GEMINI_API_KEY in .env.local (same key the app already uses — no
 * new credential). Writes lib/tutorTeachingContent.generated.ts, which the
 * app merges in automatically. Safe to re-run: it skips anything already in
 * SKIP_KEYS (kept in sync with HAND_AUTHORED_CONTENT in
 * lib/tutorTeachingContent.ts) or already present from a previous run,
 * unless --force is passed.
 *
 * After reviewing/fact-checking a generated category, move its object from
 * tutorTeachingContent.generated.ts into HAND_AUTHORED_CONTENT in
 * tutorTeachingContent.ts and add its key to SKIP_KEYS below — that's what
 * protects it from being silently overwritten by a future run.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { CASE_CATEGORIES, casesForCategory } from "../lib/caseStudyContent.ts";
import { getFundamentals } from "../lib/caseStudyFundamentals.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT, "lib/tutorTeachingContent.generated.ts");

// Keep this in sync with HAND_AUTHORED_CONTENT's keys in tutorTeachingContent.ts.
const SKIP_KEYS = new Set([
  "business/Strategy",
  "politics/Foreign Policy & Diplomacy",
  "law/Contract Law",
]);

const FORCE = process.argv.includes("--force");

function loadGeminiApiKey() {
  const envPath = path.join(ROOT, ".env.local");
  if (!existsSync(envPath)) {
    throw new Error(".env.local not found — copy .env.example and fill in GEMINI_API_KEY first.");
  }
  const raw = readFileSync(envPath, "utf-8");
  const match = raw.match(/^GEMINI_API_KEY=(.+)$/m);
  const key = match?.[1]?.trim();
  if (!key) {
    throw new Error("GEMINI_API_KEY is empty in .env.local — this script needs a real key to generate content.");
  }
  return key;
}

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

async function callGemini(apiKey, prompt) {
  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    }),
  });
  if (!res.ok) {
    throw new Error(`Gemini request failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned an empty response.");
  return text;
}

const PROFESSION_ROLE = {
  business: "management consultant and business school professor",
  law: "law professor",
  politics: "political science professor and foreign policy analyst",
};

function buildPrompt(profession, category, fundamentalLabels, sampleScenario) {
  const scaffold = fundamentalLabels.length
    ? `Ground your concepts in these fundamentals this app already tracks for the category (cover the most important ones, you don't have to use all of them verbatim as titles):\n${fundamentalLabels.map((l) => `- ${l}`).join("\n")}`
    : "No pre-existing concept list exists for this category — use your own judgment for what a competent professional must know.";

  return `You are an expert ${PROFESSION_ROLE[profession]} writing teaching content for a one-on-one AI
tutoring app, for the category "${category}" (in ${profession}).

${scaffold}

${sampleScenario ? `For context, here's an example of the kind of case a student will later be challenged with in this category:\n"""\n${sampleScenario}\n"""\n` : ""}

Write 6-8 of the most important concepts a student must understand for this category, in a
deliberate teaching order (later concepts can build on earlier ones). Be substantive, not thin —
each concept needs a real explanation, not just a definition.

Respond with ONLY a JSON object (no markdown fences, no commentary) matching exactly this shape:
{
  "overview": "<2-3 sentences framing the whole category before the first concept>",
  "concepts": [
    {
      "id": "<short-kebab-case-id>",
      "title": "<concept name>",
      "explanation": "<2-4 sentences: what it actually is>",
      "whyItMatters": "<2-3 sentences: why it matters in practice>",
      "example": "<a concrete, specific, real-world example — a real company, event, or case, not a generic hypothetical>"
    }
  ],
  "connections": "<2-4 sentences on how the concepts above connect to and build on each other>"
}`;
}

async function main() {
  const apiKey = loadGeminiApiKey();

  const targets = [];
  for (const profession of Object.keys(CASE_CATEGORIES)) {
    for (const category of CASE_CATEGORIES[profession]) {
      const key = `${profession}/${category}`;
      if (!FORCE && SKIP_KEYS.has(key)) continue;
      targets.push({ profession, category, key });
    }
  }

  console.log(`Generating teaching content for ${targets.length} categories (skipping ${SKIP_KEYS.size} already hand-authored)...`);

  const results = {};
  for (const { profession, category, key } of targets) {
    process.stdout.write(`  ${key} ... `);
    try {
      const fundamentals = getFundamentals(profession, category).map((f) => f.label);
      const sample = casesForCategory(profession, category)[0]?.scenario;
      const raw = await callGemini(apiKey, buildPrompt(profession, category, fundamentals, sample));
      const parsed = JSON.parse(raw);
      results[key] = {
        profession,
        category,
        overview: parsed.overview,
        concepts: parsed.concepts,
        connections: parsed.connections,
        source: "gemini",
        generatedAt: new Date().toISOString().slice(0, 10),
      };
      console.log(`ok (${parsed.concepts?.length ?? 0} concepts)`);
    } catch (err) {
      console.log(`FAILED: ${err instanceof Error ? err.message : err}`);
    }
  }

  const fileContent = `import type { TeachingContent } from "@/lib/tutorTeachingContent";

/**
 * AUTO-GENERATED by scripts/generate-tutor-content.mjs on ${new Date().toISOString()} —
 * do not hand-edit. Overwritten every time that script runs. Move a category
 * you've fact-checked into tutorTeachingContent.ts's HAND_AUTHORED_CONTENT
 * instead of editing it here, so a future regeneration run doesn't
 * overwrite it (and add its key to SKIP_KEYS in the generation script).
 */
export const GENERATED_TEACHING_CONTENT: Record<string, TeachingContent> = ${JSON.stringify(results, null, 2)};
`;

  writeFileSync(OUTPUT_PATH, fileContent, "utf-8");
  console.log(`\nWrote ${Object.keys(results).length} categories to ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
