<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// Enlace con aspecto de botón. En esta web todas las acciones llevan a
// algún sitio (la carta, Google Maps, el teléfono), así que son enlaces.
withDefaults(
  defineProps<{
    href: string
    variant?: 'solid' | 'outline'
    /** Abre en una pestaña nueva (Google Maps, Tío Pedro), con `noopener`. */
    external?: boolean
  }>(),
  { variant: 'solid', external: false },
)

const { t } = useI18n()
</script>

<template>
  <a
    :href="href"
    class="action-link"
    :class="`action-link--${variant}`"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
  >
    <!-- Un solo hijo flexible: el texto y sus fragmentos (p. ej. el teléfono) no se separan. -->
    <span><slot /></span>
    <span
      v-if="external"
      class="visually-hidden"
    > {{ t('a11y.newTab') }}</span>
  </a>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.action-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 3rem;
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: var(--radius);
  transition:
    transform var(--duration-press) var(--ease-out),
    background-color var(--duration-ui) ease,
    border-color var(--duration-ui) ease,
    color var(--duration-ui) ease;

  &:active {
    transform: scale(0.97);
  }

  @media (prefers-reduced-motion: reduce) {
    &:active {
      transform: none;
    }
  }
}

// Sólido: la acción principal, en granate.
.action-link--solid {
  background: var(--color-granate);
  border-color: var(--color-granate);
  color: var(--color-on-granate);

  @include hover {
    background: var(--color-granate-deep);
    border-color: var(--color-granate-deep);
  }
}

// Contorno: acción secundaria en carbón; al pasar, se rellena.
.action-link--outline {
  border-color: var(--color-carbon);
  color: var(--color-carbon);

  @include hover {
    background: var(--color-carbon);
    color: var(--color-hueso);
  }
}
</style>
