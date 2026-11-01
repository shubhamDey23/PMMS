'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  MapPin,
  Search,
  Filter,
  Compass,
  Crosshair,
  ExternalLink,
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Building2,
  IndianRupee,
  Layers,
  ChevronDown,
} from 'lucide-react'
import type { Project } from '@/types/project'
import { useAdminDrawer } from '@/context/AdminDrawerContext'
import { useTranslation } from '@/context/LanguageContext'
import { projectService } from '@/lib/services/project.service'
import { defaultMapConfig, statusColors } from '@/lib/maps/map-config'

// Custom status SVG marker creator
function createMarkerIcon(status: string, isSelected: boolean = false) {
  const conf = statusColors[status] || statusColors.Ongoing
  const pinColor = conf.bg
  const borderColor = isSelected ? '#ffffff' : conf.border
  const size = isSelected ? 40 : 34
  const haloColor = `${conf.bg}40`

  const html = `
    <div class="custom-leaflet-pin ${isSelected ? 'is-selected' : ''}" style="width: ${size}px; height: ${size + 10}px; position: relative;">
      <div class="pin-pulse" style="background: ${haloColor};"></div>
      <div class="pin-svg-wrapper" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35));">
        <svg viewBox="0 0 36 46" width="${size}" height="${size + 8}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 0C8.05887 0 0 8.05887 0 18C0 29.5 15.5 44.5 17.1 46.04C17.6 46.52 18.4 46.52 18.9 46.04C20.5 44.5 36 29.5 36 18C36 8.05887 27.9411 0 18 0Z" fill="${pinColor}" stroke="${borderColor}" stroke-width="2"/>
          <circle cx="18" cy="18" r="8" fill="#ffffff"/>
          <circle cx="18" cy="18" r="4.5" fill="${pinColor}"/>
        </svg>
      </div>
    </div>
  `

  return L.divIcon({
    className: 'custom-leaflet-marker-container',
    html,
    iconSize: [size, size + 10],
    iconAnchor: [size / 2, size + 8],
    popupAnchor: [0, -(size + 10)],
  })
}

