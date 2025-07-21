<template>
  <section class="section-padding bg-white dark:bg-gray-900">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          최근 블로그 포스트
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          개발 경험과 기술적 인사이트를 공유합니다.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <article 
          v-for="post in recentPosts" 
          :key="post.slug"
          class="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden card-hover group"
        >
          <!-- 포스트 썸네일 -->
          <div class="relative h-48 bg-gradient-to-br from-purple-400 to-pink-400 overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-4xl opacity-80">{{ post.emoji }}</div>
            </div>
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                {{ post.category }}
              </span>
            </div>
          </div>
          
          <!-- 포스트 내용 -->
          <div class="p-6">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <time :datetime="post.publishedAt">
                {{ formatDate(post.publishedAt) }}
              </time>
              <span class="mx-2">•</span>
              <span>{{ post.readTime }}분 읽기</span>
            </div>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ post.title }}
            </h3>
            
            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {{ post.description }}
            </p>
            
            <!-- 태그 -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="tag in post.tags.slice(0, 3)" 
                :key="tag"
                class="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
              >
                #{{ tag }}
              </span>
            </div>
            
            <!-- 읽기 버튼 -->
            <NuxtLink 
              :to="`/blog/${post.slug}`"
              class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
            >
              읽어보기
              <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>
      
      <!-- 더 많은 포스트 보기 -->
      <div class="text-center">
        <UButton 
          to="/blog" 
          variant="outline" 
          size="lg"
          class="px-8 py-3"
        >
          모든 포스트 보기
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 최근 블로그 포스트 데이터
const recentPosts = [
  {
    slug: 'nuxt3-performance-optimization',
    title: 'Nuxt 3 성능 최적화 완벽 가이드',
    description: 'Nuxt 3 애플리케이션의 성능을 극대화하는 다양한 기법들을 소개합니다. 코드 스플리팅, 이미지 최적화, SSR 최적화 등을 다룹니다.',
    category: 'Frontend',
    emoji: '⚡',
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['Nuxt3', 'Performance', 'Optimization', 'SSR']
  },
  {
    slug: 'typescript-advanced-patterns',
    title: 'TypeScript 고급 패턴과 실무 활용법',
    description: 'TypeScript의 고급 타입 시스템을 활용한 실무 패턴들을 소개합니다. 제네릭, 유틸리티 타입, 조건부 타입 등을 다룹니다.',
    category: 'TypeScript',
    emoji: '📘',
    publishedAt: '2024-01-10',
    readTime: 12,
    tags: ['TypeScript', 'Advanced', 'Patterns', 'Types']
  },
  {
    slug: 'vue3-composition-api-best-practices',
    title: 'Vue 3 Composition API 베스트 프랙티스',
    description: 'Vue 3 Composition API를 효과적으로 사용하는 방법과 실무에서 적용할 수 있는 패턴들을 소개합니다.',
    category: 'Vue.js',
    emoji: '🟢',
    publishedAt: '2024-01-05',
    readTime: 10,
    tags: ['Vue3', 'Composition API', 'Best Practices', 'Patterns']
  }
]

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

console.log('최근 블로그 포스트 컴포넌트 로드됨')
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>