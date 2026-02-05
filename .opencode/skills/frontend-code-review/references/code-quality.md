# 규칙 카탈로그 — 코드 품질

## 조건부 클래스 네임은 유틸리티 함수 사용

IsUrgent: True
Category: Code Quality

### 설명

조건부 CSS는 커스텀 삼항 연산자, 문자열 연결 또는 템플릿 문자열 대신 공유된 `classNames` 유틸리티를 통해 처리하세요. 클래스 로직을 중앙화하면 컴포넌트의 일관성을 유지하고 유지보수가 쉬워집니다.

### 권장 수정

```ts
import { cn } from '@/utils/classnames'
const classNames = cn(isActive ? 'text-primary-600' : 'text-gray-500')
```

## Tailwind 우선 스타일링

IsUrgent: True
Category: Code Quality

### 설명

Tailwind CSS 유틸리티 클래스를 우선적으로 사용하고, Tailwind 조합으로 필요한 스타일을 구현할 수 없는 경우가 아니라면 새로운 `.module.css` 파일 추가를 지양하세요. Tailwind에 스타일을 유지하면 일관성이 향상되고 유지보수 오버헤드가 줄어듭니다.

코드 품질 규칙을 추가, 편집 또는 제거할 때 이 파일을 업데이트하여 카탈로그를 정확하게 유지하세요.

## 쉬운 오버라이드를 위한 클래스네임 순서

### 설명

컴포넌트를 작성할 때, 하위 소비자가 스타일을 오버라이드하거나 확장할 수 있도록 항상 들어오는 `className` prop을 컴포넌트 자체의 클래스 값 뒤에 배치하세요. 이렇게 하면 컴포넌트의 기본값을 유지하면서도 외부 호출자가 특정 스타일을 변경하거나 제거할 수 있습니다.

예시:

```tsx
import { cn } from '@/utils/classnames'

const Button = ({ className }) => {
  return <div className={cn('bg-primary-600', className)}></div>
}
```
