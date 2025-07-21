---
title: 'Nuxt 3 성능 최적화 완벽 가이드'
description: 'Nuxt 3 애플리케이션의 성능을 극대화하는 다양한 기법들을 소개합니다. 코드 스플리팅, 이미지 최적화, SSR 최적화 등을 다룹니다.'
category: 'Frontend'
tags: ['Nuxt3', 'Performance', 'Optimization', 'SSR', 'Vue3']
publishedAt: '2024-01-15'
readTime: 8
views: 1250
emoji: '⚡'
gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
---

# Nuxt 3 성능 최적화 완벽 가이드

Nuxt 3는 Vue.js 기반의 강력한 프레임워크로, 뛰어난 성능과 개발자 경험을 제공합니다. 하지만 대규모 애플리케이션에서는 성능 최적화가 필수적입니다. 이 가이드에서는 Nuxt 3 애플리케이션의 성능을 극대화하는 다양한 기법들을 소개합니다.

## 1. 코드 스플리팅과 지연 로딩

### 컴포넌트 지연 로딩

Nuxt 3는 자동으로 코드 스플리팅을 수행하지만, 추가적인 최적화가 가능합니다.

```vue
<script setup>
// 동적 임포트를 활용한 컴포넌트 지연 로딩
const LazyComponent = defineAsyncComponent(() => import('~/components/Heavy.vue'))

// 조건부 로딩
const shouldLoadComponent = ref(false)
const ConditionalComponent = computed(() => {
  return shouldLoadComponent.value 
    ? defineAsyncComponent(() => import('~/components/Conditional.vue'))
    : null
})
</script>

<template>
  <div>
    <!-- 지연 로딩된 컴포넌트 -->
    <LazyComponent v-if="showLazy" />
    
    <!-- 조건부 로딩 컴포넌트 -->
    <component :is="ConditionalComponent" v-if="ConditionalComponent" />
  </div>
</template>
```

### 페이지 레벨 코드 스플리팅

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    experimental: {
      wasm: true
    }
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            ui: ['@nuxt/ui']
          }
        }
      }
    }
  }
})
```

## 2. 이미지 최적화

### @nuxt/image 모듈 활용

```bash
npm install @nuxt/image
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: {
    // 이미지 최적화 설정
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  }
})
```

```vue
<template>
  <div>
    <!-- 반응형 이미지 -->
    <NuxtImg
      src="/hero-image.jpg"
      alt="Hero Image"
      width="1200"
      height="600"
      sizes="sm:100vw md:50vw lg:400px"
      loading="lazy"
    />
    
    <!-- WebP 지원 이미지 -->
    <NuxtPicture
      src="/gallery/image.jpg"
      alt="Gallery Image"
      :img-attrs="{
        class: 'rounded-lg shadow-lg',
        loading: 'lazy'
      }"
    />
  </div>
</template>
```

## 3. SSR 최적화

### 서버 사이드 캐싱

```typescript
// server/api/posts.get.ts
export default defineCachedEventHandler(async (event) => {
  // 데이터 페칭 로직
  const posts = await fetchPosts()
  
  return posts
}, {
  maxAge: 60 * 10, // 10분 캐시
  name: 'posts',
  getKey: () => 'all-posts'
})
```

### 하이드레이션 최적화

```vue
<script setup>
// 클라이언트에서만 실행되는 코드
const { $router } = useNuxtApp()

// 하이드레이션 후에만 실행
onMounted(() => {
  // 클라이언트 전용 로직
  initializeClientOnlyFeatures()
})

// 서버와 클라이언트 모두에서 실행
const data = await useFetch('/api/data')
</script>

<template>
  <div>
    <!-- 서버에서 렌더링되는 콘텐츠 -->
    <div v-if="data">
      {{ data.title }}
    </div>
    
    <!-- 클라이언트에서만 렌더링 -->
    <ClientOnly>
      <InteractiveComponent />
      <template #fallback>
        <div>Loading...</div>
      </template>
    </ClientOnly>
  </div>
</template>
```

## 4. 번들 크기 최적화

### Tree Shaking 최적화

```typescript
// composables/useUtils.ts
// 개별 함수로 export하여 tree shaking 활용
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR').format(date)
}

export const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(null, args), delay)
  }
}

