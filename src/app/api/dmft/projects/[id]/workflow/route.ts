import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { action, toOfficer, toDepartment, remarks, newStage } = body

    if (!action || !toOfficer) {
      return NextResponse.json(
        { success: false, error: 'action and toOfficer are required.' },
        { status: 400 }
      )
    }

    const adminUser = dmftDatabase.getUsers()[0]

    const updated = dmftDatabase.moveFile(
      id,
      action,
      toOfficer,
      toDepartment || 'Concerned Section',
      remarks || 'Workflow movement processed.',
      adminUser,
      newStage
    )

    return NextResponse.json({
      success: true,
      project: updated,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Workflow movement failed' },
      { status: 400 }
    )
  }
}

