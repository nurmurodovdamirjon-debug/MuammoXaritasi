# UI/UX tahlil — Xarita sahifasi

Rasm asosida aniqlangan muammolar va qilingan tuzatishlar.

---

## 1. Tuzatilgan

### Pastki navigatsiya — yozuv kesilishi
- **Muammo:** "Muammolar", "Mening", "Statistika" yozuvlari pastda kesilib ko‘rinardi.
- **Sabab:** `--nav-h: 68px` kichik, safe area va label uchun joy yetmasligi.
- **Tuzatish:** `--nav-h` 72px qilindi; nav da `min-h`, `pt-2`, `pb-[max(0.5rem, env(safe-area-inset-bottom))]`, label uchun `leading-tight`, `truncate max-w-full` qo‘shildi.

### Bo‘sh ro‘yxat — empty state yo‘qligi
- **Muammo:** "So'nggi muammolar" bo‘sh bo‘lganda hech narsa ko‘rinmasdi.
- **Tuzatish:** Ro‘yxat bo‘sh bo‘lsa "Hozircha muammolar yo'q" va "Muammo qo'shish uchun pastdagi + tugmasini bosing" matnlari ko‘rsatiladi (`MAP_PAGE.EMPTY_*` constants).

### Sarlavha — joy torligi
- **Muammo:** Logo (📍) va "Muammo Xaritasi" bir-biriga juda yaqin.
- **Tuzatish:** TopBar da `gap-2` → `gap-2.5`.

---

## 2. Ilova kodi bilan o‘zgartirib bo‘lmaydigan

### "Закрыть" (ruscha)
- **Muammo:** Interfeys o‘zbekcha, lekin yopish tugmasi "Закрыть" (ruscha) ko‘rinadi.
- **Sabab:** Bu Telegram Mini App ning **tizim** headeridagi tugma; matn Telegram klienti tomonidan qo‘yiladi (qurilma/ilova tiliga qarab).
- **Tavsiya:** Foydalanuvchi Telegram ilovasining tilini O‘zbekcha qilsa, klient kelajakda "Yopish" ko‘rsatishi mumkin; yoki biz header ni yashirib, o‘zimizning TopBar orqali "Yopish" qilishimiz mumkin (loyiha qaroriga qarab).

### Xaritadagi "TOSHKENT" yozuvi
- **Muammo:** Katta "TOSHKENT" yozuvi markazda ko‘rinadi.
- **Sabab:** Tile provider (CartoDB/OSM) ning xarita dizayni; biz tile kontentini o‘zgartira olmaymiz.
- **Tavsiya:** Qabul qilish yoki boshqa tile layer sinash.

### Statistikada 0
- **Eslatma:** Supabase bo‘sh bo‘lsa loyihada mock data ishlatiladi (Jami 3, Favqulodda 1, Hal qilindi 0). Agar rasmdagi 0 bo‘lsa, ehtimol eski build; yangi deploy da mock ko‘rinadi.

---

## 3. Kelajakda yaxshilash mumkin

- **Karta kontrasti:** Ba‘zi ko‘cha nomlari qora fonda zaif bo‘lsa, boshqa dark tile (masalan, boshqa CartoDB style) sinash.
- **Empty state statistikada:** Jami 0 bo‘lganda alohida qisqa yo‘riqnoma yoki CTA ko‘rsatish.
