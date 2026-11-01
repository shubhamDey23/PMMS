'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ExternalLink,
  HelpCircle,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
  X,
} from 'lucide-react'
import { navItems } from '@/data/mock-data'
import { Logo } from './Logo'
import { useTranslation } from '@/context/LanguageContext'

export function AdminSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  closeMobile,
  onLogout,
}: {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  closeMobile: () => void
  onLogout: () => void
}) {
  const pathname = usePathname()
  const { t, language } = useTranslation()

  const isLinkActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMobile}
          aria-label="Close sidebar overlay"
        />
      )}
      <aside
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${
          mobileOpen ? 'mobile-open' : ''
        }`}
      >
        <div className="sidebar-brand">
          <Link href="/admin" onClick={closeMobile} className="brand-link">
            <Logo compact={collapsed} />
          </Link>
          <button
            type="button"
            className="icon-btn mobile-close"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Add Project Quick Action in Sidebar */}
        <div style={{ padding: collapsed ? '12px 10px 4px' : '12px 14px 4px' }}>
          <Link
            href="/admin/projects/new"
            className="sidebar-add-btn"
            title={t.nav.addNewProject}
            onClick={closeMobile}
          >
            <PlusCircle size={18} />
            {!collapsed && <span>{t.nav.addNewProject}</span>}
          </Link>
        </div>

        <div className="nav-label">{!collapsed && (language === 'hi' ? 'मुख्य मेनू' : 'MAIN MENU')}</div>

        <nav>
          {navItems.map((item) => {
            const Icon = item.icon
            const isPublicLink = item.href === '/'
            const active = !isPublicLink && isLinkActive(item.href, item.exact)
            const label = language === 'hi' && item.labelHi ? item.labelHi : item.label

            return (
              <Link
                key={item.label}
                href={item.href}
                title={collapsed ? label : undefined}
                className={`nav-item ${active ? 'active' : ''} ${
                  isPublicLink ? 'public-external-link' : ''
                }`}
                onClick={closeMobile}
              >
                <Icon size={19} />
                <span>{label}</span>
                {isPublicLink && !collapsed && (
                  <ExternalLink size={13} className="ext-icon" />
                )}
                {!collapsed && active && <span className="active-dot" />}
              </Link>
            )
          })}
        </nav>

        <div className="sidebar-foot">
          {!collapsed && (
            <div className="support-card">
              <HelpCircle size={19} />
              <div>
                <strong>{language === 'hi' ? 'सहायता चाहिए?' : 'Need assistance?'}</strong>
                <span>{language === 'hi' ? 'PMMS हेल्पडेस्क से संपर्क करें' : 'Contact PMMS helpdesk'}</span>
              </div>
            </div>
          )}

          {/* Quick logout button in sidebar */}
          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={onLogout}
            title={t.logout}
          >
            <LogOut size={17} />
            {!collapsed && <span>{t.logout}</span>}
          </button>

          <button
            type="button"
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <>
                <PanelLeftClose size={18} />
                <span>{language === 'hi' ? 'साइडबार समेटें' : 'Collapse sidebar'}</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
