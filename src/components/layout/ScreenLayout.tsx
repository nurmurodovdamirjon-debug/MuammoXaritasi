import { memo, type ReactNode } from 'react'

interface ScreenLayoutProps {
  children: ReactNode
  noPadding?: boolean
}

export const ScreenLayout = memo(function ScreenLayout({
  children,
  noPadding,
}: ScreenLayoutProps) {
  return (
    <div
      className={`
        flex min-h-0 flex-1 flex-col overflow-hidden bg-bg-base
        ${noPadding ? '' : 'pb-[var(--nav-h)]'}
      `}
    >
      {children}
    </div>
  )
})
