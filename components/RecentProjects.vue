<template>
  <section class="section-padding bg-gray-50 dark:bg-gray-800">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          최근 프로젝트
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          다양한 도메인에서 사용자 중심의 웹 애플리케이션을 개발했습니다.
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div 
          v-for="project in featuredProjects" 
          :key="project.id"
          class="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg card-hover group"
        >
          <!-- 프로젝트 이미지 -->
          <div class="relative h-64 bg-gradient-to-br from-blue-400 to-cyan-400 overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-6xl opacity-80">{{ project.emoji }}</div>
            </div>
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ project.status }}
              </span>
            </div>
          </div>
          
          <!-- 프로젝트 정보 -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {{ project.description }}
            </p>
            
            <!-- 기술 스택 태그 -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {{ tech }}
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
              >
                데모 보기
              </UButton>
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
      
      <!-- 더 많은 프로젝트 보기 -->
      <div class="text-center">
        <UButton 
          to="/portfolio" 
          variant="outline" 
          size="lg"
          class="px-8 py-3"
        >
          모든 프로젝트 보기
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 주요 프로젝트 데이터
const featuredProjects = [
  {
    id: 1,
    title: 'E-Commerce 플랫폼',
    slug: 'ecommerce-platform',
    description: 'Vue 3와 Nuxt 3를 활용한 현대적인 전자상거래 플랫폼입니다. 사용자 친화적인 인터페이스와 관리자 대시보드를 포함하여 완전한 온라인 쇼핑 경험을 제공합니다.',
    emoji: '🛒',
    status: '완료',
    technologies: ['Nuxt 3', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe'],
    demoUrl: 'https://demo-ecommerce.vercel.app',
    githubUrl: 'https://github.com/username/ecommerce-platform'
  },
  {
    id: 2,
    title: '실시간 채팅 애플리케이션',
    slug: 'realtime-chat-app',
    description: 'Socket.io와 Vue 3를 사용한 실시간 채팅 애플리케이션입니다. 그룹 채팅, 파일 공유, 이모지 반응 등 다양한 기능을 지원합니다.',
    emoji: '💬',
    status: '진행중',
    technologies: ['Vue 3', 'Socket.io', 'Node.js', 'MongoDB', 'Redis'],
    demoUrl: 'https://demo-chat.vercel.app',
    githubUrl: 'https://github.com/username/chat-app'
  }
]

console.log('최근 프로젝트 컴포넌트 로드됨')
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>