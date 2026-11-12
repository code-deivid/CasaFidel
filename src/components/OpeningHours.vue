<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { openingHours, type TimeRange } from '@/data/hours'

// Tabla de horario: día, comida y cena. Los datos salen de src/data/hours.ts;
// aquí solo se traducen los días y «Cerrado».
defineProps<{
  /** Id del título que nombra la tabla. */
  labelledby: string
}>()

const { t } = useI18n()

function formatRange(range: TimeRange): string {
  return `${range.opens}–${range.closes}`
}
</script>

<template>
  <table
    class="opening-hours"
    :aria-labelledby="labelledby"
  >
    <thead>
      <tr>
        <th scope="col">
          <span class="visually-hidden">{{ t('visit.day') }}</span>
        </th>
        <th scope="col">
          {{ t('visit.lunch') }}
        </th>
        <th scope="col">
          {{ t('visit.dinner') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="entry in openingHours"
        :key="entry.day"
        :class="{ 'is-closed': !entry.lunch && !entry.dinner }"
      >
        <th scope="row">
          {{ t(`visit.days.${entry.day}`) }}
        </th>
        <!-- Cerrado todo el día: una sola celda que ocupa comida y cena. -->
        <td
          v-if="!entry.lunch && !entry.dinner"
          colspan="2"
        >
          {{ t('visit.closed') }}
        </td>
        <template v-else>
          <td :class="{ 'is-closed': !entry.lunch }">
            {{ entry.lunch ? formatRange(entry.lunch) : t('visit.closed') }}
          </td>
          <td :class="{ 'is-closed': !entry.dinner }">
            {{ entry.dinner ? formatRange(entry.dinner) : t('visit.closed') }}
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

// Como una línea de carta: el día en texto, las horas en Antonio con cifras
// tabulares para que las columnas cuadren. Filetes de 1px entre días.
.opening-hours {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-base);

  th,
  td {
    padding-block: var(--space-3);
    text-align: start;
    vertical-align: baseline;
  }

  thead th {
    @include carta-label(var(--text-sm));
    padding-top: 0;
    color: var(--color-granate);
  }

  tbody tr {
    border-top: 1px solid var(--line);
  }

  tbody th {
    padding-inline-end: var(--space-4);
    font-weight: 500;
  }

  td {
    font-family: var(--font-carta);
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums lining-nums;
    white-space: nowrap;

    & + td {
      padding-inline-start: var(--space-4);
    }
  }

  // «Cerrado» en la voz de texto y en gris de tinta: se lee como ausencia.
  .is-closed,
  tr.is-closed td {
    color: var(--color-piedra-ink);
    font-family: var(--font-text);
    font-size: var(--text-sm);
    font-weight: 400;
    letter-spacing: 0;
  }
}
</style>
