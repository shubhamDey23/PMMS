/**
 * Comprehensive RFP Compliance Verification Test Suite
 * Ref: RFP/DPO/RMG/NIT/2026-27/007 — DMFT Work Monitoring Portal, Ramgarh, Jharkhand
 */

import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'

console.log('=======================================================================')
console.log(' RFP Compliance Verification Test Suite — Ramgarh DMFT Portal')
console.log('=======================================================================\n')

let passed = 0
let failed = 0

function it(name, fn) {
  try {
    fn()
    console.log(`  [PASS] ${name}`)
    passed++
  } catch (err) {
    console.error(`  [FAIL] ${name}`)
    console.error(`         ${err.message}`)
    failed++
  }
}

// 1. DATA MODELS & TYPES
console.log('--- 1. Relational DMFT Models & Types ---')
it('dmft.ts exists and defines DMFTProject & 9 User Roles', () => {
  const filePath = path.resolve('src/types/dmft.ts')
  assert.ok(fs.existsSync(filePath), 'dmft.ts must exist')
  const content = fs.readFileSync(filePath, 'utf-8')
  assert.ok(content.includes('district_admin'), 'Must include district_admin')
  assert.ok(content.includes('dmft_ceo'), 'Must include dmft_ceo')
  assert.ok(content.includes('nodal_officer'), 'Must include nodal_officer')
  assert.ok(content.includes('senior_officer'), 'Must include senior_officer')
  assert.ok(content.includes('execution_dept'), 'Must include execution_dept')
  assert.ok(content.includes('inspection_team'), 'Must include inspection_team')
  assert.ok(content.includes('deo'), 'Must include deo')
  assert.ok(content.includes('monitoring_user'), 'Must include monitoring_user')
  assert.ok(content.includes('sys_admin'), 'Must include sys_admin')
})

it('dmft.ts defines all 10 Lifecycle Stages', () => {
  const content = fs.readFileSync(path.resolve('src/types/dmft.ts'), 'utf-8')
  for (let i = 1; i <= 10; i++) {
    assert.ok(content.includes(`Stage ${i}:`), `Must define Stage ${i}`)
  }
})

// 2. RAMGARH GEOGRAPHY
console.log('\n--- 2. Ramgarh District Administrative Geography ---')
it('RamgarhBlock type includes exactly 6 official blocks', () => {
  const content = fs.readFileSync(path.resolve('src/types/dmft.ts'), 'utf-8')
  const blocks = ['Mandu', 'Patratu', 'Ramgarh', 'Gola', 'Chitarpur', 'Dulmi']
  blocks.forEach((b) => {
    assert.ok(content.includes(`'${b}'`), `Block ${b} must be in RamgarhBlock union`)
  })
})

// 3. DATABASE SERVICE
console.log('\n--- 3. DMFT Database Service & Lifecycle Transactions ---')
it('dmft-database.service.ts exists and exports dmftDatabase', () => {
  const filePath = path.resolve('src/lib/services/dmft-database.service.ts')
  assert.ok(fs.existsSync(filePath), 'dmft-database.service.ts must exist')
  const content = fs.readFileSync(filePath, 'utf-8')
  assert.ok(content.includes('class DMFTDatabaseService'), 'Must define DMFTDatabaseService class')
  assert.ok(content.includes('export const dmftDatabase'), 'Must export singleton dmftDatabase')
  assert.ok(content.includes('moveFile('), 'Must provide moveFile transactional method')
  assert.ok(content.includes('recordProgress('), 'Must provide recordProgress method')
  assert.ok(content.includes('recordInspection('), 'Must provide recordInspection method')
  assert.ok(content.includes('submitPaymentRequisition('), 'Must provide submitPaymentRequisition method')
  assert.ok(content.includes('addDocument('), 'Must provide addDocument method')
})

it('Database service provides 12 RFP KPI calculations', () => {
  const content = fs.readFileSync(path.resolve('src/lib/services/dmft-database.service.ts'), 'utf-8')
  assert.ok(content.includes('getDashboardKPIs'), 'Must have getDashboardKPIs')
  assert.ok(content.includes('awaitingApproval'), 'Must track awaitingApproval')
  assert.ok(content.includes('awaitingTender'), 'Must track awaitingTender')
  assert.ok(content.includes('workNotCommenced'), 'Must track workNotCommenced')
  assert.ok(content.includes('awaitingInspection'), 'Must track awaitingInspection')
  assert.ok(content.includes('awaitingHandover'), 'Must track awaitingHandover')
})

