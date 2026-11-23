<script setup lang="ts">
const steps = [
  {
    title: 'Erstgespräch',
    paragraphs: [
      'Wir lernen Ihr Projekt, Ihre Ziele und Ihre Zielgruppe kennen. Offen, unkompliziert und auf den Punkt.',
      'Sie schildern Ablauf, Engpässe und gewünschtes Ergebnis. Wir stellen die Fragen, die Technik und Budget realistisch einordnen. Danach wissen Sie, ob individuelle Software, eine Landingpage oder ein schrittweiser Umbau der richtige Weg ist.',
      'Das Gespräch ist kostenlos und unverbindlich; Ziel ist Klarheit, nicht sofortiger Vertragsabschluss. Bringen Sie gern bestehende Unterlagen oder Links zu Referenzprojekten mit. Wir fassen danach die nächsten Schritte kurz per E-Mail zusammen.',
    ],
  },
  {
    title: 'Konzept',
    paragraphs: [
      'Strategie, Wireframes und technische Planung, damit jeder Euro in die richtige Richtung fließt.',
      'Gemeinsam definieren wir den ersten lieferbaren Umfang, Datenmodelle und Schnittstellen zu bestehenden Systemen. Sie erhalten eine nachvollziehbare Roadmap mit klaren Meilensteinen, bevor die Entwicklung startet, ohne Überraschungen in Woche drei.',
      'Design- und Inhaltslücken benennen wir offen, damit Sie vor dem ersten Sprint wissen, was noch fehlt. Rechtstexte, Tracking und Hosting klären wir in dieser Phase mit. Erst danach startet die Entwicklung im festgelegten Umfang.',
    ],
  },
  {
    title: 'Entwicklung',
    paragraphs: [
      'Agile Umsetzung mit regelmäßigen Updates. Sie sehen Fortschritt, geben Feedback, wir liefern Qualität.',
      'Wir arbeiten in kurzen Zyklen mit lauffähigen Zwischenständen auf Basis von TypeScript und klarer Architektur. Code Reviews, saubere Struktur und dokumentierte Entscheidungen gehören dazu, damit Ihr Team oder andere Dienstleister später nahtlos anknüpfen können.',
      'Staging-Umgebungen zeigen Ihnen den Stand, ohne dass halbfertiger Code direkt live geht. Feedback geben Sie direkt am Zwischenstand, keine monatelangen Blackouts. Abnahmen gehören fest zu jedem Sprint.',
    ],
  },
  {
    title: 'Launch',
    paragraphs: [
      'Go-Live, Monitoring und Übergabe. Ihr Projekt geht kontrolliert live.',
      'Vor dem Launch prüfen wir Performance, Formulare, Tracking und SEO-Basics. Deployment und Domain bleiben nachvollziehbar, Sie wissen, wo das Produkt läuft und wie Sie bei Störungen reagieren. Der Launch ist ein Meilenstein, kein blindes Umschalten.',
      'Nach Go-Live bleiben wir erreichbar, falls kurzfristig Nachjustierungen nötig sind. Monitoring und Backups besprechen wir vor dem Umschalten, nicht erst danach. Ein Rollback-Plan liegt bereit, falls nötig.',
    ],
  },
  {
    title: 'Betrieb & Weiterentwicklung',
    paragraphs: [
      'Support, Updates und neue Features, wenn Ihr Geschäft wächst, ohne bei Null neu zu starten.',
      'Viele Kunden bleiben für Wartung, Sicherheitsupdates und neue Module an Bord. Prioritäten legen Sie fest; wir schätzen Aufwand transparent. So bleibt Software ein Werkzeug, das mit Ihren Prozessen mitwächst, statt ein abgeschlossenes Projekt ohne Zukunft.',
      'Security-Patches und Framework-Upgrades planen wir mit, bevor sie zum Risiko werden. So bleibt Ihre Software auch in Jahr zwei wartungsfähig und sicher.',
    ],
  },
]
</script>

<template>
  <section id="prozess" class="section-padding bg-background">
    <div class="container-site">
      <UiSectionHeading
        label="Prozess"
        title="Die 5 Schritte von der Anfrage bis zum Launch bei Signal Software"
        description="Bei Signal Software durchläuft jedes Projekt fünf Schritte: kostenloses Erstgespräch, Konzept mit Roadmap, agile Entwicklung mit lauffähigen Zwischenständen, kontrollierter Launch und optional Betrieb mit Updates. Sie wissen jederzeit, was als Nächstes ansteht, welche Entscheidungen fällig sind und wann der erste nutzbare Stand live geht."
        align="center"
      />

      <ol class="mx-auto mt-10 grid max-w-4xl list-none gap-6 pl-0 md:grid-cols-2 lg:grid-cols-1 lg:gap-8">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="card-surface"
        >
          <h3 class="text-lg font-semibold text-foreground">
            {{ index + 1 }}. {{ step.title }}
          </h3>
          <p
            v-for="(paragraph, i) in step.paragraphs"
            :key="i"
            class="mt-2 text-sm leading-relaxed text-muted-foreground"
          >
            {{ paragraph }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>