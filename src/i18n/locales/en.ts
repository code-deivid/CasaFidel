// English. Must have exactly the same keys as es.ts.
import type { MessageSchema } from '../schema'

const en: MessageSchema = {
  meta: {
    title: 'Casa Fidel · Restaurant and grill in San Vitero, Aliste (Zamora, Spain)',
    description:
      'Casa Fidel restaurant in San Vitero, in the Aliste region of Zamora (Spain), since 1955. Local cooking built on Aliste beef, chargrilled meats and the full menu.',
  },

  a11y: {
    skipLink: 'Skip to content',
    home: 'Casa Fidel, home',
    newTab: '(opens in a new tab)',
    mapsNewTab: '(Google Maps, opens in a new tab)',
  },

  nav: {
    label: 'Main',
    footerLabel: 'Footer',
    open: 'Open menu',
    close: 'Close menu',
    history: 'History',
    menu: 'Menu',
    tioPedro: 'Tío Pedro',
    visit: 'Visit us',
  },

  language: {
    label: 'Language',
  },

  actions: {
    seeMenu: 'See the menu',
    directions: 'Directions',
    book: 'Book a table',
    call: 'Call {phone}',
  },

  hero: {
    name: 'Restaurante Casa Fidel',
    taglineFirst: 'The taste of Aliste,',
    taglineSecond: 'slow-cooked over fire.',
    summary: 'Local cooking and Aliste beef in San Vitero (Zamora, Spain), since 1955.',
  },

  history: {
    title: 'Since {year}',
    subtitle: 'A story rooted in the land of Aliste',
    lead: 'Casa Fidel was founded in {year}. In our kitchen we cook the produce of this land, with Aliste beef as its foundation.',
    body: 'That is why the grill and the produce lead the menu: beef, lamb and Iberian pork cooked over the embers, our sweetbreads, cured venison, or porcini with marinated partridge.',
    diningRoomCaption: 'The dining room',
    barCaption: 'The bar',
    carousel: {
      label: 'Photos of Casa Fidel',
      roleCarousel: 'carousel',
      roleSlide: 'slide',
      position: '{current} of {total}',
      previous: 'Previous',
      next: 'Next',
      pause: 'Pause the slideshow',
      play: 'Play the slideshow',
    },
  },

  images: {
    facade:
      'Entrance to Casa Fidel: carved wooden doors and, on the stone wall, the sign with the restaurant’s name in deep red.',
    diningRoom1:
      'Casa Fidel’s dining room, with black-clothed tables, curved wooden chairs, a pale beamed ceiling and a stone wall at the back.',
    diningRoom2:
      'Another view of the dining room: tables laid with plates and glasses, wooden chairs and stone walls beneath the ceiling beams.',
    bar1:
      'The bar area at Casa Fidel: counter, high stools, wooden tables and a stone wall lit by pendant lights.',
    bar2:
      'Casa Fidel’s brick bar counter beside a stone wall, with high wooden tables and pendant lights.',
    people: 'Four people smiling at a table in Casa Fidel’s dining room, with several dishes served.',
    tioPedroLogo: 'Logo of Embutidos y Jamones Tío Pedro, traditionally made cured meats and hams.',
  },

  menu: {
    title: 'The menu',
    indexLabel: 'Menu sections',
    perUnit: 'each',
    categories: {
      entrantes: 'Starters',
      ensaladas: 'Salads',
      mollejas: 'Our sweetbreads',
      verduras: 'Vegetables',
      carnes: 'Chargrilled meats',
      pescados: 'Fish',
    },
    dishes: {
      cecinaCiervo: { name: 'Cured venison' },
      boletusPerdiz: { name: 'Porcini mushrooms with marinated partridge' },
      morcillaManzana: { name: 'Blood Sausage with Apple' },
      tostasFidel: { name: 'Fidel’s Signature Toasts' },
      croquetasBoletus: { name: 'Porcini croquettes' },
      croquetasJamon: { name: 'Ham croquettes' },
      croquetasCalamar: { name: 'Squid croquettes' },
      calamaresRomana: { name: 'Battered squid rings' },
      ensaladaVentresca: {
        name: 'Tuna belly and roasted peppers',
        description: 'Lettuce, tuna, roasted peppers and onion.',
      },
      ensaladaRuloCabra: {
        name: 'Goat’s cheese salad',
        description: 'Lettuce, goat’s cheese, ham and walnuts.',
      },
      ensaladaMixta: {
        name: 'Mixed salad',
        description: 'Lettuce, tomato, onion, hard-boiled egg, asparagus and tuna.',
      },
      mollejasGuisadas: { name: 'Stewed' },
      mollejasBrasa: { name: 'Chargrilled' },
      hamburguesaMollejas: { name: 'Sweetbread burger' },
      parrilladaVerduras: { name: 'Grilled vegetables' },
      puerrosRomesco: {
        name: 'Confit leeks with romesco',
        description: 'With a tomato and nut sauce.',
      },
      solomilloFrances: { name: 'French-style tenderloin' },
      solomilloCerdoCrema: { name: 'Pork tenderloin in cream sauce' },
      chuletillasCordero: { name: 'Lamb chops' },
      chuletaTernera: { name: 'Beef chop' },
      solomilloTernera: { name: 'Beef tenderloin' },
      steakTartar: { name: 'Steak tartare' },
      hamburguesaRuloCabra: { name: 'Burger with goat’s cheese' },
      churrascoTernera: { name: 'Beef churrasco' },
      lagrimasIberico: { name: 'Iberian pork strips' },
      bacalaoAsado: { name: 'Roast cod' },
      bacalaoConfitado: { name: 'Confit cod with tomato' },
      rodaballo: { name: 'Turbot' },
    },
  },

  tioPedro: {
    title: 'From the restaurant to the butcher’s',
    body: 'Casa Fidel and Embutidos Tío Pedro, a butcher’s also in San Vitero, are heirs to one of the pioneering businesses in hospitality and charcuterie making in the Aliste region.',
    products: 'Tío Pedro offers cured sausages, beef and ready-cooked dishes, also through its online shop.',
    link: 'Discover Tío Pedro',
  },

  visit: {
    title: 'Visit us',
    region: '{region} region',
    hoursTitle: 'Opening hours',
    day: 'Day',
    lunch: 'Lunch',
    dinner: 'Dinner',
    closed: 'Closed',
    days: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    },
  },
}

export default en
