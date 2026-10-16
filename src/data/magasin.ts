import type { ImageMetadata } from 'astro';
import boutiqueInterieur from '../assets/photos/boutique-interieur.jpg';
import boutiqueRayons from '../assets/photos/boutique-rayons.jpg';
import coinSalon from '../assets/photos/coin-salon.jpg';
import artDeLaTable from '../assets/photos/art-de-la-table.jpg';
import commodeVannerie from '../assets/photos/commode-vannerie.jpg';
import commodeVases from '../assets/photos/commode-vases.jpg';
import lampeCollage from '../assets/photos/lampe-collage.jpg';
import ceramiqueVerte from '../assets/photos/ceramique-verte.jpg';
import tableVannerie from '../assets/photos/table-vannerie.jpg';
import sacCuirRouge from '../assets/photos/sac-cuir-rouge.jpg';
import sacCuirNoir from '../assets/photos/sac-cuir-noir.jpg';
import echarpeCarree from '../assets/photos/echarpe-carree.jpg';
import trousseVoglioBene from '../assets/photos/trousse-voglio-bene.jpg';
import cagoule from '../assets/photos/cagoule.jpg';
import heroOrdinateur from '../assets/photos/hero-ordinateur.jpg';
import heroMobile from '../assets/photos/hero-mobile.jpg';

export const photos = {
  boutiqueInterieur,
  boutiqueRayons,
  coinSalon,
  artDeLaTable,
  commodeVannerie,
  commodeVases,
  lampeCollage,
  ceramiqueVerte,
  tableVannerie,
  sacCuirRouge,
  sacCuirNoir,
  echarpeCarree,
  trousseVoglioBene,
  cagoule,
  heroOrdinateur,
  heroMobile,
};

const adresseRecherche = 'BH 73, 381 Rue de Bordeaux, 16000 Angoulême';

