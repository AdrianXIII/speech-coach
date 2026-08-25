# Speech Coach

An AI-powered public speaking practice app: record a speech, get instant
feedback on pace and filler words, and rehearse in front of a virtual
audience with a teleprompter.

## What it does

**Record & Analyze** (`/`)
Record yourself speaking (audio-only), then send it for analysis:
1. Transcribed with **OpenAI Whisper**
2. Scanned for filler words ("um", "uh", "ah", "like", "you know", "so"…) and speaking pace (words per minute)
3. Sent to **GPT-4o**, acting as an expert public speaking coach, for 3 strengths and 3 actionable tips
4. Results shown on a dashboard: an overall score (0–100), pace/filler-word badges, the transcript with every filler word highlighted inline, and the coach's feedback

**Virtual Stage** (`/stage`)
Practice with your webcam in front of an animated "audience" that watches
and reacts while you speak. Paste your notes into the teleprompter before
you start — once you hit Record, they scroll automatically (adjustable
speed) as an overlay on your live camera preview. Stop to review your
recorded video.

## Running it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Your browser will ask for microphone (and,
on the Virtual Stage, camera) permission — allow it.

## AI features (optional)

Without any setup, `/api/analyze-speech` runs in **mock mode**: a
realistic sample transcript and feedback that still reflects your
recording's actual length, so the whole app works out of the box.

To get real transcription and coaching feedback:

```bash
cp .env.example .env.local
# then add your key:
# OPENAI_API_KEY=sk-...
```

## Tech stack

Next.js (App Router) + TypeScript + Tailwind CSS. No database yet —
recordings and results live only in the browser for the current session.

## Project structure

```
app/
  page.tsx                 Record & Analyze home page
  stage/page.tsx            Virtual Stage page
  api/
    analyze-speech/         Whisper -> filler-word/pace analysis -> GPT-4o coaching
    transcribe/, analyze/, feedback/   (earlier separate-step endpoints, superseded by analyze-speech)
components/
  SpeechRecorder.tsx         Record/stop/playback + "Analyze Speech"
  DashboardResults.tsx       Score ring, metric badges, highlighted transcript, feedback
  VirtualStage.tsx           Webcam recorder + teleprompter + audience
  NavBar.tsx
  stage/
    AudienceGrid.tsx         Animated audience (pure CSS, no 3D library)
    Teleprompter.tsx         Notes editor / auto-scrolling overlay
lib/
  transcribeAudio.ts, speechMetrics.ts, scoreSpeech.ts, coachFeedback.ts, fillerWords.ts, openai.ts, audio.ts
types/
  speechAnalysis.ts, session.ts, analysis.ts, feedback.ts
```
