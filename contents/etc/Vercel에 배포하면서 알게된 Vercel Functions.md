---
title: Vercel에 배포하면서 알게된 Vercel Functions
description: Vercel의 Serverless Functions와 Fluid Compute 모델에 대한 이해. 기존 서버리스의 한계를 극복하고 비용 효율성과 성능을 최적화하는 방법을 알아봅니다.
createdAt: 2026-01-02T08:43:45.463Z
---

# Vercel Deploy - Serverless Functions


## Serverless 아키텍쳐

- Serverless: 자체 서버를 관리하지 않고도 서비스를 구축하고 실행할 수 있는 컴퓨팅 모델. (ex. AWS 람다 함수)

### Server vs Serverless

| Server | Serverless|
| -- | -- |
| 단일 서버에 어플리케이션 할당 | 서버에 어플리케이션이 할당되지않음 |
| 상시 가동 | 요청이 발생하면 서버의 컴퓨팅 인스턴스가 가동된 후 요청 처리 후 종료됨 |

### 장점
  - 수요에 따라 확장되고 가용한 리소스를 제공하여 탄력적인 인프라를 구축할 수 있게 해줌.
  - 비용 최적화
  - 인프라 관리 부담 감소

### 단점

  - Cold Start. 한동한 사용되지 않아 실행환경이 종료된 함수를 호출할 때, 새로운 컨테이너나 리소스를 준비하는 과정에서 발생하는 지연시간.

  - 디버깅/모니터링 어려움. 인프라를 직접 관리하지 않기 때문에, 시스템 수준의 가시성과 제어력이 떨어짐.



## Compute

컴퓨팅은 클라이언트/서버(Origin, CDN, Edge)에서 발생한다.

### 실제 컴퓨팅

1. 배포가 완료되면 Vercel Function 또는 Static Assets가 생성된다.

![alt text](<../images/Vercel Function_2.png>)

1. 해당 빌드 결과물들이 Vercel CDN 또는 지정된 Region에 배포된다.

2. 사용자가 해당 사이트를 방문하면, 가장 가까운 edge region으로 요청이 전송된다.

3. edge에서 static asset을 제공하거나 Vercel Function을 실행하여 응답한다.

### Fluid Compute

- Serverless와 서버 사이의 하이브리드 접근방식.

- 기존 Serverless는 특정 페이지에 대한 트래픽이 증가하면 인스턴스 수가 크게 증가하면서 비용이 크게 증가할 수 있다.
예를 들어, 두개의 function 모두 서버 인스턴스가 "compute -> 외부 API를 호출-> API 응답 -> compute" 동작을한다. 이 때 두개의 인스턴스 모두 외부 API 호출/응답 사이에 Idle 상태가 존재하는데 이 시간이 길다면 비용이 매우 낭비가 된다.

![alt text](<../images/Vercel Function_3.png>)

- Fluid compute에서는 Function을 처리할 용량이 충분하다면 해당 인스턴스를 최대한 활용한다. 

![alt text](<../images/Vercel Function_4.png>)

#### 장점
  - Zero configuration: 사전 설정된 기본값을 사용하면 성능과 비용 효율을 최적화 가능.
  - 최적화된 동시성: 기존 인스턴스를 최대한 활용하므로 단일 함수 인스턴스 내에서 여러 호출을 처리하여 리소스를 최적화. 비용 절감
  - Cold start 최적화: 
    - 기존 인스턴스를 최대한 활용하므로 새 함수 인스턴스를 초기화해야할 가능성이 낮아짐.
    - Bytecode caching: Vercel Function은 JS파일의 컴파인된 바이트코드를 첫 실행 후 저장하여 이후 콜드 스타트 시 재컴파일 필요성을 제거. Production 환경에서만 적용됨. 
    - pre warming: Cold start 지연없이 요청을 처리할 준비가 된 함수를 유지.
  - 백그라운드 프로세싱: 사용자의 요청을 처리한 후, waitUntil을 사용하여 백그라운드 작업을 계속 실행가능. 이를 통해 로깅, 분석 같은 시간이 많이 소요되는 작업을 백그라운드에서 수행하면서 사용자에게 응답을 줄 수 있다.

## Serverless Functions ([Vercel Functions](https://vercel.com/docs/functions))

Vercel Function은 서버를 관리하지 않고도 서버측 코드를 실행할 수 있게 해준다. 
- 역할
  - 메모리 및 인스턴스 자동 조정
  - 외부 API 호출 및 데이터베이스에 대한 연결 처리
  - fluid compute를 통해 향상된 동시성 제공

![alt text](<../images/Vercel Function_1.png>)

## Question

Q. vercel function은 csr ssg 환경에서는 그닥 필요없는거 아니야?
A. 페이지가 Static Assets 뿐이라도 API Routes, DB 접근 등등에서 vercel function이 필요할수있다.


## 참조

- https://vercel.com/docs/fundamentals/what-is-compute#serverless
- https://vercel.com/docs/fluid-compute
- https://vercel.com/docs/functions

  

