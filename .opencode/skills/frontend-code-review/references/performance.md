# 규칙 카탈로그 — 성능

## React Flow 데이터 사용

IsUrgent: True
Category: Performance

### 설명

React Flow를 렌더링할 때, UI 소비를 위해서는 `useNodes`/`useEdges`를 선호하고, 노드/엣지 상태를 변경하거나 읽는 콜백 내부에서는 `useStoreApi`를 사용하세요. 이러한 훅 외부에서 Flow 데이터를 수동으로 가져오는 것을 피하세요.

## 복잡한 prop 메모이제이션

IsUrgent: True
Category: Performance

### 설명

복잡한 prop 값(객체, 배열, 맵)을 자식 컴포넌트에 전달하기 전에 `useMemo`로 감싸서 안정적인 참조를 보장하고 불필요한 렌더링을 방지하세요.

성능 규칙을 추가, 편집 또는 제거할 때 이 파일을 업데이트하여 카탈로그를 정확하게 유지하세요.

잘못된 예:

```tsx
<HeavyComp
    config={{
        provider: ...,
        detail: ...
    }}
/>
```

올바른 예:

```tsx
const config = useMemo(() => ({
    provider: ...,
    detail: ...
}), [provider, detail]);

<HeavyComp
    config={config}
/>
```
