# Casa Fidel · Landing

Web del Restaurante Casa Fidel (Calle Llamas, 40 · San Vitero, comarca de Aliste, Zamora), casa
fundada en 1955. Vue 3 + Composition API + TypeScript + Vite + SCSS + vue-i18n. Sin backend y sin
frameworks CSS. En español, inglés, portugués y francés.

La dirección visual es luminosa: blanco cálido, marfil y blanco como suelos, carbón como texto y el
granate del monograma CF como única tinta de identidad. El sistema completo está en `DESIGN.md`; el
producto, sus fuentes y lo pendiente de verificar, en `PRODUCT.md`.

## Puesta en marcha

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173 (muestra las notas de desarrollo)
npm run build      # comprueba tipos y genera dist/
npm run preview    # sirve dist/ para revisarlo
npm run lint       # ESLint (Vue + TypeScript)
npm run typecheck  # comprobación de tipos (incluye que los 4 idiomas estén completos)
npm run images     # regenera las fotos optimizadas (necesita ffmpeg)
```

## La página, sección a sección

| Orden | Sección | Componente | Qué hace |
|---|---|---|---|
| 1 | Cabecera | `SiteHeader.vue` + `LanguageSwitch.vue` | Fija. Monograma + «Casa Fidel», enlaces (Historia, Carta, Tío Pedro, Visítanos), **selector de idioma** (cuatro banderas en línea en escritorio; desplegable con bandera y código en móvil y tableta) y «Reservar» (llama al 980 681 471; el número se ve desde 80rem). En móvil (< 64rem): marca, desplegable de idioma y botón de menú; el panel termina con «Reservar · 980 681 471». |
| 2 | Portada | `HeroSection.vue` | `h1` con «Restaurante Casa Fidel» y el lema; resumen, **«Reservar · 980 681 471»** (acción principal), «Ver la carta» y la **fachada real** con el cartel (a sangre solo en móvil). Única animación de entrada. |
| 3 | Desde 1955 | `HistorySection.vue` + `HistoryCarousel.vue` | El único campo granate. La historia que el restaurante publica en su Facebook (fundación en 1955, ternera alistana) y lo que eso significa en la carta, junto a un **carrusel** con dos fotos del comedor y dos de la barra (escritorio: autoplay, «Anterior» / «Siguiente», contador y pausa; móvil: una foto por vez, deslizar, puntos y «1 / 4»). |
| 4 | La carta | `MenuSection.vue` + `MenuCategory.vue` | La carta completa, traducida, en dos columnas (una en móvil) y con la marca de agua CF. En móvil, **barra de categorías fija** que subraya en granate la categoría visible. Precios con formato del idioma. |
| 5 | Tío Pedro | `TioPedroSection.vue` | Bloque breve sobre la relación con Carnicería y Embutidos Tío Pedro, su **logotipo** a tamaño de sello y el enlace «Descubrir Tío Pedro» (pestaña nueva, `noopener`). |
| 6 | Visítanos | `VisitSection.vue` + `OpeningHours.vue` | La **foto de las personas**, la dirección, «Llamar al 980 681 471», «Cómo llegar» y la tabla de **horario**. |
| 7 | Pie | `SiteFooter.vue` | Marca, dirección + Maps, teléfono, índice, año y enlaces a **Instagram y Facebook**. |

Piezas pequeñas en `src/components/ui/`:

- `ActionLink.vue`: enlace con forma de botón (`solid` granate / `outline` carbón). Con `external`
  abre en pestaña nueva con `rel="noopener"` y lo anuncia a lectores de pantalla.
- `PriceLine.vue`: nombre a la izquierda; precio en Antonio con cifras tabulares, formateado con
  `formatPrice()` de `src/i18n/index.ts` (12,00 € en es/pt/fr; €12.00 en inglés).
- `ResponsiveImage.vue`: un `<img>` WebP con `srcset`/`sizes`, `width`/`height` para no saltar y
  carga diferida salvo la portada. Recibe el texto alternativo ya traducido.
- `LocaleFlag.vue`: las cuatro banderas en SVG (decorativas; el nombre del idioma va en el botón).
- `DevNote.vue`: nota para el equipo que solo existe en `npm run dev`; el build no la incluye.

## Idiomas (vue-i18n)

```
src/i18n/
  index.ts          createI18n (legacy: false), idioma inicial, persistencia,
                    formato de precios (es-ES, en-IE, pt-PT, fr-FR) y metadatos
  schema.ts         MessageSchema = la forma de es.ts
  locales/
    es.ts           idioma de referencia
    en.ts pt.ts fr.ts   tipados como MessageSchema
