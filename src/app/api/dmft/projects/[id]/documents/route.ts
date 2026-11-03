import { NextResponse } from 'next/server'
import { dmftDatabase } from '@/lib/services/dmft-database.service'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, category, fileName, fileSize, fileUrl } = body

    if (!title || !category || !fileName) {
      return NextResponse.json(
        { success: false, error: 'title, category, and fileName are required.' },
        { status: 400 }
      )
    }

    const adminUser = dmftDatabase.getUsers()[0]

    const doc = dmftDatabase.addDocument(
      id,
      {
        title,
        category,
        fileName,
        fileSize: fileSize || '1.5 MB',
        fileUrl: fileUrl || `/documents/${fileName}`,
        uploadedBy: adminUser.name,
        verificationStatus: 'Verified',
      },
      adminUser
    )

    return NextResponse.json({
      success: true,
      document: doc,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Document upload failed' },
      { status: 400 }
    )
  }
}

