// Português (de Portugal). Tem de ter exatamente as mesmas chaves que es.ts.
import type { MessageSchema } from '../schema'

const pt: MessageSchema = {
  meta: {
    title: 'Casa Fidel · Restaurante e churrasqueira em San Vitero, Aliste (Zamora, Espanha)',
    description:
      'Restaurante Casa Fidel em San Vitero, na comarca de Aliste (Zamora, Espanha), desde 1955. Cozinha da terra com a vitela de Aliste como base, carnes na brasa e a carta completa.',
  },

  a11y: {
    skipLink: 'Saltar para o conteúdo',
    home: 'Casa Fidel, início',
    newTab: '(abre num novo separador)',
    mapsNewTab: '(Google Maps, abre num novo separador)',
  },

  nav: {
    label: 'Principal',
    footerLabel: 'Rodapé',
    open: 'Abrir o menu',
    close: 'Fechar o menu',
    history: 'História',
    menu: 'Carta',
    tioPedro: 'Tío Pedro',
    visit: 'Visite-nos',
  },

  language: {
    label: 'Idioma',
  },

  actions: {
    seeMenu: 'Ver a carta',
    directions: 'Como chegar',
    book: 'Reservar',
    call: 'Ligar para o {phone}',
  },

  hero: {
    name: 'Restaurante Casa Fidel',
    taglineFirst: 'O sabor de Aliste,',
    taglineSecond: 'em lume brando.',
    summary: 'Cozinha da terra e vitela de Aliste em San Vitero (Zamora, Espanha), desde 1955.',
  },

  history: {
    title: 'Desde {year}',
    subtitle: 'Uma história ligada à terra de Aliste',
    lead: 'A Casa Fidel foi fundada em {year}. Na nossa cozinha elaboramos os produtos desta terra, com a vitela de Aliste como base fundamental.',
    body: 'Por isso, na carta mandam a brasa e o produto: vitela, borrego e porco ibérico feitos nas brasas, as nossas molejas, carne curada de veado ou boletos com perdiz em escabeche.',
    diningRoomCaption: 'A sala de refeições',
    barCaption: 'O balcão',
    carousel: {
      label: 'Fotografias da Casa Fidel',
      roleCarousel: 'carrossel',
      roleSlide: 'diapositivo',
      position: '{current} de {total}',
      previous: 'Anterior',
      next: 'Seguinte',
      pause: 'Pausar a apresentação',
      play: 'Retomar a apresentação',
    },
  },

  images: {
    facade:
      'Entrada da Casa Fidel: portas de madeira trabalhada e, na parede de pedra, a placa com o nome do restaurante em grená.',
    diningRoom1:
      'Sala de refeições da Casa Fidel, com mesas de toalha preta, cadeiras de madeira curvada, teto com vigas claras e uma parede de pedra ao fundo.',
    diningRoom2:
      'Outra vista da sala: mesas postas com pratos e copos, cadeiras de madeira e paredes de pedra sob as vigas do teto.',
    bar1:
      'Zona do balcão da Casa Fidel: balcão, bancos altos, mesas de madeira e uma parede de pedra iluminada por candeeiros suspensos.',
    bar2:
      'O balcão de tijolo da Casa Fidel junto a uma parede de pedra, com mesas altas de madeira e candeeiros suspensos.',
    people:
      'Quatro pessoas sorriem junto a uma mesa da sala de refeições da Casa Fidel, com vários pratos servidos.',
    tioPedroLogo: 'Logótipo de Embutidos y Jamones Tío Pedro, enchidos e presuntos de fabrico artesanal.',
  },

  menu: {
    title: 'A carta',
    indexLabel: 'Secções da carta',
    perUnit: 'unidade',
    categories: {
      entrantes: 'Entradas',
      ensaladas: 'Saladas',
      mollejas: 'As nossas molejas',
      verduras: 'Legumes',
      carnes: 'Carnes na brasa',
      pescados: 'Peixe',
    },
    dishes: {
      cecinaCiervo: { name: 'Carne curada de veado' },
      boletusPerdiz: { name: 'Boletos com perdiz em escabeche' },
      morcillaManzana: { name: 'Morcela com Maçã' },
      tostasFidel: { name: 'Tostas da Casa Fidel' },
      croquetasBoletus: { name: 'Croquetes de boletos' },
      croquetasJamon: { name: 'Croquetes de presunto' },
      croquetasCalamar: { name: 'Croquetes de lula' },
      calamaresRomana: { name: 'Lulas à romana' },
      ensaladaVentresca: {
        name: 'Ventresca de atum com pimentos assados',
        description: 'Alface, atum, pimentos assados e cebola.',
      },
      ensaladaRuloCabra: {
        name: 'Salada de queijo de cabra',
        description: 'Alface, queijo de cabra, presunto e nozes.',
      },
      ensaladaMixta: {
        name: 'Salada mista',
        description: 'Alface, tomate, cebola, ovo cozido, espargos e atum.',
      },
      mollejasGuisadas: { name: 'Estufadas' },
      mollejasBrasa: { name: 'Na brasa' },
      hamburguesaMollejas: { name: 'Hambúrguer de molejas' },
      parrilladaVerduras: { name: 'Legumes grelhados' },
      puerrosRomesco: {
        name: 'Alho-francês confitado com romesco',
        description: 'Com molho de tomate e frutos secos.',
      },
      solomilloFrances: { name: 'Lombo à francesa' },
      solomilloCerdoCrema: { name: 'Lombinho de porco com natas' },
      chuletillasCordero: { name: 'Costeletas de borrego' },
      chuletaTernera: { name: 'Costeleta de vitela' },
      solomilloTernera: { name: 'Lombo de vitela' },
      steakTartar: { name: 'Steak tártaro' },
      hamburguesaRuloCabra: { name: 'Hambúrguer com queijo de cabra' },
      churrascoTernera: { name: 'Churrasco de vitela' },
      lagrimasIberico: { name: 'Tiras de porco ibérico' },
      bacalaoAsado: { name: 'Bacalhau assado' },
      bacalaoConfitado: { name: 'Bacalhau confitado com tomate' },
      rodaballo: { name: 'Pregado' },
    },
  },

  tioPedro: {
    title: 'Do restaurante ao talho',
    body: 'A Casa Fidel e os Embutidos Tío Pedro, talho também em San Vitero, são herdeiros de uma das empresas pioneiras na restauração e na produção de enchidos da comarca de Aliste.',
    products: 'No Tío Pedro há enchidos, vitela e produto cozinhado, também através da sua loja online.',
    link: 'Descobrir o Tío Pedro',
  },

  visit: {
    title: 'Visite-nos',
    region: 'Comarca de {region}',
    hoursTitle: 'Horário',
    day: 'Dia',
    lunch: 'Almoço',
    dinner: 'Jantar',
    closed: 'Fechado',
    days: {
      monday: 'Segunda-feira',
      tuesday: 'Terça-feira',
      wednesday: 'Quarta-feira',
      thursday: 'Quinta-feira',
      friday: 'Sexta-feira',
      saturday: 'Sábado',
      sunday: 'Domingo',
    },
  },
}

export default pt
