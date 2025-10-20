// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4 uses app/ as the default srcDir
  // This is automatically detected, no explicit configuration needed
  
  devtools: { enabled: true },
  telemetry: false,
  ssr: true,
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/leaflet', '@nuxt/image'],
  compatibilityDate: '2024-10-02',
  
  // Gitpod dev server configuration
  vite: {
    server: {
      hmr: {
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
    sanityDataset: process.env.SANITY_DATASET,
    // Client-side access (needed for image URL builder)
    public: {
      sanityProjectId: process.env.SANITY_PROJECT_ID,
      sanityDataset: process.env.SANITY_DATASET
    }
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
    '/api/**': { cors: true },
  }
})
