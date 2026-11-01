'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  CalendarDays,
  ChevronDown,
  HelpCircle,
  LogOut,
  Menu,
  Search,
  Shield,
  User,
} from 'lucide-react'
import { LanguageSwitch } from './LanguageSwitch'
import { useTranslation } from '@/context/LanguageContext'

export function AdminHeader({
  onMenu,
  onLogout,
}: {
  onMenu: () => void
  onLogout: () => void
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const { t, language } = useTranslation()

  return (
    <header className="topbar">
      <button
        type="button"
        className="icon-btn menu-btn"
        onClick={onMenu}
        aria-label="Open sidebar navigation"
      >
        <Menu size={21} />
      </button>

      <div className="global-search">
        <Search size={18} />
        <input
          placeholder={t.searchPlaceholder}
          aria-label="Search dashboard"
        />
        <kbd>⌘ K</kbd>
      </div>

      <button type="button" className="fy-select">
        <CalendarDays size={17} />
        <span>{t.fy}</span>
        <ChevronDown size={15} />
      </button>

      {/* Bilingual Language Switcher in Header */}
      <LanguageSwitch compact />

      <button
        type="button"
        className="icon-btn"
        title={t.helpSupport}
        aria-label={t.helpSupport}
      >
        <HelpCircle size={20} />
      </button>

      <button
        type="button"
        className="icon-btn notification"
        title={t.notifications}
        aria-label={t.notifications}
      >
        <Bell size={20} />
        <i>5</i>
      </button>

      {/* Prominent header logout button */}
      <button
        type="button"
        className="header-logout-btn"
        onClick={onLogout}
        title={t.logout}
      >
        <LogOut size={16} />
        <span>{t.logout}</span>
      </button>

      {/* Profile with interactive dropdown */}
      <div className="profile-wrapper">
        <button
          type="button"
          className="profile"
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          aria-expanded={profileDropdownOpen}
          aria-label="User profile menu"
        >
          <div className="avatar">AS</div>
          <div>
            <strong>Ananya Sharma</strong>
            <span>{language === 'hi' ? 'राज्य परियोजना निदेशक' : 'State Project Director'}</span>
          </div>
          <ChevronDown size={15} />
        </button>

        {profileDropdownOpen && (
          <div className="profile-dropdown-menu">
            <div className="profile-dropdown-header">
              <strong>Ananya Sharma</strong>
              <span>admin@pmms.gov.in</span>
              <span className="profile-role-badge">
                <Shield size={11} /> {language === 'hi' ? 'प्रशासक' : 'Administrator'}
              </span>
            </div>
            <div className="profile-dropdown-divider" />
            <button
              type="button"
              className="profile-dropdown-item logout"
              onClick={() => {
                setProfileDropdownOpen(false)
                onLogout()
              }}
            >
              <LogOut size={15} />
              <span>{t.logout}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
