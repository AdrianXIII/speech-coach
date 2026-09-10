# Speech Coach

An AI-powered public speaking practice app: record a speech, get instant
feedback on pace and filler words, rehearse in front of a virtual audience
with a teleprompter, get AI help writing what to say, train your
pronunciation of individual words, and work through a voice-driven AI tutor
covering Business/Law/Politics domain knowledge.

## Nav structure

The nav bar groups features by what they actually train, not a flat list —
see `lib/navTranslations.ts`'s `NAV_GROUPS`:

- **Delivery Practice** — Record & Analyze, 60s Improv: free-form or
  spontaneous speaking, graded on delivery.
- **Micro-Drills** — Pronunciation, Contrastive Stress, Elite Phrasing:
  short, single-utterance exercises, each isolating one specific verbal
  skill.
- **Receptive Skills** — Speed Reading, Listening & Summary: the only
  features about taking in language quickly, rather than producing it.
- **Professional Practice** — AI Tutor: domain case work, graded on content
  knowledge rather than delivery.

Two features that used to be separate top-level pages have been folded into
others because they were functionally near-duplicates of a richer sibling
feature, not because anything was removed: Virtual Stage is now a mode
toggle inside Record & Analyze, and Case Studies is now a "skip the lesson,
practice a case now" shortcut inside AI Tutor's Teach step (AI Tutor's
evaluation is a strict superset — same grading plus pronunciation feedback).

## Language picker

One global language switch lives in the nav bar (next to "Speech Coach"),
not a separate control per feature. Picking English, German, French,
Spanish, or Swedish there translates everything inside each multi-language
trainer (Improv, Contrastive Stress, Listening & Summary, Elite Phrasing,
Speed Reading) — not just the practice content, but every label, button,
instruction, and generated message: page titles/subtitles (`components/
PageHeader.tsx`), profile pills, round/status labels, quiz questions
generated on the fly from pasted text (`lib/readingComprehension.ts`), and
locally-generated feedback strings (`lib/languageRichness.ts`). The nav
labels and language state are implemented once in
`components/LanguageProvider.tsx` (React context + one localStorage key)
rather than each trainer managing its own. Record & Analyze and
Pronunciation aren't wired to it: the former works in whatever language you
speak already (Gemini handles that), and Pronunciation Trainer is still
English-only (see its section below).

## What it does

**Record & Analyze** (`/`)
Two modes sharing one recording/analysis pipeline, toggled at the top of
the page:
- **Simple recording** — audio-only: press record, speak, stop, then send
  it for analysis.
- **Stage practice** — adds webcam video, an animated "audience" that
  watches and reacts while you speak, and a teleprompter overlay for notes
  (paste them in before you start; once you hit Record they scroll
  automatically as an overlay on your live camera preview). Includes a
  **Script Assistant**: describe a topic, paste rough notes, or drop in a
  draft, and Gemini writes a polished, speakable version — load it straight
  into the teleprompter with one click to test whether it sounds better out
  loud.

Either mode's recording goes through the same analysis:
1. Transcribed with **Google Gemini** (reads the audio directly)
2. Scanned for filler words ("um", "uh", "ah", "like", "you know", "so"…) and speaking pace (words per minute)
3. Sent back to **Gemini**, acting as an expert public speaking coach, for 3 strengths and 3 actionable tips
4. Results shown on a dashboard: an overall score (0–100), pace/filler-word badges, the transcript with every filler word highlighted inline, and the coach's feedback

**Pronunciation Trainer** (`/pronunciation`)
Type a word or short phrase, hear it spoken via your browser's built-in
text-to-speech, record yourself saying it, then:
1. An instant, local **stress check** (no AI call): looks up the word's
   syllables and correct stress position in the CMU Pronouncing Dictionary,
   measures loudness/pitch per syllable in your recording via the Web Audio
   API, and shows which syllable actually came out strongest vs. which one
   should have — approximate, but immediate and free.
2. Optionally, **Get AI Feedback** for a deeper Gemini-written explanation.

