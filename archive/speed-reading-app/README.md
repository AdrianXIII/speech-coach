# Speed Reading — extracted from MasterSpeak

Pulled out of the live MasterSpeak app on 2026-10-05, preserved here intact rather than
deleted, as a starting point for a possible standalone app later.

## What this is

A self-contained speed-reading trainer: `page.tsx` (the former `app/speed-reading/page.tsx`
route) renders `SpeedReadingTrainer.tsx`, which uses `speedReadingLevels.ts` (difficulty-level
content) and `readingComprehension.ts` (passages + comprehension scoring). `readingHistory.ts`
read/writes a browser `localStorage` key (`speedReadingHistory`) — no server/database
component at all; this feature never had its own API route or DB table in MasterSpeak (it only
ever wrote a generic `daily_usage` row with `feature = "speedreading"` there for the free-tier
daily limit, which has no bearing on this code running elsewhere).

## What it still depends on, if resumed as its own app

These files were never edited to remove their MasterSpeak-specific imports, so they won't
compile as-is outside that project:

- `LanguageCode` / `getLanguage()` from `lib/languages.ts` — the 5-language (en/de/fr/es/sv)
  type and metadata these files key their content off.
- `useLanguage()` from `components/LanguageProvider.tsx` — the app-wide language-picker
  context `SpeedReadingTrainer.tsx` reads to pick which language's content to show.

A standalone app would need its own copies of (or a shared package providing) both, or a
rewrite to drop multi-language support. All `@/...` path-alias imports throughout these files
refer to MasterSpeak's own `tsconfig.json` alias and will need updating to whatever the new
project's structure is.
