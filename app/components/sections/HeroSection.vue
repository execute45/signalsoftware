<script setup lang="ts">
const { scrollToSection } = useScrollTo()
</script>

<template>
  <section
    id="hero"
    class="hero-section relative isolate mx-auto flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-black px-6 pt-28 pb-16 text-center md:px-8 md:pt-32"
  >
    <div class="hero-atmosphere pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

    <div
      class="hero-grid pointer-events-none absolute inset-x-0 top-0 z-0 h-[600px] w-full opacity-80"
      aria-hidden="true"
    />

    <div
      class="hero-horizon pointer-events-none absolute z-[1]"
      aria-hidden="true"
    />

    <div class="relative z-10">
      <a
        href="#leistungen"
        class="hero-badge group"
        @click.prevent="scrollToSection('leistungen')"
      >
        <span class="hero-badge-inner">
          Nuxt.js Spezialist
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </a>

      <h1 class="hero-title -translate-y-4 text-balance py-6 text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
        Software &amp; Landingpages<br>auf höchstem Niveau
      </h1>

      <p class="hero-subtitle mx-auto mb-12 max-w-3xl -translate-y-4 text-balance text-lg tracking-tight md:text-xl">
        Signal Software entwickelt performante Webanwendungen und conversion-starke Landingpages,
        schnell, skalierbar und SEO-optimiert für den deutschen Markt.
      </p>

      <div class="flex justify-center">
        <button
          type="button"
          class="hero-cta -mt-5 inline-flex h-10 w-fit items-center justify-center md:w-52"
          @click="scrollToSection('kontakt')"
        >
          Projekt anfragen
        </button>
      </div>
    </div>
  </section>
</template>
