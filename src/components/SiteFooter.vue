<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { mapsUrl, navigation, phoneHref, site, socialLinks } from '@/data/site'

const { t } = useI18n()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <a
        href="#inicio"
        class="site-footer__brand"
        :aria-label="t('a11y.home')"
      >
        <span
          class="site-footer__monogram"
          aria-hidden="true"
        />
        <span
          class="site-footer__name"
          aria-hidden="true"
        >{{ site.name }}</span>
      </a>

      <p class="site-footer__contact">
        {{ site.address.street }}, {{ site.address.town }} ({{ site.address.province }}) ·
        <a
          :href="mapsUrl"
          target="_blank"
          rel="noopener"
        >Google Maps<span class="visually-hidden"> {{ t('a11y.newTab') }}</span></a>
        ·
        <a
          :href="phoneHref"
          class="tabular"
        >{{ site.phone }}</a>
      </p>

      <nav
        class="site-footer__nav"
        :aria-label="t('nav.footerLabel')"
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

      <div class="site-footer__bottom">
        <p class="site-footer__legal">
          © {{ currentYear }} {{ site.name }} · {{ site.address.town }}, {{ site.address.region }}
        </p>

        <!-- Perfiles oficiales: icono + nombre de la red, en pestaña nueva. -->
        <ul
          class="site-footer__social"
          :aria-label="t('a11y.social')"
        >
          <li
            v-for="link in socialLinks"
            :key="link.network"
          >
            <a
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                v-if="link.network === 'Instagram'"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="3.5"
                  y="3.5"
                  width="17"
                  height="17"
                  rx="4.5"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                />
                <circle
                  cx="17.2"
                  cy="6.8"
                  r="0.9"
                  class="is-filled"
                />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  class="is-filled"
                  d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21z"
                />
              </svg>
              {{ link.network }}<span class="visually-hidden"> {{ t('a11y.newTab') }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

// Pie mínimo: la marca, cómo encontrarnos y el índice. Nada que ya diga la página.
.site-footer {
  padding-block: var(--space-8) var(--space-6);
  background: var(--color-marfil);
  color: var(--color-piedra-ink);
  font-size: var(--text-sm);
}

.site-footer__inner {
  @include page-container;
  display: grid;
  gap: var(--space-5);

  @include from('lg') {
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: var(--space-8);
  }
}

.site-footer__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  justify-self: start;
  color: var(--color-carbon);
  text-decoration: none;
}

.site-footer__monogram {
  width: 1.75rem;
  height: 2.625rem;
  background: var(--color-granate);
  mask: url('/logos/casa-fidel-monograma-refinado.svg') center / contain no-repeat;
}

.site-footer__name {
  font-family: var(--font-display);
  font-size: var(--text-xl);
}

.site-footer a:not(.site-footer__brand) {
  color: var(--color-carbon);
  text-decoration-color: var(--line-strong);
  transition: text-decoration-color var(--duration-ui) ease;

  @include hover {
    text-decoration-color: var(--color-granate);
  }
}

.site-footer__nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
}

.site-footer__nav a {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
}

// Última línea: créditos a la izquierda y redes a la derecha, tras un filete.
.site-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3) var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--line);

  @include from('lg') {
    grid-column: 1 / -1;
  }
}

.site-footer__legal {
  font-size: var(--text-xs);
}

.site-footer__social {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);

  a {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 2.75rem;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: none;
    stroke: var(--color-granate);
    stroke-width: 1.5;
    stroke-linejoin: round;
  }

  .is-filled {
    fill: var(--color-granate);
    stroke: none;
  }
}
</style>
