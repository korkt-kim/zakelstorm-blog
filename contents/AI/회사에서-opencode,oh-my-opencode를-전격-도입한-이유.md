---
title: '회사에서 OpenCode,Oh-My-OpenCode를 전격 도입한 이유'
description: ''
createdAt: '2026-02-19T05:29:31.949Z'
---

최근 수많은 AI 코딩 어시스턴트(Cursor, Windsurf, Claude Code 등)가 쏟아지는 가운데,
내가 회사에서 최종 정착한 툴은 **OpenCode**와 핵심 플러그인 **Oh-My-OpenCode(OMO)** 다.

왜 훌륭한 GUI 툴들을 두고 터미널 기반 툴을 선택했을까? OMO는 대체 어떤 마법을 부리길래
개발자들 사이에서 화제인지, 도입 배경과 핵심 기능, 내부 동작 원리를 정리해 본다.

## 1. 도입 이유: 

### 모델 선택의 자율성

가장 결정적인 이유는 **확장성과 모델의 자유도**다.
특정 기업의 IDE를 쓰면 보통 그들이 밀어주는 모델(Claude나 OpenAI 등)에 종속되기 마련이다.

하지만 OpenCode 환경에서는 Gemini, Claude, OpenAI 등 현존하는 최고 수준의 모델을
동시에, 목적에 맞게 섞어 쓸 수 있다.

(예시)

| 역할 | 할당 모델 |
|------|-----------|
| 프론트엔드 UI/UX | Gemini 3 Pro (시각적 이해도 우수) |
| 복잡한 논리/기획 | Claude 3.5 Sonnet 또는 GPT 계열 |
| 빠른 코드베이스 탐색 | Haiku, Gemini Flash 등 경량 모델 |


내가 다니는 회사는 Gemini, Anthropic, OpenAI Provider를 모두 제공하고 있다. 이 장점을 살리기위해 OpenCode/OMO를 도입했다.

### 멀티 에이전트 기반의 비동기 협업(이젠 아님 ㅜ)
예전에는 OpenCode만이 다수의 에이전트에게 분업(Multi-agent orchestration)하는 기능을 지원했다.
하지만 최근에는 [Oh-My-ClaudeCode](https://github.com/Yeachan-Heo/oh-my-claudecode)가 등장하면서 이 기능이 다른 Claude Code에서도 가능해졌다.



## 2. Oh-My-OpenCode의 핵심 에이전트

### 🪨 Sisyphus — UltraWorker

Multi Agent Orchestrator

- 직접 코드를 짜서 컨텍스트를 낭비하지 않음
- 프로젝트 분석 후 하위 모델들에게 병렬로 작업을 지시하고 결과물 취합
- 막히면 고지능 모델(전략 백업)을 호출해 스스로 탈출구 모색

### 🧠 Prometheus — Plan Builder

- 개발자에게 **역질문(인터뷰)** 을 던지며 요구사항을 구체화하면서 계획 수립
- 불확실성이 제거되면 완벽한 작업 계획(Plan)을 세워 타 에이전트가 검토하게 함
- `.sisyphus/drafts`: Prometheus나 리서처(Librarian, Explore) 에이전트가 코드를 뒤적거리며 알아낸 정보들을 까먹지 않게 대충 적어두는 곳. 정해진 양식이 없고, 여러 에이전트가 수시로 읽고 쓰며 서로 문맥(Context)을 공유하는 칠판 역할.
- `.sisyphus/plans`: Prometheus가 완벽한 계획을 세운 후, Atlas가 이를 길행함.

### 🗺️ Atlas — Plan Executor

- Prometheus의 계획서를 받아 `/start-work` 명령어로 가동
- 다수의 Junior(실무) 에이전트와 Librarian(리서치) 에이전트를 동시 스폰(Spawn)해 병렬 처리


