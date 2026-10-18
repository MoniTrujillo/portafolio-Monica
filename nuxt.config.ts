export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Cambia el usuario en .env: NUXT_PUBLIC_GITHUB_USER=tu-usuario
      githubUser: 'MoniTrujillo',
    },
  },
  i18n: {
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
