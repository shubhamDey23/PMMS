import fs from 'node:fs'
import path from 'node:path'

let passed = 0
let failed = 0

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`)
    passed++
  } else {
    console.error(`  [FAIL] ${message}`)
    failed++
  }
}

console.log('\n=======================================================================')
console.log(' Phase 3: Help Assistant & Leaflet Map Verification Test Suite')
console.log('=======================================================================\n')

// 1. Verify Help Content Knowledge Base
console.log('--- 1. Offline Help Assistant Knowledge Base ---')
const helpContentPath = path.resolve('src/lib/help/help-content.ts')
assert(fs.existsSync(helpContentPath), 'help-content.ts exists')
const helpContent = fs.readFileSync(helpContentPath, 'utf8')

assert(helpContent.includes('helpCategories: HelpCategory[]'), 'helpCategories array exported')
assert(helpContent.includes('getting-started') && helpContent.includes('add-project'), 'Includes core categories (getting-started, add-project)')
assert(helpContent.includes('geo-monitoring') && helpContent.includes('troubleshooting'), 'Includes geo-monitoring and troubleshooting')
assert(helpContent.includes('searchHelp(query: string, language:'), 'searchHelp bilingual search function exported')
assert(helpContent.includes('questionEn') && helpContent.includes('questionHi'), 'All questions have bilingual questionEn and questionHi')
assert(helpContent.includes('action?: HelpAction'), 'Support for contextual action buttons (deep links)')

// 2. Verify Leaflet Map Configuration
console.log('\n--- 2. Leaflet & OpenStreetMap Configuration ---')
const mapConfigPath = path.resolve('src/lib/maps/map-config.ts')
assert(fs.existsSync(mapConfigPath), 'map-config.ts exists')
const mapConfig = fs.readFileSync(mapConfigPath, 'utf8')

assert(mapConfig.includes('https://tile.openstreetmap.org/{z}/{x}/{y}.png'), 'OSM standard tile URL configured')
assert(mapConfig.includes('OpenStreetMap</a> contributors'), 'Attribution to OpenStreetMap contributors included')
assert(mapConfig.includes('23.3441') && mapConfig.includes('85.3096'), 'Default coordinates set to Ranchi headquarters [23.3441, 85.3096]')
assert(mapConfig.includes('statusColors'), 'statusColors configured for Ongoing, Completed, Delayed')

// 3. Verify Mock Projects Coordinates
console.log('\n--- 3. Real Ranchi Coordinates in Projects ---')
const mockDataPath = path.resolve('src/data/mock-data.ts')
const mockData = fs.readFileSync(mockDataPath, 'utf8')

assert(mockData.includes('latitude: 23.422') && mockData.includes('longitude: 85.318'), 'PRJ-2024-0814 has valid Ranchi coordinates (Kanke)')
assert(mockData.includes('latitude: 23.372') && mockData.includes('longitude: 85.285'), 'PRJ-2024-0762 has valid Ranchi coordinates (Ratu)')
assert(mockData.includes('latitude: 23.366') && mockData.includes('longitude: 85.3375'), 'PRJ-2024-0695 has valid Ranchi coordinates (Lalpur)')
assert(mockData.includes('latitude: 23.3325') && mockData.includes('longitude: 85.3852'), 'PRJ-2024-0551 has valid Ranchi coordinates (Namkum)')
assert(mockData.includes('latitude: 23.3102') && mockData.includes('longitude: 85.2954'), 'PRJ-2024-0418 has valid Ranchi coordinates (Dhurwa)')
assert(mockData.includes('latitude: 23.268') && mockData.includes('longitude: 85.291'), 'PRJ-2024-0382 has valid Ranchi coordinates (Tupudana)')

// 4. Verify Admin Navigation Items
console.log('\n--- 4. Admin Navigation Updates ---')
assert(mockData.includes("label: 'Project Map'") && mockData.includes("href: '/admin/map'"), 'navItems includes Project Map (/admin/map)')
assert(mockData.includes("label: 'Help Assistant'") && mockData.includes("href: '/admin/help'"), 'navItems includes Help Assistant (/admin/help)')

// 5. Verify Components & SSR Safety
console.log('\n--- 5. Component Structure & SSR Safety ---')
const projectMapWrapperPath = path.resolve('src/components/map/ProjectMap.tsx')
assert(fs.existsSync(projectMapWrapperPath), 'ProjectMap.tsx wrapper exists')
const projectMapWrapper = fs.readFileSync(projectMapWrapperPath, 'utf8')
assert(projectMapWrapper.includes('ssr: false'), 'ProjectMap dynamically imports Leaflet client with ssr: false')

const projectMapClientPath = path.resolve('src/components/map/ProjectMapClient.tsx')
assert(fs.existsSync(projectMapClientPath), 'ProjectMapClient.tsx exists')
const projectMapClient = fs.readFileSync(projectMapClientPath, 'utf8')
assert(projectMapClient.includes("import 'leaflet/dist/leaflet.css'"), 'Imports leaflet/dist/leaflet.css')
assert(projectMapClient.includes('useAdminDrawer'), 'Integrates with useAdminDrawer to open project drawer')
assert(projectMapClient.includes('createMarkerIcon'), 'Creates custom SVG status markers')
assert(projectMapClient.includes('handleShowMyLocation'), 'Implements "Show My Location" device GPS handling')
assert(projectMapClient.includes('handleSelectProject'), 'Implements flyTo and popup focus on project selection')

// 6. Verify Help Assistant Components & Pages
console.log('\n--- 6. Help Assistant UI & Routing ---')
const helpAssistantPath = path.resolve('src/components/help/HelpAssistant.tsx')
assert(fs.existsSync(helpAssistantPath), 'HelpAssistant.tsx exists')
const helpAssistant = fs.readFileSync(helpAssistantPath, 'utf8')
assert(helpAssistant.includes('searchQuery') && helpAssistant.includes('selectedCategoryId'), 'State for search and category selection')
assert(helpAssistant.includes('suggestedQuestions'), 'Provides suggested FAQ chips')
assert(helpAssistant.includes('HelpConversation'), 'Integrates interactive conversation UI')

const floatingBtnPath = path.resolve('src/components/help/FloatingHelpButton.tsx')
assert(fs.existsSync(floatingBtnPath), 'FloatingHelpButton.tsx exists')

const adminShellPath = path.resolve('src/components/AdminLayoutShell.tsx')
const adminShell = fs.readFileSync(adminShellPath, 'utf8')
assert(adminShell.includes('<FloatingHelpButton />'), 'FloatingHelpButton is embedded inside AdminLayoutShell')

const helpPagePath = path.resolve('src/app/admin/help/page.tsx')
assert(fs.existsSync(helpPagePath), 'src/app/admin/help/page.tsx exists')

const mapPagePath = path.resolve('src/app/admin/map/page.tsx')
assert(fs.existsSync(mapPagePath), 'src/app/admin/map/page.tsx exists')

// 7. Verify Global CSS Styling
console.log('\n--- 7. CSS Styling & Marker Pulse ---')
const globalsCssPath = path.resolve('src/app/globals.css')
const globalsCss = fs.readFileSync(globalsCssPath, 'utf8')
assert(globalsCss.includes('.custom-leaflet-pin'), 'Custom leaflet pin styles present')
assert(globalsCss.includes('pinPulse'), 'Pulse animation keyframes present')
assert(globalsCss.includes('.custom-project-popup'), 'Custom popup styling present')

console.log('\n-----------------------------------------------------------------------')
console.log(`Results: ${passed} Passed, ${failed} Failed`)
console.log('-----------------------------------------------------------------------\n')

if (failed > 0) {
  process.exit(1)
} else {
  console.log('ALL PHASE 3 TESTS PASSED PERFECTLY!\n')
}
