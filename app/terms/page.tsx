import { PageHeader } from "@/components/PageHeader";

// English-only — see app/privacy/page.tsx's doc comment for why.
const TITLE = {
  en: "Terms of Service",
  de: "Terms of Service",
  fr: "Terms of Service",
  es: "Terms of Service",
  sv: "Terms of Service",
};

const SUBTITLE = {
  en: "Last updated: [DATE]",
  de: "Last updated: [DATE]",
  fr: "Last updated: [DATE]",
  es: "Last updated: [DATE]",
  sv: "Last updated: [DATE]",
};

/**
 * TODO before launch: same [BRACKETED] placeholders as app/privacy/page.tsx
 * need real values — this is a plain, honest draft to review with a lawyer
 * before publishing, not a substitute for one.
 */
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-surface p-6 text-sm leading-relaxed text-ink shadow-sm sm:p-8">
          <p>
            These terms govern your use of MasterSpeak, operated by [LEGAL ENTITY NAME]. By creating an account you
            agree to them. Questions go to [SUPPORT EMAIL].
          </p>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">The service</h2>
            <p>
              MasterSpeak is an AI-assisted speaking and language-practice coach. Every trainer&rsquo;s feedback is
              generated automatically and is intended to help you practice — it is not professional legal, medical,
              political, or business advice, even where a trainer&rsquo;s content covers those subjects.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Your account</h2>
            <p>
              You&rsquo;re responsible for keeping access to your own account, and for the accuracy of anything you
              submit. Don&rsquo;t use MasterSpeak to upload content you don&rsquo;t have the right to share, or to
              try to abuse, overload, or reverse-engineer the service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Free trial and subscription</h2>
            <p>
              New accounts get a free trial period. After it ends, continued use requires an active subscription,
              purchased and managed entirely through Apple&rsquo;s App Store — refunds, billing disputes, and
              cancellation all go through Apple, not MasterSpeak directly, per Apple&rsquo;s own policies.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Acceptable use</h2>
            <p>
              Don&rsquo;t use MasterSpeak for anything illegal, to harass anyone, or to generate content intended to
              deceive or defraud. We may suspend or terminate an account that violates these terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">No warranty, limitation of liability</h2>
            <p>
              MasterSpeak is provided &ldquo;as is&rdquo;. AI-generated feedback and content can be incomplete or
              wrong, and we don&rsquo;t guarantee the service will be uninterrupted or error-free. To the extent
              permitted by [JURISDICTION] law, we aren&rsquo;t liable for indirect or consequential damages arising
              from your use of MasterSpeak.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Governing law</h2>
            <p>These terms are governed by the laws of [JURISDICTION].</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold">Changes</h2>
            <p>We&rsquo;ll update the date above whenever these terms change, and tell you by email for a material change.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
