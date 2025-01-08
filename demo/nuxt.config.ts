// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: 'https://cdn.tailwindcss.com' }],
    },
  },
  compatibilityDate: '2025-01-08',
})
