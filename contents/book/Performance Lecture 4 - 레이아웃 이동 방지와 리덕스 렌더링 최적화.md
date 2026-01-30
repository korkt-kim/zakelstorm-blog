---
title: Performance Lecture 4 - 레이아웃 이동 방지와 리덕스 렌더링 최적화
description: CLS(누적 레이아웃 시프트) 문제를 해결하고 리덕스의 불필요한 리렌더링을 최적화하는 방법을 소개합니다. React Developer Tools의 Profiler로 성능 문제를 시각화하고, react-lazy-load-image-component를 활용한 이미지 최적화까지 배웁니다.
createdAt: 2026-01-08T08:43:45.463Z
---

# Performance Lecture 4 - 레이아웃 이동 방지와 리덕스 렌더링 최적화

## 개요

## 최적화 기법

- **이미지 지연 로딩**: IntersectionObserver 대신 react-lazy-load-image-component 라이브러리 사용
- **레이아웃 이동 피하기**
- **리덕스 렌더링 최적화**

## 최적화 툴

- **크롬 개발자 도구**
  - Network 패널
  - Performance 패널
  - Lighthouse 패널
- **React Developer Tools(Profiler)**

## 최적화

### 레이아웃 이동 피하기

요소의 사이즈를 미리 예측하여 해당 사이즈만큼 공간을 확보

### 리덕스 리렌더링 최적화

React Developer Tools를 설치후 Highlight updates when components render옵션 활성화. 불필요한 리렌더링 발생현황을 파악.
