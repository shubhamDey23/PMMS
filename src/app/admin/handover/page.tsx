'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Handshake,
  MapPin,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { Status } from '@/components/Status'
import { useAdminDrawer } from '@/context/AdminDrawerContext'
import { useTranslation } from '@/context/LanguageContext'
import { projectService } from '@/lib/services/project.service'
import type { Project } from '@/types/project'

export default function ProjectHandoverPage() {
  const { openProject } = useAdminDrawer()
  const { t, language, formatCurrency, getLocalizedText } = useTranslation()
  const [allProjects] = useState<Project[]>(() => projectService.listProjects())
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('all')
  const [handoverSuccessId, setHandoverSuccessId] = useState<string | null>(null)

  // Filter completed and nearly completed projects suitable for handover
  const handoverCandidates = allProjects.filter((p) => {
    const isCandidate = p.status === 'Completed' || p.physicalProgress >= 90
    const matchesSearch =
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nameHi && p.nameHi.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.block?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = selectedDept === 'all' || p.department === selectedDept

    return isCandidate && matchesSearch && matchesDept
  })

  const departments = ['all', ...Array.from(new Set(allProjects.map((p) => p.department)))]

  const handleSignHandover = (projectId: string) => {
    setHandoverSuccessId(projectId)
    setTimeout(() => setHandoverSuccessId(null), 4000)
  }

  return (
    <>
      <PageIntro
        eyebrow={language === 'hi' ? 'eSapmada by Eccentric / कमीशनिंग' : 'eSapmada by Eccentric / Commissioning'}
        title={language === 'hi' ? 'परियोजना हस्तांतरण एवं संपत्ति अंतरण' : 'Project Handover & Asset Transfer'}
        subtitle={
          language === 'hi'
            ? 'पूर्ण परियोजनाओं के लिए संयुक्त स्थल निरीक्षण, सुरक्षा प्रमाण-पत्र, संपत्ति पंजीयन और अंतिम विभागीय हस्तांतरण का प्रबंधन।'
            : 'Manage formal site handover memos, joint inspection signoffs, safety clearances, and line department asset transfers.'
        }
        actions={
          <button
            type="button"
            className="secondary-btn"
            onClick={() => window.print()}
            title="Print Handover Register"
          >
            <Download size={16} />
            <span>{language === 'hi' ? 'रजिस्टर डाउनलोड' : 'Export Register'}</span>
          </button>
        }
      />

      {handoverSuccessId && (
        <div className="form-success-banner" style={{ marginBottom: '20px' }}>
          <CheckCircle2 size={18} />
          <span>
            {language === 'hi'
              ? `परियोजना ${handoverSuccessId} का हस्तांतरण मेमो सफलतापूर्वक डिजिटल रूप से सत्यापित एवं हस्ताक्षरित किया गया!`
              : `Handover certificate and asset transfer memo for ${handoverSuccessId} successfully certified!`}
          </span>
        </div>
      )}

      {/* Handover Metric Cards */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="card kpi-card">
          <div className="kpi-head">
            <span className="kpi-label">{language === 'hi' ? 'हस्तांतरण हेतु तैयार' : 'Ready for Handover'}</span>
            <span className="kpi-icon blue"><Handshake size={18} /></span>
          </div>
          <strong className="kpi-val">14</strong>
          <span className="kpi-delta positive">{language === 'hi' ? '100% भौतिक पूर्णता' : '100% Physical Completion'}</span>
        </div>

        <div className="card kpi-card">
          <div className="kpi-head">
            <span className="kpi-label">{language === 'hi' ? 'संयुक्त निरीक्षण लंबित' : 'Joint Inspection Due'}</span>
            <span className="kpi-icon amber"><Clock size={18} /></span>
          </div>
          <strong className="kpi-val">9</strong>
          <span className="kpi-delta">{language === 'hi' ? 'इस सप्ताह निर्धारित' : 'Scheduled this week'}</span>
        </div>

        <div className="card kpi-card">
          <div className="kpi-head">
            <span className="kpi-label">{language === 'hi' ? 'सफलतापूर्वक हस्तांतरित' : 'Handover Completed'}</span>
            <span className="kpi-icon green"><FileCheck size={18} /></span>
          </div>
          <strong className="kpi-val">638</strong>
          <span className="kpi-delta positive">{language === 'hi' ? 'कुल परिसंपत्तियां अंतरित' : 'Total Assets Commissioned'}</span>
        </div>

        <div className="card kpi-card">
          <div className="kpi-head">
            <span className="kpi-label">{language === 'hi' ? 'दोष दायित्व अवधि (DLP)' : 'Defect Liability (DLP)'}</span>
            <span className="kpi-icon teal"><ShieldCheck size={18} /></span>
          </div>
          <strong className="kpi-val">42</strong>
          <span className="kpi-delta">{language === 'hi' ? 'सक्रिय निगरानी में' : 'Under active warranty'}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card filter-card" style={{ marginBottom: '20px' }}>
        <div className="filter-row">
          <div className="table-search" style={{ flex: 1 }}>
            <Search size={16} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'परियोजना आईडी, नाम या ब्लॉक खोजें...' : 'Search projects ready for handover...'}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)' }}>
              {language === 'hi' ? 'विभाग:' : 'Department:'}
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{
                height: '36px',
                borderRadius: '7px',
                border: '1px solid var(--line)',
                background: '#fff',
                fontSize: '11px',
                padding: '0 10px',
              }}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? (language === 'hi' ? 'सभी विभाग' : 'All Departments') : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Handover List / Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
        {handoverCandidates.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <FileCheck size={36} style={{ color: 'var(--muted)', margin: '0 auto 10px' }} />
            <p style={{ color: 'var(--muted)' }}>
              {language === 'hi' ? 'कोई परियोजना हस्तांतरण हेतु उपलब्ध नहीं है।' : 'No matching projects found for handover inspection.'}
            </p>
          </div>
        ) : (
          handoverCandidates.map((p) => {
            const isCompleted = p.status === 'Completed'

            return (
              <div key={p.id} className="card" style={{ padding: '20px', transition: 'box-shadow .15s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span className="project-id">{p.id}</span>
                      <Status value={p.status} />
                      <span className="pill green" style={{ fontSize: '9px' }}>
                        {p.physicalProgress}% {language === 'hi' ? 'पूर्ण' : 'Completed'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '14px', margin: '4px 0 6px', fontWeight: 700 }}>
                      {getLocalizedText(p.nameEn, p.nameHi)}
                    </h3>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--muted)', flexWrap: 'wrap' }}>
                      <span>
                        <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {p.location.village}, {p.location.block}, {p.location.district}
                      </span>
                      <span><strong>{language === 'hi' ? 'विभाग:' : 'Dept:'}</strong> {p.department}</span>
                      <span><strong>{language === 'hi' ? 'संवेदक:' : 'Contractor:'}</strong> {p.contractor || 'State Agency'}</span>
                      <span><strong>{language === 'hi' ? 'लागत:' : 'Sanction:'}</strong> {formatCurrency(p.financials?.approvedAmount || 0)}</span>
                    </div>
                  </div>

                  {/* Checklist & Handover Actions */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => openProject(p)}
                      title="Inspect project drawer"
                    >
                      <span>{language === 'hi' ? 'दस्तावेज़ देखें' : 'View Docs'}</span>
                      <ExternalLink size={14} />
                    </button>

                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => handleSignHandover(p.id)}
                      title="Sign off handover memo"
                      style={{ background: isCompleted ? '#059669' : '#0284c7' }}
                    >
                      <Handshake size={15} />
                      <span>{isCompleted ? (language === 'hi' ? 'हस्तांतरण प्रमाणित करें' : 'Certify Handover') : (language === 'hi' ? 'पूर्व-हस्तांतरण समीक्षा' : 'Pre-Handover Review')}</span>
                    </button>
                  </div>
                </div>

                {/* Handover Milestone Checklist */}
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px' }}>
                    <CheckCircle2 size={14} style={{ color: '#059669', flexShrink: 0 }} />
                    <span>{language === 'hi' ? 'स्थल कार्य समापन' : 'Site Work Finished'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px' }}>
                    <CheckCircle2 size={14} style={{ color: '#059669', flexShrink: 0 }} />
                    <span>{language === 'hi' ? 'सुरक्षा एवं गुणवत्ता अनापत्ति' : 'Quality Clearance'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px' }}>
                    <CheckCircle2 size={14} style={{ color: isCompleted ? '#059669' : '#d97706', flexShrink: 0 }} />
                    <span>{language === 'hi' ? 'संयुक्त निरीक्षण हस्ताक्षर' : 'Joint Inspection Signoff'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px' }}>
                    <CheckCircle2 size={14} style={{ color: isCompleted ? '#059669' : '#94a3b8', flexShrink: 0 }} />
                    <span>{language === 'hi' ? 'परिसंपत्ति अंतरण मेमो' : 'Asset Register Memo'}</span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Handover Guidelines SOP */}
      <div className="card" style={{ padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <h4 style={{ fontSize: '13px', margin: '0 0 8px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <ShieldCheck size={16} style={{ color: '#059669' }} />
          {language === 'hi' ? 'eSapmada मानक संचालन प्रक्रिया (SOP) — परियोजना हस्तांतरण' : 'eSapmada Standard Operating Procedure (SOP) — Handover & Commissioning'}
        </h4>
        <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
          {language === 'hi'
            ? 'परियोजना पूर्ण होने के पश्चात कार्यकारी एजेंसी, संबंधित विभाग और जिला प्रशासन के प्रतिनिधियों द्वारा संयुक्त निरीक्षण अनिवार्य है। सभी परीक्षण रिपोर्ट, सुरक्षा अनापत्ति और परिसंपत्ति विवरण eSapmada पोर्टल पर अपलोड होने के उपरांत ही अंतिम हस्तांतरण पत्र जारी किया जाता है।'
            : 'Upon 100% physical completion, executive agencies and recipient line departments must execute a joint site verification. All inspection reports, quality test certificates, and asset inventories must be certified on the eSapmada portal prior to formal commissioning.'}
        </p>
      </div>
    </>
  )
}

