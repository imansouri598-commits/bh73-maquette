// Horaires relevés sur la fiche Google le 16/10/2026.
// Index 0 = dimanche, comme Date.getDay(). Chaque créneau : [ouverture, fermeture] en "HH:MM", heure de Paris.
export type Creneau = [string, string];
export type JourHoraires = { jour: string; creneaux: Creneau[] };

export const horairesAConfirmer = false;
export const horaires: JourHoraires[] = [
  { jour: 'Dimanche', creneaux: [] },
  { jour: 'Lundi', creneaux: [] },
  { jour: 'Mardi', creneaux: [['10:00', '19:00']] },
  { jour: 'Mercredi', creneaux: [['10:00', '19:00']] },
  { jour: 'Jeudi', creneaux: [['10:00', '19:00']] },
  { jour: 'Vendredi', creneaux: [['10:00', '19:00']] },
  { jour: 'Samedi', creneaux: [['10:00', '19:00']] },
];

// Fermetures exceptionnelles (congés, jour férié…) : dates "AAAA-MM-JJ" à l'heure de Paris, bornes incluses.
// Le badge « Ouvert / Fermé » et les infos pratiques en tiennent compte automatiquement.
// Liste vide par défaut : n'y ajouter que des dates confirmées par la boutique.
// Forme d'une entrée : { du: 'AAAA-MM-JJ', au: 'AAAA-MM-JJ', motif: 'Congés' } (motif facultatif).
export type Fermeture = { du: string; au: string; motif?: string };
export const fermeturesExceptionnelles: Fermeture[] = [];
