<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 헤더 섹션 -->
    <section class="section-padding bg-white dark:bg-gray-800">
      <div class="container-custom text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          포트폴리오
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          다양한 도메인에서 사용자 중심의 웹 애플리케이션을 개발한 프로젝트들을 소개합니다.
        </p>
        
        <!-- 필터 버튼 -->
        <div class="flex flex-wrap justify-center gap-3">
          <UButton
            v-for="category in categories"
            :key="category"
            :variant="selectedCategory === category ? 'solid' : 'outline'"
            @click="filterProjects(category)"
            class="px-6 py-2"
          >
            {{ category }}
          </UButton>
        </div>
      </div>
    </section>
    
    <!-- 프로젝트 그리드 -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg card-hover group"
          >
            <!-- 프로젝트 썸네일 -->
            <div class="relative h-64 overflow-hidden">
              <div 
                class="absolute inset-0 bg-gradient-to-br transition-all duration-300 group-hover:scale-110"
                :style="{ background: project.gradient }"
              >
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-6xl opacity-80">{{ project.emoji }}</div>
                </div>
              </div>
              
              <!-- 프로젝트 상태 배지 -->
              <div class="absolute top-4 right-4">
                <span 
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="getStatusBadgeClass(project.status)"
                >
                  {{ project.status }}
                </span>
              </div>
              
              <!-- 카테고리 배지 -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ project.category }}
                </span>
              </div>
            </div>
            
            <!-- 프로젝트 정보 -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ project.title }}
              </h3>
              
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {{ project.description }}
              </p>
              
              <!-- 기술 스택 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span 
                  v-for="tech in project.technologies.slice(0, 4)" 
                  :key="tech"
                  class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm font-medium"
                >
                  {{ tech }}
                </span>
                <span 
                  v-if="project.technologies.length > 4"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-sm font-medium"
                >
                  +{{ project.technologies.length - 4 }}
                </span>
              </div>
              
              <!-- 액션 버튼 -->
              <div class="flex space-x-3">
                <UButton 
                  :to="`/portfolio/${project.slug}`"
                  variant="solid"
                  size="sm"
                  class="flex-1"
                >
                  자세히 보기
                </UButton>
                
                <UButton 
                  v-if="project.demoUrl"
                  :to="project.demoUrl"
                  variant="outline"
                  size="sm"
                  external
                  target="_blank"
                  icon="i-heroicons-arrow-top-right-on-square"
                />
                
                <UButton 
                  v-if="project.githubUrl"
                  :to="project.githubUrl"
                  variant="ghost"
                  size="sm"
                  external
                  target="_blank"
                  icon="i-simple-icons-github"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- 프로젝트가 없을 때 -->
        <div v-if="filteredProjects.length === 0" class="text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            해당 카테고리의 프로젝트가 없습니다
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            다른 카테고리를 선택해보세요.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// import { ref, computed } from 'vue'

// SEO 메타 태그 설정
useHead({
  title: '포트폴리오 - 개발자 포트폴리오',
  meta: [
    {
      name: 'description',
      content: '다양한 웹 애플리케이션 개발 프로젝트들을 확인하세요. Vue, Nuxt, TypeScript를 활용한 프로젝트들입니다.'
    }
  ]
})

// 선택된 카테고리 상태
const selectedCategory = ref('전체')

// 카테고리 목록
const categories = ['전체', 'E-Commerce', '소셜', '대시보드', '모바일 앱', '기타']

// 프로젝트 데이터
const projects = [
  {
    id: 1,
    title: 'E-Commerce 플랫폼',
    slug: 'ecommerce-platform',
    description: 'Vue 3와 Nuxt 3를 활용한 현대적인 전자상거래 플랫폼입니다. 사용자 친화적인 인터페이스와 관리자 대시보드를 포함하여 완전한 온라인 쇼핑 경험을 제공합니다.',
    category: 'E-Commerce',
    emoji: '🛒',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    status: '완료',
    technologies: ['Nuxt 3', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe', 'Pinia'],
    demoUrl: 'https://demo-ecommerce.vercel.app',
    githubUrl: 'https://github.com/username/ecommerce-platform'
  },
  {
    id: 2,
    title: '실시간 채팅 애플리케이션',
    slug: 'realtime-chat-app',
    description: 'Socket.io와 Vue 3를 사용한 실시간 채팅 애플리케이션입니다. 그룹 채팅, 파일 공유, 이모지 반응 등 다양한 기능을 지원합니다.',
    category: '소셜',
    emoji: '💬',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    status: '진행중',
    technologies: ['Vue 3', 'Socket.io', 'Node.js', 'MongoDB', 'Redis'],
    demoUrl: 'https://demo-chat.vercel.app',
    githubUrl: 'https://github.com/username/chat-app'
  },
  {
    id: 3,
    title: '프로젝트 관리 대시보드',
    slug: 'project-management-dashboard',
    description: '팀 협업을 위한 프로젝트 관리 대시보드입니다. 칸반 보드, 간트 차트, 실시간 알림 등의 기능을 제공합니다.',
    category: '대시보드',
    emoji: '📊',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    status: '완료',
    technologies: ['Nuxt 3', 'TypeScript', 'Chart.js', 'PostgreSQL', 'WebSocket'],
    demoUrl: 'https://demo-dashboard.vercel.app',
    githubUrl: 'https://github.com/username/dashboard'
  },
  {
    id: 4,
    title: '날씨 예보 모바일 앱',
    slug: 'weather-mobile-app',
    description: 'PWA 기술을 활용한 날씨 예보 모바일 애플리케이션입니다. 위치 기반 날씨 정보와 알림 기능을 제공합니다.',
    category: '모바일 앱',
    emoji: '🌤️',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    status: '완료',
    technologies: ['Vue 3', 'PWA', 'Geolocation API', 'Weather API', 'Service Worker'],
    demoUrl: 'https://demo-weather.vercel.app',
    githubUrl: 'https://github.com/username/weather-app'
  },
  {
    id: 5,
    title: '블로그 CMS',
    slug: 'blog-cms',
    description: 'Nuxt Content를 활용한 정적 블로그 CMS입니다. 마크다운 에디터, 태그 시스템, 검색 기능을 포함합니다.',
    category: '기타',
    emoji: '📝',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    status: '완료',
    technologies: ['Nuxt 3', 'Nuxt Content', 'Markdown', 'Algolia Search', 'Tailwind CSS'],
    demoUrl: 'https://demo-blog.vercel.app',
    githubUrl: 'https://github.com/username/blog-cms'
  },
  {
    id: 6,
    title: '온라인 학습 플랫폼',
    slug: 'learning-platform',
    description: '비디오 스트리밍과 진도 추적 기능을 갖춘 온라인 학습 플랫폼입니다. 강사와 학생을 위한 별도 인터페이스를 제공합니다.',
    category: '기타',
    emoji: '🎓',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    status: '진행중',
    technologies: ['Nuxt 3', 'Video.js', 'Firebase', 'Stripe', 'WebRTC'],
    githubUrl: 'https://github.com/username/learning-platform'
  }
]

// 필터링된 프로젝트 계산
const filteredProjects = computed(() => {
  if (selectedCategory.value === '전체') {
    return projects
  }
  return projects.filter(project => project.category === selectedCategory.value)
})

// 프로젝트 필터링 함수
const filterProjects = (category: string) => {
  selectedCategory.value = category
  console.log('카테고리 필터링:', category)
}

// 상태 배지 클래스 반환 함수
const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case '완료':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    case '진행중':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    case '계획중':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
  }
}

console.log('포트폴리오 페이지 로드됨')
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>