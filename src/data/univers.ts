import type { ImageMetadata } from 'astro';
import { magasin, photos, preuves } from './magasin';

/** Citation affichée sur une page univers : avis Google réel ou résumé généré par Google. */
export type Citation = {
  texte: string;
  source: string;
  /** Avis Google noté 5 étoiles (data/avis.ts) : on affiche ses étoiles. Absent pour un résumé de Google. */
  cinqEtoiles?: boolean;
  lien?: string;
};

export type Univers = {
  slug: string;
  titre: string;
  /** Sous le titre, sur les cartes : ce que l'on trouve dans l'univers, en une ligne. */
  accroche: string;
  /** En tête de page : une ou deux phrases courtes. */
  intro: string;
  rayons: string[];
  photo?: ImageMetadata;
  galerie: ImageMetadata[];
  /** Seconde main et vintage : chaque pièce est unique, une pièce vendue ne revient pas. */
  piecesUniques?: boolean;
  /** Une partie de la sélection se commande sur la boutique en ligne. */
  enLigne?: boolean;
  /** Livraison possible dans un rayon de 20 km autour du magasin. */
  livraison?: boolean;
  citation?: Citation;
};

// Extraits d'avis : textes de data/avis.ts (avis Google relevés le 11/10/2026, tous notés 5 étoiles), copiés à l'identique.
// Résumé « Bon à savoir » : repris de magasin.ts (preuves.googleBonASavoir), généré par Google à partir des avis.
const resumeVintage = preuves.googleBonASavoir.find((t) => t.includes('vintage'));

export const univers: Univers[] = [
  {
    slug: 'decoration',
    titre: 'Décoration & plantes',
    accroche: 'Luminaires, vannerie, céramique, plantes.',
    intro:
      'De quoi changer l’ambiance d’une pièce sans tout refaire : suspensions en fibres, céramiques émaillées, tentures Voglio Bene.',
    rayons: ['Luminaires', 'Vannerie', 'Céramique et vases', 'Tentures', 'Coussins et plaids', 'Plantes'],
    photo: photos.lampeCollage,
    galerie: [photos.lampeCollage, photos.ceramiqueVerte, photos.tableVannerie, photos.coinSalon],
    citation: {
      texte: 'Quand vous rentrez dans la boutique, vous êtes tout de suite dans l’ambiance, avec de très belles pièces de décoration.',
      source: 'Hervé R. · extrait d’un avis Google',
      cinqEtoiles: true,
    },
  },
  {
    slug: 'mobilier',
    titre: 'Mobilier',
    accroche: 'Commodes, tables d’appoint, assises.',
    intro: 'Des meubles à découvrir en boutique, avec livraison possible autour d’Angoulême.',
    rayons: ['Commodes', "Tables d'appoint", 'Assises', 'Rangements'],
    photo: photos.commodeVases,
    galerie: [photos.commodeVases, photos.commodeVannerie, photos.tableVannerie],
    livraison: true,
  },
  {
    slug: 'vaisselle-linge',
    titre: 'Vaisselle & linge de maison',
    accroche: 'Grès, céramique, plaids et textiles.',
    intro: 'Vaisselle en grès et en céramique, plaids et linge de maison pour habiller la table et le salon.',
    rayons: ['Assiettes et bols', 'Saladiers', 'Plaids', 'Coussins', 'Linge de table'],
    photo: photos.artDeLaTable,
    galerie: [photos.artDeLaTable, photos.ceramiqueVerte, photos.boutiqueRayons],
  },
  {
    slug: 'vetements-accessoires',
    titre: 'Vêtements & accessoires',
    accroche: 'Sacs en cuir, écharpes, trousses.',
    intro: 'Prêt-à-porter femme et homme, sacs en cuir, écharpes et trousses Voglio Bene.',
    rayons: ['Femme', 'Homme', 'Sacs en cuir', 'Écharpes', 'Trousses'],
    photo: photos.sacCuirRouge,
    galerie: [photos.sacCuirRouge, photos.echarpeCarree, photos.sacCuirNoir, photos.trousseVoglioBene, photos.cagoule],
    enLigne: true,
    citation: {
      texte: 'Un petit bijou cette boutique ! Vêtements, décoration, bijoux… et des vendeurs au top, je recommande.',
      source: 'Dominique V. · avis Google',
      cinqEtoiles: true,
    },
  },
  {
    slug: 'bijoux',
    titre: 'Bijoux',
    accroche: 'Bijoux fantaisie en acier inoxydable.',
    intro: 'Colliers, bracelets et boucles d’oreilles fantaisie en acier inoxydable, à porter tous les jours.',
    rayons: ['Colliers', 'Bracelets', "Boucles d'oreilles", 'Bagues'],
    galerie: [],
    citation: {
      texte: 'On y trouve aussi de beaux bijoux. C’est top !',
      source: 'Nadine D. · extrait d’un avis Google',
      cinqEtoiles: true,
    },
  },
  {
    slug: 'seconde-main',
    titre: 'Seconde main & vintage',
    accroche: 'Meubles et objets chinés.',
    intro: 'Meubles anciens repeints et objets chinés, à côté du neuf. Les arrivages sont annoncés sur Instagram.',
    rayons: ['Meubles anciens', 'Objets chinés'],
    photo: photos.commodeVannerie,
    galerie: [photos.commodeVannerie, photos.commodeVases, photos.boutiqueInterieur],
    piecesUniques: true,
    ...(resumeVintage && {
      citation: { texte: resumeVintage, source: 'Résumé des avis par Google', lien: magasin.avisGoogle },
    }),
  },
];

