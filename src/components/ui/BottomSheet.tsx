import { memo, type ReactNode } from 'react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export const BottomSheet = memo(function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  if (!isOpen) return null
  return (
    <>
      <div
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex max-h-[82%] flex-col overflow-hidden rounded-t-3xl border-t border-[var(--border-2)] bg-bg-surface shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex shrink-0 justify-center pt-3">
          <div className="h-1 w-9 rounded-full bg-bg-surface4" />
        </div>
        {title && (
          <div className="shrink-0 border-b border-[var(--border)] px-5 pb-3 pt-2">
            <h2 className="text-lg font-extrabold">{title}</h2>
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  )
})
