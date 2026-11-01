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

  const [selectedPinProject, setSelectedPinProject] = useState<Project | null>(null)
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoNotice, setGeoNotice] = useState<{ type: 'info' | 'error'; message: string } | null>(null)

  // Filter projects with valid latitude and longitude
  const geoProjects = projects.filter(
    (p) =>
      p.location.latitude !== undefined &&
      p.location.longitude !== undefined &&
      !isNaN(p.location.latitude) &&
      !isNaN(p.location.longitude)
  )

  const withoutCoordsCount = projects.length - geoProjects.length

  // Calculate bounding box for SVG projection (with fallback defaults)
  const defaultMinLat = 23.5
  const defaultMaxLat = 23.9
  const defaultMinLng = 85.3
  const defaultMaxLng = 85.7

  const minLat = Math.min(defaultMinLat, ...geoProjects.map((p) => p.location.latitude!))
  const maxLat = Math.max(defaultMaxLat, ...geoProjects.map((p) => p.location.latitude!))
  const minLng = Math.min(defaultMinLng, ...geoProjects.map((p) => p.location.longitude!))
  const maxLng = Math.max(defaultMaxLng, ...geoProjects.map((p) => p.location.longitude!))

  const projectToCanvas = (lat: number, lng: number) => {
    const latSpan = maxLat - minLat || 0.4
    const lngSpan = maxLng - minLng || 0.4

    // X percentage (left to right)
    const x = ((lng - minLng) / lngSpan) * 80 + 10
    // Y percentage (top to bottom: higher latitude is higher up, so inverted)
    const y = 90 - ((lat - minLat) / latSpan) * 80

    return { x: Math.max(8, Math.min(92, x)), y: Math.max(10, Math.min(90, y)) }
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

      {/* Interactive Map Visual with real Coordinate Pins */}
      <div className="geo-canvas">
        <div className="geo-grid-overlay" />
        <div className="geo-boundary-shape">
          DISTRICT GEOGRAPHIC JURISDICTION
          <small>Verified Territorial Sector Coordinates</small>
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

