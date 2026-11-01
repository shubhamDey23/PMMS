'use server'

import {
  checkRateLimit,
  createSession,
  destroySession,
  getAdminCredentials,
  recordFailedAttempt,
  resetFailedAttempts,
  validateSafeRedirect,
} from '@/lib/auth'

export interface LoginResult {
  success: boolean
  error?: string
  redirectUrl?: string
}

export async function loginAction(formData: {
  username?: string
  password?: string
  rememberMe?: boolean
  nextUrl?: string
}): Promise<LoginResult> {
  const username = formData.username?.trim() || ''
  const password = formData.password || ''
  const rememberMe = Boolean(formData.rememberMe)
  const nextUrl = formData.nextUrl

  // 1. Validation for empty fields
  if (!username && !password) {
    return { success: false, error: 'Username and password are required.' }
  }
  if (!username) {
    return { success: false, error: 'Username is required.' }
  }
  if (!password) {
    return { success: false, error: 'Password is required.' }
  }

  // 2. Brute-force rate limiting check
  const rateLimitKey = `user_${username.toLowerCase()}`
  const rateLimitStatus = checkRateLimit(rateLimitKey)
  if (!rateLimitStatus.allowed) {
    return {
      success: false,
      error: `Too many failed login attempts. Please wait ${rateLimitStatus.waitSeconds} seconds before trying again.`,
    }
  }

  // 3. Verify credentials
  const expected = getAdminCredentials()

  const isUsernameMatch = username === expected.username
  const isPasswordMatch = password === expected.password

  if (!isUsernameMatch || !isPasswordMatch) {
    const failStatus = recordFailedAttempt(rateLimitKey)
    if (failStatus.locked) {
      return {
        success: false,
        error: `Too many failed login attempts. Account temporarily locked for ${failStatus.waitSeconds} seconds.`,
      }
    }
    return {
      success: false,
      error: 'Invalid username or password. Please verify your credentials.',
    }
  }

  // 4. Reset failed attempts upon successful authentication
  resetFailedAttempts(rateLimitKey)

  // 5. Establish authenticated session via HTTP-only secure cookie
  await createSession(expected.username, rememberMe)

  // 6. Safe redirect destination
  const redirectUrl = validateSafeRedirect(nextUrl)

  return {
    success: true,
    redirectUrl,
  }
}

export async function logoutAction(): Promise<{ success: boolean; redirectUrl: string }> {
  await destroySession()
  return {
    success: true,
    redirectUrl: '/login',
  }
}