export const throttle = (fn: Function, limit: number) => {
  let inThrottle: boolean
  return (...args: any[]) => {
    if (!inThrottle) {
      fn.apply(null, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
```

```vue
<script setup>
// 필요한 함수만 import
import { formatDate, debounce } from '~/composables/useUtils'

const searchQuery = ref('')
const debouncedSearch = debounce((query: string) => {
  // 검색 로직
  console.log('Searching for:', query)
}, 300)

watch(searchQuery, debouncedSearch)
</script>
```

### 외부 라이브러리 최적화

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  build: {
    transpile: ['@headlessui/vue']
  },
  vite: {
    optimizeDeps: {
      include: ['lodash-es', 'date-fns']
    }
  }
})
```

## 5. 런타임 성능 최적화

### 가상 스크롤링

```vue
<script setup>
import { RecycleScroller } from 'vue-virtual-scroller'

const items = ref(Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  description: `Description for item ${i}`
})))
</script>

<template>
  <div class="h-96">
    <RecycleScroller
      class="scroller"
      :items="items"
      :item-size="60"
      key-field="id"
      v-slot="{ item }"
    >
      <div class="item">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </RecycleScroller>
  </div>
</template>
```

### 메모이제이션 활용

```vue
<script setup>
// 비용이 큰 계산 메모이제이션
const expensiveComputation = computed(() => {
  return heavyCalculation(props.data)
})

// 함수 메모이제이션
const memoizedFunction = useMemoize((param: string) => {
  return expensiveOperation(param)
})

// 컴포넌트 메모이제이션
const MemoizedChild = defineAsyncComponent({
  loader: () => import('~/components/ExpensiveChild.vue'),
  delay: 200,
  timeout: 3000
})
</script>
```

## 6. 네트워크 최적화

### 프리페칭과 프리로딩

```vue
<script setup>
// 라우트 프리페칭
const { $router } = useNuxtApp()

// 마우스 호버 시 프리페치
const prefetchRoute = (routeName: string) => {
  $router.prefetch(routeName)
}

// 데이터 프리페칭
const prefetchData = async () => {
  await $fetch('/api/next-page-data')
}
</script>

<template>
  <div>
    <NuxtLink 
      to="/about" 
      @mouseenter="prefetchRoute('/about')"
    >
      About
    </NuxtLink>
    
    <button @mouseenter="prefetchData">
      Next Page
    </button>
  </div>
</template>
```

### HTTP/2 서버 푸시 활용

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
    experimental: {
      wasm: true
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'preload',
          href: '/fonts/main.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  }
})
```

## 7. 성능 모니터링

### Web Vitals 측정

```typescript
// plugins/web-vitals.client.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export default defineNuxtPlugin(() => {
  // Core Web Vitals 측정
  getCLS(console.log)
  getFID(console.log)
  getFCP(console.log)
  getLCP(console.log)
  getTTFB(console.log)
})
```

### 성능 프로파일링

```vue
<script setup>
// 개발 환경에서 성능 측정
if (process.dev) {
  const startTime = performance.now()
  
  onMounted(() => {
    const endTime = performance.now()
    console.log(`Component mounted in ${endTime - startTime}ms`)
  })
}

// 사용자 정의 성능 마크
const measurePerformance = (name: string, fn: Function) => {
  performance.mark(`${name}-start`)
  const result = fn()
  performance.mark(`${name}-end`)
  performance.measure(name, `${name}-start`, `${name}-end`)
  return result
}
</script>
```

## 결론

이러한 최적화 기법들을 적용하면 Nuxt 3 애플리케이션의 성능을 크게 향상시킬 수 있습니다. 중요한 것은 실제 사용자 환경에서의 성능을 지속적으로 모니터링하고, 병목 지점을 파악하여 단계적으로 최적화를 진행하는 것입니다.

성능 최적화는 한 번에 끝나는 작업이 아니라 지속적인 개선 과정입니다. 사용자 경험을 최우선으로 고려하면서, 개발 생산성과의 균형을 맞춰가는 것이 중요합니다.

### 추가 리소스

- [Nuxt 3 공식 성능 가이드](https://nuxt.com/docs/guide/concepts/rendering)
- [Vue.js 성능 최적화 가이드](https://vuejs.org/guide/best-practices/performance.html)
- [Web Vitals 측정 도구](https://web.dev/vitals/)
- [Lighthouse 성능 분석](https://developers.google.com/web/tools/lighthouse)