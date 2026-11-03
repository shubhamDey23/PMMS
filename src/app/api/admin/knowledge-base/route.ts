import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getKnowledgeManifest, saveKnowledgeManifest } from '@/lib/knowledge-base/document-store'
import { runIngestionPipeline, loadIndexedChunks } from '@/lib/knowledge-base/ingestion'

/**
 * GET /api/admin/knowledge-base
 * Securely lists all ingested documents, SHA-256 fingerprints, and chunk statistics.
 * Accessible strictly by authenticated administrators.
 */
export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json(
      { error: 'UNAUTHORIZED', message: 'Authentication required' },
      { status: 401 }
    )
  }

  const manifest = getKnowledgeManifest()
  const chunks = loadIndexedChunks()

  return NextResponse.json({
    status: 'SUCCESS',
    manifest,
    totalIndexedChunks: chunks.length,
    documentationChunks: chunks.filter(c => c.sourceType === 'documentation').length,
    liveRecordChunks: chunks.filter(c => c.sourceType === 'live_project').length,
  })
}

/**
 * POST /api/admin/knowledge-base
 * Triggers repeatable document ingestion and indexing pipeline.
 * Computes SHA-256 hashes and prevents duplicate indexing.
 */
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json(
      { error: 'UNAUTHORIZED', message: 'Administrator authentication required to trigger document ingestion.' },
      { status: 401 }
    )
  }

  try {
    const result = runIngestionPipeline()
    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Knowledge base ingestion pipeline executed successfully.',
      manifest: result.manifest,
      indexedChunksCount: result.indexedChunksCount,
    })
  } catch (err: any) {
    return NextResponse.json(
      {
        error: 'INGESTION_ERROR',
        message: err?.message || 'Failed to execute knowledge base ingestion pipeline.',
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/knowledge-base
 * Unindexes a document from the catalog.
 */
export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json(
      { error: 'UNAUTHORIZED', message: 'Administrator authentication required.' },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(req.url)
  const docId = searchParams.get('id')

  if (!docId) {
    return NextResponse.json(
      { error: 'INVALID_REQUEST', message: 'Document ID is required.' },
      { status: 400 }
    )
  }

  const manifest = getKnowledgeManifest()
  const initialCount = manifest.documents.length
  manifest.documents = manifest.documents.filter(d => d.id !== docId && d.fileName !== docId)

  if (manifest.documents.length === initialCount) {
    return NextResponse.json(
      { error: 'NOT_FOUND', message: `Document with ID "${docId}" not found in catalog.` },
      { status: 404 }
    )
  }

  saveKnowledgeManifest(manifest)

  return NextResponse.json({
    status: 'SUCCESS',
    message: `Document "${docId}" unindexed successfully.`,
    remainingDocuments: manifest.documents.length,
  })
}

