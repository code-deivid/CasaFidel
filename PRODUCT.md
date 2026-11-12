# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vue 3 (Composition API) + TypeScript + Vite + SCSS + vue-i18n. Landing page estática y responsive, sin backend y sin frameworks CSS (nada de Tailwind, Bootstrap, etc.). Prioridad: código limpio, mantenible y comprensible.

## Users

- **Vecinos de San Vitero y la comarca de Aliste**: clientela habitual que vuelve a menudo; buscan horarios, la carta del restaurante y cómo reservar.
- **Turistas de paso**: visitantes de la zona (Sierra de la Culebra, rutas, frontera con Portugal) que descubren el restaurante desde el móvil y deciden dónde comer. Muchos portugueses, también ingleses y franceses: la web está completa en cuatro idiomas.
- **Emigrantes que vuelven en verano y fiestas**: gente del pueblo o con raíces allí que regresa en agosto y fechas señaladas; picos de demanda y reservas de grupo.

## Product Purpose

Casa Fidel es un restaurante / bar en San Vitero (Zamora). La web existe para que el visitante **reserve o contacte por teléfono** con el mínimo esfuerzo, después de entender qué se come allí y cuándo está abierto. Éxito = más reservas y llamadas directas, menos dudas sobre horarios, carta y ubicación.

## Positioning

- Casa desde **1955**, con la **ternera alistana** como base de su cocina. Fuente: Facebook oficial del restaurante («Nuestra casa fue fundada en 1955, desde la cocina nos dedicamos a elaborar los productos de esta tierra, siendo su base fundamental la ternera alistana»).
- Cocina de la tierra; carnes a la brasa; la carta incluye platos de caza.
- Vinculada a **Carnicería y Embutidos Tío Pedro**, también en San Vitero. Fuente: embutidostiopedro.es («Carnicería Tío Pedro y restaurante Casa Fidel, ubicados en San Vitero (Zamora), herederos de una de las empresas pioneras en el sector hostelero y la elaboración de embutidos en la comarca de Aliste»).

## Operating Context

- Uso mayoritariamente móvil, a menudo con cobertura rural limitada: la página debe cargar rápido y funcionar ligera.
- La acción principal es una llamada telefónica, no un formulario con backend.
- La demanda sube en verano y en fiestas.

## Capabilities and Constraints

- Sin backend: la reserva/contacto se resuelve con un enlace `tel:` y un mapa externo para la ubicación.
- La carta, horarios, textos y datos de contacto son contenido estático editable en el código.
- Idiomas: español (predeterminado), inglés, portugués y francés, completos. El visitante elige en la cabecera y la web lo recuerda.
- No asumir: reservas por WhatsApp, menú del día, oferta de caza de temporada, horarios de festivos ni indicador de «abierto ahora». Ninguno está confirmado.
- Sin decidir: sistema de reservas online, canales de contacto adicionales, dominio y hosting.

## Brand Commitments

- Nombre: **Casa Fidel**, ubicado en **San Vitero**. No se traducen Casa Fidel, San Vitero, Aliste ni Tío Pedro.
- Logotipo existente: monograma caligráfico "CF" en granate (`#640E0F`), con variantes en `casa-fidel-logo-refinado.svg`, `casa-fidel-logo-refinado-claro.svg` y `casa-fidel-monograma-refinado.svg`. Es identidad confirmada y debe conservarse. El cartel de la fachada («Casa fidel» en granate sobre placa oscura) es la misma identidad.
- El acabado de la web debe ser premium.
- Idioma principal: español.

## Evidence on Hand

En el repositorio:

- Carta con precios (`public/images/referencias/carta-original.png`), transcrita en `src/data/menu.ts`.
- Logotipo original y cartel exterior (referencias de trabajo; no se publican).
- Seis fotografías reales del restaurante en `public/images/restaurante/` (fachada, dos del comedor, dos de la zona de barra y una con cuatro personas). Se publican versiones optimizadas.
- Horario semanal (facilitado por el cliente; la captura `horarios-original.png` no está en el repositorio), en `src/data/hours.ts`.

- Teléfono confirmado: **980 681 471** (`tel:+34980681471`).
- Logotipo de Embutidos Tío Pedro (`public/images/restaurante/tio-pedro.webp`).
- Permiso de Fidel para usar sus imágenes (incluida `personas.webp`).

Fuera del repositorio: reseñas reales (verificables).

## Pending Verification

No publicar como hecho hasta confirmarlo con el restaurante:

- **Precios vigentes**: la carta está transcrita de una fotografía. No se muestra ningún aviso público; la duda vive solo aquí, en el README y en `src/data/menu.ts`.
- **Quiénes aparecen en `personas.webp`**: el uso está autorizado, pero sin nombres, cargos ni parentescos mientras no se confirmen.
- **Historia familiar** más allá de 1955 y la ternera alistana: nombres, generaciones, anécdotas.
- **Solomillo francés**: qué pieza es exactamente (la traducción es literal).
- **Festivos y horarios especiales**: no se publican.

No inventar platos, precios, horarios, reseñas, años de historia ni premios.

## Product Principles

1. **Reservar en un toque**: llamar debe estar siempre a mano, sobre todo en móvil.
2. **Lo práctico, sin buscar**: horario, ubicación y carta visibles al instante, en el idioma del visitante.
3. **Verdad de casa**: solo contenido real y verificado del propio restaurante; nada genérico ni supuesto.
4. **Ligera para el campo**: rendimiento pensado para conexiones rurales.
5. **Cercanía familiar**: el tono habla como la casa que lo regenta («elaboramos», «nuestras mollejas»), no como una cadena.

## Accessibility & Inclusion

Clientela de todas las edades, incluidas personas mayores de la comarca: texto legible, buen contraste, objetivos táctiles amplios y números de teléfono / horarios fáciles de leer. Objetivo WCAG 2.2 AA, en los cuatro idiomas (`lang` del documento actualizado, textos accesibles traducidos).
