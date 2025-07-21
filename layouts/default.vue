<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- 네비게이션 바 -->
    <AppHeader />
    
    <!-- 메인 콘텐츠 -->
    <main>
      <slot />
    </main>
    
    <!-- 푸터 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// 레이아웃 메타데이터 설정
useHead({
  bodyAttrs: {
    class: 'font-sans antialiased'
  }
})
</script>