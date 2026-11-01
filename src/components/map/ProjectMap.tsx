'use client'

import dynamic from 'next/dynamic'
import { MapPin, Compass } from 'lucide-react'

const ProjectMapClient = dynamic(() => import('./ProjectMapClient'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '640px',
        background: '#ffffff',
        border: '1px solid var(--line)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        boxShadow: 'var(--shadow)',
      }}
    >
      <div style={{ position: 'relative' }}>
        <MapPin size={40} color="#2563eb" />
        <Compass
          size={24}
          color="#059669"
          style={{ position: 'absolute', bottom: '-4px', right: '-4px' }}
        />
      </div>
      <p style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
        Loading Interactive Project Map...
      </p>
      <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
        Fetching verified GPS coordinates and OpenStreetMap layers
      </p>
    </div>
  ),
})

export function ProjectMap() {
  return <ProjectMapClient />
}
