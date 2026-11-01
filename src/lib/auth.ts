import { cookies } from 'next/headers'

export const SESSION_COOKIE_NAME = 'pmms_session'

export interface SessionPayload {
  username: string
  role: 'admin'
  iat: number
  exp: number
}

// In-memory brute force protection for login attempts
interface RateLimitEntry {
  count: number
  lockedUntil: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 60 * 1000 // 60 seconds
const WINDOW_DURATION_MS = 5 * 60 * 1000 // 5 minutes

export function checkRateLimit(identifier: string): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  if (!entry) {
    return { allowed: true }
  }

  if (entry.lockedUntil > now) {
    const waitSeconds = Math.ceil((entry.lockedUntil - now) / 1000)
    return { allowed: false, waitSeconds }
  }

  // If lockout expired or older than window, reset
  if (entry.lockedUntil <= now && entry.count >= MAX_ATTEMPTS) {
    rateLimitStore.delete(identifier)
    return { allowed: true }
  }

  return { allowed: true }
}

export function recordFailedAttempt(identifier: string): { locked: boolean; waitSeconds?: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier) || { count: 0, lockedUntil: 0 }

  entry.count += 1

  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_DURATION_MS
    rateLimitStore.set(identifier, entry)
    return { locked: true, waitSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000) }
  }

  rateLimitStore.set(identifier, entry)
  return { locked: false }
}

export function resetFailedAttempts(identifier: string): void {
  rateLimitStore.delete(identifier)
}

function getSecretKey(): string {
  const secret = process.env.SESSION_SECRET
  if (secret && secret.length >= 16) {
    return secret
  }
  // Strong default fallback for local development if not configured in .env.local
  return 'pmms_gov_secure_session_secret_key_development_32_chars_min'
}

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345'
  return { username, password }
}

// Web Crypto HMAC helpers compatible with Node.js and Edge runtimes
function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(base64url: string): string {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToArrayBuffer(base64url: string): ArrayBuffer {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  const secret = getSecretKey()
  const key = await getCryptoKey(secret)
  const payloadString = JSON.stringify(payload)
  const payloadBase64 = base64UrlEncode(payloadString)
  const data = new TextEncoder().encode(payloadBase64)
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, data)
  const signatureBase64 = arrayBufferToBase64Url(signatureBuffer)
  return `${payloadBase64}.${signatureBase64}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token || typeof token !== 'string') return null

  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [payloadBase64, signatureBase64] = parts

  try {
    const secret = getSecretKey()
    const key = await getCryptoKey(secret)
    const signatureBuffer = base64UrlToArrayBuffer(signatureBase64)
    const data = new TextEncoder().encode(payloadBase64)

    const isValid = await crypto.subtle.verify('HMAC', key, signatureBuffer, data)
    if (!isValid) return null

    const payloadJson = base64UrlDecode(payloadBase64)
    const payload = JSON.parse(payloadJson) as SessionPayload

    if (!payload || !payload.exp || payload.exp < Date.now()) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return verifySessionToken(token)
}

export function validateSafeRedirect(target?: string | null): string {
  if (!target || typeof target !== 'string') {
    return '/admin'
  }

  // Must begin with '/' and not '//' or '/\'
  if (!target.startsWith('/') || target.startsWith('//') || target.startsWith('/\\')) {
    return '/admin'
  }

  // Only allow admin internal routes
  if (!target.startsWith('/admin')) {
    return '/admin'
  }

  return target
}

export async function createSession(username: string, rememberMe: boolean = false): Promise<string> {
  const now = Date.now()
  // 30 days if remember me, otherwise 24 hours
  const durationMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
  const expiresAt = now + durationMs

  const payload: SessionPayload = {
    username,
    role: 'admin',
    iat: now,
    exp: expiresAt,
  }

  const token = await signSessionToken(payload)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: Math.floor(durationMs / 1000),
  })

  return token
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

