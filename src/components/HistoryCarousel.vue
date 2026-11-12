<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ResponsiveImage from './ui/ResponsiveImage.vue'
import { historySlides } from '@/data/images'

// Carrusel de las cuatro fotos del local (comedor y barra).
//
// - La pista es un contenedor con desplazamiento horizontal y CSS Scroll Snap:
//   en móvil se desliza con el dedo, sin JavaScript de gestos. Una foto entera
//   por vez, sin la siguiente asomando.
// - Móvil y tableta (< 64rem): puntos de paginación y «1 / 4», sin botones.
//   Escritorio: «Anterior», «Siguiente», contador y pausa.
// - Bucle sin saltos: tras la última foto va una copia de la primera
//   (oculta a lectores de pantalla). Al llegar a la copia, la pista vuelve a la
//   primera real sin animación; visualmente es la misma imagen.
// - Pase automático solo en escritorio (≥ 64rem) y sin «movimiento reducido»:
//   una foto cada 7 s, de derecha a izquierda. Se detiene mientras el ratón
//   está encima, mientras se navega con el teclado dentro, fuera de pantalla y
//   con la pestaña oculta. Tras una interacción manual la cuenta vuelve a empezar.
//   El botón de pausa lo detiene del todo (WCAG 2.2.2).

const AUTOPLAY_DELAY = 7000
const SLIDE_DURATION = 700

const { t } = useI18n()

const slides = historySlides
const total = slides.length

const root = useTemplateRef<HTMLElement>('root')
const track = useTemplateRef<HTMLElement>('track')

const index = ref(0)
const announcement = ref('')

// Condiciones del pase automático.
const isDesktop = ref(false)
const prefersReducedMotion = ref(false)
const isPausedByUser = ref(false)
const isHovered = ref(false)
const hasKeyboardFocus = ref(false)
const isOnScreen = ref(false)
const isPageVisible = ref(true)

const canAutoplay = computed(() => isDesktop.value && !prefersReducedMotion.value)
const isPlaying = computed(
  () =>
    canAutoplay.value &&
    !isPausedByUser.value &&
    !isHovered.value &&
    !hasKeyboardFocus.value &&
    isOnScreen.value &&
    isPageVisible.value,
)

function slideElements(): HTMLElement[] {
  return [...(track.value?.querySelectorAll<HTMLElement>('.carousel__slide') ?? [])]
}

/** Posición de desplazamiento que alinea la diapositiva `i` (la copia es `total`). */
function offsetOf(i: number): number {
  const elements = slideElements()
  const first = elements[0]
  const target = elements[i]
  if (!first || !target || !track.value) return 0
  const max = track.value.scrollWidth - track.value.clientWidth
  return Math.min(target.offsetLeft - first.offsetLeft, max)
}

// ── Movimiento ──────────────────────────────────────────────────────────────
// Se anima a mano (y no con scrollTo smooth) para controlar duración y curva:
// la velocidad del desplazamiento nativo varía entre navegadores.

let frame = 0
let isAnimating = false

function easeInOut(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2
}

function stopAnimation() {
  if (!isAnimating) return
  cancelAnimationFrame(frame)
  isAnimating = false
  if (track.value) track.value.style.scrollSnapType = ''
}

function jumpTo(left: number) {
  stopAnimation()
  if (track.value) track.value.scrollLeft = left
}

function animateTo(left: number) {
  const el = track.value
  if (!el) return
  if (prefersReducedMotion.value) {
    jumpTo(left)
    settle()
    return
  }

  stopAnimation()
  const start = el.scrollLeft
  const distance = left - start
  const startTime = performance.now()
  // Sin snap mientras se anima: si no, el navegador corregiría cada fotograma.
  el.style.scrollSnapType = 'none'
  isAnimating = true

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / SLIDE_DURATION, 1)
    el.scrollLeft = start + distance * easeInOut(progress)
    if (progress < 1) {
      frame = requestAnimationFrame(step)
    } else {
      isAnimating = false
      el.style.scrollSnapType = ''
      settle()
    }
  }
  frame = requestAnimationFrame(step)
}

/** Cuando la pista se detiene: fija el índice y, si estamos en la copia, vuelve a la primera. */
function settle() {
  const el = track.value
  if (!el || isAnimating) return
  const positions = slideElements().map((_, i) => offsetOf(i))
  let nearest = 0
  positions.forEach((position, i) => {
    if (Math.abs(position - el.scrollLeft) < Math.abs((positions[nearest] ?? 0) - el.scrollLeft)) {
      nearest = i
    }
  })
  if (nearest === total) {
    jumpTo(0)
    nearest = 0
  }
  index.value = nearest
  restartTimer()
}

let settleTimer = 0
function onScroll() {
  if (isAnimating) return
  window.clearTimeout(settleTimer)
  settleTimer = window.setTimeout(settle, 140)
}

