<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 헤더 섹션 -->
    <section class="section-padding bg-white dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            연락하기
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            프로젝트 협업이나 기술적 문의사항이 있으시면 언제든지 연락해주세요. 
            빠른 시간 내에 답변드리겠습니다.
          </p>
        </div>
      </div>
    </section>
    
    <!-- 연락 방법 및 폼 섹션 -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- 연락 정보 -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                연락 정보
              </h2>
              <div class="space-y-6">
                <!-- 이메일 -->
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Mail class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                      이메일
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-2">
                      프로젝트 문의나 협업 제안을 보내주세요
                    </p>
                    <a 
                      href="mailto:developer@example.com"
                      class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      developer@example.com
                    </a>
                  </div>
                </div>
                
                <!-- 전화번호 -->
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Phone class="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                      전화번호
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-2">
                      급한 문의사항이 있으시면 전화주세요
                    </p>
                    <a 
                      href="tel:+821012345678"
                      class="text-green-600 dark:text-green-400 hover:underline font-medium"
                    >
                      +82 10-1234-5678
                    </a>
                  </div>
                </div>
                
                <!-- 위치 -->
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <MapPin class="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                      위치
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-2">
                      서울 기반으로 활동하고 있습니다
                    </p>
                    <span class="text-purple-600 dark:text-purple-400 font-medium">
                      서울, 대한민국
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 소셜 링크 -->
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                소셜 미디어
              </h2>
              <div class="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <Github class="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
                  <span class="font-medium text-gray-900 dark:text-white">GitHub</span>
                </a>
                
                <a 
                  href="https://linkedin.com/in/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <Linkedin class="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <span class="font-medium text-gray-900 dark:text-white">LinkedIn</span>
                </a>
                
                <a 
                  href="https://twitter.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <Twitter class="w-6 h-6 text-blue-400 group-hover:text-blue-500 transition-colors" />
                  <span class="font-medium text-gray-900 dark:text-white">Twitter</span>
                </a>
                
                <a 
                  href="mailto:developer@example.com"
                  class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <Mail class="w-6 h-6 text-red-500 group-hover:text-red-600 transition-colors" />
                  <span class="font-medium text-gray-900 dark:text-white">Email</span>
                </a>
              </div>
            </div>
            
            <!-- 응답 시간 안내 -->
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div class="flex items-start gap-3">
                <Clock class="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    응답 시간
                  </h3>
                  <p class="text-blue-700 dark:text-blue-200 text-sm leading-relaxed">
                    일반적으로 24시간 이내에 답변드립니다. 
                    급한 문의사항의 경우 전화나 LinkedIn 메시지를 이용해주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 연락 폼 -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              메시지 보내기
            </h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- 이름과 이메일 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    이름 *
                  </label>
                  <UInput
                    v-model="form.name"
                    placeholder="홍길동"
                    required
                    :error="errors.name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    이메일 *
                  </label>
                  <UInput
                    v-model="form.email"
                    type="email"
                    placeholder="hong@example.com"
                    required
                    :error="errors.email"
                  />
                </div>
              </div>
              
              <!-- 회사/조직 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  회사/조직
                </label>
                <UInput
                  v-model="form.company"
                  placeholder="회사명 또는 조직명 (선택사항)"
                />
              </div>
              
              <!-- 문의 유형 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  문의 유형 *
                </label>
                <USelect
                  v-model="form.type"
                  :options="inquiryTypes"
                  placeholder="문의 유형을 선택해주세요"
                  required
                  :error="errors.type"
                />
              </div>
              
              <!-- 제목 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  제목 *
                </label>
                <UInput
                  v-model="form.subject"
                  placeholder="문의 제목을 입력해주세요"
                  required
                  :error="errors.subject"
                />
              </div>
              
              <!-- 메시지 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  메시지 *
                </label>
                <UTextarea
                  v-model="form.message"
                  placeholder="상세한 문의 내용을 입력해주세요..."
                  :rows="6"
                  required
                  :error="errors.message"
                />
              </div>
              
              <!-- 개인정보 동의 -->
              <div class="flex items-start gap-3">
                <UCheckbox
                  v-model="form.privacyAgreed"
                  required
                  :error="errors.privacyAgreed"
                />
                <label class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  개인정보 수집 및 이용에 동의합니다. 
                  <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">
                    개인정보처리방침 보기
                  </a>
                </label>
              </div>
              
              <!-- 제출 버튼 -->
              <div class="pt-4">
                <UButton
                  type="submit"
                  :loading="isSubmitting"
                  :disabled="!isFormValid"
                  size="lg"
                  class="w-full"
                >
                  <Send class="w-5 h-5 mr-2" />
                  메시지 보내기
                </UButton>
              </div>
            </form>
            
            <!-- 성공 메시지 -->
            <div v-if="isSubmitted" class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div class="flex items-center gap-3">
                <CheckCircle class="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <h3 class="font-semibold text-green-900 dark:text-green-100">
                    메시지가 성공적으로 전송되었습니다!
                  </h3>
                  <p class="text-green-700 dark:text-green-200 text-sm mt-1">
                    빠른 시간 내에 답변드리겠습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ 섹션 -->
    <section class="section-padding bg-white dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            자주 묻는 질문
          </h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            자주 받는 질문들을 정리했습니다. 궁금한 내용이 있다면 먼저 확인해보세요.
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="space-y-4">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden"
            >
              <button 
                @click="toggleFaq(index)"
                class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  {{ faq.question }}
                </h3>
                <ChevronDown 
                  class="w-5 h-5 text-gray-500 transition-transform duration-200"
                  :class="{ 'rotate-180': openFaqIndex === index }"
                />
              </button>
              
              <div 
                v-if="openFaqIndex === index"
                class="px-6 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Mail, Phone, MapPin, Github, Linkedin, Twitter, Clock, 
  Send, CheckCircle, ChevronDown 
} from 'lucide-vue-next'