Any AI answer in the app (coaching feedback, pronunciation feedback, script
suggestions) has a **follow-up chat** underneath it — ask a clarifying
question and Gemini answers using the original context, text-only (no
audio re-sent), so it stays cheap even after several questions.

**60-Second Improv** (`/improv`)
Multi-language (English, German, French, Spanish, Swedish). Randomize (or
pick) an everyday word and a rhetorical structure model (PREP, NUPP, and
Triad — a translated per-language framework; Swedish additionally keeps
its original Treklangen naming), then a 60-second phase timer visually
divides the minute by that model's steps while you record. A one-tap
"Discard recording" drops the take instantly. No AI involved.

**Contrastive Stress** (`/emphasis`)
Multi-language contrastive-stress drill (English, German, French, Spanish,
Swedish — follows the global language picker in the nav): the
same sentence can mean different things depending on which word you
stress. Say it with the stress on the word you're given, and a local audio
analysis (loudness + pitch per word, via the Web Audio API — the same
technique as the Pronunciation Trainer's stress check, just applied to
words instead of syllables) shows which word
actually came out strongest. No AI call, no cost.

**Speed Reading** (`/speed-reading`)
Works with pasted text in any of the 5 supported languages — pick which
one you're pasting so the local comprehension quiz can tell real words
from filler in that language. An RSVP (rapid serial visual presentation)
reader flashes it word-by-word (level 1), 1–2 words at a time (level 2), or
3–4-word chunks (level 3, 500+ wpm) with a fixed focus marker so your eyes
don't have to move. Every ~150 words a quick recall question pauses the
flow and nudges the speed up or down depending on whether you catch it.
When you stop (or the text ends), a short comprehension quiz checks whether
you actually absorbed what you read, and shows WPM next to comprehension %
so a higher speed can be told apart from just skimming. Chunking, the
recall checks, and the quiz are all generated straight from the pasted
text — word-order and word-presence questions, no AI call. Session history
lives in your browser (localStorage) so repeat attempts are comparable.

**Listening & Summary** (`/comprehension`)
Multi-language (English, German, French, Spanish, Swedish). Aimed at
professionals polishing a second language for work: hear a short
business-register passage (browser text-to-speech, text stays hidden), then
summarize it out loud, in your own words. Your spoken answer is transcribed
live via the browser's built-in Web Speech API (free — Chrome/Edge only,
not Firefox/Safari) and scored purely from that transcript against the
passage's own key points and vocabulary: content coverage, vocabulary
diversity (type-token ratio), how much of the passage's advanced
terminology you echoed, use of professional connectives ("consequently",
"whereas", "as a result"), and how quickly you started responding. No AI
call — this is deliberately the free-first version of the idea; an
LLM-generated "here's how to phrase that more like a native speaker" rewrite
is the natural next step if the free scoring turns out not to be enough.

**Elite Phrasing** (`/collocations`)
Targets *collocation* specifically — the "feels right" pairing of verbs,
nouns, and adjectives that separates fluent professional English from
merely-correct English ("mitigate risk" sounds right; "mitigate resources"
doesn't, even though it's grammatical). Each round: pick the correctly
upgraded version of a weak, basic-register phrase from options that include
a still-basic option and a "weak collocation" trap (right grammar, wrong
pairing) — then say a sentence using that exact phrase out loud. The
multiple-choice round is a hand-curated local database, no AI; the spoken
round reuses the Web Speech API hook from Listening & Summary to check
whether the target verb and noun actually landed near each other in what
you said.

A **profile** picker (separate from the language picker) switches which
professional register you're drilling: **Executive** (strategic business
language — "mitigate risk", "drive growth"), **Politician** (persuasive/
diplomatic — "reach across the aisle", "hold accountable"), or **Lawyer**
(precise, adversarial — "burden of proof", "breach of contract"). The
three were picked from actual research on which professions rank highest
for public-speaking centrality — not guessed. All three profiles are
multi-language (English, German, French, Spanish, Swedish), each with its
own idiomatic collocations per language rather than translations of the
English set — political and legal idiom don't transfer word-for-word any
more than business collocations do. (The lookup still falls back to
English with a small notice if a profile/language combination is ever
missing, but with all 15 combinations filled in that path shouldn't
trigger today.)

