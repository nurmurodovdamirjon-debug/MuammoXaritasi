# MUAMMO XARITASI — CURSOR AGENT PROMPT
# Bu promptni Cursor'da New Chat ga to'liq ko'chir va yubor

---

## LOYIHA HAQIDA

Muammo Xaritasi — Toshkent shahrining infratuzilma muammolarini
xaritada ko'rsatadigan Telegram Mini App.

Foydalanuvchilar: ko'cha muammosi, maktab, kasalxona, yo'l, suv
ta'minotidagi nosozliklarni xaritaga qo'shadi.
Claude AI muammoni tahlil qilib, tegishli vazirlikka yuboradi.

**Stack:** React 18 + Vite + TypeScript + Tailwind CSS + Supabase + Mapbox GL JS
**State:** Zustand + TanStack Query
**Platform:** Telegram Mini App (window.Telegram.WebApp)
**AI:** Claude API (Supabase Edge Function orqali)
**Deploy:** Dokploy (Docker + Nginx)

---

## QADAM 1 — LOYIHA TUZILMASI

Quyidagi to'liq fayl tuzilmasini yarat:

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Toggle.tsx
│   │   ├── BottomSheet.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorState.tsx
│   ├── layout/
│   │   ├── ScreenLayout.tsx
│   │   ├── TopBar.tsx
│   │   └── BottomNav.tsx
│   ├── map/
│   │   ├── MapView.tsx
│   │   ├── MapPin.tsx
│   │   └── HeatmapLayer.tsx
│   └── problem/
│       ├── ProblemCard.tsx
│       ├── ProblemCardSkeleton.tsx
│       ├── ProblemDetail.tsx
│       ├── ProblemForm.tsx
│       ├── AIAnalysisCard.tsx
│       └── StatusTimeline.tsx
├── pages/
│   ├── SplashPage.tsx
│   ├── OnboardingPage.tsx
│   ├── MapPage.tsx
│   ├── ProblemListPage.tsx
│   ├── ProblemDetailPage.tsx
│   ├── AddProblemPage.tsx
│   ├── ProfilePage.tsx
│   ├── StatisticsPage.tsx
│   ├── NotificationsPage.tsx
│   ├── SearchPage.tsx
│   ├── SettingsPage.tsx
│   └── SuccessPage.tsx
├── hooks/
│   ├── useTelegram.ts
│   ├── useProblems.ts
│   ├── useProblemDetail.ts
│   ├── useCreateProblem.ts
│   ├── useAnalyzeProblem.ts
│   ├── useLocation.ts
│   ├── useUser.ts
│   └── useNotifications.ts
├── stores/
│   ├── problemStore.ts
│   ├── userStore.ts
│   └── uiStore.ts
├── services/
│   ├── problemService.ts
│   ├── userService.ts
│   ├── storageService.ts
│   ├── claudeService.ts
│   └── notificationService.ts
├── types/
│   ├── problem.ts
│   ├── user.ts
│   ├── map.ts
│   ├── api.ts
│   └── telegram.d.ts
├── constants/
│   ├── problem.ts
│   ├── queryKeys.ts
│   └── routes.ts
├── utils/
│   ├── date.ts
│   ├── format.ts
│   ├── validation.ts
│   └── logger.ts
├── lib/
│   ├── supabase.ts
│   └── queryClient.ts
├── styles/
│   ├── tokens.css
│   ├── components.css
│   └── animations.css
├── App.tsx
├── Router.tsx
└── main.tsx
```

---

## QADAM 2 — PACKAGE.JSON DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "@supabase/supabase-js": "^2.45.0",
    "@tanstack/react-query": "^5.56.0",
    "@tanstack/react-query-devtools": "^5.56.0",
    "zustand": "^4.5.5",
    "mapbox-gl": "^3.6.0",
    "react-hook-form": "^7.53.0",
    "react-map-gl": "^7.1.7"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@types/mapbox-gl": "^3.4.0",
    "@vitejs/plugin-react-swc": "^3.7.0",
    "typescript": "^5.5.3",
    "vite": "^5.4.1",
    "tailwindcss": "^3.4.10",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.45",
    "eslint": "^9.9.0"
  }
}
```

---

## QADAM 3 — MUHIM FAYLLAR

