import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { inspectionDate, inspectionTeam, checklist, findings, deficiencies, actionAssignedTo, dueDate } = body

    if (!inspectionDate || !findings) {
      return NextResponse.json(
        { success: false, error: 'inspectionDate and findings are required.' },
        { status: 400 }
      )
    }

    const inspectionUser = dmftDatabase.getUsers().find((u) => u.role === 'inspection_team') || dmftDatabase.getUsers()[0]

    const record = dmftDatabase.recordInspection(
      id,
      inspectionDate,
      inspectionTeam || ['Er. Amit Verma (AE)'],
      checklist || [],
      findings,
      deficiencies || '',
      actionAssignedTo || 'Executing Agency',
      dueDate || inspectionDate,
      inspectionUser
    )

    return NextResponse.json({
      success: true,
      inspection: record,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Inspection recording failed' },
      { status: 400 }
    )
  }
}

