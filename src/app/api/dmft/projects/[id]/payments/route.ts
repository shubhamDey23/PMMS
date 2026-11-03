import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { billNo, billDate, requisitionAmount, requisitionLetterNo, remarks } = body

    if (!billNo || !requisitionAmount) {
      return NextResponse.json(
        { success: false, error: 'billNo and requisitionAmount are required.' },
        { status: 400 }
      )
    }

    const execUser = dmftDatabase.getUsers().find((u) => u.role === 'execution_dept') || dmftDatabase.getUsers()[0]

    const req = dmftDatabase.submitPaymentRequisition(
      id,
      billNo,
      billDate || new Date().toISOString().split('T')[0],
      Number(requisitionAmount),
      requisitionLetterNo || `BILL/${billNo}`,
      remarks || 'Payment requisition submitted.',
      execUser
    )

    return NextResponse.json({
      success: true,
      paymentRequisition: req,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Payment requisition failed' },
      { status: 400 }
    )
  }
}

