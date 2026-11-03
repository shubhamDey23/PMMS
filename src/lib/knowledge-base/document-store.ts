import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export type SourceType = 'documentation' | 'live_project'

export interface DocumentChunk {
  id: string
  documentId: string
  documentName: string
  pageNumber?: string
  sectionTitle: string
  sectionTitleHi: string
  sourceType: SourceType
  sourceCitation: string
  sourceCitationHi: string
  contentEn: string
  contentHi: string
  keywords: string[]
  isLiveFeature: boolean
  lastUpdated: string
}

export interface IngestedDocument {
  id: string
  fileName: string
  filePath: string
  fileHash: string
  title: string
  authority: string
  totalPages: number
  chunksCount: number
  ingestedAt: string
  status: 'active' | 'archived'
}

export interface KnowledgeManifest {
  version: string
  lastIndexedAt: string
  totalDocuments: number
  totalChunks: number
  documents: IngestedDocument[]
}

const KNOWLEDGE_BASE_DIR = path.join(process.cwd(), 'knowledge-base')
const MANIFEST_PATH = path.join(KNOWLEDGE_BASE_DIR, 'manifest.json')

/**
 * Compute SHA-256 hash of a file to prevent duplicate indexing
 */
export function computeFileHash(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`)
  }
  const fileBuffer = fs.readFileSync(filePath)
  return crypto.createHash('sha256').update(fileBuffer).digest('hex')
}

/**
 * Read the current knowledge base manifest
 */
export function getKnowledgeManifest(): KnowledgeManifest {
  try {
    if (fs.existsSync(MANIFEST_PATH)) {
      const data = fs.readFileSync(MANIFEST_PATH, 'utf-8')
      return JSON.parse(data)
    }
  } catch (err) {
    console.warn('[KnowledgeBase] Could not read manifest, returning initial state:', err)
  }

  return {
    version: '1.0.0',
    lastIndexedAt: new Date().toISOString(),
    totalDocuments: 0,
    totalChunks: 0,
    documents: [],
  }
}

/**
 * Save the knowledge base manifest
 */
export function saveKnowledgeManifest(manifest: KnowledgeManifest): void {
  if (!fs.existsSync(KNOWLEDGE_BASE_DIR)) {
    fs.mkdirSync(KNOWLEDGE_BASE_DIR, { recursive: true })
  }
  manifest.lastIndexedAt = new Date().toISOString()
  manifest.totalDocuments = manifest.documents.length
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8')
}

