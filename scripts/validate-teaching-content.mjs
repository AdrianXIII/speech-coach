/**
 * Checks AI Tutor teaching content against the lecture targets: is an entry
 * long enough to be a real lecture, is it written to be listened to, and do
 * its citations resolve?
 *
 *   node scripts/validate-teaching-content.mjs                     # progress report, every entry
 *   node scripts/validate-teaching-content.mjs "business/Strategy" # strict check of one entry, exits 1 on failure
 *
 * The targets come from the content brief: 4,500-6,500 spoken words per
 * category (30-45 minutes at 140 words per minute), 500-800 per concept, a
 * 300-400 word closing summary, and prose that works through a car speaker —
 * no bullet lists, no tables, no abbreviations that only make sense in print.
 *
 * Only the base entries are checked, because they are the only authored text.
 * The five in-app languages are produced from these at runtime by
 * translateTeachingContent() (lib/tutorTranslate.ts), and the country
 * suffixes (/de, /fr, /es, /se on law and politics) are jurisdictions rather
 * than languages — each is its own English entry and is checked like any
 * other. So validating every key here covers every language the app serves.
 *
 * Uses jiti to import the TypeScript source directly; it ships with Next and
 * is what next.config.ts loading already relies on.
 */
import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(ROOT + "/", { alias: { "@": ROOT } });
const { TEACHING_CONTENT } = await jiti.import(ROOT + "/lib/tutorTeachingContent.ts");

const WPM = 140;
const TOTAL_MIN = 4500;
const TOTAL_MAX = 6500;
const CONCEPT_MIN = 500;
const CONCEPT_MAX = 800;
const SUMMARY_MIN = 300;
const SUMMARY_MAX = 400;

// Citation markers are printed, not spoken (see stripCitationMarkers in
// hooks/useSpeechSynthesis.ts), so they never cost listening time.
const spoken = (s) => String(s ?? "").replace(/\s*\[\d+\]/g, "").trim();
const words = (s) => (spoken(s) ? spoken(s).split(/\s+/).length : 0);
const conceptWords = (c) => words(c.title) + words(c.explanation) + words(c.whyItMatters) + words(c.example);
const totalWords = (t) =>
  words(t.overview) + t.concepts.reduce((sum, c) => sum + conceptWords(c), 0) + words(t.connections);

