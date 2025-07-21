<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// SEO 및 메타 태그 설정
useHead({
  htmlAttrs: {
    lang: 'ko'
  }
})

// 다크모드 초기화
const colorMode = useColorMode()

// 페이지 로딩 상태 관리
const nuxtApp = useNuxtApp()
nuxtApp.hook('page:start', () => {
  console.log('페이지 로딩 시작')
})

nuxtApp.hook('page:finish', () => {
  console.log('페이지 로딩 완료')
})
</script>

<style>
/* 글로벌 스타일은 assets/css/main.css에서 관리 */
</style>