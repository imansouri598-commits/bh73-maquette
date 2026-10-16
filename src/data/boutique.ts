import { magasin } from './magasin';

export type ProduitEnLigne = {
  titre: string;
  prix: string;
  image: string;
  url: string;
};

type ProduitShopify = {
  title: string;
  handle: string;
  published_at: string;
  images: { src: string }[];
  variants: { price: string; available: boolean }[];
};

// Produits mis en avant ; si l'un d'eux disparaît de la boutique, les plus récents prennent le relais.
const selection = [
  'sac-a-main-en-cuir',
  'tenture-venus-de-voglio-bene',
  'echarpe-carree',
  'sac-a-main-en-cuir-porte-epaule',
];

const formatPrix = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

// Lu au moment de la génération du site : la vitrine suit le catalogue Shopify sans saisie en double.
export async function produitsEnLigne(nombre = 4): Promise<ProduitEnLigne[]> {
  try {
    const reponse = await fetch(`${magasin.boutiqueEnLigne}/products.json?limit=250`);
    if (!reponse.ok) return [];
    const { products } = (await reponse.json()) as { products: ProduitShopify[] };
    const disponibles = products.filter((p) => p.images.length && p.variants.some((v) => v.available));
    const choisis = selection
      .map((handle) => disponibles.find((p) => p.handle === handle))
      .filter((p): p is ProduitShopify => Boolean(p));
    const recents = [...disponibles].sort((a, b) => b.published_at.localeCompare(a.published_at));
    for (const p of recents) {
      if (choisis.length >= nombre) break;
      if (!choisis.includes(p)) choisis.push(p);
    }
    return choisis.slice(0, nombre).map((p) => ({
      titre: p.title.replace(/\s+/g, ' ').trim(),
      prix: formatPrix.format(Number(p.variants[0].price)),
      image: `${p.images[0].src}${p.images[0].src.includes('?') ? '&' : '?'}width=700`,
      url: `${magasin.boutiqueEnLigne}/products/${p.handle}`,
    }));
  } catch {
    return [];
  }
}
