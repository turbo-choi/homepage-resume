<template>
  <section class="section-padding bg-white dark:bg-gray-900">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          기술 스택
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          다양한 기술을 활용하여 효율적이고 확장 가능한 솔루션을 개발합니다.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="category in techCategories" 
          :key="category.name"
          class="space-y-6"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white text-center">
            {{ category.name }}
          </h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="tech in category.technologies" 
              :key="tech.name"
              class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center card-hover group"
            >
              <div class="mb-3">
                <div 
                  class="w-12 h-12 mx-auto rounded-lg flex items-center justify-center text-2xl"
                  :style="{ backgroundColor: tech.color + '20', color: tech.color }"
                >
                  {{ tech.icon }}
                </div>
              </div>
              <h4 class="font-medium text-gray-900 dark:text-white text-sm mb-1">
                {{ tech.name }}
              </h4>
              <div class="flex justify-center">
                <div class="flex space-x-1">
                  <div 
                    v-for="i in 5" 
                    :key="i"
                    class="w-2 h-2 rounded-full"
                    :class="i <= tech.level ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 추가 정보 -->
      <div class="mt-16 text-center">
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            지속적인 학습과 성장
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            새로운 기술 트렌드를 빠르게 습득하고, 프로젝트에 적용하여 
            더 나은 사용자 경험을 제공하기 위해 노력합니다.
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <span 
              v-for="learning in currentlyLearning" 
              :key="learning"
              class="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
            >
              🔥 {{ learning }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 기술 카테고리 및 기술 스택 정의
const techCategories = [
  {
    name: 'Frontend',
    technologies: [
      { name: 'Vue.js', icon: '🟢', color: '#4FC08D', level: 5 },
      { name: 'Nuxt.js', icon: '🚀', color: '#00DC82', level: 5 },
      { name: 'TypeScript', icon: '📘', color: '#3178C6', level: 4 },
      { name: 'Tailwind', icon: '🎨', color: '#06B6D4', level: 5 }
    ]
  },
  {
    name: 'Backend',
    technologies: [
      { name: 'Node.js', icon: '🟩', color: '#339933', level: 4 },
      { name: 'Express', icon: '⚡', color: '#000000', level: 4 },
      { name: 'Python', icon: '🐍', color: '#3776AB', level: 3 },
      { name: 'FastAPI', icon: '🔥', color: '#009688', level: 3 }
    ]
  },
  {
    name: 'Database',
    technologies: [
      { name: 'MongoDB', icon: '🍃', color: '#47A248', level: 4 },
      { name: 'PostgreSQL', icon: '🐘', color: '#336791', level: 3 },
      { name: 'Redis', icon: '🔴', color: '#DC382D', level: 3 },
      { name: 'Supabase', icon: '⚡', color: '#3ECF8E', level: 4 }
    ]
  },
  {
    name: 'DevOps',
    technologies: [
      { name: 'Docker', icon: '🐳', color: '#2496ED', level: 3 },
      { name: 'AWS', icon: '☁️', color: '#FF9900', level: 3 },
      { name: 'Vercel', icon: '▲', color: '#000000', level: 4 },
      { name: 'GitHub', icon: '🐙', color: '#181717', level: 5 }
    ]
  }
]

// 현재 학습 중인 기술들
const currentlyLearning = [
  'Next.js 14',
  'Rust',
  'GraphQL',
  'Kubernetes',
  'AI/ML'
]

console.log('기술 스택 컴포넌트 로드됨')
</script>