import type { CodeShowcaseState } from '~/components/ui/CodeShowcase.vue'
import { defaultProjectCodeShowcase } from '~/composables/useDefaultProjectCode'

export const individuelleCodeShowcaseStates: CodeShowcaseState[] = [
  defaultProjectCodeShowcase,
  {
    kind: 'project',
    caption: 'Vom Ablauf bis zur lauffähigen Anwendung.',
    fields: [
      { key: 'ui', value: 'Vue' },
      { key: 'data', value: 'modeled' },
      { key: 'api', value: 'integrated' },
      { key: 'scope', value: 'scoped' },
      { key: 'delivery', value: 'ready' },
    ],
  },
  {
    kind: 'project',
    comment: '// wartbar & suchbar',
    caption: 'Code, der schnell lädt und erweiterbar bleibt.',
    fields: [
      { key: 'ssr', value: 'enabled' },
      { key: 'html', value: 'semantic' },
      { key: 'stack', value: 'per project' },
      { key: 'seo', value: 'readable' },
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