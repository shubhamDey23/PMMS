import http from 'http'
import crypto from 'crypto'

// Create valid session cookie using same secret as auth.ts
const SESSION_COOKIE_NAME = 'pmms_session'
const SESSION_SECRET = 'pmms-secret-key-change-in-production-2024'

function sign(value) {
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('hex')
  return `${value}.${signature}`
}

const sessionData = JSON.stringify({
  username: 'admin',
  role: 'superadmin',
  loginTime: Date.now(),
})

const cookieValue = `${SESSION_COOKIE_NAME}=${sign(Buffer.from(sessionData).toString('base64'))}`

async function fetchRoute(path, cookie = null) {
  return new Promise((resolve, reject) => {
    const headers = {}
    if (cookie) {
      headers['Cookie'] = cookie
    }

    const req = http.get(
      {
        host: 'localhost',
        port: 3000,
        path,
        headers,
      },
      (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            location: res.headers.location,
            bodyLength: data.length,
            contentType: res.headers['content-type'],
            hasHelpAssistant: data.includes('Help Assistant') || data.includes('How can we help you'),
            hasMap: data.includes('Project Geographic Map') || data.includes('Interactive Project Map'),
          })
        })
      }
    )
    req.on('error', reject)
  })
}

async function run() {
  console.log('--- Testing Unauthenticated Access ---')
  const unauthHelp = await fetchRoute('/admin/help')
  console.log('/admin/help unauthenticated ->', unauthHelp.statusCode, 'redirect to:', unauthHelp.location)
  const unauthMap = await fetchRoute('/admin/map')
  console.log('/admin/map unauthenticated ->', unauthMap.statusCode, 'redirect to:', unauthMap.location)

  console.log('\n--- Testing Authenticated Access ---')
  const authHelp = await fetchRoute('/admin/help', cookieValue)
  console.log('/admin/help authenticated ->', authHelp.statusCode, 'bytes:', authHelp.bodyLength, 'found keywords:', authHelp.hasHelpAssistant)

  const authMap = await fetchRoute('/admin/map', cookieValue)
  console.log('/admin/map authenticated ->', authMap.statusCode, 'bytes:', authMap.bodyLength, 'found keywords:', authMap.hasMap)

  if (authHelp.statusCode === 200 && authMap.statusCode === 200) {
    console.log('\nSUCCESS: Both /admin/help and /admin/map compiled and rendered with HTTP 200 OK!')
  } else {
    console.error('\nFAILURE: Unexpected status code!')
    process.exit(1)
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})