### src/types/problem.ts
```typescript
export interface Problem {
  id: string
  user_id: string
  title: string
  description: string
  category: Category
  priority: Priority
  status: ProblemStatus
  location: GeoPoint
  address: string
  district: District
  images: string[]
  votes_count: number
  ai_analysis?: AIAnalysis
  assigned_agency?: Agency
  created_at: string
  updated_at: string
  resolved_at?: string
}

export type Category = 'school' | 'medical' | 'road' | 'lighting' | 'water' | 'other'
export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type ProblemStatus = 'pending' | 'accepted' | 'in_progress' | 'resolved' | 'rejected'
export type Agency = 'education' | 'health' | 'transport' | 'utilities' | 'construction' | 'municipality'
export type District = 'yunusobod' | 'chilonzor' | 'mirzo_ulugbek' | 'shayxontohur' | 'uchtepa' | 'yakkasaroy' | 'olmazar' | 'bektemir'

export interface GeoPoint {
  lat: number
  lng: number
}

export interface AIAnalysis {
  category: Category
  priority: Priority
  agency: Agency
  estimated_days: number
  similar_count: number
  confidence: number
  summary_uz: string
}
```

### src/types/user.ts
```typescript
export interface AppUser {
  id: string
  telegram_id: number
  username?: string
  first_name: string
  last_name?: string
  avatar_url?: string
  level: number
  xp: number
  xp_to_next: number
  problems_count: number
  resolved_count: number
  votes_given: number
  badges: Badge[]
  is_anonymous: boolean
  created_at: string
}

export interface Badge {
  id: string
  name_uz: string
  description_uz: string
  icon: string
  earned_at?: string
  requirement: number
}
```

### src/types/telegram.d.ts
```typescript
interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      photo_url?: string
    }
  }
  colorScheme: 'light' | 'dark'
  themeParams: Record<string, string>
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  MainButton: {
    text: string
    isVisible: boolean
    setText(text: string): void
    onClick(cb: () => void): void
    offClick(cb: () => void): void
    show(): void
    hide(): void
    enable(): void
    disable(): void
    showProgress(leaveActive?: boolean): void
    hideProgress(): void
  }
  BackButton: {
    isVisible: boolean
    onClick(cb: () => void): void
    offClick(cb: () => void): void
    show(): void
    hide(): void
  }
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void
    notificationOccurred(type: 'error' | 'success' | 'warning'): void
    selectionChanged(): void
  }
  CloudStorage: {
    setItem(key: string, value: string, cb?: (err: Error | null, stored: boolean) => void): void
    getItem(key: string, cb: (err: Error | null, value: string | null) => void): void
  }
  ready(): void
  expand(): void
  close(): void
  showAlert(msg: string, cb?: () => void): void
  showConfirm(msg: string, cb?: (confirmed: boolean) => void): void
  setHeaderColor(color: string): void
  setBackgroundColor(color: string): void
}

declare global {
  interface Window {
    Telegram?: { WebApp: TelegramWebApp }
  }
}
```

### src/lib/supabase.ts
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase env variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: true, autoRefreshToken: true },
})
```

### src/lib/queryClient.ts
```typescript
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
```

### src/hooks/useTelegram.ts
```typescript
import { useMemo } from 'react'

export function useTelegram() {
  const tg = window.Telegram?.WebApp
  const user = useMemo(() => tg?.initDataUnsafe?.user ?? null, [tg])

  return {
    tg,
    user,
    isReady: !!tg,
    haptic: {
      light: () => tg?.HapticFeedback?.impactOccurred('light'),
      medium: () => tg?.HapticFeedback?.impactOccurred('medium'),
      heavy: () => tg?.HapticFeedback?.impactOccurred('heavy'),
      success: () => tg?.HapticFeedback?.notificationOccurred('success'),
      error: () => tg?.HapticFeedback?.notificationOccurred('error'),
      selection: () => tg?.HapticFeedback?.selectionChanged(),
    },
    mainButton: {
      show: (text: string) => { tg?.MainButton?.setText(text); tg?.MainButton?.show() },
      hide: () => tg?.MainButton?.hide(),
      showProgress: () => tg?.MainButton?.showProgress(),
      hideProgress: () => tg?.MainButton?.hideProgress(),
      onClick: (fn: () => void) => tg?.MainButton?.onClick(fn),
      offClick: (fn: () => void) => tg?.MainButton?.offClick(fn),
    },
  }
}
```

### src/constants/problem.ts
```typescript
import type { Category, Priority, ProblemStatus, Agency, District } from '@/types/problem'

