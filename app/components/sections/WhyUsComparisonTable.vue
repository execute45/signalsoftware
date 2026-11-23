<script setup lang="ts">
const rows = [
  {
    criterion: 'Anpassung an Ihre Abläufe',
    builder: 'Begrenzt (Templates)',
    saas: 'Selten vollständig',
    custom: 'Vollständig',
  },
  {
    criterion: 'Integrationen (CRM, ERP, APIs)',
    builder: 'Wenige Standard-Plugins',
    saas: 'Nur Anbieter-Ökosystem',
    custom: 'Nach Bedarf',
  },
  {
    criterion: 'Performance & SEO (schnelles HTML)',
    builder: 'Variabel',
    saas: 'Abhängig vom Anbieter',
    custom: 'Zielsetzung ab Projektstart',
  },
  {
    criterion: 'Skalierung & Erweiterung',
    builder: 'Grenzen am Baukasten',
    saas: 'Lizenz- und Modulgrenzen',
    custom: 'Architektur mitwachsend',
  },
  {
    criterion: 'Eigentum am Code',
    builder: 'Kein eigener Code',
    saas: 'Kein eigener Code',
    custom: 'Ihr Produkt',
  },
  {
    criterion: 'Langfristiger Support',
    builder: 'Community oder Paket',
    saas: 'Abo beim Anbieter',
    custom: 'Partner nach Launch',
  },
]
</script>

<template>
  <div class="mt-20 border-t border-border/60 pt-16">
    <UiSectionHeading
      label="Vergleich"
      title="Baukasten, Standardsoftware und individuelle Software im Vergleich"
      description="Individuelle Software von Signal Software lohnt sich, wenn Baukasten oder Standard-SaaS zentrale Abläufe nicht abbilden oder Integrationen, Performance und Code-Eigentum entscheidend sind. Die Tabelle zeigt, wo maßgeschneiderte Webentwicklung mehr Flexibilität und langfristige Kontrolle bringt als Templates oder reine Abo-Tools."
      align="center"
    />

    <div class="mx-auto mt-10 max-w-4xl overflow-x-auto">
      <table class="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr class="border-b border-border">
            <th scope="col" class="py-3 pr-4 font-semibold text-foreground">
              Kriterium
            </th>
            <th scope="col" class="py-3 px-4 font-semibold text-foreground">
              Website-Baukasten
            </th>
            <th scope="col" class="py-3 px-4 font-semibold text-foreground">
              Standard-SaaS
            </th>
            <th scope="col" class="py-3 pl-4 font-semibold text-foreground">
              Individuelle Software (Signal Software)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.criterion"
            class="border-b border-border"
          >
            <th scope="row" class="py-3 pr-4 font-medium text-foreground">
              {{ row.criterion }}
            </th>
            <td class="py-3 px-4 text-muted-foreground">
              {{ row.builder }}
            </td>
            <td class="py-3 px-4 text-muted-foreground">
              {{ row.saas }}
            </td>
            <td class="py-3 pl-4 text-foreground">
              {{ row.custom }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>