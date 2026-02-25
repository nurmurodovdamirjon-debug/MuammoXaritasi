import { memo, useRef, useEffect } from 'react'
import Map, { Marker, type MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { TOSHKENT_CENTER, TOSHKENT_ZOOM } from '@/constants/problem'
import type { Problem } from '@/types/problem'
import { MapPin } from './MapPin'

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN

interface MapViewProps {
  problems?: Problem[]
  onProblemClick?: (problem: Problem) => void
  center?: { lat: number; lng: number }
  zoom?: number
  className?: string
}

export const MapView = memo(function MapView({
  problems = [],
  onProblemClick,
  center = TOSHKENT_CENTER,
  zoom = TOSHKENT_ZOOM,
  className = '',
}: MapViewProps) {
  const mapRef = useRef<MapRef>(null)

  useEffect(() => {
    if (!mapRef.current || !center) return
    mapRef.current.getMap().flyTo({ center: [center.lng, center.lat], zoom: zoom ?? TOSHKENT_ZOOM })
  }, [center.lat, center.lng, zoom])

  if (!mapboxToken) {
    return (
      <div className={`flex items-center justify-center bg-bg-surface2 ${className}`}>
        <p className="text-sm text-text-tertiary">VITE_MAPBOX_TOKEN o‘rnatilmagan</p>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-none ${className}`}>
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
          zoom: zoom,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {problems.map((p) => (
          <Marker
            key={p.id}
            longitude={p.location.lng}
            latitude={p.location.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              onProblemClick?.(p)
            }}
          >
            <button type="button" className="flex flex-col items-center transition-transform active:scale-110">
              <MapPin problem={p} />
            </button>
          </Marker>
        ))}
      </Map>
    </div>
  )
})
