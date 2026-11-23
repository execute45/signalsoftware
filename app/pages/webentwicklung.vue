<script setup lang="ts">
import { webentwicklungCodeShowcaseStates } from '~/composables/useWebentwicklungCodeStates'

definePageMeta({
  layout: 'site',
  darkHero: true,
})

usePageSeo({
  title: 'Webentwicklung mit Nuxt.js | Signal Software',
  description:
    'Webentwicklung für Unternehmen in Deutschland. Signal Software baut Webanwendungen und Marketingseiten mit Nuxt.js, schnell und als fertiges HTML ausgeliefert.',
  path: '/webentwicklung',
})

const sections = [
  {
    heading: 'Was wir bauen',
    paragraphs: [
      'Webentwicklung bei Signal Software heißt Webanwendungen und Seiten, die ein konkretes Geschäft tragen: Portale, Tools und Kampagnenseiten. Wir setzen keine Baukasten-Website aus einer Vorlage.',
      'Der Stack ist Nuxt.js. Vue bleibt im Browser für die Bedienung. Den ersten Inhalt liefert der Server als HTML – in der Praxis 100 % des sichtbaren Texts beim ersten Request, auch ohne nachgeladenes JavaScript.',
    ],
  },
  {
    heading: 'Was Nuxt dabei ändert',
    paragraphs: [
      'Nuxt ist ein Framework auf Vue. Es rendert Seiten auf dem Server und kann sie statisch erzeugen. Für eine Firmenwebsite heißt das: kurze Ladezeit und ein Dokument, das eine Suchmaschine ohne Umweg lesen kann.',
      'Das ist die Technik hinter den Seiten, nicht das Angebot selbst. Wenn Sie eine Anwendung brauchen, die zu einem Ablauf passt, gehört das zur individuellen Softwareentwicklung. Wenn eine Kampagne eine einzelne Seite braucht, bauen wir die Landingpage.',
    ],
  },
  {
    heading: 'Für wen das passt',
    paragraphs: [
      'Für Unternehmen, die eine eigene Webanwendung oder eine schnelle Marketingseite wollen und den Betrieb nicht an einen Website-Baukasten binden. Weniger passend, wenn Sie nur ein Theme anpassen und keine eigene Logik brauchen.',
    ],
  },
]
</script>

<template>
  <SectionsServiceArticle
    eyebrow="Webentwicklung"
    title="Webentwicklung mit Nuxt.js"
    lead="Wir entwickeln Webanwendungen und Seiten, die der Server als HTML ausliefert. Schnell im Browser, lesbar für die Suche."
    split-first-section
    :code-showcase-states="webentwicklungCodeShowcaseStates"
    :sections="sections"
  />
</template>
