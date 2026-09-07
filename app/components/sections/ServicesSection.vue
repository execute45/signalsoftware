<script setup lang="ts">
const services = [
  {
    icon: 'code',
    title: 'Individuelle Softwareentwicklung',
    description:
      'Maßgeschneiderte Webanwendungen und digitale Produkte, von der Idee bis zur produktionsreifen Lösung, architekturiert für Wachstum.',
  },
  {
    icon: 'layout',
    title: 'Conversion-starke Landingpages',
    description:
      'Landingpages, die überzeugen und konvertieren. Klares Design, schnelle Ladezeiten und optimierte User Journeys für maximale Wirkung.',
  },
  {
    icon: 'zap',
    title: 'Nuxt.js Expertenentwicklung',
    description:
      'Spezialisiert auf Nuxt.js: Server-Side Rendering, Static Generation, SEO-Excellence und blitzschnelle Performance out of the box.',
  },
]
</script>

<template>
  <section id="leistungen" class="section-padding bg-background">
    <div class="container-site">
      <UiSectionHeading
        label="Leistungen"
        title="Was wir für Sie entwickeln"
        description="Drei Kernbereiche, ein Anspruch: höchste Qualität in jedem Detail, von der ersten Zeile Code bis zum Launch."
        align="center"
      />

      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.title"
          class="card-surface group"
        >
          <div
            class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-accent"
          >
            <svg
              v-if="service.icon === 'code'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <svg
              v-else-if="service.icon === 'layout'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="mb-3 text-xl font-semibold text-foreground">
            {{ service.title }}
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            {{ service.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
