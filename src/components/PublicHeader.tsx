'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Lock, Menu, Search, ShieldCheck, X } from 'lucide-react'
import { Logo } from './Logo'
import { LanguageSwitch } from './LanguageSwitch'
import { useTranslation } from '@/context/LanguageContext'

export function PublicHeader({ onSearchClick }: { onSearchClick?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, language } = useTranslation()

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="public-header-container">
      <nav className="public-nav">
        <Link href="/" className="public-nav-brand">
          <Logo />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="public-nav-links">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {language === 'hi' ? 'होम' : 'Home'}
          </button>
          <button type="button" onClick={() => scrollToSection('overview')}>
            {t.drawer.overview}
          </button>
          <button type="button" onClick={() => scrollToSection('map-progress')}>
            {language === 'hi' ? 'मानचित्र एवं प्रगति' : 'Map & Progress'}
          </button>
          <button type="button" onClick={() => scrollToSection('featured-projects')}>
            {language === 'hi' ? 'विशेष परियोजनाएँ' : 'Featured Projects'}
          </button>
        </div>

        {/* Action Buttons: Language Switch, Find Project & Admin Login */}
        <div className="public-nav-actions">
          <LanguageSwitch compact />

          <button
            type="button"
            className="secondary-btn public-search-btn"
            onClick={onSearchClick}
            aria-label="Find a project"
          >
            <Search size={16} />
            <span>{language === 'hi' ? 'परियोजना खोजें' : 'Find a project'}</span>
          </button>

          <Link href="/login" className="admin-login-btn" title="Admin Login Portal">
            <ShieldCheck size={16} />
            <span>{t.adminLogin}</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-public-menu">
          <div className="mobile-public-menu-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#b9ddb9', fontWeight: 600 }}>
                {t.language}:
              </span>
              <LanguageSwitch compact />
            </div>

            <button
              type="button"
              className="mobile-menu-item"
              onClick={() => {
                setMobileMenuOpen(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              {language === 'hi' ? 'होम' : 'Home'}
            </button>
            <button
              type="button"
              className="mobile-menu-item"
              onClick={() => scrollToSection('overview')}
            >
              {t.sections.performanceOverview}
            </button>
            <button
              type="button"
              className="mobile-menu-item"
              onClick={() => scrollToSection('map-progress')}
            >
              {language === 'hi' ? 'राज्य प्रगति एवं मानचित्र' : 'State Progress & Map'}
            </button>
            <button
              type="button"
              className="mobile-menu-item"
              onClick={() => scrollToSection('featured-projects')}
            >
              {language === 'hi' ? 'विशेष परियोजनाएँ' : 'Featured Projects'}
            </button>

            <div className="mobile-menu-divider" />

            <button
              type="button"
              className="mobile-menu-search"
              onClick={() => {
                setMobileMenuOpen(false)
                onSearchClick?.()
              }}
            >
              <Search size={16} />
              <span>{language === 'hi' ? 'परियोजना खोजें' : 'Find a Project'}</span>
            </button>

            <Link
              href="/login"
              className="mobile-menu-login"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldCheck size={18} />
              <span>{t.adminLogin}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
