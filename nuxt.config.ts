import { siteUrl } from './app/data/site'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],
  site: {
    url: siteUrl,
    name: 'Mónica Trujillo',
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      githubUser: 'MoniTrujillo',
    },
  },
  i18n: {
    baseUrl: siteUrl,
    locales: [
      { code: 'es', language: 'es-MX', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
  },
  app: {
    head: {
      link: [{ rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    },
  },
})