export const magasin = {
  nom: 'BH 73',
  sousTitre: 'Concept store',
  adresse: { rue: '381 rue de Bordeaux', ville: '16000 Angoulême' },
  telephone: { affiche: '07 68 68 01 03', lien: 'tel:+33768680103' },
  email: 'bh.73@yahoo.com',
  instagram: { compte: '@bh.73angouleme', url: 'https://www.instagram.com/bh.73angouleme/' },
  facebook: 'https://www.facebook.com/p/BH-73-100075398815713/',
  boutiqueEnLigne: 'https://bh73conceptstore.myshopify.com',
  itineraire: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(adresseRecherche)}`,
  carte: `https://www.google.com/maps?q=${encodeURIComponent(adresseRecherche)}&output=embed`,
  avisGoogle: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('BH 73 concept store Angoulême')}`,
};

// Horaires d'exemple : à remplacer par les vrais avant la mise en ligne.
// Index 0 = dimanche, comme Date.getDay(). Chaque créneau : [ouverture, fermeture] en "HH:MM".
export const horairesAConfirmer = true;
export const horaires: { jour: string; creneaux: [string, string][] }[] = [
  { jour: 'Dimanche', creneaux: [] },
  { jour: 'Lundi', creneaux: [] },
  { jour: 'Mardi', creneaux: [['10:00', '12:30'], ['14:00', '19:00']] },
  { jour: 'Mercredi', creneaux: [['10:00', '12:30'], ['14:00', '19:00']] },
  { jour: 'Jeudi', creneaux: [['10:00', '12:30'], ['14:00', '19:00']] },
  { jour: 'Vendredi', creneaux: [['10:00', '12:30'], ['14:00', '19:00']] },
  { jour: 'Samedi', creneaux: [['10:00', '19:00']] },
];

export type Univers = {
  slug: string;
  titre: string;
  accroche: string;
  intro: string;
  rayons: string[];
  photo?: ImageMetadata;
  galerie: ImageMetadata[];
};

export const univers: Univers[] = [
  {
    slug: 'decoration',
    titre: 'Décoration & plantes',
    accroche: 'Luminaires, vannerie, céramique, plantes.',
    intro:
      "Suspensions en fibres naturelles, céramiques émaillées, tentures Voglio Bene, coussins et plantes : de quoi changer l'ambiance d'une pièce sans tout refaire.",
    rayons: ['Luminaires', 'Vannerie', 'Céramique et vases', 'Tentures', 'Coussins et plaids', 'Plantes'],
    photo: lampeCollage,
    galerie: [lampeCollage, ceramiqueVerte, tableVannerie, coinSalon],
  },
  {
    slug: 'mobilier',
    titre: 'Mobilier',
    accroche: 'Commodes, tables d’appoint, assises.',
    intro:
      'Des meubles choisis un par un, souvent en exemplaire unique. Livraison possible dans un rayon de 20 km autour du magasin.',
    rayons: ['Commodes', "Tables d'appoint", 'Assises', 'Rangements'],
    photo: commodeVases,
    galerie: [commodeVases, commodeVannerie, tableVannerie],
  },
  {
    slug: 'vaisselle-linge',
    titre: 'Vaisselle & linge de maison',
    accroche: 'Grès, céramique, plaids et textiles.',
    intro: 'Vaisselle en grès et en céramique, à l’unité ou en service, et linge de maison pour habiller la table et le salon.',
    rayons: ['Assiettes et bols', 'Saladiers', 'Plaids', 'Coussins', 'Linge de table'],
    photo: artDeLaTable,
    galerie: [artDeLaTable, ceramiqueVerte, boutiqueRayons],
  },
  {
    slug: 'vetements-accessoires',
    titre: 'Vêtements & accessoires',
    accroche: 'Sacs en cuir, écharpes, trousses.',
    intro:
      'Prêt-à-porter femme et homme, sacs en cuir, écharpes et trousses Voglio Bene. Une partie de la sélection se commande aussi en ligne.',
    rayons: ['Femme', 'Homme', 'Sacs en cuir', 'Écharpes', 'Trousses'],
    photo: sacCuirRouge,
    galerie: [sacCuirRouge, echarpeCarree, sacCuirNoir, trousseVoglioBene, cagoule],
  },
  {
    slug: 'bijoux',
    titre: 'Bijoux',
    accroche: 'Bijoux fantaisie en acier inoxydable.',
    intro: 'Colliers, bracelets et boucles d’oreilles fantaisie en acier inoxydable, à porter tous les jours.',
    rayons: ['Colliers', 'Bracelets', "Boucles d'oreilles", 'Bagues'],
    galerie: [],
  },
  {
    slug: 'seconde-main',
    titre: 'Seconde main & vintage',
    accroche: 'Des pièces chinées, remises en valeur.',
    intro:
      'Meubles anciens repeints, objets chinés, pièces uniques : quand elles partent, elles ne reviennent pas. Les arrivages passent d’abord sur Instagram.',
    rayons: ['Meubles anciens', 'Objets chinés', 'Pièces uniques'],
    photo: commodeVannerie,
    galerie: [commodeVannerie, commodeVases, boutiqueInterieur],
  },
];

// Avis Google affichés sur le site actuel (prénom + initiale).
export const avis = [
  {
    auteur: 'Isabelle L.',
    texte:
      "Whaou ! Super découverte à Angoulême. Magasin multifacettes. On y trouve des objets très divers présentés harmonieusement. Les prix sont abordables, surtout pour des modèles bien plus originaux que ce que l'on trouve sur le plateau.",
  },
  {
    auteur: 'Hervé R.',
    texte:
      'Ambiance zen. Quand vous rentrez dans la boutique, vous êtes tout de suite dans l’ambiance, avec de très belles pièces de décoration. Personnel accueillant et souriant. Je recommande vivement !',
  },
  {
    auteur: 'Minerve C.',
    texte: 'Très belle découverte du jour, tout y est : belle marchandise bien agencée, tarifs corrects et accueil très chaleureux. Allez-y !',
  },
  {
    auteur: 'Marc L.',
    texte: 'Excellents conseils, précédés d’un accueil chaleureux sans être intrusif.',
  },
];
