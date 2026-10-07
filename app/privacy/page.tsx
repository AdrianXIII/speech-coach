import { PageHeader } from "@/components/PageHeader";

// English-only, unlike the rest of this app — a legal document deserves one
// carefully-reviewed authoritative version rather than an AI translation
// into four more languages with no legal review of the result.
const TITLE = {
  en: "Privacy Policy",
  de: "Privacy Policy",
  fr: "Privacy Policy",
  es: "Privacy Policy",
  sv: "Privacy Policy",
};

const SUBTITLE = {
  en: "Last updated: October 7, 2026",
  de: "Last updated: October 7, 2026",
  fr: "Last updated: October 7, 2026",
  es: "Last updated: October 7, 2026",
  sv: "Last updated: October 7, 2026",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-surface p-6 text-sm leading-relaxed text-ink shadow-sm sm:p-8">
          <p>
            MasterSpeak (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by Kosal Tech, based in Kosovo. This
            policy explains what data MasterSpeak collects, why, and how you can control it. Questions or requests
            go to <a href="mailto:kosaltech2025@gmail.com" className="underline">kosaltech2025@gmail.com</a>.
          </p>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Account information</h2>
            <p>
              When you create an account, we store your email address and a securely hashed version of your
              password — we never store or can see your actual password. If you sign in with Apple instead, we
              store the identifier Apple provides us, never your Apple password. We use this only to identify your
              account and to send essential service email.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Voice recordings</h2>
            <p>
              MasterSpeak&rsquo;s trainers ask you to record short samples of your speech. Each recording is sent to
              Google&rsquo;s Gemini API for transcription and feedback and is not permanently stored by MasterSpeak
              itself once that response comes back. Written feedback, scores, and the specific words you choose to
              keep in your Pronunciation review list are saved to your account so your progress carries across
              sessions and devices.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Text-to-speech audio</h2>
            <p>
              When MasterSpeak reads text aloud to you — a prompt, a lesson, a word you type, or AI-generated
              feedback — that text is sent to Google&rsquo;s Cloud Text-to-Speech API to generate the spoken audio.
              Audio generated from fixed, non-personal lesson content is cached and reused across users; audio
              generated from anything you personally typed or that was generated specifically for you is not
              cached or reused.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Third parties we use</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Google Gemini</strong> — transcribes and analyzes your recordings and text.</li>
              <li><strong>Google Cloud Text-to-Speech</strong> — converts text to spoken audio within the app.</li>
              <li><strong>Vercel and Supabase</strong> — host the app and its database.</li>
              <li><strong>Apple and RevenueCat</strong> — process subscription payments; MasterSpeak never sees your card details.</li>
              <li><strong>Resend</strong> — delivers the password-reset email when you request one.</li>
            </ul>
            <p className="mt-2">We do not sell your data, and we do not run advertising or ad-tracking of any kind.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Why we process your data</h2>
            <p>
              We process your account data to perform our contract with you — creating your account and providing
              the trainers you sign up to use. Subscription data is processed to fulfil the subscription you
              purchase. We don&rsquo;t rely on consent-based marketing or ad profiling for any of this.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">How long we keep it</h2>
            <p>
              We keep your account data for as long as your account exists. You can delete your account at any
              time, instantly and permanently, from Account Settings inside the app — this removes your account and
              everything tied to it (progress, review lists, and subscription records) immediately, not on some
              later schedule.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Your rights</h2>
            <p>
              You can delete your account yourself at any time in Account Settings, or ask us to access, export, or
              delete it on your behalf by emailing{" "}
              <a href="mailto:kosaltech2025@gmail.com" className="underline">kosaltech2025@gmail.com</a>. If you are
              in the European Economic Area, you have the rights described under the GDPR, including the right to
              lodge a complaint with your local data protection authority.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Children</h2>
            <p>MasterSpeak is not directed at children under 16 and we do not knowingly collect their data.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Changes</h2>
            <p>
              We&rsquo;ll update the date at the top of this page whenever this policy changes, and, for a material
              change, tell you by email.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
