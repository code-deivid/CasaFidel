// Estructura y precios de la carta de Casa Fidel, transcrita de
// public/images/referencias/carta-original.png.
//
// Aquí solo hay datos que no dependen del idioma: el orden, los identificadores
// y los precios. Los nombres de categorías y platos, y sus descripciones, están
// en src/i18n/locales (claves `menu.categories.<id>` y `menu.dishes.<id>`).
//
// Precios: tal como aparecen en la fotografía de la carta. Están PENDIENTES DE
// CONFIRMAR con el restaurante (ver README); la web no muestra ningún aviso.
// `reviewNote`: dudas internas, solo visibles con `npm run dev`.

export interface MenuItem {
  /** También es la clave de su nombre en las traducciones. */
  id: string
  /** Precio en euros. */
  price: number
  /** El precio es por unidad (se muestra «/ unidad» traducido). */
  perUnit?: boolean
  /** La carta indica ingredientes: hay `description` en las traducciones. */
  hasDescription?: boolean
  reviewNote?: string
}

export interface MenuCategory {
  /** También es la clave de su título y el ancla `#carta-<id>`. */
  id: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'entrantes',
    items: [
      { id: 'cecinaCiervo', price: 12 },
      { id: 'boletusPerdiz', price: 10 },
      { id: 'morcillaManzana', price: 9 },
      { id: 'tostasFidel', price: 4.5, perUnit: true },
      { id: 'croquetasBoletus', price: 9 },
      { id: 'croquetasJamon', price: 9 },
      { id: 'croquetasCalamar', price: 9 },
      { id: 'calamaresRomana', price: 8 },
    ],
  },
  {
    id: 'ensaladas',
    items: [
      { id: 'ensaladaVentresca', price: 9, hasDescription: true },
      { id: 'ensaladaRuloCabra', price: 9, hasDescription: true },
      { id: 'ensaladaMixta', price: 8, hasDescription: true },
    ],
  },
  {
    id: 'mollejas',
    items: [
      { id: 'mollejasGuisadas', price: 10 },
      { id: 'mollejasBrasa', price: 10 },
      { id: 'hamburguesaMollejas', price: 11 },
    ],
  },
  {
    id: 'verduras',
    items: [
      { id: 'parrilladaVerduras', price: 9 },
      { id: 'puerrosRomesco', price: 9, hasDescription: true },
    ],
  },
  {
    id: 'carnes',
    items: [
      {
        id: 'solomilloFrances',
        price: 14.5,
        reviewNote:
          'Confirmar qué pieza es el «solomillo francés» para afinar la traducción (hoy literal).',
      },
      { id: 'solomilloCerdoCrema', price: 12 },
      { id: 'chuletillasCordero', price: 18 },
      { id: 'chuletaTernera', price: 19 },
      { id: 'solomilloTernera', price: 20 },
      { id: 'steakTartar', price: 20 },
      { id: 'hamburguesaRuloCabra', price: 12 },
      { id: 'churrascoTernera', price: 12 },
      { id: 'lagrimasIberico', price: 14 },
    ],
  },
  {
    id: 'pescados',
    items: [
      { id: 'bacalaoAsado', price: 16 },
      { id: 'bacalaoConfitado', price: 16.5 },
      { id: 'rodaballo', price: 20 },
    ],
  },
]
