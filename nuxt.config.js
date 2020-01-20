module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    title: "Cilvia333's Official Website",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Cilvia333&apos;s Portfolio Site ver.2.0' }
    ],
    script: [
      { src:"https://use.typekit.net/rlp2lkm.js"},
      { innerHTML:"try{Typekit.load({ async: true });}catch(e){}"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    meta: [
      {name:"google-site-verification", content:"BTrzs-EhIONKU3MbK4cveo0OU2Yg47DuI1i3-OqYDPc"}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  plugins:[
    {src: '~plugins/fontawesome.js'}
  ],

  modules:[
    ['@nuxtjs/google-analytics', {
      id: 'UA-127442648-1'
    }]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
