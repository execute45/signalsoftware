<script setup lang="ts">
const faqs = [
  {
    question: 'Was kostet individuelle Softwareentwicklung bei Signal Software?',
    answer:
      'Der Preis hängt vom Umfang ab: Funktionen, Integrationen, Rollen und Zeitplan. Nach einem kurzen Erstgespräch nennen wir einen klaren Aufwand statt einer undifferenzierten Pauschale.\n\nSo zahlen Sie für das, was Ihr Ablauf wirklich braucht, nicht für Module, die Sie nie nutzen. Grobe Größenordnungen sprechen wir nach dem Scoping an; bis dahin ist die Beratung unverbindlich (0 € für das Erstgespräch). Reine Pflege kleiner Bestandssites kalkulieren wir separat von Neuentwicklungen.\n\nFestpreis oder Zeit und Material sind beides möglich, abhängig davon, wie fest der Scope bereits ist.',
  },
  {
    question: 'Wie läuft die Zusammenarbeit bei Signal Software?',
    answer:
      'Sie beschreiben Ziel und Ablauf. Wir schneiden den Umfang, liefern in kurzen Iterationen und halten Sie über Fortschritt und Entscheidungen auf dem Laufenden.\n\nAm Ende erhalten Sie lauffähige Software, dokumentierten Code und einen klaren nächsten Schritt. Kommunikation läuft pragmatisch per E-Mail, Call oder Ticket, wie es zu Ihrem Team passt. Entscheidungen und Prioritäten dokumentieren wir kurz, damit nichts in Einzelchats verloren geht.\n\nSie sehen regelmäßig lauffähige Zwischenstände, nicht nur monatelange Stille mit einer Slideshow am Ende.',
  },
  {
    question: 'Kann Signal Software eine bestehende Website oder App übernehmen und weiterbauen?',
    answer:
      'Ja. Wir prüfen Code, Hosting, Abhängigkeiten und offene Risiken, dann planen wir die nächsten Schritte.\n\nOb Bugfixes, neue Features oder ein schrittweiser Umbau: Sie behalten die Kontrolle über Prioritäten und Budget, ohne bei Null starten zu müssen. Technische Schulden benennen wir offen, bevor wir versprechen. Ein kurzes Code-Audit vor dem Start spart spätere Überraschungen. Hosting und Domain können oft beim bisherigen Anbieter bleiben.\n\nAuch Nuxt- oder Vue-Projekte anderer Agenturen können wir übernehmen, wenn der Code zugänglich und rechtlich geklärt ist.',
  },
  {
    question: 'Wie lange dauert es, eine Landingpage oder individuelle Software erstellen zu lassen bei Signal Software?',
    answer:
      'Eine fokussierte Landingpage ist oft in 2–6 Wochen live, abhängig von Inhalten und Freigaben. Individuelle Software braucht länger: typischerweise 8–16+ Wochen, je nach Komplexität.\n\nIm Erstgespräch legen wir Meilensteine fest, bevor die Umsetzung startet. So wissen Sie, wann der erste nutzbare Stand kommt. Verzögerungen durch fehlende Texte oder Assets besprechen wir früh. Einfache Seiten sind oft schneller als komplexe Backoffice-Systeme.\n\nWir planen Puffer für Feedback und Freigaben ein, damit Termine erreichbar bleiben.',
  },
  {
    question: 'Wie starte ich ein Projekt bei Signal Software?',
    answer:
      'Schreiben Sie kurz, was Sie brauchen: per Formular auf dieser Seite oder per E-Mail. Wir melden uns, klären Ziel und Umfang und nennen den Aufwand.\n\nDanach starten wir mit einem klaren ersten Liefergegenstand, nicht mit einem offenen Dauerauftrag. Wenn wir nicht passen, sagen wir das ebenfalls offen. Kein verstecktes Angebots-Roulette: 1 Ansprechpartner, 1 Linie. In der Regel antworten wir innerhalb von 24 Stunden (werktags).\n\nFür dringende Themen nennen Sie im Betreff „Projekt“, damit wir priorisieren können.',
  },
]

usePageSeo({
  title: 'Signal Software: Software & Landingpages auf höchstem Niveau',
  description:
    'Signal Software entwickelt individuelle Software und conversion-starke Landingpages. Performance, SEO und Qualität für den deutschen Markt.',
  path: '/',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://signalsoftware.de/#organization',
            name: 'Signal Software',
            url: 'https://signalsoftware.de',
            logo: 'https://signalsoftware.de/logo.png',
            email: 'taha.guner@signalsoftware.de',
            description:
              'Softwareentwicklung und Landingpages auf höchstem Niveau für den deutschen Markt.',
            areaServed: {
              '@type': 'Country',
              name: 'Deutschland',
            },
          },
          {
            '@type': 'ProfessionalService',
            '@id': 'https://signalsoftware.de/#service',
            name: 'Signal Software',
            url: 'https://signalsoftware.de',
            provider: { '@id': 'https://signalsoftware.de/#organization' },
            serviceType: ['Softwareentwicklung', 'Landingpage-Entwicklung', 'Nuxt.js Entwicklung'],
            areaServed: {
              '@type': 'Country',
              name: 'Deutschland',
            },
          },
          {
            '@type': 'WebSite',
            '@id': 'https://signalsoftware.de/#website',
            name: 'Signal Software',
            url: 'https://signalsoftware.de',
            publisher: { '@id': 'https://signalsoftware.de/#organization' },
            inLanguage: 'de-DE',
          },
          {
            '@type': 'FAQPage',
            '@id': 'https://signalsoftware.de/#faq',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <LayoutAppHeader />
    <main>
      <SectionsHeroSection />
      <SectionsWhyUsSection />
      <SectionsFullScreenScrollFx />
      <SectionsServicesSection />
      <SectionsProcessSection />
      <SectionsTechStackSection />
      <SectionsFaqSection :faqs="faqs" />
      <SectionsContactSection />
    </main>
    <LayoutAppFooter />
  </div>
</template>
