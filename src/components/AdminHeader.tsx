'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  LogOut,
  Menu,
  Search,
  Shield,
  User,
} from 'lucide-react'
import { LanguageSwitch } from './LanguageSwitch'
import { ThemeSelector } from './ThemeSelector'
import { useTranslation } from '@/context/LanguageContext'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export function AdminHeader({
  onMenu,
  onLogout,
}: {
  onMenu: () => void
  onLogout: () => void
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false)
  const [notifList, setNotifList] = useState(() => dmftDatabase.getNotifications())
  const { t, language } = useTranslation()

  useEffect(() => {
    const unsub = dmftDatabase.subscribe(() => {
      setNotifList(dmftDatabase.getNotifications())
    })
    return () => unsub()
  }, [])

  const unreadCount = notifList.filter((n) => !n.read).length

  const handleMarkAllRead = () => {
    notifList.forEach((n) => dmftDatabase.markNotificationRead(n.id))
    setNotifList(dmftDatabase.getNotifications())
  }

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

      {/* Dynamic Theme Switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 8px',
          borderRadius: '8px',
          border: '1px solid var(--line)',
          background: 'var(--color-surface)',
        }}
      >
        <ThemeSelector compact />
      </div>

      <Link
        href="/admin/help"
        className="icon-btn"
        title="Ask DMFT AI / Help Assistant"
        aria-label="Ask DMFT AI / Help Assistant"
      >
        <HelpCircle size={20} />
      </Link>

      {/* Interactive In-App Notification Center (RFP Module 9) */}
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          className="icon-btn notification"
          onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
          title={t.notifications}
          aria-label={t.notifications}
        >
          <Bell size={20} />
          {unreadCount > 0 && <i>{unreadCount}</i>}
        </button>

        {notifDropdownOpen && (
          <div
            className="card"
            style={{
              position: 'absolute',
              top: '42px',
              right: 0,
              width: '320px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
              zIndex: 100,
              padding: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '13px' }}>
                {language === 'hi' ? 'सूचनाएं' : 'Notifications'} ({unreadCount})
              </strong>
              <button
                type="button"
                onClick={handleMarkAllRead}
                style={{ fontSize: '10.5px', color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Mark all read
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
              {notifList.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: n.read ? '#f8fafc' : '#eff6ff',
                    borderLeft: `3px solid ${n.category === 'pendency' ? '#ef4444' : '#2563eb'}`,
                    fontSize: '11px',
                  }}
                >
                  <strong style={{ display: 'block', color: 'var(--text)', marginBottom: '2px' }}>
                    {language === 'hi' ? n.titleHi : n.title}
                  </strong>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.3 }}>
                    {language === 'hi' ? n.messageHi : n.message}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
              <Link
                href="/admin/alerts"
                onClick={() => setNotifDropdownOpen(false)}
                style={{ fontSize: '11.5px', color: 'var(--blue)', textDecoration: 'none', fontWeight: 600 }}
              >
                {language === 'hi' ? 'सभी 11 वैधानिक चौकियां देखें →' : 'View all 11 pendency alerts →'}
              </Link>
            </div>
          </div>
        )}
      </div>

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
              <span>ddc-ramgarh@jharkhandmail.gov.in</span>
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