export const CATEGORY_CONFIG: Record<Category, {
  emoji: string; label_uz: string; agency: Agency; color: string
}> = {
  school:   { emoji: '🏫', label_uz: 'Maktab',     agency: 'education',    color: '#4F8EF7' },
  medical:  { emoji: '🏥', label_uz: 'Tibbiyot',   agency: 'health',       color: '#06D6A0' },
  road:     { emoji: '🛣️', label_uz: "Yo'l",       agency: 'transport',    color: '#FFD166' },
  lighting: { emoji: '💡', label_uz: "Yorug'lik",   agency: 'utilities',    color: '#FF8C42' },
  water:    { emoji: '🌊', label_uz: 'Suv',         agency: 'utilities',    color: '#4ECDC4' },
  other:    { emoji: '🌳', label_uz: 'Boshqa',      agency: 'municipality', color: '#8892A4' },
}

export const PRIORITY_CONFIG: Record<Priority, {
  label_uz: string; color: string; bgColor: string
}> = {
  critical: { label_uz: 'FAVQ',   color: '#FF4D6A', bgColor: 'rgba(255,77,106,0.15)'  },
  high:     { label_uz: 'MUHIM',  color: '#FF8C42', bgColor: 'rgba(255,140,66,0.15)'  },
  medium:   { label_uz: "O'RTA",  color: '#FFD166', bgColor: 'rgba(255,209,102,0.15)' },
  low:      { label_uz: 'PAST',   color: '#4F8EF7', bgColor: 'rgba(79,142,247,0.15)'  },
}

export const STATUS_CONFIG: Record<ProblemStatus, {
  label_uz: string; color: string; icon: string; step: number
}> = {
  pending:     { label_uz: 'Kutilmoqda',          color: '#8892A4', icon: '⏳', step: 0 },
  accepted:    { label_uz: 'Qabul qilindi',        color: '#4F8EF7', icon: '📥', step: 1 },
  in_progress: { label_uz: "Ko'rib chiqilmoqda",   color: '#FFD166', icon: '🔄', step: 2 },
  resolved:    { label_uz: 'Hal qilindi',          color: '#06D6A0', icon: '✅', step: 3 },
  rejected:    { label_uz: 'Rad etildi',           color: '#FF4D6A', icon: '❌', step: -1 },
}

export const AGENCY_CONFIG: Record<Agency, { name_uz: string; icon: string }> = {
  education:    { name_uz: "Ta'lim vazirligi",            icon: '🎓' },
  health:       { name_uz: "Sog'liqni saqlash vazirligi", icon: '🏥' },
  transport:    { name_uz: 'Transport vazirligi',          icon: '🚌' },
  utilities:    { name_uz: 'Kommunal xizmatlar',           icon: '⚡' },
  construction: { name_uz: 'Qurilish vazirligi',           icon: '🏗️' },
  municipality: { name_uz: 'Shahar hokimligi',             icon: '🏛️' },
}

export const DISTRICT_CONFIG: Record<District, {
  name_uz: string; center: { lat: number; lng: number }
}> = {
  yunusobod:     { name_uz: 'Yunusobod',      center: { lat: 41.3401, lng: 69.3050 } },
  chilonzor:     { name_uz: 'Chilonzor',      center: { lat: 41.2930, lng: 69.2040 } },
  mirzo_ulugbek: { name_uz: "Mirzo Ulug'bek", center: { lat: 41.3219, lng: 69.3514 } },
  shayxontohur:  { name_uz: 'Shayxontohur',   center: { lat: 41.3268, lng: 69.2457 } },
  uchtepa:       { name_uz: 'Uchtepa',        center: { lat: 41.2762, lng: 69.2250 } },
  yakkasaroy:    { name_uz: 'Yakkasaroy',     center: { lat: 41.2900, lng: 69.2700 } },
  olmazar:       { name_uz: 'Olmazar',        center: { lat: 41.3550, lng: 69.2800 } },
  bektemir:      { name_uz: 'Bektemir',       center: { lat: 41.2650, lng: 69.3300 } },
}

export const XP_REWARDS = {
  create_problem: 50,
  problem_resolved: 100,
  vote_given: 5,
  first_problem: 100,
} as const

export const TOSHKENT_CENTER = { lat: 41.2995, lng: 69.2401 }
export const TOSHKENT_ZOOM = 11
```

### src/constants/routes.ts
```typescript
export const ROUTES = {
  SPLASH:          '/',
  ONBOARDING:      '/onboarding',
  MAP:             '/map',
  PROBLEM_LIST:    '/problems',
  PROBLEM_DETAIL:  '/problems/:id',
  ADD_PROBLEM:     '/add',
  PROFILE:         '/profile',
  STATISTICS:      '/statistics',
  NOTIFICATIONS:   '/notifications',
  SEARCH:          '/search',
  SETTINGS:        '/settings',
  SUCCESS:         '/success',
} as const
```

### src/utils/logger.ts
```typescript
const isDev = import.meta.env.DEV

