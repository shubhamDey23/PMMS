'use client'

import { useState } from 'react'
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Filter,
  Layers,
  PieChart,
  Printer,
  Search,
  TrendingUp,
} from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { useTranslation } from '@/context/LanguageContext'
import { projectService } from '@/lib/services/project.service'
import type { Project } from '@/types/project'

export default function ReportsPage() {
  const { t, language, formatCurrency } = useTranslation()
  const [allProjects] = useState<Project[]>(() => projectService.listProjects())
  const statsSummary = projectService.getStatsSummary()

  const [selectedReportType, setSelectedReportType] = useState('mpr')
  const [selectedFY, setSelectedFY] = useState('2024-25')
  const [selectedDept, setSelectedDept] = useState('all')
  const [generating, setGenerating] = useState(false)
  const [lastGeneratedReport, setLastGeneratedReport] = useState<string | null>(null)

  const handleGenerateReport = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      const reportName =
        selectedReportType === 'mpr'
          ? 'Monthly_Progress_Report_Ranchi.pdf'
          : selectedReportType === 'financial'
          ? 'Financial_Expenditure_Statement.xlsx'
          : 'Delayed_Projects_Audit_Report.pdf'
      setLastGeneratedReport(reportName)
      setTimeout(() => setLastGeneratedReport(null), 5000)
    }, 1200)
  }

  const reportsCatalog = [
    {
      id: 'REP-01',
      titleEn: 'Monthly Development Progress Report (MPR)',
      titleHi: 'मासिक विकास प्रगति प्रतिवेदन (MPR)',
      type: 'PDF',
      size: '3.4 MB',
      date: 'Generated today, 08:30 AM',
      period: 'October 2024 (FY 2024–25)',
      descEn: 'Comprehensive physical and financial status of all sanctioned state infrastructure projects.',
      descHi: 'सभी स्वीकृत राज्य अवसंरचना परियोजनाओं की समग्र भौतिक एवं वित्तीय स्थिति।',
      icon: FileText,
      tone: 'blue',
    },
    {
      id: 'REP-02',
      titleEn: 'Financial Sanction & Expenditure Ledger',
      titleHi: 'वित्तीय स्वीकृति एवं व्यय लेखा विवरण',
      type: 'Excel (XLSX)',
      size: '5.8 MB',
      date: 'Updated 2 days ago',
      period: 'Q3 FY 2024–25',
      descEn: 'Itemized administrative sanctions, contractor bills, fund releases, and unspent balances.',
      descHi: 'प्रशासनिक स्वीकृतियां, संवेदक देयक, आवंटित राशि और अप्रयुक्त शेष का मदवार विवरण।',
      icon: FileSpreadsheet,
      tone: 'green',
    },
    {
      id: 'REP-03',
      titleEn: 'Delayed & Stalled Projects Watchlist',
      titleHi: 'विलंबित एवं समीक्षाधीन परियोजना सूची',
      type: 'PDF',
      size: '1.9 MB',
      date: 'Generated yesterday',
      period: 'Active Monitoring',
      descEn: 'Detailed root-cause analysis, show-cause notices, and remedial milestones for lagging projects.',
      descHi: 'समयसीमा पार परियोजनाओं के कारण विश्लेषण, कारण बताओ नोटिस एवं उपचारात्मक कार्ययोजना।',
      icon: Clock,
      tone: 'amber',
    },
    {
      id: 'REP-04',
      titleEn: 'GIS & Geolocation Asset Verification Register',
      titleHi: 'जीआईएस एवं जियोलोकेशन परिसंपत्ति सत्यापन पंजी',
      type: 'PDF',
      size: '8.2 MB',
      date: 'Updated weekly',
      period: 'Ranchi District Corridor',
      descEn: 'Geo-tagged field photographs, verified GPS coordinates, and site inspection certificates.',
      descHi: 'जियो-टैग्ड स्थल छायाचित्र, सत्यापित जीपीएस निर्देशांक और स्थल निरीक्षण प्रमाण-पत्र।',
      icon: Layers,
      tone: 'teal',
    },
  ]

  return (
    <>
      <PageIntro
        eyebrow={language === 'hi' ? 'eSapmada by Eccentric / रिपोर्ट एवं ऑडिट' : 'eSapmada by Eccentric / Reports & Audit'}
        title={language === 'hi' ? 'परियोजना रिपोर्ट एवं विश्लेषण' : 'Reports & Analytics Intelligence'}
        subtitle={
          language === 'hi'
            ? 'विस्तृत मासिक प्रगति प्रतिवेदन, वित्तीय व्यय विवरण, विलंबित परियोजनाओं की समीक्षा और जीआईएस ऑडिट रिपोर्ट डाउनलोड करें।'
            : 'Generate, preview and download authoritative executive reports, expenditure audits, milestone progress, and GIS verification registers.'
        }
        actions={
          <button
            type="button"
            className="secondary-btn"
            onClick={() => window.print()}
            title="Print Summary Page"
          >
            <Printer size={16} />
            <span>{language === 'hi' ? 'पृष्ठ प्रिंट करें' : 'Print View'}</span>
          </button>
        }
      />

      {lastGeneratedReport && (
        <div className="form-success-banner" style={{ marginBottom: '20px' }}>
          <CheckCircle2 size={18} />
          <span>
            {language === 'hi'
              ? `प्रतिवेदन "${lastGeneratedReport}" सफलतापूर्वक तैयार किया गया और डाउनलोड हेतु तैयार है!`
              : `Report "${lastGeneratedReport}" successfully compiled and ready for download!`}
          </span>
        </div>
      )}

      {/* KPI Overview */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="card kpi-card">
          <div className="kpi-head">
            <span className="kpi-label">{language === 'hi' ? 'कुल सार्वजनिक निवेश' : 'Public Investment'}</span>
            <span className="kpi-icon blue"><TrendingUp size={18} /></span>
          </div>
          <strong className="kpi-val">{formatCurrency(statsSummary.totalApprovedAmount)}</strong>
          <span className="kpi-delta positive">{language === 'hi' ? 'सत्यापित वित्तीय आंकड़े' : 'Approved Sanctions'}</span>
        </div>

        <div className="card kpi-card">
          <div className="kpi-head">
            <span className="kpi-label">{language === 'hi' ? 'कुल व्यय' : 'Total Expenditure'}</span>
            <span className="kpi-icon green"><FileSpreadsheet size={18} /></span>
          </div>
          <strong className="kpi-val">{formatCurrency(statsSummary.totalExpenditure)}</strong>
          <span className="kpi-delta positive">{statsSummary.overallUtilization}% {language === 'hi' ? 'उपयोग दर' : 'Utilization'}</span>
        </div>

        <div className="card kpi-card">
          <div className="kpi-head">
            <span className="kpi-label">{language === 'hi' ? 'कुल ट्रैक की गई परियोजनाएँ' : 'Tracked Projects'}</span>
            <span className="kpi-icon purple"><Layers size={18} /></span>
          </div>
          <strong className="kpi-val">{statsSummary.total}</strong>
          <span className="kpi-delta">{statsSummary.completed} {language === 'hi' ? 'पूर्ण' : 'Completed'}</span>
        </div>

        <div className="card kpi-card">
          <div className="kpi-head">
            <span className="kpi-label">{language === 'hi' ? 'जीपीएस सत्यापित संपत्तियां' : 'GPS Verified Works'}</span>
            <span className="kpi-icon teal"><CheckCircle2 size={18} /></span>
          </div>
          <strong className="kpi-val">{statsSummary.withCoordinates}</strong>
          <span className="kpi-delta positive">{language === 'hi' ? 'सटीक मानचित्रित' : 'Geo-coordinate mapped'}</span>
        </div>
      </div>

      {/* Interactive Report Generator Card */}
      <div className="card" style={{ padding: '24px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileCheck2 size={18} style={{ color: '#00c675' }} />
          {language === 'hi' ? 'कस्टम रिपोर्ट जनरेटर' : 'Custom Report Generator'}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              {language === 'hi' ? 'रिपोर्ट का प्रकार' : 'Report Type'}
            </label>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid var(--line)', padding: '0 12px', background: '#fff', fontSize: '12px' }}
            >
              <option value="mpr">{language === 'hi' ? 'मासिक प्रगति प्रतिवेदन (MPR)' : 'Monthly Progress Report (MPR)'}</option>
              <option value="financial">{language === 'hi' ? 'वित्तीय स्वीकृति एवं व्यय लेखा' : 'Financial Sanctions vs. Expenditure'}</option>
              <option value="delayed">{language === 'hi' ? 'विलंबित परियोजनाओं की समीक्षा' : 'Delayed Projects Remedial Audit'}</option>
              <option value="geo">{language === 'hi' ? 'जीपीएस एवं स्थल निरीक्षण पंजी' : 'Geo-tagged Field Inspection Log'}</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              {language === 'hi' ? 'वित्तीय वर्ष' : 'Financial Year'}
            </label>
            <select
              value={selectedFY}
              onChange={(e) => setSelectedFY(e.target.value)}
              style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid var(--line)', padding: '0 12px', background: '#fff', fontSize: '12px' }}
            >
              <option value="2024-25">FY 2024–25 (Current)</option>
              <option value="2023-24">FY 2023–24</option>
              <option value="all">All Financial Years</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              {language === 'hi' ? 'विभाग' : 'Department'}
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid var(--line)', padding: '0 12px', background: '#fff', fontSize: '12px' }}
            >
              <option value="all">{language === 'hi' ? 'सभी विभाग' : 'All Departments'}</option>
              <option value="Rural Works">Rural Works Department</option>
              <option value="Public Health">Public Health Engineering (DWSD)</option>
              <option value="Education">School Education & Literacy</option>
              <option value="Health & Family">Health & Family Welfare</option>
              <option value="Renewable Energy">Renewable Energy (JREDA)</option>
              <option value="Water Resources">Water Resources Department</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={handleGenerateReport}
          disabled={generating}
          style={{ height: '42px', padding: '0 24px', background: '#00c675' }}
        >
          <Download size={16} />
          <span>{generating ? (language === 'hi' ? 'प्रतिवेदन तैयार हो रहा है...' : 'Generating Report...') : (language === 'hi' ? 'प्रतिवेदन जनरेट एवं डाउनलोड करें' : 'Generate & Download Report')}</span>
        </button>
      </div>

      {/* Available Official Reports Catalog */}
      <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 14px' }}>
        {language === 'hi' ? 'आधिकारिक राज्य प्रतिवेदन सूची' : 'Official State Reports Catalog'}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {reportsCatalog.map((rep) => {
          const Icon = rep.icon

          return (
            <div key={rep.id} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className={`pill ${rep.tone === 'blue' ? 'blue' : rep.tone === 'green' ? 'green' : 'muted'}`} style={{ fontSize: '9px', fontWeight: 700 }}>
                    {rep.type}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{rep.size}</span>
                </div>

                <h4 style={{ fontSize: '13.5px', fontWeight: 700, margin: '0 0 6px', color: '#0f172a' }}>
                  {language === 'hi' ? rep.titleHi : rep.titleEn}
                </h4>

                <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.5, margin: '0 0 12px' }}>
                  {language === 'hi' ? rep.descHi : rep.descEn}
                </p>

                <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '16px', background: '#f8fafc', padding: '6px 10px', borderRadius: '6px' }}>
                  <strong>{language === 'hi' ? 'अवधि:' : 'Period:'}</strong> {rep.period} • <em>{rep.date}</em>
                </div>
              </div>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  alert(`Downloading ${rep.titleEn} (${rep.type})`)
                }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Download size={14} />
                <span>{language === 'hi' ? 'डाउनलोड करें' : 'Download Document'}</span>
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

