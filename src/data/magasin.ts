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

// Chiffres et mentions vérifiables, relevés le 16/10/2026. N'en afficher aucun autre.
export const preuves = {
  releveLe: '16/10/2026',
  instagram: { abonnes: 4978, publications: 984 },
  // Encadré « Bon à savoir » de la fiche Google Maps (résumé généré par Google à partir des avis).
  googleBonASavoir: [
    'Le stationnement est aisé et permet de flâner sans stress',
    'Les visiteurs adorent chiner des objets vintage originaux et variés dans cette boutique',
  ],
};
