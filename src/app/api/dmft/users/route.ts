import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function GET() {
  try {
    const users = dmftDatabase.getUsers()
    const auditLogs = dmftDatabase.getAuditLogs()
    return NextResponse.json({
      success: true,
      rolesCount: users.length,
      users,
      auditLogs,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch users and audit logs' },
      { status: 500 }
    )
  }
}

