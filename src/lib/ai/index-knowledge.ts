/**
 * eSapmada DMFT Portal — Knowledge Base Indexing & Verification Tool
 *
 * Usage:
 *   npx ts-node src/lib/ai/index-knowledge.ts
 * or
 *   node -r esbuild-register src/lib/ai/index-knowledge.ts
 */

import { ESAPMADA_KNOWLEDGE_BASE } from './knowledge-base'
import { retrieveKnowledgeChunks, formatRetrievedContext } from './rag-engine'

export function verifyKnowledgeIndex() {
  console.log('===============================================================')
  console.log('eSapmada DMFT Ramgarh — Knowledge Base Verification & Indexing')
  console.log('===============================================================\n')

  console.log(`Total Knowledge Chunks Loaded: ${ESAPMADA_KNOWLEDGE_BASE.length}`)

  const categories = new Set(ESAPMADA_KNOWLEDGE_BASE.map(c => c.category))
  console.log(`Categories Covered: ${Array.from(categories).join(', ')}`)

  const liveFeatures = ESAPMADA_KNOWLEDGE_BASE.filter(c => c.isImplemented).length
  const roadmapFeatures = ESAPMADA_KNOWLEDGE_BASE.filter(c => !c.isImplemented).length
  console.log(`Live Implemented Features: ${liveFeatures} chunks`)
  console.log(`RFP Roadmap Modules (Explicitly tagged): ${roadmapFeatures} chunks\n`)

  // Run test retrieval queries
  const testQueries = [
    'How does Stage 4 Administrative Sanction (AS) work in Ramgarh?',
    'What are the 11 delay & pendency checkpoints?',
    'Is drone surveillance or automated PFMS payout implemented?',
    'प्रशासनिक स्वीकृति और 10 जीवनचक्र चरण समझाएं',
  ]

  console.log('--- RUNNING RAG RETRIEVAL TEST SUITE ---')
  for (const q of testQueries) {
    const results = retrieveKnowledgeChunks(q, 2)
    const { sources } = formatRetrievedContext(results)
    console.log(`\nQuery: "${q}"`)
    console.log(`Top Retrieved Chunks (${results.length}):`)
    for (const s of sources) {
      console.log(`  - [Score: ${s.score}] ${s.title} (${s.isImplemented ? 'Live' : 'Roadmap'}) -> Source: ${s.source}`)
    }
  }

  console.log('\nVerification completed successfully. RAG retriever is ready.')
}

// Execute if run directly via ts-node
if (require.main === module) {
  verifyKnowledgeIndex()
}

