import type { LanguageCode } from "@/lib/languages";

export interface FrameworkLesson {
  whenToUse: string;
  weak: string;
  strong: string;
}

/**
 * A short "how this framework works" card per framework (keyed by
 * StructureModel id), shown before the first attempt — most users have
 * never heard of PREP/STAR/BLUF, and a weak-vs-strong pair teaches the
 * idea faster than any definition. Examples are profession-agnostic on
 * purpose, same as the scenario bank.
 */
const LESSONS: Record<LanguageCode, Record<string, FrameworkLesson>> = {
  en: {
    prep: {
      whenToUse:
        "Best for giving an opinion or recommendation. State your point, back it with a reason and a concrete example, then repeat the point so it sticks.",
      weak: "So, there are a lot of things to consider, and the other vendor has some good parts too, but overall I kind of lean toward Option A, I think.",
      strong:
        "I recommend Option A. It's 20% cheaper and can go live a month sooner. When the finance team switched to it last spring, they cut invoice processing time in half. That's why Option A is the right call.",
    },
    star: {
      whenToUse:
        "Best for telling a story about something you've done — in interviews, reviews, or when asking for a promotion.",
      weak: "There were some problems with the project and I worked really hard and eventually it got better.",
      strong:
        "Our launch was slipping by six weeks (Situation). I was asked to get it back on track (Task). I cut the scope to three core features and set up daily 15-minute check-ins (Action). We shipped two weeks early and signed four new customers in the first month (Result).",
    },
    bluf: {
      whenToUse:
        "Best when time is short or the listener is senior. Give the answer first, then only the reasons they need.",
      weak: "So we looked into a few things this week, talked to the vendor, reran the numbers, and it turns out we might need a bit more budget.",
      strong:
        "We need an extra $50,000 to finish on time. The vendor raised prices 15%, and cutting scope would delay launch by a month. Can you approve it by Friday?",
    },
    wsn: {
      whenToUse:
        "The simplest all-purpose structure: what happened, why it matters to the listener, and what should happen next.",
      weak: "Customer complaints went up. We're looking into it.",
      strong:
        "Customer complaints rose 30% this month (What). That puts our renewal with our biggest client at risk (So what). I suggest we assign a dedicated support lead starting Monday (Now what).",
    },
  },
  de: {
    prep: {
      whenToUse:
        "Am besten, wenn du eine Meinung oder Empfehlung gibst. Nenne deinen Punkt, stütze ihn mit einem Grund und einem konkreten Beispiel und wiederhole dann den Punkt, damit er hängen bleibt.",
      weak: "Also, es gibt vieles zu bedenken, und der andere Anbieter hat auch gute Seiten, aber insgesamt tendiere ich irgendwie eher zu Option A, glaube ich.",
      strong:
        "Ich empfehle Option A. Sie ist 20 % günstiger und kann einen Monat früher live gehen. Als die Finanzabteilung im Frühjahr umgestiegen ist, hat sie die Rechnungsbearbeitung halbiert. Deshalb ist Option A die richtige Wahl.",
    },
    star: {
      whenToUse:
        "Am besten, wenn du von etwas erzählst, das du getan hast — im Vorstellungsgespräch, Mitarbeitergespräch oder wenn du um eine Beförderung bittest.",
      weak: "Es gab ein paar Probleme mit dem Projekt, und ich habe sehr hart gearbeitet, und am Ende wurde es besser.",
      strong:
        "Unser Launch lag sechs Wochen zurück (Situation). Ich sollte ihn wieder auf Kurs bringen (Aufgabe). Ich habe den Umfang auf drei Kernfunktionen reduziert und tägliche 15-Minuten-Abstimmungen eingeführt (Aktion). Wir haben zwei Wochen früher geliefert und im ersten Monat vier neue Kunden gewonnen (Ergebnis).",
    },
    bluf: {
      whenToUse:
        "Am besten, wenn die Zeit knapp ist oder die Zuhörer Führungskräfte sind. Gib zuerst die Antwort, dann nur die Gründe, die sie brauchen.",
      weak: "Wir haben uns diese Woche einiges angeschaut, mit dem Anbieter gesprochen, neu gerechnet, und es sieht so aus, als bräuchten wir vielleicht etwas mehr Budget.",
      strong:
        "Wir brauchen 50.000 Euro zusätzlich, um rechtzeitig fertig zu werden. Der Anbieter hat die Preise um 15 % erhöht, und eine Reduzierung des Umfangs würde den Launch um einen Monat verzögern. Kannst du das bis Freitag freigeben?",
    },
    wsn: {
      whenToUse:
        "Die einfachste Allzweck-Struktur: was passiert ist, warum es für die Zuhörer wichtig ist und was als Nächstes passieren sollte.",
      weak: "Die Kundenbeschwerden sind gestiegen. Wir schauen uns das an.",
      strong:
        "Die Kundenbeschwerden sind diesen Monat um 30 % gestiegen (Was). Das gefährdet die Vertragsverlängerung mit unserem größten Kunden (Na und). Ich schlage vor, ab Montag eine feste Support-Verantwortliche zu benennen (Was nun).",
    },
  },
  fr: {
    prep: {
      whenToUse:
        "Idéal pour donner un avis ou une recommandation. Énoncez votre point, appuyez-le par une raison et un exemple concret, puis répétez le point pour qu'il marque les esprits.",
      weak: "Alors, il y a beaucoup de choses à prendre en compte, et l'autre fournisseur a aussi de bons côtés, mais globalement je penche un peu vers l'option A, je crois.",
      strong:
        "Je recommande l'option A. Elle coûte 20 % de moins et peut être opérationnelle un mois plus tôt. Quand le service financier l'a adoptée au printemps, il a réduit de moitié le temps de traitement des factures. C'est pourquoi l'option A est le bon choix.",
    },
    star: {
      whenToUse:
        "Idéal pour raconter quelque chose que vous avez accompli — en entretien, en évaluation annuelle ou pour demander une promotion.",
      weak: "Il y a eu quelques problèmes sur le projet, j'ai beaucoup travaillé, et finalement ça s'est amélioré.",
      strong:
        "Notre lancement avait six semaines de retard (Situation). On m'a demandé de le remettre sur les rails (Tâche). J'ai réduit le périmètre à trois fonctionnalités clés et mis en place des points quotidiens de 15 minutes (Action). Nous avons livré avec deux semaines d'avance et signé quatre nouveaux clients le premier mois (Résultat).",
    },
    bluf: {
      whenToUse:
        "Idéal quand le temps est compté ou que l'interlocuteur est un dirigeant. Donnez d'abord la réponse, puis seulement les raisons utiles.",
      weak: "On a regardé plusieurs choses cette semaine, parlé au fournisseur, refait les calculs, et il semble qu'on aurait peut-être besoin d'un peu plus de budget.",
      strong:
        "Nous avons besoin de 50 000 euros supplémentaires pour finir à temps. Le fournisseur a augmenté ses prix de 15 %, et réduire le périmètre retarderait le lancement d'un mois. Pouvez-vous valider d'ici vendredi ?",
    },
    wsn: {
      whenToUse:
        "La structure polyvalente la plus simple : ce qui s'est passé, pourquoi c'est important pour l'interlocuteur, et ce qui doit se passer ensuite.",
      weak: "Les réclamations clients ont augmenté. On regarde ça.",
      strong:
        "Les réclamations clients ont augmenté de 30 % ce mois-ci (Quoi). Cela met en danger le renouvellement de notre plus gros client (Et alors). Je propose de nommer un responsable support dédié dès lundi (Et maintenant).",
    },
  },
  es: {
    prep: {
      whenToUse:
        "Ideal para dar una opinión o recomendación. Di tu punto, respáldalo con una razón y un ejemplo concreto, y luego repite el punto para que se quede.",
      weak: "Bueno, hay muchas cosas a considerar, y el otro proveedor también tiene cosas buenas, pero en general me inclino un poco por la opción A, creo.",
      strong:
        "Recomiendo la opción A. Es un 20 % más barata y puede estar en marcha un mes antes. Cuando el equipo de finanzas la adoptó en primavera, redujo a la mitad el tiempo de gestión de facturas. Por eso la opción A es la decisión correcta.",
    },
    star: {
      whenToUse: "Ideal para contar algo que has hecho: en entrevistas, evaluaciones o al pedir un ascenso.",
      weak: "Hubo algunos problemas con el proyecto, trabajé muchísimo y al final mejoró.",
      strong:
        "Nuestro lanzamiento iba seis semanas atrasado (Situación). Me pidieron que lo encarrilara (Tarea). Reduje el alcance a tres funciones clave y organicé reuniones diarias de 15 minutos (Acción). Lanzamos dos semanas antes y conseguimos cuatro clientes nuevos el primer mes (Resultado).",
    },
    bluf: {
      whenToUse:
        "Ideal cuando hay poco tiempo o quien escucha es directivo. Da primero la respuesta y luego solo las razones que necesita.",
      weak: "Esta semana revisamos varias cosas, hablamos con el proveedor, rehicimos los números y parece que quizá necesitemos un poco más de presupuesto.",
      strong:
        "Necesitamos 50.000 euros adicionales para terminar a tiempo. El proveedor subió los precios un 15 % y reducir el alcance retrasaría el lanzamiento un mes. ¿Puedes aprobarlo antes del viernes?",
    },
    wsn: {
      whenToUse:
        "La estructura más sencilla y versátil: qué pasó, por qué le importa a quien escucha y qué debe pasar ahora.",
      weak: "Las quejas de clientes han aumentado. Lo estamos mirando.",
      strong:
        "Las quejas de clientes subieron un 30 % este mes (Qué). Eso pone en riesgo la renovación con nuestro mayor cliente (Y qué). Propongo asignar un responsable de soporte dedicado a partir del lunes (Y ahora qué).",
    },
  },
  sv: {
    prep: {
      whenToUse:
        "Bäst när du ska ge en åsikt eller rekommendation. Säg din poäng, stöd den med ett skäl och ett konkret exempel, och upprepa sedan poängen så att den fastnar.",
      weak: "Alltså, det finns mycket att tänka på, och den andra leverantören har också bra sidor, men på det stora hela lutar jag väl lite åt alternativ A, tror jag.",
      strong:
        "Jag rekommenderar alternativ A. Det är 20 % billigare och kan vara i drift en månad tidigare. När ekonomiavdelningen bytte till det i våras halverade de tiden för fakturahantering. Därför är alternativ A rätt val.",
    },
    star: {
      whenToUse:
        "Bäst när du berättar om något du har gjort — på intervjuer, utvecklingssamtal eller när du ber om befordran.",
      weak: "Det var lite problem med projektet och jag jobbade jättehårt och till slut blev det bättre.",
      strong:
        "Vår lansering låg sex veckor efter (Situation). Jag fick i uppdrag att få den på rätt spår (Uppgift). Jag skar ner till tre kärnfunktioner och införde dagliga 15-minuters avstämningar (Åtgärd). Vi lanserade två veckor före plan och fick fyra nya kunder första månaden (Resultat).",
    },
    bluf: {
      whenToUse:
        "Bäst när tiden är kort eller mottagaren är chef. Ge svaret först, och sedan bara de skäl de behöver.",
      weak: "Vi har tittat på en del saker den här veckan, pratat med leverantören, räknat om, och det verkar som att vi kanske behöver lite mer budget.",
      strong:
        "Vi behöver 50 000 kronor extra för att bli klara i tid. Leverantören har höjt priset med 15 %, och att skära i omfattningen skulle försena lanseringen en månad. Kan du godkänna det före fredag?",
    },
    wsn: {
      whenToUse:
        "Den enklaste allroundstrukturen: vad som har hänt, varför det spelar roll för mottagaren, och vad som bör hända härnäst.",
      weak: "Kundklagomålen har ökat. Vi tittar på det.",
      strong:
        "Kundklagomålen ökade med 30 % den här månaden (Vad). Det sätter förnyelsen med vår största kund i fara (Så vad). Jag föreslår att vi utser en dedikerad supportansvarig från och med måndag (Vad nu).",
    },
  },
};

export function frameworkLesson(language: LanguageCode, modelId: string): FrameworkLesson | null {
  return LESSONS[language][modelId] ?? null;
}
