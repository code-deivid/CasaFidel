// Datos del restaurante que no dependen del idioma. Solo información verificada.
// Los textos visibles están en src/i18n/locales.

export interface Address {
  street: string
  postalCode: string
  town: string
  province: string
  region: string
}

export interface SiteInfo {
  name: string
  foundingYear: number
  address: Address
  /** Formato legible, tal como se muestra: "980 681 471". */
  phone: string
  /** Dominio definitivo, p. ej. "https://www.casafidel.es". `null` = sin decidir. */
  siteUrl: string | null
}

export const site: SiteInfo = {
  name: 'Casa Fidel',
  // Facebook oficial del restaurante: «Nuestra casa fue fundada en 1955».
  foundingYear: 1955,
  address: {
    street: 'Calle Llamas, 40',
    postalCode: '49523',
    town: 'San Vitero',
    province: 'Zamora',
    region: 'Aliste',
  },
  // Teléfono confirmado por el restaurante. El enlace es tel:+34980681471.
  phone: '980 681 471',
  siteUrl: null,
}

/** Perfiles oficiales del restaurante. También van en `sameAs` (datos estructurados). */
export const socialLinks = [
  { network: 'Instagram', url: 'https://www.instagram.com/restaurantecasafidel/' },
  { network: 'Facebook', url: 'https://www.facebook.com/restaurantecasafidel' },
] as const

/** Carnicería y embutidos vinculados al restaurante. */
export const tioPedroUrl = 'https://embutidostiopedro.es/'

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.town}, ${site.address.province}`

/** Enlace `tel:` del restaurante. */
export const phoneHref = toTelHref(site.phone)

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Casa Fidel, ${fullAddress}`,
)}`

/** Convierte "980 681 471" en "tel:+34980681471". */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return `tel:+34${digits}`
}

/** Anclas de la página; las etiquetas se traducen (`nav.<key>`). */
export const navigation = [
  { key: 'history', href: '#historia' },
  { key: 'menu', href: '#carta' },
  { key: 'tioPedro', href: '#tio-pedro' },
  { key: 'visit', href: '#visitanos' },
] as const
