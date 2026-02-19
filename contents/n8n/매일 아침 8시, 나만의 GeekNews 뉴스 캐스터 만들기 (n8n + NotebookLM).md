---
title: 매일 아침 8시, 나만의 GeekNews 캐스터 만들기 (n8n + NotebookLM)
description: GeekNews 캐스터 구축 과정과 함께, 비공식 API(MCP)를 활용할 때의 현실적인 한계와 배포 고민
createdAt: 2025-02-18
---

## 1. 개요 및 준비물

### 🎯 목표
* 매일 아침 08:00, **GeekNews** RSS를 크롤링.
* Frontend(FE)와 AI 관련 뉴스만 똑똑하게 필터링.
* NotebookLM을 통해 두 호스트가 대화하는 오디오 팟캐스트 생성.

### 🛠 준비물
이 프로젝트는 클라우드 서버뿐만 아니라, **인증을 위한 로컬 환경**이 필수적.
* **Python (v3.11 이상):** MCP 서버 구동용.
* **서버 (VPS/Home Server):** Opencode 및 n8n이 돌아갈 환경.
* **Chrome & 모니터:** NotebookLM 인증(OAuth)을 위해 브라우저를 띄워야 하므로, GUI 환경이 접근 가능한 서버 필요.

---

## 2. 구축 절차 (Step-by-Step)

### Step 1. NotebookLM 제어 서버 구성 (Opencode + MCP)

NotebookLM은 공식 API가 없음. 따라서 오픈소스 커뮤니티의 `notebooklm-mcp-cli`를 `opencode` 서버로 감싸서 HTTP 요청을 받을 수 있게함.

#### ① 설치 및 인증

```bash
# 1. 패키지 설치
pip install notebooklm-mcp-cli

# 2. 로그인 (가장 중요한 단계!)
# 이 명령어를 치면 브라우저가 뜨고 구글 로그인을 해야 합니다.
# 완료되면 인증 토큰(Cookie)이 로컬에 저장됩니다.
nlm login
```

만약 서버에 모니터가 없다면
다른 PC에서 NotebookLM 브라우저 Cookie를 복사하여 서버 상에 파일로 저장해야하여 NotebookLM MCP가 해당 Cookie를 읽게 해야함.
```bash
1. Chrome 열고 https://notebooklm.google.com 으로 이동
2. 로그인 여부 확인
3. F12 키 (Mac은 Cmd+Option+I) 로 개발자 도구 오픈
4. 'Network' 탭 클릭
5. 필터 입력창에 batchexecute 입력
6. 아무 노트북이나 클릭해서 요청 발생
7. 목록에서 batchexecute 요청 클릭
8. 오른쪽 패널에서 'Request Headers' 확인
9. cookie: 로 시작하는 줄 탐색
10. 쿠키 값 우클릭 후 'Copy value' 선택
11. 이 저장소의 cookies.txt 파일 오픈 또는 신규 생성
12. 쿠키 문자열 붙여넣기 후 저장
13. notebooklm-mcp-auth --file 후 cookies.txt 파일 링크 삽입
```

#### ② 설정 파일 수정 (`~/.config/opencode/opencode.json`)

Opencode가 로컬에 설치된 `notebooklm-mcp`를 인식하도록 설정.

```json
vim ~/.config/opencode/opencode.json

{
  "mcp": {
    "notebooklm-mcp": {
      "type": "local",
      "command": ["notebooklm-mcp"]
    }
  }
}
```

#### ③ 서버 실행

```bash
# 외부(n8n)에서 접속 가능하도록 0.0.0.0으로 서빙.
opencode serve --hostname 0.0.0.0
```

---

### Step 2. n8n 워크플로우 구성

n8n이 GeekNews를 긁어오고 AI에게 명령을 내림.

```
[Schedule Trigger]  →  [RSS & Code]  →  [LLM Filter]  →  [HTTP Request]
  매일 오전 8시         어제~오늘 뉴스     FE / AI 선별     Opencode 서버로 notebook 생성 요청
```

#### 각 노드 설명

**📅 Schedule Trigger**
매일 오전 8시에 워크플로우를 시작.

**📰 RSS & Code**
GeekNews 피드를 읽고, `pubDate`를 기준으로 *어제 아침 ~ 오늘 아침* 뉴스만 필터링.

