import { memo } from 'react'
import { Button } from './Button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export const ErrorState = memo(function ErrorState({
  title = 'Xatolik yuz berdi',
  message = "Ma'lumotlarni yuklashda xatolik. Qayta urinib ko'ring.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
      <div className="mb-4 text-5xl">❌</div>
      <h3 className="mb-2 text-lg font-bold text-text-primary">{title}</h3>
      <p className="mb-6 text-sm text-text-secondary">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" size="md">
          Qayta urinish
        </Button>
      )}
    </div>
  )
})
