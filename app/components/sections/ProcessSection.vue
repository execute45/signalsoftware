<script setup lang="ts">
const steps = [
  {
    number: '01',
    title: 'Erstgespräch',
    description:
      'Wir lernen Ihr Projekt, Ihre Ziele und Ihre Zielgruppe kennen. Offen, unkompliziert und auf den Punkt.',
  },
  {
    number: '02',
    title: 'Konzept',
    description:
      'Strategie, Wireframes und technische Planung — damit jeder Euro in die richtige Richtung fließt.',
  },
  {
    number: '03',
    title: 'Entwicklung',
    description:
      'Agile Umsetzung mit regelmäßigen Updates. Sie sehen Fortschritt, geben Feedback, wir liefern Qualität.',
  },
  {
    number: '04',
    title: 'Launch & Support',
    description:
      'Go-Live, Monitoring und langfristiger Support. Ihr Projekt ist erst dann fertig, wenn es für Sie funktioniert.',
  },
]
</script>

<template>
  <section id="prozess" class="section-padding bg-background">
    <div class="container-site">
      <UiSectionHeading
        label="Prozess"
        title="Von der Idee zum Launch"
        description="Ein transparenter, bewährter Ablauf — damit Sie jederzeit wissen, wo Ihr Projekt steht."
        align="center"
      />

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="step in steps"
          :key="step.number"
          class="card-surface relative"
        >
          <span class="text-4xl font-bold text-muted">{{ step.number }}</span>
          <h3 class="mt-4 text-lg font-semibold text-foreground">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            {{ step.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
