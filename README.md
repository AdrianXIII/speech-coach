# Speech Coach

An AI-powered public speaking practice app: record a speech, get instant
feedback on pace and filler words, rehearse in front of a virtual audience
with a teleprompter, get AI help writing what to say, and train your
pronunciation of individual words.

## Language picker

One global language switch lives in the nav bar (next to "Speech Coach"),
not a separate control per feature. Picking English, German, French,
Spanish, or Swedish there both translates the nav labels and swaps the
content in every multi-language trainer (Improv, Contrastive Stress,
Listening & Summary, Elite Phrasing, Speed Reading) — implemented
once in `components/LanguageProvider.tsx` (React context + one
localStorage key) rather than each trainer managing its own. Record &
Analyze, Virtual Stage, and Pronunciation aren't wired to it: the first
two work in whatever language you speak already (Gemini handles that),
and Pronunciation Trainer is still English-only (see its section below).

## What it does

**Record & Analyze** (`/`)
Record yourself speaking (audio-only), then send it for analysis:
1. Transcribed with **Google Gemini** (reads the audio directly)
2. Scanned for filler words ("um", "uh", "ah", "like", "you know", "so"…) and speaking pace (words per minute)
3. Sent back to **Gemini**, acting as an expert public speaking coach, for 3 strengths and 3 actionable tips
4. Results shown on a dashboard: an overall score (0–100), pace/filler-word badges, the transcript with every filler word highlighted inline, and the coach's feedback

**Virtual Stage** (`/stage`)
Practice with your webcam in front of an animated "audience" that watches
and reacts while you speak. Paste your notes into the teleprompter before
you start — once you hit Record, they scroll automatically (adjustable
speed) as an overlay on your live camera preview. Stop to review your
recorded video.

Includes a **Script Assistant**: describe a topic, paste rough notes, or
drop in a draft, and Gemini writes a polished, speakable version — load it
straight into the teleprompter with one click to test whether it sounds
better out loud.

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
language — multi-language: English, German, French, Spanish, Swedish,
each with its own idiomatic collocations, not translations of the English
set), **Politician** (persuasive/diplomatic — "reach across the aisle",
"hold accountable"), or **Lawyer** (precise, adversarial — "burden of
proof", "breach of contract"). The three were picked from actual research
on which professions rank highest for public-speaking centrality — not
guessed — and Politician/Lawyer are English-only for now; switching the
global language while one of those is selected falls back to English
content with a small notice, rather than silently mixing languages.

## Running it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Your browser will ask for microphone (and,
on the Virtual Stage, camera) permission — allow it.

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

## Tech stack

Next.js (App Router) + TypeScript + Tailwind CSS. No database yet —
recordings and results live only in the browser for the current session.

## Project structure

```
app/
  page.tsx                        Record & Analyze home page
  stage/page.tsx                  Virtual Stage page
  pronunciation/page.tsx          Pronunciation Trainer page
  improv/page.tsx                 60-Second Improv page
  emphasis/page.tsx               Contrastive Stress page (multi-language)
  speed-reading/page.tsx          Snabbläsning (RSVP speed reading) page
  comprehension/page.tsx          Listening & Summary page
  collocations/page.tsx           Elite Phrasing page
  api/
    analyze-speech/               Gemini transcription+coaching (one call) -> filler-word/pace analysis
    generate-script/              Topic/draft -> Gemini-polished speakable script
    pronunciation-feedback/       Word + recording -> Gemini pronunciation feedback
    word-stress/                  Word -> syllable count + expected stress index (CMU dict lookup)
    chat/                         Text-only follow-up chat, seeded with any of the above
components/
  SpeechRecorder.tsx               Record/stop/playback + "Analyze Speech"
  DashboardResults.tsx             Score ring, metric badges, highlighted transcript, feedback
  VirtualStage.tsx                 Webcam recorder + teleprompter + audience
  ScriptAssistant.tsx              AI script suggestions, feeds into the teleprompter
  PronunciationTrainer.tsx         Listen / record / stress check / AI feedback for one word at a time
  StressMeter.tsx                  Instant local per-syllable loudness/pitch stress check (no AI call)
  ImprovTrainer.tsx                60-second word + structure-model improv drill with phase timer
  ContrastiveStressTrainer.tsx     Contrastive stress drill, 5 languages (local per-word stress check, no AI call)
  SpeedReadingTrainer.tsx          RSVP speed reader: leveled chunking, recall checks, comprehension quiz
  ComprehensionTrainer.tsx         Listen (TTS) -> spoken summary (Web Speech API) -> local richness scoring
  CollocationTrainer.tsx           Upgrade-the-phrase quiz + spoken collocation-usage check
  FollowUpChat.tsx                 Reusable "ask a follow-up" thread under any AI feedback panel
  NavBar.tsx
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
  collocationCheck.ts, gemini.ts, audio.ts
hooks/
  useMediaRecorder.ts, useSpeechRecognition.ts
types/
  speechAnalysis.ts
```