**AI Tutor** (`/ai-tutor`)
A voice-driven tutor across Business, Law, and Politics: pick a profession
and category (by voice — tap the mic and say it — or tap a button), and it
teaches the domain's core concepts step by step, spoken aloud (browser
SpeechSynthesis), before challenging you with either a standard case or a
live-news-grounded question.

- **Teach**: reads through 6-8 concepts per category (`lib/
  tutorTeachingContent.ts` — hand-authored content, one entry per
  profession/category, not regenerated per session) — each with an
  explanation, why it matters, and a real example, voice-navigable ("next"/
  "repeat"/"back", or tap). A **"skip the lesson, practice a case now"**
  link on the overview step jumps straight to Challenge — the old Case
  Studies experience, now reached from here instead of a separate page.
- **Challenge**: either a standard case from the same content pool Case
  Studies used to draw from (`lib/caseStudyContent.ts`), or (Live News mode)
  a real, current news story fetched via Gemini's Google Search grounding
  and connected to the category, applied against a persistent fictive
  company/client/org profile you can edit (`lib/tutorProfile.ts`,
  localStorage).
- **Evaluate**: one multimodal Gemini call (transcript + your recorded
  audio) grades knowledge (covered/missed/corrections), language
  (terminology/word choice/grammar), and pronunciation together, plus a
  summary and next steps to practice.
- **Flag**: a "this seems wrong or shallow" control under each taught
  concept — written to Postgres when a database is connected (`lib/db.ts`),
  reviewable at `/tutor-flags`; always also logged to Vercel's Runtime Logs
  ("TUTOR CONTENT FLAG") and a local per-device copy (`lib/tutorFlags.ts`)
  as fallbacks.

