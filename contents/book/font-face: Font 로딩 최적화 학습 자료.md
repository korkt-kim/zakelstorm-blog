---
title: font-face
description: 웹 페이지 폰트 로딩으로 인한 FOUT/FOIT 문제를 근본적으로 해결하는 방법을 소개합니다. <link rel='preload'>와 @font-face의 최적 조합부터 canonical, dns-prefetch, preconnect의 차이점까지. 실제 프로젝트에 바로 적용할 수 있는 완벽한 가이드입니다.
createdAt: 2025-12-25
---

# font-face

## 개요

이 문서는 웹 폰트 로딩 최적화와 관련된 핵심 개념들을 정리한 학습 자료입니다. 최근 커밋에서 적용된 font preload 최적화를 바탕으로 작성되었습니다.

## 1. <link> 태그란?

`<link>` 태그는 HTML 문서와 외부 리소스 간의 관계를 정의하는 HTML 요소입니다.

### 주요 특징

- **빈 요소(void element)**: 닫는 태그가 없음
- **외부 리소스 연결**: CSS, 폰트, 아이콘 등의 외부 파일을 문서에 연결
- **메타데이터 제공**: 브라우저에게 리소스의 성격과 처리 방법을 알려줌

### 기본 문법

```html
<link rel="관계" href="파일경로" type="MIME타입" />
```

## 2. <link> 태그의 주요 속성과 속성값

### rel 속성 (relationship)

문서와 연결된 리소스 간의 관계를 정의합니다.

| 속성값       | 설명                               | 예시                                                          |
| ------------ | ---------------------------------- | ------------------------------------------------------------- |
| stylesheet   | CSS 스타일시트 연결                | `<link rel="stylesheet" href="style.css">`                    |
| preload      | 리소스를 미리 로드 (높은 우선순위) | `<link rel="preload" href="font.woff2" as="font">`            |
| preconnect   | 외부 도메인과 미리 연결            | `<link rel="preconnect" href="https://fonts.googleapis.com">` |
| dns-prefetch | DNS 조회를 미리 수행               | `<link rel="dns-prefetch" href="//example.com">`              |
| icon         | 파비콘 설정                        | `<link rel="icon" href="favicon.ico">`                        |
| canonical    | 정규 URL 지정                      | `<link rel="canonical" href="https://example.com/page">`      |

## 🤔 헷갈리기 쉬운 3가지: canonical, dns-prefetch, preconnect 상세 비교

### 1. rel="canonical" - SEO를 위한 정규 URL 지정

**목적**: 검색엔진에게 "이 페이지의 공식적인 URL은 이것이다"라고 알려주는 것

**사용 상황**:

- 동일한 콘텐츠가 여러 URL로 접근 가능한 경우
- URL 파라미터로 인한 중복 페이지 문제 해결
- SEO 최적화

#### 예시

```html
<!-- 예시 1: 파라미터가 있는 URL의 정규화 -->
<!-- 현재 URL: https://shop.com/product?id=123&ref=google&utm_source=ad -->
<link rel="canonical" href="https://shop.com/product?id=123" />

<!-- 예시 2: 모바일/데스크톱 버전 통합 -->
<!-- 모바일 페이지: https://m.example.com/article -->
<link rel="canonical" href="https://www.example.com/article" />

<!-- 예시 3: HTTPS 버전을 정규 URL로 지정 -->
<!-- HTTP 페이지: http://example.com/page -->
<link rel="canonical" href="https://example.com/page" />
```

#### 실제 효과

**❌ canonical 없을 때**: Google 검색 결과에 중복 페이지들이 모두 나타남

- https://shop.com/product?id=123
- https://shop.com/product?id=123&ref=google
- https://shop.com/product?id=123&utm_source=ad

**✅ canonical 있을 때**: Google이 정규 URL만 검색 결과에 표시

- https://shop.com/product?id=123 (정규 URL만 노출)

### 2. rel="dns-prefetch" - DNS 조회 미리 실행

**목적**: 외부 도메인의 DNS 조회를 미리 수행하여 나중에 해당 도메인의 리소스를 빠르게 로드

#### 동작 과정

