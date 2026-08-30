# Speech Coach

An AI-powered public speaking practice app: record a speech, get instant
feedback on pace and filler words, rehearse in front of a virtual audience
with a teleprompter, get AI help writing what to say, and train your
pronunciation of individual words.

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
Randomize (or pick) an everyday word and a rhetorical structure model
(PREP, NUPP, Treklangen), then a 60-second phase timer visually divides the
minute by that model's steps while you record. A one-tap "Kasta
inspelningen" discards the take instantly. No AI involved.

**Kontrastiv Betoning** (`/emphasis`)
Swedish contrastive-stress drill: the same sentence can mean different
things depending on which word you stress. Say it with the stress on the
word you're given, and a local audio analysis (loudness + pitch per word,
via the Web Audio API — the same technique as the Pronunciation Trainer's
stress check, just applied to words instead of syllables) shows which word
actually came out strongest. No AI call, no cost.

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
  emphasis/page.tsx               Kontrastiv Betoning page
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
  ContrastiveStressTrainer.tsx     Kontrastiv betoning drill (local per-word stress check, no AI call)
  FollowUpChat.tsx                 Reusable "ask a follow-up" thread under any AI feedback panel
  NavBar.tsx
  stage/
    AudienceGrid.tsx               Animated audience (pure CSS, no 3D library)
    Teleprompter.tsx               Notes editor / auto-scrolling overlay
lib/
  analyzeSpeech.ts, speechMetrics.ts, scoreSpeech.ts, generateScript.ts,
  pronunciationFeedback.ts, fillerWords.ts, chat.ts, wordStress.ts,
  audioStress.ts, improvWords.ts, structureModels.ts, contrastiveStress.ts,
  gemini.ts, audio.ts
types/
  speechAnalysis.ts
```
