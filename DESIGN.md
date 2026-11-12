---
name: Casa Fidel
description: Restaurante de cocina alistana a la brasa en San Vitero (Zamora); la web es la carta de la casa convertida en una edición gastronómica luminosa.
colors:
  blanco: "#ffffff"
  hueso: "#faf9f6"
  marfil: "#f5f0e8"
  marfil-shade: "#ebe3d6"
  carbon: "#26211f"
  piedra-ink: "#66635a"
  granate: "#640e0f"
  granate-deep: "#4c0a0b"
  on-granate: "#f5f0e8"
  on-granate-muted: "#e3c9c2"
  line: "rgb(38 33 31 / 0.14)"
  line-strong: "rgb(38 33 31 / 0.8)"
  line-on-granate: "rgb(245 240 232 / 0.24)"
typography:
  display:
    fontFamily: "Gloock, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.875rem, 1.5rem + 5.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Gloock, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.5rem + 2.8vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.04
  title:
    fontFamily: "Gloock, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.1
  carta-category:
    fontFamily: "Antonio Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)"
    fontWeight: 500
    letterSpacing: "0.04em"
    textTransform: "uppercase"
  price:
    fontFamily: "Antonio Variable, Arial Narrow, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    letterSpacing: "0.02em"
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
  dish:
    fontFamily: "DM Sans Variable, DM Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.35
  lead:
    fontFamily: "DM Sans Variable, DM Sans, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.4
  body-lg:
    fontFamily: "DM Sans Variable, DM Sans, system-ui, sans-serif"
    fontSize: "1.1875rem"
    lineHeight: 1.5
  body:
    fontFamily: "DM Sans Variable, DM Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans Variable, DM Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    letterSpacing: "0.02em"
  caption:
    fontFamily: "DM Sans Variable, DM Sans, system-ui, sans-serif"
    fontSize: "0.8125rem"
    lineHeight: 1.45
rounded:
  base: "2px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"
  "9": "6rem"
  "10": "8rem"
  section: "clamp(4.5rem, 2.5rem + 6vw, 8.5rem)"
  gutter: "clamp(1.25rem, 0.5rem + 3vw, 3rem)"
  page-max: "86rem"
  header-height: "4.5rem"
components:
  button-solid:
    backgroundColor: "{colors.granate}"
    textColor: "{colors.on-granate}"
    typography: "{typography.label}"
    rounded: "{rounded.base}"
    padding: "0.75rem 1.5rem"
    height: "3rem"
  button-solid-hover:
    backgroundColor: "{colors.granate-deep}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.carbon}"
    borderColor: "{colors.carbon}"
    typography: "{typography.label}"
    rounded: "{rounded.base}"
    height: "3rem"
  button-outline-hover:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.hueso}"
  header-action:
    backgroundColor: "transparent"
    textColor: "{colors.granate}"
    borderColor: "{colors.granate}"
    height: "2.75rem"
  header-action-hover:
    backgroundColor: "{colors.granate}"
    textColor: "{colors.on-granate}"
  language-flag:
    width: "1.5rem"
    height: "1rem"
  language-flag-current:
    borderColor: "{colors.granate}"
  carousel-button:
    typography: "{typography.price}"
    textColor: "{colors.on-granate}"
    borderColor: "{colors.line-on-granate}"
    rounded: "{rounded.base}"
    height: "2.75rem"
  menu-index-current:
    textColor: "{colors.granate}"
---

# Design System: Casa Fidel

## Overview

**Creative North Star: "La carta de la casa, en edición gastronómica"**

La web toma la carta impresa del local y la publica como una revista de cocina: papel cálido y luminoso, titulares editoriales con mucho cuerpo, la voz condensada en mayúsculas de la propia carta para las categorías y los precios, y el granate del monograma como única tinta de identidad. La fotografía es protagonista: grande, con aire alrededor dentro del margen de la página, nunca enmarcada en tarjetas. Solo va a sangre la fachada en móvil, donde el margen se comería el cartel.

