# Avtomatik deploy (Vercel + GitHub)

Loyiha Vercel’da ulangan. **Har safar `main` branch’ga push qilinsa, Vercel avtomatik yangi deploy qiladi.**

---

## 1. Avtomatik deploy qanday ishlaydi

| Hodisa | Natija |
|--------|--------|
| `main` ga push (yoki merge) | Vercel Production deploy boshlanadi |
| Boshqa branch’ga push | Vercel Preview deploy (ixtiyoriy) |

Shuning uchun **ishni tugatgach `main` ga push qilsangiz, deploy o‘zi ishlaydi** — qo‘lda Vercel’ga kirish shart emas.

---

## 2. Ish tugagach deploy qilish (barcha chatlar uchun)

Har qanday chatda (yoki Cursor Agent’da) vazifa tugagach:

1. **O‘zgarishlarni commit qiling**
   ```bash
   git add -A
   git status   # nima o‘zgarganini ko‘ring
   git commit -m "feat: qisqacha tavsif (masalan: xarita joylashuv + TopBar)"
   ```

2. **`main` ga push qiling**
   ```bash
   git push origin main
   ```

Push’dan keyin Vercel 1–2 daqiqa ichida yangi versiyani deploy qiladi.  
**Natija:** [Vercel Dashboard](https://vercel.com) → loyiha → **Deployments** da yangi deployment ko‘rinadi.

---

## 3. Cursor qoidasi (ish tugagach avtomatik deploy)

Loyihada **`.cursor/rules/11-deploy-after-work.mdc`** qoidasi bor:

- **Vazifa tugagach** Agent avtomatik:
  - `git add -A`
  - `git commit -m "..."` (qisqa, aniq xabar)
  - `git push origin main`
- Shundan keyin Vercel o‘zi deploy qiladi.

Boshqa chatdan yozsangiz ham, Agent ishni tugatgach shu qoidaga amal qiladi (agar rule yoqilgan bo‘lsa).

---

## 4. Birinchi marta sozlash (faqat bir marta)

- **GitHub repo** Vercel’ga ulangan bo‘lishi kerak (Vercel Dashboard → Import Project → GitHub repo tanlash).
- **Production branch:** odatda `main` (Vercel sozlamalarida tekshirishingiz mumkin).
- **Environment variables:** `docs/VERCEL_ENV.md` da — Production va Preview uchun `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` va boshqalar.

Agar repo allaqachon ulangan bo‘lsa, qo‘shimcha sozlash kerak emas — faqat `main` ga push qilish yetadi.

---

## 5. Tekshirish

- **Deploy holati:** [Vercel Dashboard](https://vercel.com) → loyiha → **Deployments**
- **Sayt:** Vercel bergan production URL (masalan `muammo-xaritasi.vercel.app`)
- **Log:** Deployment → **Building** / **Ready** — xatolik bo‘lsa shu yerdan ko‘riladi

---

## Qisqacha

- **Ish tugadi** → `git add -A` → `git commit -m "..."` → `git push origin main` → **Vercel avtomatik deploy qiladi.**
- Boshqa chatdan yozsangiz ham, vazifa tugagach Agent shu tartibda push qilishi mumkin (11-deploy-after-work qoidasi orqali).
