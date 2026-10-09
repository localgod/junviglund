// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/leaflet', '@nuxt/image'],
  compatibilityDate: '2026-10-09',

  app: {
    head: {
      htmlAttrs: {
        lang: 'da'
      }
    }
  },

  image: {
    sanity: {
      projectId: process.env.SANITY_PROJECT_ID || '',
      dataset: process.env.SANITY_DATASET || 'production'
    }
  },

  // Gitpod dev server configuration
  vite: {
    server: {
      ws: {
        clientPort: 443,
        protocol: 'wss'
      },
      allowedHosts: [
        '.gitpod.dev',
        '.gitpod.io'
      ]
    }
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  runtimeConfig: {
    // Server-side access
    sanityProjectId: process.env.SANITY_PROJECT_ID,
    sanityDataset: process.env.SANITY_DATASET
  },
  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      autoSubfolderIndex: false
    },
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    rollupConfig: {
      external: [
        /leaflet\/dist\/images/
      ]
    }
  },
  css: [
    '~/assets/css/main.css'
  ],

  routeRules: {
    '/api/**': { cors: true }
  }
})
