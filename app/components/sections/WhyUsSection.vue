<script setup lang="ts">
import type { CodeShowcaseState } from '~/components/ui/CodeShowcase.vue'

const reasons = [
  {
    title: 'Höchste Qualität',
    paragraphs: [
      'Verständliche Kommunikation, zuverlässige Umsetzung und ein tiefes Verständnis für den deutschen Markt und seine Anforderungen.',
      'Sie bekommen Antworten in klarer Sprache, realistische Zeitpläne und eine Umsetzung, die halbherzige Zwischenstände vermeidet. Rechtliche Erwartungen wie Datenschutz bei Formularen und erreichbares Impressum behandeln wir als selbstverständlichen Bestandteil, nicht als Nacharbeit.',
      'Qualität messen wir an klaren Kriterien: fehlerarme Releases, nachvollziehbare Architektur und Seiten, die auch ohne JavaScript sinnvoll lesbar bleiben. Reviews und Abnahmen dokumentieren wir, damit Sie später nachvollziehen können, was geliefert wurde.',
    ],
  },
  {
    title: 'Moderne Architektur',
    paragraphs: [
      'Sauberer, wartbarer Code auf Basis aktueller Best Practices: TypeScript, komponentenbasiert und zukunftssicher.',
      'Monolithischer Spaghetti-Code oder undokumentierte Einzellösungen sind bei uns die Ausnahme. Stattdessen setzen wir auf wiederverwendbare Bausteine, Versionskontrolle und Deployments, die Sie später erweitern oder an ein anderes Team übergeben können.',
      'Framework-Entscheidungen dokumentieren wir kurz, damit Nachfolger verstehen, warum welche Technik gewählt wurde, welche Module erlaubt sind und wie Daten fließen. API-Schnittstellen und Umgebungen (Staging, Produktion) sind von Anfang an klar getrennt. So sinkt die Abhängigkeit von einer einzelnen Person.',
    ],
  },
  {
    title: 'Performance-first',
    paragraphs: [
      'Jede Millisekunde zählt. Wir optimieren für Core Web Vitals, schnelle Ladezeiten und ein herausragendes Nutzerlebnis.',
      'Serverseitig ausgeliefertes HTML, schlanke Assets und bewusster Einsatz von JavaScript sorgen dafür, dass Seiten auch auf Mobilgeräten schnell starten. Das hilft bei Conversions genauso wie bei organischer Sichtbarkeit, messbar, nicht nur behauptet.',
      'Vor dem Launch messen wir Ladezeit und Stabilität; bei Bedarf schlagen wir konkrete Optimierungen vor, statt nur „schnell genug“ zu behaupten. Bilder, Schriften und Drittanbieter-Skripte prüfen wir gezielt auf unnötiges Gewicht.',
    ],
  },
  {
    title: 'Langfristige Partnerschaft',
    paragraphs: [
      'Wir denken über den Launch hinaus, mit skalierbarer Architektur, dokumentiertem Code und Support, wenn Sie ihn brauchen.',
      'Viele Projekte enden nicht mit Go-Live: neue Features, Integrationen und Sicherheitsupdates kommen dazu. Wir strukturieren Software so, dass spätere Iterationen günstiger sind als ein kompletter Neustart. Sie behalten denselben Ansprechpartner.',
    ],
  },
]

const overviewExtra =
  'Ob Mittelstand oder wachsendes Produkt: wir liefern die Kombination aus Strategie, Design und Engineering, die in der Angebotsphase versprochen und beim Go-Live nachweisbar ist.'

