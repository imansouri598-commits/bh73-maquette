// Les 10 avis Google affichés sur l'ancien site (relevés le 11/10/2026), tous notés 5 étoiles.
// Prénom + initiale. Textes d'origine : seules l'orthographe et la ponctuation ont été corrigées.
// La note moyenne et le nombre total d'avis de la fiche Google ne sont pas connus : ne pas les afficher.
export type Avis = { auteur: string; texte: string };

export const avis: Avis[] = [
  {
    auteur: 'Isabelle L.',
    texte:
      "Whaou ! Super découverte à Angoulême. Magasin multifacettes. On y trouve des objets très divers présentés harmonieusement. Les prix sont abordables, surtout pour des modèles bien plus originaux que ce que l'on trouve sur le plateau. On se gare sans souci et c'est devant le Lidl (pratique pour y « ranger » les maris).",
  },
  {
    auteur: 'Hervé R.',
    texte:
      'Ambiance zen. Quand vous rentrez dans la boutique, vous êtes tout de suite dans l’ambiance, avec de très belles pièces de décoration. Personnel accueillant et souriant. Produits de qualité, je recommande vivement !',
  },
  {
    auteur: 'Minerve C.',
    texte: 'Très belle découverte du jour, tout y est : belle marchandise bien agencée, tarifs corrects et accueil très chaleureux. Allez-y !',
  },
  {
    auteur: 'Marc L.',
    texte: 'Excellents conseils, précédés d’un accueil chaleureux sans être intrusif.',
  },
  {
    auteur: 'Lily B.',
    texte: 'Magasin moderne, un très bel agencement et une riche sélection d’articles soigneusement choisis ! Un incontournable d’Angoulême !',
  },
  {
    auteur: 'Céline T.',
    texte: 'Très belle boutique de décoration, vêtements, bijoux… avec accueil chaleureux des dirigeants ! À visiter au plus vite…',
  },
  {
    auteur: 'Dominique V.',
    texte: 'Un petit bijou cette boutique ! Vêtements, décoration, bijoux… et des vendeurs au top, je recommande.',
  },
  {
    auteur: 'Armelle D.',
    texte:
      'Très contente de découvrir un nouveau concept store très agréable, aménagé avec des objets divers, des vêtements et à tous les prix. À voir absolument.',
  },
  {
    auteur: 'Nadine D.',
    texte: 'C’est super ! Belle surprise ! Je vous le recommande vivement pour votre maison. On y trouve aussi de beaux bijoux. C’est top !',
  },
  {
    auteur: 'Patrice B.',
    texte: 'Boutique au top !!',
  },
];

// Extraits mis en avant sur l'accueil : un par thème qui revient souvent dans les avis.
// Le parking et le vintage sont couverts par le résumé « Bon à savoir » de Google (magasin.ts, preuves).
export type Extrait = { theme: string; auteur: string; citation: string };

// Le passage doit figurer mot pour mot dans l'avis d'origine, sinon le build s'arrête.
// « … » signale une coupe : ajouté au début si le passage ne commence pas l'avis,
// et à la fin s'il s'arrête au milieu d'une phrase.
function extrait(theme: string, auteur: string, passage: string): Extrait {
  const original = avis.find((a) => a.auteur === auteur);
  if (!original || !original.texte.includes(passage)) {
    throw new Error(`Extrait introuvable mot pour mot dans l'avis de ${auteur} : « ${passage} »`);
  }
  const coupeAuDebut = !original.texte.startsWith(passage);
  const coupeEnFin = !original.texte.endsWith(passage) && !/[.!?…]$/.test(passage);
  return { theme, auteur, citation: `${coupeAuDebut ? '… ' : ''}${passage}${coupeEnFin ? ' …' : ''}` };
}

export const extraits: Extrait[] = [
  extrait('L’accueil', 'Marc L.', 'Excellents conseils, précédés d’un accueil chaleureux sans être intrusif.'),
  extrait('Le choix', 'Lily B.', 'une riche sélection d’articles soigneusement choisis ! Un incontournable d’Angoulême !'),
  extrait(
    'Les prix',
    'Isabelle L.',
    "Les prix sont abordables, surtout pour des modèles bien plus originaux que ce que l'on trouve sur le plateau.",
  ),
];
