<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { formatPrice, type Locale } from '@/i18n'

// Una línea de carta: nombre a la izquierda, precio a la derecha.
// El precio va en Antonio, la letra condensada de la carta impresa, con el
// formato monetario del idioma activo («12,00 €» o «€12.00»).
// Los colores salen de `currentColor`: funciona sobre claro y sobre granate.
defineProps<{
  name: string
  price: number
  /** El precio es por unidad. */
  perUnit?: boolean
}>()

const { t, locale } = useI18n()
</script>

<template>
  <div class="price-line">
    <span class="price-line__name">{{ name }}</span>
    <span class="price-line__price tabular">
      {{ formatPrice(price, locale as Locale) }}<span
        v-if="perUnit"
        class="price-line__unit"
      > / {{ t('menu.perUnit') }}</span>
    </span>
  </div>
</template>

<style scoped lang="scss">
.price-line {
  display: flex;
  align-items: last baseline;
  justify-content: space-between;
  gap: var(--space-5);
}

.price-line__name {
  min-width: 0;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.35;
}

.price-line__price {
  flex-shrink: 0;
  font-family: var(--font-carta);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.price-line__unit {
  font-family: var(--font-text);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0;
}
</style>
