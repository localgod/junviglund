// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,
  ssr: true,
  runtimeConfig: {
  },
  nitro: {
    preset: "cloudflare_pages",
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },
  css: [
      '@/assets/css/main.css',
  ],
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', body: true }
      ]
    }
  }
})