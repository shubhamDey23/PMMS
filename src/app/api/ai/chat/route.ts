import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSession } from '@/lib/auth'
import { getAIConfiguration, streamAIResponse, type ChatMessage } from '@/lib/ai/ai-provider'
import { retrieveKnowledgeChunks, formatRetrievedContext } from '@/lib/ai/rag-engine'

// In-memory rate limiting map for chat queries: max 20 requests per minute per user/IP
interface RateLimitTracker {
  count: number
  resetTime: number
}
const chatRateLimits = new Map<string, RateLimitTracker>()
const RATE_LIMIT_MAX = 20
const RATE_LIMIT_WINDOW_MS = 60 * 1000

function isRateLimited(identifier: string): boolean {
  const now = Date.now()
  const tracker = chatRateLimits.get(identifier)

  if (!tracker || tracker.resetTime < now) {
    chatRateLimits.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (tracker.count >= RATE_LIMIT_MAX) {
    return true
  }

  tracker.count++
  return false
}

// Validation schema for incoming chat requests
const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string().min(1, 'Message content cannot be empty').max(4000, 'Message exceeds 4000 characters limit'),
      })
    )
    .min(1, 'At least one message is required'),
  language: z.enum(['en', 'hi']).optional().default('en'),
})

/**
 * GET handler: Returns non-sensitive status of AI configuration
 */
export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json(
      { error: 'UNAUTHORIZED', message: 'Authentication required' },
      { status: 401 }
    )
  }

  const config = getAIConfiguration()
  return NextResponse.json({
    configured: config.configured,
    provider: config.provider,
    model: config.model,
    instructions: config.instructions,
  })
}

/**
 * POST handler: Secure, RAG-grounded streaming AI chat endpoint
 */
export async function POST(req: NextRequest) {
  // 1. Authenticate user session
  const session = await getSession()
  if (!session) {
    return NextResponse.json(
      {
        error: 'UNAUTHORIZED',
        message: 'Access restricted. Please log in to the eSapmada Admin portal.',
      },
      { status: 401 }
    )
  }

  // 2. Rate limiting check per username / client
  const clientIdentifier = session.username || 'client'
  if (isRateLimited(clientIdentifier)) {
    return NextResponse.json(
      {
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Rate limit exceeded. Please wait a moment before sending more queries.',
      },
      { status: 429 }
    )
  }

  // 3. Verify server-side AI configuration
  const config = getAIConfiguration()
  if (!config.configured) {
    return NextResponse.json(
      {
        error: 'CONFIG_ERROR',
        message:
          config.instructions ||
          'AI provider is not configured. Please define GEMINI_API_KEY in your server-side environment (.env.local).',
        provider: config.provider,
      },
      { status: 400 }
    )
  }

  // 4. Parse and validate request body
  let parsedBody: z.infer<typeof chatRequestSchema>
  try {
    const json = await req.json()
    const validationResult = chatRequestSchema.safeParse(json)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Invalid request payload',
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      )
    }
    parsedBody = validationResult.data
  } catch {
    return NextResponse.json(
      { error: 'INVALID_JSON', message: 'Failed to parse JSON body' },
      { status: 400 }
    )
  }

  const { messages, language } = parsedBody

  // 5. Extract latest user query for RAG retrieval
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
  const userQuery = lastUserMessage?.content || ''

  // 6. RAG Retrieval over eSapmada Knowledge Base
  const retrievedResults = retrieveKnowledgeChunks(userQuery, 4, language)
  const { contextText, sources } = formatRetrievedContext(retrievedResults, language)

  // 7. Stream LLM Response with attached citations
  try {
    const { stream } = await streamAIResponse({
      messages: messages as ChatMessage[],
      retrievedContextText: contextText,
      language,
    })

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Content-Type-Options': 'nosniff',
        'X-RAG-Sources': encodeURIComponent(JSON.stringify(sources)),
        'X-AI-Provider': config.provider,
        'X-AI-Model': config.model,
      },
    })
  } catch (error: any) {
    console.error('[eSapmada AI Error]:', error)
    return NextResponse.json(
      {
        error: 'GENERATION_ERROR',
        message: error?.message || 'An error occurred while generating the AI response.',
      },
      { status: 500 }
    )
  }
}