// Si el visitante toca o usa la rueda en mitad de una animación, manda él.
function onUserScrollIntent() {
  if (isAnimating) {
    stopAnimation()
    onScroll()
  }
}

function next() {
  const target = index.value + 1
  index.value = target % total
  animateTo(offsetOf(target))
}

function previous() {
  if (index.value === 0) {
    // Desde la primera: se salta a la copia (idéntica) y se retrocede a la última.
    jumpTo(offsetOf(total))
    index.value = total - 1
  } else {
    index.value -= 1
  }
  animateTo(offsetOf(index.value))
}

function goTo(target: number) {
  if (target === index.value) return
  index.value = target
  animateTo(offsetOf(target))
}

function announce() {
  const slide = slides[index.value]
  if (!slide) return
  announcement.value = `${t(`history.${slide.caption}`)}, ${t('history.carousel.position', {
    current: index.value + 1,
    total,
  })}`
}

function onPrevious() {
  previous()
  announce()
}

function onNext() {
  next()
  announce()
}

function onDot(target: number) {
  goTo(target)
  announce()
}

function onTrackKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') onNext()
  else if (event.key === 'ArrowLeft') onPrevious()
  else return
  event.preventDefault()
}

// ── Pase automático ─────────────────────────────────────────────────────────

let autoplayTimer = 0

function restartTimer() {
  window.clearTimeout(autoplayTimer)
  if (isPlaying.value) autoplayTimer = window.setTimeout(next, AUTOPLAY_DELAY)
}

watch(isPlaying, restartTimer)

function togglePause() {
  isPausedByUser.value = !isPausedByUser.value
}

// Solo el foco de teclado detiene el pase: un clic con el ratón deja el foco
// en el botón y, si no, el carrusel no volvería a moverse hasta hacer clic fuera.
function onFocusIn(event: FocusEvent) {
  hasKeyboardFocus.value = (event.target as HTMLElement).matches(':focus-visible')
}

function onFocusOut(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node | null)) hasKeyboardFocus.value = false
}

// ── Entorno ─────────────────────────────────────────────────────────────────

const desktopQuery = window.matchMedia('(min-width: 64rem)')
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

function syncMedia() {
  isDesktop.value = desktopQuery.matches
  prefersReducedMotion.value = motionQuery.matches
}

function onVisibilityChange() {
  isPageVisible.value = document.visibilityState === 'visible'
}

let visibilityObserver: IntersectionObserver | null = null
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  syncMedia()
  desktopQuery.addEventListener('change', syncMedia)
  motionQuery.addEventListener('change', syncMedia)
  document.addEventListener('visibilitychange', onVisibilityChange)

  if (root.value) {
    visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isOnScreen.value = !!entry?.isIntersecting
      },
      { threshold: 0.35 },
    )
    visibilityObserver.observe(root.value)
  }

  // Al cambiar el tamaño, la diapositiva actual sigue alineada.
  if (track.value) {
    resizeObserver = new ResizeObserver(() => jumpTo(offsetOf(index.value)))
    resizeObserver.observe(track.value)
  }
})

onBeforeUnmount(() => {
  stopAnimation()
  window.clearTimeout(autoplayTimer)
  window.clearTimeout(settleTimer)
  desktopQuery.removeEventListener('change', syncMedia)
  motionQuery.removeEventListener('change', syncMedia)
  document.removeEventListener('visibilitychange', onVisibilityChange)
  visibilityObserver?.disconnect()
  resizeObserver?.disconnect()
})
</script>

