// Internacionalización con vue-i18n (Composition API, `legacy: false`).
//
// - Los textos viven en ./locales; los componentes usan `useI18n()` y nunca
//   llevan texto visible escrito a mano.
// - El idioma elegido se guarda en localStorage y se recupera en la siguiente visita.
// - Al cambiar de idioma se actualizan `<html lang>`, el título y la
//   descripción de la página (y sus equivalentes Open Graph).

import { createI18n } from 'vue-i18n'
import type { MessageSchema } from './schema'
import es from './locales/es'
import en from './locales/en'
import pt from './locales/pt'
import fr from './locales/fr'

export const locales = ['es', 'en', 'pt', 'fr'] as const
export type Locale = (typeof locales)[number]

export const DEFAULT_LOCALE: Locale = 'es'

/** Cada idioma se nombra en su propia lengua, como se espera en un selector. */
export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
}

/** Para `og:locale`. */
const ogLocales: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_GB',
  pt: 'pt_PT',
  fr: 'fr_FR',
}

const STORAGE_KEY = 'casa-fidel:idioma'

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

// localStorage puede no existir o lanzar (modo privado, cookies bloqueadas):
// en ese caso la web funciona igual, solo que no recuerda el idioma.
function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    // Sin almacenamiento disponible.
  }
  return DEFAULT_LOCALE
}

function storeLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Sin almacenamiento disponible.
  }
}

export const i18n = createI18n<[MessageSchema], Locale, false>({
  legacy: false,
  locale: readStoredLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: { es, en, pt, fr },
})

// Precios en euros con las convenciones europeas de cada idioma: «12,00 €» en
// es/pt/fr y «€12.00» en inglés. `pt` a secas sería portugués de Brasil
// («€ 12,00»), por eso se fija la variante regional.
const priceFormatters: Record<Locale, Intl.NumberFormat> = {
  es: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }),
  en: new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }),
  pt: new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }),
  fr: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }),
}

export function formatPrice(price: number, locale: Locale): string {
  return priceFormatters[locale].format(price)
}

function setMeta(selector: string, content: string) {
  document.head.querySelector(selector)?.setAttribute('content', content)
}

/** Lleva el idioma actual al documento: `lang`, título y metadatos SEO. */
export function applyDocumentLocale() {
  const { locale, t } = i18n.global
  const current = locale.value
  const title = t('meta.title')
  const description = t('meta.description')

  document.documentElement.lang = current
  document.title = title
  setMeta('meta[name="description"]', description)
  setMeta('meta[property="og:title"]', title)
  setMeta('meta[property="og:description"]', description)
  setMeta('meta[property="og:locale"]', ogLocales[current])
}

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  storeLocale(locale)
  applyDocumentLocale()
}
