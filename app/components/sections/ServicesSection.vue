<script setup lang="ts">
const services = [
  {
    icon: 'code',
    title: 'Individuelle Softwareentwicklung',
    href: '/individuelle-softwareentwicklung',
    description:
      'Maßgeschneiderte Webanwendungen und digitale Produkte, von der Idee bis zur produktionsreifen Lösung, architekturiert für Wachstum.',
    detail:
      'Sie brauchen ein Portal, ein internes Tool oder ein Kundenprodukt, das exakt zu Ihrem Ablauf passt. Wir modellieren Prozesse, Daten und Rollen, bauen die Oberfläche in Vue und liefern serverseitig gerendertes HTML für Performance und SEO. Anbindungen an CRM, ERP oder Zahlungsanbieter planen wir von Anfang an, damit später kein technischer Engpass entsteht.',
    extra:
      'Typische Ergebnisse sind Mitarbeiterportale, Kunden-Dashboards und Branchenlösungen, die Excel-Ketten ersetzen. Sie entscheiden, wer welche Rolle sieht und welche Daten exportiert werden dürfen.',
  },
  {
    icon: 'layout',
    title: 'Landingpages erstellen lassen',
    href: '/landingpage-erstellen-lassen',
    description:
      'Landingpages, die überzeugen und konvertieren. Klares Design, schnelle Ladezeiten und ein klarer nächster Schritt für Besucher.',
    detail:
      'Eine Kampagnenseite muss in Sekunden erklären, was Besucher bekommen und wie sie anfragen. Wir strukturieren Angebot, Vertrauen und Formular, optimieren Ladezeit und Core Web Vitals und halten Impressum sowie Datenschutz erreichbar. Das Ergebnis ist eine schlanke, schnelle Seite, die Ads, Newsletter und organisische Suche gleichermaßen trägt.',
    extra:
      'Wir testen mit Ihnen die Botschaft vor dem Launch: passt die Überschrift zum Suchintent, ist das Formular kurz genug, bleiben Tracking und Consent rechtssicher umsetzbar?',
  },
  {
    icon: 'zap',
    title: 'Webentwicklung mit Nuxt.js',
    href: '/webentwicklung',
    description:
      'Professionelle Webentwicklung: serverseitig gerendertes HTML, schnelle Ladezeiten und Seiten, die Suchmaschinen lesen können.',
    detail:
      'Serverseitiges HTML und klare Frontend-Architektur sorgen dafür, dass Websites schnell laden und von Suchmaschinen vollständig erfasst werden. Wir setzen TypeScript, wartbare Komponenten und Deployments ein, die mit Ihrem Traffic mitwachsen. Ob Marketingseite, Bereich mit Login oder Schnittstelle zu bestehenden Systemen: eine Basis statt vieler Einzellösungen.',
    extra:
      'Hosting, CI und Monitoring stimmen wir auf Ihren Betrieb ab, ob kleines Team ohne DevOps oder bestehende Infrastruktur, an die wir andocken sollen.',
  },
]
</script>

<template>
  <section id="leistungen" class="section-padding bg-background">
    <div class="container-site">
      <UiSectionHeading
        label="Leistungen"
        title="Was wir für Sie entwickeln"
        description="Signal Software plant und baut digitale Produkte für Unternehmen in Deutschland: von der ersten Kampagnenseite bis zu skalierbaren Webanwendungen im Browser. Schwerpunkte sind individuelle Software, conversion-starke Landingpages und professionelle Webentwicklung; dazu kommen Weiterentwicklung, Schnittstellen und technische Beratung. Jedes Vorhaben startet mit klarer Einordnung von Umfang, Laufzeit und Aufwand."
        align="center"
      />

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.title"
          class="card-surface group"
        >
          <div
            class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-accent"
          >
            <svg
              v-if="service.icon === 'code'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <svg
              v-else-if="service.icon === 'layout'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="mb-3 text-xl font-semibold text-foreground">
            <NuxtLink :to="service.href" class="hover:text-muted-foreground">
              {{ service.title }}
            </NuxtLink>
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            {{ service.description }}
          </p>
          <p class="mt-3 text-sm leading-relaxed text-foreground/90">
            {{ service.detail }}
          </p>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            {{ service.extra }}
          </p>
          <NuxtLink
            :to="service.href"
            class="mt-5 inline-block text-sm text-foreground underline-offset-4 hover:underline"
          >
            Mehr zur Leistung
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>