'use client'

import React from 'react'
import { Bot } from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { HelpAssistant } from '@/components/help/HelpAssistant'
import { useTranslation } from '@/context/LanguageContext'

export default function AdminHelpPage() {
  const { language } = useTranslation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <PageIntro
        eyebrow={language === 'hi' ? 'मार्गदर्शन एवं सहायता' : 'Support & Guidance'}
        title={language === 'hi' ? 'सहायता सहायक' : 'Help Assistant'}
        subtitle={
          language === 'hi'
            ? 'eSapmada पोर्टल के संचालन, नई परियोजनाओं को जोड़ने, जीपीएस मानचित्र और रिपोर्टिंग हेतु निर्देशित सहायता'
            : 'Interactive guidance, troubleshooting, and procedural answers for eSapmada project officers'
        }
      />
      <HelpAssistant />
    </div>
  )
}
