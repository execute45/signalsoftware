<template>
  <section id="kontakt" class="section-padding bg-background">
    <div class="container-site">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <UiSectionHeading
            label="Kontakt"
            title="Lassen Sie uns sprechen"
            description="Erzählen Sie uns von Ihrem Projekt — wir melden uns zeitnah bei Ihnen zurück."
          />

          <div class="mt-8 space-y-6">
            <div class="flex items-start gap-4">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-foreground">E-Mail</p>
                <a
                  href="mailto:hello@signal-software.de"
                  class="text-muted-foreground transition-colors hover:text-foreground"
                >
                  hello@signal-software.de
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-foreground">Antwortzeit</p>
                <p class="text-muted-foreground">In der Regel innerhalb von 24 Stunden</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-surface p-8">
          <UiContactForm />
        </div>
      </div>
    </div>
  </section>
</template>
