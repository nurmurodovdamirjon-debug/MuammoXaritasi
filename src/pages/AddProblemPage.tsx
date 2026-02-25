import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { ProblemForm, type ProblemFormValues } from '@/components/problem/ProblemForm'
import { useLocation } from '@/hooks/useLocation'
import { useAnalyzeProblem } from '@/hooks/useAnalyzeProblem'
import { useCreateProblem } from '@/hooks/useCreateProblem'
import { useTelegram } from '@/hooks/useTelegram'
import { ROUTES } from '@/constants/routes'
import type { District } from '@/types/problem'
import { logger } from '@/utils/logger'

export function AddProblemPage() {
  const { location, address, loading: locationLoading, refetch: refetchLocation } = useLocation()
  const { result: aiAnalysis, loading: aiLoading, analyze: analyzeText } = useAnalyzeProblem()
  const createMutation = useCreateProblem()
  const { mainButton, haptic } = useTelegram()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => {
      haptic.medium()
      const form = document.querySelector('form')
      if (form) form.requestSubmit()
    }
    mainButton.show('✅ Muammoni yuborish')
    mainButton.onClick(handler)
    return () => {
      mainButton.offClick(handler)
      mainButton.hide()
    }
  }, [mainButton, haptic])

  const handleSubmit = async (values: ProblemFormValues) => {
    if (!location) return
    haptic.success()
    mainButton.showProgress()
    try {
      const problem = await createMutation.mutateAsync({
        ...values,
        location,
        address: address || 'Toshkent',
        district: (values.district ?? 'yunusobod') as District,
      })
      mainButton.hideProgress()
      navigate(ROUTES.SUCCESS, { state: { problemId: problem.id } })
    } catch (e) {
      mainButton.hideProgress()
      logger.error('Create problem', e)
      window.Telegram?.WebApp?.showAlert?.('Xatolik yuz berdi. Qayta urinib ko\'ring.')
    }
  }

  const handleDescriptionChange = (text: string) => {
    analyzeText(text)
  }

  return (
    <ScreenLayout>
      <TopBar title="Muammo qo'shish" showBack />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <ProblemForm
          location={location}
          address={locationLoading ? 'Aniqlanmoqda...' : address}
          onLocationChange={refetchLocation}
          aiAnalysis={aiAnalysis}
          aiLoading={aiLoading}
          onSubmit={handleSubmit}
          onPhotoClick={() => haptic.light()}
          onDescriptionChange={handleDescriptionChange}
          defaultValues={{
            district: 'yunusobod',
            location,
            address,
          }}
        />
      </div>
      <BottomNav />
    </ScreenLayout>
  )
}
