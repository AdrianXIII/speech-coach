import type { LanguageCode } from "@/lib/languages";

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
 * Sentences where stressing a different word changes what's implied
 * (contrastive/focus stress), one list per language. Only content words
 * that produce a real, explainable meaning shift are listed as variants.
 */
const SENTENCES_BY_LANGUAGE: Record<LanguageCode, ContrastiveSentence[]> = {
  en: [
    {
      id: "stole-money",
      words: ["I", "didn't", "say", "he", "stole", "the", "money"],
      variants: [
        { targetWordIndex: 0, meaning: "Implies someone else said it — not me." },
        { targetWordIndex: 1, meaning: "A strong, clear denial of the whole statement." },
        { targetWordIndex: 3, meaning: "Implies someone else, not him, stole the money." },
        { targetWordIndex: 4, meaning: "Implies he maybe borrowed the money — not stole it." },
        { targetWordIndex: 6, meaning: "Implies he stole something else — not the money." },
      ],
    },
    {
      id: "love-you",
      words: ["I", "love", "you"],
      variants: [
        { targetWordIndex: 0, meaning: "It's me, not someone else, who loves you." },
        { targetWordIndex: 1, meaning: "Emphasizes the intensity — it's real love." },
        { targetWordIndex: 2, meaning: "It's you specifically, no one else, who is loved." },
      ],
    },
    {
      id: "gave-book",
      words: ["She", "gave", "him", "the", "book"],
      variants: [
        { targetWordIndex: 0, meaning: "It was her, not someone else, who gave it." },
        { targetWordIndex: 1, meaning: "She gave it — didn't lend or sell it." },
        { targetWordIndex: 2, meaning: "She gave it to him — not to someone else." },
        { targetWordIndex: 4, meaning: "It was the book she gave — not something else." },
      ],
    },
    {
      id: "flying-paris",
      words: ["We", "are", "flying", "to", "Paris", "tomorrow"],
      variants: [
        { targetWordIndex: 0, meaning: "It's us, not them, who are flying." },
        { targetWordIndex: 2, meaning: "We're really flying — not driving or taking the train." },
        { targetWordIndex: 4, meaning: "It's Paris, not another city, we're headed to." },
        { targetWordIndex: 5, meaning: "It's tomorrow, not another day, we're leaving." },
      ],
    },
    {
      id: "teacher-praised",
      words: ["The", "teacher", "praised", "the", "student"],
      variants: [
        { targetWordIndex: 1, meaning: "It was the teacher, not someone else, who praised." },
        { targetWordIndex: 2, meaning: "The teacher actually praised — didn't just acknowledge." },
        { targetWordIndex: 4, meaning: "It was that student, not another, who was praised." },
      ],
    },
  ],
  de: [
    {
      id: "geld-gestohlen",
      words: ["Ich", "habe", "nicht", "gesagt", "dass", "er", "das", "Geld", "gestohlen", "hat"],
      variants: [
        { targetWordIndex: 0, meaning: "Impliziert, dass jemand anderes das gesagt hat — nicht ich." },
        { targetWordIndex: 2, meaning: "Eine starke, klare Verneinung der ganzen Aussage." },
        { targetWordIndex: 5, meaning: "Impliziert, dass jemand anderes, nicht er, das Geld gestohlen hat." },
        { targetWordIndex: 7, meaning: "Impliziert, dass er etwas anderes gestohlen hat — nicht das Geld." },
        { targetWordIndex: 8, meaning: "Impliziert, dass er das Geld vielleicht geliehen hat — nicht gestohlen." },
      ],
    },
    {
      id: "liebe-dich",
      words: ["Ich", "liebe", "dich"],
      variants: [
        { targetWordIndex: 0, meaning: "Ich bin es, nicht jemand anderes, der dich liebt." },
        { targetWordIndex: 1, meaning: "Betont die Intensität — es ist wirklich Liebe." },
        { targetWordIndex: 2, meaning: "Du bist es, niemand anderes, der geliebt wird." },
      ],
    },
    {
      id: "buch-gegeben",
      words: ["Sie", "hat", "ihm", "das", "Buch", "gegeben"],
      variants: [
        { targetWordIndex: 0, meaning: "Sie war es, nicht jemand anderes, die es gegeben hat." },
        { targetWordIndex: 2, meaning: "Sie hat es ihm gegeben — nicht jemand anderem." },
        { targetWordIndex: 4, meaning: "Es war das Buch, das sie gegeben hat — nichts anderes." },
        { targetWordIndex: 5, meaning: "Sie hat es gegeben — nicht verliehen oder verkauft." },
      ],
    },
    {
      id: "fliegen-paris",
      words: ["Wir", "fliegen", "morgen", "nach", "Paris"],
      variants: [
        { targetWordIndex: 0, meaning: "Wir sind es, nicht sie, die fliegen." },
        { targetWordIndex: 1, meaning: "Wir fliegen wirklich — nicht mit dem Auto oder Zug fahren." },
        { targetWordIndex: 2, meaning: "Es ist morgen, nicht ein anderer Tag, an dem wir fliegen." },
        { targetWordIndex: 4, meaning: "Es ist Paris, nicht eine andere Stadt, wohin wir fliegen." },
      ],
    },
    {
      id: "lehrer-gelobt",
      words: ["Der", "Lehrer", "hat", "den", "Schüler", "gelobt"],
      variants: [
        { targetWordIndex: 1, meaning: "Es war der Lehrer, nicht jemand anderes, der gelobt hat." },
        { targetWordIndex: 4, meaning: "Es war dieser Schüler, nicht ein anderer, der gelobt wurde." },
        { targetWordIndex: 5, meaning: "Der Lehrer hat tatsächlich gelobt — nicht nur anerkannt." },
      ],
    },
  ],
  fr: [
    {
      id: "vole-argent",
      words: ["Je", "n'ai", "pas", "dit", "qu'il", "a", "volé", "l'argent"],
      variants: [
        { targetWordIndex: 0, meaning: "Implique que quelqu'un d'autre l'a dit — pas moi." },
        { targetWordIndex: 2, meaning: "Un déni fort et clair de toute l'affirmation." },
        { targetWordIndex: 4, meaning: "Implique que quelqu'un d'autre, pas lui, a volé l'argent." },
        { targetWordIndex: 6, meaning: "Implique qu'il a peut-être emprunté l'argent — pas volé." },
        { targetWordIndex: 7, meaning: "Implique qu'il a volé autre chose — pas l'argent." },
      ],
    },
    {
      id: "donne-livre",
      words: ["Elle", "lui", "a", "donné", "le", "livre"],
      variants: [
        { targetWordIndex: 0, meaning: "Implique que c'est elle, pas quelqu'un d'autre, qui a donné." },
        { targetWordIndex: 1, meaning: "Elle le lui a donné — pas à quelqu'un d'autre." },
        { targetWordIndex: 3, meaning: "Elle l'a donné — pas prêté ou vendu." },
        { targetWordIndex: 5, meaning: "C'est le livre qu'elle a donné — pas autre chose." },
      ],
    },
    {
      id: "allons-paris",
      words: ["Nous", "allons", "à", "Paris", "demain"],
      variants: [
        { targetWordIndex: 0, meaning: "C'est nous, pas eux, qui y allons." },
        { targetWordIndex: 1, meaning: "Nous y allons vraiment — ce n'est pas seulement un projet." },
        { targetWordIndex: 3, meaning: "C'est Paris, pas une autre ville, qui est notre destination." },
        { targetWordIndex: 4, meaning: "C'est demain, pas un autre jour, que nous partons." },
      ],
    },
    {
      id: "professeur-felicite",
      words: ["Le", "professeur", "a", "félicité", "l'élève"],
      variants: [
        { targetWordIndex: 1, meaning: "C'est le professeur, pas quelqu'un d'autre, qui a félicité." },
        { targetWordIndex: 3, meaning: "Le professeur a vraiment félicité — pas seulement reconnu." },
        { targetWordIndex: 4, meaning: "C'est cet élève, pas un autre, qui a été félicité." },
      ],
    },
    {
      id: "chat-canape",
      words: ["Le", "chat", "dort", "sur", "le", "canapé"],
      variants: [
        { targetWordIndex: 1, meaning: "C'est le chat, pas le chien, qui dort là." },
        { targetWordIndex: 2, meaning: "Le chat dort vraiment — il ne fait pas que se reposer." },
        { targetWordIndex: 5, meaning: "Le chat dort sur le canapé — pas dans son panier." },
      ],
    },
  ],
  es: [
    {
      id: "robo-dinero",
      words: ["Yo", "no", "dije", "que", "él", "robó", "el", "dinero"],
      variants: [
        { targetWordIndex: 0, meaning: "Implica que otra persona lo dijo — no yo." },
        { targetWordIndex: 1, meaning: "Una negación fuerte y clara de toda la afirmación." },
        { targetWordIndex: 4, meaning: "Implica que otra persona, no él, robó el dinero." },
        { targetWordIndex: 5, meaning: "Implica que tal vez él tomó prestado el dinero — no lo robó." },
        { targetWordIndex: 7, meaning: "Implica que él robó otra cosa — no el dinero." },
      ],
    },
    {
      id: "te-amo",
      words: ["Yo", "te", "amo"],
      variants: [
        { targetWordIndex: 0, meaning: "Soy yo, no otra persona, quien te ama." },
        { targetWordIndex: 2, meaning: "Enfatiza la intensidad — es amor de verdad." },
      ],
    },
    {
      id: "dio-libro",
      words: ["Ella", "le", "dio", "el", "libro"],
      variants: [
        { targetWordIndex: 0, meaning: "Fue ella, no otra persona, quien lo dio." },
        { targetWordIndex: 2, meaning: "Ella lo dio — no lo prestó ni lo vendió." },
        { targetWordIndex: 4, meaning: "Fue el libro lo que dio — no otra cosa." },
      ],
    },
    {
      id: "vamos-paris",
      words: ["Vamos", "a", "París", "mañana"],
      variants: [
        { targetWordIndex: 0, meaning: "Realmente vamos — no es solo un plan." },
        { targetWordIndex: 2, meaning: "Es París, no otra ciudad, nuestro destino." },
        { targetWordIndex: 3, meaning: "Es mañana, no otro día, cuando nos vamos." },
      ],
    },
    {
      id: "profesor-elogio",
      words: ["El", "profesor", "elogió", "al", "estudiante"],
      variants: [
        { targetWordIndex: 1, meaning: "Fue el profesor, no otra persona, quien elogió." },
        { targetWordIndex: 2, meaning: "El profesor realmente elogió — no solo reconoció." },
        { targetWordIndex: 4, meaning: "Fue ese estudiante, no otro, quien fue elogiado." },
      ],
    },
  ],
  sv: [
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
        { targetWordIndex: 1, meaning: "Läraren gav faktiskt beröm — inte bara lovade det." },
        { targetWordIndex: 2, meaning: "Det var just den eleven, inte en annan, som fick beröm." },
        { targetWordIndex: 3, meaning: "Det var beröm, inte kritik, läraren gav." },
      ],
    },
    {
      id: "katten-soffan",
      words: ["Katten", "sover", "på", "soffan"],
      variants: [
        { targetWordIndex: 0, meaning: "Det är katten, inte hunden, som sover där." },
        { targetWordIndex: 1, meaning: "Katten sover faktiskt — den vilar eller leker inte." },
        { targetWordIndex: 3, meaning: "Katten sover på soffan — inte i sin korg." },
      ],
    },
    {
      id: "prata-chefen",
      words: ["Du", "måste", "prata", "med", "chefen", "idag"],
      variants: [
        { targetWordIndex: 0, meaning: "Det är du, inte någon annan, som måste prata med chefen." },
        { targetWordIndex: 1, meaning: "Det är ett krav — inte ett förslag." },
        { targetWordIndex: 4, meaning: "Det är chefen, inte en kollega, du måste prata med." },
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
  ],
};

export function randomContrastiveExercise(language: LanguageCode): ContrastiveExercise {
  const sentences = SENTENCES_BY_LANGUAGE[language];
  const sentence = sentences[Math.floor(Math.random() * sentences.length)];
  const variant = sentence.variants[Math.floor(Math.random() * sentence.variants.length)];
  return { sentence, variant };
}
