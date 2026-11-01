'use client'

import React from 'react'
import { PageIntro } from '@/components/PageIntro'
import { ProjectMap } from '@/components/map/ProjectMap'
import { useTranslation } from '@/context/LanguageContext'

export default function AdminMapPage() {
  const { language } = useTranslation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <PageIntro
        eyebrow={language === 'hi' ? 'भौगोलिक निगरानी (GIS)' : 'GIS Geotagging & Monitoring'}
        title={language === 'hi' ? 'परियोजना मानचित्र (जीपीएस)' : 'Project Geographic Map'}
        subtitle={
          language === 'hi'
            ? 'रांची जिले एवं झारखण्ड राज्य में संचालित सभी विकास परियोजनाओं की वास्तविक भौगोलिक स्थिति, भौतिक प्रगति एवं सत्यापन'
            : 'Interactive GIS project visualization with verified GPS coordinates and OpenStreetMap satellite layers'
        }
      />
      <ProjectMap />
    </div>
  )
}
