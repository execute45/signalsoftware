<script setup lang="ts">
import { individuelleCodeShowcaseStates } from '~/composables/useIndividuelleCodeStates'

definePageMeta({
  layout: 'site',
  darkHero: true,
})

usePageSeo({
  title: 'Individuelle Softwareentwicklung | Signal Software',
  description:
    'Individuelle Softwareentwicklung für Unternehmen in Deutschland. Signal Software baut Webanwendungen, die zu Ihren Prozessen passen.',
  path: '/individuelle-softwareentwicklung',
})

const sections = [
  {
    heading: 'Wann Standardsoftware nicht reicht',
    paragraphs: [
      'Individuelle Softwareentwicklung heißt: die Anwendung bildet Ihren Ablauf ab, nicht umgekehrt. Das lohnt sich, wenn ein fertiges Tool zentrale Schritte auslässt oder Ihr Team die Arbeit in Tabellen und E-Mails um das Tool herum erledigt.',
      'Signal Software entwickelt diese Anwendungen als Webprodukt. Sie erreichen Mitarbeiter und Kunden im Browser – 0 lokale Installationen auf den Rechnern Ihrer Nutzer.',
    ],
  },
  {
    heading: 'Was eine Softwareagentur dabei übernimmt',
    paragraphs: [
      'Sie beschreiben den Ablauf und das Ergebnis. Wir schneiden den Umfang, bauen die Anwendung und liefern sie lauffähig aus. Dazu gehören Oberfläche, Datenhaltung und die Stellen, an denen andere Systeme angebunden werden müssen.',
    ],
    items: [
      'Webanwendungen für interne Abläufe und Kundenportale',
      'Landingpages, wenn das Produkt zuerst eine klare Anfrage-Seite braucht',
      'Weiterentwicklung, nachdem die erste Version im Einsatz ist',
    ],
  },
  {
    heading: 'Technik',
    paragraphs: [
      'Für Webanwendungen setzen wir auf wartbaren Code und serverseitig ausgeliefertes HTML, damit Seiten schnell laden und für Suchmaschinen lesbar bleiben. Den konkreten Stack wählen wir zum Projekt; dieselbe Basis trägt, wenn aus dem Produkt später weitere Bereiche werden.',
    ],
  },
]
</script>

<template>
  <SectionsServiceArticle
    eyebrow="Softwareentwicklung"
    title="Individuelle Softwareentwicklung"
    lead="Wir bauen Webanwendungen für Unternehmen, deren Arbeit in keiner Standardsoftware vollständig abgebildet ist."
    split-first-section
    :code-showcase-states="individuelleCodeShowcaseStates"
    :sections="sections"
  />
</template>
