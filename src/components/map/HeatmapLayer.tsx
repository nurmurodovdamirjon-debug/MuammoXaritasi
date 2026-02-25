import { memo } from 'react'

interface HeatmapLayerProps {
  className?: string
}

export const HeatmapLayer = memo(function HeatmapLayer({ className = '' }: HeatmapLayerProps) {
  return <div className={`pointer-events-none ${className}`} aria-hidden />
})
