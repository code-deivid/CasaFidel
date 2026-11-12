<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import LocaleFlag from './ui/LocaleFlag.vue'
import { localeNames, locales, setLocale, type Locale } from '@/i18n'

// Selector global de idioma, con dos presentaciones del mismo estado:
//
// - Escritorio (≥ 64rem): las cuatro banderas en línea. Cada una es un botón
//   con el idioma en su propia lengua como nombre accesible y `aria-pressed`
//   en el activo (plena opacidad + filete granate: no depende solo del color).
// - Móvil y tableta (< 64rem, cuando la cabecera usa el menú móvil): un botón
//   compacto con la bandera y el código del idioma actual que despliega la
//   lista de idiomas con sus banderas. Patrón disclosure: `aria-expanded`, el
//   foco entra en el idioma actual, flechas / Inicio / Fin, Escape cierra y
//   devuelve el foco, un clic o Tab fuera lo cierra.
//
// Solo una de las dos se muestra (CSS); la otra queda con `display: none`,
// fuera del árbol de accesibilidad.

const { t, locale } = useI18n()
const currentLocale = computed(() => locale.value as Locale)

const isOpen = ref(false)
const menu = useTemplateRef<HTMLElement>('menu')
const trigger = useTemplateRef<HTMLButtonElement>('trigger')
const listId = useId()

function choose(code: Locale) {
  if (code !== currentLocale.value) setLocale(code)
}

async function open() {
  isOpen.value = true
  await nextTick()
  menu.value?.querySelector<HTMLButtonElement>('[aria-current="true"]')?.focus()
}

function close({ restoreFocus = true } = {}) {
  isOpen.value = false
  if (restoreFocus) trigger.value?.focus()
}

function toggle() {
  if (isOpen.value) close()
  else open()
}

function chooseFromList(code: Locale) {
  choose(code)
  close()
}

function onMenuKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return

  if (event.key === 'Escape') {
    // Que no cierre también el panel del menú móvil.
    event.stopPropagation()
    close()
    return
  }

  const options = [...(menu.value?.querySelectorAll<HTMLButtonElement>('.language-switch__item') ?? [])]
  const current = options.indexOf(document.activeElement as HTMLButtonElement)
  let target: number
  if (event.key === 'ArrowDown') target = (current + 1) % options.length
  else if (event.key === 'ArrowUp') target = (current - 1 + options.length) % options.length
  else if (event.key === 'Home') target = 0
  else if (event.key === 'End') target = options.length - 1
  else return
  event.preventDefault()
  options[target]?.focus()
}

function onPointerDown(event: PointerEvent) {
  if (isOpen.value && !menu.value?.contains(event.target as Node)) close({ restoreFocus: false })
}

