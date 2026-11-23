import type { CodeShowcaseState } from '~/components/ui/CodeShowcase.vue'
import { defaultProjectCodeShowcase } from '~/composables/useDefaultProjectCode'

export const landingCodeShowcaseStates: CodeShowcaseState[] = [
  defaultProjectCodeShowcase,
  {
    kind: 'project',
    caption: 'Eine Seite, ein Angebot, ein klarer nächster Schritt.',
    fields: [
      { key: 'goal', value: 'conversion' },
      { key: 'offer', value: 'above fold' },
      { key: 'proof', value: 'visible' },
      { key: 'steps', value: 'short' },
      { key: 'form', value: 'one' },
    ],
  },
  {
    kind: 'project',
    comment: '// schlank ausgeliefert',
    caption: 'Schnell geladen, rechtssicher erreichbar.',
    fields: [
      { key: 'ssr', value: 'enabled' },
      { key: 'impressum', value: 'linked' },
      { key: 'privacy', value: 'linked' },
      { key: 'cwv', value: 'green' },
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