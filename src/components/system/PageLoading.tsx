import { PageStatus } from './PageStatus'

export function PageLoading() {
  return (
    <PageStatus
      kind="loading"
      eyebrow="페이지 준비 중"
      title="콘텐츠를 불러오고 있습니다"
      description="잠시만 기다려 주세요. 곧 요청한 페이지를 보여드릴게요."
    />
  )
}