1. 브라우저가 dns-prefetch를 발견
2. 백그라운드에서 DNS 조회 실행 (IP 주소 확인)
3. 나중에 해당 도메인의 리소스가 필요할 때 DNS 조회 시간 절약

```html
<!-- 예시: 외부 CDN에서 폰트를 로드할 예정 -->
<link rel="dns-prefetch" href="//fonts.googleapis.com" />
<link rel="dns-prefetch" href="//cdn.jsdelivr.net" />

<!-- 나중에 실제 리소스 로드 시 DNS 조회 시간 절약됨 -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter" />
```

#### 타이밍 비교

**❌ dns-prefetch 없을 때**:

1. `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` 발견
2. fonts.googleapis.com DNS 조회 시작 (20-100ms)
3. DNS 조회 완료 후 연결 시작
4. 리소스 다운로드

**✅ dns-prefetch 있을 때**:

1. `<link rel="dns-prefetch" href="//fonts.googleapis.com">` 발견
2. 백그라운드에서 DNS 조회 미리 완료
3. 나중에 `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` 발견
4. DNS 조회 생략하고 즉시 연결 시작 → 더 빠름!

### 3. rel="preconnect" - 연결 과정 전체를 미리 실행

**목적**: DNS 조회 + TCP 연결 + TLS 핸드셰이크까지 모든 연결 과정을 미리 완료

#### 동작 과정

1. DNS 조회 (IP 주소 확인)
2. TCP 연결 설정
3. TLS/SSL 핸드셰이크 (HTTPS의 경우)
4. 연결 준비 완료 상태로 대기

```html
<!-- 예시: Google Fonts에서 폰트를 확실히 로드할 예정 -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- 나중에 실제 리소스 로드 시 연결 과정 전체가 생략됨 -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter" />
```

#### dns-prefetch vs preconnect 비교

**dns-prefetch (가벼움)**:

1. DNS 조회만 미리 실행 (20-100ms 절약)
2. 연결이 확실하지 않을 때 사용
3. 여러 도메인에 대해 사용해도 부담 적음

**preconnect (강력함)**:

1. DNS + TCP + TLS 모두 미리 실행 (100-500ms 절약)
2. 연결이 확실할 때만 사용 (리소스 소모가 더 큼)
3. 중요한 2-3개 도메인에만 사용 권장

## 4. 실제 사용 시나리오별 선택 가이드

### 🎯 시나리오 1: Google Fonts 사용

```html
<!-- ✅ 권장: 확실히 폰트를 로드할 예정이므로 preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter" />
```

### 🎯 시나리오 2: 조건부로 외부 리소스 로드 가능

```html
<!-- ✅ 권장: 확실하지 않으므로 dns-prefetch -->
<link rel="dns-prefetch" href="//cdn.example.com" />
<link rel="dns-prefetch" href="//analytics.google.com" />

<script>
  // 특정 조건에서만 로드
  if (userConsent) {
    loadScript('https://analytics.google.com/analytics.js')
  }
</script>
```

### 🎯 시나리오 3: 여러 URL로 접근 가능한 상품 페이지

```html
<!-- ✅ 권장: SEO를 위한 canonical -->
<!-- 현재 URL: /product?id=123&color=red&size=large -->
<link rel="canonical" href="/product?id=123" />
```

## 5. 성능 측정으로 보는 실제 효과

### DNS 조회 시간 측정

```javascript
const observer = new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    if (entry.name.includes('fonts.googleapis.com')) {
      console.log(
        'DNS 조회 시간:',
        entry.domainLookupEnd - entry.domainLookupStart
      )
      console.log('연결 시간:', entry.connectEnd - entry.connectStart)
      console.log('전체 시간:', entry.responseEnd - entry.startTime)
    }
  }
})
observer.observe({ entryTypes: ['navigation', 'resource'] })
```

### 실제 측정 결과 예시

- **dns-prefetch 없음**: DNS 조회 50ms + 연결 100ms = 150ms
- **dns-prefetch 적용**: DNS 조회 0ms + 연결 100ms = 100ms (33% 개선)
- **preconnect 적용**: DNS 조회 0ms + 연결 0ms = 0ms (100% 개선)

### href 속성

연결할 리소스의 URL 또는 경로를 지정합니다.

