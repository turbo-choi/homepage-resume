# 개인 포트폴리오 웹사이트

> Nuxt 3와 TypeScript로 구축된 현대적이고 반응형 개인 포트폴리오 웹사이트

## 🚀 주요 기능

### 📱 반응형 디자인
- 모바일 우선 접근 방식
- 다크/라이트 모드 지원
- Tailwind CSS를 활용한 현대적 UI

### 🏠 홈페이지
- 개인 소개 및 프로필
- 기술 스택 시각화
- 최근 블로그 포스트 미리보기
- 최근 프로젝트 쇼케이스

### 📝 블로그 시스템
- Nuxt Content를 활용한 마크다운 기반 블로그
- 검색 및 필터링 기능
- 카테고리 및 태그 시스템
- 페이지네이션
- 댓글 시스템
- 소셜 공유 기능

### 💼 포트폴리오
- 프로젝트 상세 페이지
- 기술 스택 표시
- 프로젝트 링크 및 데모

### 📄 이력서
- 경력 사항
- 교육 배경
- 기술 스킬
- 자격증

### 📞 연락처
- 연락처 정보
- 문의 폼
- 소셜 미디어 링크
- FAQ 섹션

## 🛠 기술 스택

### Frontend
- **Nuxt 3** - Vue.js 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성
- **Vue 3** - Composition API
- **Nuxt UI** - UI 컴포넌트 라이브러리
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Lucide Vue** - 아이콘 라이브러리

### Content Management
- **Nuxt Content** - 마크다운 기반 콘텐츠 관리
- **MDC** - 마크다운 컴포넌트

### Development Tools
- **Vite** - 빌드 도구
- **ESLint** - 코드 품질
- **Prettier** - 코드 포맷팅
- **vue-tsc** - TypeScript 타입 체킹

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd demo09-lovable1-landpage

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
├── assets/
│   └── css/
│       └── main.css          # 글로벌 스타일
├── components/
│   ├── AppFooter.vue         # 푸터 컴포넌트
│   ├── AppHeader.vue         # 헤더 컴포넌트
│   ├── RecentBlogPosts.vue   # 최근 블로그 포스트
│   ├── RecentProjects.vue    # 최근 프로젝트
│   └── TechStack.vue         # 기술 스택 컴포넌트
├── content/
│   ├── blog/                 # 블로그 포스트 (마크다운)
│   └── portfolio/            # 포트폴리오 프로젝트 (마크다운)
├── layouts/
│   └── default.vue           # 기본 레이아웃
├── pages/
│   ├── blog/
│   │   ├── [slug].vue        # 블로그 상세 페이지
│   │   └── index.vue         # 블로그 목록 페이지
│   ├── portfolio/
│   │   ├── [slug].vue        # 포트폴리오 상세 페이지
│   │   └── index.vue         # 포트폴리오 목록 페이지
│   ├── contact.vue           # 연락처 페이지
│   ├── index.vue             # 홈페이지
│   └── resume.vue            # 이력서 페이지
├── app.vue                   # 루트 컴포넌트
├── nuxt.config.ts            # Nuxt 설정
└── tsconfig.json             # TypeScript 설정
```

## 🎨 커스터마이징

### 개인 정보 수정
1. `pages/index.vue` - 홈페이지 개인 소개
2. `pages/resume.vue` - 이력서 정보
3. `pages/contact.vue` - 연락처 정보
4. `components/TechStack.vue` - 기술 스택

### 콘텐츠 추가
1. **블로그 포스트**: `content/blog/` 폴더에 마크다운 파일 추가
2. **포트폴리오 프로젝트**: `content/portfolio/` 폴더에 마크다운 파일 추가

### 스타일 커스터마이징
- `assets/css/main.css` - 글로벌 스타일
- `tailwind.config.js` - Tailwind CSS 설정
- Nuxt UI 테마 커스터마이징

## 📝 콘텐츠 작성 가이드

### 블로그 포스트

```markdown
---
title: "포스트 제목"
description: "포스트 설명"
date: "2024-01-01"
category: "카테고리"
tags: ["태그1", "태그2"]
author: "작성자"
image: "/images/post-image.jpg"
---

# 포스트 내용

마크다운으로 작성된 포스트 내용...
```

### 포트폴리오 프로젝트

```markdown
---
title: "프로젝트 제목"
description: "프로젝트 설명"
date: "2024-01-01"
technologies: ["Vue.js", "Nuxt.js", "TypeScript"]
category: "웹 개발"
status: "완료"
live_url: "https://example.com"
github_url: "https://github.com/username/repo"
image: "/images/project-image.jpg"
---

# 프로젝트 상세 내용

프로젝트에 대한 자세한 설명...
```

## 🚀 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify 배포

1. GitHub에 코드 푸시
2. Netlify에서 저장소 연결
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `.output/public`

## 🔧 환경 변수

필요한 경우 `.env` 파일을 생성하여 환경 변수를 설정하세요:

```env
# 예시
NUXT_PUBLIC_SITE_URL=https://yoursite.com
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## 📈 성능 최적화

- **이미지 최적화**: Nuxt Image 모듈 사용
- **코드 스플리팅**: 자동 라우트 기반 분할
- **SSR/SSG**: 정적 생성 및 서버 사이드 렌더링
- **번들 분석**: `npm run analyze`로 번들 크기 분석

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든 연락주세요!

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!