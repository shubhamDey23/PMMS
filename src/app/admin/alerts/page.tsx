'use client'

import { useState, useMemo } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Download,
  Filter,
  ShieldAlert,
} from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { SectionHeader } from '@/components/SectionHeader'
import { useAdminDrawer } from '@/context/AdminDrawerContext'
import { useTranslation } from '@/context/LanguageContext'
import { dmftDatabase } from '@/lib/services/dmft-database.service'
import { projectService } from '@/lib/services/project.service'

export default function AdminAlertsPage() {
  const { openProject } = useAdminDrawer()
  const { t, language } = useTranslation()

  const [severityFilter, setSeverityFilter] = useState<string>('All')
  const [selectedBlock, setSelectedBlock] = useState<string>('All')

  const pendencyList = useMemo(() => dmftDatabase.getPendencyList(), [])

  const filteredItems = useMemo(() => {
    return pendencyList.filter((item) => {
      if (severityFilter !== 'All' && item.delayStatus !== severityFilter) return false
      return true
    })
  }, [pendencyList, severityFilter])

  const handleRowClick = (projectId: string) => {
    const proj = projectService.getProjectById(projectId)
    if (proj) openProject(proj)
  }

  const handleExportCSV = () => {
    const headers = ['Project ID', 'Scheme Name', 'Stage', 'Pending Checkpoint', 'Department', 'Responsible Officer', 'Pending Since', 'Days Pending', 'Delay Status', 'Required Next Action']
    const rows = [headers.join(',')]

    filteredItems.forEach((item) => {
      rows.push([
        `"${item.projectId}"`,
        `"${item.projectNameEn.replace(/"/g, '""')}"`,
        `"${item.stage}"`,
        `"${item.checkpoint}"`,
        `"${item.department}"`,
        `"${item.responsibleOfficer}"`,
        `"${item.pendingSince}"`,
        item.daysPending,
        `"${item.delayStatus}"`,
        `"${item.requiredAction.replace(/"/g, '""')}"`,
      ].join(','))
    })

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `DMFT_Ramgarh_Pendency_Report_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <PageIntro
        eyebrow="DMFT Ramgarh / Statutory Pendency &amp; Delay Checkpoints (RFP Module 5)"
        title={language === 'hi' ? 'लंबित कार्य एवं विलंब निगरानी' : 'Delay & Statutory Pendency Monitoring'}
        subtitle={
          language === 'hi'
            ? 'निविदा के अनुभाग III मॉड्यूल 5 के तहत 11 अनिवार्य वैधानिक चौकियों पर समय-सीमा एवं विलंब का स्वतः विश्लेषण।'
            : 'Automated monitoring of 11 statutory checkpoints across administrative, technical, and execution stages.'
        }
        actions={
          <button type="button" className="secondary-btn" onClick={handleExportCSV}>
            <Download size={15} />
            <span>{language === 'hi' ? 'लंबित रिपोर्ट निर्यात (CSV)' : 'Export Pendency CSV'}</span>
          </button>
        }
      />

      {/* Delay Threshold Summary Cards */}
      <div className="kpi-grid" style={{ marginBottom: '20px' }}>
        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #10b981' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>On Track (&lt; 15 Days)</span>
          <h3 style={{ margin: '4px 0 0', fontSize: '20px', color: '#10b981' }}>
            {pendencyList.filter((p) => p.delayStatus === 'On Track').length}
          </h3>
        </div>
        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #f59e0b' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Approaching Deadline (15–30 Days)</span>
          <h3 style={{ margin: '4px 0 0', fontSize: '20px', color: '#f59e0b' }}>
            {pendencyList.filter((p) => p.delayStatus === 'Warning').length}
          </h3>
        </div>
        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #f97316' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Delayed (30–60 Days)</span>
          <h3 style={{ margin: '4px 0 0', fontSize: '20px', color: '#f97316' }}>
            {pendencyList.filter((p) => p.delayStatus === 'Delayed').length}
          </h3>
        </div>
        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #ef4444' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Critical Delay (&gt; 60 Days)</span>
          <h3 style={{ margin: '4px 0 0', fontSize: '20px', color: '#ef4444' }}>
            {pendencyList.filter((p) => p.delayStatus === 'Critical').length}
          </h3>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card" style={{ padding: '14px 18px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} className="text-blue" />
          <strong style={{ fontSize: '13px' }}>Filter by Severity:</strong>
        </div>
        <div className="segmented">
          {['All', 'Warning', 'Delayed', 'Critical'].map((sev) => (
            <button
              key={sev}
              type="button"
              className={severityFilter === sev ? 'active' : ''}
              onClick={() => setSeverityFilter(sev)}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* 11 Checkpoints Table */}
      <div className="card alert-table">
        <SectionHeader
          title={language === 'hi' ? '11 वैधानिक चौकियों की स्थिति' : 'Active Pendency Queue across 11 Checkpoints'}
          subtitle={
            language === 'hi'
              ? 'प्रशासनिक स्वीकृति, डीपीआर, निविदा, एकरारनामा, कार्य प्रारंभ, प्रगति, निरीक्षण, एवं हैंडओवर।'
              : 'Mandatory RFP checkpoints requiring immediate officer action.'
          }
        />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid var(--line)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Severity</th>
                <th style={{ padding: '10px' }}>Project ID &amp; Name</th>
                <th style={{ padding: '10px' }}>Pending Checkpoint</th>
                <th style={{ padding: '10px' }}>Department &amp; Officer</th>
                <th style={{ padding: '10px' }}>Days Pending</th>
                <th style={{ padding: '10px' }}>Required Next Action</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item.projectId)}
                  style={{ cursor: 'pointer', borderBottom: '1px solid var(--line)' }}
                >
                  <td style={{ padding: '10px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background:
                          item.delayStatus === 'Critical'
                            ? '#fee2e2'
                            : item.delayStatus === 'Delayed'
                            ? '#ffedd5'
                            : '#fef3c7',
                        color:
                          item.delayStatus === 'Critical'
                            ? '#991b1b'
                            : item.delayStatus === 'Delayed'
                            ? '#9a3412'
                            : '#92400e',
                      }}
                    >
                      {item.delayStatus}
                    </span>
                  </td>
                  <td style={{ padding: '10px', maxWidth: '240px' }}>
                    <strong style={{ color: 'var(--blue)' }}>{item.projectId}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text)' }}>
                      {language === 'hi' ? item.projectNameHi : item.projectNameEn}
                    </div>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <span className="badge badge--teal" style={{ whiteSpace: 'normal', textAlign: 'left' }}>
                      {language === 'hi' ? item.checkpointHi : item.checkpoint}
                    </span>
                  </td>
                  <td style={{ padding: '10px', fontSize: '11px' }}>
                    <strong>{item.department}</strong>
                    <div style={{ color: 'var(--muted)' }}>{item.responsibleOfficer}</div>
                  </td>
                  <td style={{ padding: '10px', fontWeight: 700, color: item.daysPending > 60 ? '#dc2626' : '#d97706' }}>
                    {item.daysPending} days
                  </td>
                  <td style={{ padding: '10px', fontSize: '11px', maxWidth: '220px' }}>
                    {language === 'hi' ? item.requiredActionHi : item.requiredAction}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button type="button" className="text-action">
                      {language === 'hi' ? 'समीक्षा' : 'Review'} <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
