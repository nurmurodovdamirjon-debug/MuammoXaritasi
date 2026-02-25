import { memo, useCallback, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { TOSHKENT_CENTER, TOSHKENT_ZOOM, UZBEKISTAN_LEAFLET_BOUNDS, CATEGORY_CONFIG } from '@/constants/problem'
import type { Problem } from '@/types/problem'
import { GoogleMapView } from './GoogleMapView'

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

const priorityColor: Record<string, string> = {
  critical: '#FF4D6A',
  high: '#FF8C42',
  medium: '#FFD166',
  low: '#4F8EF7',
}

function createPinIcon(problem: Problem): L.DivIcon {
  const config = CATEGORY_CONFIG[problem.category]
  const color = priorityColor[problem.priority] ?? priorityColor.low
  const html = `
    <div class="flex flex-col items-center" style="cursor: pointer;">
      <div class="flex items-center justify-center rounded-[50%_50%_50%_0] shadow-lg text-[15px]"
           style="width: 36px; height: 36px; background: ${color}; transform: rotate(-45deg);">
        <span style="transform: rotate(45deg); display: block;">${config.emoji}</span>
      </div>
      <div style="width: 12px; height: 4px; border-radius: 2px; background: rgba(0,0,0,0.3); margin: 0 auto;"></div>
    </div>
  `
  return L.divIcon({
    html,
    className: 'custom-pin border-0 bg-transparent',
    iconSize: [36, 48],
    iconAnchor: [18, 48],
  })
}

function MapController({
  center,
  zoom,
}: {
  center: { lat: number; lng: number }
  zoom: number
}) {
  const map = useMap()
  useEffect(() => {
    map.setView([center.lat, center.lng], zoom)
  }, [map, center.lat, center.lng, zoom])
  return null
}

interface MapViewProps {
  problems?: Problem[]
  onProblemClick?: (problem: Problem) => void
  center?: { lat: number; lng: number }
  zoom?: number
  /** Foydalanuvchi joylashuvi — xaritada ko'rsatiladi */
  userLocation?: { lat: number; lng: number } | null
  className?: string
}

const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const CARTO_DARK_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

export const MapView = memo(function MapView({
  problems = [],
  onProblemClick,
  center = TOSHKENT_CENTER,
  zoom = TOSHKENT_ZOOM,
  userLocation = null,
  className = '',
}: MapViewProps) {
  const pinIcon = useCallback((p: Problem) => createPinIcon(p), [])

  if (googleMapsApiKey) {
    return (
      <GoogleMapView
        problems={problems}
        onProblemClick={onProblemClick}
        center={center}
        zoom={zoom}
        userLocation={userLocation}
        className={className}
      />
    )
  }

  const userIcon = L.divIcon({
    html: `<div class="flex items-center justify-center w-10 h-10 rounded-full border-3 border-white bg-accent shadow-lg" style="border-width: 3px; box-shadow: 0 0 0 2px var(--accent);"></div>`,
    className: 'border-0 bg-transparent',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })

  return (
    <div className={`relative overflow-hidden rounded-none [&_.leaflet-container]:bg-[#111520] ${className}`}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        maxBounds={UZBEKISTAN_LEAFLET_BOUNDS}
        maxBoundsViscosity={1}
      >
        <MapController center={center} zoom={zoom} />
        <TileLayer url={CARTO_DARK_URL} attribution={OSM_ATTRIBUTION} />
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} />
        )}
        {problems.map((p) => (
          <Marker
            key={p.id}
            position={[p.location.lat, p.location.lng]}
            icon={pinIcon(p)}
            eventHandlers={{
              click: () => onProblemClick?.(p),
            }}
          />
        ))}
      </MapContainer>
    </div>
  )
})
