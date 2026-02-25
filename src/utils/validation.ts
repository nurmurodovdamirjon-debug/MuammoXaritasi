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
