import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { EmptyState } from '@/components/ui/EmptyState'
import { useUser } from '@/hooks/useUser'
import { useTelegram } from '@/hooks/useTelegram'
import { formatMemberSince } from '@/utils/date'
import {
  PROFILE_TITLE,
  PROFILE_SINCE_PREFIX,
  LEVEL_NAMES,
  LEVEL_NEXT_PREFIX,
  XP_LEFT_SUFFIX,
  STAT_SENT,
  STAT_RESOLVED,
  STAT_VOTES,
  BADGES_SECTION_TITLE,
  PROFILE_EMPTY_TITLE,
  PROFILE_EMPTY_DESCRIPTION,
  MOCK_USER,
  MOCK_SINCE,
  MOCK_USERNAME,
  PROFILE_BADGES,
} from '@/constants/profile'
import type { AppUser } from '@/types/user'

/** Profil sahifasida ko'rsatish uchun birlashtirilgan ma'lumot */
interface ProfileDisplay {
  first_name: string
  username: string
  since: string
  level: number
  xp: number
  xp_to_next: number
  problems_count: number
  resolved_count: number
  votes_given: number
}

function toDisplay(user: AppUser | null, isMock: boolean): ProfileDisplay | null {
  if (user) {
    return {
      first_name: user.first_name,
      username: user.username ? `@${user.username}` : '—',
      since: `${PROFILE_SINCE_PREFIX}: ${formatMemberSince(user.created_at)}`,
      level: user.level,
      xp: user.xp,
      xp_to_next: user.xp_to_next,
      problems_count: user.problems_count,
      resolved_count: user.resolved_count,
      votes_given: user.votes_given,
    }
  }
  if (isMock) {
    return {
      first_name: MOCK_USER.first_name,
      username: `@${MOCK_USERNAME}`,
      since: `${PROFILE_SINCE_PREFIX}: ${MOCK_SINCE}`,
      level: MOCK_USER.level,
      xp: MOCK_USER.xp,
      xp_to_next: MOCK_USER.xp_to_next,
      problems_count: MOCK_USER.problems_count,
      resolved_count: MOCK_USER.resolved_count,
      votes_given: MOCK_USER.votes_given,
    }
  }
  return null
}

export function ProfilePage() {
  const { user: tgUser } = useTelegram()
  const { data: user, isLoading } = useUser()
  const display = toDisplay(user ?? null, !tgUser)

  return (
    <ScreenLayout>
      <TopBar title={PROFILE_TITLE} rightAction={<span className="text-xl">⚙️</span>} />
      <div className="min-h-0 flex-1 overflow-y-auto" style={{ paddingBottom: 'calc(var(--nav-h) + 8px)' }}>
        {isLoading ? (
          <div className="space-y-4 px-4 py-4">
            <div className="flex items-center gap-4">
              <div className="h-[72px] w-[72px] shrink-0 animate-pulse rounded-[22px] bg-bg-surface" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 animate-pulse rounded bg-bg-surface" />
                <div className="h-4 w-24 animate-pulse rounded bg-bg-surface" />
              </div>
            </div>
            <div className="h-24 animate-pulse rounded-xl bg-bg-surface" />
          </div>
        ) : display ? (
          <>
            {/* Profile hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-bg-surface to-bg-base px-4 pt-5 pb-6">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 80% 20%, rgba(79,142,247,0.08) 0%, transparent 60%)',
                }}
              />
              <div className="relative z-10 flex items-center gap-4 pb-5">
                <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-br from-accent to-accent-2 text-[32px] shadow-[0_8px_24px_rgba(79,142,247,0.3)]">
                  👤
                  <span
                    className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-bg-base bg-[var(--green)]"
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-xl font-extrabold text-text-primary">
                    {display.first_name}
                  </h2>
                  <p className="text-sm font-semibold text-accent">{display.username}</p>
                  <p className="text-xs text-[var(--text-3)]">{display.since}</p>
                </div>
              </div>

              {/* Level card */}
              <div
                className="relative z-10 rounded-[var(--radius-sm)] border p-3.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,142,247,0.1), rgba(107,94,255,0.1))',
                  borderColor: 'rgba(79,142,247,0.2)',
                }}
              >
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm">
                      🌟
                    </div>
                    <span className="text-[13px] font-bold text-accent">
                      {LEVEL_NAMES[display.level] ?? LEVEL_NAMES[1]} — {display.level}-daraja
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[var(--text-3)]">
                    {display.xp} / {display.xp_to_next} XP
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded bg-bg-surface3">
                  <div
                    className="h-full rounded bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-300"
                    style={{
                      width: `${Math.min(100, (display.xp / display.xp_to_next) * 100)}%`,
                    }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-[var(--text-3)]">
                  <span>
                    {LEVEL_NEXT_PREFIX} {LEVEL_NAMES[Math.min(display.level + 1, 5)] ?? LEVEL_NAMES[5]}
                  </span>
                  <span>
                    {Math.max(0, display.xp_to_next - display.xp)} {XP_LEFT_SUFFIX}
                  </span>
                </div>
              </div>
            </section>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2.5 px-4 py-4">
              <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-bg-surface p-3.5 text-center">
                <div className="mb-1.5 text-[22px]">📤</div>
                <div className="text-[22px] font-black text-accent">{display.problems_count}</div>
                <div className="text-[10px] font-semibold text-[var(--text-3)]">{STAT_SENT}</div>
              </div>
              <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-bg-surface p-3.5 text-center">
                <div className="mb-1.5 text-[22px]">✅</div>
                <div className="text-[22px] font-black text-[var(--green)]">
                  {display.resolved_count}
                </div>
                <div className="text-[10px] font-semibold text-[var(--text-3)]">{STAT_RESOLVED}</div>
              </div>
              <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-bg-surface p-3.5 text-center">
                <div className="mb-1.5 text-[22px]">👍</div>
                <div className="text-[22px] font-black text-[var(--orange)]">
                  {display.votes_given}
                </div>
                <div className="text-[10px] font-semibold text-[var(--text-3)]">{STAT_VOTES}</div>
              </div>
            </div>

            {/* Badges */}
            <section className="px-4 pb-4">
              <h3 className="mb-3 text-[15px] font-bold text-text-primary">
                🏅 {BADGES_SECTION_TITLE}
              </h3>
              <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                {PROFILE_BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex w-20 shrink-0 flex-col items-center gap-1.5 rounded-[var(--radius-sm)] border p-3 text-center ${
                      badge.earned
                        ? 'border-[rgba(79,142,247,0.3)] bg-[rgba(79,142,247,0.06)]'
                        : 'border-[var(--border)] bg-bg-surface opacity-45'
                    }`}
                  >
                    <span className="text-[28px] leading-none">{badge.icon}</span>
                    <span className="text-[9px] font-bold leading-tight text-[var(--text-2)]">
                      {badge.name_uz}
                    </span>
                    {badge.earned && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[var(--green)]"
                        aria-hidden
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <EmptyState
            title={PROFILE_EMPTY_TITLE}
            description={PROFILE_EMPTY_DESCRIPTION}
          />
        )}
      </div>
      <BottomNav />
    </ScreenLayout>
  )
}
