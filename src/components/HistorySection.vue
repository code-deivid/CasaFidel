<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DevNote from './ui/DevNote.vue'
import HistoryCarousel from './HistoryCarousel.vue'
import { site } from '@/data/site'

const { t } = useI18n()
const year = site.foundingYear
</script>

<template>
  <section
    id="historia"
    class="history"
    aria-labelledby="history-title"
  >
    <div class="history__inner">
      <header class="history__header">
        <h2
          id="history-title"
          class="history__title"
        >
          {{ t('history.title', { year }) }}
        </h2>
        <p class="history__subtitle">
          {{ t('history.subtitle') }}
        </p>
      </header>

      <HistoryCarousel class="history__carousel" />

      <!-- Basado en el Facebook oficial: «Nuestra casa fue fundada en 1955, desde la
           cocina nos dedicamos a elaborar los productos de esta tierra, siendo su base
           fundamental la ternera alistana». No añadir nombres, generaciones ni fechas
           que no estén confirmados. -->
      <div class="history__text">
        <p class="history__lead">
          {{ t('history.lead', { year }) }}
        </p>
        <p class="history__body">
          {{ t('history.body') }}
        </p>
        <DevNote>
          Solo afirmamos la fecha de fundación y la ternera alistana (fuente: Facebook oficial).
          Nombres, generaciones o anécdotas se añadirán cuando el restaurante los confirme.
        </DevNote>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

// El único campo de color de la página: el granate del cartel.
// La fecha manda arriba; debajo, el carrusel del local a la izquierda y la
// historia a la derecha. En móvil: título, carrusel y texto, en ese orden.
// Todo dentro del margen de la página salvo la pista del carrusel en móvil,
// que asoma hasta el borde para invitar a deslizar.
.history {
  padding-block: var(--section-padding);
  background: var(--color-granate);
  color: var(--color-on-granate);
}

.history__inner {
  @include page-container;
  display: grid;
  gap: var(--space-7);

  @include from('lg') {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--space-6);
    row-gap: var(--space-8);
  }
}

.history__header {
  display: grid;
  gap: var(--space-4);

  @include from('lg') {
    grid-column: 1 / span 9;
  }
}

.history__title {
  @include display-heading(var(--text-display));
}

.history__subtitle {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  line-height: 1.25;
  color: var(--color-on-granate-muted);
}

.history__carousel {
  @include from('lg') {
    grid-column: 1 / span 7;
  }
}

.history__text {
  display: grid;
  align-content: start;
  gap: var(--space-5);
  max-width: 36rem;

  @include from('lg') {
    grid-column: 9 / span 4;
    padding-top: var(--space-2);
  }
}

.history__lead {
  font-size: var(--text-xl);
  line-height: 1.4;
}

.history__body {
  color: var(--color-on-granate-muted);
  line-height: 1.65;
}
</style>
