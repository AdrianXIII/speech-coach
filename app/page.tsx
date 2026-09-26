import { requireUser } from "@/lib/requireUser";
import { hasAccess } from "@/lib/subscription";
import { MarketingLanding } from "@/components/MarketingLanding";
import { TrainerPicker } from "@/components/TrainerPicker";

/**
 * The app's entry point branches on account state rather than redirecting
 * (unlike every gated trainer page.tsx, which uses requireAccess() — a cold
 * visitor to "/" should see a real pitch, not bounce straight to /sign-in):
 * anyone without an active trial/subscription sees the marketing pitch
 * (components/MarketingLanding.tsx) with a CTA to sign in or subscribe;
 * everyone else sees the existing "what do you want to practice?" chooser
 * (components/TrainerPicker.tsx, unchanged from before this file split).
 */
export default async function Home() {
  const user = await requireUser();
  if (!user) return <MarketingLanding ctaHref="/sign-in" />;
  if (!(await hasAccess(user))) return <MarketingLanding ctaHref="/pricing" />;
  return <TrainerPicker />;
}