**🤖 LLM Filter** *(핵심 단계)*
모든 뉴스를 다 들을 순 없으니, Frontend / AI 주제만 선별.

> **[시행착오]** 처음엔 비용 절감을 위해 로컬 LLM인 **Llama 3.2**를 사용함. 하지만 Structured Output Parser로 JSON 형식을 강제하자, 모델이 **존재하지 않는 가짜 링크(Hallucination)** 를 만들어내는 치명적인 문제가 발생함.
>
> **[해결]** 데이터 추출의 정확성을 위해 **OpenAI GPT-5-Mini** 로 교체하여 해결.

**🌐 HTTP Request (To Opencode)**
위에서 띄운 Opencode 서버로 뉴스 본문을 전송하고, 팟캐스트 생성을 요청함.
```bash
// 요청 프롬프트
<Content>에 대해 내용 파악 후 이 주제들에 관련하여 새 notebooklm 노트북 목록에 추가해 줘. 이후 이 노트북의 내용을 바탕으로 두 사람이 토론하는 **팟캐스트**를 만들어 줘. 나에게 아무것도 되묻지 말고 알아서 해줘.
```

`아무것도 되묻지 말고 알아서 해줘`의 이유: 블로킹을 방지하기 위함. HTTP Request는 요청(Request)을 보내면 응답(Response)을 받고 끝나기 때문에 "대화(Conversation)"가 이어지지 않음. 


---

## 3. 한계점 — The "Dirty" Truth

이 프로젝트는 "지금까지"의 결과물은 괜찮지만, 운영상 명확한 **Risk**가 존재한다.

### ⚠️ Unofficial의 불안함

`notebooklm-mcp-cli`는 구글의 **공식 도구가 아니다.** NotebookLM의 웹 페이지 구조나 내부 로직이 바뀌면, 이 워크플로우는 즉시 중단될 수 있다.

### 🍪 쿠키 기반 인증 (Cookie-based Auth)

API Key 방식이 아니라, 브라우저 세션(Cookie)을 활용하는 방식

- **유효기간:** 쿠키는 영원하지 않음. (짧게는 며칠, 길게는 1년)
- **폐기 조건:** 로그아웃하거나 보안 정책이 바뀌면 즉시 폐기
- **결과:** 잘 돌아가던 봇이 갑자기 멈추면, 서버에 접속해 수동으로 `nlm login`을 다시 실행해야 함.

---

## 4. 범용 서비스화에 대한 고민

혼자 쓰기엔 아까워서 **"Daily Tech Podcast 구독 서비스"** 를 만들어볼까 고민했으나, 현실적인 벽에 부딪혔다.

### ❌ 방법 1: SaaS 형태 (구독형 서비스)

사용자의 구글 계정으로 대신 팟캐스트를 생성해주는 방식.

**불가능한 이유:**
- **보안/UX 장벽:** 일반 사용자에게 *"F12 눌러서 쿠키 복사해서 붙여넣으세요"* 라고 하는 건 현실적으로 불가능. (그 쿠키를 남의 DB에 저장한다는 것도 문제)
- **자동화 불가:** OAuth 로그인을 서버가 대신 처리하는 것은 보안상 막혀 있음.

### 🔺 방법 2: Self-Hosted 배포 (Docker Compose)

그나마 현실적인 대안은 **설치형 패키지**를 배포하는 것.

`docker-compose.yml` 파일에 n8n과 opencode 서버를 묶어서 배포하는 구조이지만, 한계가 명확합니다.

- 사용자가 **직접 도커를 띄워야** 함
- 인증 정보(cookie)를 호스트 파일 시스템에서 컨테이너로 **볼륨 마운트** 해야 하는 번거로움
- 쿠키 만료 시, 컨테이너를 내리고 → 호스트에서 재인증 → 다시 올리는 **재인증의 고통**

---

## 5. 결론

결국 이 프로젝트는 **"나만을 위한, 조금 손이 많이 가는 명품 비서"** 로 남을 것 같음.

하지만 **n8n의 유연함**과 **NotebookLM의 강력한 성능**을 확인하기엔 충분했음.

공식 API가 나오기 전까지는, 가끔 서버에 들어가 `nlm login`을 쳐주는 수고로움을 감수하고서라도 — 매일 아침 AI가 말해주는 뉴스를 들어야겠다
