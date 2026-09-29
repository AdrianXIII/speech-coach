# App Store Connect listing content

Draft copy to paste into App Store Connect when creating the MasterSpeak
app record. Not code — nothing here is read by the app itself. Screenshots
are not included: they need a real device/simulator capture pass, which
can't be produced from this repo.

## App name
MasterSpeak

## Subtitle (30 characters max)
AI speaking & language coach

## Promotional text (170 characters max — can be updated anytime without a new build)
Practice speaking, pronunciation, and professional communication with an AI coach that gives feedback in seconds — in English, German, French, Spanish, or Swedish.

## Description (4000 characters max)
MasterSpeak is an AI coach for public speaking, pronunciation, and professional communication — practice with your own voice and get feedback in seconds, in English, German, French, Spanish, or Swedish.

RECORD & ANALYZE
Record a short speech and get instant feedback on pace, filler words, and delivery — or switch to Stage practice with video, a live audience, and a teleprompter.

PRONUNCIATION
Look up any word, hear it spoken, record yourself saying it, and get AI feedback on how close you are to a native pronunciation — plus a spaced-repetition review list for words you want to keep practicing.

AI TUTOR
A personal coach across Business, Law, and Politics: it teaches the core concepts for dozens of professional categories, challenges you with a real case or today's news, and grades your knowledge, language, and pronunciation.

EXECUTIVE COMMUNICATION
Sixty-second deliberate-practice drills for the high-stakes moments — a tough question in a meeting, a hallway conversation with a stakeholder, an unscripted ask.

ELITE PHRASING
Upgrade a plain sentence into the refined word combinations polished speakers reach for, then use it out loud in a sentence of your own.

Plus Comprehension & Summary (listen to real news, summarize it back), Contrastive Stress, Speed Reading, and Improv — all in five languages, all designed around a few focused minutes at a time.

MasterSpeak is free to use: every trainer gives you one full session a day, and AI Tutor includes 3 starter categories in each profession. Subscribe for $64.99/year for unlimited daily use and the complete AI Tutor case library — managed entirely through your Apple ID.

## Keywords (100 characters max, comma-separated, no spaces)
public speaking,pronunciation,AI coach,language learning,communication,accent,speech,presentation

## Category
Primary: Education
Secondary: Productivity

## Support URL
https://speech-coach-beta.vercel.app/privacy (or a dedicated support page/email once [SUPPORT EMAIL] from app/privacy/page.tsx is finalized)

## Marketing URL
https://speech-coach-beta.vercel.app/

## Privacy Policy URL (required field)
https://speech-coach-beta.vercel.app/privacy

## Copyright
[YEAR] [LEGAL ENTITY NAME] (same placeholder as app/privacy/page.tsx and app/terms/page.tsx — fill in together)

## Age rating questionnaire
No objectionable content of any kind (violence, mature themes, gambling, etc.) — answer "None" to every category. Expected result: 4+.

## App Store Connect "App Privacy" section (data collection disclosure)
Matches app/privacy/page.tsx's actual data flow — declare:
- **Contact Info** (email address) — linked to identity, used for App Functionality and Account Management.
- **User Content** (audio recordings, submitted as part of a trainer session) — linked to identity, used for App Functionality. Not used for tracking.
- **Identifiers** (Apple's Sign-in-with-Apple relay identifier, if used) — linked to identity, used for App Functionality.
- **Purchases** (subscription status) — linked to identity, used for App Functionality, handled by Apple/RevenueCat.
- No data used for third-party advertising or tracking (confirmed: no ad SDK anywhere in this codebase).

## What's New (first submission)
Initial release.

---

**Portal steps still needed (not writable from this repo):** create the app record in App Store Connect with this content, capture and upload screenshots (6.7" and 5.5" device sizes at minimum), set up the subscription group and products (see the paywall commit), and submit for review once RevenueCat/Apple entitlement testing passes in sandbox.