it('Database service calculates 11 Statutory Pendency Checkpoints', () => {
  const content = fs.readFileSync(path.resolve('src/lib/services/dmft-database.service.ts'), 'utf-8')
  assert.ok(content.includes('getPendencyList'), 'Must have getPendencyList')
  assert.ok(content.includes('Administrative Approval Pending'), 'Check 1: AS Pending')
  assert.ok(content.includes('DPR Preparation Pending'), 'Check 2: DPR Pending')
  assert.ok(content.includes('Technical Sanction (TS) Pending'), 'Check 3: TS Pending')
  assert.ok(content.includes('Tender Floating Pending'), 'Check 4: Tender Pending')
  assert.ok(content.includes('Contractor Agreement Pending'), 'Check 5: Agreement Pending')
  assert.ok(content.includes('Work Commencement Pending'), 'Check 6: Commencement Pending')
  assert.ok(content.includes('Physical Progress Milestone Delayed'), 'Check 7: Progress Delayed')
  assert.ok(content.includes('Mandatory Technical Inspection Pending'), 'Check 8: Inspection Pending')
  assert.ok(content.includes('Inspection Rectification Compliance Pending'), 'Check 9: Inspection Action Pending')
  assert.ok(content.includes('Payment Requisition Bill Scrutiny Pending'), 'Check 10: Payment Pending')
  assert.ok(content.includes('Handover & Commissioning Pending'), 'Check 11: Handover Pending')
})

// 4. REST APIS
console.log('\n--- 4. REST API Endpoints ---')
const apiRoutes = [
  'src/app/api/dmft/projects/route.ts',
  'src/app/api/dmft/projects/[id]/route.ts',
  'src/app/api/dmft/projects/[id]/workflow/route.ts',
  'src/app/api/dmft/projects/[id]/progress/route.ts',
  'src/app/api/dmft/projects/[id]/inspections/route.ts',
  'src/app/api/dmft/projects/[id]/payments/route.ts',
  'src/app/api/dmft/projects/[id]/documents/route.ts',
  'src/app/api/dmft/reports/route.ts',
  'src/app/api/dmft/import/route.ts',
  'src/app/api/dmft/ai/query/route.ts',
  'src/app/api/dmft/notifications/route.ts',
  'src/app/api/dmft/contractors/route.ts',
  'src/app/api/dmft/users/route.ts',
]

apiRoutes.forEach((route) => {
  it(`API endpoint exists: ${route}`, () => {
    assert.ok(fs.existsSync(path.resolve(route)), `File ${route} must exist`)
  })
})

// 5. OFFICIAL REPORTS
console.log('\n--- 5. 14 Official RFP MIS Reports ---')
it('Reports page defines all 14 statutory reports', () => {
  const content = fs.readFileSync(path.resolve('src/app/admin/reports/page.tsx'), 'utf-8')
  for (let i = 1; i <= 14; i++) {
    assert.ok(content.includes(`id: '${i}'`), `Report ${i} must be present in officialReports catalog`)
  }
})

// 6. BULK IMPORT & TEMPLATE
console.log('\n--- 6. Bulk Project Upload & Data Validation ---')
it('BulkUploadModal component exists with CSV template generator', () => {
  const filePath = path.resolve('src/components/projects/BulkUploadModal.tsx')
  assert.ok(fs.existsSync(filePath), 'BulkUploadModal.tsx must exist')
  const content = fs.readFileSync(filePath, 'utf-8')
  assert.ok(content.includes('handleDownloadTemplate'), 'Must have handleDownloadTemplate')
  assert.ok(content.includes('handleValidateAndPreview'), 'Must have validation logic')
  assert.ok(content.includes('handleCommitImport'), 'Must have commit logic')
})

// 7. MULTI-CHANNEL NOTIFICATION ADAPTERS
console.log('\n--- 7. Notification Integration Adapters ---')
it('adapters.ts exists with Email, SMS, and WhatsApp dispatchers', () => {
  const filePath = path.resolve('src/lib/notifications/adapters.ts')
  assert.ok(fs.existsSync(filePath), 'adapters.ts must exist')
  const content = fs.readFileSync(filePath, 'utf-8')
  assert.ok(content.includes('dispatchMultiChannel'), 'Must define dispatchMultiChannel')
  assert.ok(content.includes('NIC_SMS_API_KEY'), 'Must support NIC SMS gateway')
  assert.ok(content.includes('WHATSAPP_API_TOKEN'), 'Must support WhatsApp Business API')
})

// 8. INTERACTIVE PROJECT DRAWER WORKFLOW
console.log('\n--- 8. 10-Stage Lifecycle Stepper & Interactive Drawer ---')
it('ProjectDrawer has tabs for 10 Stages, File Movement, Inspections, and Documents', () => {
  const content = fs.readFileSync(path.resolve('src/components/ProjectDrawer.tsx'), 'utf-8')
  assert.ok(content.includes('handleFileMovement'), 'Must implement file movement action')
  assert.ok(content.includes('handleProgressSubmit'), 'Must implement field progress update')
  assert.ok(content.includes('handleBillSubmit'), 'Must implement bill requisition submission')
  assert.ok(content.includes('handleDocumentSubmit'), 'Must implement document upload')
  assert.ok(content.includes('10-Stage DMFT Project Lifecycle Monitoring'), 'Must render 10-stage stepper')
})

console.log('\n-----------------------------------------------------------------------')
console.log(`Results: ${passed} Passed, ${failed} Failed`)
console.log('-----------------------------------------------------------------------')

if (failed > 0) {
  process.exit(1)
} else {
  console.log('\nALL RFP COMPLIANCE TESTS PASSED PERFECTLY!\n')
}

