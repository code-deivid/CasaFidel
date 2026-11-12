<script setup lang="ts">
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import { localeNames, locales, setLocale, type Locale } from '@/i18n'

// Selector global de idioma: cuatro banderas visibles a la vez, sin desplegable.
// Cada bandera es un botón cuyo nombre accesible es el idioma en su propia
// lengua («Español», «English»…); el idioma activo se marca con aria-pressed
// y, visualmente, con opacidad completa y un filete granate debajo (no solo color).

const { t, locale } = useI18n()
const currentLocale = computed(() => locale.value as Locale)

// Los recortes del SVG de la bandera británica necesitan ids únicos en el documento.
const uid = useId()
const ukClip = `${uid}-uk`
const ukCross = `${uid}-uk-cross`

function choose(code: Locale) {
  if (code !== currentLocale.value) setLocale(code)
}
</script>

<template>
  <div
    class="language-switch"
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

      <!-- Banderas simplificadas, dibujadas a mano: sin escudos ni detalles que
           a 24px serían ruido. 3:2 salvo la británica, recortada al mismo marco. -->
      <svg
        v-if="code === 'es'"
        class="language-switch__flag"
        viewBox="0 0 3 2"
        aria-hidden="true"
      >
        <rect
          width="3"
          height="2"
          fill="#c60b1e"
        />
        <rect
          y="0.5"
          width="3"
          height="1"
          fill="#ffc400"
        />
      </svg>

      <svg
        v-else-if="code === 'en'"
        class="language-switch__flag"
        viewBox="7.5 0 45 30"
        aria-hidden="true"
      >
        <defs>
          <clipPath :id="ukClip">
            <rect
              width="60"
              height="30"
            />
          </clipPath>
          <clipPath :id="ukCross">
            <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
          </clipPath>
        </defs>
        <g :clip-path="`url(#${ukClip})`">
          <rect
            width="60"
            height="30"
            fill="#012169"
          />
          <path
            d="M0 0l60 30m0-30L0 30"
            stroke="#fff"
            stroke-width="6"
          />
          <path
            d="M0 0l60 30m0-30L0 30"
            :clip-path="`url(#${ukCross})`"
            stroke="#c8102e"
            stroke-width="4"
          />
          <path
            d="M30 0v30M0 15h60"
            stroke="#fff"
            stroke-width="10"
          />
          <path
            d="M30 0v30M0 15h60"
            stroke="#c8102e"
            stroke-width="6"
          />
        </g>
      </svg>

      <svg
        v-else-if="code === 'pt'"
        class="language-switch__flag"
        viewBox="0 0 600 400"
        aria-hidden="true"
      >
        <rect
          width="600"
          height="400"
          fill="#da291c"
        />
        <rect
          width="240"
          height="400"
          fill="#046a38"
        />
        <circle
          cx="240"
          cy="200"
          r="78"
          fill="none"
          stroke="#ffe900"
          stroke-width="22"
        />
        <path
          d="M196 148h88v62a44 44 0 0 1-88 0z"
          fill="#fff"
        />
        <path
          d="M210 162h60v46a30 30 0 0 1-60 0z"
          fill="#da291c"
        />
      </svg>

      <svg
        v-else
        class="language-switch__flag"
        viewBox="0 0 3 2"
        aria-hidden="true"
      >
        <rect
          width="3"
          height="2"
          fill="#ce1126"
        />
        <rect
          width="2"
          height="2"
          fill="#fff"
        />
        <rect
          width="1"
          height="2"
          fill="#002654"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.language-switch {
  display: flex;
  align-items: center;
}

// Objetivo táctil de 2 × 2,75rem; la bandera mide 1,5 × 1rem.
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

  &[aria-pressed='true']::after {
    transform: scaleX(1);
  }

  @include hover {
    .language-switch__flag {
      opacity: 1;
      filter: none;
    }
  }
}

.language-switch__flag {
  display: block;
  width: 1.5rem;
  height: 1rem;
  border-radius: 1px;
  // El borde define el blanco de la bandera francesa sobre el fondo claro.
  outline: 1px solid rgb(38 33 31 / 0.14);
  outline-offset: -1px;
  opacity: 0.62;
  filter: saturate(0.7);
  transition:
    opacity var(--duration-ui) ease,
    filter var(--duration-ui) ease;

  [aria-pressed='true'] > & {
    opacity: 1;
    filter: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .language-switch__option {
    &:active {
      transform: none;
    }

    &::after {
      transition: none;
    }
  }
}
</style>
