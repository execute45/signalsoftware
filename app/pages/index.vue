<script setup lang="ts">
useSeoMeta({
  title: 'Signal Software: Software & Landingpages auf höchstem Niveau',
  description:
    'Signal Software entwickelt individuelle Software und conversion-starke Landingpages mit Nuxt.js. Performance, SEO und Qualität für den deutschen Markt.',
  ogTitle: 'Signal Software: Software & Landingpages auf höchstem Niveau',
  ogDescription:
    'Nuxt.js Spezialist für Softwareentwicklung und Landingpages. Performance-first, SEO-optimiert, made in Germany.',
  ogType: 'website',
  ogLocale: 'de_DE',
  ogSiteName: 'Signal Software',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Signal Software: Software & Landingpages auf höchstem Niveau',
  twitterDescription:
    'Nuxt.js Spezialist für Softwareentwicklung und Landingpages im deutschen Markt.',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://signal-software.de' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://signal-software.de/#organization',
            name: 'Signal Software',
            url: 'https://signal-software.de',
            email: 'hello@signal-software.de',
            description:
              'Softwareentwicklung und Landingpages auf höchstem Niveau. Nuxt.js Spezialist für den deutschen Markt.',
            areaServed: {
              '@type': 'Country',
              name: 'Deutschland',
            },
          },
          {
            '@type': 'ProfessionalService',
            '@id': 'https://signal-software.de/#service',
            name: 'Signal Software',
            url: 'https://signal-software.de',
            provider: { '@id': 'https://signal-software.de/#organization' },
            serviceType: ['Softwareentwicklung', 'Landingpage-Entwicklung', 'Nuxt.js Entwicklung'],
            areaServed: {
              '@type': 'Country',
              name: 'Deutschland',
            },
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <LayoutAppHeader />
    <main>
      <SectionsHeroSection />
      <SectionsWhyUsSection />
      <SectionsFullScreenScrollFx />
      <SectionsServicesSection />
      <SectionsProcessSection />
      <SectionsTechStackSection />
      <SectionsContactSection />
    </main>
    <LayoutAppFooter />
  </div>
</template>
