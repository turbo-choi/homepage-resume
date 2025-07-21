<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 로딩 상태 -->
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-300">포스트를 불러오는 중...</p>
      </div>
    </div>
    
    <!-- 에러 상태 -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-6xl mb-4">😵</div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          포스트를 찾을 수 없습니다
        </h1>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          요청하신 블로그 포스트가 존재하지 않거나 삭제되었습니다.
        </p>
        <UButton to="/blog" variant="outline">
          블로그 목록으로 돌아가기
        </UButton>
      </div>
    </div>
    
    <!-- 포스트 내용 -->
    <article v-else-if="post" class="bg-white dark:bg-gray-800">
      <!-- 포스트 헤더 -->
      <header class="relative overflow-hidden">
        <!-- 배경 그라디언트 -->
        <div 
          class="absolute inset-0 opacity-10"
          :style="{ background: post.gradient }"
        ></div>
        
        <div class="relative section-padding">
          <div class="container-custom">
            <!-- 브레드크럼 -->
            <nav class="mb-8">
              <ol class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <NuxtLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    홈
                  </NuxtLink>
                </li>
                <li class="flex items-center">
                  <ChevronRight class="w-4 h-4 mx-2" />
                  <NuxtLink to="/blog" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    블로그
                  </NuxtLink>
                </li>
                <li class="flex items-center">
                  <ChevronRight class="w-4 h-4 mx-2" />
                  <span class="text-gray-900 dark:text-white font-medium">{{ post.category }}</span>
                </li>
              </ol>
            </nav>
            
            <!-- 포스트 메타 정보 -->
            <div class="max-w-4xl mx-auto text-center">
              <!-- 카테고리와 이모지 -->
              <div class="flex items-center justify-center gap-4 mb-6">
                <span class="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  {{ post.category }}
                </span>
                <div class="text-4xl">{{ post.emoji }}</div>
              </div>
              
              <!-- 제목 -->
              <h1 class="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {{ post.title }}
              </h1>
              
              <!-- 요약 -->
              <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {{ post.excerpt }}
              </p>
              
              <!-- 메타 정보 -->
              <div class="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
                <div class="flex items-center gap-2">
                  <Calendar class="w-4 h-4" />
                  <time :datetime="post.publishedAt">
                    {{ formatDate(post.publishedAt) }}
                  </time>
                </div>
                <div class="flex items-center gap-2">
                  <Clock class="w-4 h-4" />
                  <span>{{ post.readTime }}분 읽기</span>
                </div>
                <div class="flex items-center gap-2">
                  <Eye class="w-4 h-4" />
                  <span>{{ post.views }} 조회</span>
                </div>
              </div>
              
              <!-- 태그 -->
              <div class="flex flex-wrap justify-center gap-2 mt-8">
                <span 
                  v-for="tag in post.tags" 
                  :key="tag"
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <!-- 포스트 본문 -->
      <main class="section-padding bg-gray-50 dark:bg-gray-900">
        <div class="container-custom">
          <div class="max-w-4xl mx-auto">
            <!-- 목차 (Table of Contents) -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <List class="w-5 h-5" />
                목차
              </h2>
              <nav class="space-y-2">
                <a 
                  v-for="(section, index) in tableOfContents" 
                  :key="index"
                  :href="`#${section.id}`"
                  class="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  :class="{
                    'pl-0': section.level === 1,
                    'pl-4': section.level === 2,
                    'pl-8': section.level === 3
                  }"
                >
                  {{ section.title }}
                </a>
              </nav>
            </div>
            
            <!-- 포스트 내용 -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 lg:p-12 shadow-lg prose prose-lg dark:prose-invert max-w-none">
              <!-- 실제 블로그 내용은 Nuxt Content로 관리 -->
              <div v-html="post.content"></div>
            </div>
            
            <!-- 공유 버튼 -->
            <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Share2 class="w-5 h-5" />
                이 포스트 공유하기
              </h3>
              <div class="flex flex-wrap gap-3">
                <UButton
                  @click="shareToTwitter"
                  variant="outline"
                  size="sm"
                  class="flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </UButton>
                
                <UButton
                  @click="shareToFacebook"
                  variant="outline"
                  size="sm"
                  class="flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </UButton>
                
                <UButton
                  @click="copyToClipboard"
                  variant="outline"
                  size="sm"
                  class="flex items-center gap-2"
                >
                  <Copy class="w-4 h-4" />
                  링크 복사
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <!-- 관련 포스트 -->
      <section class="section-padding bg-white dark:bg-gray-800">
        <div class="container-custom">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              관련 포스트
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article 
                v-for="relatedPost in relatedPosts" 
                :key="relatedPost.slug"
                class="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg card-hover group"
              >
                <NuxtLink :to="`/blog/${relatedPost.slug}`">
                  <div class="relative h-32 overflow-hidden">
                    <div 
                      class="absolute inset-0 bg-gradient-to-br transition-all duration-300 group-hover:scale-110"
                      :style="{ background: relatedPost.gradient }"
                    >
                      <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-2xl opacity-80">{{ relatedPost.emoji }}</div>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
                
                <div class="p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {{ relatedPost.category }}
                  </div>
                  
                  <NuxtLink :to="`/blog/${relatedPost.slug}`">
                    <h3 class="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {{ relatedPost.title }}
                    </h3>
                  </NuxtLink>
                  
                  <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                    {{ relatedPost.excerpt }}
                  </p>
                  
                  <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <time :datetime="relatedPost.publishedAt">
                      {{ formatDate(relatedPost.publishedAt) }}
                    </time>
                    <span>{{ relatedPost.readTime }}분</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 댓글 섹션 -->
      <section class="section-padding bg-gray-50 dark:bg-gray-900">
        <div class="container-custom">
          <div class="max-w-4xl mx-auto">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageCircle class="w-6 h-6" />
                댓글
              </h2>
              
              <!-- 댓글 시스템 (Disqus, Gitalk 등으로 대체 가능) -->
              <div class="space-y-6">
                <!-- 댓글 작성 폼 -->
                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    댓글 남기기
                  </h3>
                  <form @submit.prevent="submitComment" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <UInput
                        v-model="commentForm.name"
                        placeholder="이름"
                        required
                      />
                      <UInput
                        v-model="commentForm.email"
                        type="email"
                        placeholder="이메일 (공개되지 않음)"
                        required
                      />
                    </div>
                    <UTextarea
                      v-model="commentForm.content"
                      placeholder="댓글을 입력하세요..."
                      :rows="4"
                      required
                    />
                    <div class="flex justify-end">
                      <UButton type="submit" :loading="isSubmittingComment">
                        댓글 등록
                      </UButton>
                    </div>
                  </form>
                </div>
                
                <!-- 기존 댓글 목록 -->
                <div class="space-y-4">
                  <div 
                    v-for="comment in comments" 
                    :key="comment.id"
                    class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <span class="text-blue-600 dark:text-blue-400 font-medium text-sm">
                            {{ comment.name.charAt(0).toUpperCase() }}
                          </span>
                        </div>
                        <div>
                          <div class="font-medium text-gray-900 dark:text-white">
                            {{ comment.name }}
                          </div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            {{ formatDate(comment.createdAt) }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {{ comment.content }}
                    </p>
                  </div>
                  
                  <!-- 댓글이 없을 때 -->
                  <div v-if="comments.length === 0" class="text-center py-8">
                    <MessageCircle class="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p class="text-gray-500 dark:text-gray-400">
                      아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Calendar, Clock, Eye, ChevronRight, List, Share2, Copy, 
  MessageCircle 
} from 'lucide-vue-next'

