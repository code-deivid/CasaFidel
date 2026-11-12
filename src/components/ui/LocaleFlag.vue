<script setup lang="ts">
import { useId } from 'vue'
import type { Locale } from '@/i18n'

// Bandera de un idioma, decorativa (el nombre del idioma lo da quien la usa).
// Simplificadas a mano: sin escudos ni detalles que a 24px serían ruido.
// Todas en 3:2; la británica se recorta al mismo marco.
defineProps<{ code: Locale }>()

// Los recortes del SVG británico necesitan ids únicos en el documento.
const uid = useId()
const ukClip = `${uid}-uk`
const ukCross = `${uid}-uk-cross`
</script>

<template>
  <svg
    v-if="code === 'es'"
    class="locale-flag"
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
    class="locale-flag"
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
    class="locale-flag"
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
    class="locale-flag"
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
</template>

<style scoped lang="scss">
.locale-flag {
  display: block;
  flex-shrink: 0;
  width: 1.5rem;
  height: 1rem;
  border-radius: 1px;
  // Define el blanco de la bandera francesa sobre el fondo claro.
  outline: 1px solid rgb(38 33 31 / 0.14);
  outline-offset: -1px;
}
</style>
