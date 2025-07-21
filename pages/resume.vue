<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 헤더 섹션 -->
    <section class="section-padding bg-white dark:bg-gray-800">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- 프로필 정보 -->
          <div class="lg:col-span-1">
            <div class="text-center lg:text-left">
              <div class="w-48 h-48 mx-auto lg:mx-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mb-6">
                <span class="text-6xl">👨‍💻</span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">김개발</h1>
              <p class="text-xl text-blue-600 dark:text-blue-400 mb-4">풀스택 개발자</p>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                사용자 중심의 웹 애플리케이션을 개발하며, 최신 기술 스택을 활용해 혁신적인 솔루션을 만들어갑니다.
              </p>
              
              <!-- 연락처 정보 -->
              <div class="space-y-3">
                <div class="flex items-center justify-center lg:justify-start space-x-3">
                  <Mail class="w-5 h-5 text-gray-500" />
                  <span class="text-gray-700 dark:text-gray-300">contact@example.com</span>
                </div>
                <div class="flex items-center justify-center lg:justify-start space-x-3">
                  <Phone class="w-5 h-5 text-gray-500" />
                  <span class="text-gray-700 dark:text-gray-300">010-1234-5678</span>
                </div>
                <div class="flex items-center justify-center lg:justify-start space-x-3">
                  <MapPin class="w-5 h-5 text-gray-500" />
                  <span class="text-gray-700 dark:text-gray-300">서울, 대한민국</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 요약 및 주요 정보 -->
          <div class="lg:col-span-2 space-y-8">
            <!-- 요약 -->
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">요약</h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                5년 이상의 웹 개발 경험을 가진 풀스택 개발자입니다. Vue.js, Nuxt.js를 중심으로 한 프론트엔드 개발과 
                Node.js, Python을 활용한 백엔드 개발에 전문성을 가지고 있습니다. 사용자 경험을 최우선으로 하는 
                애플리케이션 개발에 열정을 가지고 있으며, 팀워크와 지속적인 학습을 중요하게 생각합니다.
              </p>
            </div>
            
            <!-- 핵심 역량 -->
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">핵심 역량</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="skill in coreSkills" 
                  :key="skill.name"
                  class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-gray-900 dark:text-white">{{ skill.name }}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      :style="{ width: skill.level + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 경력 섹션 -->
    <section class="section-padding">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">경력</h2>
        
        <div class="space-y-8">
          <div 
            v-for="(experience, index) in workExperience" 
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ experience.position }}</h3>
                <p class="text-lg text-blue-600 dark:text-blue-400">{{ experience.company }}</p>
              </div>
              <div class="text-gray-500 dark:text-gray-400 mt-2 lg:mt-0">
                {{ experience.period }}
              </div>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ experience.description }}</p>
            
            <div class="space-y-3">
              <h4 class="font-semibold text-gray-900 dark:text-white">주요 성과:</h4>
              <ul class="space-y-2">
                <li 
                  v-for="achievement in experience.achievements" 
                  :key="achievement"
                  class="flex items-start space-x-3"
                >
                  <CheckCircle class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span class="text-gray-600 dark:text-gray-300">{{ achievement }}</span>
                </li>
              </ul>
            </div>
            
            <div class="mt-4">
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in experience.technologies" 
                  :key="tech"
                  class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 학력 및 자격증 섹션 -->
    <section class="section-padding bg-white dark:bg-gray-800">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- 학력 -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">학력</h2>
            <div class="space-y-6">
              <div 
                v-for="education in educationHistory" 
                :key="education.school"
                class="border-l-4 border-blue-500 pl-6"
              >
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ education.degree }}</h3>
                <p class="text-blue-600 dark:text-blue-400">{{ education.school }}</p>
                <p class="text-gray-500 dark:text-gray-400">{{ education.period }}</p>
                <p class="text-gray-600 dark:text-gray-300 mt-2">{{ education.description }}</p>
              </div>
            </div>
          </div>
          
          <!-- 자격증 -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">자격증</h2>
            <div class="space-y-4">
              <div 
                v-for="cert in certifications" 
                :key="cert.name"
                class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ cert.name }}</h3>
                <p class="text-gray-600 dark:text-gray-300">{{ cert.issuer }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ cert.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

// SEO 메타 태그 설정
useHead({
  title: '이력서 - 개발자 포트폴리오',
  meta: [
    {
      name: 'description',
      content: '풀스택 개발자 김개발의 상세한 이력서입니다. 경력, 기술 스택, 학력 정보를 확인하세요.'
    }
  ]
})

// 핵심 역량 데이터
const coreSkills = [
  { name: 'Vue.js / Nuxt.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'Database Design', level: 85 },
  { name: 'DevOps / CI/CD', level: 75 }
]

// 경력 데이터
const workExperience = [
  {
    position: '시니어 풀스택 개발자',
    company: '테크 스타트업 ABC',
    period: '2022.03 - 현재',
    description: '웹 애플리케이션 개발 팀을 리드하며, 프론트엔드와 백엔드 개발을 담당하고 있습니다.',
    achievements: [
      '사용자 경험 개선으로 전환율 35% 향상',
      '마이크로서비스 아키텍처 도입으로 시스템 안정성 40% 개선',
      '신입 개발자 3명 멘토링 및 온보딩 프로세스 구축',
      'CI/CD 파이프라인 구축으로 배포 시간 70% 단축'
    ],
    technologies: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    position: '풀스택 개발자',
    company: '디지털 에이전시 XYZ',
    period: '2020.01 - 2022.02',
    description: '다양한 클라이언트 프로젝트의 웹 애플리케이션 개발을 담당했습니다.',
    achievements: [
      '10개 이상의 웹 애플리케이션 성공적 런칭',
      '코드 리뷰 프로세스 도입으로 버그 발생률 50% 감소',
      '반응형 웹 디자인 구현으로 모바일 사용자 만족도 향상',
      '성능 최적화로 페이지 로딩 속도 60% 개선'
    ],
    technologies: ['Vue 2', 'Nuxt 2', 'JavaScript', 'Express.js', 'MongoDB', 'Firebase']
  }
]

// 학력 데이터
const educationHistory = [
  {
    degree: '컴퓨터공학과 학사',
    school: '서울대학교',
    period: '2016.03 - 2020.02',
    description: '웹 개발, 데이터베이스, 알고리즘 등 컴퓨터 과학 전반에 대해 학습했습니다.'
  }
]

// 자격증 데이터
const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023.06'
  },
  {
    name: '정보처리기사',
    issuer: '한국산업인력공단',
    date: '2020.11'
  }
]

console.log('이력서 페이지 로드됨')
</script>