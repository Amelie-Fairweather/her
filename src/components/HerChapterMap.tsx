'use client'

import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { herChapters, type HerChapter } from '@/data/herChapters'
import 'leaflet/dist/leaflet.css'

function createPinIcon(active: boolean) {
  return L.divIcon({
    className: 'her-map-marker',
    html: `<div class="her-map-pin${active ? ' her-map-pin--active' : ''}"><span></span></div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42],
  })
}

function FitAllChapters() {
  const map = useMap()

  useEffect(() => {
    const bounds = L.latLngBounds(herChapters.map((chapter) => [chapter.lat, chapter.lng]))
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 6 })
  }, [map])

  return null
}

function FlyToChapter({ chapter }: { chapter: HerChapter | null }) {
  const map = useMap()

  useEffect(() => {
    if (!chapter) return
    map.flyTo([chapter.lat, chapter.lng], 9, { duration: 0.8 })
  }, [chapter, map])

  return null
}

export default function HerChapterMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedChapter = useMemo(
    () => herChapters.find((chapter) => chapter.id === selectedId) ?? null,
    [selectedId]
  )

  return (
    <section className="mt-10 max-w-7xl mx-auto">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-[#EB89B5] mb-2">
          HER Chapters Across the Country
        </h2>
        <p className="text-sm md:text-lg text-gray-700 max-w-2xl mx-auto">
          Click a pin or school name to explore where student-led HER chapters are growing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-4 md:gap-6">
        <div className="her-map-shell rounded-2xl overflow-hidden shadow-lg shadow-[#EB89B5]/15 border border-[#EB89B5]/20">
          <MapContainer
            center={[39.8, -98.5]}
            zoom={4}
            scrollWheelZoom={false}
            className="her-map-canvas"
            aria-label="Map of HER school chapters"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <FitAllChapters />
            <FlyToChapter chapter={selectedChapter} />
            {herChapters.map((chapter) => (
              <Marker
                key={chapter.id}
                position={[chapter.lat, chapter.lng]}
                icon={createPinIcon(selectedId === chapter.id)}
                eventHandlers={{
                  click: () => setSelectedId(chapter.id),
                }}
              >
                <Popup>
                  <div className="her-map-popup">
                    <p className="font-bold text-[#7A2454]">{chapter.name}</p>
                    <p className="text-sm text-gray-600">
                      {chapter.city}, {chapter.state}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-[#EB89B5]/10 border border-[#EB89B5]/15 p-4 md:p-5 max-h-[420px] lg:max-h-[520px] overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#EB89B5] mb-3">
            All chapters ({herChapters.length})
          </p>
          <ul className="space-y-2">
            {herChapters.map((chapter) => {
              const isActive = selectedId === chapter.id
              return (
                <li key={chapter.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(chapter.id)}
                    className={`w-full text-left rounded-xl px-3 py-2.5 transition-colors border ${
                      isActive
                        ? 'bg-[#FFD7E9] border-[#EB89B5] text-[#7A2454]'
                        : 'bg-[#FFF6FB] border-transparent hover:border-[#EB89B5]/30 hover:bg-[#FFEAF4]'
                    }`}
                  >
                    <span className="block text-sm font-bold leading-snug">{chapter.name}</span>
                    <span className="block text-xs text-gray-600 mt-0.5">
                      {chapter.city}, {chapter.state}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
