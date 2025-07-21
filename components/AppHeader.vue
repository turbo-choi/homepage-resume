<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <nav class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- 로고 -->
        <NuxtLink to="/" class="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">P</span>
          </div>
          <span>Portfolio</span>
        </NuxtLink>
        
        <!-- 데스크톱 메뉴 -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.name"
            :to="item.path"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            active-class="text-blue-600 dark:text-blue-400"
          >
            {{ item.name }}
          </NuxtLink>
          
          <!-- 다크모드 토글 -->
          <UButton
            :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            variant="ghost"
            color="gray"
            @click="toggleColorMode"
            class="p-2"
          />
        </div>
        
        <!-- 모바일 메뉴 버튼 -->
        <div class="md:hidden flex items-center space-x-2">
          <!-- 다크모드 토글 (모바일) -->
          <UButton
            :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            variant="ghost"
            color="gray"
            @click="toggleColorMode"
            size="sm"
          />
          
          <!-- 햄버거 메뉴 -->
          <UButton
            :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            variant="ghost"
            color="gray"
            @click="toggleMenu"
            size="sm"
          />
        </div>
      </div>
      
      <!-- 모바일 메뉴 -->
      <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col space-y-3">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.name"
            :to="item.path"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2"
            active-class="text-blue-600 dark:text-blue-400"
            @click="closeMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 컬러 모드 관리
const colorMode = useColorMode()

// 모바일 메뉴 상태
const isMenuOpen = ref(false)

// 메뉴 아이템 정의
const menuItems = [
  { name: '홈', path: '/' },
  { name: '이력서', path: '/resume' },
  { name: '포트폴리오', path: '/portfolio' },
  { name: '블로그', path: '/blog' },
  { name: '연락처', path: '/contact' }
]

// 다크모드 토글 함수
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  console.log('다크모드 토글:', colorMode.value)
}

// 모바일 메뉴 토글 함수
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  console.log('모바일 메뉴 토글:', isMenuOpen.value)
}

// 모바일 메뉴 닫기 함수
const closeMenu = () => {
  isMenuOpen.value = false
  console.log('모바일 메뉴 닫기')
}

// 라우트 변경 시 모바일 메뉴 자동 닫기
watch(() => useRoute().path, () => {
  closeMenu()
})
</script>