export const logger = {
  log:   (...args: unknown[]) => isDev && console.log('[App]', ...args),
  error: (...args: unknown[]) => isDev && console.error('[Error]', ...args),
  warn:  (...args: unknown[]) => isDev && console.warn('[Warn]', ...args),
}
```

### src/utils/date.ts
```typescript
export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1)   return 'Hozir'
  if (diffMins < 60)  return `${diffMins} daqiqa oldin`
  if (diffHours < 24) return `${diffHours} soat oldin`
  if (diffDays === 1) return 'Kecha'
  if (diffDays < 7)   return `${diffDays} kun oldin`

  return date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' })
}

export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}
```

### src/utils/validation.ts
```typescript
export function validateProblemForm(data: {
  description: string
  category?: string
  location?: { lat: number; lng: number } | null
}): string | null {
  if (!data.description || data.description.trim().length < 20)
    return "Tavsif kamida 20 ta belgi bo'lishi kerak"
  if (data.description.length > 500)
    return 'Tavsif 500 ta belgidan oshmasligi kerak'
  if (!data.category)
    return 'Kategoriya tanlanishi kerak'
  if (!data.location)
    return 'Joylashuv aniqlanishi kerak'
  return null
}
```

### src/styles/tokens.css
```css
:root {
  --bg-base:      #0D0F14;
  --bg-surface:   #151820;
  --bg-surface2:  #1C2030;
  --bg-surface3:  #242838;
  --bg-surface4:  #2C3248;
  --border:       rgba(255, 255, 255, 0.07);
  --border-2:     rgba(255, 255, 255, 0.12);
  --accent:       #4F8EF7;
  --accent-2:     #6B5EFF;
  --accent-glow:  rgba(79, 142, 247, 0.15);
  --red:          #FF4D6A;
  --orange:       #FF8C42;
  --yellow:       #FFD166;
  --green:        #06D6A0;
  --text-1:       #F0F2F8;
  --text-2:       #8892A4;
  --text-3:       #555E70;
  --nav-h:        68px;
  --topbar-h:     58px;
  --radius-sm:    12px;
  --radius-md:    18px;
  --radius-lg:    24px;
}

* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

