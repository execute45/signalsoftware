<script setup lang="ts">
const technologies = [
  { name: 'Nuxt.js', category: 'Framework', slug: 'nuxt', color: '00DC82' },
  { name: 'Vue 3', category: 'Frontend', slug: 'vuedotjs', color: '41B883' },
  { name: 'React.js', category: 'Frontend', slug: 'react', color: '61DAFB' },
  { name: 'Angular', category: 'Frontend', slug: 'angular', color: 'DD0031' },
  { name: 'TypeScript', category: 'Sprache', slug: 'typescript', color: '3178C6' },
  { name: 'JavaScript', category: 'Sprache', slug: 'javascript', color: 'F7DF1E' },
  { name: 'Tailwind CSS', category: 'Styling', slug: 'tailwindcss', color: '06B6D4' },
  { name: 'Node.js', category: 'Runtime', slug: 'nodedotjs', color: '339933' },
  { name: 'Docker', category: 'Deployment', slug: 'docker', color: '2496ED' },
]
</script>

<template>
  <section id="tech" class="section-padding bg-muted/30">
    <div class="container-site">
      <UiSectionHeading
        label="Tech-Stack"
        title="Technologien, die überzeugen"
        description="Der Tech-Stack von Signal Software umfasst je nach Projekt unter anderem Vue, Nuxt, React, Angular, TypeScript, JavaScript, Tailwind, Node und Docker. So bleiben Seiten schnell, Code wartbar und Deployments reproduzierbar. Wir wählen Werkzeuge nach Anforderung, nicht nach Buzzword."
        align="center"
      />

      <p class="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
        Wenn ein Projekt wächst, erweitern wir den Stack kontrolliert, ohne alles neu zu schreiben.
        Jeder Baustein löst ein konkretes Problem: Ladezeit, Wartbarkeit, reproduzierbare Deployments.
      </p>

      <div class="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
        <div
          v-for="tech in technologies"
          :key="tech.name"
          class="group flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5 pl-3.5 transition-all duration-300 hover:border-ring/40 hover:bg-accent"
        >
          <UiTechBrandIcon
            :slug="tech.slug"
            :color="tech.color"
            :label="tech.name"
          />
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