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
            Softwareentwicklung und Landingpages auf höchstem Niveau für den deutschen Markt.
          </p>
        </div>

        <div>
          <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Navigation
          </p>
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
                to="/individuelle-softwareentwicklung"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Softwareentwicklung
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/landingpage-erstellen-lassen"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Landingpages
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/webentwicklung"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Webentwicklung
              </NuxtLink>
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
          <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Kontakt
          </p>
          <a
            href="mailto:taha.guner@signalsoftware.de"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            taha.guner@signalsoftware.de
          </a>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row"
      >
        <p class="text-sm text-muted-foreground">
          &copy; {{ currentYear }} Signal Software. Alle Rechte vorbehalten.
        </p>
        <div class="flex flex-wrap justify-center gap-6 md:justify-end">
          <NuxtLink
            to="/fuer-ki"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Für KI
          </NuxtLink>
          <NuxtLink
            to="/impressum"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Impressum
          </NuxtLink>
          <NuxtLink
            to="/datenschutz"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Datenschutz
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
