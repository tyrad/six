const Timestamp = new Date().getTime()
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MISTJ',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon.ico.png' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/coder.scss',
    '@/assets/style/coder-dark.scss',
    '@/assets/style/custom.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/filters.js',
    { src: '@/plugins/fontAwesomeIcons.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    // ['nuxt-fontawesome', {
    //   component: 'fa',
    //   imports: [
    //     {
    //       set: '@fortawesome/free-solid-svg-icons',
    //       icons: ['fas']
    //     }
    //   ]
    // }]
  ],
  //for  @nuxt-content
  content: {
    markdown: {
      prism: {
        // all theme https://github.com/PrismJS/prism-themes
        theme: 'prism-themes/themes/prism-coldark-dark.css'
      }
    }
  },
  // '@nuxtjs/style-resources'
  styleResources: {
    scss: [
      './assets/style/_variables.scss',
    ],
    hoistUseStatements: false  // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.output.filename = `js/[name].${Timestamp}.js` // 每次构建打包时给文件名加上时间戳，保证版本更新时与上版本文件名不一样
      config.output.chunkFilename = `js/[name].${Timestamp}.js`
      // ...
    }
  }
}
