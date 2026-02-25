/**
 * Map sahifasi (Bosh Xarita) uchun matnlar.
 * Dizayn: UI.UX/muammo_xarita.html — Screen 01
 */

export const MAP_PAGE = {
  TITLE: 'Muammo Xaritasi',
  SEARCH_PLACEHOLDER: "Tuman, ko'cha qidiring...",
  LEGEND: {
    CRITICAL: 'Favqulodda',
    HIGH: 'Muhim',
    MEDIUM: "O'rta",
    RESOLVED: 'Hal qilindi',
  },
  STATS: {
    TOTAL: 'Jami muammo',
    CRITICAL: 'Favqulodda',
    RESOLVED: 'Hal qilindi',
  },
  FILTER_ALL: 'Hammasi',
  SECTION_TITLE: "So'nggi muammolar",
  SECTION_LINK: 'Barchasi →',
  NOTIFICATIONS_ARIA: 'Bildirishnomalar',
  VIEW_ALL_ARIA: "Barcha muammolar ro'yxati",
  /** Ro'yxat bo'sh bo'lganda ko'rsatiladigan matn */
  EMPTY_PROBLEMS: "Hozircha muammolar yo'q",
  EMPTY_PROBLEMS_HINT: "Muammo qo'shish uchun pastdagi + tugmasini bosing",
} as const