<template>
  <section
    ref="root"
    class="carousel"
    :aria-label="t('history.carousel.label')"
    :aria-roledescription="t('history.carousel.roleCarousel')"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <!-- La pista es enfocable para poder desplazarla con las flechas del teclado. -->
    <div
      ref="track"
      class="carousel__track"
      tabindex="0"
      @scroll.passive="onScroll"
      @pointerdown="onUserScrollIntent"
      @wheel.passive="onUserScrollIntent"
      @keydown="onTrackKeydown"
    >
      <figure
        v-for="(slide, i) in slides"
        :key="slide.image.id"
        class="carousel__slide"
        role="group"
        :aria-roledescription="t('history.carousel.roleSlide')"
        :aria-label="t('history.carousel.position', { current: i + 1, total })"
      >
        <div class="carousel__frame">
          <ResponsiveImage
            :image="slide.image"
            :alt="t(`images.${slide.image.id}`)"
            sizes="(min-width: 64rem) 52vw, 100vw"
          />
        </div>
        <figcaption>{{ t(`history.${slide.caption}`) }}</figcaption>
      </figure>

      <!-- Copia de la primera foto para cerrar el bucle; invisible para la accesibilidad. -->
      <div
        class="carousel__slide"
        aria-hidden="true"
        inert
      >
        <div class="carousel__frame">
          <ResponsiveImage
            :image="slides[0].image"
            alt=""
            sizes="(min-width: 64rem) 52vw, 100vw"
          />
        </div>
      </div>
    </div>

    <div class="carousel__controls">
      <!-- Escritorio: anterior / siguiente. -->
      <button
        type="button"
        class="carousel__button carousel__step"
        @click="onPrevious"
      >
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M10 3 5 8l5 5" />
        </svg>
        {{ t('history.carousel.previous') }}
      </button>
      <button
        type="button"
        class="carousel__button carousel__step"
        @click="onNext"
      >
        {{ t('history.carousel.next') }}
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="m6 3 5 5-5 5" />
        </svg>
      </button>

      <!-- Móvil y tableta: puntos de paginación (también se puede deslizar). -->
      <div class="carousel__dots">
        <button
          v-for="(slide, i) in slides"
          :key="slide.image.id"
          type="button"
          class="carousel__dot"
          :aria-label="t('history.carousel.goTo', { current: i + 1, total })"
          :aria-current="i === index ? 'true' : undefined"
          @click="onDot(i)"
        />
      </div>

      <p
        class="carousel__count"
        aria-hidden="true"
      >
        <span class="tabular">{{ index + 1 }}</span>
        <span class="carousel__count-total"> / {{ total }}</span>
      </p>

      <button
        v-if="canAutoplay"
        type="button"
        class="carousel__button carousel__button--icon"
        :aria-label="isPausedByUser ? t('history.carousel.play') : t('history.carousel.pause')"
        @click="togglePause"
      >
        <svg
          v-if="isPausedByUser"
          viewBox="0 0 16 16"
          aria-hidden="true"
          class="is-filled"
        >
          <path d="M5 3.5v9l7.5-4.5z" />
        </svg>
        <svg
          v-else
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M5.5 3.5v9M10.5 3.5v9" />
        </svg>
      </button>
    </div>

    <p
      class="visually-hidden"
      aria-live="polite"
    >
      {{ announcement }}
    </p>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.carousel {
  min-width: 0;
}

// Una foto entera por vez, dentro del margen de la página. Entre foto y foto
// hay un hueco que solo se ve mientras se desliza.
.carousel__track {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  gap: var(--space-4);
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus-visible {
    outline-color: var(--color-on-granate);
    outline-offset: 4px;
  }

  @include from('lg') {
    gap: var(--space-5);
  }
}

.carousel__slide {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.carousel__frame {
  aspect-ratio: 4 / 3;
}

.carousel__slide figcaption {
  @include carta-label(var(--text-sm));
  margin-top: var(--space-3);
  color: var(--color-on-granate-muted);
}

.carousel__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);

  @include from('lg') {
    margin-top: var(--space-5);
  }
}

// Doble clase: tiene que ganar al `display` de `.carousel__button`.
.carousel__button.carousel__step {
  display: none;

  @include from('lg') {
    display: inline-flex;
  }
}

// Puntos: objetivo de 1,5 × 2,75rem; el punto visible mide 0,5rem.
// El activo, a plena opacidad y algo mayor (no solo color).
.carousel__dots {
  display: flex;
  margin-inline-start: calc(var(--space-2) * -1);

  @include from('lg') {
    display: none;
  }
}

.carousel__dot {
  display: grid;
  place-items: center;
  width: 1.5rem;
  height: 2.75rem;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--color-on-granate);
    opacity: 0.35;
    transition:
      opacity var(--duration-ui) ease,
      transform var(--duration-ui) var(--ease-out);
  }

  &[aria-current='true']::before {
    opacity: 1;
    transform: scale(1.25);
  }

  &:focus-visible {
    outline-color: var(--color-on-granate);
    outline-offset: -4px;
  }
}

// Botones de contorno sobre el granate, con la voz de la carta.
.carousel__button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  padding-inline: var(--space-4);
  background: none;
  border: 1px solid var(--line-on-granate);
  border-radius: var(--radius);
  color: var(--color-on-granate);
  font-family: var(--font-carta);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    border-color var(--duration-ui) ease,
    transform var(--duration-press) var(--ease-out);

  @include hover {
    border-color: var(--color-on-granate);
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline-color: var(--color-on-granate);
  }

  svg {
    width: 1rem;
    height: 1rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
  }

  svg.is-filled {
    fill: currentColor;
    stroke: none;
  }
}

.carousel__button--icon {
  justify-content: center;
  width: 2.75rem;
  padding: 0;
}

.carousel__count {
  margin-inline-start: auto;
  font-family: var(--font-carta);
  font-size: var(--text-lg);
  letter-spacing: 0.06em;

  @include from('lg') {
    margin-inline-end: var(--space-3);
  }
}

.carousel__count-total {
  color: var(--color-on-granate-muted);
}

@media (prefers-reduced-motion: reduce) {
  .carousel__button:active {
    transform: none;
  }

  .carousel__dot::before {
    transition: none;
  }
}
</style>
