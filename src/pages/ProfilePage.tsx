import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { useUser } from '@/hooks/useUser'
import { EmptyState } from '@/components/ui/EmptyState'

export function ProfilePage() {
  const { data: user, isLoading } = useUser()

  return (
    <ScreenLayout>
      <TopBar title="Mening sahifam" rightAction={<span className="text-xl">⚙️</span>} />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {isLoading ? (
          <div className="h-24 animate-pulse rounded-xl bg-bg-surface" />
        ) : user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-br from-accent to-accent-2 text-3xl">
                👤
              </div>
              <div>
                <h2 className="text-xl font-extrabold">{user.first_name} {user.last_name ?? ''}</h2>
                <p className="text-sm text-accent font-semibold">@{user.username ?? 'user'}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-bg-surface p-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-tertiary">Daraja</span>
                <span className="font-bold text-accent">{user.level}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg-surface3">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                  style={{ width: `${(user.xp / user.xp_to_next) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-text-tertiary">{user.xp} / {user.xp_to_next} XP</p>
            </div>
          </div>
        ) : (
          <EmptyState title="Ma'lumot topilmadi" description="Telegram orqali kirish kerak" />
        )}
      </div>
      <BottomNav />
    </ScreenLayout>
  )
}
