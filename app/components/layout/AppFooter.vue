<script setup lang="ts">
const currentYear = new Date().getFullYear()
const { scrollToSection } = useScrollTo()
</script>

<template>
  <footer class="border-t border-border bg-background">
    <div class="container-site section-padding pb-10 pt-16">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <div class="mb-4">
            <img
              src="/logo.png"
              alt="Signal Software"
              class="h-8 w-auto"
              width="480"
              height="128"
            >
          </div>
          <p class="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Softwareentwicklung und Landingpages auf höchstem Niveau, spezialisiert auf Nuxt.js für den deutschen Markt.
          </p>
        </div>

        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Navigation
          </h3>
          <ul class="space-y-2">
            <li>
              <button
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                @click="scrollToSection('leistungen')"
              >
                Leistungen
              </button>
            </li>
            <li>
              <button
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                @click="scrollToSection('prozess')"
              >
                Prozess
              </button>
            </li>
            <li>
              <button
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                @click="scrollToSection('kontakt')"
              >
                Kontakt
              </button>
            </li>
            <li>
              <NuxtLink
                to="/blog"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Blog
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Kontakt
          </h3>
          <a
            href="mailto:hello@signal-software.de"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            hello@signal-software.de
          </a>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row"
      >
        <p class="text-sm text-muted-foreground">
          &copy; {{ currentYear }} Signal Software. Alle Rechte vorbehalten.
        </p>
        <div class="flex gap-6">
          <span class="cursor-not-allowed text-sm text-muted-foreground/50" title="Demnächst verfügbar">
            Impressum
          </span>
          <span class="cursor-not-allowed text-sm text-muted-foreground/50" title="Demnächst verfügbar">
            Datenschutz
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
