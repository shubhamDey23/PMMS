import { spawn } from 'node:child_process'
import http from 'node:http'

const TEST_PORT = 3012
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`

let passedCount = 0
let failedCount = 0

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  [PASS] ${testName}`)
    passedCount++
  } else {
    console.error(`  [FAIL] ${testName}${details ? ` - ${details}` : ''}`)
    failedCount++
  }
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.status === 200) return true
    } catch {
      // Wait a bit
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`Server did not start at ${url} within ${timeoutMs}ms`)
}

async function run() {
  console.log('\n======================================================')
  console.log(' Starting PMMS Automated End-to-End Functional Tests')
  console.log('======================================================\n')

  console.log(`Starting Next.js server on port ${TEST_PORT}...`)
  const server = spawn('npx', ['next', 'start', '-p', String(TEST_PORT)], {
    shell: true,
    stdio: 'pipe',
    env: {
      ...process.env,
      PORT: String(TEST_PORT),
      ADMIN_USERNAME: 'admin',
      ADMIN_PASSWORD: 'Admin@12345',
      SESSION_SECRET: 'test_crypto_secret_key_long_enough_min_32_characters_123',
    },
  })

  server.stdout?.on('data', (d) => {
    // console.log(`[Next.js]: ${d}`)
  })
  server.stderr?.on('data', (d) => {
    // console.error(`[Next.js Err]: ${d}`)
  })

  try {
    await waitForServer(`${BASE_URL}/`, 25000)
    console.log('Server is running and healthy!\n')

    // 1. Scenario A: Public Landing Page
    console.log('Scenario A & J: Public Landing Page Accessibility')
    const landingRes = await fetch(`${BASE_URL}/`)
    assert(landingRes.status === 200, 'Public landing page / returns 200 OK without authentication')
    const landingHtml = await landingRes.text()
    assert(
      landingHtml.includes('Project Monitoring &amp; Management') ||
      landingHtml.includes('Transparent development') ||
      landingHtml.includes('See how public projects are'),
      'Landing page renders public dashboard content'
    )
    assert(
      landingHtml.includes('/login') && landingHtml.includes('Admin Login'),
      'Landing page header has clearly visible Admin Login button link'
    )
    assert(
      !landingHtml.includes('Return to admin portal'),
      'Public version removed the old internal admin return button'
    )

    // 2. Scenario B: Admin Login Page
    console.log('\nScenario B: Admin Login Page')
    const loginRes = await fetch(`${BASE_URL}/login`)
    assert(loginRes.status === 200, 'Login page /login returns 200 OK')
    const loginHtml = await loginRes.text()
    assert(
      loginHtml.includes('Admin Login') &&
      loginHtml.includes('Username') &&
      loginHtml.includes('Password'),
      'Login page includes Admin Login heading, username and password fields'
    )

    // 3. Scenario E: Empty field validation
    console.log('\nScenario E: Empty Field Validation')
    const emptyRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: '', password: '' }),
    })
    assert(emptyRes.status === 401, 'Empty credentials rejected with 401')
    const emptyData = await emptyRes.json()
    assert(
      emptyData.success === false && typeof emptyData.error === 'string',
      'Returns validation error message for empty fields'
    )

    // 4. Scenario D: Invalid Login Credentials
    console.log('\nScenario D: Invalid Credentials')
    const invalidRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'WrongPassword!123' }),
    })
    assert(invalidRes.status === 401, 'Invalid password rejected with 401')
    const invalidData = await invalidRes.json()
    assert(
      invalidData.success === false,
      'Invalid password does not grant access'
    )
    const invalidCookies = invalidRes.headers.get('set-cookie')
    assert(
      !invalidCookies || !invalidCookies.includes('pmms_session'),
      'No session cookie set on invalid login attempt'
    )

    // 5. Scenario E & G: Unauthenticated access to protected admin routes
    console.log('\nScenario E & G: Protected Route Guards')
    const adminUnauth = await fetch(`${BASE_URL}/admin`, { redirect: 'manual' })
    assert(
      adminUnauth.status === 307 || adminUnauth.status === 308 || adminUnauth.status === 302,
      'Unauthenticated request to /admin redirected',
      `Status: ${adminUnauth.status}`
    )
    const adminRedirectLoc = adminUnauth.headers.get('location') || ''
    assert(
      adminRedirectLoc.includes('/login?next='),
      'Redirects unauthenticated user to /login?next=%2Fadmin',
      `Location: ${adminRedirectLoc}`
    )

    const projectsUnauth = await fetch(`${BASE_URL}/admin/projects`, { redirect: 'manual' })
    const projectsRedirectLoc = projectsUnauth.headers.get('location') || ''
    assert(
      projectsRedirectLoc.includes('/login?next=') && projectsRedirectLoc.includes('projects'),
      'Redirects unauthenticated deep link /admin/projects to /login?next=%2Fadmin%2Fprojects',
      `Location: ${projectsRedirectLoc}`
    )

    // 6. Scenario C: Successful Login with Default Admin Credentials
    console.log('\nScenario C: Successful Login & Session Creation')
    const loginSuccessRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'Admin@12345',
        rememberMe: true,
        nextUrl: '/admin/projects',
      }),
    })
    assert(loginSuccessRes.status === 200, 'Valid credentials authenticate with 200 OK')
    const loginSuccessData = await loginSuccessRes.json()
    assert(
      loginSuccessData.success === true,
      'Authentication result success is true'
    )
    assert(
      loginSuccessData.redirectUrl === '/admin/projects',
      'Redirect URL preserves the safe deep link /admin/projects'
    )

    const setCookieHeader = loginSuccessRes.headers.get('set-cookie') || ''
    assert(
      setCookieHeader.includes('pmms_session='),
      'Response sets pmms_session HTTP cookie'
    )
    assert(
      setCookieHeader.toLowerCase().includes('httponly'),
      'Session cookie has HttpOnly flag set'
    )
    assert(
      setCookieHeader.toLowerCase().includes('samesite=lax'),
      'Session cookie has SameSite=Lax flag set'
    )

    // Extract cookie
    const sessionCookie = setCookieHeader.split(';')[0]

    // 7. Scenario F: Authenticated Access & Refresh
    console.log('\nScenario F & Scenario H: Authenticated Access to Protected Routes')
    const authAdminRes = await fetch(`${BASE_URL}/admin`, {
      headers: { Cookie: sessionCookie },
    })
    assert(authAdminRes.status === 200, 'Authenticated request to /admin succeeds with 200 OK')
    const adminHtml = await authAdminRes.text()
    assert(
      adminHtml.includes('Project Dashboard &amp; Monitoring') ||
      adminHtml.includes('Executive overview'),
      'Admin dashboard renders administrative content'
    )
    assert(
      adminHtml.includes('Logout') || adminHtml.includes('Sign Out'),
      'Admin dashboard displays Logout option'
    )

    const authProjectsRes = await fetch(`${BASE_URL}/admin/projects`, {
      headers: { Cookie: sessionCookie },
    })
    assert(authProjectsRes.status === 200, 'Authenticated request to /admin/projects succeeds with 200 OK')

    const authAnalyticsRes = await fetch(`${BASE_URL}/admin/analytics`, {
      headers: { Cookie: sessionCookie },
    })
    assert(authAnalyticsRes.status === 200, 'Authenticated request to /admin/analytics succeeds with 200 OK')

    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: sessionCookie },
    })
    const meData = await meRes.json()
    assert(
      meData.authenticated === true && meData.user.username === 'admin',
      'Session API verifies active administrator identity'
    )

    // 8. Authenticated user visiting /login gets redirected to /admin
    console.log('\nAuthenticated user navigating to /login')
    const loginWhenAuth = await fetch(`${BASE_URL}/login`, {
      headers: { Cookie: sessionCookie },
      redirect: 'manual',
    })
    assert(
      loginWhenAuth.status === 307 || loginWhenAuth.status === 308 || loginWhenAuth.status === 302,
      'Already authenticated user visiting /login is redirected'
    )
    assert(
      loginWhenAuth.headers.get('location')?.includes('/admin'),
      'Redirect destination is /admin'
    )

    // 9. Tampered Session Cookie Protection
    console.log('\nTampered Session Token Security')
    const tamperedRes = await fetch(`${BASE_URL}/admin`, {
      headers: { Cookie: 'pmms_session=fake_invalid_token.tampered_signature' },
      redirect: 'manual',
    })
    assert(
      tamperedRes.status === 307 || tamperedRes.status === 308 || tamperedRes.status === 302,
      'Tampered session cookie is rejected and redirects to /login'
    )

    // 10. Scenario H: Logout Flow
    console.log('\nScenario H: Logout Flow')
    const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: sessionCookie },
    })
    assert(logoutRes.status === 200, 'Logout request succeeds with 200 OK')
    const logoutCookies = logoutRes.headers.get('set-cookie') || ''
    assert(
      logoutCookies.includes('pmms_session=;') ||
      logoutCookies.includes('Max-Age=0') ||
      logoutCookies.includes('Expires='),
      'Logout invalidates and clears the session cookie'
    )

    // Try to access /admin after logout
    const postLogoutAdmin = await fetch(`${BASE_URL}/admin`, {
      headers: { Cookie: 'pmms_session=' },
      redirect: 'manual',
    })
    assert(
      postLogoutAdmin.status === 307 || postLogoutAdmin.status === 308 || postLogoutAdmin.status === 302,
      'Accessing /admin after logout redirects back to /login'
    )

    // Public dashboard still accessible
    const postLogoutPublic = await fetch(`${BASE_URL}/`)
    assert(postLogoutPublic.status === 200, 'Public landing page remains fully accessible after logout')

    console.log('\n======================================================')
    console.log(` Test Summary: ${passedCount} PASSED, ${failedCount} FAILED`)
    console.log('======================================================\n')

    if (failedCount > 0) {
      process.exit(1)
    }
  } finally {
    console.log('Shutting down test server...')
    server.kill()
    try {
      process.kill(-server.pid)
    } catch {}
  }
}

run().catch((err) => {
  console.error('Test execution failed:', err)
  process.exit(1)
})