/** Every check that can fail, in the order a reader would care about them. */
function inspect(t) {
  const fail = [];
  const warn = [];
  const prose = [t.overview, t.connections, ...t.concepts.flatMap((c) => [c.explanation, c.whyItMatters, c.example])];
  const joined = prose.join("\n");

  const total = totalWords(t);
  if (total < TOTAL_MIN || total > TOTAL_MAX) fail.push(`total is ${total} words (target ${TOTAL_MIN}-${TOTAL_MAX})`);
  for (const c of t.concepts) {
    const n = conceptWords(c);
    if (n < CONCEPT_MIN || n > CONCEPT_MAX) fail.push(`concept "${c.title}" is ${n} words (target ${CONCEPT_MIN}-${CONCEPT_MAX})`);
  }
  const summary = words(t.connections);
  if (summary < SUMMARY_MIN || summary > SUMMARY_MAX) fail.push(`summary is ${summary} words (target ${SUMMARY_MIN}-${SUMMARY_MAX})`);

  // Written to be heard, not read.
  const banned = [
    [/[•·]|(?:^|\n)\s*[-*]\s/g, "bullet list markers"],
    [/\|.*\|/g, "table markup"],
    [/\b(?:e\.g\.|i\.e\.|etc\.|vs\.)/g, "abbreviations that do not read aloud well"],
    [/[%$€£]/g, "symbols that should be spoken as words"],
  ];
  for (const [re, label] of banned) {
    const hits = joined.match(re);
    if (hits) fail.push(`${label}: ${[...new Set(hits)].slice(0, 5).join(", ")}`);
  }

  // Citations: inline [N] markers must resolve, and a listed source that is
  // never cited is a loose end rather than an error.
  const cited = new Set((joined.match(/\[(\d+)\]/g) || []).map((m) => Number(m.slice(1, -1))));
  const listed = new Set((t.sources ?? []).map((s) => s.id));
  if (!listed.size) fail.push("no sources array");
  const dangling = [...cited].filter((n) => !listed.has(n));
  if (dangling.length) fail.push(`citation markers with no matching source: ${dangling.join(", ")}`);
  const uncited = [...listed].filter((n) => !cited.has(n));
  if (uncited.length) warn.push(`sources never cited inline: ${uncited.join(", ")}`);

  // Voice and navigation: second-person address, a bridge into each concept
  // after the first, and sentences short enough to follow by ear.
  const second = (joined.match(/\b(you|your)\b/gi) || []).length;
  if (second < 20) warn.push(`only ${second} second-person references — tone may read as impersonal`);
  const bridge = /\b(now|next|so far|we (have|now)|let us|earlier|before|turn|close|began|begin|first|second|third)\b/i;
  const unbridged = t.concepts.slice(1).filter((c) => !bridge.test(c.explanation.slice(0, 400)));
  if (unbridged.length) warn.push(`${unbridged.length} concept(s) do not open by connecting to what came before`);
  const longest = joined.split(/(?<=[.!?])\s+/).reduce((a, b) => (words(b) > words(a) ? b : a), "");
  if (words(longest) > 70) warn.push(`longest sentence is ${words(longest)} words — hard to follow by ear`);

  return { fail, warn, total, second, longest: words(longest), cited: cited.size, listed: listed.size };
}

const key = process.argv[2];

if (key) {
  const t = TEACHING_CONTENT[key];
  if (!t) {
    console.error(`No teaching content for "${key}". Run without arguments to list every key.`);
    process.exit(1);
  }
  const r = inspect(t);
  console.log(`\n${key}`);
  console.log(`  overview        ${words(t.overview)} words`);
  for (const c of t.concepts) {
    const n = conceptWords(c);
    const flag = n < CONCEPT_MIN ? "  TOO SHORT" : n > CONCEPT_MAX ? "  TOO LONG" : "";
    console.log(`  ${String(n).padStart(4)} words  ${c.title}${flag}`);
  }
  console.log(`  summary         ${words(t.connections)} words`);
  console.log(`  TOTAL           ${r.total} words = ${Math.round(r.total / WPM)} min listening`);
  console.log(`  citations       ${r.cited} markers against ${r.listed} sources`);
  console.log(`  voice           ${r.second} second-person references, longest sentence ${r.longest} words\n`);
  for (const w of r.warn) console.log(`  WARN  ${w}`);
  for (const f of r.fail) console.log(`  FAIL  ${f}`);
  console.log(r.fail.length ? `\n${r.fail.length} failure(s)\n` : "\nAll checks passed\n");
  process.exit(r.fail.length ? 1 : 0);
}

// No argument: a progress report over every entry, newest depth first.
const rows = Object.entries(TEACHING_CONTENT)
  .map(([k, t]) => ({ key: k, ...inspect(t), concepts: t.concepts.length }))
  .sort((a, b) => b.total - a.total);
const done = rows.filter((r) => !r.fail.length);
console.log(`\n${rows.length} entries — ${done.length} meeting the lecture targets, ${rows.length - done.length} still to expand\n`);
for (const r of rows) {
  const mins = String(Math.round(r.total / WPM)).padStart(2);
  const status = r.fail.length ? `${r.fail.length} issue(s)` : "ok";
  console.log(`  ${String(r.total).padStart(5)} words  ${mins} min  ${String(r.concepts).padStart(2)} concepts  ${r.key.padEnd(42)} ${status}`);
}
console.log("\nRun with a key for the detail, e.g. node scripts/validate-teaching-content.mjs \"business/Strategy\"\n");
