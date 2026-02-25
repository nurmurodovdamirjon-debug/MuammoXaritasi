import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useTelegram } from '@/hooks/useTelegram'
import { storageService } from '@/services/storageService'
import { Button } from '@/components/ui/Button'

const SLIDES = [
  {
    badge: '📍 Shahar xaritasi',
    title: <>Shahardagi<br />muammolarni<br /><span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">xaritada ko'ring</span></>,
    desc: "Maktablar, yo'llar, kasalxonalar va boshqa infratuzilma muammolari real vaqtda xaritada ko'rsatiladi.",
  },
  {
    badge: '🤖 Sun\'iy intellekt',
    title: <>AI muammoni<br /><span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">avtomatik tahlil</span><br />qiladi</>,
    desc: "Faqat rasm va qisqacha tavsif yuboring. Claude AI muammoni kategoriyalaydi, mas'ul idorani aniqlaydi.",
  },
  {
    badge: '🏆 Natija kuzating',
    title: <>Muammo<br /><span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">hal bo'lganini</span><br />kuzating</>,
    desc: "Har bir xabar yuborilgandan so'ng uning holati kuzatiladi. Muammo hal bo'lsa siz birinchi xabar olasiz!",
  },
]

export function OnboardingPage() {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()
  const { haptic } = useTelegram()
  const isLast = index === SLIDES.length - 1

  const next = () => {
    haptic.light()
    if (isLast) {
      storageService.set(storageService.keys.ONBOARDING_DONE, true)
      navigate(ROUTES.MAP, { replace: true })
    } else {
      setIndex((i) => i + 1)
    }
  }

  const skip = () => {
    haptic.light()
    storageService.set(storageService.keys.ONBOARDING_DONE, true)
    navigate(ROUTES.MAP, { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full transition-transform duration-300" style={{ transform: `translateX(-${index * 100}%)` }}>
          {SLIDES.map((s, i) => (
            <div key={i} className="flex min-w-full flex-1 flex-col items-center justify-center px-8 py-10 text-center">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-glow px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-accent">
                {s.badge}
              </span>
              <h2 className="mb-3 text-[28px] font-black leading-tight tracking-tight">{s.title}</h2>
              <p className="text-[15px] leading-relaxed text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="shrink-0 space-y-4 px-6 pb-10">
        <div className="flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-accent' : 'w-2 bg-bg-surface3'}`}
            />
          ))}
        </div>
        <Button onClick={next} fullWidth size="lg" variant="primary">
          {isLast ? '🚀 Boshlash' : 'Davom etish →'}
        </Button>
        {!isLast && (
          <button type="button" onClick={skip} className="w-full text-center text-[13px] font-medium text-text-tertiary">
            O'tkazib yuborish
          </button>
        )}
      </div>
    </div>
  )
}
