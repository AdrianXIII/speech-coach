"use client";

import Link from "next/link";

/**
 * English only, regardless of the selected app language: the app's content
 * is multilingual so people can practise other languages, but what the app
 * *is* — this pitch, like the App Store listing, terms and privacy policy —
 * is presented in English.
 */
const T = {
  title: "Speak with confidence, in five languages.",
  subtitle:
    "MasterSpeak is an AI coach for public speaking, pronunciation, and professional communication — practice with your voice, get feedback in seconds.",
  cta: "Get started for free",
  trialNote: "Free forever — one session per trainer daily. Try Premium free for 2 weeks for unlimited access.",
  features: [
    { icon: "🎙️", title: "Record & Analyze", body: "Get instant feedback on pace, filler words, and delivery." },
    { icon: "🗣️", title: "Pronunciation", body: "Practice tricky words with AI feedback and spaced repetition." },
    { icon: "🎓", title: "AI Tutor", body: "A personal coach across business, law, and politics — real cases, real news." },
    { icon: "💼", title: "Executive Communication", body: "Sixty-second deliberate practice for the moments that matter." },
  ],
};

/**
 * Shown by app/page.tsx to anyone who isn't signed in yet — a real pitch
 * before asking for an account, instead of the trainer picker
 * (components/TrainerPicker.tsx). Once signed in, every account (free or
 * paid) goes straight to the picker instead, since a free account already
 * has real access (lib/usageLimit.ts's once-a-day free tier).
 */
export function MarketingLanding({ ctaHref }: { ctaHref: string }) {
  const t = T;

  return (
    <div lang="en" className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <header className="text-center">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted">{t.subtitle}</p>
          <div className="mt-8 flex flex-col items-center gap-2">
            <Link
              href={ctaHref}
              className="rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              {t.cta}
            </Link>
            <p className="text-xs text-ink-muted">{t.trialNote}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {t.features.map((f) => (
            <div key={f.title} className="flex flex-col gap-2 rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{f.icon}</span>
                <span className="font-display text-lg font-semibold text-ink">{f.title}</span>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
