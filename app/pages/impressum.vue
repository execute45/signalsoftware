<script setup lang="ts">
definePageMeta({
  layout: 'site',
})

usePageSeo({
  title: 'Impressum | Signal Software',
  description:
    'Impressum von Signal Software: Anbieterkennzeichnung gemäß § 5 DDG.',
  path: '/impressum',
})
</script>

<template>
  <article class="container-site section-padding">
    <div class="max-w-2xl">
      <p class="text-sm text-muted-foreground">Signal Software</p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
        Impressum
      </h1>
      <p class="mt-4 text-muted-foreground">
        Angaben gemäß § 5 DDG
      </p>
    </div>

    <div class="prose-legal mt-12 max-w-2xl space-y-10 text-base leading-relaxed text-foreground/90">
      <section>
        <h2 class="text-xl font-semibold tracking-tight text-foreground">
          Anbieter
        </h2>
        <p class="mt-4">
          <strong class="font-semibold text-foreground">DUNYA 360 YAZILIM PAZARLAMA VE TİCARET LİMİTED ŞİRKETİ</strong><br>
          Sanayi Mah. Teknopark Blv. Kapı No: 1 / 4A / 101<br>
          Pendik / Istanbul<br>
          Türkei
        </p>
      </section>

      <section>
        <h2 class="text-xl font-semibold tracking-tight text-foreground">
          Kontakt
        </h2>
        <p class="mt-4">
          E-Mail:
          <a
            href="mailto:taha.guner@signalsoftware.de"
            class="text-foreground underline-offset-4 hover:underline"
          >taha.guner@signalsoftware.de</a>
        </p>
      </section>

      <section>
        <h2 class="text-xl font-semibold tracking-tight text-foreground">
          Steuernummer
        </h2>
        <p class="mt-4">
          Finanzamt: Pendik – Istanbul<br>
          Steuernummer: 3141193310
        </p>
      </section>

      <section>
        <h2 class="text-xl font-semibold tracking-tight text-foreground">
          Website
        </h2>
        <p class="mt-4">
          Marke: Signal Software<br>
          Domain: signalsoftware.de
        </p>
      </section>
    </div>
  </article>
</template>
