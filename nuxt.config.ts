
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {

  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css", 'vue-final-modal/style.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
    ['nuxt-lazy-load', {
      lazyLoad: {
        // These are the default values
        images: true,
        videos: true,
        audios: true,
        iframes: true,
        native: false,
        directiveOnly: false,

        // Default image must be in the public folder
        defaultImage: '/logo.png',

        // To remove class set value to false
        loadingClass: 'isLoading',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad',

        observerConfig: {
          // See IntersectionObserver documentation
        }
      }
    }],
    ['@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'en',
            file: 'en-US.js',
            name: 'English',
          },
          {
            code: 'zh',
            file: 'zh-CN.js',
            name: '中文',
          },
        ],
        langDir: 'lang',
        defaultLocale: 'zh'
      }
    ]
  ],
  build: {
    transpile: [],
  },
  vue: {
  },
  plugins: [{ src: "~/plugins/lottie-player.client.ts", mode: "client" }],
  vite: {
    // plugins: [],
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
})