Content is English-only for now (same fallback notice pattern as Elite
Phrasing's profiles), but Law and Politics content is also **country-bound**
by design (`lib/legalJurisdiction.ts`, `lib/politicalSystem.ts`,
`lib/countryContext.ts`) — legal doctrine and political institutions
genuinely differ by country, not just by language. Selecting German,
French, Spanish, or Swedish shows that country's own Law/Politics content
(all fully hand-authored, not a translation of the US content); an honest
on-screen notice appears instead of silently substituting US content if a
country/category combination isn't populated yet. To bulk-generate content
for a new category or country, see `scripts/generate-tutor-content.mjs`
(country-specific legal/political content is flagged there as needing real
review before being trusted, given the accuracy stakes).

## Running it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Your browser will ask for microphone (and, in
Record & Analyze's Stage mode, camera) permission — allow it.

## AI features (optional)

Without any setup, the AI-backed endpoints run in **mock mode**: realistic
placeholder responses (still reflecting your recording's actual length,
where relevant) so the whole app works out of the box.

To get real transcription, coaching, script writing, and pronunciation feedback:

```bash
cp .env.example .env.local
# then add your key:
# GEMINI_API_KEY=...
```

## Database (optional)

The app is local-first by design (recordings/results live only in the
browser) — the one exception is AI Tutor content flags, which persist to
Postgres when connected (see `.env.example`'s `DATABASE_URL` section for
setup: Vercel dashboard -> Storage -> Connect Database -> Postgres/Neon).
Without it, flags still work, just without cross-device review at
`/tutor-flags`. The `tutor_flags` table is created automatically on first
write — no manual migration step.

## Tech stack

Next.js (App Router) + TypeScript + Tailwind CSS + Postgres (optional, see
above). Everything except AI Tutor flags lives only in the browser.

## Project structure

```
app/
  page.tsx                        Record & Analyze home page (Simple + Stage modes)
  pronunciation/page.tsx          Pronunciation Trainer page
  improv/page.tsx                 60-Second Improv page
  emphasis/page.tsx               Contrastive Stress page (multi-language)
  speed-reading/page.tsx          Snabbläsning (RSVP speed reading) page
  comprehension/page.tsx          Listening & Summary page
  collocations/page.tsx           Elite Phrasing page
  ai-tutor/page.tsx                AI Tutor page (Business/Law/Politics)
  tutor-flags/page.tsx             Review view for AI Tutor content flags (GET /api/tutor/flags)
  api/
    analyze-speech/               Gemini transcription+coaching (one call) -> filler-word/pace analysis
    generate-script/              Topic/draft -> Gemini-polished speakable script
    pronunciation-feedback/       Word + recording -> Gemini pronunciation feedback
    word-stress/                  Word -> syllable count + expected stress index (CMU dict lookup)
    tutor/evaluate/                Case id or news item + transcript + audio -> Gemini knowledge/language/pronunciation grading
    tutor/news/                    Fetches a live news item via Gemini Google Search grounding
    tutor/flag/                    Records a "this content seems wrong" report (Postgres + log + client-local)
    tutor/flags/                   Lists flags for the /tutor-flags review page
    chat/                         Text-only follow-up chat, seeded with any of the above
components/
  SpeechRecorder.tsx               Record & Analyze: Simple/Stage mode toggle, recording, playback, "Analyze Speech"
  DashboardResults.tsx             Score ring, metric badges, highlighted transcript, feedback
  ScriptAssistant.tsx              AI script suggestions, feeds into the teleprompter (Stage mode)
  PronunciationTrainer.tsx         Listen / record / stress check / AI feedback for one word at a time
  StressMeter.tsx                  Instant local per-syllable loudness/pitch stress check (no AI call)
  ImprovTrainer.tsx                60-second word + structure-model improv drill with phase timer
  ContrastiveStressTrainer.tsx     Contrastive stress drill, 5 languages (local per-word stress check, no AI call)
  SpeedReadingTrainer.tsx          RSVP speed reader: leveled chunking, recall checks, comprehension quiz
  ComprehensionTrainer.tsx         Listen (TTS) -> spoken summary (Web Speech API) -> local richness scoring
  CollocationTrainer.tsx           Upgrade-the-phrase quiz + spoken collocation-usage check
  AITutor.tsx                      Voice-driven profession/category picker -> teach -> challenge -> evaluate
  TutorProfileEditor.tsx           Edit the persistent fictive company/org profile used by AI Tutor's Live News mode
  FollowUpChat.tsx                 Reusable "ask a follow-up" thread under any AI feedback panel
  NavBar.tsx                       Grouped nav (see "Nav structure" above)
  shared/
    ProfessionPicker.tsx, CategoryPicker.tsx   Shared Area -> Domain picker, used by AI Tutor
  stage/
    AudienceGrid.tsx               Animated audience (pure CSS, no 3D library)
    Teleprompter.tsx               Notes editor / auto-scrolling overlay
lib/
  analyzeSpeech.ts, speechMetrics.ts, scoreSpeech.ts, generateScript.ts,
  pronunciationFeedback.ts, fillerWords.ts, chat.ts, wordStress.ts,
  audioStress.ts, improvWords.ts, structureModels.ts, contrastiveStress.ts,
  languages.ts,
  speedReadingLevels.ts, readingComprehension.ts, readingHistory.ts,
  comprehensionContent.ts, languageRichness.ts, collocationContent.ts,
  collocationCheck.ts, caseStudyContent.ts, caseStudyFundamentals.ts,
  caseStudyProgress.ts,
  tutorEngine.ts, tutorTeachingContent.ts, tutorTeachingContent.generated.ts,
  tutorNews.ts, tutorProfile.ts, tutorFlags.ts, legalJurisdiction.ts,
  politicalSystem.ts, countryContext.ts,
  voiceMatch.ts, random.ts, gemini.ts, db.ts, audio.ts
hooks/
  useMediaRecorder.ts, useSpeechRecognition.ts, useSpeechSynthesis.ts
scripts/
  generate-tutor-content.mjs      Bulk-generates AI Tutor teaching content via Gemini for any uncovered category
types/
  speechAnalysis.ts
```