html, body, #root {
  height: 100%;
  height: 100dvh;
  overflow: hidden;
  background: var(--bg-base);
  color: var(--text-1);
  font-family: 'Onest', system-ui, sans-serif;
}
```

### src/App.tsx
```tsx
import { useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { Router } from './Router'
import '@/styles/tokens.css'

export default function App() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.ready()
      tg.expand()
      tg.setHeaderColor('#0D0F14')
      tg.setBackgroundColor('#0D0F14')
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}
```

### src/Router.tsx
```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { SplashPage }        from '@/pages/SplashPage'
import { OnboardingPage }    from '@/pages/OnboardingPage'
import { MapPage }           from '@/pages/MapPage'
import { ProblemListPage }   from '@/pages/ProblemListPage'
import { ProblemDetailPage } from '@/pages/ProblemDetailPage'
import { AddProblemPage }    from '@/pages/AddProblemPage'
import { ProfilePage }       from '@/pages/ProfilePage'
import { StatisticsPage }    from '@/pages/StatisticsPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { SearchPage }        from '@/pages/SearchPage'
import { SettingsPage }      from '@/pages/SettingsPage'
import { SuccessPage }       from '@/pages/SuccessPage'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.SPLASH}         element={<SplashPage />} />
        <Route path={ROUTES.ONBOARDING}     element={<OnboardingPage />} />
        <Route path={ROUTES.MAP}            element={<MapPage />} />
        <Route path={ROUTES.PROBLEM_LIST}   element={<ProblemListPage />} />
        <Route path={ROUTES.PROBLEM_DETAIL} element={<ProblemDetailPage />} />
        <Route path={ROUTES.ADD_PROBLEM}    element={<AddProblemPage />} />
        <Route path={ROUTES.PROFILE}        element={<ProfilePage />} />
        <Route path={ROUTES.STATISTICS}     element={<StatisticsPage />} />
        <Route path={ROUTES.NOTIFICATIONS}  element={<NotificationsPage />} />
        <Route path={ROUTES.SEARCH}         element={<SearchPage />} />
        <Route path={ROUTES.SETTINGS}       element={<SettingsPage />} />
        <Route path={ROUTES.SUCCESS}        element={<SuccessPage />} />
        <Route path="*"                     element={<Navigate to={ROUTES.SPLASH} />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          react:    ['react', 'react-dom'],
          router:   ['react-router-dom'],
          query:    ['@tanstack/react-query'],
          supabase: ['@supabase/supabase-js'],
          map:      ['mapbox-gl'],
          store:    ['zustand'],
        },
      },
    },
  },
  server: { port: 3000, host: true },
})
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0D0F14', surface: '#151820',
          surface2: '#1C2030', surface3: '#242838',
        },
        accent: { DEFAULT: '#4F8EF7', 2: '#6B5EFF' },
        status: {
          critical: '#FF4D6A', high: '#FF8C42',
          medium: '#FFD166', resolved: '#06D6A0',
        },
        text: {
          primary: '#F0F2F8', secondary: '#8892A4', tertiary: '#555E70',
        },
      },
      fontFamily: { sans: ['Onest', 'system-ui', 'sans-serif'] },
      borderRadius: { sm: '12px', md: '18px', lg: '24px' },
      height: { nav: '68px', topbar: '58px' },
      animation: {
        shimmer: 'shimmer 1.8s infinite linear',
        'float': 'float 3s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
```

### .env.example
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
VITE_MAPBOX_TOKEN=pk.eyJ1...
VITE_BOT_USERNAME=muammo_xaritasi_bot
VITE_APP_NAME=Muammo Xaritasi
```

### index.html (Onest font)
```html
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Muammo Xaritasi</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

## QADAM 4 — BIRINCHI ISHLAYDIGAN SAHIFALAR

Yuqoridagi tuzilma yaratilgandan so'ng quyidagi sahifalarni
dizayn fayllaridagi HTML prototipga qarab yoz:

### Birinchi: SplashPage.tsx
- Logotip: 📍 emoji, gradient background
- "Muammo Xaritasi" sarlavha
- Progress bar animatsiyasi
- 2.5 soniya keyin → `/map` ga redirect
- Telegram WebApp ready() va expand() shu yerda chaqiriladi

### Ikkinchi: MapPage.tsx
- Mapbox GL xarita (Toshkent markazlangan)
- Muammolar pinlari (category va priority rangida)
- Qidiruv satri yuqorida
- Filter chiplari
- Muammo kartalari pastda scroll
- BottomNav komponent

### Uchinchi: AddProblemPage.tsx  
- Joylashuv avtomatik aniqlash (Geolocation API)
- Rasm yuklash (Telegram camera/gallery)
- Kategoriya tanlash grid (5ta)
- Tavsif textarea (debounce 1.5s → Claude tahlil)
- AIAnalysisCard — tahlil natijasini ko'rsat
- Prioritet tanlash
- Telegram MainButton "Yuborish"

---

## KOMPONENT USLUBI

Har bir komponent uchun:

1. **Dark theme** — faqat, light theme yo'q
2. **Font** — Onest, boshqa font yo'q
3. **Ranglar** — CSS variables (--accent, --red, --green...)
4. **Tailwind** — har qanday stilizatsiya uchun
5. **HapticFeedback** — har bir muhim action da
6. **Loading state** — Skeleton komponent bilan
7. **Error state** — ErrorState komponent bilan
8. **Empty state** — EmptyState komponent bilan
9. **TypeScript** — any type yo'q, har doim explicit

---

## QOIDALAR (MUHIM!)

```
❌ any type ishlatma
❌ console.log qoldirma → logger ishlatiladi
❌ hardcode matn → CONSTANTS dan ol
❌ inline style → Tailwind class yoki CSS variable
❌ useEffect ichida async/await → custom hook yarat
❌ props drilling 3+ level → Zustand store
❌ Claude API key frontendda → faqat Edge Function

✅ Har doim error handling
✅ Har doim loading state (skeleton)
✅ Har doim Uzbek tilida xabar
✅ TypeScript strict mode
✅ memo() list komponentlarda
✅ HapticFeedback muhim action'larda
✅ Telegram MainButton submit uchun
```

---

## BOSHLASH BUYRUG'I

```bash
npm install
npm run dev
```

---

Yuqoridagi hamma narsani to'liq yarat.
Avval fayl tuzilmasini, keyin har bir faylni kod bilan to'ldir.
Dizayn uchun UI.UX papkasidagi HTML fayllarga qarab ish.
```
