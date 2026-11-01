'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { logoutAction } from '@/app/actions/auth'
import { AdminHeader } from './AdminHeader'
import { AdminSidebar } from './AdminSidebar'
import { AdminDrawerProvider } from '@/context/AdminDrawerContext'

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
        <main>{children}</main>
      </div>
    </AdminDrawerProvider>
  )
}

