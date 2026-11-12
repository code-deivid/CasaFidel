// Todas las fotografías de la web se declaran aquí.
// Los componentes reciben una `SiteImage` y nunca escriben rutas a mano.
// El texto alternativo se traduce: vive en src/i18n/locales (clave `images.<id>`).
//
// CÓMO AÑADIR O SUSTITUIR UNA FOTO
// 1. Deja el original en public/images/restaurante y regístralo en
//    scripts/optimizar-imagenes.mjs; ejecuta `npm run images`.
// 2. Declárala aquí con `file`, `widths`, `width` y `height`.
// 3. Añade su texto alternativo en los cuatro idiomas (`images.<id>`).

export interface SiteImage {
  /** Identificador; también es la clave de su texto alternativo (`images.<id>`). */
  id: 'facade' | 'diningRoom1' | 'diningRoom2' | 'bar1' | 'bar2' | 'people' | 'tioPedroLogo'
  /** Nombre base generado por el script, sin ancho ni extensión. */
  file: string
  /** Anchos disponibles en public/images/fotos. */
  widths: number[]
  /** Dimensiones originales; sirven para reservar espacio y evitar saltos. */
  width: number
  height: number
  /** Punto de encuadre para `object-position` (por defecto, centro). */
  focus?: string
}

const PHOTO_FOLDER = '/images/fotos'

export function imageSrcSet(image: SiteImage, format: 'avif' | 'webp'): string {
  return image.widths
    .map((width) => `${PHOTO_FOLDER}/${image.file}-${width}.${format} ${width}w`)
    .join(', ')
}

export function imageFallbackSrc(image: SiteImage): string {
  const middleWidth = image.widths[Math.floor(image.widths.length / 2)] ?? image.widths[0]
  return `${PHOTO_FOLDER}/${image.file}-${middleWidth}.webp`
}

const ROOM_WIDTHS = [480, 800, 1200, 1448]

export const images = {
  /** Portada: la puerta y el cartel «Casa fidel» sobre la piedra. */
  facade: {
    id: 'facade',
    file: 'fachada',
    widths: ROOM_WIDTHS,
    width: 1448,
    height: 1086,
    // El cartel queda a la izquierda: en los recortes verticales del móvil no se pierde.
    focus: '22% 50%',
  },
  // Las cuatro fotos del carrusel de «Desde 1955», en este orden.
  diningRoom1: { id: 'diningRoom1', file: 'comedor-1', widths: ROOM_WIDTHS, width: 1448, height: 1086 },
  diningRoom2: { id: 'diningRoom2', file: 'comedor-2', widths: ROOM_WIDTHS, width: 1448, height: 1086 },
  bar1: { id: 'bar1', file: 'barra-1', widths: ROOM_WIDTHS, width: 1448, height: 1086 },
  bar2: { id: 'bar2', file: 'barra-2', widths: ROOM_WIDTHS, width: 1448, height: 1086 },
  /** Fidel ha autorizado el uso de sus imágenes. Sin nombres ni cargos en el pie. */
  people: {
    id: 'people',
    file: 'personas',
    widths: [480, 800, 1200, 1411],
    width: 1411,
    height: 1115,
    // Las caras quedan en el tercio superior.
    focus: '50% 25%',
  },
  /** Logotipo de Embutidos Tío Pedro (fondo claro, sin transparencia). */
  tioPedroLogo: {
    id: 'tioPedroLogo',
    file: 'tio-pedro',
    widths: [240, 480, 720],
    width: 1639,
    height: 960,
  },
} satisfies Record<string, SiteImage>

/** Carrusel de la historia: cada foto con la clave de su pie. */
export const historySlides = [
  { image: images.diningRoom1, caption: 'diningRoomCaption' },
  { image: images.diningRoom2, caption: 'diningRoomCaption' },
  { image: images.bar1, caption: 'barCaption' },
  { image: images.bar2, caption: 'barCaption' },
] as const
