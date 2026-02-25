import { memo, useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { TOSHKENT_CENTER, TOSHKENT_ZOOM, CATEGORY_CONFIG } from '@/constants/problem'
import type { Problem } from '@/types/problem'

const priorityColor: Record<string, string> = {
  critical: '#FF4D6A',
  high: '#FF8C42',
  medium: '#FFD166',
  low: '#4F8EF7',
}

const mapContainerStyle = { width: '100%', height: '100%' }
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#111520' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#111520' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#8892A4' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1C2030' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0D0F14' }] },
  ],
}

interface GoogleMapViewProps {
  problems?: Problem[]
  onProblemClick?: (problem: Problem) => void
  center?: { lat: number; lng: number }
  zoom?: number
  className?: string
}

export const GoogleMapView = memo(function GoogleMapView({
  problems = [],
  onProblemClick,
  center = TOSHKENT_CENTER,
  zoom = TOSHKENT_ZOOM,
  className = '',
}: GoogleMapViewProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey ?? '',
  })

  const markerIcon = useCallback((p: Problem) => {
    const color = priorityColor[p.priority] ?? priorityColor.low
    return {
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#0D0F14',
      strokeWeight: 2,
      scale: 1.8,
      labelOrigin: new google.maps.Point(12, 12),
    } as google.maps.Symbol
  }, [])

  if (!apiKey || loadError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#111520] ${className}`}>
        <span className="mb-3 text-6xl" aria-hidden>📍</span>
        <p className="text-base font-medium text-text-secondary">Xarita yuklanmoqda...</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#111520] ${className}`}>
        <span className="mb-3 text-6xl animate-pulse" aria-hidden>📍</span>
        <p className="text-base font-medium text-text-secondary">Xarita yuklanmoqda...</p>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-none ${className}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: center.lat, lng: center.lng }}
        zoom={zoom}
        options={mapOptions}
      >
        {problems.map((p) => {
          const config = CATEGORY_CONFIG[p.category]
          return (
            <Marker
              key={p.id}
              position={{ lat: p.location.lat, lng: p.location.lng }}
              icon={markerIcon(p)}
              label={{
                text: config.emoji,
                fontSize: '14px',
              }}
              onClick={() => onProblemClick?.(p)}
            />
          )
        })}
      </GoogleMap>
    </div>
  )
})
