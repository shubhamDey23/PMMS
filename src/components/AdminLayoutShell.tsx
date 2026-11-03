'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { logoutAction } from '@/app/actions/auth'
import { AdminHeader } from './AdminHeader'
import { AdminSidebar } from './AdminSidebar'
import { AdminDrawerProvider } from '@/context/AdminDrawerContext'
import { FloatingHelpButton } from '@/components/help/FloatingHelpButton'

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isAIAssistant = pathname === '/admin/ai-assistant'

  const handleLogout = async () => {
    try {
      await logoutAction()
      window.location.href = '/login'
    } catch {
      window.location.href = '/login'
    }
  }

  return (
    <AdminDrawerProvider>
      <div className={`app-shell ${collapsed ? 'is-collapsed' : ''}`}>
        <AdminSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          closeMobile={() => setMobileOpen(false)}
          onLogout={handleLogout}
        />
        <AdminHeader
          onMenu={() => setMobileOpen(true)}
          onLogout={handleLogout}
        />
        <main
          style={
            isAIAssistant
              ? {
                  height: 'calc(100vh - 72px)',
                  padding: '16px 24px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '100%',
                }
              : undefined
          }
        >
          {children}
        </main>
        {!isAIAssistant && <FloatingHelpButton />}
      </div>
    </AdminDrawerProvider>
  )
}

