<template>
  <footer class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 브랜드 섹션 -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">P</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">Portfolio</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 max-w-md">
            풀스택 개발자로서 사용자 중심의 웹 애플리케이션을 개발하고 있습니다.
          </p>
        </div>
        
        <!-- 빠른 링크 -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">빠른 링크</h3>
          <ul class="space-y-2">
            <li v-for="item in quickLinks" :key="item.name">
              <NuxtLink 
                :to="item.path"
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- 소셜 링크 -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">연결하기</h3>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
              :title="social.name"
            >
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            이메일: contact@example.com
          </p>
        </div>
      </div>
      
      <!-- 하단 저작권 -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            © {{ currentYear }} Portfolio. All rights reserved.
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Made with ❤️ using Nuxt 3 & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Github, Linkedin, Mail, Twitter } from 'lucide-vue-next'

// 현재 연도 계산
const currentYear = new Date().getFullYear()

// 빠른 링크 정의
const quickLinks = [
  { name: '홈', path: '/' },
  { name: '이력서', path: '/resume' },
  { name: '포트폴리오', path: '/portfolio' },
  { name: '블로그', path: '/blog' },
  { name: '연락처', path: '/contact' }
]

// 소셜 링크 정의
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: Github
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: Linkedin
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: Twitter
  },
  {
    name: 'Email',
    url: 'mailto:contact@example.com',
    icon: Mail
  }
]

console.log('푸터 컴포넌트 로드됨')
</script>