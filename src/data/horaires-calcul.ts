// Calculs sur les horaires, sans dépendance : utilisés au build (textes de repli) et dans le navigateur (badge en direct).
import type { Creneau, Fermeture, JourHoraires } from './horaires';

export type EtatBoutique = {
  etat: 'ouvert' | 'ferme';
  texte: string;
  /** Jour de la semaine à Paris, 0 = dimanche. */
  jour: number;
  /** Date du jour à Paris, "AAAA-MM-JJ". */
  date: string;
};

const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const UN_JOUR = 86_400_000;
// Espace insécable : « 10 h » ne se coupe jamais en fin de ligne.
const INSECABLE = '\u00A0';

export const enMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** "10:00" → « 10 h », "18:30" → « 18 h 30 ». */
export const enHeure = (hhmm: string) => {
  const [h, m] = hhmm.split(':');
  return m === '00' ? `${Number(h)}${INSECABLE}h` : `${Number(h)}${INSECABLE}h${INSECABLE}${m}`;
};

/** [["10:00", "19:00"]] → « 10 h – 19 h » ; aucun créneau → « Fermé ». */
export const formatCreneaux = (creneaux: Creneau[]) =>
  creneaux.length ? creneaux.map(([o, f]) => `${enHeure(o)}${INSECABLE}– ${enHeure(f)}`).join(' · ') : 'Fermé';

/** Horaires habituels en une phrase, lisible sans JavaScript : « Ouvert du mardi au samedi, 10 h – 19 h ». */
export function resumeHoraires(semaine: JourHoraires[]) {
  // Lundi en premier ; les jours consécutifs qui ont les mêmes créneaux sont regroupés.
  const ordre = [1, 2, 3, 4, 5, 6, 0];
  const groupes: { debut: number; fin: number; creneaux: string }[] = [];
  let precedent = -1;
  for (const i of ordre) {
    const creneaux = semaine[i].creneaux.length ? formatCreneaux(semaine[i].creneaux) : '';
    const dernier = groupes.at(-1);
    if (creneaux && dernier && dernier.fin === precedent && dernier.creneaux === creneaux) dernier.fin = i;
    else if (creneaux) groupes.push({ debut: i, fin: i, creneaux });
    precedent = i;
  }
  if (!groupes.length) return 'Horaires à venir';
  const parties = groupes.map(
    (g) => `${g.debut === g.fin ? `le ${JOURS[g.debut]}` : `du ${JOURS[g.debut]} au ${JOURS[g.fin]}`}, ${g.creneaux}`,
  );
  return `Ouvert ${parties.join(' ; ')}`;
}

/** Date et heure à Paris, quel que soit le fuseau de l'appareil du visiteur. */
export function heureDeParis(instant: Date) {
  const parties = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant);
  const val = (type: Intl.DateTimeFormatPartTypes) => Number(parties.find((p) => p.type === type)?.value);
  return { annee: val('year'), mois: val('month'), jour: val('day'), minutes: (val('hour') % 24) * 60 + val('minute') };
}

/** Date du jour à Paris, "AAAA-MM-JJ". */
export function dateDeParis(instant: Date) {
  const { annee, mois, jour } = heureDeParis(instant);
  return new Date(Date.UTC(annee, mois - 1, jour)).toISOString().slice(0, 10);
}

const quantieme = (n: number) => (n === 1 ? '1er' : String(n));

const estFermeLe = (date: string, fermetures: Fermeture[]) => fermetures.some((f) => date >= f.du && date <= f.au);

/** Période d'une fermeture exceptionnelle : « le jeudi 24 décembre », « du 24 au 26 décembre », « du 30 décembre au 2 janvier ». */
export function formatPeriode(f: Fermeture) {
  const lire = (iso: string) => {
    const [a, m, j] = iso.split('-').map(Number);
    return { j, m: m - 1, jourSemaine: new Date(Date.UTC(a, m - 1, j)).getUTCDay() };
  };
  const du = lire(f.du);
  const au = lire(f.au);
  if (f.du === f.au) return `le ${JOURS[du.jourSemaine]} ${quantieme(du.j)} ${MOIS[du.m]}`;
  return `du ${quantieme(du.j)}${du.m === au.m ? '' : ` ${MOIS[du.m]}`} au ${quantieme(au.j)} ${MOIS[au.m]}`;
}

/**
 * Badge « Ouvert / Fermé » calculé à l'heure de Paris.
 * Règles : ouvert → « ferme à 19 h », puis « ferme dans 35 min » pendant la dernière heure (minutes réelles) ;
 * fermé → prochaine ouverture réelle : « ouvre dans 20 min » (moins d'une heure avant), « ouvre à 10 h » (le jour même),
 * « ouvre demain à 10 h », « ouvre mardi à 10 h », au-delà d'une semaine « ouvre le mardi 3 novembre à 10 h ».
 * Les fermetures exceptionnelles sont sautées.
 */
export function etatBoutique(instant: Date, semaine: JourHoraires[], fermetures: Fermeture[] = []): EtatBoutique {
  const { annee, mois, jour, minutes } = heureDeParis(instant);
  // Calendrier compté en UTC : ajouter des jours ne dépend pas du passage à l'heure d'été.
  const minuit = Date.UTC(annee, mois - 1, jour);
  const dans = (decalage: number) => {
    const d = new Date(minuit + decalage * UN_JOUR);
    return { index: d.getUTCDay(), date: d.toISOString().slice(0, 10), quantieme: d.getUTCDate(), mois: d.getUTCMonth() };
  };
  const aujourdhui = dans(0);
  const base = { jour: aujourdhui.index, date: aujourdhui.date };
  const exceptionnel = estFermeLe(aujourdhui.date, fermetures);

  // Dans les textes, les espaces insécables gardent ensemble « Ouvert · » et « 35 min » en fin de ligne.
  if (!exceptionnel) {
    const enCours = semaine[aujourdhui.index].creneaux.find(([o, f]) => minutes >= enMinutes(o) && minutes < enMinutes(f));
    if (enCours) {
      const reste = enMinutes(enCours[1]) - minutes;
      const texte =
        reste < 60
          ? `Ouvert${INSECABLE}· ferme dans ${reste}${INSECABLE}min`
          : `Ouvert${INSECABLE}· ferme à ${enHeure(enCours[1])}`;
      return { ...base, etat: 'ouvert', texte };
    }
  }

  const debut = exceptionnel ? `Fermé exceptionnellement${INSECABLE}· rouvre` : `Fermé${INSECABLE}· ouvre`;
  for (let decalage = 0; decalage <= 366; decalage++) {
    const j = dans(decalage);
    if (estFermeLe(j.date, fermetures)) continue;
    const prochain = semaine[j.index].creneaux.find(([o]) => decalage > 0 || enMinutes(o) > minutes);
    if (!prochain) continue;
    const heure = enHeure(prochain[0]);
    const attente = enMinutes(prochain[0]) - minutes;
    let quand: string;
    if (decalage === 0) quand = attente < 60 ? `dans ${attente}${INSECABLE}min` : `à ${heure}`;
    else if (decalage === 1) quand = `demain à ${heure}`;
    else if (decalage < 7) quand = `${JOURS[j.index]} à ${heure}`;
    else quand = `le ${JOURS[j.index]} ${quantieme(j.quantieme)} ${MOIS[j.mois]} à ${heure}`;
    return { ...base, etat: 'ferme', texte: `${debut} ${quand}` };
  }
  return { ...base, etat: 'ferme', texte: 'Fermé' };
}