Esta es la tercera iteración de la segunda dirección. La primera dirección ("La placa y la carta") se apoyaba en grandes superficies carbón; se descartó por oscura y pesada. La tercera iteración incorpora la historia real (desde 1955), las fotografías del propio restaurante, el horario, la relación con Tío Pedro y la web completa en cuatro idiomas; desaparecen «Especialidades» (repetía la carta) y las fotos gastronómicas de referencia. La cuarta añade el teléfono (980 681 471) como acción principal, el selector de banderas, el carrusel del local, el logotipo de Tío Pedro, el índice activo de la carta en móvil y más aire lateral alrededor de las fotos.

**Key Characteristics:**
- Identidad luminosa: blanco cálido, marfil y blanco puro como suelos; carbón solo como texto.
- Un único campo de color en toda la página: el granate de «Desde 1955».
- Tres voces tipográficas con papeles fijos: Gloock titula, Antonio habla como la carta impresa, DM Sans explica y actúa.
- Composición editorial sobre 12 columnas: titular a todo lo ancho, fotos grandes dentro del margen, texto a su lado.
- Sin sombras, sin tarjetas, sin degradados; filetes de 1px solo donde ordenan una lista.
- Ningún dato pendiente ocupa espacio visible: lo que no está confirmado no se muestra.

## Colors

Una paleta de mantel y vino: tres blancos cálidos, una tinta carbón y el granate del cartel.

### Suelos
- **Hueso** (hueso, `#faf9f6`): suelo general de la página, cabecera y portada.
- **Marfil** (marfil, `#f5f0e8`): el papel. La carta y el pie; también el fondo de la lista de idiomas al pasar.
- **Blanco** (blanco, `#ffffff`): Visítanos, el cierre más luminoso, con la foto de las personas.
- **Marfil sombreado** (marfil-shade): fondo de espera de las imágenes.

### Tinta
- **Carbón** (carbon): todo el texto principal (15,11:1 sobre hueso; 14,03:1 sobre marfil; 15,91:1 sobre blanco) y la opción de idioma seleccionada.
- **Piedra de tinta** (piedra-ink): texto secundario, traducciones de la carta, notas (5,70:1 sobre hueso; 5,29:1 sobre marfil; 6,00:1 sobre blanco).

### Identidad
- **Granate** (granate, `#640e0f`): el color del monograma y del cartel de la fachada. Monograma de cabecera y pie, nombre «Restaurante Casa Fidel» en la portada, botón principal, acción de cabecera, títulos de categoría de la carta, entradilla de Tío Pedro, títulos del horario, marca de agua CF al 6%, anillo de foco, selección de texto y barra de desplazamiento. Sobre claros da entre 11,49:1 y 13,03:1.
- **Campo granate**: «Desde 1955» es la única sección de color completo; texto en `on-granate` (11,49:1) y secundario en `on-granate-muted` (8,31:1).
- **Granate en sombra** (granate-deep): hover del botón sólido.

### Named Rules
**The Un Solo Campo Rule.** En toda la página hay un único campo de color: «Desde 1955» en granate. El resto alterna hueso, marfil y blanco. Añadir otra sección oscura o de color exige quitar esta.

**The Sin Marrón Rule.** No hay fondos carbón, tierra ni marrones. El carbón es tinta, nunca suelo (la única excepción es el relleno de la opción de idioma seleccionada).

**The Granate Es Tinta Rule.** El granate aparece como tinta precisa (monograma, categorías, acción) o como el único campo. Nunca como adorno, degradado ni fondo de tarjetas.

## Typography

**Display:** Gloock 400 (con Iowan Old Style, Georgia)
**Carta:** Antonio Variable 500 (con Arial Narrow)
**Texto:** DM Sans Variable (con system-ui)

**Character:** Gloock es una romana editorial de alto contraste y mucho cuerpo: titula como una revista de cocina. Antonio reproduce la voz de la carta impresa del local, cuyas categorías van en mayúsculas condensadas («ENTRANTES», «CARNES A LA BRASA»). DM Sans se ocupa de todo lo que se lee o se pulsa, incluidos los nombres de plato, igual que en la carta original.

