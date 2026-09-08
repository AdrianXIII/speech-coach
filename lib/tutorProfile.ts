import type { CaseProfession } from "@/lib/caseStudyContent";

/**
 * The fictive company/organization/client the AI Tutor's Live News mode
 * applies news to, so a student's answers stay consistent across sessions
 * ("how would this affect XYZ's strategy" only works if XYZ is the same
 * company every time). One profile per profession, since a law client and
 * a political coalition need different defaults than a business.
 */
export interface TutorProfile {
  name: string;
  description: string;
  size: string;
  market: string;
  goals: string;
}

const STORAGE_PREFIX = "tutorProfile:";

const DEFAULT_PROFILES: Record<CaseProfession, TutorProfile> = {
  business: {
    name: "XYZ Corp",
    description: "A mid-sized B2B software company",
    size: "~500 employees, $80M annual revenue",
    market: "North America and Western Europe",
    goals: "Grow the enterprise segment and improve gross margin",
  },
  law: {
    name: "Meridian Holdings",
    description: "A privately held manufacturing group, client of XYZ & Partners",
    size: "~1,200 employees across three subsidiaries",
    market: "United States, with growing exposure in the EU",
    goals: "Manage regulatory risk while pursuing acquisitions",
  },
  politics: {
    name: "XYZ Coalition",
    description: "A regional political coalition/advocacy organization",
    size: "Represents a mid-sized metropolitan constituency",
    market: "State-level politics",
    goals: "Build legislative support for its policy platform",
  },
};

function storageKey(profession: CaseProfession): string {
  return `${STORAGE_PREFIX}${profession}`;
}

/** Per-browser, per-profession — no backend/account needed, same convention as caseStudyProgress.ts. */
export function loadTutorProfile(profession: CaseProfession): TutorProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILES[profession];
  try {
    const raw = window.localStorage.getItem(storageKey(profession));
    if (!raw) return DEFAULT_PROFILES[profession];
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? { ...DEFAULT_PROFILES[profession], ...parsed }
      : DEFAULT_PROFILES[profession];
  } catch {
    return DEFAULT_PROFILES[profession];
  }
}

export function saveTutorProfile(profession: CaseProfession, profile: TutorProfile): void {
  try {
    window.localStorage.setItem(storageKey(profession), JSON.stringify(profile));
  } catch {
    // Private browsing / storage quota — edits just won't persist this session.
  }
}
