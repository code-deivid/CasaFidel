<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ActionLink from './ui/ActionLink.vue'
import OpeningHours from './OpeningHours.vue'
import ResponsiveImage from './ui/ResponsiveImage.vue'
import { images } from '@/data/images'
import { mapsUrl, phoneHref, site } from '@/data/site'

const { t } = useI18n()
</script>

<template>
  <section
    id="visitanos"
    class="visit"
    aria-labelledby="visit-title"
  >
    <div class="visit__inner">
      <!-- Fidel ha autorizado el uso de sus imágenes. Sin nombres ni cargos en el pie. -->
      <div class="visit__photo">
        <ResponsiveImage
          :image="images.people"
          :alt="t('images.people')"
          sizes="(min-width: 64rem) 55vw, 100vw"
        />
      </div>

      <div class="visit__main">
        <h2
          id="visit-title"
          class="visit__title"
        >
          {{ t('visit.title') }}
        </h2>

        <address class="visit__address">
          {{ site.address.street }}<br>
          {{ site.address.postalCode }} {{ site.address.town }}, {{ site.address.province }}
        </address>
        <p class="visit__region">
          {{ t('visit.region', { region: site.address.region }) }}
        </p>

        <div class="visit__actions">
          <ActionLink :href="phoneHref">
            {{ t('actions.call', { phone: site.phone }) }}
          </ActionLink>
          <ActionLink
            :href="mapsUrl"
            variant="outline"
            external
          >
            {{ t('actions.directions') }}
          </ActionLink>
        </div>

        <h3
          id="visit-hours-title"
          class="visit__hours-title"
        >
          {{ t('visit.hoursTitle') }}
        </h3>
        <OpeningHours labelledby="visit-hours-title" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

// Cierre de la página: las personas de la casa y, al lado, cómo llegar y cuándo.
// La foto respeta el margen de la página en todos los tamaños: es un retrato,
// no un paisaje, y gana con aire alrededor.
.visit {
  padding-block: var(--section-padding);
  background: var(--color-blanco);
}

.visit__inner {
  @include page-container;
  display: grid;
  gap: var(--space-7);

  @include from('lg') {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--space-6);
    align-items: start;
  }
}

.visit__photo {
  aspect-ratio: 4 / 3;

  @include from('md') {
    aspect-ratio: 3 / 2;
  }

  @include from('lg') {
    grid-column: 1 / span 6;
    aspect-ratio: 5 / 4;
    position: sticky;
    top: calc(var(--header-height) + var(--space-6));
  }
}

.visit__main {
  display: grid;
  justify-items: start;

  @include from('lg') {
    grid-column: 8 / span 5;
  }
}

.visit__title {
  @include display-heading(var(--text-display));
}

.visit__address {
  margin-top: var(--space-6);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-style: normal;
  line-height: 1.2;
}

.visit__region {
  margin-top: var(--space-2);
  color: var(--color-piedra-ink);
}

.visit__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.visit__hours-title {
  @include carta-label(var(--text-xl));
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
  color: var(--color-granate);
}

.visit :deep(.opening-hours) {
  max-width: 30rem;
}
</style>
