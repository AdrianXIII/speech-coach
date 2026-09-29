import { requireUser } from "@/lib/requireUser";
import { MarketingLanding } from "@/components/MarketingLanding";
import { TrainerPicker } from "@/components/TrainerPicker";

/**
 * The app's entry point branches on account state rather than redirecting
 * (unlike every gated trainer page.tsx, which uses requireSignedIn() — a
 * cold visitor to "/" should see a real pitch, not bounce straight to
 * /sign-in): no session -> the marketing pitch
 * (components/MarketingLanding.tsx) with a CTA to sign in; signed in ->
 * the "what do you want to practice?" chooser
 * (components/TrainerPicker.tsx). No subscription check here anymore —
 * there's no blanket paywall, a free account already has real (if
 * once-a-day-limited) access to every trainer, so it goes straight to the
 * chooser rather than another pitch.
 */
export default async function Home() {
  const user = await requireUser();
  if (!user) return <MarketingLanding ctaHref="/sign-in" />;
  return <TrainerPicker />;
}
