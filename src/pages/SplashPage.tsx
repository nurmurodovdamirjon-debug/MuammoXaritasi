import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useTelegram } from '@/hooks/useTelegram'
import { storageService } from '@/services/storageService'
import '@/styles/animations.css'

const SPLASH_DURATION_MS = 2500

export function SplashPage() {
  const navigate = useNavigate()
  const { tg } = useTelegram()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (tg) {
      tg.ready()
      tg.expand()
      tg.setHeaderColor('#0D0F14')
      tg.setBackgroundColor('#0D0F14')
    }
  }, [tg])

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.min((elapsed / SPLASH_DURATION_MS) * 100, 100))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      const done = storageService.get<boolean>(storageService.keys.ONBOARDING_DONE)
      navigate(done ? ROUTES.MAP : ROUTES.ONBOARDING, { replace: true })
    }, SPLASH_DURATION_MS)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-base">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,142,247,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div
            className="absolute rounded-full border border-accent/20 animate-ping"
            style={{
              width: 160,
              height: 160,
              animationDuration: '2.5s',
              animationIterationCount: 'infinite',
            }}
          />
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-[32px] bg-gradient-to-br from-accent to-accent-2 text-5xl shadow-[0_0_60px_rgba(79,142,247,0.3),0_20px_40px_rgba(0,0,0,0.4)]">
            📍
          </div>
        </div>
        <h1 className="mb-2 text-[30px] font-black tracking-tight">
          Muammo <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Xaritasi</span>
        </h1>
        <p className="mb-10 text-sm text-text-tertiary">Shahar infratuzilmasini birga yaxshilaymiz</p>
        <div className="absolute bottom-20 left-1/2 flex w-40 -translate-x-1/2 flex-col items-center gap-3">
          <div className="h-1 w-full overflow-hidden rounded-full bg-bg-surface3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="animate-pulse text-xs font-medium text-text-tertiary">Yuklanmoqda...</span>
        </div>
      </div>
      <p className="absolute bottom-8 text-[11px] text-text-tertiary">v1.0.0 · Telegram Mini App</p>
    </div>
  )
}
