import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function GET() {
  try {
    const notifications = dmftDatabase.getNotifications()
    const pendency = dmftDatabase.getPendencyList()
    return NextResponse.json({
      success: true,
      unreadCount: notifications.filter((n) => !n.read).length,
      pendencyAlertsCount: pendency.length,
      notifications,
      pendency,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, id } = body

    if (action === 'mark_read' && id) {
      dmftDatabase.markNotificationRead(id)
      return NextResponse.json({ success: true, message: `Notification ${id} marked as read.` })
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Notification update failed' },
      { status: 500 }
    )
  }
}

