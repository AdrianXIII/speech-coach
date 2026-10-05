import { PageHeader } from "@/components/PageHeader";
import { ProgressScreen } from "@/components/ProgressScreen";
import { requireSignedIn } from "@/lib/requireUser";
import { getProgressSummary } from "@/lib/trainerActivity";
import { canUseToday } from "@/lib/usageLimitServer";
import { NAV_LINKS, type NavLink } from "@/lib/navTranslations";

const TITLE = {
  en: "Your Progress",
  de: "Dein Fortschritt",
  fr: "Votre progression",
  es: "Tu progreso",
  sv: "Dina framsteg",
};

const SUBTITLE = {
  en: "Your activity across every trainer, in one place.",
  de: "Deine Aktivität über alle Trainer hinweg, an einem Ort.",
  fr: "Votre activité sur tous les entraîneurs, au même endroit.",
  es: "Tu actividad en todos los entrenadores, en un solo lugar.",
  sv: "Din aktivitet över alla tränare, på ett ställe.",
};

// Maps a trainer's route to the daily-limit FEATURE key its own page.tsx
// gates with (see each page.tsx's own FEATURE const). AI Tutor has no
// page-level daily gate — its category lock works differently inside
// AITutor.tsx — so it's intentionally left out of "recommended next" below.
const DAILY_FEATURE_BY_HREF: Record<string, string> = {
  "/record": "record",
  "/pronunciation": "pronunciation",
  "/executive-communication": "execcomm",
  "/collocations": "collocations",
  "/emphasis": "emphasis",
  "/comprehension": "comprehension",
  "/improv": "improv",
};

export default async function ProgressPage() {
  const user = await requireSignedIn();
  const summary = await getProgressSummary(user.id);

  const eligible = NAV_LINKS.filter((link) => DAILY_FEATURE_BY_HREF[link.href]);
  const availability = await Promise.all(
    eligible.map(async (link) => ({
      link,
      // Premium accounts have no daily_usage rows (only ever written for
      // free-tier gating), so canUseToday() naturally returns true for all
      // of them here — "recommended" degrades to "the first couple" rather
      // than needing a separate premium code path.
      available: await canUseToday(user.id, DAILY_FEATURE_BY_HREF[link.href]),
    })),
  );
  const recommended: NavLink[] = availability
    .filter((a) => a.available)
    .map((a) => a.link)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />
        <ProgressScreen summary={summary} recommended={recommended} />
      </div>
    </div>
  );
}
