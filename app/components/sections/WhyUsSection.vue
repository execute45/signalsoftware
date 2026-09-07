<script setup lang="ts">
const reasons = [
  {
    title: 'Höchste Qualität',
    description:
      'Verständliche Kommunikation, zuverlässige Umsetzung und ein tiefes Verständnis für den deutschen Markt und seine Anforderungen.',
  },
  {
    title: 'Moderne Architektur',
    description:
      'Sauberer, wartbarer Code auf Basis aktueller Best Practices: TypeScript, komponentenbasiert und zukunftssicher.',
  },
  {
    title: 'Performance-first',
    description:
      'Jede Millisekunde zählt. Wir optimieren für Core Web Vitals, schnelle Ladezeiten und ein herausragendes Nutzererlebnis.',
  },
  {
    title: 'Langfristige Partnerschaft',
    description:
      'Wir denken über den Launch hinaus, mit skalierbarer Architektur, dokumentiertem Code und Support, wenn Sie ihn brauchen.',
  },
]
</script>

<template>
  <section id="warum" class="section-padding bg-muted/30">
    <div class="container-site">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <UiSectionHeading
            label="Warum Signal Software"
            title="Qualität, die man sieht und misst"
            description="Wir kombinieren technische Exzellenz mit strategischem Denken, damit Ihre Software nicht nur funktioniert, sondern Ergebnisse liefert."
          />

          <div class="mt-8 space-y-6">
            <div
              v-for="(reason, index) in reasons"
              :key="reason.title"
              class="flex gap-4"
            >
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-foreground"
              >
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="font-semibold text-foreground">{{ reason.title }}</h3>
                <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {{ reason.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute -inset-4 rounded-3xl bg-accent/20 blur-2xl"
            aria-hidden="true"
          />
          <div class="card-surface relative space-y-6 p-8">
            <div class="flex items-center gap-3 border-b border-border pb-6">
              <div class="h-3 w-3 rounded-full bg-destructive/80" />
              <div class="h-3 w-3 rounded-full bg-muted-foreground/50" />
              <div class="h-3 w-3 rounded-full bg-foreground/30" />
              <span class="ml-2 font-mono text-xs text-muted-foreground">signal-software.de</span>
            </div>
            <pre class="overflow-x-auto font-mono text-sm leading-relaxed"><code><span class="text-foreground">const</span> <span class="text-muted-foreground">project</span> = {
  <span class="text-muted-foreground">framework:</span> <span class="text-foreground">'Nuxt.js'</span>,
  <span class="text-muted-foreground">language:</span> <span class="text-foreground">'TypeScript'</span>,
  <span class="text-muted-foreground">performance:</span> <span class="text-foreground">'100%'</span>,
  <span class="text-muted-foreground">seo:</span> <span class="text-foreground">'optimized'</span>,
  <span class="text-muted-foreground">market:</span> <span class="text-foreground">'Deutschland'</span>,
}</code></pre>
            <p class="text-sm text-muted-foreground">
              So sieht Exzellenz aus: sauberer Code, klare Struktur, messbare Ergebnisse.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
