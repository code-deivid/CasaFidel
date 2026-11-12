import { fileURLToPath, URL } from 'node:url'
import { rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { site } from './src/data/site.ts'
import { openingHours, type DayHours, type TimeRange } from './src/data/hours.ts'
import es from './src/i18n/locales/es.ts'

/**
 * Carpetas de public/ que son material de trabajo y NO deben publicarse:
 * - referencias: carta fotografiada, cartel, PNG originales de varios MB.
 * - restaurante: originales de las fotos; se publican sus versiones
 *   optimizadas de public/images/fotos (`npm run images`).
 * Vite copia toda la carpeta public al build; aquí las borramos después.
 */
function excludeWorkingImages(): Plugin {
  return {
    name: 'casa-fidel:excluir-originales',
    apply: 'build',
    closeBundle() {
      for (const folder of ['referencias', 'restaurante']) {
        rmSync(resolve(`dist/images/${folder}`), { recursive: true, force: true })
      }
    },
  }
}

const schemaDays: Record<DayHours['day'], string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

/** Agrupa los días que comparten tramo: un bloque schema.org por tramo distinto. */
function openingHoursSpecification() {
  const groups = new Map<string, { range: TimeRange; days: string[] }>()
  for (const entry of openingHours) {
    for (const range of [entry.lunch, entry.dinner]) {
      if (!range) continue
      const key = `${range.opens}-${range.closes}`
      const group = groups.get(key) ?? { range, days: [] }
      group.days.push(`https://schema.org/${schemaDays[entry.day]}`)
      groups.set(key, group)
    }
  }
  return [...groups.values()].map(({ range, days }) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: days,
    opens: range.opens,
    closes: range.closes,
  }))
}

/** Datos estructurados schema.org/Restaurant, solo con información verificada. */
function restaurantStructuredData(): Plugin {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.name,
    description: es.meta.description,
    foundingDate: String(site.foundingYear),
    servesCuisine: ['Cocina tradicional alistana', 'Carnes a la brasa'],
    hasMenu: site.siteUrl ? `${site.siteUrl}/#carta` : '#carta',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.town,
      addressRegion: site.address.province,
      addressCountry: 'ES',
    },
    telephone: `+34 ${site.phone}`,
    openingHoursSpecification: openingHoursSpecification(),
  }
  if (site.siteUrl) data.url = site.siteUrl

  return {
    name: 'casa-fidel:datos-estructurados',
    transformIndexHtml(html) {
      const script = `<script type="application/ld+json">${JSON.stringify(data)}</script>`
      return html.replace('<!-- datos-estructurados -->', script)
    },
  }
}

export default defineConfig({
  plugins: [vue(), excludeWorkingImages(), restaurantStructuredData()],
  // vue-i18n: solo la Composition API (sin la API heredada), lo que reduce el paquete.
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
