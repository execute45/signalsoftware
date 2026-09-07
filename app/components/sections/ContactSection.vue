<template>
  <section id="kontakt" class="section-padding bg-background">
    <div class="container-site">
      <div class="mx-auto max-w-3xl">
        <UiSectionHeading
          label="Kontakt"
          title="Lassen Sie uns sprechen"
          description="In wenigen Schritten zum passenden Setup. Wir melden uns zeitnah bei Ihnen zurück."
          align="center"
        />
      </div>

      <div class="mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-card p-6 md:p-10">
        <UiLeadStepper />
      </div>

      <p class="mt-8 text-center text-sm text-muted-foreground">
        Oder direkt per E-Mail:
        <a
          href="mailto:hello@signal-software.de"
          class="text-foreground transition-colors hover:underline"
        >
          hello@signal-software.de
        </a>
      </p>
    </div>
  </section>
</template>
