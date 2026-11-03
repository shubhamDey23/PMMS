'use client'

import { useState, useMemo } from 'react'
import {
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Filter,
  IndianRupee,
  Layers,
  MapPin,
  PieChart,
  Printer,
  Search,
  TrendingUp,
} from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { useTranslation } from '@/context/LanguageContext'
import { dmftDatabase } from '@/lib/services/dmft-database.service'
import type { DMFTProject, RamgarhBlock } from '@/types/dmft'

export default function ReportsPage() {
  const { t, language, formatCurrency } = useTranslation()
  const allProjects = useMemo(() => dmftDatabase.getAllProjects(), [])
  const kpis = useMemo(() => dmftDatabase.getDashboardKPIs(), [])
  const pendency = useMemo(() => dmftDatabase.getPendencyList(), [])

  // Filters
  const [selectedReportId, setSelectedReportId] = useState('1')
  const [selectedBlock, setSelectedBlock] = useState('All')
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedFY, setSelectedFY] = useState('All')
  const [exportNotice, setExportNotice] = useState<string | null>(null)

  // 14 Official Reports from RFP Section III, Module 7
  const officialReports = [
    { id: '1', titleEn: '1. Project Status Report', titleHi: '1. परियोजना स्थिति प्रतिवेदन', category: 'General' },
    { id: '2', titleEn: '2. Block-wise Project Report', titleHi: '2. प्रखंड-वार परियोजना प्रतिवेदन', category: 'Geographic' },
    { id: '3', titleEn: '3. Department-wise Project Report', titleHi: '3. विभाग-वार परियोजना प्रतिवेदन', category: 'Administrative' },
    { id: '4', titleEn: '4. Financial Year-wise Report', titleHi: '4. वित्तीय वर्ष-वार प्रतिवेदन', category: 'Financial' },
    { id: '5', titleEn: '5. Physical Progress Report', titleHi: '5. भौतिक प्रगति प्रतिवेदन', category: 'Monitoring' },
    { id: '6', titleEn: '6. Financial Progress & UC Report', titleHi: '6. वित्तीय प्रगति एवं उपयोगिता प्रमाण पत्र', category: 'Financial' },
    { id: '7', titleEn: '7. Delayed Project Report', titleHi: '7. विलंबित परियोजना प्रतिवेदन', category: 'Monitoring' },
    { id: '8', titleEn: '8. Pending Approval Report', titleHi: '8. लंबित स्वीकृति प्रतिवेदन', category: 'Administrative' },
    { id: '9', titleEn: '9. Tender Status Report', titleHi: '9. निविदा स्थिति प्रतिवेदन', category: 'Tender' },
    { id: '10', titleEn: '10. Inspection & Quality Report', titleHi: '10. निरीक्षण एवं गुणवत्ता प्रतिवेदन', category: 'Quality' },
    { id: '11', titleEn: '11. Payment Requisition Report', titleHi: '11. भुगतान अधियाचन प्रतिवेदन', category: 'Financial' },
    { id: '12', titleEn: '12. Completed Project Report', titleHi: '12. पूर्ण परियोजना प्रतिवेदन', category: 'Closure' },
    { id: '13', titleEn: '13. Handover & Commissioning Report', titleHi: '13. हस्तांतरण एवं लोकार्पण प्रतिवेदन', category: 'Closure' },
    { id: '14', titleEn: '14. Executive Summary Report', titleHi: '14. मुख्य कार्यकारी सारांश प्रतिवेदन', category: 'Executive' },
  ]

  // Filtered dataset
  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      if (selectedBlock !== 'All' && p.block !== selectedBlock) return false
      if (selectedDept !== 'All' && p.department !== selectedDept) return false
      if (selectedFY !== 'All' && p.financialYear !== selectedFY) return false

      if (selectedReportId === '7') return p.status === 'Delayed' || p.health === 'Delayed'
      if (selectedReportId === '12') return p.status === 'Completed'
      if (selectedReportId === '13') return p.isHandedOver || p.status === 'Completed'
      return true
    })
  }, [allProjects, selectedBlock, selectedDept, selectedFY, selectedReportId])

  const selectedReportMeta = officialReports.find((r) => r.id === selectedReportId) || officialReports[0]

  // CSV Exporter
  const handleExportCSV = () => {
    const headers = ['Project ID', 'Project Name', 'Block', 'Panchayat', 'Department', 'Current Stage', 'Status', 'Cost (INR)', 'Physical %']
    const csvRows = [headers.join(',')]

    filteredProjects.forEach((p) => {
      const row = [
        `"${p.id}"`,
        `"${p.nameEn.replace(/"/g, '""')}"`,
        `"${p.block}"`,
        `"${p.panchayat}"`,
        `"${p.department.replace(/"/g, '""')}"`,
        `"${p.currentStage}"`,
        `"${p.status}"`,
        p.approvedAmount || p.estimatedCost,
        p.physicalProgress,
      ]
      csvRows.push(row.join(','))
    })

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `DMFT_Ramgarh_Report_${selectedReportId}_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setExportNotice(language === 'hi' ? 'सीएसवी प्रतिवेदन सफलतापूर्वक डाउनलोड हुआ!' : 'CSV report exported successfully!')
    setTimeout(() => setExportNotice(null), 4000)
  }

  const handleExportExcel = () => {
    handleExportCSV()
    setExportNotice(language === 'hi' ? 'एक्सेल प्रारूप (CSV) तैयार किया गया!' : 'Excel-compatible report generated!')
    setTimeout(() => setExportNotice(null), 4000)
  }

  return (
    <>
      <PageIntro
        eyebrow="DMFT Ramgarh / Reports &amp; MIS (RFP Section III, Module 7)"
        title={language === 'hi' ? 'एमआईएस एवं आधिकारिक प्रतिवेदन केंद्र' : 'MIS & Official Reporting Center'}
        subtitle={
          language === 'hi'
            ? 'रामगढ़ जिले के 6 प्रखंडों के लिए निविदा अनुभाग III के अनुसार 14 अनिवार्य वैधानिक प्रतिवेदन।'
            : 'Access all 14 statutory RFP reports with multi-criteria filtering, live summaries, and export capabilities.'
        }
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="secondary-btn" onClick={handleExportCSV}>
              <Download size={15} />
              <span>Export CSV</span>
            </button>
            <button type="button" className="secondary-btn" onClick={handleExportExcel}>
              <FileSpreadsheet size={15} />
              <span>Export Excel</span>
            </button>
            <button type="button" className="primary-btn" onClick={() => window.print()}>
              <Printer size={15} />
              <span>Print / PDF</span>
            </button>
          </div>
        }
      />

      {exportNotice && (
        <div className="form-success-banner" style={{ marginBottom: '16px' }}>
          <CheckCircle2 size={16} />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* KPI Summary strip */}
      <div className="kpi-grid" style={{ marginBottom: '20px' }}>
        <div className="card" style={{ padding: '14px' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Total Projects in View</span>
          <h3 style={{ margin: '4px 0 0', fontSize: '20px', color: 'var(--blue)' }}>{filteredProjects.length}</h3>
        </div>
        <div className="card" style={{ padding: '14px' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Sanctioned Cost</span>
          <h3 style={{ margin: '4px 0 0', fontSize: '20px', color: 'var(--green)' }}>
            {formatCurrency(filteredProjects.reduce((acc, p) => acc + (p.approvedAmount || p.estimatedCost), 0))}
          </h3>
        </div>
        <div className="card" style={{ padding: '14px' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Total Expenditure</span>
          <h3 style={{ margin: '4px 0 0', fontSize: '20px', color: '#6366f1' }}>
            {formatCurrency(filteredProjects.reduce((acc, p) => acc + p.expenditure, 0))}
          </h3>
        </div>
        <div className="card" style={{ padding: '14px' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Average Progress</span>
          <h3 style={{ margin: '4px 0 0', fontSize: '20px', color: '#f59e0b' }}>
            {Math.round(filteredProjects.reduce((acc, p) => acc + p.physicalProgress, 0) / (filteredProjects.length || 1))}%
          </h3>
        </div>
      </div>

      {/* Report Selection & Multi-Parameter Filter Card */}
      <div className="card" style={{ padding: '18px', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Filter size={18} className="text-blue" />
          <strong style={{ fontSize: '13.5px' }}>
            {language === 'hi' ? 'प्रतिवेदन प्रकार एवं मापदंड फिल्टर' : 'Select Report & Apply Filters'}
          </strong>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Official RFP Report (1 to 14)
            </label>
            <select
              value={selectedReportId}
              onChange={(e) => setSelectedReportId(e.target.value)}
              style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
            >
              {officialReports.map((r) => (
                <option key={r.id} value={r.id}>
                  {language === 'hi' ? r.titleHi : r.titleEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Block (Ramgarh District)
            </label>
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
            >
              <option value="All">All Blocks (सभी 6 प्रखंड)</option>
              <option value="Mandu">Mandu / मांडू</option>
              <option value="Patratu">Patratu / पतरातू</option>
              <option value="Ramgarh">Ramgarh / रामगढ़</option>
              <option value="Gola">Gola / गोला</option>
              <option value="Chitarpur">Chitarpur / चितरपुर</option>
              <option value="Dulmi">Dulmi / दुलमी</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Department
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
            >
              <option value="All">All Departments</option>
              <option value="Drinking Water & Sanitation Dept (DWSD)">Drinking Water &amp; Sanitation (DWSD)</option>
              <option value="Building Construction Department">Building Construction Department</option>
              <option value="Road Construction Department (RCD)">Road Construction Department (RCD)</option>
              <option value="Water Resources Department (WRD)">Water Resources Department (WRD)</option>
              <option value="School Education & Literacy Dept">School Education &amp; Literacy Dept</option>
              <option value="Rural Development & JREDA">Rural Development &amp; JREDA</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Financial Year
            </label>
            <select
              value={selectedFY}
              onChange={(e) => setSelectedFY(e.target.value)}
              style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)' }}
            >
              <option value="All">All Financial Years</option>
              <option value="2024–25">FY 2024–25</option>
              <option value="2023–24">FY 2023–24</option>
              <option value="2022–23">FY 2022–23</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Data Table Preview */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px' }}>
              {language === 'hi' ? selectedReportMeta.titleHi : selectedReportMeta.titleEn}
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
              Official Ramgarh District DMFT Record • Generated on {new Date().toLocaleDateString('en-GB')}
            </span>
          </div>
          <span className="badge badge--neutral">
            {filteredProjects.length} records matching criteria
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="projects-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid var(--line)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Project ID</th>
                <th style={{ padding: '10px' }}>Scheme Name</th>
                <th style={{ padding: '10px' }}>Block</th>
                <th style={{ padding: '10px' }}>Department</th>
                <th style={{ padding: '10px' }}>Current Stage</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Sanctioned Cost</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '10px', fontWeight: 600, color: 'var(--blue)' }}>{p.id}</td>
                    <td style={{ padding: '10px', maxWidth: '280px' }}>
                      <strong>{language === 'hi' ? p.nameHi : p.nameEn}</strong>
                      <div style={{ fontSize: '10.5px', color: 'var(--muted)' }}>{p.panchayat}, {p.village}</div>
                    </td>
                    <td style={{ padding: '10px' }}>{p.block}</td>
                    <td style={{ padding: '10px', fontSize: '11px' }}>{p.department}</td>
                    <td style={{ padding: '10px', fontSize: '11px' }}>
                      <span className="badge badge--teal">{p.currentStage}</span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span className={`badge ${p.status === 'Completed' ? 'badge--green' : p.status === 'Delayed' ? 'badge--red' : p.status === 'Ongoing' ? 'badge--blue' : 'badge--amber'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 600 }}>
                      {formatCurrency(p.approvedAmount || p.estimatedCost)}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 700 }}>
                      {p.physicalProgress}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)' }}>
                    No projects found for the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