```html
<!-- 절대 경로 -->
<link rel="stylesheet" href="https://cdn.example.com/style.css" />

<!-- 상대 경로 -->
<link rel="stylesheet" href="/css/style.css" />
<link rel="stylesheet" href="./style.css" />
```

### type 속성

리소스의 MIME 타입을 명시합니다.

| MIME 타입  | 설명          | 예시                                                       |
| ---------- | ------------- | ---------------------------------------------------------- |
| text/css   | CSS 파일      | `<link rel="stylesheet" type="text/css" href="style.css">` |
| font/woff2 | WOFF2 폰트    | `<link rel="preload" type="font/woff2" href="font.woff2">` |
| font/ttf   | TrueType 폰트 | `<link rel="preload" type="font/ttf" href="font.ttf">`     |

### as 속성 (preload와 함께 사용)

preload할 리소스의 타입을 지정합니다.

```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="image.jpg" as="image" />
<link rel="preload" href="script.js" as="script" />
```

### crossorigin 속성

교차 출처 요청 시 CORS 설정을 지정합니다.

```html
<!-- 자격 증명 없이 요청 -->
<link rel="preload" href="font.woff2" as="font" crossorigin="anonymous" />

<!-- 자격 증명과 함께 요청 -->
<link rel="preload" href="font.woff2" as="font" crossorigin="use-credentials" />
```

### 기타 유용한 속성들

#### media 속성

특정 미디어 조건에서만 리소스를 로드합니다.

```html
<link rel="stylesheet" href="print.css" media="print" />
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)" />
```

#### sizes 속성

아이콘의 크기를 지정합니다.

```html
<link rel="icon" href="icon-32.png" sizes="32x32" type="image/png" />
<link rel="icon" href="icon-192.png" sizes="192x192" type="image/png" />
```

## 3. @font-face와 <link>의 관계

### @font-face 란?

CSS에서 웹 폰트를 정의하고 사용할 수 있게 해주는 CSS at-rule입니다.

```css
@font-face {
  font-family: 'MyCustomFont';
  src:
    url('/fonts/MyCustomFont.woff2') format('woff2'),
    url('/fonts/MyCustomFont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### <link preload>와 @font-face의 협력

#### 1. 문제 상황

```css
/* @font-face만 사용할 경우 */
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2');
}

.title {
  font-family: 'MyFont', sans-serif; /* 이 시점에서야 폰트 다운로드 시작 */
}
```

**문제점**: 폰트가 실제로 사용되는 순간에야 다운로드가 시작됨 → FOUT/FOIT 발생

#### 2. 해결책: preload + @font-face

```html
<!-- HTML: 페이지 로드 즉시 폰트 다운로드 시작 -->
<link
  rel="preload"
  href="/fonts/MyFont.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous" />
```

```css
/* CSS: 폰트 정의 및 사용 */
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2');
  font-display: swap; /* 로딩 중 fallback 폰트 표시 */
}

.title {
  font-family: 'MyFont', sans-serif; /* 이미 로드된 폰트 즉시 적용 */
}
```

#### 3. 실제 프로젝트 적용 예시 (커밋 기준)

```html
<!-- _document.tsx -->
<link
  rel="preload"
  href="/fonts/HyundaiSansHeadPro-Regular.ttf"
  as="font"
  type="font/ttf"
  crossorigin="anonymous" />
