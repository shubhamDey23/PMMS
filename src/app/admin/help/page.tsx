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
        eyebrow={language === 'hi' ? 'परियोजना बुद्धिमत्ता एवं सहायता' : 'Project Intelligence & Support (RFP Module 6)'}
        title={language === 'hi' ? 'पूछें डीएमएफटी एआई' : 'Ask DMFT AI'}
        subtitle={
          language === 'hi'
            ? 'रामगढ़ जिले में खनन प्रभावित विकास कार्यों, 10 जीवनचक्र चरणों, कार्य प्रगति एवं विलंब विश्लेषण हेतु प्राकृतिक भाषा सहायता प्रणाली'
            : 'Natural language project queries, 10-stage lifecycle guidance, and MIS analysis for DMFT Ramgarh'
        }
      />
      <HelpAssistant />
    </div>
  )
}
