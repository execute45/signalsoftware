import type { CodeShowcaseState } from '~/components/ui/CodeShowcase.vue'

export const defaultProjectCodeShowcase: CodeShowcaseState = {
  kind: 'project',
  caption: 'So sieht Exzellenz aus: sauberer Code, klare Struktur, messbare Ergebnisse.',
  fields: [
    { key: 'framework', value: 'Nuxt.js' },
    { key: 'language', value: 'TypeScript' },
    { key: 'performance', value: '100%' },
    { key: 'seo', value: 'optimized' },
    { key: 'market', value: 'Deutschland' },
  ],
}