```

```css
/* globals.css */
@font-face {
  font-family: 'HyundaiSansHeadPro';
  src: url('/fonts/HyundaiSansHeadPro-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

#### 로딩 타임라인 비교

**❌ preload 없이**:

- HTML 파싱 완료
- CSS 파싱 완료
- 레이아웃 계산
- 폰트가 필요한 요소 발견
- 폰트 다운로드 시작 ← 늦음
- 폰트 적용

**✅ preload 사용**:

- HTML 파싱 시작
- preload 발견 → 폰트 다운로드 시작 ← 빠름
- CSS 파싱 완료
- 레이아웃 계산
- 폰트가 필요한 요소 발견
- 이미 로드된 폰트 즉시 적용

## 4. @font-face 상세 가이드

### 기본 구조와 속성

```css
@font-face {
  font-family: 'FontName'; /* 필수: 폰트 패밀리 이름 */
  src: url('font.woff2'); /* 필수: 폰트 파일 경로 */
  font-weight: normal; /* 선택: 폰트 굵기 */
  font-style: normal; /* 선택: 폰트 스타일 */
  font-display: swap; /* 선택: 로딩 동작 */
  unicode-range: U+0000-00FF; /* 선택: 유니코드 범위 */
}
```

### 주요 속성 상세 설명

#### font-family

폰트의 이름을 정의합니다. CSS에서 이 이름으로 폰트를 참조합니다.

```css
@font-face {
  font-family: 'MyCustomFont';
}

/* 사용 */
.text {
  font-family: 'MyCustomFont', Arial, sans-serif;
}
```

#### src

폰트 파일의 위치와 형식을 지정합니다.

```css
/* 단일 형식 */
src: url('/fonts/font.woff2') format('woff2');

/* 여러 형식 (fallback) */
src:
  url('/fonts/font.woff2') format('woff2'),
  url('/fonts/font.woff') format('woff'),
  url('/fonts/font.ttf') format('truetype');

/* 로컬 폰트 우선 확인 */
src:
  local('Arial Bold'),
  local('Arial-Bold'),
  url('/fonts/arial-bold.woff2') format('woff2');
```

#### font-weight

폰트의 굵기를 지정합니다.

```css
/* 숫자 값 */
font-weight: 400; /* normal */
font-weight: 700; /* bold */

/* 키워드 */
font-weight: normal;
font-weight: bold;

/* 범위 지정 (가변 폰트) */
font-weight: 100 900;
```

#### font-style

폰트의 스타일을 지정합니다.

```css
font-style: normal; /* 기본값 */
font-style: italic; /* 이탤릭 */
font-style: oblique; /* 기울어진 */
```

#### font-display

폰트 로딩 중 표시 방식을 제어합니다.

| 값       | 설명                                        | 사용 사례           |
| -------- | ------------------------------------------- | ------------------- |
| auto     | 브라우저 기본 동작                          | 기본값              |
| block    | 폰트 로드까지 텍스트 숨김 (최대 3초)        | 아이콘 폰트         |
| swap     | 즉시 fallback 폰트 표시, 로드 후 교체       | 일반 텍스트 (권장)  |
| fallback | 100ms 후 fallback 표시, 3초 내 로드 시 교체 | 성능 중시           |
| optional | 100ms 후 fallback 표시, 캐시된 경우만 사용  | 매우 빠른 로딩 필요 |

```css
/* 권장: 즉시 텍스트 표시, 폰트 로드 후 교체 */
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2');
  font-display: swap;
}
```

#### unicode-range

특정 문자 범위에만 폰트를 적용합니다.

```css
/* 영문만 */
@font-face {
  font-family: 'EnglishFont';
  src: url('/fonts/english.woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153;
}

/* 한글만 */
@font-face {
  font-family: 'KoreanFont';
  src: url('/fonts/korean.woff2');
  unicode-range: U+AC00-D7AF;
}
```

### 고급 패턴

#### 1. 동일 패밀리 내 다양한 weight/style

```css
/* Regular */
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont-Regular.woff2');
  font-weight: 400;
  font-style: normal;
}

/* Bold */
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont-Bold.woff2');
  font-weight: 700;
  font-style: normal;
}

/* Italic */
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont-Italic.woff2');
  font-weight: 400;
  font-style: italic;
}

/* 사용 */
.text {
  font-family: 'MyFont', sans-serif;
}

.text.bold {
  font-weight: 700; /* Bold 폰트 자동 선택 */
}

.text.italic {
  font-style: italic; /* Italic 폰트 자동 선택 */
}
```

#### 2. 가변 폰트 (Variable Font)

```css
@font-face {
  font-family: 'VariableFont';
  src: url('/fonts/variable-font.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-stretch: 75% 125%;
}

/* 사용 */
.text {
  font-family: 'VariableFont';
  font-weight: 350; /* 정확한 굵기 */
  font-stretch: 110%; /* 폭 조절 */
}
```

## 5. <link> 태그의 위치: <head> vs <body>

### <head> 내 <link> (표준이자 권장사항)

#### 장점

- **빠른 로딩**: HTML 파싱 초기에 발견되어 즉시 다운로드 시작
- **렌더링 블로킹 방지**: CSS는 렌더링을 블로킹하지만, 빠른 발견으로 지연 최소화
- **표준 준수**: HTML 명세에 따른 올바른 사용법
- **SEO 친화적**: 검색엔진이 메타데이터를 빠르게 인식

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- ✅ 권장: head 내 위치 -->
    <link rel="stylesheet" href="/css/critical.css" />
    <link rel="preload" href="/fonts/main.woff2" as="font" crossorigin />
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  </head>
  <body>
    <h1>Content</h1>
  </body>
</html>
```

#### 로딩 타임라인 (head 내 link)

```
0ms HTML 파싱 시작
1ms <link> 발견 → CSS/폰트 다운로드 시작
... HTML 계속 파싱
100ms <body> 파싱
150ms CSS 다운로드 완료
200ms 렌더링 시작 (스타일 적용됨)
```

### <body> 내 <link> (특수한 경우)

#### 사용 가능한 케이스

- **Progressive Enhancement**: 점진적 개선
- **조건부 로딩**: 특정 상황에서만 필요한 리소스
- **지연 로딩**: 중요하지 않은 스타일의 지연 로딩

```html
<body>
  <header>메인 콘텐츠</header>

  <!-- 📱 모바일에서만 필요한 스타일 -->
  <script>
    if (window.innerWidth < 768) {
      document.head.appendChild(
        Object.assign(document.createElement('link'), {
          rel: 'stylesheet',
          href: '/css/mobile-only.css',
        })
      )
    }
  </script>

  <!-- 🎨 중요하지 않은 장식적 스타일 -->
  <section class="decorative-section">
    <link rel="stylesheet" href="/css/decorations.css" />
    <!-- 이 섹션의 스타일만 로드 -->
  </section>
</body>
```

#### 로딩 타임라인 (body 내 link)

```
0ms HTML 파싱 시작
100ms <body> 파싱
150ms <link> 발견 → CSS 다운로드 시작 (늦음!)
200ms 첫 렌더링 (스타일 없음)
250ms CSS 다운로드 완료
300ms 리렌더링 (스타일 적용) → FOUC 발생!
```

### 성능 비교 및 권장사항

#### ✅ 권장: Critical CSS는 head에

```html
<head>
  <!-- 필수 스타일 -->
  <link rel="stylesheet" href="/css/critical.css" />
  <!-- 폰트 preload -->
  <link rel="preload" href="/fonts/main.woff2" as="font" crossorigin />
  <!-- Above-the-fold 콘텐츠에 필요한 모든 리소스 -->
</head>
```

#### 💡 고급 패턴: 하이브리드 접근

```html
<head>
  <!-- Critical CSS 인라인 -->
  <style>
    /* 핵심 스타일만 인라인으로 포함 */
    body {
      font-family: system-ui;
    }
    .header {
      background: #000;
    }
  </style>
  <!-- 폰트 preload -->
  <link rel="preload" href="/fonts/main.woff2" as="font" crossorigin />
</head>

<body>
  <header class="header">즉시 스타일 적용됨</header>

  <!-- 나머지 CSS는 비동기 로드 -->
  <link
    rel="preload"
    href="/css/main.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="/css/main.css" /></noscript>
</body>
```

## 6. 최적화 Best Practices

### 1. 폰트 로딩 최적화 체크리스트

#### ✅ 필수 사항

- 중요한 폰트는 `<link rel="preload">` 사용
- `@font-face`에 `font-display: swap` 설정
- `crossorigin="anonymous"` 속성 추가
- WOFF2 형식 우선 사용

#### ✅ 권장 사항

- 폰트 서브셋팅으로 파일 크기 줄이기
- unicode-range로 필요한 문자만 로드
- 시스템 폰트를 fallback으로 설정
- 폰트 로딩 전략 설정

### 2. 실제 구현 예시 (프로젝트 기준)

```html
<!-- _document.tsx -->
<head>
  <!-- 1. 핵심 폰트 preload -->
  <link
    rel="preload"
    href="/fonts/HyundaiSansTextPro-Regular.ttf"
    as="font"
    type="font/ttf"
    crossorigin="anonymous" />
  <link
    rel="preload"
    href="/fonts/HyundaiSansTextPro-Bold.ttf"
    as="font"
    type="font/ttf"
    crossorigin="anonymous" />
</head>
```

```css
/* globals.css */

/* 2. @font-face 정의 */
@font-face {
  font-family: 'HyundaiSansTextPro';
  src: url('/fonts/HyundaiSansTextPro-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap; /* 3. FOUC 방지 */
}

@font-face {
  font-family: 'HyundaiSansTextPro';
  src: url('/fonts/HyundaiSansTextPro-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

/* 4. 시스템 폰트 fallback과 함께 사용 */
body {
  font-family:
    'HyundaiSansTextPro',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}
```

### 3. 성능 측정 및 디버깅

#### Chrome DevTools에서 확인하기

- **Network 탭**: 폰트 로딩 타이밍 확인
- **Performance 탭**: 렌더링 블로킹 확인
- **Lighthouse**: 폰트 최적화 제안 확인
- **Coverage 탭**: 사용되지 않는 폰트 확인

#### 중요 메트릭

- **FCP (First Contentful Paint)**: 첫 콘텐츠 표시 시간
- **LCP (Largest Contentful Paint)**: 가장 큰 콘텐츠 표시 시간
- **FOUT/FOIT**: 폰트 교체/숨김 현상

## 7. 주의사항 및 트러블슈팅

### 흔한 실수들

#### ❌ 잘못된 예시

```html
<!-- 1. crossorigin 누락 -->
<link rel="preload" href="/fonts/font.woff2" as="font" />

<!-- 2. type 속성 누락 -->
<link rel="preload" href="/fonts/font.woff2" as="font" crossorigin />

<!-- 3. @font-face와 경로 불일치 -->
<link rel="preload" href="/fonts/font.woff2" as="font" crossorigin />
@font-face { font-family: 'MyFont'; src: url('/fonts/font.ttf'); /* ❌ 다른
파일! */ }
```

#### ✅ 올바른 예시

```html
<!-- 1. 모든 필수 속성 포함 -->
<link
  rel="preload"
  href="/fonts/font.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous" />
```

```css
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/font.woff2') format('woff2'); /* ✅ 동일한 파일 */
  font-display: swap;
}
```

### 디버깅 팁

#### 1. 폰트가 로드되지 않을 때

```javascript
// 폰트 로딩 상태 확인
document.fonts.ready.then(() => {
  console.log('모든 폰트 로드 완료')
})

// 특정 폰트 로딩 확인
if (document.fonts.check('16px MyFont')) {
  console.log('MyFont 사용 가능')
} else {
  console.log('MyFont 아직 로드되지 않음')
}
```

#### 2. 네트워크 오류 확인

- **CORS 에러**: crossorigin 속성 확인
- **404 에러**: 파일 경로 확인
- **MIME 타입 에러**: 서버 설정 확인

## 요약

Font 로딩 최적화의 핵심은 `<link rel="preload">`와 `@font-face`의 조합입니다:

- `<link rel="preload">`: 페이지 로드 즉시 폰트 다운로드 시작
- `@font-face`: 폰트 정의 및 fallback 설정
- `font-display: swap`: 로딩 중 텍스트 숨김 방지
- `crossorigin="anonymous"`: CORS 문제 해결

이를 통해 FOUT/FOIT를 방지하고 사용자 경험을 크게 개선할 수 있습니다.

---

## 웹 폰트 로딩 문제: FOUT vs FOIT

### FOUT (Flash of Unstyled Text)

**"스타일이 적용되지 않은 텍스트의 깜빡임"**

#### 동작 과정

1. 페이지 로드 시 즉시 fallback 폰트로 텍스트 표시
2. 웹 폰트 다운로드 완료 후 웹 폰트로 교체
3. 폰트 교체 시 깜빡임/레이아웃 변화 발생

### FOIT (Flash of Invisible Text)

**"보이지 않는 텍스트의 깜빡임"**

#### 동작 과정

1. 페이지 로드 시 텍스트를 숨김 (투명 처리)
2. 웹 폰트 다운로드 완료까지 빈 공간만 표시
3. 폰트 로드 후 갑자기 텍스트 나타남
