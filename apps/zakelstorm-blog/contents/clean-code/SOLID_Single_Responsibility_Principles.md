---
title: Single Responsibility Principle (단일 책임 원칙)
description: 클래스를 변경하는 이유는 하나여야 한다는 단일 책임 원칙(SRP)의 개념과 위반 사례, 책임 분리를 통한 개선 방법을 설명합니다.
---

# Single Responsibility Principle (단일 책임 원칙)


![avatar2](../images/Avatar2.jpeg)

## 개요

### 단일 책임 원칙이란?

- 객체는 단 하나의 기능만 담당해야 한다.
- **클래스가 하나의 일만 해야한다 => X**
- **클래스를 변경하는 이유가 하나여야한다. => O** ✓

## 단일 책임 원칙을 지켰을때의 장점

- 한 기능의 변경으로부터 다른 기능의 변경으로의 연쇄작용에서 자유롭게 해준다.

## 단일 책임 원칙이 위반되었는지 아는 방법

1. **테스트하기 어려운 클래스가 있는지 판단**
   - 이유: 하나의 클래스가 너무 많은 책임을 가지고 있기 때문

2. **기능 수정 시 "아, 이것까지 고쳐야하네" 라고 생각되면 잘못 분리된 것**

## 단일 책임 원칙을 적용하는 방법

1. **클래스 명은 책임의 소재를 알 수 있게 작명**
   - 클래스명은 어떠한 기능을 담당하는지 알 수 있게 작명한다.
   - 액터 기반이 아닌 기능 기반으로 명명

2. **책임을 분리할 때 항상 결합도와 응집도를 따져가며**
   - 응집도: 높게
   - 결합도: 낮게 설정

## Exercise - 위반 예제

### Employee Class (문제점)

```java
class Employee {
    String name;
    String position;

    Employee(String name, String position) {
        this.name = name;
        this.position = position;
    }

    // * 초과 근무 시간을 계산하는 메서드 (두 팀에서 공유하여 사용)
    calculateExtraHour() {
        // ...
    }

    // * 급여를 계산하는 메서드 (회계팀에서 사용)
    calculatePay() {
        // ...
        this.calculateExtraHour();
        // ...
    }

    // * 근무시간을 계산하는 메서드 (인사팀에서 사용)
    reportHours() {
        // ...
        this.calculateExtraHour();
        // ...
    }

    // * 변경된 정보를 DB에 저장하는 메서드 (기술팀에서 사용)
    saveDatabase() {
        // ...
    }
}
```

### 뭐가 문제일까?

- 회계팀에서 급여를 계산하는 기존의 방식을 새로 변경했을 때, `calculateExtraHours()`를 수정하면 인사팀에서는 기존 방식을 사용한다는 충돌 발생
- **원인**: Employee 클래스가 **회계팀, 인사팀, 기술팀 3개의 액터**에 대한 기능(책임)을 한꺼번에 가지고 있음

## 개선 예제 - 책임 분리

### 개선된 구조

```js
class Employee {
    String name;
    String position;

    Employee(String name, String position) {
        this.name = name;
        this.position = position;
    }

    // * 급여를 계산하는 메서드 (회계팀에서 사용)
    calculatePay() {
        // ...
        this.calculateExtraHour();
        // ...
    }

    // * 근무시간을 계산하는 메서드 (인사팀에서 사용)
    reportHours() {
        // ...
        this.calculateExtraHour();
        // ...
    }
}

class PayCalculator {
    calculateExtraHour() {
        // ...
    }

    calculatePay() {
        // ...
        this.calculateExtraHour();
        // ...
    }
}

class HourReporter {
    calculateExtraHour() {
        // ...
    }

    reportHours() {
        // ...
        this.calculateExtraHour();
        // ...
    }
}

class DBSaver {
    constructor() {}

    saveEmployeeDatabase(EmployeeInstance) { }
}
```

### 개선점

- 각 클래스가 **하나의 책임**만 담당
- 회계팀의 요구사항 변경이 인사팀에 영향을 주지 않음
- 코드 유지보수성과 테스트 용이성 향상
