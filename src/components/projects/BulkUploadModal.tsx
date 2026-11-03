'use client'

import { useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
  Upload,
  X,
} from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'
import { dmftDatabase } from '@/lib/services/dmft-database.service'
import type { RamgarhBlock } from '@/types/dmft'

export function BulkUploadModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}) {
  const { language } = useTranslation()
  const [csvText, setCsvText] = useState('')
  const [loading, setLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [previewData, setPreviewData] = useState<any[] | null>(null)

  if (!isOpen) return null

  const handleDownloadTemplate = () => {
    const headers = 'nameEn,nameHi,block,panchayat,village,category,department,estimatedCost,financialYear'
    const sample1 = 'Mandu Health Sub-Centre Renovation,मांडू स्वास्थ्य उप-केंद्र जीर्णोद्धार,Mandu,Kuju,Karma,Health & Family Welfare,Building Construction Department,3500000,2024–25'
    const sample2 = 'Patratu Lake Pathway & Solar Street Lights,पतरातू लेक पाथवे एवं सोलर स्ट्रीट लाइट,Patratu,Patratu South,PTPS,Roads & Bridges,Rural Works Department,4800000,2024–25'
    const sample3 = 'Dulmi Solar Deep Tube Well,दुलमी सौर डीप ट्यूबवेल,Dulmi,Potanga,Potanga,Drinking Water & Sanitation,Drinking Water & Sanitation Dept (DWSD),2200000,2024–25'

    const csvContent = [headers, sample1, sample2, sample3].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'DMFT_Ramgarh_Project_Upload_Template.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const parseCsv = (text: string) => {
    const lines = text.trim().split('\n').filter((l) => l.trim().length > 0)
    if (lines.length <= 1) return []
    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''))

    const rows: any[] = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim().replace(/^"|"$/g, ''))
      const obj: any = {}
      headers.forEach((h, idx) => {
        obj[h] = values[idx] || ''
      })
      rows.push(obj)
    }
    return rows
  }

  const handleValidateAndPreview = () => {
    setStatusMsg(null)
    const rows = parseCsv(csvText)
    if (rows.length === 0) {
      setStatusMsg({
        type: 'error',
        text: language === 'hi' ? 'कृपया मान्य सीएसवी डेटा दर्ज करें।' : 'Please enter valid CSV data with header row.',
      })
      return
    }

    setPreviewData(rows)
    setStatusMsg({
      type: 'success',
      text: language === 'hi'
        ? `${rows.length} पंक्तियाँ सत्यापित। कृपया पूर्वावलोकन की जांच कर आयात की पुष्टि करें।`
        : `${rows.length} records parsed successfully. Review preview and confirm import.`,
    })
  }

  const handleCommitImport = () => {
    if (!previewData || previewData.length === 0) return
    setLoading(true)

    try {
      const adminUser = dmftDatabase.getUsers()[0]
      let imported = 0

      previewData.forEach((row) => {
        const cost = Number(row.estimatedCost) || 2500000
        dmftDatabase.createProject(
          {
            nameEn: row.nameEn || 'Bulk Imported Scheme',
            nameHi: row.nameHi || row.nameEn || 'थोक आयातित योजना',
            block: (row.block as RamgarhBlock) || 'Mandu',
            panchayat: row.panchayat || 'Central',
            village: row.village || '',
            category: row.category || 'Roads & Bridges',
            department: row.department || 'Rural Works Department',
            estimatedCost: cost,
            approvedAmount: cost,
            financialYear: row.financialYear || '2024–25',
            currentStage: 'Stage 1: Work Request & Recommendation',
            status: 'Pending',
          },
          adminUser
        )
        imported++
      })

      setStatusMsg({
        type: 'success',
        text: language === 'hi'
          ? `${imported} परियोजनाएं रामगढ़ डीएमएफटी पोर्टल में सफलतापूर्वक आयात की गईं!`
          : `Successfully imported ${imported} projects into DMFT Ramgarh portal!`,
      })

      setCsvText('')
      setPreviewData(null)

      if (onSuccess) onSuccess()
      setTimeout(() => {
        onClose()
      }, 1800)
    } catch (err: any) {
      setStatusMsg({
        type: 'error',
        text: err.message || 'Import failed.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="public-search-modal-overlay" onClick={onClose}>
      <div className="public-search-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <div className="public-search-modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileSpreadsheet size={20} className="text-green" />
            <strong style={{ fontSize: '15px' }}>
              {language === 'hi' ? 'थोक परियोजना आयात (CSV / Excel)' : 'Bulk Project Upload & Import (CSV / Excel)'}
            </strong>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--muted)' }}>
            Upload or paste standardized project records for bulk sanctioning across the 6 blocks of Ramgarh District.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600 }}>Paste CSV Content (or use template below):</span>
            <button
              type="button"
              className="secondary-btn"
              onClick={handleDownloadTemplate}
              style={{ fontSize: '11px', height: '28px' }}
            >
              <Download size={13} />
              <span>Download Official CSV Template</span>
            </button>
          </div>

          <textarea
            rows={5}
            placeholder="nameEn,nameHi,block,panchayat,village,category,department,estimatedCost,financialYear&#10;Mandu Health Sub-Centre Renovation,मांडू स्वास्थ्य उप-केंद्र,Mandu,Kuju,Karma,Health & Family Welfare,Building Construction Department,3500000,2024–25"
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '11.5px',
              fontFamily: 'monospace',
              borderRadius: '6px',
              border: '1px solid var(--line)',
              marginBottom: '12px',
            }}
          />

          {statusMsg && (
            <div
              className={statusMsg.type === 'success' ? 'form-success-banner' : 'form-error-banner'}
              style={{ marginBottom: '14px' }}
            >
              {statusMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {previewData && previewData.length > 0 && (
            <div style={{ marginBottom: '14px', maxHeight: '160px', overflowY: 'auto', border: '1px solid var(--line)', borderRadius: '6px' }}>
              <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--line)' }}>
                  <tr>
                    <th style={{ padding: '6px' }}>Name</th>
                    <th style={{ padding: '6px' }}>Block</th>
                    <th style={{ padding: '6px' }}>Cost</th>
                    <th style={{ padding: '6px' }}>Dept</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.slice(0, 5).map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '6px' }}>{r.nameEn}</td>
                      <td style={{ padding: '6px' }}>{r.block}</td>
                      <td style={{ padding: '6px' }}>₹{r.estimatedCost}</td>
                      <td style={{ padding: '6px' }}>{r.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="secondary-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            {!previewData ? (
              <button type="button" className="primary-btn" onClick={handleValidateAndPreview}>
                <Upload size={14} />
                <span>Parse &amp; Validate Data</span>
              </button>
            ) : (
              <button type="button" className="primary-btn" onClick={handleCommitImport} disabled={loading}>
                {loading ? <Loader2 size={14} className="spinner-icon" /> : <CheckCircle2 size={14} />}
                <span>Confirm &amp; Import {previewData.length} Schemes</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

