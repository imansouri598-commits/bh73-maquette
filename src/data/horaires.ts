// Horaires relevés sur la fiche Google le 16/10/2026.
// Index 0 = dimanche, comme Date.getDay(). Chaque créneau : [ouverture, fermeture] en "HH:MM".
export const horairesAConfirmer = false;
export const horaires: { jour: string; creneaux: [string, string][] }[] = [
  { jour: 'Dimanche', creneaux: [] },
  { jour: 'Lundi', creneaux: [] },
  { jour: 'Mardi', creneaux: [['10:00', '19:00']] },
  { jour: 'Mercredi', creneaux: [['10:00', '19:00']] },
  { jour: 'Jeudi', creneaux: [['10:00', '19:00']] },
  { jour: 'Vendredi', creneaux: [['10:00', '19:00']] },
  { jour: 'Samedi', creneaux: [['10:00', '19:00']] },
];
