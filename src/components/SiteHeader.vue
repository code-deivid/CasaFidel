<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitch from './LanguageSwitch.vue'
import ActionLink from './ui/ActionLink.vue'
import { navigation, phoneHref, site } from '@/data/site'

const { t } = useI18n()

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const mobilePanel = useTemplateRef<HTMLElement>('mobilePanel')

function openMenu() {
  isMenuOpen.value = true
}

function closeMenu({ restoreFocus = true } = {}) {
  isMenuOpen.value = false
  if (restoreFocus) menuButton.value?.focus()
}

function toggleMenu() {
  if (isMenuOpen.value) closeMenu()
  else openMenu()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isMenuOpen.value) closeMenu()
}

// Al pasar a escritorio el panel móvil deja de tener sentido.
const desktopQuery = window.matchMedia('(min-width: 64rem)')
function onViewportChange(event: MediaQueryListEvent) {
  if (event.matches && isMenuOpen.value) closeMenu({ restoreFocus: false })
}

watch(isMenuOpen, async (isOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    await nextTick()
    mobilePanel.value?.querySelector('a')?.focus()
  }
})

// Un centinela de 1px al principio de la página (App.vue): cuando sale de
// pantalla, la página ya se ha desplazado. Sin escuchar el evento scroll.
let scrollObserver: IntersectionObserver | null = null

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  const sentinel = document.getElementById('inicio-pagina')
  if (sentinel && 'IntersectionObserver' in window) {
    scrollObserver = new IntersectionObserver(([entry]) => {
      isScrolled.value = !!entry && !entry.isIntersecting
    })
    scrollObserver.observe(sentinel)
  }
  desktopQuery.addEventListener('change', onViewportChange)
})

onBeforeUnmount(() => {
  scrollObserver?.disconnect()
  document.removeEventListener('keydown', onKeydown)
  desktopQuery.removeEventListener('change', onViewportChange)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header
    class="site-header"
    :class="{ 'is-scrolled': isScrolled || isMenuOpen }"
  >
    <div class="site-header__bar">
      <a
        href="#inicio"
        class="site-header__brand"
        :aria-label="t('a11y.home')"
      >
        <span
          class="site-header__monogram"
          aria-hidden="true"
        />
        <span
          class="site-header__name"
          aria-hidden="true"
        >{{ site.name }}</span>
      </a>

      <nav
        class="site-header__nav"
        :aria-label="t('nav.label')"
      >
        <ul>
          <li
            v-for="link in navigation"
            :key="link.href"
          >
            <a :href="link.href">{{ t(`nav.${link.key}`) }}</a>
          </li>
        </ul>
      </nav>

      <LanguageSwitch />

      <!-- La acción de la casa es llamar para reservar. El número se lee a partir
           de 80rem; antes queda solo para lectores de pantalla. -->
      <a
        :href="phoneHref"
        class="site-header__action"
      >
        {{ t('actions.book') }}<span class="site-header__action-phone"> · <span class="tabular">{{ site.phone }}</span></span>
      </a>

      <button
        ref="menuButton"
        type="button"
        class="site-header__toggle"
        :aria-expanded="isMenuOpen"
        aria-controls="menu-movil"
        :aria-label="isMenuOpen ? t('nav.close') : t('nav.open')"
        @click="toggleMenu"
      >
        <!-- Dos iconos fijos en el mismo marco de 24: dos líneas (cerrado) y una X
             de dos diagonales simétricas centradas en (12, 12) (abierto). -->
        <svg
          v-if="isMenuOpen"
          class="site-header__toggle-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
        </svg>
        <svg
          v-else
          class="site-header__toggle-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M4 9h16M4 15h16" />
        </svg>
      </button>
    </div>

    <Transition name="panel">
      <nav
        v-show="isMenuOpen"
        id="menu-movil"
        ref="mobilePanel"
        class="site-header__panel"
        :aria-label="t('nav.label')"
      >
        <ul>
          <li
            v-for="link in navigation"
            :key="link.href"
          >
            <a
              :href="link.href"
              @click="closeMenu({ restoreFocus: false })"
            >{{ t(`nav.${link.key}`) }}</a>
          </li>
        </ul>
        <div class="site-header__panel-footer">
          <ActionLink :href="phoneHref">
            {{ t('actions.book') }} · <span class="tabular">{{ site.phone }}</span>
          </ActionLink>
          <p class="site-header__panel-address">
            {{ site.address.street }} · {{ site.address.town }}, {{ site.address.province }}
          </p>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

// Cabecera clara y fija. El filete inferior solo aparece cuando la página
// ya se ha desplazado (`is-scrolled`), para que la portada empiece limpia.
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--color-hueso);
  border-bottom: 1px solid transparent;
  transition: border-color var(--duration-ui) ease;

  &.is-scrolled {
    border-bottom-color: var(--line);
  }
}

