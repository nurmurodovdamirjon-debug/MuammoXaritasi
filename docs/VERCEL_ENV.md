# Vercel — Environment Variables

Deploydan oldin Vercel loyiha sozlamalarida quyidagi **Environment Variables** qo‘shing.

## Majburiy (Supabase)

| Name | Value | Environment |
|------|--------|-------------|
| `VITE_SUPABASE_URL` | Supabase loyiha URL (masalan `https://xxx.supabase.co`) | Production, Preview |
| `VITE_SUPABASE_ANON_KEY` | Supabase loyiha **anon public** key | Production, Preview |

## Ixtiyoriy

| Name | Value |
|------|--------|
| `VITE_BOT_USERNAME` | Telegram bot username |
| `VITE_APP_NAME` | Ilova nomi |

Xarita Leaflet + OpenStreetMap (CartoDB Dark) dan foydalanadi — token kerak emas.

## Qanday qo‘shish

1. [Vercel Dashboard](https://vercel.com) → **muammo-xaritasi** loyihasi
2. **Settings** → **Environment Variables**
3. Har bir o‘zgaruvchi uchun **Name** va **Value** kiriting
4. **Environment**: Production va Preview tanlang
5. **Save** dan keyin **Deployments** → oxirgi deploy → **Redeploy** (yoki `main` ga yangi push qiling)

O‘zgaruvchilarni qo‘shgach, mutlaqo **Redeploy** qiling — build vaqtida `VITE_*` o‘zgaruvchilar bundle’ga yoziladi.
