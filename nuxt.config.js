import 'dotenv/config'

export default {
  target: 'static',
  head: {
    title: 'Junviglund',
    htmlAttrs: {
      lang: 'da',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/sanity/module',
    'nuxt-leaflet',
  ],
  axios: {},
  content: {
    content: {
      nestedProperties: [],
    },
  },
  build: {},
  sanity: {
    projectId: 'uy0ayswl'
  }
}
