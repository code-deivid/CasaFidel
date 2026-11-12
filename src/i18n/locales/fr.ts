// Français. Doit avoir exactement les mêmes clés que es.ts.
// Espace insécable ( ) devant : ; ? ! selon la typographie française.
import type { MessageSchema } from '../schema'

const fr: MessageSchema = {
  meta: {
    title: 'Casa Fidel · Restaurant et grill à San Vitero, Aliste (Zamora, Espagne)',
    description:
      'Restaurant Casa Fidel à San Vitero, dans la région d’Aliste (Zamora, Espagne), depuis 1955. Une cuisine du terroir fondée sur le veau d’Aliste, des viandes à la braise et la carte complète.',
  },

  a11y: {
    skipLink: 'Aller au contenu',
    home: 'Casa Fidel, accueil',
    newTab: '(s’ouvre dans un nouvel onglet)',
    mapsNewTab: '(Google Maps, s’ouvre dans un nouvel onglet)',
    social: 'Réseaux sociaux',
  },

  nav: {
    label: 'Principale',
    footerLabel: 'Pied de page',
    open: 'Ouvrir le menu',
    close: 'Fermer le menu',
    history: 'Histoire',
    menu: 'Carte',
    tioPedro: 'Tío Pedro',
    visit: 'Nous trouver',
  },

  language: {
    label: 'Langue',
  },

  actions: {
    seeMenu: 'Voir la carte',
    directions: 'Itinéraire',
    book: 'Réserver',
    call: 'Appeler le {phone}',
  },

  hero: {
    name: 'Restaurante Casa Fidel',
    taglineFirst: 'Le goût d’Aliste,',
    taglineSecond: 'à feu doux.',
    summary: 'Cuisine du terroir et veau d’Aliste à San Vitero (Zamora, Espagne), depuis 1955.',
  },

  history: {
    title: 'Depuis {year}',
    subtitle: 'Une histoire liée à la terre d’Aliste',
    lead: 'Casa Fidel a été fondée en {year}. En cuisine, nous travaillons les produits de cette terre, avec le veau d’Aliste comme base essentielle.',
    body: 'C’est pourquoi la braise et le produit mènent la carte : veau, agneau et porc ibérique cuits sur les braises, nos ris de veau, viande de cerf séchée ou cèpes à la perdrix en escabèche.',
    diningRoomCaption: 'La salle',
    barCaption: 'Le bar',
    carousel: {
      label: 'Photos de Casa Fidel',
      roleCarousel: 'carrousel',
      roleSlide: 'diapositive',
      position: '{current} sur {total}',
      previous: 'Précédente',
      next: 'Suivante',
      goTo: 'Voir la photo {current} sur {total}',
    },
  },

  images: {
    facade:
      'Entrée de Casa Fidel : portes en bois sculpté et, sur le mur de pierre, l’enseigne au nom du restaurant en grenat.',
    diningRoom1:
      'Salle de Casa Fidel, avec des tables nappées de noir, des chaises en bois cintré, un plafond à poutres claires et un mur de pierre au fond.',
    diningRoom2:
      'Autre vue de la salle : tables dressées avec assiettes et verres, chaises en bois et murs de pierre sous les poutres du plafond.',
    bar1:
      'Espace bar de Casa Fidel : comptoir, tabourets hauts, tables en bois et un mur de pierre éclairé par des suspensions.',
    bar2:
      'Le comptoir en brique de Casa Fidel près d’un mur de pierre, avec des tables hautes en bois et des suspensions.',
    people:
      'Quatre personnes sourient autour d’une table de la salle de Casa Fidel, avec plusieurs plats servis.',
    tioPedroLogo: 'Logo d’Embutidos y Jamones Tío Pedro, charcuterie et jambons de fabrication artisanale.',
  },

  menu: {
    title: 'La carte',
    indexLabel: 'Rubriques de la carte',
    perUnit: 'l’unité',
    categories: {
      entrantes: 'Entrées',
      ensaladas: 'Salades',
      mollejas: 'Nos ris de veau',
      verduras: 'Légumes',
      carnes: 'Viandes à la braise',
      pescados: 'Poissons',
    },
    dishes: {
      cecinaCiervo: { name: 'Viande de cerf séchée' },
      boletusPerdiz: { name: 'Cèpes à la perdrix en escabèche' },
      morcillaManzana: { name: 'Boudin Noir aux Pommes' },
      tostasFidel: { name: 'Tartines maison Fidel' },
      croquetasBoletus: { name: 'Croquettes aux cèpes' },
      croquetasJamon: { name: 'Croquettes au jambon' },
      croquetasCalamar: { name: 'Croquettes au calamar' },
      calamaresRomana: { name: 'Calamars à la romaine' },
      ensaladaVentresca: {
        name: 'Ventrèche de thon et poivrons rôtis',
        description: 'Laitue, thon, poivrons rôtis et oignon.',
      },
      ensaladaRuloCabra: {
        name: 'Salade au chèvre',
        description: 'Laitue, fromage de chèvre, jambon et noix.',
      },
      ensaladaMixta: {
        name: 'Salade composée',
        description: 'Laitue, tomate, oignon, œuf dur, asperges et thon.',
      },
      mollejasGuisadas: { name: 'En ragoût' },
      mollejasBrasa: { name: 'À la braise' },
      hamburguesaMollejas: { name: 'Burger de ris de veau' },
      parrilladaVerduras: { name: 'Légumes grillés' },
      puerrosRomesco: {
        name: 'Poireaux confits, sauce romesco',
        description: 'Avec une sauce à la tomate et aux fruits secs.',
      },
      solomilloFrances: { name: 'Filet à la française' },
      solomilloCerdoCrema: { name: 'Filet mignon de porc à la crème' },
      chuletillasCordero: { name: 'Côtelettes d’agneau' },
      chuletaTernera: { name: 'Côte de veau' },
      solomilloTernera: { name: 'Filet de veau' },
      steakTartar: { name: 'Steak tartare' },
      hamburguesaRuloCabra: { name: 'Burger au fromage de chèvre' },
      churrascoTernera: { name: 'Churrasco de veau' },
      lagrimasIberico: { name: 'Aiguillettes de porc ibérique' },
      bacalaoAsado: { name: 'Morue rôtie' },
      bacalaoConfitado: { name: 'Morue confite à la tomate' },
      rodaballo: { name: 'Turbot' },
    },
  },

  tioPedro: {
    title: 'Du restaurant à la boucherie',
    body: 'Casa Fidel et Embutidos Tío Pedro, boucherie également à San Vitero, sont les héritiers de l’une des entreprises pionnières de la restauration et de la charcuterie dans la région d’Aliste.',
    products: 'Chez Tío Pedro, on trouve charcuterie, veau et plats cuisinés, également sur sa boutique en ligne.',
    link: 'Découvrir Tío Pedro',
  },

  visit: {
    title: 'Nous trouver',
    region: 'Région d’{region}',
    hoursTitle: 'Horaires',
    day: 'Jour',
    lunch: 'Déjeuner',
    dinner: 'Dîner',
    closed: 'Fermé',
    days: {
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche',
    },
  },
}

export default fr
