<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PriceLine from './ui/PriceLine.vue'
import type { MenuCategory } from '@/data/menu'

defineProps<{
  category: MenuCategory
}>()

const { t } = useI18n()

const isDevelopment = import.meta.env.DEV
</script>

<template>
  <section
    :id="`carta-${category.id}`"
    class="menu-category"
    :aria-labelledby="`titulo-${category.id}`"
  >
    <h3
      :id="`titulo-${category.id}`"
      class="menu-category__title"
    >
      {{ t(`menu.categories.${category.id}`) }}
    </h3>

    <ul class="menu-category__items">
      <li
        v-for="item in category.items"
        :key="item.id"
        class="menu-item"
      >
        <PriceLine
          :name="t(`menu.dishes.${item.id}.name`)"
          :price="item.price"
          :per-unit="item.perUnit"
        />
        <p
          v-if="item.hasDescription"
          class="menu-item__description"
        >
          {{ t(`menu.dishes.${item.id}.description`) }}
        </p>
        <p
          v-if="isDevelopment && item.reviewNote"
          class="menu-item__review"
        >
          Revisar: {{ item.reviewNote }}
        </p>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

// Títulos como en la carta impresa: mayúsculas condensadas, aquí en granate.
.menu-category__title {
  @include carta-label(var(--text-2xl));
  color: var(--color-granate);
}

.menu-category__items {
  display: grid;
  margin-top: var(--space-4);
}

.menu-item {
  padding-block: var(--space-4);
  border-top: 1px solid var(--line);
}

.menu-item__description {
  margin-top: var(--space-1);
  max-width: 48ch;
  color: var(--color-piedra-ink);
  font-size: var(--text-sm);
  line-height: 1.45;
}

.menu-item__review {
  margin-top: var(--space-2);
  padding: var(--space-1) var(--space-2);
  border: 1px dashed var(--color-granate);
  color: var(--color-granate);
  font-size: var(--text-xs);
}
</style>
