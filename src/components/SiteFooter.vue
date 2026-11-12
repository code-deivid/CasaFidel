<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { mapsUrl, navigation, phoneHref, site } from '@/data/site'

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

      <p class="site-footer__legal">
        © {{ currentYear }} {{ site.name }} · {{ site.address.town }}, {{ site.address.region }}
      </p>
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

.site-footer__legal {
  padding-top: var(--space-5);
  border-top: 1px solid var(--line);
  font-size: var(--text-xs);

  @include from('lg') {
    grid-column: 1 / -1;
  }
}
</style>