.site-header__bar {
  @include page-container;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  height: var(--header-height);

  @include from('md') {
    gap: var(--space-5);
  }
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  margin-inline-end: auto;
  text-decoration: none;
}

// El monograma original, recortado como máscara y rellenado en granate.
.site-header__monogram {
  flex-shrink: 0;
  width: 1.875rem;
  height: 2.75rem;
  background: var(--color-granate);
  mask: url('/logos/casa-fidel-monograma-refinado.svg') center / contain no-repeat;
}

.site-header__name {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  line-height: 1;
  white-space: nowrap;

  // En los móviles más estrechos (< 336px) solo cabe el monograma junto al
  // idioma y el menú; el enlace conserva su nombre accesible.
  @media (max-width: 21rem) {
    display: none;
  }
}

.site-header__nav {
  display: none;

  @include from('lg') {
    display: block;
  }

  ul {
    display: flex;
    gap: var(--space-6);
  }

  a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    font-size: var(--text-sm);
    font-weight: 500;
    white-space: nowrap;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.4em;
    transition: text-decoration-color var(--duration-ui) ease;

    @include hover {
      text-decoration-color: var(--color-granate);
    }
  }
}

.site-header__action {
  display: none;
  min-height: 2.75rem;
  align-items: center;
  padding-inline: var(--space-5);
  border: 1px solid var(--color-granate);
  border-radius: var(--radius);
  color: var(--color-granate);
  font-size: var(--text-sm);
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
  transition:
    background-color var(--duration-ui) ease,
    color var(--duration-ui) ease,
    transform var(--duration-press) var(--ease-out);

  @include from('md') {
    display: inline-flex;
  }

  @include hover {
    background: var(--color-granate);
    color: var(--color-on-granate);
  }

  &:active {
    transform: scale(0.97);
  }
}

.site-header__action-phone {
  @include visually-hidden;

  @include from('xl') {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip-path: none;
    white-space: pre;
  }
}

.site-header__toggle {
  display: inline-grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  padding: 0;
  background: none;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  cursor: pointer;
  transition: transform var(--duration-press) var(--ease-out);

  &:active {
    transform: scale(0.97);
  }

  @include from('lg') {
    display: none;
  }
}

.site-header__toggle-icon {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
}

.site-header__panel {
  position: absolute;
  inset-inline: 0;
  top: 100%;
  height: calc(100dvh - var(--header-height));
  padding: var(--space-6) var(--page-gutter) var(--space-7);
  overflow-y: auto;
  background: var(--color-hueso);
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-7);

  li a {
    display: block;
    padding-block: var(--space-4);
    border-bottom: 1px solid var(--line);
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    line-height: 1.15;
    text-decoration: none;
  }
}

.site-header__panel-footer {
  display: grid;
  justify-items: start;
  gap: var(--space-5);
}

.site-header__panel-address {
  color: var(--color-piedra-ink);
  font-size: var(--text-sm);
}

// Entrada rápida y salida aún más rápida (emil-design-eng).
.panel-enter-active {
  transition:
    opacity var(--duration-ui) var(--ease-out),
    transform var(--duration-ui) var(--ease-out);
}

.panel-leave-active {
  transition:
    opacity 150ms ease,
    transform 150ms ease;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

@media (prefers-reduced-motion: reduce) {
  .panel-enter-from,
  .panel-leave-to {
    transform: none;
  }
}
</style>
