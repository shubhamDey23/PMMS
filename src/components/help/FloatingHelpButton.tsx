'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bot } from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'

export function FloatingHelpButton() {
  const pathname = usePathname()
  const { language } = useTranslation()

  // Don't render floating button if already on /admin/help
  if (pathname === '/admin/help') {
    return null
  }

  return (
    <div className="floating-help-container">
      <Link
        href="/admin/help"
        className="floating-help-trigger"
        aria-label="eSapmada Help Assistant"
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Bot size={18} color="#ffffff" />
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              backgroundColor: '#34d399',
              borderRadius: '50%',
              border: '2px solid #ffffff',
            }}
          />
        </div>
        <span>{language === 'hi' ? 'सहायता चाहिए?' : 'Need Help?'}</span>
      </Link>
    </div>
  )
}
