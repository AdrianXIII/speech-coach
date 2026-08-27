export interface StructurePhase {
  label: string;
  seconds: number;
}

export interface StructureModel {
  id: string;
  name: string;
  fullName: string;
  /** Must sum to 60. */
  phases: StructurePhase[];
}

export const STRUCTURE_MODELS: StructureModel[] = [
  {
    id: "prep",
    name: "PREP",
    fullName: "Point – Reason – Example – Point",
    phases: [
      { label: "Point", seconds: 10 },
      { label: "Reason", seconds: 15 },
      { label: "Example", seconds: 25 },
      { label: "Point", seconds: 10 },
    ],
  },
  {
    id: "nupp",
    name: "NUPP",
    fullName: "Nuläge – Utmaning – Possibilitet – Påminnelse",
    phases: [
      { label: "Nuläge", seconds: 15 },
      { label: "Utmaning", seconds: 15 },
      { label: "Possibilitet", seconds: 20 },
      { label: "Påminnelse", seconds: 10 },
    ],
  },
  {
    id: "treklang",
    name: "Treklangen",
    fullName: "Vad är det? – Vad påminner det om? – Vad tycker jag?",
    phases: [
      { label: "Vad är det?", seconds: 20 },
      { label: "Vad påminner det om?", seconds: 20 },
      { label: "Vad tycker jag?", seconds: 20 },
    ],
  },
];

export function randomStructureModel(): StructureModel {
  return STRUCTURE_MODELS[Math.floor(Math.random() * STRUCTURE_MODELS.length)];
}

/** Which phase index is active at `elapsedSeconds` into the 60-second exercise. */
export function activePhaseIndex(model: StructureModel, elapsedSeconds: number): number {
  let cumulative = 0;
  for (let i = 0; i < model.phases.length; i++) {
    cumulative += model.phases[i].seconds;
    if (elapsedSeconds < cumulative) return i;
  }
  return model.phases.length - 1;
}
