<script setup lang="ts">
definePageMeta({
  layout: 'site',
})

usePageSeo({
  title: 'Für KI | Signal Software',
  description:
    'Kompakte, maschinenlesbare Zusammenfassung der Website signalsoftware.de für KI-Assistenten und Suchsysteme.',
  path: '/fuer-ki',
})

const { data: body, error } = await useAsyncData('llms-txt', () =>
  $fetch<string>('/llms.txt', { responseType: 'text' }),
)

useHead({
  meta: [{ name: 'robots', content: 'index, follow' }],
  link: [
    {
      rel: 'alternate',
      type: 'text/plain',
      href: 'https://signalsoftware.de/llms.txt',
    },
  ],
})
</script>

<template>
  <div class="section-padding bg-background">
    <div class="container-site max-w-3xl">
      <p class="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Für KI
      </p>
      <h1 class="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Website-Zusammenfassung für KI
      </h1>
      <p class="mt-4 text-base leading-relaxed text-muted-foreground">
        Strukturierter Überblick über Signal Software und die wichtigsten Seiten. Dieselbe Fassung liegt unter
        <a
          href="/llms.txt"
          class="text-foreground underline-offset-4 hover:underline"
        >/llms.txt</a>
        für Crawler bereit.
      </p>

      <div
        v-if="error"
        class="mt-8 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground"
      >
        Die Datei llms.txt konnte nicht geladen werden.
        <a href="/llms.txt" class="mt-2 inline-block text-foreground underline">Direkt öffnen</a>
      </div>

      <article
        v-else-if="body"
        class="mt-10"
      >
        <pre class="overflow-x-auto whitespace-pre-wrap rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground/90">{{ body }}</pre>
        <p class="mt-4 text-sm text-muted-foreground">
          <a
            href="/llms.txt"
            class="text-foreground underline-offset-4 hover:underline"
            download
          >Als Textdatei herunterladen</a>
        </p>
      </article>
    </div>
  </div>
</template>