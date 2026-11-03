import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export type GeminiDiagnosticStatus =
  | 'SUCCESS'
  | 'MISSING_API_KEY'
  | 'INVALID_API_KEY'
  | 'MODEL_UNAVAILABLE'
  | 'QUOTA_EXCEEDED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR'

export interface GeminiDiagnosticResult {
  status: GeminiDiagnosticStatus
  connectionStatus: 'Connected' | 'Failed'
  model: string
  promptSent: string
  response?: string
  errorCategory?: string
  errorMessage?: string
  diagnostics: {
    keyConfigured: boolean
    keyLength?: number
    provider: string
    timestamp: string
    recommendations?: string[]
  }
}

/**
 * Secure Admin Diagnostic Endpoint: Verifies Google Gemini API Configuration
 * Accessible strictly by authenticated administrators.
 */
export async function GET() {
  // 1. Strict Administrator Authentication
  const session = await getSession()
  if (!session) {
    return NextResponse.json(
      {
        error: 'UNAUTHORIZED',
        message: 'Administrator session required to access Gemini diagnostics.',
      },
      { status: 401 }
    )
  }

  // 2. Read server-side environment variables (Never expose or log the key)
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  const configuredModel = process.env.GEMINI_MODEL || 'gemini-flash-lite-latest'
  const testPrompt = 'Reply with: Gemini API connection successful.'

  // Case A: Missing API Key
  if (!apiKey || apiKey.trim().length === 0) {
    const result: GeminiDiagnosticResult = {
      status: 'MISSING_API_KEY',
      connectionStatus: 'Failed',
      model: configuredModel,
      promptSent: testPrompt,
      errorCategory: 'Environment Configuration Error',
      errorMessage:
        'GEMINI_API_KEY is not defined in server-side environment variables (.env.local).',
      diagnostics: {
        keyConfigured: false,
        provider: 'gemini',
        timestamp: new Date().toISOString(),
        recommendations: [
          'Obtain a Gemini API key from https://aistudio.google.com/apikey',
          'Add GEMINI_API_KEY=your_key to .env.local in the project root',
          'Restart your development server (npm run dev)',
        ],
      },
    }
    return NextResponse.json(result, { status: 400 })
  }

  // 3. Perform Test Request to Google Gemini API
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    configuredModel
  )}:generateContent?key=${encodeURIComponent(apiKey)}`

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 35000) // 35s timeout for high-latency networks

    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: testPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 60,
        },
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const responseBody = await apiResponse.json().catch(() => null)

    // Case B: Google API returned an error response
    if (!apiResponse.ok || responseBody?.error) {
      const httpCode = apiResponse.status
      const errorObj = responseBody?.error || {}
      const googleMessage = errorObj.message || 'Unknown API response'

      let diagnosticStatus: GeminiDiagnosticStatus = 'UNKNOWN_ERROR'
      let errorCategory = `Google API Error (${httpCode})`
      const recommendations: string[] = []

      // Check for Invalid API Key (HTTP 400 / 401 / 403 with specific tokens)
      if (
        httpCode === 400 &&
        (googleMessage.includes('API_KEY_INVALID') ||
          googleMessage.includes('API key not valid') ||
          googleMessage.includes('key expired'))
      ) {
        diagnosticStatus = 'INVALID_API_KEY'
        errorCategory = 'Invalid / Expired API Key'
        recommendations.push(
          'Check your API key in Google AI Studio (https://aistudio.google.com/apikey).',
          'Generate a new API key and paste it into .env.local as GEMINI_API_KEY.',
          'Ensure there are no leading or trailing whitespace characters around the key.'
        )
      }
      // Check for Model Unavailable / Deprecated (HTTP 404 NOT_FOUND)
      else if (
        httpCode === 404 ||
        googleMessage.includes('NOT_FOUND') ||
        googleMessage.includes('is no longer available') ||
        googleMessage.includes('not found for API version')
      ) {
        diagnosticStatus = 'MODEL_UNAVAILABLE'
        errorCategory = 'Model Unavailable or Deprecated'
        recommendations.push(
          `The configured model "${configuredModel}" is not available or is deprecated for your API key.`,
          'Update GEMINI_MODEL in .env.local to an active model such as "gemini-3.5-flash-lite" or "gemini-flash-lite-latest".',
          'Restart the server after updating .env.local.'
        )
      }
      // Check for Quota Limits or High Demand (HTTP 429 / 503)
      else if (
        httpCode === 429 ||
        httpCode === 503 ||
        googleMessage.includes('RESOURCE_EXHAUSTED') ||
        googleMessage.includes('quota') ||
        googleMessage.includes('high demand') ||
        googleMessage.includes('rate-limit')
      ) {
        diagnosticStatus = 'QUOTA_EXCEEDED'
        errorCategory = 'Rate Limit / Quota Exceeded'
        recommendations.push(
          'Free-tier quota limit reached for this specific model or temporary demand spike.',
          'Switch to a higher-capacity lite model like "gemini-3.5-flash-lite" or "gemini-flash-lite-latest".',
          'Check quota details in Google Cloud Console or Google AI Studio.'
        )
      } else {
        recommendations.push(
          `Inspect error details from Google API: ${googleMessage}`,
          'Verify project billing status or API permissions in Google Cloud Console.'
        )
      }

      const failureResult: GeminiDiagnosticResult = {
        status: diagnosticStatus,
        connectionStatus: 'Failed',
        model: configuredModel,
        promptSent: testPrompt,
        errorCategory,
        errorMessage: googleMessage,
        diagnostics: {
          keyConfigured: true,
          keyLength: apiKey.length,
          provider: 'gemini',
          timestamp: new Date().toISOString(),
          recommendations,
        },
      }

      return NextResponse.json(failureResult, { status: 200 })
    }

    // Case C: Success! Extract model response text
    const responseText =
      responseBody?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Gemini API connection successful.'

    const successResult: GeminiDiagnosticResult = {
      status: 'SUCCESS',
      connectionStatus: 'Connected',
      model: configuredModel,
      promptSent: testPrompt,
      response: responseText,
      diagnostics: {
        keyConfigured: true,
        keyLength: apiKey.length,
        provider: 'gemini',
        timestamp: new Date().toISOString(),
        recommendations: [
          'Gemini API connection is active and responding with real generative completions.',
          'The eSapmada AI Assistant is fully operational with this configuration.',
        ],
      },
    }

    return NextResponse.json(successResult, { status: 200 })
  } catch (err: any) {
    // Case D: Network / Timeout Error
    const isAbort = err?.name === 'AbortError'
    const errorMessage = isAbort
      ? 'Connection timed out after 15 seconds while reaching Google Gemini API.'
      : err?.message || 'Network connectivity error.'

    const networkResult: GeminiDiagnosticResult = {
      status: 'NETWORK_ERROR',
      connectionStatus: 'Failed',
      model: configuredModel,
      promptSent: testPrompt,
      errorCategory: 'Network / Transport Failure',
      errorMessage,
      diagnostics: {
        keyConfigured: true,
        keyLength: apiKey.length,
        provider: 'gemini',
        timestamp: new Date().toISOString(),
        recommendations: [
          'Check internet connectivity and outbound HTTPS access to generativelanguage.googleapis.com.',
          'Verify whether a firewall, corporate proxy, or VPN is blocking outbound Google API requests.',
        ],
      },
    }

    return NextResponse.json(networkResult, { status: 200 })
  }
}

