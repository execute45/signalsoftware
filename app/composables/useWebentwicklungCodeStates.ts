import type { CodeShowcaseState } from '~/components/ui/CodeShowcase.vue'
import { defaultProjectCodeShowcase } from '~/composables/useDefaultProjectCode'

export const webentwicklungCodeShowcaseStates: CodeShowcaseState[] = [
  defaultProjectCodeShowcase,
  {
    kind: 'project',
    caption: 'Nuxt liefert HTML vom Server, Vue im Browser.',
    fields: [
      { key: 'framework', value: 'Nuxt.js' },
      { key: 'render', value: 'SSR' },
      { key: 'html', value: 'complete' },
      { key: 'vue', value: 'interactive' },
      { key: 'seo', value: 'readable' },
    ],
  },
  {
    kind: 'project',
    comment: '// keine Baukasten-Vorlage',
    caption: 'Eigene Logik statt Theme-Anpassung.',
    fields: [
      { key: 'product', value: 'custom' },
      { key: 'portal', value: 'optional' },
      { key: 'campaign', value: 'optional' },
      { key: 'ops', value: 'yours' },
      { key: 'market', value: 'Deutschland' },
    ],
  },
  {
    kind: 'terminal',
    caption: 'Nächster Schritt: Ihr Projekt live bringen.',
    lines: [
      { text: '$ npm run build' },
      { text: '✓ built in 12s' },
      { text: '$ deploy signalsoftware.de' },
      { text: '✓ Go Live 🚀', accent: true },
    ],
  },
]