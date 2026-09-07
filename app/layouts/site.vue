<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b border-border">
      <div class="container-site flex h-16 items-center justify-between">
        <NuxtLink to="/" class="flex items-center">
          <img
            src="/logo.png"
            alt="Signal Software"
            class="h-8 w-auto"
            width="480"
            height="128"
          >
        </NuxtLink>
        <nav class="flex items-center gap-6 text-sm">
          <NuxtLink
            to="/blog"
            class="text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </NuxtLink>
          <NuxtLink
            to="/#kontakt"
            class="text-muted-foreground transition-colors hover:text-foreground"
          >
            Kontakt
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="border-t border-border py-10">
      <div class="container-site flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p class="text-sm text-muted-foreground">
          &copy; {{ year }} Signal Software
        </p>
        <NuxtLink
          to="/"
          class="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Zur Startseite
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>
