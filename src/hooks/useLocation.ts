import { useState, useCallback, useEffect } from 'react'

const TOSHKENT_CENTER = { lat: 41.2995, lng: 69.2401 }

export function useLocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLocation = useCallback(() => {
    setLoading(true)
    setError(null)
    if (!navigator.geolocation) {
      setLocation(TOSHKENT_CENTER)
      setAddress('Toshkent')
      setLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setAddress(`Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`)
        setLoading(false)
      },
      () => {
        setLocation(TOSHKENT_CENTER)
        setAddress('Toshkent (standart)')
        setError('Joylashuv aniqlanmadi')
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }, [])

  useEffect(() => {
    fetchLocation()
  }, [fetchLocation])

  return { location, address, loading, error, refetch: fetchLocation }
}
