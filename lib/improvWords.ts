/** Everyday, concrete words — good improv prompts because everyone has something to say about them. */
export const IMPROV_WORDS = [
  "Paraply", "Cykel", "Kaffekopp", "Stol", "Fönster", "Klocka", "Telefon", "Ryggsäck",
  "Spegel", "Soffa", "Lampa", "Tandborste", "Nyckel", "Plånbok", "Kudde", "Matta",
  "Termos", "Glasögon", "Halsduk", "Keps", "Handske", "Sked", "Gaffel", "Tallrik",
  "Kastrull", "Ficklampa", "Batteri", "Låda", "Hylla", "Dörrmatta", "Blomkruka",
  "Tvättmaskin", "Dammsugare", "Brevlåda", "Cykelhjälm", "Badring", "Termometer",
  "Karta", "Kompass", "Necessär", "Vattenflaska", "Grillspett", "Regnrock", "Stövlar",
  "Vante", "Mössa", "Portmonnä", "Anteckningsbok", "Penna", "Suddgummi", "Linjal",
  "Sax", "Tejp", "Häftapparat", "Skrivbord", "Bokhylla", "Ljusstake", "Vas",
  "Sovsäck", "Tält", "Kompis", "Väckarklocka", "Kalender",
  "Filt", "Handduk", "Tvål", "Schampo", "Hårborste", "Nagelsax", "Plåster", "Termosmugg",
  "Cykelpump", "Reflexväst", "Ficklykta", "Multiverktyg", "Karbinhake", "Kompasspenna",
] as const;

export function randomImprovWord(): string {
  return IMPROV_WORDS[Math.floor(Math.random() * IMPROV_WORDS.length)];
}
