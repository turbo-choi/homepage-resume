// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // 모듈 설정
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@pinia/nuxt'
  ],

  // CSS 설정
  css: ['~/assets/css/main.css'],

  // 컬러 모드 설정 (다크모드)
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  // Content 모듈 설정
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },

  // SEO 설정
  app: {
    head: {
      title: '개발자 포트폴리오',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '풀스택 개발자의 포트폴리오 웹사이트입니다.' },
        { name: 'keywords', content: 'Vue, Nuxt, TypeScript, 개발자, 포트폴리오' },
        { property: 'og:title', content: '개발자 포트폴리오' },
        { property: 'og:description', content: '풀스택 개발자의 포트폴리오 웹사이트입니다.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // SSR 설정
  ssr: true,

  // 타입스크립트 설정
  typescript: {
    typeCheck: true
  }
})