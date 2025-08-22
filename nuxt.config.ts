// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.API_BACK_URL,
    }
  },

  security: {
    headers: {
      contentSecurityPolicy: false,
    },
    corsHandler: {
      origin: '*',
    }
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/ui-pro',
    '@pinia/nuxt',
    'nuxt-security'
  ]
})