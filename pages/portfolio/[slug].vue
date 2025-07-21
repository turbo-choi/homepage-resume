<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 프로젝트 헤더 -->
    <section class="section-padding bg-white dark:bg-gray-800">
      <div class="container-custom">
        <!-- 뒤로가기 버튼 -->
        <div class="mb-8">
          <UButton 
            to="/portfolio" 
            variant="ghost" 
            icon="i-heroicons-arrow-left"
            class="mb-4"
          >
            포트폴리오로 돌아가기
          </UButton>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- 프로젝트 정보 -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <span 
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="getStatusBadgeClass(project?.status)"
              >
                {{ project?.status }}
              </span>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                {{ project?.category }}
              </span>
            </div>
            
            <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              {{ project?.title }}
            </h1>
            
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ project?.description }}
            </p>
            
            <!-- 액션 버튼 -->
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton 
                v-if="project?.demoUrl"
                :to="project.demoUrl"
                size="lg"
                external
                target="_blank"
                icon="i-heroicons-arrow-top-right-on-square"
                class="px-8 py-3"
              >
                라이브 데모 보기
              </UButton>
              
              <UButton 
                v-if="project?.githubUrl"
                :to="project.githubUrl"
                variant="outline"
                size="lg"
                external
                target="_blank"
                icon="i-simple-icons-github"
                class="px-8 py-3"
              >
                GitHub 보기
              </UButton>
            </div>
          </div>
          
          <!-- 프로젝트 이미지/아이콘 -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <div 
                class="w-80 h-80 rounded-2xl flex items-center justify-center shadow-2xl"
                :style="{ background: project?.gradient }"
              >
                <div class="text-8xl opacity-90">{{ project?.emoji }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 프로젝트 상세 정보 -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- 메인 콘텐츠 -->
          <div class="lg:col-span-2 space-y-12">
            <!-- 프로젝트 개요 -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">프로젝트 개요</h2>
              <div class="prose dark:prose-invert max-w-none">
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {{ project?.detailedDescription }}
                </p>
                
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">주요 기능</h3>
                <ul class="space-y-2">
                  <li 
                    v-for="feature in project?.features" 
                    :key="feature"
                    class="flex items-start space-x-3"
                  >
                    <CheckCircle class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-600 dark:text-gray-300">{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- 기술적 도전과 해결책 -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">기술적 도전과 해결책</h2>
              <div class="space-y-6">
                <div 
                  v-for="challenge in project?.challenges" 
                  :key="challenge.title"
                  class="border-l-4 border-blue-500 pl-6"
                >
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {{ challenge.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-3">
                    {{ challenge.problem }}
                  </p>
                  <p class="text-gray-700 dark:text-gray-200">
                    <strong>해결책:</strong> {{ challenge.solution }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- 성과 및 결과 -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">성과 및 결과</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  v-for="metric in project?.metrics" 
                  :key="metric.label"
                  class="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {{ metric.value }}
                  </div>
                  <div class="text-gray-600 dark:text-gray-300">
                    {{ metric.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 사이드바 -->
          <div class="space-y-8">
            <!-- 프로젝트 정보 -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">프로젝트 정보</h3>
              <div class="space-y-4">
                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">기간</dt>
                  <dd class="text-gray-900 dark:text-white">{{ project?.duration }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">역할</dt>
                  <dd class="text-gray-900 dark:text-white">{{ project?.role }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">팀 규모</dt>
                  <dd class="text-gray-900 dark:text-white">{{ project?.teamSize }}</dd>
                </div>
              </div>
            </div>
            
            <!-- 사용 기술 -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">사용 기술</h3>
              <div class="space-y-4">
                <div 
                  v-for="(techs, category) in project?.techStack" 
                  :key="category"
                >
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{{ category }}</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="tech in techs" 
                      :key="tech"
                      class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 관련 링크 -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">관련 링크</h3>
              <div class="space-y-3">
                <UButton 
                  v-if="project?.demoUrl"
                  :to="project.demoUrl"
                  variant="outline"
                  external
                  target="_blank"
                  icon="i-heroicons-arrow-top-right-on-square"
                  class="w-full justify-start"
                >
                  라이브 데모
                </UButton>
                
                <UButton 
                  v-if="project?.githubUrl"
                  :to="project.githubUrl"
                  variant="outline"
                  external
                  target="_blank"
                  icon="i-simple-icons-github"
                  class="w-full justify-start"
                >
                  GitHub 저장소
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 다른 프로젝트 -->
    <section class="section-padding bg-white dark:bg-gray-800">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          다른 프로젝트
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="otherProject in otherProjects" 
            :key="otherProject.id"
            :to="`/portfolio/${otherProject.slug}`"
            class="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden card-hover group"
          >
            <div 
              class="h-32 flex items-center justify-center"
              :style="{ background: otherProject.gradient }"
            >
              <div class="text-3xl opacity-80">{{ otherProject.emoji }}</div>
            </div>
            
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ otherProject.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {{ otherProject.category }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// import { CheckCircle } from 'lucide-vue-next'

// 라우트 파라미터 가져오기
const route = useRoute()
const slug = route.params.slug as string

// 프로젝트 데이터 (실제로는 API나 CMS에서 가져올 데이터)
const projectsData = {
  'ecommerce-platform': {
    id: 1,
    title: 'E-Commerce 플랫폼',
    slug: 'ecommerce-platform',
    description: 'Vue 3와 Nuxt 3를 활용한 현대적인 전자상거래 플랫폼입니다.',
    detailedDescription: '이 프로젝트는 현대적인 전자상거래 경험을 제공하는 풀스택 웹 애플리케이션입니다. 사용자 친화적인 쇼핑 인터페이스부터 강력한 관리자 대시보드까지, 온라인 비즈니스에 필요한 모든 기능을 포함하고 있습니다.',
    category: 'E-Commerce',
    emoji: '🛒',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    status: '완료',
    duration: '2023.03 - 2023.08 (6개월)',
    role: '풀스택 개발자 (팀 리드)',
    teamSize: '4명',
    technologies: ['Nuxt 3', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe', 'Pinia'],
    demoUrl: 'https://demo-ecommerce.vercel.app',
    githubUrl: 'https://github.com/username/ecommerce-platform',
    features: [
      '반응형 제품 카탈로그 및 검색 기능',
      'Stripe 결제 시스템 통합',
      '실시간 재고 관리',
      '사용자 리뷰 및 평점 시스템',
      '관리자 대시보드 및 주문 관리',
      'SEO 최적화 및 성능 최적화'
    ],
    challenges: [
      {
        title: '대용량 제품 데이터 처리',
        problem: '수천 개의 제품 데이터를 효율적으로 로딩하고 검색하는 것이 과제였습니다.',
        solution: '가상 스크롤링과 서버 사이드 페이지네이션을 구현하여 성능을 최적화했습니다.'
      },
      {
        title: '결제 시스템 보안',
        problem: '안전한 결제 처리와 사용자 데이터 보호가 중요했습니다.',
        solution: 'Stripe의 보안 결제 시스템을 통합하고 HTTPS 및 데이터 암호화를 적용했습니다.'
      }
    ],
    metrics: [
      { label: '페이지 로딩 속도', value: '1.2초' },
      { label: '전환율 개선', value: '35%' },
      { label: '모바일 사용자', value: '68%' },
      { label: '고객 만족도', value: '4.8/5' }
    ],
    techStack: {
      'Frontend': ['Nuxt 3', 'Vue 3', 'TypeScript', 'Tailwind CSS'],
      'Backend': ['Supabase', 'PostgreSQL', 'Edge Functions'],
      'Payment': ['Stripe', 'Webhook'],
      'Deployment': ['Vercel', 'CDN']
    }
  },
  'realtime-chat-app': {
    id: 2,
    title: '실시간 채팅 애플리케이션',
    slug: 'realtime-chat-app',
    description: 'Socket.io와 Vue 3를 사용한 실시간 채팅 애플리케이션입니다.',
    detailedDescription: '실시간 커뮤니케이션을 위한 현대적인 채팅 애플리케이션입니다. 개인 채팅부터 그룹 채팅까지, 다양한 커뮤니케이션 요구사항을 충족하는 기능들을 제공합니다.',
    category: '소셜',
    emoji: '💬',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    status: '진행중',
    duration: '2023.09 - 현재',
    role: '풀스택 개발자',
    teamSize: '2명',
    technologies: ['Vue 3', 'Socket.io', 'Node.js', 'MongoDB', 'Redis'],
    demoUrl: 'https://demo-chat.vercel.app',
    githubUrl: 'https://github.com/username/chat-app',
    features: [
      '실시간 메시지 전송 및 수신',
      '그룹 채팅방 생성 및 관리',
      '파일 및 이미지 공유',
      '이모지 반응 및 스티커',
      '메시지 검색 및 히스토리',
      '온라인 상태 표시'
    ],
    challenges: [
      {
        title: '실시간 성능 최적화',
        problem: '다수의 동시 접속자가 있을 때 메시지 전송 지연이 발생했습니다.',
        solution: 'Redis를 활용한 메시지 큐와 Socket.io 클러스터링을 구현했습니다.'
      },
      {
        title: '메시지 동기화',
        problem: '여러 디바이스에서 접속 시 메시지 동기화 문제가 있었습니다.',
        solution: '메시지 상태 관리 시스템과 오프라인 메시지 큐를 구현했습니다.'
      }
    ],
    metrics: [
      { label: '동시 접속자', value: '500+' },
      { label: '메시지 지연', value: '<100ms' },
      { label: '업타임', value: '99.9%' },
      { label: '일일 메시지', value: '10K+' }
    ],
    techStack: {
      'Frontend': ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Socket.io Client'],
      'Backend': ['Node.js', 'Express', 'Socket.io', 'JWT'],
      'Database': ['MongoDB', 'Redis'],
      'Deployment': ['Docker', 'AWS EC2', 'CloudFront']
    }
  }
}

// 현재 프로젝트 데이터
const project = computed(() => projectsData[slug as keyof typeof projectsData])

// 다른 프로젝트들 (현재 프로젝트 제외)
const otherProjects = computed(() => {
  return Object.values(projectsData)
    .filter(p => p.slug !== slug)
    .slice(0, 3)
})

// 상태 배지 클래스 반환 함수
const getStatusBadgeClass = (status: string | undefined) => {
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

// 프로젝트가 없으면 404 처리
if (!project.value) {
  throw createError({
    status: 404,
    statusText: '프로젝트를 찾을 수 없습니다.'
  })
}

// SEO 메타 태그 설정
useHead({
  title: `${project.value.title} - 포트폴리오`,
  meta: [
    {
      name: 'description',
      content: project.value.description
    },
    {
      property: 'og:title',
      content: `${project.value.title} - 개발자 포트폴리오`
    },
    {
      property: 'og:description',
      content: project.value.description
    }
  ]
})

console.log('프로젝트 상세 페이지 로드됨:', slug)
</script>