import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = dmftDatabase.getProjectById(id)

    if (!project) {
      return NextResponse.json(
        { success: false, error: `Project ${id} not found` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      project,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal error' },
      { status: 500 }
    )
  }
}

