import { NextResponse } from 'next/server'
import { loginAction } from '@/app/actions/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await loginAction(body)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 401 })
    }

    return NextResponse.json({ success: true, redirectUrl: result.redirectUrl })
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred during authentication.' },
      { status: 500 }
    )
  }
}

