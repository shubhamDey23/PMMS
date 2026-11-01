'use client'

import { useState } from 'react'
import {
  AlertCircle,
  AlertTriangle,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileText,
  FolderKanban,
  History,
  IndianRupee,
  Layers,
  MapPin,
  ShieldAlert,
  User,
  X,
} from 'lucide-react'
import type { Project } from '@/types/project'
import { useTranslation } from '@/context/LanguageContext'
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
  const [tab, setTab] = useState<'Overview' | 'Financials' | 'Progress' | 'Workflow' | 'Documents' | 'Activity'>('Overview')

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
  const documents = project.documents || []
  const activityLog = project.activityLog || []

  const tabs: Array<{ id: typeof tab; label: string }> = [
    { id: 'Overview', label: t.drawer.overview },
    { id: 'Financials', label: t.drawer.financials },
    { id: 'Progress', label: t.drawer.progress },
    { id: 'Workflow', label: t.drawer.stage },
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
            <span>{publicMode ? t.drawer.publicProfile : t.drawer.projectDetails}</span>
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
              {project.location.district ? ` · ${project.location.district}` : ''}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="drawer-tabs">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                className={tab === item.id ? 'active' : ''}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {tab === 'Overview' && (
            <div className="drawer-content">
              {/* Progress Gauges */}
              <div className="drawer-progress">
                <div>
                  <span>{t.stats.physicalProgress}</span>
                  <strong>{project.physicalProgress}%</strong>
                  <div className="progress-track">
                    <i style={{ width: `${project.physicalProgress}%` }} />
                  </div>
                </div>
                <div>
                  <span>{t.stats.financialProgress}</span>
                  <strong>{project.financialProgress}%</strong>
                  <div className="progress-track financial">
                    <i style={{ width: `${project.financialProgress}%` }} />
                  </div>
                </div>
              </div>

              {/* Pending Action Alert if exists */}
              {project.pendingAction && (
                <div className="drawer-alert-card">
                  <AlertTriangle size={18} />
                  <div>
                    <strong>{t.drawer.pendingAction}</strong>
                    <p>{project.pendingAction}</p>
                  </div>
                </div>
              )}

              {/* Basic Information Grid */}
              <h3>{t.drawer.projectInfo}</h3>
              <div className="info-grid">
                <div>
                  <span>{t.table.department}</span>
                  <strong>{project.department}</strong>
                </div>
                <div>
                  <span>{t.drawer.responsibleOfficer}</span>
                  <strong>{project.responsibleOfficer || 'Assigned Officer'}</strong>
                </div>
                <div>
                  <span>{t.filter.fyLabel}</span>
                  <strong>{project.financialYear}</strong>
                </div>
                <div>
                  <span>{t.table.approvedAmount}</span>
                  <strong>{formatCurrency(financials.approvedAmount)}</strong>
                </div>
                <div>
                  <span>{t.drawer.startDate}</span>
                  <strong>{formatDate(project.plannedStartDate)}</strong>
                </div>
                <div>
                  <span>{t.drawer.expectedCompletion}</span>
                  <strong>{formatDate(project.plannedCompletionDate)}</strong>
                </div>
                <div>
                  <span>{t.drawer.gpsCoordinates}</span>
                  <strong>
                    {project.location.latitude && project.location.longitude
                      ? `${project.location.latitude.toFixed(4)}° N, ${project.location.longitude.toFixed(4)}° E`
                      : t.drawer.noCoordinates}
                  </strong>
                </div>
                <div>
                  <span>{t.drawer.stage}</span>
                  <strong>{project.stage}</strong>
                </div>
              </div>

              {/* Scope & Description */}
              <h3>{t.drawer.implSummary}</h3>
              <p className="detail-copy">{projectDesc}</p>

              {/* Milestones */}
              <h3>{t.drawer.recentMilestones}</h3>
              <div className="timeline">
                {milestones.map((m, idx) => (
                  <div key={idx} className={m.state === 'active' ? 'current' : ''}>
                    <i>
                      {m.state === 'done' ? (
                        <Check size={12} />
                      ) : m.state === 'active' ? (
                        <Clock3 size={12} />
                      ) : (
                        <span className="dot-future" />
                      )}
                    </i>
                    <span>
                      <strong>{getLocalizedText(m.label, m.labelHi)}</strong>
                      <small>{m.date}</small>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FINANCIALS */}
          {tab === 'Financials' && (
            <div className="drawer-content">
              <div className="big-money">
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

              <div className="card" style={{ padding: '16px', marginBottom: '18px' }}>
                <div className="util-row" style={{ margin: '0 0 8px' }}>
                  <span>{t.stats.financialUtilization}</span>
                  <strong>{financials.utilization}%</strong>
                </div>
                <div className="progress-track large">
                  <span style={{ width: `${Math.min(100, financials.utilization)}%` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px' }}>
                  <span>{t.drawer.availableBalance}:</span>
                  <strong style={{ color: 'var(--green)' }}>{formatCurrency(financials.balance)}</strong>
                </div>
              </div>

              <h3>Financial Verification</h3>
              <p className="detail-copy">
                Funds are disbursed through treasury direct-benefit transfers tied to technical inspection verification stages.
              </p>
            </div>
          )}

          {/* TAB 3: PHYSICAL PROGRESS */}
          {tab === 'Progress' && (
            <div className="drawer-content">
              <div className="card" style={{ padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
                <div className="public-ring" style={{ margin: '0 auto 12px' }}>
                  <div>
                    <strong>{project.physicalProgress}%</strong>
                    <small>{t.common.completed}</small>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '11px', marginTop: '12px' }}>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block' }}>{t.stats.targetProgress}</span>
                    <strong>85%</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block' }}>{t.stats.achievedProgress}</span>
                    <strong>{project.physicalProgress}%</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block' }}>{t.drawer.health}</span>
                    <strong style={{ color: project.health === 'Delayed' ? 'var(--red)' : 'var(--green)' }}>
                      {project.health}
                    </strong>
                  </div>
                </div>
              </div>

              <h3>{t.drawer.timeline}</h3>
              <div className="timeline">
                {milestones.map((m, idx) => (
                  <div key={idx} className={m.state === 'active' ? 'current' : ''}>
                    <i>
                      {m.state === 'done' ? (
                        <Check size={12} />
                      ) : (
                        <Clock3 size={12} />
                      )}
                    </i>
                    <span>
                      <strong>{getLocalizedText(m.label, m.labelHi)}</strong>
                      <small>{m.date} · State: {m.state.toUpperCase()}</small>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WORKFLOW & ADMINISTRATIVE */}
          {tab === 'Workflow' && (
            <div className="drawer-content">
              <div className="card" style={{ padding: '16px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{t.drawer.stage}</span>
                    <h3 style={{ margin: '4px 0 0', fontSize: '15px' }}>{project.stage}</h3>
                  </div>
                  <span className="badge badge--teal">{project.status}</span>
                </div>
              </div>

              <div className="info-grid">
                <div>
                  <span>Implementing Agency</span>
                  <strong>{project.department}</strong>
                </div>
                <div>
                  <span>Contractor Name</span>
                  <strong>{project.contractor || 'Not Assigned'}</strong>
                </div>
                <div>
                  <span>Approval Reference</span>
                  <strong>AA/PD/2024/418</strong>
                </div>
                <div>
                  <span>Sanction Date</span>
                  <strong>{formatDate(project.approvalDate)}</strong>
                </div>
              </div>

              {project.remarks && (
                <>
                  <h3>{t.drawer.remarks}</h3>
                  <p className="detail-copy">{project.remarks}</p>
                </>
              )}
            </div>
          )}

          {/* TAB 5: SUPPORTING DOCUMENTS */}
          {tab === 'Documents' && (
            <div className="drawer-content">
              <h3>{t.drawer.supportingDocs} ({documents.length})</h3>
              {documents.length > 0 ? (
                <div className="drawer-doc-list">
                  {documents.map((doc) => (
                    <div key={doc.id} className="drawer-doc-item card">
                      <FileText size={22} className="text-green" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <strong className="doc-name">{doc.name}</strong>
                        <span className="doc-meta">{doc.type} · {doc.size} · {doc.date}</span>
                      </div>
                      <button
                        type="button"
                        className="secondary-btn"
                        style={{ height: '30px', padding: '0 8px' }}
                        onClick={() => alert(`Viewing document: ${doc.name}`)}
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
                  <p>No verified digital documents have been uploaded for this project yet.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: ACTIVITY LOG */}
          {tab === 'Activity' && (
            <div className="drawer-content">
              <h3>{t.drawer.activityHistory}</h3>
              {activityLog.length > 0 ? (
                <div className="timeline">
                  {activityLog.map((act) => (
                    <div key={act.id}>
                      <i><History size={12} /></i>
                      <span>
                        <strong>{act.action}</strong>
                        <small>{act.by} · {act.date}</small>
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
