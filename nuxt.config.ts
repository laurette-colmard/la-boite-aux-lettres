// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  site: {
    url: 'https://laboiteauxlettres.xyz',
    name: 'La Boîte aux lettres',
    description: 'Characters with character, by type designer Laurette Colmard.',
    defaultLocale: 'en',
  },
  css: ['@unocss/reset/eric-meyer.css'],
  content: {
    experimental: {
      nativeSqlite: true
    }
  },
  fonts: {
    defaults: {
      weights: [400, 500],
      styles: ['normal']
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    'nuxt-studio',
    '@nuxtjs/seo',
  ],
  studio: {
    repository: {
      provider: 'github',
      owner: 'wazolab',
      repo: 'la-boite-aux-lettres',
      branch: 'main'
    }
  }
})