// 라우트 파라미터
const route = useRoute()
const slug = route.params.slug as string

// 로딩 및 에러 상태
const pending = ref(false)
const error = ref(false)

// 댓글 폼 상태
const commentForm = ref({
  name: '',
  email: '',
  content: ''
})
const isSubmittingComment = ref(false)

// 블로그 포스트 데이터 (실제로는 Nuxt Content에서 가져옴)
const blogPostsData = {
  'nuxt3-performance-optimization': {
    slug: 'nuxt3-performance-optimization',
    title: 'Nuxt 3 성능 최적화 완벽 가이드',
    excerpt: 'Nuxt 3 애플리케이션의 성능을 극대화하는 다양한 기법들을 소개합니다. 코드 스플리팅, 이미지 최적화, SSR 최적화 등을 다룹니다.',
    category: 'Frontend',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    publishedAt: '2024-01-15',
    readTime: 8,
    views: 1250,
    tags: ['Nuxt3', 'Performance', 'Optimization', 'SSR', 'Vue3'],
    content: `
      <h2 id="introduction">소개</h2>
      <p>Nuxt 3는 Vue.js 기반의 강력한 프레임워크로, 뛰어난 성능과 개발자 경험을 제공합니다. 하지만 대규모 애플리케이션에서는 성능 최적화가 필수적입니다.</p>
      
      <h2 id="code-splitting">코드 스플리팅</h2>
      <p>Nuxt 3는 자동으로 코드 스플리팅을 수행하지만, 추가적인 최적화가 가능합니다.</p>
      <pre><code>// 동적 임포트를 활용한 컴포넌트 지연 로딩
const LazyComponent = defineAsyncComponent(() => import('~/components/Heavy.vue'))</code></pre>
      
      <h2 id="image-optimization">이미지 최적화</h2>
      <p>@nuxt/image 모듈을 사용하여 이미지를 자동으로 최적화할 수 있습니다.</p>
      
      <h2 id="ssr-optimization">SSR 최적화</h2>
      <p>서버 사이드 렌더링 성능을 향상시키는 다양한 기법들을 알아봅시다.</p>
      
      <h2 id="conclusion">결론</h2>
      <p>이러한 최적화 기법들을 적용하면 Nuxt 3 애플리케이션의 성능을 크게 향상시킬 수 있습니다.</p>
    `
  },
  'typescript-advanced-patterns': {
    slug: 'typescript-advanced-patterns',
    title: 'TypeScript 고급 패턴과 실무 활용법',
    excerpt: 'TypeScript의 고급 타입 시스템을 활용한 실무 패턴들을 소개합니다. 제네릭, 유틸리티 타입, 조건부 타입 등을 다룹니다.',
    category: 'TypeScript',
    emoji: '📘',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    publishedAt: '2024-01-10',
    readTime: 12,
    views: 980,
    tags: ['TypeScript', 'Advanced', 'Patterns', 'Types', 'JavaScript'],
    content: `
      <h2 id="generics">제네릭 활용</h2>
      <p>TypeScript의 제네릭을 활용하여 재사용 가능한 타입 안전한 코드를 작성하는 방법을 알아봅시다.</p>
      
      <h2 id="utility-types">유틸리티 타입</h2>
      <p>TypeScript에서 제공하는 유틸리티 타입들을 실무에서 효과적으로 활용하는 방법을 설명합니다.</p>
      
      <h2 id="conditional-types">조건부 타입</h2>
      <p>조건부 타입을 사용하여 복잡한 타입 로직을 구현하는 고급 패턴들을 소개합니다.</p>
    `
  }
}