```

- **Español** por defecto. En escritorio, cada bandera de la cabecera es un botón (nombre accesible: el idioma en su propia lengua; `aria-pressed` en el activo); en móvil y tableta, un desplegable (bandera + código, lista con banderas, el activo marcado con ✓; teclado: flechas, Inicio/Fin, Escape). Ambos llaman a `setLocale()`, que cambia el idioma
  de forma reactiva (sin recargar), lo guarda en `localStorage` (`casa-fidel:idioma`) y actualiza
  `<html lang>`, `<title>`, la meta descripción y `og:title` / `og:description` / `og:locale`. Al
  volver, `main.ts` aplica el idioma guardado antes de montar la app. Si el almacenamiento no está
  disponible (modo privado), todo funciona igual, solo que no se recuerda.
- **Nada de texto visible en los componentes**: navegación, portada, historia, carta, horario, días,
  botones, Tío Pedro, pie, textos alternativos, textos para lectores de pantalla y metadatos SEO
  están en `locales/`. No se traducen Casa Fidel, San Vitero, Aliste ni Tío Pedro.
- **Traducciones completas por construcción**: `en.ts`, `pt.ts` y `fr.ts` están tipados con el
  esquema del español. Si falta o sobra una clave, `npm run typecheck` (y el build) fallan. No hay
  avisos al visitante sobre traducciones.
- **Datos separados de los textos**: `src/data/menu.ts` guarda el orden, los ids y los precios de
  la carta; los nombres y descripciones viven en `menu.dishes.<id>` de cada idioma. El horario
  (`src/data/hours.ts`) guarda tramos; solo los nombres de los días y «Cerrado» se traducen.
- Los datos estructurados (schema.org/Restaurant) se generan en español en el build.

### Añadir o cambiar un texto

1. Edita la clave en `src/i18n/locales/es.ts`.
2. Haz lo mismo en `en.ts`, `pt.ts` y `fr.ts` (el typecheck avisa si te olvidas alguna).
3. En la plantilla: `const { t } = useI18n()` y `{{ t('seccion.clave') }}`.

### Añadir un plato

1. En `src/data/menu.ts`, añade `{ id: 'nuevoPlato', price: 12 }` a su categoría
   (`hasDescription: true` si la carta indica ingredientes; `perUnit: true` si es por unidad).
2. Añade `menu.dishes.nuevoPlato.name` (y `description`) en los cuatro idiomas.

## Datos y fotos

```
src/data/
  site.ts       nombre, año de fundación, dirección, teléfono, dominio, enlace de Tío Pedro, anclas
  hours.ts      horario semanal (tramos de comida y cena por día)
  menu.ts       estructura y precios de la carta
  images.ts     fotografías y logotipo de Tío Pedro (archivo, anchos, proporción, encuadre) y orden del carrusel
public/
  logos/                 logotipos SVG (identidad confirmada: no modificar)
  images/restaurante/    ORIGINALES de las fotos; no se publican (vite.config.ts los excluye)
  images/fotos/          versiones optimizadas, solo WebP (generadas por `npm run images`)
  images/referencias/    material de trabajo (carta, cartel, logo); no se publica
