import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { SplashPage } from '@/pages/SplashPage'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { ProblemListPage } from '@/pages/ProblemListPage'
import { ProblemDetailPage } from '@/pages/ProblemDetailPage'
import { AddProblemPage } from '@/pages/AddProblemPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { StatisticsPage } from '@/pages/StatisticsPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { SearchPage } from '@/pages/SearchPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { SuccessPage } from '@/pages/SuccessPage'

const MapPage = lazy(() => import('@/pages/MapPage').then((m) => ({ default: m.MapPage })))

function preloadMapPage() {
  import('@/pages/MapPage')
}

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" aria-hidden />
    </div>
  )
}

export function Router() {
  useEffect(() => {
    const useIdle = typeof window.requestIdleCallback === 'function'
    const id = useIdle
      ? requestIdleCallback(() => preloadMapPage(), { timeout: 2500 })
      : window.setTimeout(preloadMapPage, 1500)
    return () => {
      if (useIdle && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.SPLASH} element={<SplashPage />} />
        <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
        <Route
          path={ROUTES.MAP}
          element={
            <Suspense fallback={<PageFallback />}>
              <MapPage />
            </Suspense>
          }
        />
        <Route path={ROUTES.PROBLEM_LIST} element={<ProblemListPage />} />
        <Route path={ROUTES.PROBLEM_DETAIL} element={<ProblemDetailPage />} />
        <Route path={ROUTES.ADD_PROBLEM} element={<AddProblemPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.STATISTICS} element={<StatisticsPage />} />
        <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        <Route path={ROUTES.SUCCESS} element={<SuccessPage />} />
        <Route path="*" element={<Navigate to={ROUTES.SPLASH} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
