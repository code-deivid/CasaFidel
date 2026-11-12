<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ActionLink from './ui/ActionLink.vue'
import { imageFallbackSrc, imageSrcSet, images } from '@/data/images'
import { tioPedroUrl } from '@/data/site'

const logo = images.tioPedroLogo

const { t } = useI18n()
</script>

<template>
  <!-- Texto basado en embutidostiopedro.es: «Carnicería Tío Pedro y restaurante Casa
       Fidel, ubicados en San Vitero (Zamora), herederos de una de las empresas
       pioneras en el sector hostelero y la elaboración de embutidos en la comarca
       de Aliste». No afirmar la dirección exacta de la carnicería. -->
  <section
    id="tio-pedro"
    class="tio-pedro"
    aria-labelledby="tio-pedro-title"
  >
    <div class="tio-pedro__inner">
      <div class="tio-pedro__heading">
        <h2
          id="tio-pedro-title"
          class="tio-pedro__title"
        >
          {{ t('tioPedro.title') }}
        </h2>

        <!-- El logotipo, pequeño y sobre el mismo suelo: una firma, no un anuncio.
             No es un enlace; el único enlace del bloque es «Descubrir Tío Pedro». -->
        <img
          class="tio-pedro__logo"
          :src="imageFallbackSrc(logo)"
          :srcset="imageSrcSet(logo)"
          sizes="(min-width: 64rem) 11rem, 9rem"
          :alt="t('images.tioPedroLogo')"
          :width="logo.width"
          :height="logo.height"
          loading="lazy"
          decoding="async"
        >
      </div>

      <div class="tio-pedro__text">
        <p class="tio-pedro__lead">
          {{ t('tioPedro.body') }}
        </p>
        <p>{{ t('tioPedro.products') }}</p>
        <ActionLink
          :href="tioPedroUrl"
          variant="outline"
          external
        >
          {{ t('tioPedro.link') }}
        </ActionLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

// Una continuación de la historia, no un anuncio: sobre el suelo general y sin
// color de campo. El logotipo de Tío Pedro firma el bloque bajo el título, a
// tamaño de sello, en WebP con fondo transparente (sin recuadro).
.tio-pedro {
  padding-block: var(--section-padding);
  background: var(--color-hueso);
}

.tio-pedro__inner {
  @include page-container;
  display: grid;
  gap: var(--space-6);

  @include from('lg') {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--space-6);
  }
}

.tio-pedro__heading {
  display: grid;
  justify-items: start;
  align-content: start;
  gap: var(--space-6);

  @include from('lg') {
    grid-column: 1 / span 5;
    gap: var(--space-7);
  }
}

.tio-pedro__title {
  @include display-heading;
}

.tio-pedro__logo {
  display: block;
  width: 9rem;
  height: auto;

  @include from('lg') {
    width: 11rem;
  }
}

.tio-pedro__text {
  display: grid;
  justify-items: start;
  gap: var(--space-5);
  max-width: 38rem;
  line-height: 1.65;

  @include from('lg') {
    grid-column: 7 / span 6;
    padding-top: var(--space-2);
  }

  :deep(.action-link) {
    margin-top: var(--space-2);
  }
}

.tio-pedro__lead {
  color: var(--color-granate);
  font-size: var(--text-xl);
  line-height: 1.4;
}
</style>
