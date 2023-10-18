// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    strict: true
  },
  components: false,
  modules: ['nuxt-viewport'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&display=swap'
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  css: ['~/assets/scss/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/variables.scss";'
        }
      }
    }
  },
  viewport: {
    breakpoints: {
      lg: 1432,
      md: 1024,
      sm: 680,
      xs: 360
    },
    cookieName: 'viewport',
    defaultBreakpoints: {
      desktop: 'lg',
      tablet: 'sm',
      mobile: 'xs'
    },
    fallbackBreakpoint: 'lg'
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://rickandmortyapi.com'
    }
  }
})