// 현재 포스트 데이터
const post = computed(() => {
  const postData = blogPostsData[slug as keyof typeof blogPostsData]
  if (!postData) {
    error.value = true
    return null
  }
  return postData
})

// 목차 데이터
const tableOfContents = computed(() => {
  if (!post.value) return []
  
  // 실제로는 포스트 내용에서 헤딩을 파싱하여 생성
  const toc = [
    { id: 'introduction', title: '소개', level: 1 },
    { id: 'code-splitting', title: '코드 스플리팅', level: 1 },
    { id: 'image-optimization', title: '이미지 최적화', level: 1 },
    { id: 'ssr-optimization', title: 'SSR 최적화', level: 1 },
    { id: 'conclusion', title: '결론', level: 1 }
  ]
  
  return toc
})

// 관련 포스트 (같은 카테고리 또는 태그)
const relatedPosts = computed(() => {
  if (!post.value) return []
  
  // 실제로는 현재 포스트와 관련된 포스트들을 필터링
  return [
    {
      slug: 'vue3-composition-api-best-practices',
      title: 'Vue 3 Composition API 베스트 프랙티스',
      excerpt: 'Vue 3 Composition API를 효과적으로 사용하는 방법과 실무에서 적용할 수 있는 패턴들을 소개합니다.',
      category: 'Vue.js',
      emoji: '🟢',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      publishedAt: '2024-01-05',
      readTime: 10
    },
    {
      slug: 'css-grid-flexbox-layout',
      title: 'CSS Grid와 Flexbox로 완벽한 레이아웃 만들기',
      excerpt: 'CSS Grid와 Flexbox의 차이점을 이해하고, 각각의 장점을 활용하여 반응형 레이아웃을 구성하는 방법을 설명합니다.',
      category: 'Frontend',
      emoji: '🎨',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      publishedAt: '2023-12-15',
      readTime: 12
    }
  ]
})

