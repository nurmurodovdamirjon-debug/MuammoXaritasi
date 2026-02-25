import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { useNotifications } from '@/hooks/useNotifications'
import { EmptyState } from '@/components/ui/EmptyState'

export function NotificationsPage() {
  const { data: notifications = [], isLoading } = useNotifications()

  return (
    <ScreenLayout>
      <TopBar title="Bildirishnomalar" />
      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-2 p-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-bg-surface" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState
            icon="🔔"
            title="Bildirishnoma yo'q"
            description="Yangilanishlar shu yerda ko'rinadi"
          />
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {notifications.map((n) => (
              <li key={n.id} className="p-4">
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-text-secondary">{n.description}</p>
                <p className="mt-1 text-xs text-text-tertiary">{n.created_at}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <BottomNav />
    </ScreenLayout>
  )
}
