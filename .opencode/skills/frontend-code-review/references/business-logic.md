# 규칙 카탈로그 — 비즈니스 로직

## Node 컴포넌트에서 workflowStore 사용 금지

IsUrgent: True

### 설명

노드 컴포넌트의 파일 경로 패턴: `web/app/components/workflow/nodes/[nodeName]/node.tsx`

노드 컴포넌트는 템플릿에서 RAG Pipe를 생성할 때도 사용되지만, 해당 컨텍스트에는 workflowStore Provider가 없어 빈 화면이 표시됩니다. [이 이슈](https://github.com/langgenius/dify/issues/29168)가 정확히 이 이유로 발생했습니다.

### 권장 수정

`import useNodes from '@/app/components/workflow/store/workflow/use-nodes'` 대신 `import { useNodes } from 'reactflow'`를 사용하세요.
