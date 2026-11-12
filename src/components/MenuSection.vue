<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import MenuCategory from './MenuCategory.vue'
import { menuCategories, type MenuCategory as Category } from '@/data/menu'

const { t } = useI18n()

// Igual que la carta impresa: tres categorías en cada columna.
const leftColumn = menuCategories.slice(0, 3)
const rightColumn = menuCategories.slice(3)

// ── Índice activo (solo móvil, < 48rem) ──────────────────────────────────────
// La barra de categorías queda fija bajo la cabecera. Un IntersectionObserver
// vigila las secciones de la carta dentro de una franja que empieza justo bajo
// la barra y ocupa el 45% superior de la pantalla: la primera categoría (en el
// orden de la carta) que está en la franja es la activa, y se subraya en granate.
// Sin escuchar el evento scroll.

type CategoryId = Category['id']

const activeId = ref<CategoryId | null>(null)
const index = useTemplateRef<HTMLElement>('index')
const indexList = useTemplateRef<HTMLElement>('indexList')

const mobileQuery = window.matchMedia('(max-width: 47.99rem)')
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

let observer: IntersectionObserver | null = null
const visible = new Set<string>()
// Tras un clic en el índice, la página se desplaza suavemente y atraviesa otras
// categorías; mientras tanto se mantiene la elegida para que el subrayado no salte.
let lockedUntil = 0

function onIntersect(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    if (entry.isIntersecting) visible.add(entry.target.id)
    else visible.delete(entry.target.id)
  }
  if (performance.now() < lockedUntil) return
  const first = menuCategories.find((category) => visible.has(`carta-${category.id}`))
  if (first) activeId.value = first.id
}

function startTracking() {
  stopTracking()
  // Cabecera fija + barra del índice: la franja empieza debajo de ambas.
  const header = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 72
  const bar = index.value?.offsetHeight ?? 50
  observer = new IntersectionObserver(onIntersect, {
    rootMargin: `-${header + bar}px 0px -55% 0px`,
  })
  document.querySelectorAll('.menu-category').forEach((section) => observer?.observe(section))
}

function stopTracking() {
  observer?.disconnect()
  observer = null
  visible.clear()
  activeId.value = null
}

function syncTracking() {
  if (mobileQuery.matches) startTracking()
  else stopTracking()
}

function onIndexClick(id: CategoryId) {
  if (!mobileQuery.matches) return
  activeId.value = id
  lockedUntil = performance.now() + 900
}

// La categoría activa siempre a la vista dentro de la barra, centrada si se puede.
watch(activeId, async (id) => {
  if (!id) return
  await nextTick()
  const list = indexList.value
  const link = list?.querySelector<HTMLElement>(`[href="#carta-${id}"]`)
  if (!list || !link) return
  const listBox = list.getBoundingClientRect()
  const linkBox = link.getBoundingClientRect()
  const left = list.scrollLeft + linkBox.left - listBox.left - (listBox.width - linkBox.width) / 2
  list.scrollTo({ left, behavior: motionQuery.matches ? 'auto' : 'smooth' })
})

onMounted(() => {
  syncTracking()
  mobileQuery.addEventListener('change', syncTracking)
})

onBeforeUnmount(() => {
  stopTracking()
  mobileQuery.removeEventListener('change', syncTracking)
})
</script>

<template>
  <section
    id="carta"
    class="menu"
    aria-labelledby="menu-title"
  >
    <div class="menu__inner">
      <h2
        id="menu-title"
        class="menu__title"
      >
        {{ t('menu.title') }}
      </h2>

      <nav
        ref="index"
        class="menu__index"
        :aria-label="t('menu.indexLabel')"
      >
        <ul ref="indexList">
          <li
            v-for="category in menuCategories"
            :key="category.id"
          >
            <a
              :href="`#carta-${category.id}`"
              :aria-current="activeId === category.id ? 'location' : undefined"
              @click="onIndexClick(category.id)"
            >{{ t(`menu.categories.${category.id}`) }}</a>
          </li>
        </ul>
      </nav>

      <div class="menu__columns">
        <div class="menu__column">
          <MenuCategory
            v-for="category in leftColumn"
            :key="category.id"
            :category="category"
          />
        </div>
        <div class="menu__column">
          <MenuCategory
            v-for="category in rightColumn"
            :key="category.id"
            :category="category"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

// El papel de la carta: marfil, con el monograma CF como gran marca de agua
// en granate, igual que la carta impresa del local.
.menu {
  position: relative;
  isolation: isolate;
  padding-block: var(--section-padding);
  background: var(--color-marfil);

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset-block: 14% 6%;
    inset-inline-start: 50%;
    width: min(46rem, 92%);
    translate: -50% 0;
    background: var(--color-granate);
    opacity: 0.06;
    mask: url('/logos/casa-fidel-monograma-refinado.svg') center / contain no-repeat;
    pointer-events: none;
  }
}

.menu__inner {
  @include page-container;
}

.menu__title {
  @include display-heading(var(--text-display));
}

// Índice de categorías. En móvil: barra horizontal fija bajo la cabecera,
// deslizable, con la categoría visible subrayada en granate. Desde 48rem la
// carta va a dos columnas y el índice es una fila normal, sin fijar.
.menu__index {
  position: sticky;
  top: var(--header-height);
  z-index: 1;
  margin-top: var(--space-7);
  margin-inline: calc(var(--page-gutter) * -1);
  padding-inline-start: var(--page-gutter);
  background: var(--color-marfil);
  border-block: 1px solid var(--line);

  // La lista llega hasta el borde de la pantalla: el enlace siguiente asoma
  // cortado bajo el desvanecido y deja claro que el índice se desliza.
  ul {
    display: flex;
    gap: var(--space-6);
    padding-inline-end: var(--page-gutter);
    overflow-x: auto;
    scrollbar-width: none;
    mask-image: linear-gradient(to right, #000 calc(100% - 3rem), transparent);

    @include from('md') {
      flex-wrap: wrap;
      row-gap: 0;
      padding-inline-end: 0;
      overflow-x: visible;
      mask-image: none;
    }
  }

  a {
    display: inline-flex;
    align-items: center;
    min-height: 3rem;
    font-family: var(--font-carta);
    font-size: 1.0625rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
    text-decoration-color: transparent;
    text-underline-offset: 0.35em;
    transition: text-decoration-color var(--duration-ui) ease;

    @include hover {
      text-decoration-color: var(--color-granate);
    }

    &[aria-current='location'] {
      color: var(--color-granate);
      text-decoration-color: var(--color-granate);
      text-decoration-thickness: 2px;
    }
  }

  @include from('md') {
    position: static;
    margin-inline: 0;
    padding-inline: 0;
    background: none;
  }
}

.menu__columns {
  display: grid;
  gap: var(--space-8);
  margin-top: var(--space-8);

  @include from('md') {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: var(--space-7);
  }

  @include from('lg') {
    column-gap: var(--space-10);
  }
}

.menu__column {
  display: grid;
  align-content: start;
  gap: var(--space-8);
}

// La cabecera ya la compensa `scroll-padding-top` (main.scss);
// en móvil hay que sumar la altura del índice fijo (3rem + filetes).
:deep(.menu-category) {
  scroll-margin-top: 3.5rem;

  @include from('md') {
    scroll-margin-top: 0;
  }
}
</style>