const codeStates: CodeShowcaseState[] = [
  {
    kind: 'project',
    caption: 'So sieht Exzellenz aus: sauberer Code, klare Struktur, messbare Ergebnisse.',
    fields: [
      { key: 'framework', value: 'Nuxt.js' },
      { key: 'language', value: 'TypeScript' },
      { key: 'performance', value: '100%' },
      { key: 'seo', value: 'optimized' },
      { key: 'market', value: 'Deutschland' },
    ],
  },
  {
    kind: 'project',
    caption: 'Qualität, die man prüfen und abnehmen kann.',
    fields: [
      { key: 'tests', value: 'passing' },
      { key: 'impressum', value: 'linked' },
      { key: 'dsgvo', value: 'checked' },
      { key: 'reviews', value: 'documented' },
      { key: 'market', value: 'Deutschland' },
    ],
  },
  {
    kind: 'project',
    caption: 'Architektur, die Ihr Team später erweitern kann.',
    comment: '// kein Spaghetti, nur Bausteine',
    fields: [
      { key: 'structure', value: 'components/' },
      { key: 'staging', value: 'true' },
      { key: 'docs', value: 'README' },
      { key: 'git', value: 'main + PRs' },
      { key: 'handover', value: 'ready' },
    ],
  },
  {
    kind: 'project',
    caption: 'Schnell geladen, messbar, nicht nur behauptet.',
    fields: [
      { key: 'lcp', value: '< 2.5s' },
      { key: 'cwv', value: 'green' },
      { key: 'ssr', value: 'enabled' },
      { key: 'assets', value: 'lean' },
      { key: 'js', value: 'minimal' },
    ],
  },
  {
    kind: 'project',
    caption: 'Software, die mit Ihnen mitwächst.',
    fields: [
      { key: 'support', value: 'same contact' },
      { key: 'roadmap', value: '[v1, v2, …]' },
      { key: 'updates', value: 'planned' },
      { key: 'techDebt', value: 'low' },
      { key: 'partner', value: 'long-term' },
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

const activeStep = ref(0)
const introRef = ref<HTMLElement | null>(null)
const reasonRefs = ref<(HTMLElement | null)[]>([])
const goLiveRef = ref<HTMLElement | null>(null)

const currentCode = computed(() => codeStates[activeStep.value] ?? codeStates[0])

const trafficRedOn = computed(() => activeStep.value >= 1)
const trafficYellowOn = computed(() => activeStep.value >= 2)
const trafficGreenOn = computed(() => activeStep.value >= 5)

function setReasonRef(el: unknown, index: number) {
  if (el instanceof HTMLElement) {
    reasonRefs.value[index] = el
  }
}

function pickActiveStep() {
  if (typeof window === 'undefined' || !window.matchMedia('(min-width: 1024px)').matches) {
    return
  }

  const anchor = window.innerHeight * 0.42

  const introRect = introRef.value?.getBoundingClientRect()
  const firstReasonRect = reasonRefs.value[0]?.getBoundingClientRect()
  const introStillDominant = introRect && introRect.bottom > anchor - 48
  const firstReasonNotInFocus = firstReasonRect && firstReasonRect.top > anchor + 140

  if (introStillDominant || firstReasonNotInFocus) {
    activeStep.value = 0
    return
  }

  const lastReason = reasonRefs.value[reasonRefs.value.length - 1]
  if (lastReason && lastReason.getBoundingClientRect().bottom < anchor) {
    activeStep.value = 5
    return
  }

  if (goLiveRef.value && goLiveRef.value.getBoundingClientRect().top < anchor + 120) {
    activeStep.value = 5
    return
  }

  let bestIndex = -1
  let bestDist = Infinity

  reasonRefs.value.forEach((el, index) => {
    if (!el) {
      return
    }
    const rect = el.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      return
    }
    if (rect.top > anchor + 48) {
      return
    }
    const center = (rect.top + rect.bottom) / 2
    const dist = Math.abs(center - anchor)
    if (dist < bestDist) {
      bestDist = dist
      bestIndex = index
    }
  })

  if (bestIndex >= 0) {
    activeStep.value = bestIndex + 1
    return
  }

  activeStep.value = 1
}

let rafId = 0
function onScrollOrResize() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(pickActiveStep)
}

onMounted(() => {
  pickActiveStep()
  window.addEventListener('scroll', onScrollOrResize, { passive: true })
  window.addEventListener('resize', onScrollOrResize, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScrollOrResize)
  window.removeEventListener('resize', onScrollOrResize)
})
</script>

<template>
  <section id="warum" class="section-padding bg-black text-foreground">
    <div class="container-site">
      <div class="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <div ref="introRef">
            <UiSectionHeading
              label="Warum Signal Software"
              title="Qualität, die man sieht und misst"
              description="Signal Software liefert Websoftware und Landingpages, deren Qualität Sie messen können: schnelle Ladezeiten, sauberer TypeScript-Code, SEO-taugliches HTML und rechtssichere Grundlagen für den deutschen Markt. Wir verbinden designstarke Oberflächen mit Engineering, das in Produktion hält, und bleiben nach dem Launch oft Ihr Ansprechpartner für Wartung und Weiterentwicklung."
            />

            <p class="mt-6 text-sm leading-relaxed text-muted-foreground">
              {{ overviewExtra }}
            </p>
          </div>

          <ol class="mt-8 list-none space-y-8">
            <li
              v-for="(reason, index) in reasons"
              :key="reason.title"
              :ref="(el) => setReasonRef(el, index)"
              class="flex gap-4"
            >
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-foreground"
                aria-hidden="true"
              >
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="font-semibold text-foreground">
                  {{ reason.title }}
                </h3>
                <p
                  v-for="(paragraph, i) in reason.paragraphs"
                  :key="i"
                  class="mt-2 text-sm leading-relaxed text-muted-foreground"
                >
                  {{ paragraph }}
                </p>
              </div>
            </li>
          </ol>

          <div
            ref="goLiveRef"
            class="pointer-events-none h-px w-full"
            aria-hidden="true"
          />
        </div>

        <Transition name="why-code" mode="out-in">
          <UiCodeShowcase
            :key="activeStep"
            :state="currentCode"
            :traffic-red="trafficRedOn"
            :traffic-yellow="trafficYellowOn"
            :traffic-green="trafficGreenOn"
          />
        </Transition>
      </div>

      <SectionsWhyUsComparisonTable />
    </div>
  </section>
</template>

<style scoped>
.why-code-enter-active,
.why-code-leave-active {
  transition: opacity 0.2s ease;
}

.why-code-enter-from,
.why-code-leave-to {
  opacity: 0;
}
</style>