### Hierarchy
- **Display** (Gloock, clamp 2,875–6rem, 1.04, -0.012em): el lema de la portada, «Desde 1955», «La carta» y «Visítanos». Una vez por zona.
- **Nombre** (Gloock, escala Title, granate): «Restaurante Casa Fidel», primera línea del `h1` de la portada. Es el nombre del local, no un rótulo: caja baja, sin mayúsculas condensadas.
- **Headline** (Gloock, clamp 2,25–3,75rem): títulos de sección secundarios («Del restaurante a la carnicería»). El subtítulo de «Desde 1955» usa Gloock a escala Lead.
- **Title** (Gloock, clamp 1,75–2,5rem): nombre del restaurante en la portada, dirección de Visítanos, enlaces del menú móvil.
- **Carta category** (Antonio 500, mayúsculas, 0.04em, escala Title): títulos de categoría de la carta en granate. Con la misma voz, a menor tamaño: el índice de categorías y los términos de los datos prácticos.
- **Price** (Antonio 500, 1,25rem, cifras tabulares): todo precio, alineado a la derecha.
- **Dish** (DM Sans 500, 1,125rem): nombres de plato.
- **Lead** (DM Sans 400, clamp 1,375–1,75rem): la entradilla de «Desde 1955» (marfil sobre granate) y la de Tío Pedro (granate).
- **Body large / Body** (DM Sans, 1,1875 / 1,0625rem): resumen de portada, texto corrido.
- **Label** (DM Sans 600, 0,9375rem, 0.02em): botones y navegación.
- **Caption** (DM Sans, 0,8125rem): traducciones, unidad de precio, nota al pie de la carta, etiqueta de imagen.

### Named Rules
**The Tres Voces Rule.** Gloock titula, Antonio nombra categorías y cobra, DM Sans explica y actúa. No se intercambian.

**The Voz De La Carta Rule.** Las mayúsculas condensadas solo aparecen donde la carta impresa las usa (categorías, índice, precios y términos de datos). Nunca como eyebrow sobre un titular.

## Layout

Contenedor de 86rem con margen lateral fluido (1,25–3rem). Retícula de 12 columnas desde 64rem; móvil-primero con cortes en 48rem (md), 64rem (lg) y 80rem (xl). Relleno vertical de sección fluido de 4,5 a 8,5rem.

- **Portada:** el `h1` empieza por el nombre «Restaurante Casa Fidel» en granate y sigue con el lema a 6rem, en las columnas 1–11. Debajo, la columna 1–4 lleva el resumen, las acciones («Reservar · 980 681 471» sólido y «Ver la carta» en contorno) y, al pie, la dirección alineada con el final de la foto. Las columnas 5–12 llevan la fachada real (puerta tallada y cartel «Casa fidel») en 16:10, dentro del margen de la página, encuadrada al 22% para que el cartel no se pierda en los recortes verticales. Tableta: foto 16:10 dentro del margen. Móvil: nombre, lema, resumen, acciones y dirección; foto 4:5 a sangre debajo (a 390px el margen se comería el cartel).
- **Desde 1955 (campo granate):** «Desde 1955» a escala Display y el subtítulo en las columnas 1–9. Debajo, el carrusel del local (dos fotos del comedor y dos de la barra, 4:3) en las columnas 1–7, dentro del margen, con «Anterior», «Siguiente» y el contador «1 / 4» debajo; el texto en las 9–12. Pies de foto en Antonio. Móvil y tableta: título, carrusel (una foto por vez, puntos y «1 / 4») y texto.
- **Carta:** título; índice de categorías entre filetes. En móvil (< 48rem) es una barra horizontal fija bajo la cabecera y deslizable, con el siguiente enlace asomando bajo un desvanecido y la categoría visible subrayada en granate (2px), que se actualiza sola al desplazarse. Desde 48rem es una fila normal; dos columnas desde 48rem, con tres categorías por columna como en la carta impresa. Sin nota al pie: ningún aviso sobre precios es público.
- **Tío Pedro:** pliego de texto sobre hueso, sin color de campo para que no parezca publicidad. Título en las columnas 1–5 y, debajo, el logotipo de Tío Pedro a tamaño de sello (11rem; 9rem en móvil), con fondo transparente y sin enlace; entradilla granate, texto y el botón de contorno «Descubrir Tío Pedro», único enlace del bloque, en las 7–12.
- **Visítanos:** a la izquierda, «Visítanos» y debajo la foto de las personas en 5:4 dentro del margen (columnas 1–7 entre 64 y 80rem, 1–6 desde 80rem); se desplaza con la página, sin quedarse fija. A la derecha (8–12), desde arriba, la dirección como titular, «Llamar al 980 681 471» (sólido), «Cómo llegar» (contorno) y el horario: las dos columnas miden parecido. Móvil: título, foto 4:3 y todo lo demás debajo.
- **Pie:** una franja con marca, dirección, Maps y teléfono e índice; tras un filete, los créditos a la izquierda y Instagram y Facebook a la derecha (icono de trazo granate + nombre de la red, subrayado como el resto de enlaces del pie).

