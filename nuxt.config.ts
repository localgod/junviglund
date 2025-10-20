// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4 uses app/ as the default srcDir
  // This is automatically detected, no explicit configuration needed
  
  devtools: { enabled: true },
  telemetry: false,
  ssr: true,
  modules: ['@nuxt/eslint', '@nuxtjs/leaflet', '@nuxt/image'],
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
    '@/assets/css/main.css'
  ],
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', defer: true }
      ]
    }
  },
  routeRules: {
    '/api/**': { cors: true },
  }
})
