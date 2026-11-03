import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function GET() {
  try {
    const contractors = dmftDatabase.getContractors()
    return NextResponse.json({
      success: true,
      count: contractors.length,
      contractors,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch contractors' },
      { status: 500 }
    )
  }
}

