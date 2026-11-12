<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import HistorySection from './components/HistorySection.vue'
import MenuSection from './components/MenuSection.vue'
import TioPedroSection from './components/TioPedroSection.vue'
import VisitSection from './components/VisitSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const { t } = useI18n()
</script>

<template>
  <a
    href="#contenido"
    class="skip-link"
  >{{ t('a11y.skipLink') }}</a>
  <div
    id="inicio-pagina"
    class="top-sentinel"
    aria-hidden="true"
  />
  <SiteHeader />
  <main
    id="contenido"
    tabindex="-1"
  >
    <HeroSection />
    <HistorySection />
    <MenuSection />
    <TioPedroSection />
    <VisitSection />
  </main>
  <SiteFooter />
</template>

<style scoped lang="scss">
.skip-link {
  position: fixed;
  z-index: 20;
  top: var(--space-2);
  left: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--color-carbon);
  color: var(--color-hueso);
  font-weight: 600;
  transform: translateY(-200%);

  &:focus {
    transform: none;
  }
}

// Marca el principio de la página para la cabecera (ver SiteHeader.vue).
.top-sentinel {
  position: absolute;
  top: 0;
  width: 1px;
  height: 1px;
}

main:focus {
  outline: none;
}
</style>
