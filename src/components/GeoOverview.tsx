'use client'

import { useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  Crosshair,
  ExternalLink,
  Layers,
  MapPin,
  Navigation,
  ShieldCheck,
  X,
} from 'lucide-react'
import type { Project } from '@/types/project'
import { useTranslation } from '@/context/LanguageContext'
import { Status } from './Status'

interface UserLocation {
  latitude: number
  longitude: number
  accuracy: number
}

export function GeoOverview({
  projects,
  onOpenProject,
}: {
  projects: Project[]
  onOpenProject: (p: Project) => void
}) {
  const { t, language, getLocalizedText } = useTranslation()

  const [mapStyle, setMapStyle] = useState<'street' | 'satellite'>('street')
  const [selectedPinProject, setSelectedPinProject] = useState<Project | null>(null)
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoNotice, setGeoNotice] = useState<{ type: 'info' | 'error'; message: string } | null>(null)

  // Real geographic bounding box of Ramgarh District, Jharkhand
  const RAMGARH_BOUNDS = {
    minLat: 23.4500,
    maxLat: 23.8500,
    minLng: 85.2000,
    maxLng: 85.8500,
  }

  // Filter projects with valid latitude and longitude
  const geoProjects = projects.filter(
    (p) =>
      p.location.latitude !== undefined &&
      p.location.longitude !== undefined &&
      !isNaN(p.location.latitude) &&
      !isNaN(p.location.longitude)
  )

  const withoutCoordsCount = projects.length - geoProjects.length

  const projectToCanvas = (lat: number, lng: number) => {
    // If coordinate is outside Ramgarh bounds, gracefully clamp
    const x = ((lng - RAMGARH_BOUNDS.minLng) / (RAMGARH_BOUNDS.maxLng - RAMGARH_BOUNDS.minLng)) * 100
    const y = ((RAMGARH_BOUNDS.maxLat - lat) / (RAMGARH_BOUNDS.maxLat - RAMGARH_BOUNDS.minLat)) * 100

    return { x: Math.max(4, Math.min(96, x)), y: Math.max(6, Math.min(94, y)) }
  }

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoNotice({
        type: 'error',
        message:
          language === 'hi'
            ? 'आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता है।'
            : 'Your browser does not support geolocation.',
      })
      return
    }

    setGeoLoading(true)
    setGeoNotice(null)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false)
        const userLoc: UserLocation = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }
        setUserLocation(userLoc)
        setGeoNotice({
          type: 'info',
          message:
            language === 'hi'
              ? `आपकी स्थिति पहचानी गई: ${userLoc.latitude.toFixed(4)}°N, ${userLoc.longitude.toFixed(4)}°E`
              : `Your position detected: ${userLoc.latitude.toFixed(4)}°N, ${userLoc.longitude.toFixed(4)}°E`,
        })
      },
      (err) => {
        setGeoLoading(false)
        let msg =
          language === 'hi'
            ? 'स्थान अनुमति अस्वीकृत कर दी गई।'
            : 'Location permission was denied or unavailable.'
        if (err.code === err.TIMEOUT) {
          msg = language === 'hi' ? 'स्थान अनुरोध समयसीमा समाप्त।' : 'Location request timed out.'
        }
        setGeoNotice({ type: 'error', message: msg })
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  return (
    <section className="card geo-overview-card" style={{ marginBottom: '28px' }}>
      <div className="geo-header">
        <div>
          <h3>{t.geo.mapTitle}</h3>
          <p>{t.geo.mapSubtitle}</p>
        </div>

        <div className="geo-header-actions">
          <div className="geo-map-style-toggle" style={{ display: 'flex', gap: '4px', background: 'var(--bg-muted, #f1f5f9)', padding: '3px', borderRadius: '8px' }}>
            <button
              type="button"
              className={`style-btn ${mapStyle === 'street' ? 'active' : ''}`}
              onClick={() => setMapStyle('street')}
              style={{
                border: 'none',
                background: mapStyle === 'street' ? '#fff' : 'transparent',
                fontWeight: mapStyle === 'street' ? 600 : 500,
                color: mapStyle === 'street' ? '#0f172a' : '#64748b',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: mapStyle === 'street' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              🗺️ {language === 'hi' ? 'सड़क मानचित्र' : 'Street Map'}
            </button>
            <button
              type="button"
              className={`style-btn ${mapStyle === 'satellite' ? 'active' : ''}`}
              onClick={() => setMapStyle('satellite')}
              style={{
                border: 'none',
                background: mapStyle === 'satellite' ? '#fff' : 'transparent',
                fontWeight: mapStyle === 'satellite' ? 600 : 500,
                color: mapStyle === 'satellite' ? '#0f172a' : '#64748b',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: mapStyle === 'satellite' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              🛰️ {language === 'hi' ? 'सैटेलाइट' : 'Satellite'}
            </button>
          </div>

          <div className="geo-stat-pills">
            <span className="pill green">
              <strong>{geoProjects.length}</strong> {t.geo.projectsWithCoords}
            </span>
            <span className="pill muted">
              <strong>{withoutCoordsCount}</strong> {t.geo.projectsWithoutCoords}
            </span>
          </div>

          <button
            type="button"
            className={`secondary-btn location-btn ${userLocation ? 'active' : ''}`}
            onClick={handleDetectLocation}
            disabled={geoLoading}
            title={t.geo.showMyLocation}
          >
            <Crosshair size={15} className={geoLoading ? 'spinner-icon' : ''} />
            <span>
              {geoLoading
                ? t.form.detectingLocation
                : userLocation
                ? t.geo.myLocationActive
                : t.geo.showMyLocation}
            </span>
          </button>
        </div>
      </div>

      {geoNotice && (
        <div className={`geo-notice-bar ${geoNotice.type}`}>
          <AlertCircle size={15} />
          <span>{geoNotice.message}</span>
          <button type="button" onClick={() => setGeoNotice(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Interactive Map Visual with real Ranchi, Jharkhand Map Image & Coordinate Pins */}
      <div
        className={`geo-canvas real-map-${mapStyle}`}
        style={{
          backgroundImage: `url(${mapStyle === 'street' ? '/ranchi-map.jpg' : '/ranchi-satellite.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div className="geo-grid-overlay" style={{ opacity: mapStyle === 'street' ? 0.08 : 0.15 }} />
        <div className="geo-boundary-shape" style={{ background: 'rgba(15, 23, 42, 0.78)', backdropFilter: 'blur(4px)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '8px', padding: '6px 12px' }}>
          📍 RAMGARH DISTRICT, JHARKHAND — DMFT MINING AFFECTED CORRIDOR
          <small style={{ color: '#94a3b8', display: 'block', fontSize: '11px', marginTop: '2px' }}>
            Lat: 23.45°N – 23.85°N | Lon: 85.20°E – 85.85°E • Mandu | Patratu | Ramgarh | Gola | Chitarpur | Dulmi
          </small>
        </div>

        {/* Project pins based on actual coordinates */}
        {geoProjects.map((p) => {
          const { x, y } = projectToCanvas(p.location.latitude!, p.location.longitude!)
          const isSelected = selectedPinProject?.id === p.id

          return (
            <button
              key={p.id}
              type="button"
              className={`geo-pin status-${p.status.toLowerCase()} ${isSelected ? 'selected' : ''}`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setSelectedPinProject(p)}
              title={`${p.id}: ${getLocalizedText(p.nameEn, p.nameHi)}`}
              aria-label={`Project ${p.id}`}
            >
              <MapPin size={isSelected ? 26 : 20} />
              <span className="pin-pulse" />
            </button>
          )
        })}

        {/* User's Current GPS Location Pin (if granted) */}
        {userLocation && (
          <div
            className="geo-user-pin"
            style={{
              left: `${projectToCanvas(userLocation.latitude, userLocation.longitude).x}%`,
              top: `${projectToCanvas(userLocation.latitude, userLocation.longitude).y}%`,
            }}
            title="Your Current Location"
          >
            <Navigation size={22} />
            <div className="user-pin-ring" />
            <span className="user-pin-label">
              {language === 'hi' ? 'आप यहाँ हैं' : 'You are here'}
            </span>
          </div>
        )}

        {/* Selected Project Tooltip / Popover */}
        {selectedPinProject && (
          <div className="geo-pin-popup">
            <button
              type="button"
              className="popup-close"
              onClick={() => setSelectedPinProject(null)}
              aria-label="Close"
            >
              <X size={14} />
            </button>
            <div className="popup-top">
              <span className="project-id">{selectedPinProject.id}</span>
              <Status value={selectedPinProject.status} />
            </div>
            <strong>{getLocalizedText(selectedPinProject.nameEn, selectedPinProject.nameHi)}</strong>
            <div className="popup-meta">
              <span>
                <MapPin size={12} /> {selectedPinProject.location.village},{' '}
                {selectedPinProject.location.block}
              </span>
              <span>{selectedPinProject.department}</span>
            </div>
            <div className="popup-coords">
              GPS: {selectedPinProject.location.latitude?.toFixed(4)}° N,{' '}
              {selectedPinProject.location.longitude?.toFixed(4)}° E
            </div>
            <div className="popup-progress">
              <div className="progress-track">
                <i style={{ width: `${selectedPinProject.physicalProgress}%` }} />
              </div>
              <small>{selectedPinProject.physicalProgress}% physical progress</small>
            </div>
            <button
              type="button"
              className="popup-action-btn"
              onClick={() => {
                onOpenProject(selectedPinProject)
                setSelectedPinProject(null)
              }}
            >
              <span>{t.geo.openProjectDetails}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="geo-footer">
        <div className="geo-legend">
          <span>
            <i className="dot green" /> {t.common.completed}
          </span>
          <span>
            <i className="dot blue" /> {t.common.ongoing}
          </span>
          <span>
            <i className="dot amber" /> {t.common.pending}
          </span>
          <span>
            <i className="dot red" /> {t.common.delayed}
          </span>
          {userLocation && (
            <span>
              <i className="dot user" /> {language === 'hi' ? 'आपका स्थान' : 'Your Position'}
            </span>
          )}
        </div>
        <small className="geo-caption">
          {language === 'hi'
            ? 'निर्देशांक स्थल सत्यापन और जीपीएस सर्वेक्षण डेटा पर आधारित हैं।'
            : 'Coordinates are plotted from field GPS surveys and administrative records.'}
        </small>
      </div>
    </section>
  )
}

