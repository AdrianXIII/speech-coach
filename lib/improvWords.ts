import type { LanguageCode } from "@/lib/languages";

/** Everyday, concrete words — good improv prompts because everyone has something to say about them. */
const WORDS_BY_LANGUAGE: Record<LanguageCode, string[]> = {
  en: [
    "Umbrella", "Bicycle", "Coffee cup", "Chair", "Window", "Clock", "Phone", "Backpack",
    "Mirror", "Sofa", "Lamp", "Toothbrush", "Key", "Wallet", "Pillow", "Rug",
    "Thermos", "Glasses", "Scarf", "Cap", "Glove", "Spoon", "Fork", "Plate",
    "Pot", "Flashlight", "Battery", "Box", "Shelf", "Doormat", "Flowerpot",
    "Washing machine", "Vacuum cleaner", "Mailbox", "Bike helmet", "Life ring",
    "Thermometer", "Map", "Compass", "Toiletry bag",
  ],
  de: [
    "Regenschirm", "Fahrrad", "Kaffeetasse", "Stuhl", "Fenster", "Uhr", "Telefon", "Rucksack",
    "Spiegel", "Sofa", "Lampe", "Zahnbürste", "Schlüssel", "Geldbeutel", "Kissen", "Teppich",
    "Thermoskanne", "Brille", "Schal", "Mütze", "Handschuh", "Löffel", "Gabel", "Teller",
    "Topf", "Taschenlampe", "Batterie", "Kiste", "Regal", "Fußmatte", "Blumentopf",
    "Waschmaschine", "Staubsauger", "Briefkasten", "Fahrradhelm", "Rettungsring",
    "Thermometer", "Landkarte", "Kompass", "Kulturbeutel",
  ],
  fr: [
    "Parapluie", "Vélo", "Tasse à café", "Chaise", "Fenêtre", "Horloge", "Téléphone", "Sac à dos",
    "Miroir", "Canapé", "Lampe", "Brosse à dents", "Clé", "Portefeuille", "Coussin", "Tapis",
    "Thermos", "Lunettes", "Écharpe", "Casquette", "Gant", "Cuillère", "Fourchette", "Assiette",
    "Casserole", "Lampe de poche", "Pile", "Boîte", "Étagère", "Paillasson", "Pot de fleurs",
    "Machine à laver", "Aspirateur", "Boîte aux lettres", "Casque de vélo", "Bouée",
    "Thermomètre", "Carte", "Boussole", "Trousse de toilette",
  ],
  es: [
    "Paraguas", "Bicicleta", "Taza de café", "Silla", "Ventana", "Reloj", "Teléfono", "Mochila",
    "Espejo", "Sofá", "Lámpara", "Cepillo de dientes", "Llave", "Billetera", "Almohada", "Alfombra",
    "Termo", "Gafas", "Bufanda", "Gorra", "Guante", "Cuchara", "Tenedor", "Plato",
    "Olla", "Linterna", "Batería", "Caja", "Estante", "Felpudo", "Maceta",
    "Lavadora", "Aspiradora", "Buzón", "Casco de bicicleta", "Flotador",
    "Termómetro", "Mapa", "Brújula", "Neceser",
  ],
  sv: [
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
  ],
};

export function randomImprovWord(language: LanguageCode): string {
  const words = WORDS_BY_LANGUAGE[language];
  return words[Math.floor(Math.random() * words.length)];
}