export default function ProjectMapClient() {
  const { openProject } = useAdminDrawer()
  const { t, language, formatCurrency, getLocalizedText } = useTranslation()

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const markersMapRef = useRef<Record<string, L.Marker>>({})
  const userMarkerRef = useRef<L.CircleMarker | null>(null)

  // Projects state
  const [projects, setProjects] = useState<Project[]>(() => projectService.listProjects())
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedBlock, setSelectedBlock] = useState<string>('all')
  const [locationStatus, setLocationStatus] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Subscribe to project service updates
  useEffect(() => {
    const unsubscribe = projectService.subscribe(() => {
      setProjects(projectService.listProjects())
    })
    return () => unsubscribe()
  }, [])

  // Geotagged vs non-geotagged projects
  const { validProjects, missingCount } = useMemo(() => {
    const valid: Project[] = []
    let missing = 0

    for (const p of projects) {
      const lat = p.location?.latitude
      const lng = p.location?.longitude
      if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
        valid.push(p)
      } else {
        missing++
      }
    }
    return { validProjects: valid, missingCount: missing }
  }, [projects])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return validProjects.filter((p) => {
      const matchSearch =
        !q ||
        p.id.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        (p.nameHi && p.nameHi.toLowerCase().includes(q)) ||
        p.location.block?.toLowerCase().includes(q) ||
        p.department?.toLowerCase().includes(q)

      const matchStatus = selectedStatus === 'all' || p.status === selectedStatus
      const matchBlock = selectedBlock === 'all' || p.location.block === selectedBlock

      return matchSearch && matchStatus && matchBlock
    })
  }, [validProjects, searchQuery, selectedStatus, selectedBlock])

  // Available blocks for dropdown
  const blockOptions = useMemo(() => {
    const set = new Set<string>()
    validProjects.forEach((p) => {
      if (p.location.block) set.add(p.location.block)
    })
    return ['all', ...Array.from(set).sort()]
  }, [validProjects])

  // Function to create DOM-based popup element
  const createPopupElement = useCallback(
    (project: Project) => {
      const container = document.createElement('div')
      container.className = 'leaflet-popup-card'

      const title = language === 'hi' && project.nameHi ? project.nameHi : project.nameEn
      const dept = project.department || 'Infrastructure'
      const block = project.location?.block || 'Ranchi'
      const village = project.location?.village || ''
      const statusColor = statusColors[project.status]?.bg || '#2563eb'
      const statusLabel =
        language === 'hi'
          ? statusColors[project.status]?.labelHi || project.status
          : statusColors[project.status]?.label || project.status

      const formattedSanction = formatCurrency(
        project.financials?.approvedAmount || project.financials?.estimatedCost || 0
      )
      const formattedExp = formatCurrency(project.financials?.expenditure || 0)

      container.innerHTML = `
        <div style="font-family: inherit; min-width: 260px; max-width: 310px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: #475569; background: #f1f5f9; padding: 2px 8px; border-radius: 6px; letter-spacing: 0.02em;">
              ${project.id}
            </span>
            <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background: ${statusColor}18; color: ${statusColor};">
              <span style="width: 6px; height: 6px; border-radius: 9999px; background: ${statusColor};"></span>
              ${statusLabel}
            </span>
          </div>

          <h4 style="font-size: 13.5px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; line-height: 1.35;">
            ${title}
          </h4>

          <div style="font-size: 11.5px; color: #64748b; margin-bottom: 8px; display: flex; flex-direction: column; gap: 3px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <strong>${dept}</strong>
            </div>
            <div>📍 ${village ? `${village}, ` : ''}${block}, Ranchi</div>
          </div>

          <!-- Progress Bars -->
          <div style="background: #f8fafc; border-radius: 8px; padding: 8px; margin-bottom: 10px; border: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #64748b;">${language === 'hi' ? 'भौतिक प्रगति' : 'Physical Progress'}:</span>
              <strong style="color: #0f172a;">${project.physicalProgress}%</strong>
            </div>
            <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 9999px; overflow: hidden; margin-bottom: 6px;">
              <div style="width: ${project.physicalProgress}%; height: 100%; background: #059669; border-radius: 9999px;"></div>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 11px; color: #475569;">
              <span>${language === 'hi' ? 'स्वीकृत' : 'Sanctioned'}: <strong>${formattedSanction}</strong></span>
              <span>${language === 'hi' ? 'व्यय' : 'Spent'}: <strong>${formattedExp}</strong></span>
            </div>
          </div>

          <!-- Action Button -->
          <button id="btn-open-drawer-${project.id}" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 12px; background: #2563eb; color: #ffffff; font-size: 12px; font-weight: 600; border-radius: 8px; border: none; cursor: pointer; transition: background 0.15s ease;">
            <span>${language === 'hi' ? 'पूर्ण विवरण देखें' : 'View Full Details'}</span>
            <span>&rarr;</span>
          </button>
        </div>
      `

      // Attach click handler for opening drawer
      setTimeout(() => {
        const btn = container.querySelector(`#btn-open-drawer-${project.id}`)
        if (btn) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation()
            openProject(project)
          })
        }
      }, 0)

      return container
    },
    [language, formatCurrency, openProject]
  )

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: defaultMapConfig.defaultCenter,
      zoom: defaultMapConfig.defaultZoom,
      maxZoom: defaultMapConfig.maxZoom,
      minZoom: defaultMapConfig.minZoom,
      zoomControl: true,
    })

    L.tileLayer(defaultMapConfig.tileUrl, {
      attribution: defaultMapConfig.attribution,
      maxZoom: defaultMapConfig.maxZoom,
      crossOrigin: true,
    }).addTo(map)

    const markersGroup = L.layerGroup().addTo(map)
    markersLayerRef.current = markersGroup
    mapRef.current = map

    // Fix map render sizing
    setTimeout(() => {
      map.invalidateSize()
    }, 200)

    return () => {
      map.remove()
      mapRef.current = null
      markersLayerRef.current = null
    }
  }, [])

  // Sync markers when filteredProjects changes
  useEffect(() => {
    const map = mapRef.current
    const layer = markersLayerRef.current
    if (!map || !layer) return

    layer.clearLayers()
    markersMapRef.current = {}

    const bounds = L.latLngBounds([])

    filteredProjects.forEach((project) => {
      const lat = project.location?.latitude!
      const lng = project.location?.longitude!
      const isSelected = selectedProjectId === project.id

      const icon = createMarkerIcon(project.status, isSelected)
      const marker = L.marker([lat, lng], { icon })

      const popupEl = createPopupElement(project)
      marker.bindPopup(popupEl, {
        maxWidth: 320,
        className: 'custom-project-popup',
      })

      marker.on('click', () => {
        setSelectedProjectId(project.id)
      })

      marker.addTo(layer)
      markersMapRef.current[project.id] = marker
      bounds.extend([lat, lng])
    })

    // If there are markers and initial load, fit bounds
    if (filteredProjects.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
    }
  }, [filteredProjects, selectedProjectId, createPopupElement])

  // Focus a project when clicked from side list
  const handleSelectProject = useCallback(
    (project: Project) => {
      setSelectedProjectId(project.id)
      const map = mapRef.current
      const marker = markersMapRef.current[project.id]

      if (map && project.location?.latitude && project.location?.longitude) {
        map.flyTo([project.location.latitude, project.location.longitude], 15, {
          duration: 1.2,
        })
        if (marker) {
          setTimeout(() => {
            marker.openPopup()
          }, 600)
        }
      }
    },
    []
  )

  // Reset view to Ranchi bounds
  const handleResetView = () => {
    const map = mapRef.current
    if (!map) return
    map.flyTo(defaultMapConfig.defaultCenter, defaultMapConfig.defaultZoom, {
      duration: 1,
    })
    setSelectedProjectId(null)
  }

  // Handle "Show My Location"
  const handleShowMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus(
        language === 'hi'
          ? 'आपके ब्राउज़र में जीपीएस सुविधा समर्थित नहीं है।'
          : 'Geolocation is not supported by your browser.'
      )
      return
    }

    setLocationStatus(language === 'hi' ? 'स्थान खोजा जा रहा है...' : 'Locating your position...')

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords
        const map = mapRef.current
        if (!map) return

        if (userMarkerRef.current) {
          map.removeLayer(userMarkerRef.current)
        }

        const userMarker = L.circleMarker([latitude, longitude], {
          radius: 9,
          fillColor: '#3b82f6',
          color: '#ffffff',
          weight: 3,
          opacity: 1,
          fillOpacity: 0.9,
        })

        userMarker.bindPopup(`
          <div style="font-size: 12px; font-weight: 600; padding: 4px;">
            📍 ${language === 'hi' ? 'आपकी वर्तमान स्थिति' : 'Your Current Location'}
            <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Accuracy: ±${Math.round(accuracy)}m</div>
          </div>
        `)

        userMarker.addTo(map)
        userMarkerRef.current = userMarker

        map.flyTo([latitude, longitude], 15, { duration: 1.2 })
        setTimeout(() => userMarker.openPopup(), 800)

        setLocationStatus(
          language === 'hi'
            ? 'स्थान सफलता पूर्वक मिला!'
            : `Location found (±${Math.round(accuracy)}m)`
        )
        setTimeout(() => setLocationStatus(null), 4000)
      },
      (err) => {
        let msg = language === 'hi' ? 'स्थान प्राप्त नहीं हो सका।' : 'Unable to retrieve location.'
        if (err.code === 1) {
          msg =
            language === 'hi'
              ? 'स्थान की अनुमति अस्वीकृत। ब्राउज़र सेटिंग्स में जीपीएस अनुमति दें।'
              : 'Location permission denied. Please allow GPS access in your browser.'
        }
        setLocationStatus(msg)
        setTimeout(() => setLocationStatus(null), 5000)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  return (
    <div className="map-page-shell">
      {/* Top Filter & Toolbar Card */}
      <div className="map-toolbar-card">
        <div className="map-toolbar-top">
          {/* Search Box */}
          <div className="map-search-box">
            <Search size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'परियोजना का नाम, आईडी, ब्लॉक या विभाग खोजें...'
                  : 'Search by project name, ID, block, or department...'
              }
              className="map-search-input"
            />
          </div>

          {/* Filters and Actions */}
          <div className="map-filters-row">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="map-select"
            >
              <option value="all">{language === 'hi' ? 'सभी स्थितियाँ' : 'All Statuses'}</option>
              <option value="Ongoing">{language === 'hi' ? 'चालू (Ongoing)' : 'Ongoing'}</option>
              <option value="Completed">{language === 'hi' ? 'पूर्ण (Completed)' : 'Completed'}</option>
              <option value="Delayed">{language === 'hi' ? 'विलंबित (Delayed)' : 'Delayed'}</option>
            </select>

            {/* Block Filter */}
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="map-select"
            >
              <option value="all">{language === 'hi' ? 'सभी ब्लॉक (All Blocks)' : 'All Blocks'}</option>
              {blockOptions
                .filter((b) => b !== 'all')
                .map((b) => (
                  <option key={b} value={b}>
                    {b} Block
                  </option>
                ))}
            </select>

            {/* Locate Me */}
            <button
              type="button"
              onClick={handleShowMyLocation}
              className="map-action-btn primary"
              title="Locate me on map"
            >
              <Crosshair size={15} />
              <span>{language === 'hi' ? 'मेरी स्थिति' : 'My Location'}</span>
            </button>

            {/* Reset View */}
            <button
              type="button"
              onClick={handleResetView}
              className="map-action-btn secondary"
              title="Reset map view to Ranchi center"
            >
              <RotateCcw size={15} />
              <span>{language === 'hi' ? 'रीसेट' : 'Reset View'}</span>
            </button>
          </div>
        </div>

        {/* Status notification toast */}
        {locationStatus && (
          <div className="map-info-toast">
            <Compass size={16} />
            <span>{locationStatus}</span>
          </div>
        )}

        {/* Summary Footer */}
        <div className="map-summary-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="map-count-badge">
              <span className="map-count-dot" style={{ backgroundColor: '#059669' }} />
              <strong>{validProjects.length}</strong>{' '}
              {language === 'hi' ? 'जीपीएस टैग परियोजनाएं' : 'With GPS Coordinates'}
            </span>
            {missingCount > 0 && (
              <span className="map-count-badge" style={{ color: '#d97706' }}>
                <span className="map-count-dot" style={{ backgroundColor: '#d97706' }} />
                <strong>{missingCount}</strong> {language === 'hi' ? 'बिना जीपीएस' : 'Without Coordinates'}
              </span>
            )}
          </div>

          {/* Status Color Legend */}
          <div className="map-legend-pills">
            <span className="map-count-badge">
              <span className="map-count-dot" style={{ backgroundColor: '#2563eb' }} />
              <span>{language === 'hi' ? 'चालू' : 'Ongoing'}</span>
            </span>
            <span className="map-count-badge">
              <span className="map-count-dot" style={{ backgroundColor: '#059669' }} />
              <span>{language === 'hi' ? 'पूर्ण' : 'Completed'}</span>
            </span>
            <span className="map-count-badge">
              <span className="map-count-dot" style={{ backgroundColor: '#dc2626' }} />
              <span>{language === 'hi' ? 'विलंबित' : 'Delayed'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Map + Sidebar Workspace */}
      <div className={`map-workspace-grid ${!isSidebarOpen ? 'fullwidth' : ''}`}>
        {/* Left Side: Leaflet Interactive Map View */}
        <div className="map-canvas-container">
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

          {/* Toggle sidebar button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="map-toggle-panel-btn"
          >
            <Layers size={14} />
            <span>
              {isSidebarOpen
                ? language === 'hi' ? 'सूची छुपाएं' : 'Hide List'
                : language === 'hi' ? 'सूची दिखाएं' : 'Show List'}
            </span>
          </button>
        </div>

        {/* Right Side: Projects List Panel */}
        {isSidebarOpen && (
          <div className="map-sidebar-card">
            <div className="map-sidebar-header">
              <div>
                <strong>{language === 'hi' ? 'मानचित्रित परियोजनाएं' : 'Mapped Projects'}</strong>
                <span>
                  {filteredProjects.length} {language === 'hi' ? 'परियोजनाएं प्रदर्शित' : 'shown in view'}
                </span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                {language === 'hi' ? 'क्लिक कर फोकस करें' : 'Click to focus'}
              </span>
            </div>

            {/* Scrollable Project Cards */}
            <div className="map-project-list">
              {filteredProjects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 16px', color: '#64748b' }}>
                  <MapPin size={32} style={{ margin: '0 auto 8px', color: '#cbd5e1' }} />
                  <p style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 4px' }}>
                    {language === 'hi' ? 'कोई परियोजना नहीं मिली' : 'No projects found'}
                  </p>
                  <p style={{ fontSize: '11px', margin: 0, color: '#94a3b8' }}>
                    {language === 'hi' ? 'कृपया खोज शब्द या फ़िल्टर बदलें' : 'Try adjusting your search or filters'}
                  </p>
                </div>
              ) : (
                filteredProjects.map((p) => {
                  const isSelected = selectedProjectId === p.id
                  const title = language === 'hi' && p.nameHi ? p.nameHi : p.nameEn
                  const statusConf = statusColors[p.status] || statusColors.Ongoing

                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProject(p)}
                      className={`map-project-item ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="map-project-item-top">
                        <span className="map-id-tag">{p.id}</span>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            backgroundColor: `${statusConf.bg}15`,
                            color: statusConf.bg,
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: statusConf.bg,
                            }}
                          />
                          {language === 'hi' ? statusConf.labelHi : statusConf.label}
                        </span>
                      </div>

                      <h4 className="map-project-item-title">{title}</h4>

                      <div className="map-project-item-meta">
                        <span>📍 {p.location.block || 'Ranchi'}</span>
                        <strong style={{ color: '#0f172a' }}>
                          {formatCurrency(p.financials?.approvedAmount || 0)}
                        </strong>
                      </div>

                      {/* Mini Progress Bar */}
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '10.5px',
                            color: '#64748b',
                            marginBottom: '4px',
                          }}
                        >
                          <span>{language === 'hi' ? 'भौतिक प्रगति' : 'Progress'}</span>
                          <strong style={{ color: '#0f172a' }}>{p.physicalProgress}%</strong>
                        </div>
                        <div className="map-project-progress-bar">
                          <div
                            className="map-project-progress-fill"
                            style={{ width: `${p.physicalProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer Details Link */}
                      <div className="map-project-item-footer">
                        <span>
                          {p.location.latitude?.toFixed(4)}, {p.location.longitude?.toFixed(4)}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            openProject(p)
                          }}
                          className="map-view-drawer-link"
                        >
                          <span>{language === 'hi' ? 'विवरण' : 'Details'}</span>
                          <Eye size={12} />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
