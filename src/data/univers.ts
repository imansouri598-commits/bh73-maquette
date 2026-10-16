import type { ImageMetadata } from 'astro';
import { photos } from './magasin';

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
    photo: photos.lampeCollage,
    galerie: [photos.lampeCollage, photos.ceramiqueVerte, photos.tableVannerie, photos.coinSalon],
  },
  {
    slug: 'mobilier',
    titre: 'Mobilier',
    accroche: 'Commodes, tables d’appoint, assises.',
    intro:
      'Des meubles choisis un par un, souvent en exemplaire unique. Livraison possible dans un rayon de 20 km autour du magasin.',
    rayons: ['Commodes', "Tables d'appoint", 'Assises', 'Rangements'],
    photo: photos.commodeVases,
    galerie: [photos.commodeVases, photos.commodeVannerie, photos.tableVannerie],
  },
  {
    slug: 'vaisselle-linge',
    titre: 'Vaisselle & linge de maison',
    accroche: 'Grès, céramique, plaids et textiles.',
    intro: 'Vaisselle en grès et en céramique, à l’unité ou en service, et linge de maison pour habiller la table et le salon.',
    rayons: ['Assiettes et bols', 'Saladiers', 'Plaids', 'Coussins', 'Linge de table'],
    photo: photos.artDeLaTable,
    galerie: [photos.artDeLaTable, photos.ceramiqueVerte, photos.boutiqueRayons],
  },
  {
    slug: 'vetements-accessoires',
    titre: 'Vêtements & accessoires',
    accroche: 'Sacs en cuir, écharpes, trousses.',
    intro:
      'Prêt-à-porter femme et homme, sacs en cuir, écharpes et trousses Voglio Bene. Une partie de la sélection se commande aussi en ligne.',
    rayons: ['Femme', 'Homme', 'Sacs en cuir', 'Écharpes', 'Trousses'],
    photo: photos.sacCuirRouge,
    galerie: [photos.sacCuirRouge, photos.echarpeCarree, photos.sacCuirNoir, photos.trousseVoglioBene, photos.cagoule],
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
    photo: photos.commodeVannerie,
    galerie: [photos.commodeVannerie, photos.commodeVases, photos.boutiqueInterieur],
  },
];
