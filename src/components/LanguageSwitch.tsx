'use client'

import { useTranslation } from '@/context/LanguageContext'
import { Languages } from 'lucide-react'

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useTranslation()

  return (
    <div className={`lang-switch-wrap ${compact ? 'compact' : ''}`} role="group" aria-label="Select language">
      <span className="lang-icon" aria-hidden="true">
        <Languages size={15} />
      </span>
      <button
        type="button"
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
      >
        English
      </button>
      <button
        type="button"
        className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
        onClick={() => setLanguage('hi')}
        aria-pressed={language === 'hi'}
      >
        हिन्दी
      </button>
    </div>
  )
}

