import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { PageStatus } from './PageStatus'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export function PageError() {
  return (
    <PageStatus
      kind="error"
      eyebrow="문제가 발생했습니다"
      title="페이지를 불러오지 못했습니다"
      description="일시적인 오류일 수 있습니다. 다시 시도하거나 홈으로 이동해 주세요."
      actions={
        <>
          <Button onClick={() => window.location.reload()}>다시 시도</Button>
          <Button href="/" tone="secondary">
            홈으로 이동
          </Button>
        </>
      }
    />
  )
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Page render failed', error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return <PageError />
    }

    return this.props.children
  }
}
