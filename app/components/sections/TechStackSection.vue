<script setup lang="ts">
const technologies = [
  { name: 'Nuxt.js', category: 'Framework' },
  { name: 'Vue 3', category: 'Frontend' },
  { name: 'TypeScript', category: 'Sprache' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Nitro', category: 'Server' },
  { name: 'Pinia', category: 'State' },
  { name: 'Vite', category: 'Build' },
]
</script>

<template>
  <section id="tech" class="section-padding bg-muted/30">
    <div class="container-site">
      <UiSectionHeading
        label="Tech-Stack"
        title="Technologien, die überzeugen"
        description="Wir setzen auf bewährte, moderne Tools, mit Nuxt.js als Herzstück jeder Lösung."
        align="center"
      />

      <div class="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
        <div
          v-for="tech in technologies"
          :key="tech.name"
          class="group flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 transition-all duration-300 hover:border-ring/40 hover:bg-accent"
        >
          <span class="text-sm font-semibold text-foreground">{{ tech.name }}</span>
          <span class="text-xs text-muted-foreground group-hover:text-foreground/70">{{ tech.category }}</span>
        </div>
      </div>

      <p class="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground">
        Der Stack wächst mit Ihrem Projekt, immer passend, nie over-engineered.
      </p>
    </div>
  </section>
</template>
