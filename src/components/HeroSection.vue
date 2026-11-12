<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionLink from './ui/ActionLink.vue'
import ResponsiveImage from './ui/ResponsiveImage.vue'
import { images } from '@/data/images'
import { phoneHref, site } from '@/data/site'

const { t } = useI18n()

// El lema va en dos líneas fijas y cada una entra por separado.
const taglineLines = computed(() => [t('hero.taglineFirst'), t('hero.taglineSecond')])
</script>

<template>
  <section
    id="inicio"
    class="hero"
    aria-labelledby="hero-title"
  >
    <div class="hero__inner">
      <h1
        id="hero-title"
        class="hero__title"
      >
        <span class="hero__name">{{ t('hero.name') }}<span class="visually-hidden">: </span></span>
        <span
          v-for="(line, index) in taglineLines"
          :key="index"
          class="hero__line"
          :style="{ '--i': index }"
        >{{ line }} </span>
      </h1>

      <div class="hero__intro">
        <p class="hero__summary">
          {{ t('hero.summary') }}
        </p>

        <div class="hero__actions">
          <!-- Reservar es llamar: la acción principal. La carta, secundaria. -->
          <ActionLink :href="phoneHref">
            {{ t('actions.book') }} · <span class="tabular">{{ site.phone }}</span>
          </ActionLink>
          <ActionLink
            href="#carta"
            variant="outline"
          >
            {{ t('actions.seeMenu') }}
          </ActionLink>
        </div>

        <p class="hero__place">
          {{ site.address.street }} · {{ site.address.town }}, {{ site.address.region }}
        </p>
      </div>

      <div class="hero__photo">
        <ResponsiveImage
          :image="images.facade"
          :alt="t('images.facade')"
          sizes="(min-width: 64rem) 66vw, 100vw"
          priority
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

// Portada editorial: el titular manda arriba, a todo lo ancho; debajo, la
// situación y la acción en una columna estrecha y la fotografía de la fachada,
// con el cartel real de la casa. No es el hero partido de plantilla: el texto
// no compite en altura con la foto, la presenta.
// La fachada solo va a sangre en móvil, donde el margen lateral se comería el
// cartel; desde tableta respeta el margen de la página y respira.
.hero {
  padding-top: clamp(var(--space-7), 2rem + 4vw, var(--space-9));
}

.hero__inner {
  @include page-container;
  display: grid;
  gap: var(--space-6);

  @include from('lg') {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--space-6);
    row-gap: var(--space-7);
  }
}

.hero__title {
  @include display-heading(var(--text-display));

  @include from('lg') {
    grid-column: 1 / span 11;
  }
}

.hero__line {
  display: block;
}

// El nombre del restaurante abre el titular: es lo primero que se lee tras el
// monograma de la cabecera. No es un rótulo: va en Gloock, en caja baja y en
// el granate del cartel de la fachada.
.hero__name {
  display: block;
  margin-bottom: var(--space-4);
  color: var(--color-granate);
  font-size: var(--text-2xl);
  line-height: 1.1;
  letter-spacing: 0;
}

.hero__intro {
  display: grid;
  align-content: start;
  gap: var(--space-6);

  // En escritorio la columna mide lo mismo que la foto: arriba la acción,
  // abajo la dirección, alineada con el pie de la fotografía.
  @include from('lg') {
    grid-column: 1 / span 4;
    grid-template-rows: auto auto 1fr;
    padding-top: var(--space-2);
  }
}

.hero__place {
  color: var(--color-piedra-ink);
  font-size: var(--text-sm);

  @include from('lg') {
    align-self: end;
    padding-top: var(--space-4);
    border-top: 1px solid var(--line);
  }
}

.hero__summary {
  max-width: 30ch;
  color: var(--color-piedra-ink);
  font-size: var(--text-lg);
  line-height: 1.5;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}

.hero__photo {
  aspect-ratio: 4 / 5;
  margin-inline: calc(var(--page-gutter) * -1);

  @include from('md') {
    aspect-ratio: 16 / 10;
    margin-inline: 0;
  }

  @include from('lg') {
    grid-column: 5 / -1;
  }
}

// Entrada única de la página: el titular sube por líneas y la foto se
// descubre de abajo arriba, como un telón que sube. Después, nada se mueve solo.
@keyframes line-in {
  from {
    opacity: 0;
    transform: translateY(0.35em);
  }
}

@keyframes photo-rise {
  from {
    clip-path: inset(100% 0 0 0);
  }

  to {
    clip-path: inset(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}

.hero__line {
  animation: line-in 800ms var(--ease-out) both;
  animation-delay: calc(80ms + var(--i, 0) * 90ms);
}

.hero__name {
  animation: fade-in 500ms var(--ease-out) both;
}

.hero__intro {
  animation: fade-in 600ms var(--ease-out) 320ms both;
}

.hero__photo {
  animation: photo-rise var(--duration-reveal) var(--ease-out) 160ms both;
}

@media (prefers-reduced-motion: reduce) {
  .hero__line,
  .hero__name,
  .hero__intro,
  .hero__photo {
    animation: fade-in 400ms ease both;
  }
}
</style>
