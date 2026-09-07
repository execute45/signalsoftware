// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Avoid Vite "#app-manifest" resolution errors with routeRules (nuxt#30461 / #33606)
  experimental: {
    appManifest: false,
  },

  modules: ['@nuxtjs/tailwindcss'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config',
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    adminEmail: process.env.NUXT_ADMIN_EMAIL || '',
    adminPassword: process.env.NUXT_ADMIN_PASSWORD || '',
    sessionPassword: process.env.NUXT_SESSION_PASSWORD || '',
    databaseUrl: process.env.NUXT_DATABASE_URL || '',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'de', class: 'dark' },
      title: 'Signal Software: Software & Landingpages auf höchstem Niveau',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Signal Software entwickelt individuelle Software und conversion-starke Landingpages mit Nuxt.js. Performance, SEO und Qualität für den deutschen Markt.',
        },
        { name: 'theme-color', content: '#000000' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/style.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/style.css',
        },
      ],
    },
  },

  site: {
    url: 'https://signal-software.de',
    name: 'Signal Software',
    description:
      'Softwareentwicklung und Landingpages auf höchstem Niveau. Nuxt.js Spezialist für den deutschen Markt.',
    defaultLocale: 'de',
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
    externals: {
      external: ['better-sqlite3'],
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/admin/**': { ssr: true, prerender: false },
    '/api/**': { prerender: false },
    '/blog/**': { prerender: false },
  },
})
