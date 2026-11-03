'use client'

import { useState } from 'react'
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FilePlus2,
  FileText,
  FolderKanban,
  History,
  IndianRupee,
  Layers,
  MapPin,
  Send,
  ShieldAlert,
  Upload,
  User,
  X,
} from 'lucide-react'
import type { Project } from '@/types/project'
import type { DMFTProject, FileMovementAction, DocumentCategory } from '@/types/dmft'
import { useTranslation } from '@/context/LanguageContext'
import { dmftDatabase } from '@/lib/services/dmft-database.service'
import { Status } from './Status'

export function ProjectDrawer({
  project,
  onClose,
  publicMode = false,
}: {
  project: Project
  onClose: () => void
  publicMode?: boolean
}) {
  const { t, language, formatCurrency, formatDate, getLocalizedText } = useTranslation()
  const [tab, setTab] = useState<'Overview' | 'Financials' | 'Progress' | 'Workflow' | 'Inspections' | 'Documents' | 'Activity'>('Overview')

  // Live lookup from DMFT database if available
  const [dmftProj, setDmftProj] = useState<DMFTProject | undefined>(() => dmftDatabase.getProjectById(project.id))

  // Workflow Action Form State
  const [workflowAction, setWorkflowAction] = useState<FileMovementAction>('Forward')
  const [toOfficer, setToOfficer] = useState('Deputy Development Commissioner')
  const [toDepartment, setToDepartment] = useState('DMFT Cell, Ramgarh')
  const [movementRemarks, setMovementRemarks] = useState('')
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null)

  // Progress Update Form State
  const [newProgress, setNewProgress] = useState(project.physicalProgress || 0)
  const [progressRemarks, setProgressRemarks] = useState('')

  // Payment Requisition Form State
  const [billNo, setBillNo] = useState('')
  const [billAmount, setBillAmount] = useState('')
  const [billLetterNo, setBillLetterNo] = useState('')

  // Document Upload State
  const [docTitle, setDocTitle] = useState('')
  const [docCategory, setDocCategory] = useState<DocumentCategory>('DPR')
  const [docFileName, setDocFileName] = useState('')

  const refreshProject = () => {
    const updated = dmftDatabase.getProjectById(project.id)
    if (updated) setDmftProj({ ...updated })
  }

  const handleFileMovement = (e: React.FormEvent) => {
    e.preventDefault()
    if (!toOfficer) return

    const adminUser = dmftDatabase.getUsers()[0]
    dmftDatabase.moveFile(
      project.id,
      workflowAction,
      toOfficer,
      toDepartment,
      movementRemarks || `File ${workflowAction} submitted by ${adminUser.name}`,
      adminUser
    )

    refreshProject()
    setActionSuccessMsg(
      language === 'hi'
        ? `फ़ाइल संचलन कार्रवाई "${workflowAction}" सफलतापूर्वक पूर्ण हुई!`
        : `File movement action "${workflowAction}" submitted successfully!`
    )
    setMovementRemarks('')
    setTimeout(() => setActionSuccessMsg(null), 3000)
  }

  const handleProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fieldUser = dmftDatabase.getUsers().find((u) => u.role === 'inspection_team') || dmftDatabase.getUsers()[0]
    dmftDatabase.recordProgress(
      project.id,
      Number(newProgress),
      progressRemarks || 'Verified physical milestone in field inspection.',
      [],
      fieldUser
    )

    refreshProject()
    setActionSuccessMsg(
      language === 'hi'
        ? `भौतिक प्रगति ${newProgress}% अद्यतन कर दी गई!`
        : `Physical progress updated to ${newProgress}%!`
    )
    setProgressRemarks('')
    setTimeout(() => setActionSuccessMsg(null), 3000)
  }

  const handleBillSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!billNo || !billAmount) return

    const execUser = dmftDatabase.getUsers().find((u) => u.role === 'execution_dept') || dmftDatabase.getUsers()[0]
    dmftDatabase.submitPaymentRequisition(
      project.id,
      billNo,
      new Date().toISOString().split('T')[0],
      Number(billAmount),
      billLetterNo || `BILL/${billNo}`,
      'Running account bill submitted for scrutiny.',
      execUser
    )

    refreshProject()
    setActionSuccessMsg(
      language === 'hi'
        ? `भुगतान अधियाचन विपत्र ₹${Number(billAmount).toLocaleString()} समर्पित!`
        : `Payment requisition bill ₹${Number(billAmount).toLocaleString()} submitted!`
    )
    setBillNo('')
    setBillAmount('')
    setBillLetterNo('')
    setTimeout(() => setActionSuccessMsg(null), 3000)
  }

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!docTitle || !docFileName) return

    const adminUser = dmftDatabase.getUsers()[0]
    dmftDatabase.addDocument(
      project.id,
      {
        title: docTitle,
        category: docCategory,
        fileName: docFileName,
        fileSize: '2.4 MB',
        fileUrl: `/documents/${docFileName}`,
        uploadedBy: adminUser.name,
        verificationStatus: 'Verified',
      },
      adminUser
    )

    refreshProject()
    setActionSuccessMsg(
      language === 'hi'
        ? `दस्तावेज़ "${docTitle}" परियोजना रिपोजिटरी में सहेजा गया!`
        : `Document "${docTitle}" uploaded to project repository!`
    )
    setDocTitle('')
    setDocFileName('')
    setTimeout(() => setActionSuccessMsg(null), 3000)
  }

  const projectName = getLocalizedText(project.nameEn, project.nameHi)
  const projectDesc = getLocalizedText(project.descriptionEn, project.descriptionHi)
  const hasHindiName = Boolean(project.nameHi && project.nameHi.trim().length > 0)

  const financials = project.financials || {
    estimatedCost: 0,
    approvedAmount: 0,
    agreementAmount: 0,
    amountReleased: 0,
    expenditure: 0,
    balance: 0,
    utilization: 0,
  }

  const milestones = project.milestones || []
  const documents = dmftProj ? dmftProj.documents : project.documents || []
  const activityLog = dmftProj ? dmftProj.auditTrail : project.activityLog || []
  const fileMovements = dmftProj?.fileMovementHistory || []
  const paymentReqs = dmftProj?.paymentRequisitions || []
  const inspections = dmftProj?.inspections || []

  const tabs: Array<{ id: typeof tab; label: string }> = [
    { id: 'Overview', label: t.drawer.overview },
    { id: 'Workflow', label: language === 'hi' ? '10-चरण संचिका' : '10 Stages & File' },
    { id: 'Financials', label: t.drawer.financials },
    { id: 'Progress', label: t.drawer.progress },
    { id: 'Inspections', label: language === 'hi' ? 'गुणवत्ता निरीक्षण' : 'Inspections' },
    { id: 'Documents', label: t.drawer.documents },
    { id: 'Activity', label: t.drawer.activity },
  ]

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className={`drawer ${publicMode ? 'public-drawer' : ''}`}>
        {/* Drawer Header */}
        <div className="drawer-head">
          <button className="icon-btn" onClick={onClose} aria-label={t.common.close}>
            <X size={20} />
          </button>
          <div>
            <span>{publicMode ? t.drawer.publicProfile : 'DMFT Ramgarh Project Profile'}</span>
            <strong>{project.id}</strong>
          </div>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => window.print()}
            title={t.drawer.report}
          >
            <Download size={15} />
            <span>{t.drawer.report}</span>
          </button>
        </div>

        <div className="drawer-scroll">
          {publicMode && <div className="detail-photo" />}

          {/* Title & Status */}
          <div className="project-title">
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <Status value={project.status} />
              <span className="badge badge--neutral">{project.category}</span>
              <span className="badge badge--teal">{dmftProj?.currentStage || project.stage}</span>
            </div>
            <h2>{projectName}</h2>

            {/* Bilingual fallback notice */}
            {language === 'hi' && !hasHindiName && (
              <div className="translation-notice">
                <AlertCircle size={13} />
                <span>{t.drawer.noHindiTranslation} · {t.drawer.showingEnglishFallback}</span>
              </div>
            )}

            <p>
              <MapPin size={15} />
              {project.location.village ? `${project.location.village}, ` : ''}
              {project.location.panchayat ? `${project.location.panchayat}, ` : ''}
              <strong>{project.location.block}</strong>
              {project.location.district ? ` · ${project.location.district}` : ' · Ramgarh'}
            </p>
          </div>

          {actionSuccessMsg && (
            <div className="form-success-banner" style={{ margin: '0 20px 14px' }}>
              <CheckCircle2 size={16} />
              <span>{actionSuccessMsg}</span>
            </div>
          )}

          {/* Nav Tabs */}
          <div className="drawer-tabs">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                type="button"
                className={tab === tabItem.id ? 'active' : ''}
                onClick={() => setTab(tabItem.id)}
              >
                {tabItem.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {tab === 'Overview' && (
            <div className="drawer-content">
              <h3>{language === 'hi' ? 'परियोजना कार्य विवरण' : 'Scope Description'}</h3>
              <p className="detail-copy">{projectDesc || 'No description provided.'}</p>

              {/* Geotagged GIS Coordinates Badge */}
              <div className="card" style={{ padding: '12px 14px', marginBottom: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#166534' }}>
                  <MapPin size={16} />
                  <strong>
                    {project.location.latitude && project.location.longitude
                      ? `GPS Geotagged: ${project.location.latitude}° N, ${project.location.longitude}° E (Ramgarh District)`
                      : 'Geotagging: Pending field GPS coordinate mapping'}
                  </strong>
                </div>
              </div>

              <h3>{language === 'hi' ? 'परियोजना वर्गीकरण' : 'Project Classification'}</h3>
              <div className="info-grid">
                <div>
                  <span>{t.form.category}</span>
                  <strong>{project.category}</strong>
                </div>
                <div>
                  <span>{language === 'hi' ? 'परियोजना प्रकार' : 'Project Type'}</span>
                  <strong>{project.type || 'Infrastructure'}</strong>
                </div>
                <div>
                  <span>{t.form.fy}</span>
                  <strong>{project.financialYear}</strong>
                </div>
                <div>
                  <span>{language === 'hi' ? 'कार्यकारी विभाग' : 'Department'}</span>
                  <strong>{project.department}</strong>
                </div>
                <div>
                  <span>{t.drawer.responsibleOfficer}</span>
                  <strong>{project.responsibleOfficer}</strong>
                </div>
                <div>
                  <span>Contractor / Agency</span>
                  <strong>{project.contractor || dmftProj?.contractorName || 'Not Assigned'}</strong>
                </div>
              </div>

              {/* Stage 1 Recommendation Details */}
              {dmftProj?.recommendationLetterNo && (
                <>
                  <h3 style={{ marginTop: '16px' }}>Stage 1 Recommendation Record</h3>
                  <div className="info-grid">
                    <div>
                      <span>Recommended By</span>
                      <strong>{dmftProj.recommendedBy}</strong>
                    </div>
                    <div>
                      <span>Letter No &amp; Date</span>
                      <strong>{dmftProj.recommendationLetterNo} ({dmftProj.recommendationLetterDate})</strong>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 2: WORKFLOW & 10 LIFECYCLE STAGES & FILE MOVEMENT */}
          {tab === 'Workflow' && (
            <div className="drawer-content">
              <div className="card" style={{ padding: '14px', marginBottom: '16px' }}>
                <span style={{ fontSize: '10.5px', color: 'var(--muted)' }}>
                  {language === 'hi' ? 'वर्तमान डीएमएफटी चरण (RFP अनुभाग III)' : 'Current DMFT Stage (RFP Section III)'}
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '15px', color: 'var(--blue)' }}>
                  {dmftProj?.currentStage || project.stage}
                </h3>
              </div>

              {/* Interactive File Movement Engine (RFP Section III, Stage 4) */}
              {!publicMode && (
                <div className="card" style={{ padding: '16px', marginBottom: '20px', border: '1.5px solid var(--blue)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Send size={16} className="text-blue" />
                    <strong style={{ fontSize: '13px' }}>
                      {language === 'hi' ? 'संचिका संचलन एवं अनुमोदन कार्रवाई' : 'Officer File Movement Action'}
                    </strong>
                  </div>
                  <form onSubmit={handleFileMovement}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600 }}>Action</label>
                        <select
                          value={workflowAction}
                          onChange={(e) => setWorkflowAction(e.target.value as FileMovementAction)}
                          style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
                        >
                          <option value="Forward">Forward / अग्रसारित करें</option>
                          <option value="Return">Return / वापस करें</option>
                          <option value="Revert">Revert / प्रत्यावर्तित करें</option>
                          <option value="Resubmit">Resubmit / पुनः समर्पित करें</option>
                          <option value="Approve">Approve / स्वीकृत करें (Next Stage)</option>
                          <option value="Reject">Reject / अस्वीकृत करें</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600 }}>Forward To Officer</label>
                        <select
                          value={toOfficer}
                          onChange={(e) => {
                            setToOfficer(e.target.value)
                            if (e.target.value.includes('Deputy Commissioner')) setToDepartment('District Collectorate')
                            else if (e.target.value.includes('Executive Engineer')) setToDepartment(project.department)
                            else setToDepartment('DMFT Cell, Ramgarh')
                          }}
                          style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
                        >
                          <option value="Deputy Development Commissioner">Deputy Development Commissioner (DDC)</option>
                          <option value="Deputy Commissioner, Ramgarh">Deputy Commissioner-cum-DM (DC)</option>
                          <option value="District Planning Officer, Ramgarh">District Planning Officer (DPO)</option>
                          <option value="Executive Engineer, Execution Dept">Executive Engineer (Works Division)</option>
                          <option value="Quality Auditor & AE">Assistant Engineer &amp; Quality Auditor</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600 }}>Official Remarks / Note</label>
                      <input
                        type="text"
                        placeholder="Enter official file movement remarks..."
                        value={movementRemarks}
                        onChange={(e) => setMovementRemarks(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
                      />
                    </div>
                    <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                      <Send size={14} />
                      <span>{language === 'hi' ? 'संचिका आगे बढ़ाएं' : 'Submit File Movement'}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* 10-Stage Lifecycle Stepper */}
              <h3 style={{ fontSize: '13px', margin: '0 0 10px' }}>
                {language === 'hi' ? '10-चरणीय डीएमएफटी परियोजना जीवनचक्र' : '10-Stage DMFT Project Lifecycle Monitoring'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
                {[
                  { stage: 1, nameEn: 'Stage 1: Work Request & Recommendation', nameHi: 'चरण 1: कार्य अनुशंसा / मांग पत्र', done: true },
                  { stage: 2, nameEn: 'Stage 2: Work Request Acceptance (Gram Sabha / Council)', nameHi: 'चरण 2: कार्य स्वीकृति (ग्राम सभा / शासी परिषद)', done: (dmftProj?.stageNumber || 1) >= 2 },
                  { stage: 3, nameEn: 'Stage 3: Technical Approval & DPR Preparation', nameHi: 'चरण 3: तकनीकी स्वीकृति एवं डीपीआर परीक्षण', done: (dmftProj?.stageNumber || 1) >= 3 },
                  { stage: 4, nameEn: 'Stage 4: Administrative Approval & Sanction', nameHi: 'चरण 4: प्रशासनिक स्वीकृति एवं संचिका संचलन', done: (dmftProj?.stageNumber || 1) >= 4 },
                  { stage: 5, nameEn: 'Stage 5: Work Execution & Tendering (NIT / Agreement)', nameHi: 'चरण 5: कार्य निष्पादन एवं निविदा (अनुबंध / शिलान्यास)', done: (dmftProj?.stageNumber || 1) >= 5 },
                  { stage: 6, nameEn: 'Stage 6: Physical Progress (Geotagged Photos & Field Obs)', nameHi: 'चरण 6: भौतिक प्रगति (जीपीएस फोटो एवं फील्ड सत्यापन)', done: (dmftProj?.physicalProgress || 0) >= 50 },
                  { stage: 7, nameEn: 'Stage 7: Payment Requisition & Bill Audit', nameHi: 'चरण 7: भुगतान अधियाचन एवं देयक ऑडिट', done: (dmftProj?.financialProgress || 0) >= 50 },
                  { stage: 8, nameEn: 'Stage 8: Work Inspection & Deficiency Compliance', nameHi: 'चरण 8: स्थल निरीक्षण एवं कमियों का अनुपालन', done: (dmftProj?.inspections || []).some((i) => i.complianceStatus === 'Complied') },
                  { stage: 9, nameEn: 'Stage 9: Financial Progress & UC Submission', nameHi: 'चरण 9: वित्तीय प्रगति एवं उपयोगिता प्रमाण पत्र', done: dmftProj?.ucStatus === 'Verified' || dmftProj?.ucStatus === 'Submitted' },
                  { stage: 10, nameEn: 'Stage 10: Final Handover & Commissioning', nameHi: 'चरण 10: परिसंपत्ति हस्तांतरण एवं कमीशनिंग', done: Boolean(dmftProj?.isHandedOver || project.status === 'Completed') },
                ].map((s) => (
                  <div
                    key={s.stage}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 12px',
                      borderRadius: '6px',
                      background: s.done ? '#ecfdf5' : '#f8fafc',
                      border: `1px solid ${s.done ? '#a7f3d0' : '#e2e8f0'}`,
                      fontSize: '11px',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: s.done ? '#065f46' : '#64748b' }}>
                      {language === 'hi' ? s.nameHi : s.nameEn}
                    </span>
                    <span
                      style={{
                        fontSize: '9.5px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: s.done ? '#10b981' : '#cbd5e1',
                        color: '#ffffff',
                      }}
                    >
                      {s.done ? 'COMPLETED' : 'PENDING'}
                    </span>
                  </div>
                ))}
              </div>

              {/* File Movement History with Digital Timestamps */}
              {fileMovements.length > 0 && (
                <>
                  <h3 style={{ fontSize: '13px', margin: '14px 0 8px' }}>
                    {language === 'hi' ? 'डिजिटल संचिका संचलन इतिहास' : 'Digital File Movement History'}
                  </h3>
                  <div className="timeline">
                    {fileMovements.map((fm) => (
                      <div key={fm.id} className="current">
                        <i><Send size={12} /></i>
                        <span>
                          <strong>{fm.action} → {fm.toOfficer} ({fm.toDepartment})</strong>
                          <p style={{ margin: '3px 0 0', fontSize: '11px', color: 'var(--text)' }}>{fm.remarks}</p>
                          <small>{new Date(fm.timestamp).toLocaleString()} · From: {fm.fromOfficer}</small>
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 3: FINANCIALS & BILL REQUISITIONS */}
          {tab === 'Financials' && (
            <div className="drawer-content">
              <div className="card big-money" style={{ marginBottom: '16px', padding: '16px' }}>
                {formatCurrency(financials.approvedAmount)}
                <span>{t.stats.totalApproved}</span>
              </div>

              <div className="money-grid" style={{ marginBottom: '16px' }}>
                <div>
                  <span>{t.drawer.estimatedCost}</span>
                  <strong>{formatCurrency(financials.estimatedCost)}</strong>
                </div>
                <div>
                  <span>{t.drawer.agreementAmount}</span>
                  <strong>{formatCurrency(financials.agreementAmount)}</strong>
                </div>
                <div>
                  <span>{t.drawer.amountReleased}</span>
                  <strong>{formatCurrency(financials.amountReleased)}</strong>
                </div>
                <div>
                  <span>{t.stats.expenditure}</span>
                  <strong style={{ color: 'var(--blue)' }}>{formatCurrency(financials.expenditure)}</strong>
                </div>
              </div>

              {/* Submit Payment Requisition Form (Stage 7) */}
              {!publicMode && (
                <div className="card" style={{ padding: '16px', marginBottom: '20px', border: '1px solid var(--line)' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IndianRupee size={15} className="text-green" />
                    <span>Submit Payment Requisition Bill (Stage 7)</span>
                  </h4>
                  <form onSubmit={handleBillSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600 }}>Bill / Invoice No.</label>
                        <input
                          type="text"
                          placeholder="e.g. RA-BILL-03"
                          value={billNo}
                          onChange={(e) => setBillNo(e.target.value)}
                          style={{ width: '100%', padding: '6px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600 }}>Requisition Amount (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g. 5000000"
                          value={billAmount}
                          onChange={(e) => setBillAmount(e.target.value)}
                          style={{ width: '100%', padding: '6px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
                        />
                      </div>
                    </div>
                    <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                      <IndianRupee size={14} />
                      <span>Submit Payment Requisition</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Payment Requisitions Ledger */}
              {paymentReqs.length > 0 && (
                <>
                  <h3 style={{ fontSize: '13px', margin: '14px 0 8px' }}>Payment Requisitions &amp; Disbursements</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {paymentReqs.map((req) => (
                      <div key={req.id} className="card" style={{ padding: '10px 14px', fontSize: '11.5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong>{req.billNo} — {formatCurrency(req.requisitionAmount)}</strong>
                          <span className={`badge ${req.paymentStatus === 'Disbursed' ? 'badge--green' : 'badge--amber'}`}>
                            {req.paymentStatus}
                          </span>
                        </div>
                        <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '11px' }}>
                          Ref: {req.paymentRefNo || 'Under scrutiny'} · Bill Date: {req.billDate}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 4: PHYSICAL PROGRESS & FIELD UPDATES */}
          {tab === 'Progress' && (
            <div className="drawer-content">
              <div className="card" style={{ padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
                <div className="public-ring" style={{ margin: '0 auto 12px' }}>
                  <div>
                    <strong>{project.physicalProgress}%</strong>
                    <small>{t.common.completed}</small>
                  </div>
                </div>
              </div>

              {/* Mobile-Friendly Physical Progress Update Form (Stage 6) */}
              {!publicMode && (
                <div className="card" style={{ padding: '16px', marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ClipboardCheck size={15} className="text-blue" />
                    <span>Submit Field Progress Update (Stage 6)</span>
                  </h4>
                  <form onSubmit={handleProgressSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600 }}>Physical Progress: {newProgress}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={newProgress}
                        onChange={(e) => setNewProgress(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#00c675' }}
                      />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600 }}>Field Observations</label>
                      <input
                        type="text"
                        placeholder="e.g. Foundation complete, slab shuttering in progress..."
                        value={progressRemarks}
                        onChange={(e) => setProgressRemarks(e.target.value)}
                        style={{ width: '100%', padding: '6px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
                      />
                    </div>
                    <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                      <ClipboardCheck size={14} />
                      <span>Update Physical Progress</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: INSPECTIONS & QUALITY AUDIT (STAGE 8) */}
          {tab === 'Inspections' && (
            <div className="drawer-content">
              <h3 style={{ fontSize: '13px', margin: '0 0 12px' }}>
                {language === 'hi' ? 'स्थलीय गुणवत्ता निरीक्षण एवं सतर्कता' : 'Site Quality Inspection & Audit Records (Stage 8)'}
              </h3>
              {inspections.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {inspections.map((insp) => (
                    <div key={insp.id} className="card" style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <strong>Inspection Date: {insp.inspectionDate}</strong>
                        <span className={`badge ${insp.complianceStatus === 'Complied' ? 'badge--green' : 'badge--red'}`}>
                          {insp.complianceStatus}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 8px', fontSize: '11px', color: 'var(--muted)' }}>
                        Team: {insp.inspectionTeam.join(', ')}
                      </p>
                      <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', fontSize: '11.5px', marginBottom: '8px' }}>
                        <strong>Findings:</strong> {insp.findings}
                      </div>
                      {insp.deficiencies && (
                        <div style={{ background: '#fffbeb', padding: '8px 10px', borderRadius: '6px', fontSize: '11.5px', color: '#b45309' }}>
                          <strong>Action Required:</strong> {insp.deficiencies}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tab-placeholder">
                  <ClipboardCheck size={32} />
                  <h3>No Inspections Logged</h3>
                  <p>Site inspection records will appear here after team verification.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: DOCUMENT REPOSITORY (15 CATEGORIES) */}
          {tab === 'Documents' && (
            <div className="drawer-content">
              <h3>{t.drawer.supportingDocs} ({documents.length})</h3>

              {/* Upload Document Form */}
              {!publicMode && (
                <div className="card" style={{ padding: '14px', marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Upload size={14} className="text-green" />
                    <span>Upload Document to Project Repository</span>
                  </h4>
                  <form onSubmit={handleDocumentSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        placeholder="Document Title (e.g. DPR Report)"
                        value={docTitle}
                        onChange={(e) => setDocTitle(e.target.value)}
                        style={{ padding: '6px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
                      />
                      <select
                        value={docCategory}
                        onChange={(e) => setDocCategory(e.target.value as DocumentCategory)}
                        style={{ padding: '6px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
                      >
                        <option value="Recommendation Letter">Recommendation Letter</option>
                        <option value="Gram Sabha Resolution">Gram Sabha Resolution</option>
                        <option value="Meeting Proceedings">Meeting Proceedings</option>
                        <option value="DPR">DPR Document</option>
                        <option value="Technical Sanction (TS)">Technical Sanction (TS)</option>
                        <option value="Administrative Sanction (AS)">Administrative Sanction (AS)</option>
                        <option value="Tender Document">Tender Document</option>
                        <option value="Agreement">Agreement</option>
                        <option value="Work Order">Work Order</option>
                        <option value="Progress Photo">Progress Photo</option>
                        <option value="Payment Requisition">Payment Requisition</option>
                        <option value="Inspection Report">Inspection Report</option>
                        <option value="Utilization Certificate (UC)">Utilization Certificate (UC)</option>
                        <option value="Handover Document">Handover Document</option>
                        <option value="Completion Certificate">Completion Certificate</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="File name (e.g. Vetted_DPR_Final.pdf)"
                        value={docFileName}
                        onChange={(e) => setDocFileName(e.target.value)}
                        style={{ flex: 1, padding: '6px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
                      />
                      <button type="submit" className="primary-btn" style={{ height: '32px' }}>
                        <Upload size={14} />
                        <span>Upload</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Document List */}
              {documents.length > 0 ? (
                <div className="drawer-doc-list">
                  {documents.map((doc: any) => (
                    <div key={doc.id} className="drawer-doc-item card">
                      <FileText size={22} className="text-green" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <strong className="doc-name">{doc.name || doc.title}</strong>
                        <span className="doc-meta">{doc.category || doc.type} · {doc.size || doc.fileSize} · {doc.date || doc.uploadedAt?.split('T')[0]}</span>
                      </div>
                      <button
                        type="button"
                        className="secondary-btn"
                        style={{ height: '30px', padding: '0 8px' }}
                        onClick={() => alert(`Viewing document: ${doc.name || doc.title}`)}
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tab-placeholder">
                  <FileText size={32} />
                  <h3>No Attached Documents</h3>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: ACTIVITY LOG & AUDIT TRAIL */}
          {tab === 'Activity' && (
            <div className="drawer-content">
              <h3>{t.drawer.activityHistory}</h3>
              {activityLog.length > 0 ? (
                <div className="timeline">
                  {activityLog.map((act: any) => (
                    <div key={act.id}>
                      <i><History size={12} /></i>
                      <span>
                        <strong>{act.action}</strong>
                        <p style={{ margin: '3px 0 0', fontSize: '11px', color: 'var(--text)' }}>{act.details || ''}</p>
                        <small>{act.by || act.performedBy} · {act.date || act.timestamp?.split('T')[0]}</small>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tab-placeholder">
                  <History size={32} />
                  <h3>{t.drawer.noActivity}</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