## Elevation & Depth

Sistema plano. La profundidad la dan el cambio de suelo (hueso → marfil → granate → marfil → blanco → marfil), la escala de la fotografía y la marca de agua del monograma tras la carta. La cabecera fija se separa con un filete que solo aparece cuando la página ya se ha desplazado.

### Named Rules
**The Mesa Limpia Rule.** Ninguna superficie lleva `box-shadow` ni se presenta como tarjeta. Las fotografías no llevan marco ni radio.

## Shapes

Radio único de 2px en botones, selector y lista de idiomas y etiqueta de imagen. Fotos y campos de color, en ángulo recto. Filetes de 1px: `line` para separar platos y categorías, `line` también entre los días del horario y en el borde del selector; `line-strong` para la lista de idiomas y los subrayados. El monograma CF es la única forma curva y se usa tal como existe, rellenado en granate por máscara.

## Components

### Buttons
Enlaces con forma de botón, porque cada acción lleva a algún sitio (la carta, Maps, el teléfono).
- **Sólido:** granate con texto marfil; hover en granate en sombra. Es la acción principal de cada zona.
- **Contorno:** borde y texto carbón; hover relleno carbón con texto hueso. Acción secundaria («Ver la carta», «Cómo llegar»).
- **Pulsación:** `scale(0.97)` en 160ms con `cubic-bezier(0.23, 1, 0.32, 1)`; sin escala con movimiento reducido. Hover solo con puntero fino.

### Navigation
- **Cabecera:** fija, fondo hueso. A la izquierda, el monograma en granate y «Casa Fidel» en Gloock; a la derecha, cuatro enlaces (Historia, Carta, Tío Pedro, Visítanos), las cuatro banderas de idioma y la acción «Reservar» (enlace `tel:`), en contorno granate que se rellena al pasar; desde 80rem muestra también el número («Reservar · 980 681 471»), antes lo lleva solo para lectores de pantalla. En móvil: monograma, «Casa Fidel» (oculto por debajo de 336px), el desplegable de idioma y el botón de menú solo con icono (dos líneas; abierto, una X de dos diagonales simétricas en el mismo marco de 1,25rem, sin animación); el panel móvil termina con «Reservar · 980 681 471».
- **Móvil (< 64rem):** botón «Menú / Cerrar» y panel a pantalla completa en hueso, con los enlaces en Gloock separados por filetes y la dirección al pie. Entra en 200ms (fundido + 0,5rem) y sale en 150ms.

### Price Line
Nombre a la izquierda (DM Sans 500) y precio a la derecha (Antonio, cifras tabulares), alineados a la última línea base, sin línea de puntos. En la carta, cada plato lleva un filete superior. Funciona sobre claro y sobre granate porque hereda `currentColor`.

### Language Switch (cabecera)
Móvil y tableta (< 64rem): desplegable. Un botón con borde fino, la bandera del idioma actual, su código en Antonio («ES») y un chevrón; la lista (hueso, filete `line-strong`, radio 2px) muestra los cuatro idiomas con bandera y nombre en su lengua; el activo en granate, seminegrita y con ✓. Nace de la esquina del botón (`scale(0.96)` + fundido en 150ms, salida en 100ms), queda por encima del panel móvil y Escape la cierra sin cerrar el panel.

Escritorio (≥ 64rem): cuatro banderas siempre visibles (España, Reino Unido, Portugal, Francia), dibujadas en SVG en línea y simplificadas (sin escudos). Cada una es un botón de 2 × 2,75rem con la bandera de 1,5 × 1rem; nombre accesible y `title` con el idioma en su propia lengua (Español, English, Português, Français), `lang` del idioma y `aria-pressed` en el activo; el grupo se llama «Idioma». Activo: bandera a plena opacidad y filete granate de 2px debajo; inactivas al 62% y algo desaturadas, a plena opacidad al pasar. No depende solo del color. Las banderas viven en `LocaleFlag.vue`. Cambiar de idioma no anima el contenido.

