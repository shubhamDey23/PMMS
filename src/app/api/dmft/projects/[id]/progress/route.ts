import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { percentage, observations, photos } = body

    if (percentage === undefined || percentage < 0 || percentage > 100) {
      return NextResponse.json(
        { success: false, error: 'Percentage must be between 0 and 100.' },
        { status: 400 }
      )
    }

    const fieldUser = dmftDatabase.getUsers().find((u) => u.role === 'inspection_team') || dmftDatabase.getUsers()[0]

    const updated = dmftDatabase.recordProgress(
      id,
      Number(percentage),
      observations || 'Field physical progress update.',
      photos || [],
      fieldUser
    )

    return NextResponse.json({
      success: true,
      project: updated,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Progress update failed' },
      { status: 400 }
    )
  }
}