```

**Horario.** Edita `src/data/hours.ts`. Se usa en «Visítanos» y en los datos estructurados
(`openingHoursSpecification`). No hay festivos ni indicador de «abierto ahora»: no están confirmados.

**Fotos.** Se usan las seis: fachada (portada); `comedor-01`, `comedor-02`, `sala-bar-01` y
`sala-bar-02` (carrusel de «Desde 1955», en ese orden, definido en `historySlides`); y `personas`
(Visítanos). Fidel ha autorizado el uso de sus imágenes. El logotipo `tio-pedro.webp` se publica en
WebP con el fondo claro vuelto transparente (`fondoTransparente` en el script). Para añadir una foto:
regístrala en `scripts/optimizar-imagenes.mjs`, ejecuta `npm run images` y declárala en `images.ts`
con su texto alternativo en los cuatro idiomas.

**Solo WebP.** Las fotos se publican únicamente en WebP (`public/images/fotos/<nombre>-<ancho>.webp`).
`ResponsiveImage` usa un solo `<img>` con `srcset`: no hay `<source>` de otros formatos. Antes había un
`<source type="image/avif">`; al borrar los AVIF, el navegador seguía eligiéndolo (lo soporta), recibía
404 y no volvía al WebP, por eso no se veían las fotos en Vercel.

**Redes sociales.** `socialLinks` en `src/data/site.ts` (Instagram y Facebook): pie de página, en
pestaña nueva con `rel="noopener noreferrer"`, y `sameAs` en los datos estructurados.

**Teléfono.** `980 681 471`, en `src/data/site.ts` (`phone`). El enlace es `tel:+34980681471`
(`phoneHref`). Aparece en la cabecera, la portada, el panel móvil, «Visítanos», el pie y los datos
estructurados (`telephone: +34 980 681 471`). Cambiarlo ahí lo cambia en todas partes.

**Carrusel.** `HistoryCarousel.vue`: pista con CSS Scroll Snap, una foto entera por vez (en móvil se
desliza con el dedo; debajo, puntos de paginación y «1 / 4», sin botones) y una copia de la primera
foto al final para el bucle. En escritorio, y solo sin
«movimiento reducido», pasa una foto cada 7 s de derecha a izquierda; se detiene con el ratón encima,
con el foco de teclado dentro, fuera de pantalla o con la pestaña oculta, y cada interacción manual
reinicia la cuenta. Botones «Anterior» / «Siguiente», contador y pausa; flechas del teclado sobre la
pista.

**Índice activo de la carta (móvil).** Un `IntersectionObserver` vigila las categorías en la franja
que queda bajo la cabecera y la barra; la primera visible se subraya en granate (`aria-current`) y la
barra se desliza para mostrarla. Al pulsar una categoría se fija enseguida y no salta mientras la
página se desplaza. `scroll-margin-top` evita que la barra tape el título.

## Decisiones

- **Sin «Especialidades».** Repetía platos que aparecen justo después en la carta. Su campo granate
  pasa a «Desde 1955».
- **«La casa» y la historia, en una sola sección.** Evita dos bloques seguidos que contaban lo mismo.
- **Reservar es llamar.** El teléfono es la acción principal en portada, cabecera, panel móvil y
  «Visítanos»; «Ver la carta» y «Cómo llegar» pasan a contorno.
- **Aire alrededor de las fotos.** Solo van a sangre la fachada en móvil y la pista del carrusel en
  móvil; en tableta y escritorio respetan el margen de la página.
- **Fachada en la portada.** El cartel real «Casa fidel» identifica el restaurante al instante y
  sustituye a la foto gastronómica provisional. Ya no queda ninguna foto ajena a la casa.
- **Carrusel del local.** Las cuatro fotos interiores juntas enseñan la casa entera sin alargar la
  página; pase automático lento, con pausa, y nunca en móvil ni con movimiento reducido.
- **Personas en «Visítanos».** Grande, junto a la dirección y el horario: la invitación a venir tiene
  caras. Sin pie de foto, nombres ni cargos. Uso autorizado por Fidel.
- **Tío Pedro después de la carta**, sobre fondo claro y con su logotipo pequeño, sin enlace propio:
  continúa la historia del producto sin parecer un anuncio. Solo afirma lo que dice su propia web (ambos en San Vitero,
  herederos de una empresa pionera de Aliste, tienda en línea). No se da su dirección.
- **Sin aviso de precios.** Los precios siguen pendientes de confirmar, pero solo internamente.

## Antes de publicar

- [ ] Confirmar los **precios** vigentes con el restaurante (`src/data/menu.ts`).
- [ ] Confirmar qué es el **«solomillo francés»** para afinar su traducción (`reviewNote` en `menu.ts`).
- [ ] Revisar las traducciones con un hablante nativo de inglés, portugués y francés.
- [ ] Verificar cualquier dato histórico adicional (nombres, generaciones) antes de añadirlo.
- [ ] Decidir dominio: rellenar `siteUrl` en `site.ts` y añadir `og:url` en `index.html`.
- [ ] Si se quiere vista previa al compartir, crear una imagen 1200×630 y añadir `og:image` (con URL
      absoluta) en `index.html`. Ahora no hay ninguna.
