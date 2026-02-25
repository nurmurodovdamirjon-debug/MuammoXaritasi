import { memo } from 'react'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
}

export const Skeleton = memo(function Skeleton({
  className = '',
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-[var(--radius-sm)] bg-bg-surface3 ${className}`}
      style={{
        ...(width != null && { width: typeof width === 'number' ? `${width}px` : width }),
        ...(height != null && { height: typeof height === 'number' ? `${height}px` : height }),
      }}
    />
  )
})
