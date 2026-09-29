import type { CaseProfession } from "@/lib/caseStudyContent";

/**
 * The free tier's AI Tutor category restriction — 3 "starter" categories
 * per profession, everything else requires an active subscription (see
 * lib/subscription.ts's isPremium()). Client-safe (no DB import): used by
 * components/shared/CategoryPicker.tsx to render the lock UI, as well as by
 * the server routes that enforce it. The once-a-day daily-use check
 * (canUseToday()/markUsedToday()) lives in lib/usageLimitServer.ts instead,
 * kept separate specifically so importing *this* file never pulls the
 * `postgres` package into a client bundle (it broke the build the one time
 * they were combined — `postgres` needs Node built-ins like `tls` that
 * don't exist in a browser).
 */
export const FREE_AI_TUTOR_CATEGORIES: Record<CaseProfession, string[]> = {
  business: ["Strategy", "Finance", "Marketing"],
  law: ["Contract Law", "Corporate & Compliance", "Civil Litigation"],
  politics: ["Foreign Policy & Diplomacy", "Domestic Policy", "Crisis Response"],
};

export function isFreeAiTutorCategory(profession: CaseProfession, category: string): boolean {
  return FREE_AI_TUTOR_CATEGORIES[profession].includes(category);
}
