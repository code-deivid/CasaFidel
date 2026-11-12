<script setup lang="ts">
// Nota interna para el equipo. Solo aparece con `npm run dev`;
// el build de producción no la incluye.
const isDevelopment = import.meta.env.DEV
</script>

<template>
  <aside
    v-if="isDevelopment"
    class="dev-note"
  >
    <strong>Nota de desarrollo.</strong>
    <slot />
  </aside>
</template>

<style scoped lang="scss">
.dev-note {
  padding: var(--space-3) var(--space-4);
  border: 1px dashed currentColor;
  font-size: var(--text-xs);
  line-height: 1.5;
  opacity: 0.8;

  strong {
    margin-inline-end: var(--space-1);
  }
}
</style>
