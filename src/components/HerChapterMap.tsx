'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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

function cappedScrollDrift(offsetY: number, anchor: number) {
  return Math.max(0, Math.min(30, (offsetY - anchor) * 0.05))
}

export default function HerChapterMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [offsetY, setOffsetY] = useState(0)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isMapVisible, setIsMapVisible] = useState(false)
  const [sectionTop, setSectionTop] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  const selectedChapter = useMemo(
    () => herChapters.find((chapter) => chapter.id === selectedId) ?? null,
    [selectedId]
  )

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updateSectionTop = () => {
      if (headerRef.current) {
        setSectionTop(headerRef.current.getBoundingClientRect().top + window.scrollY)
      }
    }

    updateSectionTop()
    window.addEventListener('resize', updateSectionTop)
    return () => window.removeEventListener('resize', updateSectionTop)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headerRef.current && entry.isIntersecting) {
            setIsHeaderVisible(true)
          }
          if (entry.target === mapRef.current && entry.isIntersecting) {
            setIsMapVisible(true)
          }
        })
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const timeout = window.setTimeout(() => {
      if (headerRef.current) {
        observer.observe(headerRef.current)
        const rect = headerRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsHeaderVisible(true)
        }
      }
      if (mapRef.current) {
        observer.observe(mapRef.current)
        const rect = mapRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsMapVisible(true)
        }
      }
    }, 100)

    return () => {
      window.clearTimeout(timeout)
      if (headerRef.current) observer.unobserve(headerRef.current)
      if (mapRef.current) observer.unobserve(mapRef.current)
    }
  }, [])

  return (
    <section className="mt-10 max-w-7xl mx-auto">
      <div
        ref={headerRef}
        className="text-center mb-6 md:mb-8"
        style={{
          transform: `translateY(${isHeaderVisible ? cappedScrollDrift(offsetY, sectionTop - 300) : 60}px)`,
          opacity: isHeaderVisible ? 1 : 0,
          transition: 'opacity 1s ease-out, transform 1s ease-out',
        }}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-[#EB89B5] mb-2">
          HER Chapters Across the Country
        </h2>
        <p className="text-sm md:text-lg text-gray-700 max-w-2xl mx-auto">
          Click a pin or school name to explore where student-led HER chapters are growing.
        </p>
      </div>

      <div
        ref={mapRef}
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-4 md:gap-6"
        style={{
          transform: `translateY(${isMapVisible ? cappedScrollDrift(offsetY, sectionTop) : 60}px)`,
          opacity: isMapVisible ? 1 : 0,
          transition: 'opacity 1.2s ease-out, transform 1.2s ease-out',
        }}
      >
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
