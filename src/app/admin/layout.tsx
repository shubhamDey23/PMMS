import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { AdminLayoutShell } from '@/components/AdminLayoutShell'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session) {
    redirect('/login?next=/admin')
  }

  return <AdminLayoutShell>{children}</AdminLayoutShell>
}