// 댓글 데이터 (실제로는 API에서 가져옴)
const comments = ref([
  {
    id: 1,
    name: '김개발',
    content: '정말 유용한 정보네요! 특히 코드 스플리팅 부분이 도움이 많이 되었습니다.',
    createdAt: '2024-01-16'
  },
  {
    id: 2,
    name: '이프론트',
    content: '이미지 최적화 부분도 실무에 바로 적용할 수 있을 것 같아요. 감사합니다!',
    createdAt: '2024-01-17'
  }
])

// SEO 메타 태그 설정
useHead(() => {
  if (!post.value) return {}
  
  return {
    title: `${post.value.title} - 개발자 포트폴리오`,
    meta: [
      {
        name: 'description',
        content: post.value.excerpt
      },
      {
        property: 'og:title',
        content: post.value.title
      },
      {
        property: 'og:description',
        content: post.value.excerpt
      },
      {
        property: 'og:type',
        content: 'article'
      },
      {
        property: 'article:published_time',
        content: post.value.publishedAt
      },
      {
        property: 'article:tag',
        content: post.value.tags.join(', ')
      }
    ]
  }
})

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 공유 함수들
const shareToTwitter = () => {
  if (!post.value) return
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.value.title)}&url=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank')
  console.log('Twitter 공유')
}

const shareToFacebook = () => {
  if (!post.value) return
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank')
  console.log('Facebook 공유')
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    // 토스트 메시지 표시 (실제로는 UToast 사용)
    alert('링크가 클립보드에 복사되었습니다!')
    console.log('링크 복사됨')
  } catch (err) {
    console.error('링크 복사 실패:', err)
  }
}

// 댓글 제출 함수
const submitComment = async () => {
  if (!commentForm.value.name || !commentForm.value.email || !commentForm.value.content) {
    alert('모든 필드를 입력해주세요.')
    return
  }
  
  isSubmittingComment.value = true
  
  try {
    // 실제로는 API 호출
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 새 댓글 추가
    const newComment = {
      id: comments.value.length + 1,
      name: commentForm.value.name,
      content: commentForm.value.content,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    comments.value.unshift(newComment)
    
    // 폼 초기화
    commentForm.value = {
      name: '',
      email: '',
      content: ''
    }
    
    alert('댓글이 등록되었습니다!')
    console.log('댓글 등록됨:', newComment)
  } catch (error) {
    console.error('댓글 등록 실패:', error)
    alert('댓글 등록에 실패했습니다. 다시 시도해주세요.')
  } finally {
    isSubmittingComment.value = false
  }
}

console.log('블로그 포스트 페이지 로드됨:', slug)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 프로즈 스타일 커스터마이징 */
.prose {
  color: inherit;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3;
}

.prose p {
  @apply text-gray-700 dark:text-gray-300 leading-relaxed mb-4;
}

.prose pre {
  @apply bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono;
}

.prose blockquote {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400;
}

.prose ul, .prose ol {
  @apply ml-6 mb-4;
}

.prose li {
  @apply mb-2;
}

.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}
</style>