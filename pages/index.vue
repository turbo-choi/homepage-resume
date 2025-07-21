<template>
  <div>
    <!-- 히어로 섹션 -->
    <section class="section-padding bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              안녕하세요,<br>
              <span class="gradient-text">풀스택 개발자</span><br>
              김개발입니다.
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              사용자 중심의 웹 애플리케이션을 개발하며, 최신 기술 스택을 활용해 
              혁신적인 솔루션을 만들어갑니다.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton 
                to="/portfolio" 
                size="lg" 
                class="px-8 py-3"
              >
                포트폴리오 보기
              </UButton>
              <UButton 
                to="/contact" 
                variant="outline" 
                size="lg" 
                class="px-8 py-3"
              >
                연락하기
              </UButton>
            </div>
          </div>
          
          <!-- 프로필 이미지 영역 -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <div class="w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                <div class="w-72 h-72 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <span class="text-6xl font-bold text-gray-400 dark:text-gray-600">👨‍💻</span>
                </div>
              </div>
              <!-- 플로팅 요소들 -->
              <div class="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <span class="text-2xl">⚡</span>
              </div>
              <div class="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                <span class="text-xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 기술 스택 섹션 -->
    <TechStack />
    
    <!-- 최근 프로젝트 섹션 -->
    <RecentProjects />
    
    <!-- 최근 블로그 포스트 섹션 -->
    <RecentBlogPosts />
  </div>
</template>

<script setup lang="ts">
// SEO 메타 태그 설정
useHead({
  title: '홈 - 개발자 포트폴리오',
  meta: [
    {
      name: 'description',
      content: '풀스택 개발자 김개발의 포트폴리오 웹사이트입니다. Vue, Nuxt, TypeScript 전문가입니다.'
    },
    {
      property: 'og:title',
      content: '김개발 - 풀스택 개발자 포트폴리오'
    },
    {
      property: 'og:description',
      content: '사용자 중심의 웹 애플리케이션을 개발하는 풀스택 개발자입니다.'
    }
  ]
})

console.log('홈페이지 로드됨')
</script>