function onFocusOut(event: FocusEvent) {
  if (isOpen.value && !menu.value?.contains(event.relatedTarget as Node | null)) {
    close({ restoreFocus: false })
  }
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>

<template>
  <div class="language-switch">
    <!-- Escritorio: banderas en línea. -->
    <div
      class="language-switch__inline"
      role="group"
      :aria-label="t('language.label')"
    >
      <button
        v-for="code in locales"
        :key="code"
        type="button"
        class="language-switch__option"
        :lang="code"
        :title="localeNames[code]"
        :aria-pressed="code === currentLocale"
        @click="choose(code)"
      >
        <span class="visually-hidden">{{ localeNames[code] }}</span>
        <LocaleFlag :code="code" />
      </button>
    </div>

    <!-- Móvil y tableta: desplegable. -->
    <div
      ref="menu"
      class="language-switch__menu"
      @keydown="onMenuKeydown"
      @focusout="onFocusOut"
    >
      <button
        ref="trigger"
        type="button"
        class="language-switch__trigger"
        :aria-expanded="isOpen"
        :aria-controls="listId"
        @click="toggle"
      >
        <LocaleFlag :code="currentLocale" />
        <!-- Nombre accesible: «ES, Idioma: Español» (incluye el texto visible). -->
        <span class="language-switch__code">{{ currentLocale }}</span>
        <span class="visually-hidden">, {{ t('language.label') }}: {{ localeNames[currentLocale] }}</span>
        <svg
          class="language-switch__chevron"
          :class="{ 'is-open': isOpen }"
          viewBox="0 0 12 12"
          aria-hidden="true"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>

      <Transition name="popover">
        <ul
          v-show="isOpen"
          :id="listId"
          class="language-switch__list"
          :aria-label="t('language.label')"
        >
          <li
            v-for="code in locales"
            :key="code"
          >
            <button
              type="button"
              class="language-switch__item"
              :lang="code"
              :aria-current="code === currentLocale ? 'true' : undefined"
              @click="chooseFromList(code)"
            >
              <LocaleFlag :code="code" />
              <span class="language-switch__name">{{ localeNames[code] }}</span>
              <svg
                v-if="code === currentLocale"
                class="language-switch__check"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            </button>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

// ── Escritorio: banderas en línea ───────────────────────────────────────────

.language-switch__inline {
  display: none;

  @include from('lg') {
    display: flex;
    align-items: center;
  }
}

// Objetivo de 2 × 2,75rem; la bandera mide 1,5 × 1rem.
.language-switch__option {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 2rem;
  height: 2.75rem;
  padding: 0;
  background: none;
  border: 0;
  border-radius: var(--radius);
  cursor: pointer;
  transition: transform var(--duration-press) var(--ease-out);

  .locale-flag {
    opacity: 0.62;
    filter: saturate(0.7);
    transition:
      opacity var(--duration-ui) ease,
      filter var(--duration-ui) ease;
  }

  // Filete del idioma activo: granate, bajo la bandera.
  &::after {
    content: '';
    position: absolute;
    inset-inline: 0.3125rem;
    bottom: 0.375rem;
    height: 2px;
    background: var(--color-granate);
    transform: scaleX(0);
    transition: transform var(--duration-ui) var(--ease-out);
  }

  &:active {
    transform: scale(0.94);
  }

  &[aria-pressed='true'] {
    .locale-flag {
      opacity: 1;
      filter: none;
    }

    &::after {
      transform: scaleX(1);
    }
  }

  @include hover {
    .locale-flag {
      opacity: 1;
      filter: none;
    }
  }
}

// ── Móvil y tableta: desplegable ────────────────────────────────────────────

.language-switch__menu {
  position: relative;

  @include from('lg') {
    display: none;
  }
}

.language-switch__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  padding-inline: var(--space-3);
  background: none;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  cursor: pointer;
  transition:
    border-color var(--duration-ui) ease,
    transform var(--duration-press) var(--ease-out);

  &[aria-expanded='true'] {
    border-color: var(--line-strong);
  }

  &:active {
    transform: scale(0.97);
  }
}

.language-switch__code {
  font-family: var(--font-carta);
  font-size: var(--text-base);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.language-switch__chevron {
  width: 0.75rem;
  height: 0.75rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  transition: transform var(--duration-ui) var(--ease-out);

  &.is-open {
    transform: rotate(180deg);
  }
}

// La lista nace de la esquina del botón y queda por encima del panel móvil.
.language-switch__list {
  position: absolute;
  z-index: 3;
  top: calc(100% + var(--space-2));
  right: 0;
  min-width: 13rem;
  padding-block: var(--space-2);
  background: var(--color-hueso);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  transform-origin: top right;
}

.language-switch__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  min-height: 3rem;
  padding-inline: var(--space-4);
  background: none;
  border: 0;
  font-size: var(--text-base);
  text-align: start;
  cursor: pointer;
  transition: background-color var(--duration-ui) ease;

  @include hover {
    background: var(--color-marfil);
  }

  &:focus-visible {
    outline-offset: -2px;
  }

  // Activo: granate, seminegrita y una marca de verificación.
  &[aria-current='true'] {
    color: var(--color-granate);
    font-weight: 600;
  }
}

.language-switch__name {
  flex: 1;
}

.language-switch__check {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
}

// Entrada rápida desde el botón; salida aún más rápida.
.popover-enter-active {
  transition:
    opacity 150ms var(--ease-out),
    transform 150ms var(--ease-out);
}

.popover-leave-active {
  transition:
    opacity 100ms ease,
    transform 100ms ease;
}

.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .language-switch__option:active,
  .language-switch__trigger:active {
    transform: none;
  }

  .language-switch__option::after,
  .language-switch__chevron {
    transition: none;
  }

  .popover-enter-from,
  .popover-leave-to {
    transform: none;
  }
}
</style>
