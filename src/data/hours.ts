// Horario de Casa Fidel. Fuente única: lo usan «Visítanos» y los datos
// estructurados (vite.config.ts). Los nombres de los días y «Cerrado» se
// traducen en src/i18n/locales; aquí solo hay datos.
//
// No incluye festivos ni horarios especiales: no están confirmados.

export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface TimeRange {
  /** Hora local de apertura, formato 24 h "HH:MM". */
  opens: string
  /** Hora local de cierre, formato 24 h "HH:MM". */
  closes: string
}

export interface DayHours {
  day: Weekday
  /** `null` = cerrado a mediodía. */
  lunch: TimeRange | null
  /** `null` = cerrado por la noche. */
  dinner: TimeRange | null
}

const LUNCH: TimeRange = { opens: '13:00', closes: '16:00' }
const DINNER: TimeRange = { opens: '20:30', closes: '22:00' }
const LATE_DINNER: TimeRange = { opens: '20:30', closes: '23:00' }

/** De lunes a domingo, en el orden en que se muestran. */
export const openingHours: DayHours[] = [
  { day: 'monday', lunch: LUNCH, dinner: null },
  { day: 'tuesday', lunch: null, dinner: null },
  { day: 'wednesday', lunch: LUNCH, dinner: DINNER },
  { day: 'thursday', lunch: LUNCH, dinner: DINNER },
  { day: 'friday', lunch: LUNCH, dinner: LATE_DINNER },
  { day: 'saturday', lunch: LUNCH, dinner: LATE_DINNER },
  { day: 'sunday', lunch: LUNCH, dinner: DINNER },
]
