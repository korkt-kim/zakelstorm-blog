# Server Data Loading vs Client Data Loading vs Static Data Loading


## 사용 판단 기준

| | Server Data Loading | Client Data Loading | Static Data Loading |
| --- | --- | --- | --- |
|     | 자주 변하는 데이터 | Public API 호출 | 거의 변하지 않는 콘텐츠 |
|     | 인증/권한 체크  | Loader내에서 브라우저 API 사용 | 빌드 시점에 알 수 있는 모든 경로(route.config.ts 내 prerender에서 미리 정의) |
|     | 요청마다 달라지는 데이터  | 서버에 무리가 가는 로직 사용 | 트래픽 많고 데이터는 정적인 페이지 |
|     | 민감한 정보/API키 사용  | API호출에 대해 CDN 캐싱 활용  | CDN에 캐싱하고 싶으면서 서버 부하 감소시키고 싶은 페이지 |
|     |  SEO 최적화 필요 + 변경 있음  |   | SEO 최적화 필요 + 변경 드뭄


## 예시

### Server Data Loading

- 실시간 재고
- **사용자별** 맞춤 데이터
- 최신 뉴스
- Auth Layout
- 검색 결과


### Client Data Loading

- 날씨 앱


### Static Data Loading

- 블로그 글
- 문서/가이드
- 랜딩페이지
- 공통 FAQ

## 고려 순서

Static Data Loading -> Client Data Loading -> Server Data Loading


# eslint-config-prettier vs eslint-plugin-prettier

이 둘은 Prettier와 Eslint를 함께 사용할 때 원활하게 작동하도록 돕는 도구. 하지만 서로 다른 문데를 해결.

## eslint-config-prettier (이거 사용함.)

- Eslint의 규칙들에서 Prettier의 규칙들과 충돌하는 규칙들을 제거.
  -  ESLint의 포매팅 규칙과 Prettier 간의 충돌을 방지. 예를 들어 세미콜론, 따옴표, 들여쓰기 등에 대한 ESLint 규칙을 비활성. 이런 것들은 Prettier가 처리하기 때문

## eslint-plugin-prettier

- Prettier를 ESLint 규칙으로 실행하여, Prettier 포매팅 문제를 ESLint 에러로 표시
  - ESLint 결과에서 직접 Prettier 위반 사항을 확인하고, ESLint의 --fix 플래그로 자동 수정함.


## 권장 사용방식
- eslint-config-prettier만 사용하고 Prettier는 별도로 실행.  Prettier 팀에서도 특별한 이유가 없다면 eslint-plugin-prettier 사용을 권장하지 않음.(https://prettier.io/docs/integrating-with-linters)