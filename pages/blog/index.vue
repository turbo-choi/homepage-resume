<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 헤더 섹션 -->
    <section class="section-padding bg-white dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            개발 블로그
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            개발 경험과 기술적 인사이트를 공유합니다. 최신 웹 기술 트렌드와 실무 노하우를 다룹니다.
          </p>
        </div>
        
        <!-- 검색 및 필터 -->
        <div class="max-w-4xl mx-auto">
          <div class="flex flex-col lg:flex-row gap-4 mb-8">
            <!-- 검색 입력 -->
            <div class="flex-1">
              <UInput
                v-model="searchQuery"
                placeholder="제목이나 태그로 검색하세요..."
                icon="i-heroicons-magnifying-glass"
                size="lg"
                class="w-full"
              />
            </div>
            
            <!-- 카테고리 선택 -->
            <USelect
              v-model="selectedCategory"
              :options="categoryOptions"
              placeholder="카테고리 선택"
              size="lg"
              class="lg:w-48"
            />
          </div>
          
          <!-- 태그 필터 -->
          <div class="flex flex-wrap gap-2 justify-center">
            <UButton
              v-for="tag in popularTags"
              :key="tag"
              :variant="selectedTags.includes(tag) ? 'solid' : 'outline'"
              size="sm"
              @click="toggleTag(tag)"
            >
              #{{ tag }}
            </UButton>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 블로그 포스트 목록 -->
    <section class="section-padding">
      <div class="container-custom">
        <!-- 필터 결과 표시 -->
        <div v-if="searchQuery || selectedCategory !== '전체' || selectedTags.length > 0" class="mb-8">
          <div class="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>필터 결과:</span>
            <span class="font-medium text-gray-900 dark:text-white">{{ filteredPosts.length }}개 포스트</span>
            
            <!-- 필터 초기화 버튼 -->
            <UButton
              variant="ghost"
              size="xs"
              @click="clearFilters"
              class="ml-2"
            >
              필터 초기화
            </UButton>
          </div>
        </div>
        
        <!-- 포스트 그리드 -->
        <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in paginatedPosts" 
            :key="post.slug"
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg card-hover group"
          >
            <!-- 포스트 썸네일 -->
            <NuxtLink :to="`/blog/${post.slug}`">
              <div class="relative h-48 overflow-hidden">
                <div 
                  class="absolute inset-0 bg-gradient-to-br transition-all duration-300 group-hover:scale-110"
                  :style="{ background: post.gradient }"
                >
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-4xl opacity-80">{{ post.emoji }}</div>
                  </div>
                </div>
                
                <!-- 카테고리 배지 -->
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                    {{ post.category }}
                  </span>
                </div>
                
                <!-- 읽기 시간 -->
                <div class="absolute top-4 right-4">
                  <span class="px-2 py-1 bg-black/50 text-white rounded text-xs">
                    {{ post.readTime }}분
                  </span>
                </div>
              </div>
            </NuxtLink>
            
            <!-- 포스트 내용 -->
            <div class="p-6">
              <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <time :datetime="post.publishedAt">
                  {{ formatDate(post.publishedAt) }}
                </time>
                <span class="mx-2">•</span>
                <span>{{ post.views }} 조회</span>
              </div>
              
              <NuxtLink :to="`/blog/${post.slug}`">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ post.title }}
                </h3>
              </NuxtLink>
              
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {{ post.excerpt }}
              </p>
              
              <!-- 태그 -->
              <div class="flex flex-wrap gap-2 mb-4">
                <button 
                  v-for="tag in post.tags.slice(0, 3)" 
                  :key="tag"
                  @click="toggleTag(tag)"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  #{{ tag }}
                </button>
                <span 
                  v-if="post.tags.length > 3"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                >
                  +{{ post.tags.length - 3 }}
                </span>
              </div>
              
              <!-- 읽기 버튼 -->
              <NuxtLink 
                :to="`/blog/${post.slug}`"
                class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors group"
              >
                읽어보기
                <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </NuxtLink>
            </div>
          </article>
        </div>
        
        <!-- 포스트가 없을 때 -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            검색 결과가 없습니다
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            다른 키워드나 카테고리로 검색해보세요.
          </p>
          <UButton @click="clearFilters" variant="outline">
            모든 포스트 보기
          </UButton>
        </div>
        
        <!-- 페이지네이션 -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center">
          <UPagination
            v-model="currentPage"
            :page-count="postsPerPage"
            :total="filteredPosts.length"
            :max="5"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// SEO 메타 태그 설정
useHead({
  title: '블로그 - 개발자 포트폴리오',
  meta: [
    {
      name: 'description',
      content: '웹 개발 관련 기술 블로그입니다. Vue, Nuxt, TypeScript 등 최신 기술 트렌드와 실무 경험을 공유합니다.'
    }
  ]
})

// 반응형 상태
const searchQuery = ref('')
const selectedCategory = ref('전체')
const selectedTags = ref<string[]>([])
const currentPage = ref(1)
const postsPerPage = 9

