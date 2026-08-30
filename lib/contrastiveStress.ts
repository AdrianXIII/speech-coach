export interface ContrastiveVariant {
  targetWordIndex: number;
  meaning: string;
}

export interface ContrastiveSentence {
  id: string;
  words: string[];
  variants: ContrastiveVariant[];
}

export interface ContrastiveExercise {
  sentence: ContrastiveSentence;
  variant: ContrastiveVariant;
}

/**
 * Swedish sentences where stressing a different word changes what the
 * sentence implies (kontrastiv betoning). Only content words that produce a
 * real, explainable meaning shift are listed as variants — function words
 * like "att"/"det" are skipped.
 */
export const CONTRASTIVE_SENTENCES: ContrastiveSentence[] = [
  {
    id: "stal-pengarna",
    words: ["Jag", "sa", "inte", "att", "han", "stal", "pengarna"],
    variants: [
      { targetWordIndex: 0, meaning: "Det var någon annan som sa det — inte jag." },
      { targetWordIndex: 2, meaning: "Ett starkt, tydligt förnekande av hela påståendet." },
      { targetWordIndex: 4, meaning: "Det var någon annan, inte han, som stal pengarna." },
      { targetWordIndex: 5, meaning: "Han kanske lånade eller fick pengarna — inte stal dem." },
      { targetWordIndex: 6, meaning: "Han stal något annat — inte pengarna." },
    ],
  },
  {
    id: "alskar-dig",
    words: ["Jag", "älskar", "dig"],
    variants: [
      { targetWordIndex: 0, meaning: "Det är jag (inte någon annan) som älskar dig." },
      { targetWordIndex: 1, meaning: "Förstärker känslan — det är verkligen kärlek." },
      { targetWordIndex: 2, meaning: "Det är just dig, ingen annan, som älskas." },
    ],
  },
  {
    id: "gav-boken",
    words: ["Hon", "gav", "honom", "boken"],
    variants: [
      { targetWordIndex: 0, meaning: "Det var hon, inte någon annan, som gav boken." },
      { targetWordIndex: 1, meaning: "Hon gav den — lånade eller sålde den inte." },
      { targetWordIndex: 2, meaning: "Hon gav boken till honom — inte till någon annan." },
      { targetWordIndex: 3, meaning: "Det var boken hon gav honom — inte något annat." },
    ],
  },
  {
    id: "aka-paris",
    words: ["Vi", "ska", "åka", "till", "Paris", "imorgon"],
    variants: [
      { targetWordIndex: 0, meaning: "Det är vi, inte de, som åker." },
      { targetWordIndex: 2, meaning: "Vi ska verkligen åka — inte bara planera." },
      { targetWordIndex: 4, meaning: "Det är Paris, inte någon annan stad, vi åker till." },
      { targetWordIndex: 5, meaning: "Det är imorgon, inte en annan dag, vi åker." },
    ],
  },
  {
    id: "larare-berom",
    words: ["Läraren", "gav", "eleven", "beröm"],
    variants: [
      { targetWordIndex: 0, meaning: "Det var läraren, inte t.ex. rektorn, som gav beröm." },
      { targetWordIndex: 1, meaning: "Läraren gav faktiskt beröm — lovade det inte bara." },
      { targetWordIndex: 2, meaning: "Det var just den eleven, inte en annan, som fick beröm." },
      { targetWordIndex: 3, meaning: "Det var beröm, inte kritik, läraren gav." },
    ],
  },
  {
    id: "katten-soffan",
    words: ["Katten", "sover", "på", "soffan"],
    variants: [
      { targetWordIndex: 0, meaning: "Det är katten, inte hunden, som sover där." },
      { targetWordIndex: 1, meaning: "Katten faktiskt sover — vilar eller leker inte." },
      { targetWordIndex: 3, meaning: "Katten sover på soffan — inte i sin korg." },
    ],
  },
  {
    id: "prata-chefen",
    words: ["Du", "måste", "prata", "med", "chefen", "idag"],
    variants: [
      { targetWordIndex: 0, meaning: "Det är du, inte någon annan, som måste prata med chefen." },
      { targetWordIndex: 1, meaning: "Det är ett krav — inte ett förslag." },
      { targetWordIndex: 4, meaning: "Det är chefen, inte en kollega, du ska prata med." },
      { targetWordIndex: 5, meaning: "Det måste ske idag — inte imorgon." },
    ],
  },
  {
    id: "last-boken",
    words: ["Jag", "har", "redan", "läst", "boken"],
    variants: [
      { targetWordIndex: 0, meaning: "Det är jag, inte du, som redan har läst den." },
      { targetWordIndex: 2, meaning: "Betonar att det redan är gjort — tidigare än väntat." },
      { targetWordIndex: 3, meaning: "Jag har läst — inte bara bläddrat i — boken." },
      { targetWordIndex: 4, meaning: "Det är boken, inte artikeln, jag har läst." },
    ],
  },
];

export function randomContrastiveExercise(): ContrastiveExercise {
  const sentence =
    CONTRASTIVE_SENTENCES[Math.floor(Math.random() * CONTRASTIVE_SENTENCES.length)];
  const variant = sentence.variants[Math.floor(Math.random() * sentence.variants.length)];
  return { sentence, variant };
}