### Carrusel (Desde 1955)
Pista con desplazamiento horizontal y CSS Scroll Snap, una foto entera por vez y dentro del margen de la página. Bucle con una copia oculta de la primera foto al final. Móvil y tableta: sin botones; puntos de paginación (activo a plena opacidad y algo mayor; objetivo de 1,5 × 2,75rem) y «1 / 4», que cambian durante el gesto (no al terminar la inercia). Escritorio: «Anterior», «Siguiente» y contador; cada paso se anima en 700ms con `ease-in-out` (instantáneo con movimiento reducido). Sin pase automático: sin botón de pausa incumpliría WCAG 2.2.2. Botones de contorno sobre granate en Antonio. Teclado: flechas sobre la pista. `aria-roledescription` «carrusel» / «diapositiva», posición «n de 4» y un aviso `aria-live` solo al navegar a mano.

### Horario
Tabla de tres columnas (día, comida, cena) con filetes de 1px entre días; horas en Antonio con cifras tabulares, «Cerrado» en DM Sans gris de tinta para que se lea como ausencia. Un día cerrado entero ocupa comida y cena en una sola celda. Cabe a 390px sin desplazamiento horizontal.

### Imágenes
`object-fit: cover`, sin radio, fondo de espera marfil sombreado. La foto de portada se descubre con `clip-path` de abajo arriba dentro de la entrada única; con movimiento reducido, fundido. Todas las fotos son del propio restaurante; Fidel ha autorizado el uso de sus imágenes. Una foto que no sea de la casa nunca se coloca junto a un plato con precio.

### Datos pendientes
Los datos sin confirmar (dominio) viven como `null` en `src/data/site.ts` y simplemente no se muestran. En `npm run dev` las notas de desarrollo recuerdan qué falta revisar; el build de producción no las incluye.

## Motion

Una sola entrada: en la portada, el nombre aparece, las dos líneas del lema suben 0,35em con fundido (800ms, escalonadas 90ms), el resumen aparece y la fachada se descubre de abajo arriba con `clip-path`. Después, nada se mueve solo: el carrusel solo cambia cuando el visitante lo pide; el resto son pulsaciones (`scale(0.97)`), subrayados y el filete de la bandera activa. El cambio de idioma no se anima. Con `prefers-reduced-motion` todo queda en fundidos de opacidad.

## Do's and Don'ts

### Do:
- **Do** mantén la página luminosa: hueso, marfil y blanco como suelos; carbón solo como texto.
- **Do** reserva el granate para la tinta de identidad y para el único campo de «Desde 1955».
- **Do** usa Antonio en mayúsculas solo donde lo usa la carta impresa: categorías, índice, precios, términos de datos.
- **Do** deja que la fotografía sea grande, con aire lateral; a sangre solo cuando el recorte lo exige (fachada en móvil).
- **Do** publica las fotos solo en WebP, con un único `<img>` y `srcset`.
- **Do** declara los datos pendientes como `null` en los archivos de datos; la interfaz se adapta sola.
- **Do** usa solo fotografías del propio restaurante, con el permiso de quienes aparecen.

### Don't:
- **Don't** vuelvas a fondos carbón, marrones o tierra en secciones completas.
- **Don't** añadas un segundo campo de color sin retirar el granate de «Desde 1955».
- **Don't** muestres «pendiente de confirmar» en la portada, la cabecera ni ningún lugar destacado.
- **Don't** pongas eyebrows o rótulos en mayúsculas encima de los titulares.
- **Don't** uses tarjetas, sombras, degradados ni radios mayores de 2px.
- **Don't** compongas el hero partido de plantilla (texto a un lado, foto al otro, franja de datos debajo).
- **Don't** pongas una foto que no sea de la casa junto a un plato con nombre y precio.
- **Don't** añadas nombres, cargos ni parentescos a la foto de las personas sin confirmarlos.
- **Don't** escribas texto visible en los componentes: va en `src/i18n/locales`, en los cuatro idiomas.
- **Don't** redibujes ni recolorees el monograma CF fuera de granate (o marfil sobre granate).
