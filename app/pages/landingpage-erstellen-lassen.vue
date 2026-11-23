<script setup lang="ts">
import { landingCodeShowcaseStates } from '~/composables/useLandingCodeStates'

definePageMeta({
  layout: 'site',
  darkHero: true,
})

usePageSeo({
  title: 'Landingpage erstellen lassen | Signal Software',
  description:
    'Landingpage erstellen lassen bei Signal Software: eine Seite, ein Angebot, ein Formular. Schnell geladen, für Kampagnen in Deutschland.',
  path: '/landingpage-erstellen-lassen',
})

const sections = [
  {
    heading: 'Wofür die Seite da ist',
    paragraphs: [
      'Eine Landingpage hat eine Aufgabe: Besucher aus einer Kampagne oder einem konkreten Angebot sollen anfragen. Sie erklärt nicht die ganze Firma. Sie beantwortet die Frage, mit der jemand auf genau diese Seite kommt.',
    ],
  },
  {
    heading: 'Aufbau, der eine Anfrage trägt',
    paragraphs: [
      'Oben steht das Angebot in einem Satz und der nächste Schritt. Darunter der Nachweis, dass Sie die Arbeit schon gemacht haben, dann der Ablauf, dann das Formular. Impressum und Datenschutz bleiben erreichbar, weil eine gewerbliche Seite in Deutschland sie braucht.',
    ],
    items: [
      'Überschrift, die das Ergebnis nennt, nicht die Technologie',
      'Kurzer Beleg: für wen die Seite gedacht ist und was sie nicht abdeckt',
      'Ablauf in wenigen Schritten, damit die Anfrage kein Blindflug ist',
      'Ein Formular, nicht fünf gleichwertige Buttons',
    ],
  },
  {
    heading: 'Umsetzung',
    paragraphs: [
      'Wir bauen die Seite technisch schlank und serverseitig ausgeliefert – typischerweise in 2–6 Wochen live. Der Preis hängt vom Umfang ab, nicht von einer Pauschale, die wir hier schätzen. Im Gespräch klären wir Angebot, Belege und das Formular, danach nennen wir den Aufwand.',
    ],
  },
]
</script>

<template>
  <SectionsServiceArticle
    eyebrow="Landingpages"
    title="Landingpage erstellen lassen"
    lead="Eine Seite für ein Angebot. Besucher sehen, was sie bekommen, und können direkt anfragen."
    split-first-section
    :code-showcase-states="landingCodeShowcaseStates"
    :sections="sections"
  />
</template>
