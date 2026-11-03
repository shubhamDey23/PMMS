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
            ? 'रामगढ़ जिले (मांडू, पतरातू, गोला, चितरपुर, दुलमी एवं रामगढ़) में डीएमएफटी अंतर्गत संचालित विकास परियोजनाओं की भौगोलिक स्थिति एवं सत्यापन'
            : 'Interactive GIS project visualization across Ramgarh District blocks (Mandu, Patratu, Ramgarh, Gola, Chitarpur, Dulmi) with verified GPS coordinates'
        }
      />
      <ProjectMap />
    </div>
  )
}
