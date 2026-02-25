import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { Toggle } from '@/components/ui/Toggle'
import { useState } from 'react'

export function SettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)

  return (
    <ScreenLayout>
      <TopBar title="Sozlamalar" showBack />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-6">
          <section>
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
              Bildirishnomalar
            </h3>
            <div className="rounded-xl border border-[var(--border)] bg-bg-surface">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                <div>
                  <p className="font-semibold">Push bildirishnomalar</p>
                  <p className="text-xs text-text-tertiary">Muammo holati o'zgarganda</p>
                </div>
                <Toggle checked={pushEnabled} onChange={setPushEnabled} />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-semibold">Haftalik hisobot</p>
                  <p className="text-xs text-text-tertiary">Har dushanba kuni</p>
                </div>
                <Toggle checked={weeklyReport} onChange={setWeeklyReport} />
              </div>
            </div>
          </section>
          <p className="text-center text-xs text-text-tertiary">Muammo Xaritasi v1.0.0</p>
        </div>
      </div>
    </ScreenLayout>
  )
}
