export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test_ctrlWeb',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: {
    color: 'black',
    height: '4px',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/index.scss'],
  styleResources: {
    scss: ['@/assets/scss/_variables.scss', '@/assets/scss/_functions.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/focus-visible-polyfill', '@/plugins/lazyload'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