// 카테고리 옵션
const categoryOptions = [
  { label: '전체', value: '전체' },
  { label: 'Frontend', value: 'Frontend' },
  { label: 'Backend', value: 'Backend' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Vue.js', value: 'Vue.js' },
  { label: '기타', value: '기타' }
]

// 인기 태그
const popularTags = [
  'Vue3', 'Nuxt3', 'TypeScript', 'JavaScript', 'CSS', 'Performance', 
  'SEO', 'Testing', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL'
]

// 블로그 포스트 데이터
const blogPosts = [
  {
    slug: 'nuxt3-performance-optimization',
    title: 'Nuxt 3 성능 최적화 완벽 가이드',
    excerpt: 'Nuxt 3 애플리케이션의 성능을 극대화하는 다양한 기법들을 소개합니다. 코드 스플리팅, 이미지 최적화, SSR 최적화 등을 다룹니다.',
    category: 'Frontend',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    publishedAt: '2024-01-15',
    readTime: 8,
    views: 1250,
    tags: ['Nuxt3', 'Performance', 'Optimization', 'SSR', 'Vue3']
  },
  {
    slug: 'typescript-advanced-patterns',
    title: 'TypeScript 고급 패턴과 실무 활용법',
    excerpt: 'TypeScript의 고급 타입 시스템을 활용한 실무 패턴들을 소개합니다. 제네릭, 유틸리티 타입, 조건부 타입 등을 다룹니다.',
    category: 'TypeScript',
    emoji: '📘',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    publishedAt: '2024-01-10',
    readTime: 12,
    views: 980,
    tags: ['TypeScript', 'Advanced', 'Patterns', 'Types', 'JavaScript']
  },
  {
    slug: 'vue3-composition-api-best-practices',
    title: 'Vue 3 Composition API 베스트 프랙티스',
    excerpt: 'Vue 3 Composition API를 효과적으로 사용하는 방법과 실무에서 적용할 수 있는 패턴들을 소개합니다.',
    category: 'Vue.js',
    emoji: '🟢',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    publishedAt: '2024-01-05',
    readTime: 10,
    views: 1450,
    tags: ['Vue3', 'Composition API', 'Best Practices', 'Patterns', 'JavaScript']
  },
  {
    slug: 'docker-nodejs-deployment',
    title: 'Docker를 활용한 Node.js 애플리케이션 배포',
    excerpt: 'Docker 컨테이너를 사용하여 Node.js 애플리케이션을 효율적으로 배포하는 방법을 단계별로 설명합니다.',
    category: 'DevOps',
    emoji: '🐳',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    publishedAt: '2023-12-28',
    readTime: 15,
    views: 820,
    tags: ['Docker', 'Node.js', 'Deployment', 'DevOps', 'Container']
  },
  {
    slug: 'mongodb-aggregation-pipeline',
    title: 'MongoDB Aggregation Pipeline 마스터하기',
    excerpt: 'MongoDB의 강력한 집계 파이프라인을 활용하여 복잡한 데이터 처리와 분석을 수행하는 방법을 알아봅니다.',
    category: 'Backend',
    emoji: '🍃',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    publishedAt: '2023-12-20',
    readTime: 18,
    views: 650,
    tags: ['MongoDB', 'Database', 'Aggregation', 'NoSQL', 'Backend']
  },
  {
    slug: 'css-grid-flexbox-layout',
    title: 'CSS Grid와 Flexbox로 완벽한 레이아웃 만들기',
    excerpt: 'CSS Grid와 Flexbox의 차이점을 이해하고, 각각의 장점을 활용하여 반응형 레이아웃을 구성하는 방법을 설명합니다.',
    category: 'Frontend',
    emoji: '🎨',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    publishedAt: '2023-12-15',
    readTime: 12,
    views: 1100,
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout', 'Responsive']
  }
]

// 필터링된 포스트 계산
const filteredPosts = computed(() => {
  let posts = [...blogPosts]
  
  // 검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  // 카테고리 필터링
  if (selectedCategory.value !== '전체') {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }
  
  // 태그 필터링
  if (selectedTags.value.length > 0) {
    posts = posts.filter(post => 
      selectedTags.value.some(tag => post.tags.includes(tag))
    )
  }
  
  // 날짜순 정렬 (최신순)
  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
})

// 페이지네이션된 포스트
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

// 총 페이지 수
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})

// 태그 토글 함수
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  currentPage.value = 1 // 필터 변경 시 첫 페이지로
  console.log('태그 토글:', tag, selectedTags.value)
}

// 필터 초기화 함수
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = '전체'
  selectedTags.value = []
  currentPage.value = 1
  console.log('필터 초기화됨')
}

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 필터 변경 시 첫 페이지로 이동
watch([searchQuery, selectedCategory, selectedTags], () => {
  currentPage.value = 1
}, { deep: true })

console.log('블로그 페이지 로드됨')
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