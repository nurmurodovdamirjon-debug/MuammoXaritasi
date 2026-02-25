import { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { Category, Priority, District } from '@/types/problem'
import type { GeoPoint } from '@/types/problem'
import { CATEGORY_CONFIG, PRIORITY_CONFIG } from '@/constants/problem'
import { validateProblemForm } from '@/utils/validation'
import { Card } from '@/components/ui/Card'
import { Textarea } from '@/components/ui/Textarea'
import { AIAnalysisCard } from './AIAnalysisCard'
import type { AIAnalysis } from '@/types/problem'

export interface ProblemFormValues {
  description: string
  category: Category
  priority: Priority
  district: District
  location: GeoPoint | null
  address: string
  images: string[]
}

interface ProblemFormProps {
  defaultValues?: Partial<ProblemFormValues>
  location: GeoPoint | null
  address: string
  onLocationChange?: () => void
  onDescriptionChange?: (text: string) => void
  aiAnalysis: AIAnalysis | null
  aiLoading: boolean
  onSubmit: (values: ProblemFormValues) => void
  onPhotoClick?: () => void
}

const CATEGORIES: Category[] = ['school', 'medical', 'road', 'lighting', 'water']
const PRIORITIES: Priority[] = ['low', 'medium', 'high', 'critical']

export const ProblemForm = memo(function ProblemForm({
  defaultValues,
  location,
  address,
  onLocationChange,
  aiAnalysis,
  aiLoading,
  onSubmit,
  onPhotoClick,
  onDescriptionChange,
}: ProblemFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProblemFormValues>({
    defaultValues: {
      description: '',
      category: 'school',
      priority: 'medium',
      district: 'yunusobod',
      location: null,
      address: '',
      images: [],
      ...defaultValues,
    },
  })

  const description = watch('description')
  const category = watch('category')
  const priority = watch('priority')

  useEffect(() => {
    onDescriptionChange?.(description ?? '')
  }, [description, onDescriptionChange])

  const handleFormSubmit = (values: ProblemFormValues) => {
    const err = validateProblemForm({
      description: values.description,
      category: values.category,
      location: location ?? values.location,
    })
    if (err) return
    onSubmit({
      ...values,
      location: location ?? values.location ?? undefined!,
      address: address || values.address,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <Card padding="md" className="flex items-center gap-3">
        <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-xl">
          📍
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold">{address || 'Joylashuv aniqlanmoqda...'}</div>
          <div className="text-[11px] text-text-tertiary">Joylashuv avtomatik aniqlandi</div>
        </div>
        <button
          type="button"
          onClick={onLocationChange}
          className="text-[11px] font-semibold text-accent"
        >
          O'zgartir
        </button>
      </Card>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-text-secondary">
          Rasm qo'shish
        </label>
        <button
          type="button"
          onClick={onPhotoClick}
          className="flex w-full flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed border-accent/30 bg-bg-surface py-6 transition-colors active:border-accent active:bg-accent-glow"
        >
          <span className="text-3xl">📷</span>
          <span className="text-sm font-semibold">Rasm olish yoki yuklash</span>
          <span className="text-xs text-text-tertiary">Muammoni yaxshiroq ko'rsatish uchun</span>
        </button>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-text-secondary">
          Kategoriya
        </label>
        <div className="grid grid-cols-5 gap-2">
          {CATEGORIES.map((c) => {
            const cfg = CATEGORY_CONFIG[c]
            const isActive = category === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setValue('category', c)}
                className={`
                  flex flex-col items-center gap-1 rounded-[var(--radius-sm)] border px-1 py-2.5 transition-colors
                  ${isActive ? 'border-accent bg-accent-glow' : 'border-[var(--border)] bg-bg-surface'}
                `}
              >
                <span className="text-[22px]">{cfg.emoji}</span>
                <span className={`text-[9px] font-semibold ${isActive ? 'text-accent' : 'text-text-tertiary'}`}>
                  {cfg.label_uz}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <Textarea
        label="Muammoni tasvirlab bering"
        placeholder="Muammoni batafsil yozing. AI yordamida avtomatik tasniflanadi..."
        {...register('description', { minLength: 20, maxLength: 500 })}
        error={errors.description?.message}
      />

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-text-secondary">
          Shoshilinchlik darajasi
        </label>
        <div className="flex gap-2">
          {PRIORITIES.map((p) => {
            const cfg = PRIORITY_CONFIG[p]
            const isActive = priority === p
            return (
              <button
                key={p}
                type="button"
                onClick={() => setValue('priority', p)}
                className={`
                  flex flex-1 flex-col items-center gap-1 rounded-[var(--radius-sm)] border px-2 py-2.5 transition-colors
                  ${isActive ? 'border-[var(--border)]' : 'border-[var(--border)] bg-bg-surface'}
                `}
                style={isActive ? { borderColor: cfg.color, backgroundColor: cfg.bgColor } : undefined}
              >
                <span className="text-lg">
                  {p === 'critical' ? '🔴' : p === 'high' ? '🟠' : p === 'medium' ? '🟡' : '🟢'}
                </span>
                <span
                  className="text-[10px] font-semibold"
                  style={isActive ? { color: cfg.color } : { color: 'var(--text-3)' }}
                >
                  {cfg.label_uz}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {(aiAnalysis || aiLoading) && (
        <AIAnalysisCard analysis={aiAnalysis!} loading={aiLoading} />
      )}

      <button
        type="submit"
        className="w-full rounded-[var(--radius-sm)] bg-gradient-to-br from-accent to-accent-2 py-4 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(79,142,247,0.35)] active:scale-[0.97]"
      >
        ✅ Muammoni yuborish
      </button>
    </form>
  )
})