/* Photos : texte alternatif, point d'intérêt et défaut de bord, par fichier (les photos sont partagées entre univers). */
type InfosPhoto = {
  alt: string;
  /** object-position quand le cadre coupe beaucoup la photo (photos très hautes ou très larges). */
  cadrage?: string;
  /** Bande parasite sur le bord droit du fichier, en pixels : retirée à la génération des images. */
  rognageDroite?: number;
};

const infosPhotos = new Map<string, InfosPhoto>(
  (
    [
      [photos.lampeCollage, { alt: 'Lampe à abat-jour tressé devant un grand tableau en collage' }],
      [photos.ceramiqueVerte, { alt: 'Vase en céramique verte émaillée et piles de coupelles' }],
      [photos.tableVannerie, { alt: 'Table d’appoint noire, lampe à abat-jour perlé et boîtes tressées' }],
      [photos.coinSalon, { alt: 'Coin salon de la boutique : suspensions en fibres, table basse, coussins et tapis' }],
      // commode-vases.jpg : bande blanche d'environ 30 px sur le bord droit du fichier.
      [photos.commodeVases, { alt: 'Commode peinte en noir, vases en verre vert et cadres', rognageDroite: 34 }],
      [photos.commodeVannerie, { alt: 'Commode peinte en gris, paniers tressés et fleurs séchées', cadrage: '35% 50%' }],
      [photos.artDeLaTable, { alt: 'Bols, assiettes et saladiers en céramique sur une table de la boutique' }],
      [photos.boutiqueRayons, { alt: 'Rayon de plaids et de linge de maison, paniers et vaisselle' }],
      [photos.sacCuirRouge, { alt: 'Sac à main en cuir rouge à motifs en relief' }],
      [photos.echarpeCarree, { alt: 'Écharpe carrée beige à motifs noirs, portée sur un mannequin', cadrage: '50% 35%' }],
      [photos.sacCuirNoir, { alt: 'Sac à main en cuir noir posé sur une valise' }],
      [photos.trousseVoglioBene, { alt: 'Trousse Voglio Bene imprimée d’une Vénus entourée de fleurs' }],
      [photos.cagoule, { alt: 'Cagoule en maille noire sur un mannequin', cadrage: '50% 20%' }],
      [photos.boutiqueInterieur, { alt: 'Intérieur de la boutique : suspensions, vannerie murale, coussins et plantes' }],
    ] as [ImageMetadata, InfosPhoto][]
  ).map(([photo, infos]) => [photo.src, infos]),
);

export function infosPhoto(photo: ImageMetadata): InfosPhoto {
  return infosPhotos.get(photo.src) ?? { alt: '' };
}

/** Typographie française à l'affichage : apostrophe courbe, espace insécable avant « ! ? : ; » et dans les guillemets. */
export function typo(texte: string) {
  return texte
    .replace(/'/g, '\u2019')
    .replace(/ ([!?:;»])/g, '\u00a0$1')
    .replace(/« /g, '«\u00a0');
}
