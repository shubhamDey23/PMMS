'use client'

import { AlertTriangle, ArrowRight, ChevronRight } from 'lucide-react'
import { alerts } from '@/data/mock-data'
import { SectionHeader } from './SectionHeader'
import { useTranslation } from '@/context/LanguageContext'

export function PendingActions({ full = false }: { full?: boolean }) {
  const { t, language } = useTranslation()

  return (
    <section>
      <SectionHeader
        title={t.sections.pendingActionsTitle}
        subtitle={t.sections.pendingActionsSubtitle}
        action={
          <button className="text-action">
            {language === 'hi' ? 'सभी कार्रवाइयाँ देखें' : 'View all actions'} <ArrowRight size={15} />
          </button>
        }
      />
      <div className={`alert-banner ${full ? 'full' : ''}`}>
        <span>
          <AlertTriangle size={20} />
          <div>
            <strong>
              {language === 'hi'
                ? '8 महत्वपूर्ण परियोजनाओं पर तत्काल ध्यान देने की आवश्यकता है'
                : '8 critical projects require immediate attention'}
            </strong>
            <p>
              {language === 'hi'
                ? '60 दिनों से अधिक विलंबित अथवा स्वीकृत लागत सीमा से अधिक।'
                : 'Delayed by more than 60 days or exceeding approved cost thresholds.'}
            </p>
          </div>
        </span>
        <button type="button">
          {language === 'hi' ? 'महत्वपूर्ण परियोजनाएँ देखें' : 'Review critical projects'} <ArrowRight size={15} />
        </button>
      </div>
      <div className="action-grid">
        {alerts.map((a) => (
          <button className="action-card" key={a.label}>
            <span className={`icon-tile ${a.tone}`}>
              <a.icon size={19} />
            </span>
            <div>
              <span>{language === 'hi' && a.labelHi ? a.labelHi : a.label}</span>
              <strong>{a.count}</strong>
              <small>{language === 'hi' && a.metaHi ? a.metaHi : a.meta}</small>
            </div>
            <ChevronRight size={17} />
          </button>
        ))}
      </div>
    </section>
  )
}
