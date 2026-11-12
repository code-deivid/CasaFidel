// Textos en español. Es el idioma de referencia: su forma define el tipo
// `MessageSchema`, y en.ts, pt.ts y fr.ts deben tener exactamente las mismas
// claves (si falta o sobra una, `npm run typecheck` falla).
//
// Sintaxis de vue-i18n: `{nombre}` es un hueco que rellena el componente.
// No uses los caracteres @ { } | sueltos en los textos.

export default {
  meta: {
    title: 'Casa Fidel · Restaurante y asador en San Vitero, Aliste (Zamora)',
    description:
      'Restaurante Casa Fidel en San Vitero, comarca de Aliste (Zamora), desde 1955. Cocina de la tierra con la ternera alistana como base, carnes a la brasa y la carta completa.',
  },

  a11y: {
    skipLink: 'Saltar al contenido',
    home: 'Casa Fidel, inicio',
    newTab: '(se abre en una pestaña nueva)',
    mapsNewTab: '(Google Maps, se abre en una pestaña nueva)',
    social: 'Redes sociales',
  },

  nav: {
    label: 'Principal',
    footerLabel: 'Pie de página',
    open: 'Abrir el menú',
    close: 'Cerrar el menú',
    history: 'Historia',
    menu: 'Carta',
    tioPedro: 'Tío Pedro',
    visit: 'Visítanos',
  },

  language: {
    label: 'Idioma',
  },

  actions: {
    seeMenu: 'Ver la carta',
    directions: 'Cómo llegar',
    book: 'Reservar',
    call: 'Llamar al {phone}',
  },

  hero: {
    name: 'Restaurante Casa Fidel',
    taglineFirst: 'El sabor de Aliste,',
    taglineSecond: 'a fuego lento.',
    summary: 'Cocina de la tierra y ternera alistana en San Vitero (Zamora), desde 1955.',
  },

  history: {
    title: 'Desde {year}',
    subtitle: 'Una historia ligada a la tierra de Aliste',
    lead: 'Casa Fidel se fundó en {year}. Desde la cocina elaboramos los productos de esta tierra, con la ternera alistana como base fundamental.',
    body: 'Por eso en la carta mandan la brasa y el producto: ternera, cordero e ibérico hechos sobre las brasas, nuestras mollejas, cecina de ciervo o boletus con perdiz escabechada.',
    diningRoomCaption: 'El comedor',
    barCaption: 'La barra',
    carousel: {
      label: 'Fotografías de Casa Fidel',
      roleCarousel: 'carrusel',
      roleSlide: 'diapositiva',
      position: '{current} de {total}',
      previous: 'Anterior',
      next: 'Siguiente',
      goTo: 'Ver la foto {current} de {total}',
    },
  },

  images: {
    facade:
      'Entrada de Casa Fidel: puertas de madera tallada y, sobre la pared de piedra, el cartel con el nombre del restaurante en granate.',
    diningRoom1:
      'Comedor de Casa Fidel con mesas vestidas de negro, sillas de madera curvada, vigas claras en el techo y una pared de piedra al fondo.',
    diningRoom2:
      'Otra vista del comedor: mesas puestas con platos y copas, sillas de madera y paredes de piedra bajo las vigas del techo.',
    bar1:
      'Zona de barra de Casa Fidel: mostrador, taburetes altos, mesas de madera y una pared de piedra iluminada por lámparas colgantes.',
    bar2:
      'La barra de ladrillo de Casa Fidel junto a una pared de piedra, con mesas altas de madera y lámparas colgantes.',
    people:
      'Cuatro personas sonríen junto a una mesa del comedor de Casa Fidel con varios platos servidos.',
    tioPedroLogo: 'Logotipo de Embutidos y Jamones Tío Pedro, fabricación artesanal.',
  },

  menu: {
    title: 'La carta',
    indexLabel: 'Categorías de la carta',
    perUnit: 'unidad',
    categories: {
      entrantes: 'Entrantes',
      ensaladas: 'Ensaladas',
      mollejas: 'Nuestras mollejas',
      verduras: 'Las verduras',
      carnes: 'Carnes a la brasa',
      pescados: 'Pescados',
    },
    dishes: {
      cecinaCiervo: { name: 'Cecina de ciervo' },
      boletusPerdiz: { name: 'Boletus con perdiz escabechada' },
      morcillaManzana: { name: 'Morcilla con manzana' },
      tostasFidel: { name: 'Tostas Fidel' },
      croquetasBoletus: { name: 'Croquetas de boletus' },
      croquetasJamon: { name: 'Croquetas de jamón' },
      croquetasCalamar: { name: 'Croquetas de calamar' },
      calamaresRomana: { name: 'Calamares a la romana' },
      ensaladaVentresca: {
        name: 'Ventresca y pimientos asados',
        description: 'Lechuga, atún, pimientos asados y cebolla.',
      },
      ensaladaRuloCabra: {
        name: 'Ensalada rulo de cabra',
        description: 'Lechuga, queso de cabra, jamón y nueces.',
      },
      ensaladaMixta: {
        name: 'Ensalada mixta',
        description: 'Lechuga, tomate, cebolla, huevo cocido, espárragos y atún.',
      },
      mollejasGuisadas: { name: 'Guisadas' },
      mollejasBrasa: { name: 'A la brasa' },
      hamburguesaMollejas: { name: 'Hamburguesa de mollejas' },
      parrilladaVerduras: { name: 'Parrillada de verduras' },
      puerrosRomesco: {
        name: 'Puerros confitados con romesco',
        description: 'Con salsa de tomate y frutos secos.',
      },
      solomilloFrances: { name: 'Solomillo francés' },
      solomilloCerdoCrema: { name: 'Solomillo de cerdo a la crema' },
      chuletillasCordero: { name: 'Chuletillas de cordero' },
      chuletaTernera: { name: 'Chuleta de ternera' },
      solomilloTernera: { name: 'Solomillo de ternera' },
      steakTartar: { name: 'Steak tartar' },
      hamburguesaRuloCabra: { name: 'Hamburguesa con rulo de cabra' },
      churrascoTernera: { name: 'Churrasco de ternera' },
      lagrimasIberico: { name: 'Lágrimas de ibérico' },
      bacalaoAsado: { name: 'Bacalao asado' },
      bacalaoConfitado: { name: 'Bacalao confitado con tomate' },
      rodaballo: { name: 'Rodaballo' },
    },
  },

  tioPedro: {
    title: 'Del restaurante a la carnicería',
    body: 'Casa Fidel y Embutidos Tío Pedro, carnicería también en San Vitero, somos herederos de una de las empresas pioneras de la hostelería y de la elaboración de embutidos en la comarca de Aliste.',
    products: 'En Tío Pedro hay embutidos, ternera y producto cocinado, también a través de su tienda en línea.',
    link: 'Descubrir Tío Pedro',
  },

  visit: {
    title: 'Visítanos',
    region: 'Comarca de {region}',
    hoursTitle: 'Horario',
    day: 'Día',
    lunch: 'Comida',
    dinner: 'Cena',
    closed: 'Cerrado',
    days: {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo',
    },
  },
}
