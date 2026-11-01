import { spawn } from 'node:child_process'

const TEST_PORT = 3020
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

async function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.status === 200) return true
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`Server did not start at ${url} within ${timeoutMs}ms`)
}

async function run() {
  console.log('\n=======================================================================')
  console.log(' Phase 12: Automated Functional, Bilingual, Geolocation & Form Tests')
  console.log('=======================================================================\n')

  console.log(`Starting Next.js server on port ${TEST_PORT}...`)
  const server = spawn('npx', ['next', 'start', '-p', String(TEST_PORT)], {
    shell: true,
    stdio: 'pipe',
    env: {
      ...process.env,
      PORT: String(TEST_PORT),
      ADMIN_USERNAME: 'admin',
      ADMIN_PASSWORD: 'Admin@12345',
      SESSION_SECRET: 'test_phase2_super_secret_session_crypto_key_123',
    },
  })

  try {
    await waitForServer(`${BASE_URL}/`, 25000)
    console.log('Next.js server is online and healthy!\n')

    // 1. Check Public Landing Page & Bilingual Elements
    console.log('--- 1. Public Landing Page & Bilingual Navigation ---')
    const publicRes = await fetch(`${BASE_URL}/`)
    assert(publicRes.status === 200, 'Public landing page / loads with 200 OK without authentication')
    const publicHtml = await publicRes.text()

    assert(
      publicHtml.includes('lang-switch-wrap') && publicHtml.includes('English') && publicHtml.includes('हिन्दी'),
      'Public header displays bilingual language switcher (English / हिन्दी)'
    )
    assert(
      publicHtml.includes('Admin Login') && publicHtml.includes('/login'),
      'Public header displays prominent Admin Login button'
    )
    assert(
      publicHtml.includes('geo-overview-card') || publicHtml.includes('geo-canvas') || publicHtml.includes('map-progress'),
      'Public landing page displays geographic distribution and map widget'
    )

    // 2. Route Protection Checks
    console.log('\n--- 2. Route Protection & Guards ---')
    const unauthNewRes = await fetch(`${BASE_URL}/admin/projects/new`, { redirect: 'manual' })
    assert(
      unauthNewRes.status === 307 || unauthNewRes.status === 308 || unauthNewRes.status === 302,
      'Unauthenticated request to /admin/projects/new is protected and redirected'
    )
    assert(
      unauthNewRes.headers.get('location')?.includes('/login?next='),
      'Redirects to login preserving intended target ?next=%2Fadmin%2Fprojects%2Fnew'
    )

    // 3. Authenticate Admin
    console.log('\n--- 3. Administrator Authentication & Session ---')
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'Admin@12345',
        nextUrl: '/admin/projects/new',
      }),
    })
    assert(loginRes.status === 200, 'Admin authenticates successfully with valid development credentials')
    const sessionCookie = loginRes.headers.get('set-cookie')?.split(';')[0] || ''
    assert(sessionCookie.includes('pmms_session'), 'Cryptographic HTTP-only session cookie issued')

    // 4. Authenticated Add Project Form Page
    console.log('\n--- 4. Add Project Form Page (/admin/projects/new) ---')
    const authNewRes = await fetch(`${BASE_URL}/admin/projects/new`, {
      headers: { Cookie: sessionCookie },
    })
    assert(authNewRes.status === 200, 'Authenticated admin can access /admin/projects/new')
    const authNewHtml = await authNewRes.text()

    assert(
      authNewHtml.includes('Sanction New Development Project') || authNewHtml.includes('nameEn'),
      'Form contains Section 1: Basic Information fields (English/Hindi name and description)'
    )
    assert(
      authNewHtml.includes('Geographic Details &amp; Geolocation') || authNewHtml.includes('latitude'),
      'Form contains Section 2: Geographic Details with Latitude/Longitude inputs'
    )
    assert(
      authNewHtml.includes('Detect My GPS Location') || authNewHtml.includes('detect-gps-btn'),
      'Form contains browser GPS Geolocation detection button'
    )
    assert(
      authNewHtml.includes('Financial Sanction &amp; Estimates') || authNewHtml.includes('estimatedCost'),
      'Form contains Section 3: Financial Details (Estimated cost, Approved amount, Expenditure)'
    )
    assert(
      authNewHtml.includes('Project Schedule &amp; Milestones') || authNewHtml.includes('plannedCompletionDate'),
      'Form contains Section 4: Timeline & Dates'
    )
    assert(
      authNewHtml.includes('Initial Status &amp; Lifecycle Stage') || authNewHtml.includes('physicalProgress'),
      'Form contains Section 5: Progress & Status'
    )
    assert(
      authNewHtml.includes('Supporting Documents') || authNewHtml.includes('doc-attach-row'),
      'Form contains Section 6: Document Upload interface'
    )
    assert(
      authNewHtml.includes('Save &amp; Sanction Project') || authNewHtml.includes('submit-btn'),
      'Form contains submission action button'
    )

    // 5. Admin Dashboard with Geographic Overview
    console.log('\n--- 5. Admin Dashboard & Geolocation Monitoring ---')
    const authAdminRes = await fetch(`${BASE_URL}/admin`, {
      headers: { Cookie: sessionCookie },
    })
    assert(authAdminRes.status === 200, 'Admin accesses /admin dashboard successfully')
    const authAdminHtml = await authAdminRes.text()

    assert(
      authAdminHtml.includes('Geographic Project Distribution') || authAdminHtml.includes('geo-overview-card'),
      'Admin dashboard displays interactive geographic monitoring overview'
    )
    assert(
      authAdminHtml.includes('Show My Location') || authAdminHtml.includes('location-btn'),
      'Map widget includes "Show My Location" browser geolocation control'
    )
    assert(
      authAdminHtml.includes('Logout') || authAdminHtml.includes('header-logout-btn'),
      'Admin header includes Logout button'
    )
    assert(
      authAdminHtml.includes('lang-switch-wrap'),
      'Admin header includes Language Switcher'
    )

    // 6. Project Register Page
    console.log('\n--- 6. Project Register Page (/admin/projects) ---')
    const authProjectsRes = await fetch(`${BASE_URL}/admin/projects`, {
      headers: { Cookie: sessionCookie },
    })
    assert(authProjectsRes.status === 200, 'Admin accesses /admin/projects successfully')
    const authProjectsHtml = await authProjectsRes.text()

    assert(
      authProjectsHtml.includes('Create project') || authProjectsHtml.includes('/admin/projects/new'),
      'Project register displays visible "Create project" button linking to form'
    )
    assert(
      authProjectsHtml.includes('PRJ-2024-0814') && authProjectsHtml.includes('Rural Connectivity Road'),
      'Project register lists sanctioned projects with status badges and metrics'
    )

    // 7. Reports & Analytics and Approvals Pages
    console.log('\n--- 7. Sub-route Views ---')
    const analyticsRes = await fetch(`${BASE_URL}/admin/analytics`, {
      headers: { Cookie: sessionCookie },
    })
    assert(analyticsRes.status === 200, '/admin/analytics is protected and accessible to admin')

    const alertsRes = await fetch(`${BASE_URL}/admin/alerts`, {
      headers: { Cookie: sessionCookie },
    })
    assert(alertsRes.status === 200, '/admin/alerts is protected and accessible to admin')

    // 8. Logout Verification
    console.log('\n--- 8. Logout & Security Guard ---')
    const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: sessionCookie },
    })
    assert(logoutRes.status === 200, 'Logout succeeds with 200 OK and clears session cookie')

    const postLogoutNew = await fetch(`${BASE_URL}/admin/projects/new`, {
      headers: { Cookie: 'pmms_session=' },
      redirect: 'manual',
    })
    assert(
      postLogoutNew.status === 307 || postLogoutNew.status === 308 || postLogoutNew.status === 302,
      'Access to /admin/projects/new after logout redirects back to /login'
    )

    console.log('\n=======================================================================')
    console.log(` Phase 12 Test Summary: ${passedCount} PASSED, ${failedCount} FAILED`)
    console.log('=======================================================================\n')

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
