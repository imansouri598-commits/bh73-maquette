import { magasin } from './magasin';

export type ProduitEnLigne = {
  /** Titre complet mis au propre, ex. « Tenture Vénus de Voglio Bene ». */
  titre: string;
  /** Titre sans la marque, pour les cartes, ex. « Tenture Vénus ». */
  nom: string;
  /** Marque reconnue en fin de titre (« Voglio Bene »), sinon absente. */
  marque?: string;
  prix: string;
  /** Photo principale en 720 px de large, et ses autres tailles pour srcset. */
  image: string;
  srcset: string;
  url: string;
  /** Présent seulement si le produit est « Nouveau » au build : date ISO à laquelle il cesse de l'être. */
  nouveauJusqua?: string;
  /** Agrandissement de la photo dans son cadre (1 = aucun). */
  zoom: number;
};

export type BoutiqueEnLigne = {
  produits: ProduitEnLigne[];
  /** Nombre total de produits publiés sur la boutique en ligne. */
  total: number;
};

type ProduitShopify = {
  title: string;
  handle: string;
  published_at: string | null;
  images: { src: string }[];
  variants: { price: string; available: boolean }[];
};

// Produits mis en avant, dans l'ordre d'affichage (2 × 2 sur mobile, 4 de front sur ordinateur) :
// quatre familles différentes (sac, écharpe, tenture, trousse) et des prix variés.
// Si l'un d'eux n'est plus disponible, les produits les plus récents prennent le relais,
// en privilégiant une famille qui n'est pas encore affichée.
// zoom : les photos de tentures ont un fond blanc de studio sur les côtés, qu'un léger agrandissement masque.
const selection: { handle: string; zoom?: number }[] = [
  { handle: 'sac-a-main-en-cuir' },
  { handle: 'echarpe-carree' },
  { handle: 'tenture-venus-de-voglio-bene', zoom: 1.14 },
  { handle: 'trousse-carmen-de-voglio-bene' },
];

// Règle « Nouveau » : produit mis en ligne sur Shopify (published_at) moins de 60 jours avant la génération du site.
// EnLigne.astro revérifie cette limite dans le navigateur, pour qu'une page générée il y a longtemps
// n'affiche pas un « Nouveau » périmé.
const DUREE_NOUVEAU_JOURS = 60;
const UN_JOUR = 24 * 60 * 60 * 1000;

// Les titres Shopify sont saisis à la main : on en corrige la forme, jamais le fond.
const retouches: [RegExp, string][] = [
  [/\s+/g, ' '], // espaces en double
  [/'/g, '’'], // apostrophe typographique
  [/\bmainen\b/gi, 'main en'], // « Sac à mainen cuir »
  [/porter épaule/gi, 'porté épaule'], // « … taupe porter épaule »
  [/gris, taupe/gi, 'gris taupe'],
  // « Tenture Starfire poli au Bénin » : la description du produit dit « Tenture "Starfire" de voglio bene ».
  [/poli au Bénin/gi, 'de voglio bene'],
];
// La marque Voglio Bene, citée en fin de titre avec ou sans « de » et dans n'importe quelle casse.
const marqueEnFin = /\s+(?:de\s+)?voglio\s+bene$/i;

function nettoyer(brut: string): Pick<ProduitEnLigne, 'titre' | 'nom' | 'marque'> {
  let titre = retouches.reduce((t, [motif, par]) => t.replace(motif, par), brut).replace(/[\s.]+$/, '').trim();
  titre = titre.charAt(0).toUpperCase() + titre.slice(1);
  if (!marqueEnFin.test(titre)) return { titre, nom: titre };
  const nom = titre.replace(marqueEnFin, '');
  return { titre: `${nom} de Voglio Bene`, nom, marque: 'Voglio Bene' };
}

// Famille = premier mot du titre (« sac », « écharpe », « tenture »…), sans tenir compte de « Grande ».
const famille = (p: ProduitShopify) => nettoyer(p.title).nom.toLowerCase().replace(/^grande\s+/, '').split(' ')[0];

// 145 € plutôt que 145,00 € ; les centimes restent quand il y en a.
const euros = (montant: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(montant) ? 0 : 2,
  }).format(montant);

function prixAffiche(p: ProduitShopify) {
  const montants = p.variants.filter((v) => v.available).map((v) => Number(v.price));
  const minimum = Math.min(...montants);
  return montants.some((m) => m !== minimum) ? `À partir de ${euros(minimum)}` : euros(minimum);
}

const LARGEURS_IMAGE = [360, 540, 720];
const imageEnLargeur = (src: string, largeur: number) => `${src}${src.includes('?') ? '&' : '?'}width=${largeur}`;

function versProduit(p: ProduitShopify, zoom: number, maintenant: number): ProduitEnLigne {
  const misEnLigne = p.published_at ? Date.parse(p.published_at) : NaN;
  const finNouveau = misEnLigne + DUREE_NOUVEAU_JOURS * UN_JOUR;
  const src = p.images[0].src;
  return {
    ...nettoyer(p.title),
    prix: prixAffiche(p),
    image: imageEnLargeur(src, 720),
    srcset: LARGEURS_IMAGE.map((l) => `${imageEnLargeur(src, l)} ${l}w`).join(', '),
    url: `${magasin.boutiqueEnLigne}/products/${p.handle}`,
    nouveauJusqua: finNouveau > maintenant ? new Date(finNouveau).toISOString() : undefined,
    zoom,
  };
}

// Lu au moment de la génération du site : la vitrine suit le catalogue Shopify sans saisie en double.
// L'API publique donne la disponibilité (available) mais aucune quantité en stock.
// Si le catalogue est injoignable, la liste revient vide et la section boutique n'est pas affichée.
export async function boutiqueEnLigne(nombre = 4): Promise<BoutiqueEnLigne> {
  try {
    const reponse = await fetch(`${magasin.boutiqueEnLigne}/products.json?limit=250`, {
      signal: AbortSignal.timeout(15_000),
    });
    if (!reponse.ok) throw new Error(`réponse ${reponse.status}`);
    const { products } = (await reponse.json()) as { products: ProduitShopify[] };

    const disponibles = products.filter((p) => p.images.length > 0 && p.variants.some((v) => v.available));
    const choisis: { p: ProduitShopify; zoom: number }[] = [];
    for (const { handle, zoom = 1 } of selection) {
      const p = disponibles.find((x) => x.handle === handle);
      if (p) choisis.push({ p, zoom });
    }

    const dateDeMiseEnLigne = (p: ProduitShopify) => Date.parse(p.published_at ?? '') || 0;
    const recents = [...disponibles].sort((a, b) => dateDeMiseEnLigne(b) - dateDeMiseEnLigne(a));
    for (const autoriserMemeFamille of [false, true]) {
      for (const p of recents) {
        if (choisis.length >= nombre) break;
        if (choisis.some((c) => c.p === p)) continue;
        if (!autoriserMemeFamille && choisis.some((c) => famille(c.p) === famille(p))) continue;
        choisis.push({ p, zoom: 1 });
      }
    }

    const maintenant = Date.now();
    return {
      produits: choisis.slice(0, nombre).map(({ p, zoom }) => versProduit(p, zoom, maintenant)),
      total: products.length,
    };
  } catch (erreur) {
    console.warn(`[boutique] Catalogue Shopify injoignable, section boutique masquée : ${erreur}`);
    return { produits: [], total: 0 };
  }
}

export async function produitsEnLigne(nombre = 4): Promise<ProduitEnLigne[]> {
  return (await boutiqueEnLigne(nombre)).produits;
}
