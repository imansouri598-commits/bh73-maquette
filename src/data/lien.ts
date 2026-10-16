// Préfixe les chemins internes avec le dossier de publication (ex. /bh73-maquette/ sur GitHub Pages).
export function lien(chemin: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${chemin.startsWith('/') ? chemin : `/${chemin}`}`;
}