// SEO 메타 태그 설정
useHead({
  title: '연락하기 - 개발자 포트폴리오',
  meta: [
    {
      name: 'description',
      content: '프로젝트 협업이나 기술적 문의사항이 있으시면 언제든지 연락해주세요. 이메일, 전화, 소셜 미디어를 통해 연락 가능합니다.'
    }
  ]
})

// 폼 상태
const form = ref({
  name: '',
  email: '',
  company: '',
  type: '',
  subject: '',
  message: '',
  privacyAgreed: false
})

// 에러 상태
const errors = ref({
  name: '',
  email: '',
  type: '',
  subject: '',
  message: '',
  privacyAgreed: ''
})

// 제출 상태
const isSubmitting = ref(false)
const isSubmitted = ref(false)

// FAQ 상태
const openFaqIndex = ref<number | null>(null)

// 문의 유형 옵션
const inquiryTypes = [
  { label: '프로젝트 협업 문의', value: 'collaboration' },
  { label: '기술 컨설팅', value: 'consulting' },
  { label: '채용 관련 문의', value: 'recruitment' },
  { label: '기술적 질문', value: 'technical' },
  { label: '기타 문의', value: 'other' }
]

// FAQ 데이터
const faqs = [
  {
    question: '프로젝트 협업은 어떤 방식으로 진행되나요?',
    answer: '프로젝트 규모와 요구사항에 따라 다양한 방식으로 협업이 가능합니다. 원격 근무, 부분 참여, 풀타임 참여 등 유연하게 조율할 수 있습니다. 먼저 프로젝트에 대한 상세한 논의를 통해 최적의 협업 방식을 결정합니다.'
  },
  {
    question: '어떤 기술 스택을 주로 사용하시나요?',
    answer: 'Vue.js, Nuxt.js, TypeScript를 주력으로 하는 프론트엔드 개발자입니다. 백엔드는 Node.js, Express, MongoDB, PostgreSQL을 사용하며, AWS, Docker 등을 활용한 DevOps 경험도 있습니다. 프로젝트 요구사항에 맞는 최적의 기술 스택을 제안드릴 수 있습니다.'
  },
  {
    question: '프로젝트 비용은 어떻게 책정되나요?',
    answer: '프로젝트의 복잡도, 기간, 요구사항 등을 종합적으로 고려하여 비용을 책정합니다. 시간당 요금제 또는 프로젝트 단위 고정 요금제 중 선택 가능하며, 상세한 견적은 프로젝트 요구사항을 파악한 후 제공해드립니다.'
  },
  {
    question: '프로젝트 진행 중 소통은 어떻게 하나요?',
    answer: 'Slack, Discord, 이메일 등 클라이언트가 선호하는 커뮤니케이션 도구를 사용합니다. 정기적인 진행상황 보고와 함께 필요시 화상회의를 통해 실시간 소통을 진행합니다. 투명하고 원활한 소통을 최우선으로 합니다.'
  },
  {
    question: '유지보수나 추가 개발도 가능한가요?',
    answer: '네, 프로젝트 완료 후에도 지속적인 유지보수와 추가 기능 개발이 가능합니다. 별도의 유지보수 계약을 통해 안정적인 서비스 운영을 지원해드리며, 새로운 요구사항에 대한 추가 개발도 언제든 상담 가능합니다.'
  }
]

// 폼 유효성 검사
const isFormValid = computed(() => {
  return form.value.name && 
         form.value.email && 
         form.value.type && 
         form.value.subject && 
         form.value.message && 
         form.value.privacyAgreed
})

// 폼 제출 함수
const submitForm = async () => {
  // 에러 초기화
  errors.value = {
    name: '',
    email: '',
    type: '',
    subject: '',
    message: '',
    privacyAgreed: ''
  }
  
  // 유효성 검사
  let hasError = false
  
  if (!form.value.name) {
    errors.value.name = '이름을 입력해주세요.'
    hasError = true
  }
  
  if (!form.value.email) {
    errors.value.email = '이메일을 입력해주세요.'
    hasError = true
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = '올바른 이메일 형식을 입력해주세요.'
    hasError = true
  }
  
  if (!form.value.type) {
    errors.value.type = '문의 유형을 선택해주세요.'
    hasError = true
  }
  
  if (!form.value.subject) {
    errors.value.subject = '제목을 입력해주세요.'
    hasError = true
  }
  
  if (!form.value.message) {
    errors.value.message = '메시지를 입력해주세요.'
    hasError = true
  }
  
  if (!form.value.privacyAgreed) {
    errors.value.privacyAgreed = '개인정보 수집 및 이용에 동의해주세요.'
    hasError = true
  }
  
  if (hasError) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // 실제로는 API 호출
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('폼 제출됨:', form.value)
    
    // 성공 처리
    isSubmitted.value = true
    
    // 폼 초기화
    form.value = {
      name: '',
      email: '',
      company: '',
      type: '',
      subject: '',
      message: '',
      privacyAgreed: false
    }
    
    // 3초 후 성공 메시지 숨김
    setTimeout(() => {
      isSubmitted.value = false
    }, 5000)
    
  } catch (error) {
    console.error('폼 제출 실패:', error)
    alert('메시지 전송에 실패했습니다. 다시 시도해주세요.')
  } finally {
    isSubmitting.value = false
  }
}

// FAQ 토글 함수
const toggleFaq = (index: number) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
  console.log('FAQ 토글:', index)
}

console.log('연락처 페이지 로드됨')
</script>