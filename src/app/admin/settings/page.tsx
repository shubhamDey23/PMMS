'use client'

import { useState, useMemo } from 'react'
import {
  CheckCircle2,
  Clock,
  History,
  KeyRound,
  Lock,
  Mail,
  Phone,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
  Wrench,
  Palette,
} from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { ThemeSelector } from '@/components/ThemeSelector'
import { useTranslation } from '@/context/LanguageContext'
import { dmftDatabase } from '@/lib/services/dmft-database.service'
import type { DMFTUserRole } from '@/types/dmft'

export default function AdminSettingsPage() {
  const { language } = useTranslation()
  const users = useMemo(() => dmftDatabase.getUsers(), [])
  const auditLogs = useMemo(() => dmftDatabase.getAuditLogs(), [])

  const [activeTab, setActiveTab] = useState<'users' | 'matrix' | 'audit' | 'security' | 'theme'>('theme')

  const permissionsMatrix: Array<{
    module: string
    roles: Record<DMFTUserRole, boolean>
  }> = [
    {
      module: 'Executive Dashboard & GIS Map',
      roles: {
        district_admin: true,
        dmft_ceo: true,
        nodal_officer: true,
        senior_officer: true,
        execution_dept: true,
        inspection_team: true,
        deo: true,
        monitoring_user: true,
        sys_admin: true,
      },
    },
    {
      module: 'Stage 1: Work Request Entry',
      roles: {
        district_admin: true,
        dmft_ceo: true,
        nodal_officer: true,
        senior_officer: false,
        execution_dept: false,
        inspection_team: false,
        deo: true,
        monitoring_user: false,
        sys_admin: true,
      },
    },
    {
      module: 'Stage 2 & 4: Administrative Sanction (AS) & Approvals',
      roles: {
        district_admin: true,
        dmft_ceo: true,
        nodal_officer: true,
        senior_officer: true,
        execution_dept: false,
        inspection_team: false,
        deo: false,
        monitoring_user: false,
        sys_admin: false,
      },
    },
    {
      module: 'Stage 3: Technical Sanction (TS) & DPR Appraisal',
      roles: {
        district_admin: true,
        dmft_ceo: false,
        nodal_officer: false,
        senior_officer: true,
        execution_dept: true,
        inspection_team: false,
        deo: false,
        monitoring_user: false,
        sys_admin: false,
      },
    },
    {
      module: 'Stage 5: Tender & Work Order Management',
      roles: {
        district_admin: true,
        dmft_ceo: true,
        nodal_officer: false,
        senior_officer: false,
        execution_dept: true,
        inspection_team: false,
        deo: false,
        monitoring_user: false,
        sys_admin: false,
      },
    },
    {
      module: 'Stage 6: Field Physical Progress Updates',
      roles: {
        district_admin: true,
        dmft_ceo: false,
        nodal_officer: false,
        senior_officer: false,
        execution_dept: true,
        inspection_team: true,
        deo: false,
        monitoring_user: false,
        sys_admin: false,
      },
    },
    {
      module: 'Stage 7: Payment Requisition Submission',
      roles: {
        district_admin: false,
        dmft_ceo: false,
        nodal_officer: false,
        senior_officer: false,
        execution_dept: true,
        inspection_team: false,
        deo: false,
        monitoring_user: false,
        sys_admin: false,
      },
    },
    {
      module: 'Stage 8: Quality Inspection & Deficiency Audit',
      roles: {
        district_admin: true,
        dmft_ceo: true,
        nodal_officer: true,
        senior_officer: false,
        execution_dept: false,
        inspection_team: true,
        deo: false,
        monitoring_user: false,
        sys_admin: false,
      },
    },
    {
      module: 'Stage 9: Fund Disbursement & UC Verification',
      roles: {
        district_admin: true,
        dmft_ceo: true,
        nodal_officer: true,
        senior_officer: false,
        execution_dept: false,
        inspection_team: false,
        deo: false,
        monitoring_user: false,
        sys_admin: false,
      },
    },
    {
      module: 'Stage 10: Handover & Commissioning Certification',
      roles: {
        district_admin: true,
        dmft_ceo: true,
        nodal_officer: true,
        senior_officer: false,
        execution_dept: true,
        inspection_team: false,
        deo: false,
        monitoring_user: false,
        sys_admin: false,
      },
    },
    {
      module: 'Reports & MIS Center',
      roles: {
        district_admin: true,
        dmft_ceo: true,
        nodal_officer: true,
        senior_officer: true,
        execution_dept: true,
        inspection_team: true,
        deo: true,
        monitoring_user: true,
        sys_admin: true,
      },
    },
    {
      module: 'User Roles & System Settings',
      roles: {
        district_admin: true,
        dmft_ceo: false,
        nodal_officer: false,
        senior_officer: false,
        execution_dept: false,
        inspection_team: false,
        deo: false,
        monitoring_user: false,
        sys_admin: true,
      },
    },
  ]

  return (
    <>
      <PageIntro
        eyebrow="DMFT Ramgarh / System Administration (RFP Module 8)"
        title={language === 'hi' ? 'उपयोगकर्ता प्रबंधन एवं सुरक्षा सेटिंग्स' : 'User Roles & Security Access Control'}
        subtitle={
          language === 'hi'
            ? 'रामगढ़ डीएमएफटी पोर्टल हेतु 9 वैधानिक उपयोगकर्ता भूमिकाएं, अनुमतियां, एवं डिजिटल ऑडिट लॉग।'
            : 'Configure role-based access control (RBAC), 9 official user categories, permission matrix, and activity logs.'
        }
      />

      {/* Tabs */}
      <div className="segmented" style={{ marginBottom: '20px', width: 'fit-content' }}>
        <button
          type="button"
          className={activeTab === 'theme' ? 'active' : ''}
          onClick={() => setActiveTab('theme')}
        >
          <Palette size={15} style={{ display: 'inline', marginRight: '6px' }} />
          <span>{language === 'hi' ? 'थीम एवं उपस्थिति' : 'Theme Appearance'}</span>
        </button>
        <button
          type="button"
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          <Users size={15} style={{ display: 'inline', marginRight: '6px' }} />
          <span>{language === 'hi' ? '9 उपयोगकर्ता भूमिकाएं' : '9 Official Roles'}</span>
        </button>
        <button
          type="button"
          className={activeTab === 'matrix' ? 'active' : ''}
          onClick={() => setActiveTab('matrix')}
        >
          <ShieldCheck size={15} style={{ display: 'inline', marginRight: '6px' }} />
          <span>{language === 'hi' ? 'अनुमति मैट्रिक्स' : 'Permissions Matrix'}</span>
        </button>
        <button
          type="button"
          className={activeTab === 'audit' ? 'active' : ''}
          onClick={() => setActiveTab('audit')}
        >
          <History size={15} style={{ display: 'inline', marginRight: '6px' }} />
          <span>{language === 'hi' ? 'सिस्टम ऑडिट लॉग' : 'Audit Logs'}</span>
        </button>
        <button
          type="button"
          className={activeTab === 'security' ? 'active' : ''}
          onClick={() => setActiveTab('security')}
        >
          <Lock size={15} style={{ display: 'inline', marginRight: '6px' }} />
          <span>{language === 'hi' ? 'सुरक्षा एवं 2FA' : 'Security & 2FA'}</span>
        </button>
      </div>

      {/* TAB 0: THEME APPEARANCE */}
      {activeTab === 'theme' && (
        <div className="card" style={{ padding: '24px' }}>
          <ThemeSelector />
        </div>
      )}

      {/* TAB 1: USERS LIST */}
      {activeTab === 'users' && (
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px' }}>
                {language === 'hi' ? 'रामगढ़ डीएमएफटी पोर्टल पंजीकृत प्राधिकृत अधिकारी' : 'Registered DMFT Ramgarh Officers & Roles'}
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                Configured as per RFP Section III, Module 8 (Indicative Categories 1 to 9)
              </span>
            </div>
            <span className="badge badge--green">9 Active Roles Provisioned</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid var(--line)', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Officer Name</th>
                  <th style={{ padding: '10px' }}>Role Category</th>
                  <th style={{ padding: '10px' }}>Department / Posting</th>
                  <th style={{ padding: '10px' }}>Contact</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px' }}>Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '10px' }}>
                      <strong style={{ color: 'var(--text)' }}>{u.name}</strong>
                      <div style={{ fontSize: '10.5px', color: 'var(--blue)' }}>@{u.username}</div>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span className="badge badge--teal" style={{ whiteSpace: 'normal', textAlign: 'left' }}>
                        {language === 'hi' ? u.roleLabelHi : u.roleLabelEn}
                      </span>
                    </td>
                    <td style={{ padding: '10px', fontSize: '11px' }}>
                      <strong>{u.department}</strong>
                      <div style={{ color: 'var(--muted)' }}>{u.designation}</div>
                    </td>
                    <td style={{ padding: '10px', fontSize: '11px' }}>
                      <div>{u.email}</div>
                      <div style={{ color: 'var(--muted)' }}>{u.phone}</div>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span className="badge badge--green">Active</span>
                    </td>
                    <td style={{ padding: '10px', fontSize: '11px', color: 'var(--muted)' }}>
                      {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Never'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PERMISSIONS MATRIX */}
      {activeTab === 'matrix' && (
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px' }}>
            {language === 'hi' ? 'भूमिका-आधारित पहुंच नियंत्रण (RBAC) मैट्रिक्स' : 'Role-Based Access Control (RBAC) Matrix'}
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: '11.5px', color: 'var(--muted)' }}>
            Granular enforcement of module access across the 10 lifecycle stages as stipulated by the Ramgarh DMFT RFP.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid var(--line)', textAlign: 'center' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Portal Module / Lifecycle Stage</th>
                  <th style={{ padding: '8px' }}>DC / DM</th>
                  <th style={{ padding: '8px' }}>CEO</th>
                  <th style={{ padding: '8px' }}>DPO</th>
                  <th style={{ padding: '8px' }}>Sr. Officer</th>
                  <th style={{ padding: '8px' }}>EE Works</th>
                  <th style={{ padding: '8px' }}>Inspection</th>
                  <th style={{ padding: '8px' }}>DEO</th>
                  <th style={{ padding: '8px' }}>MIS</th>
                  <th style={{ padding: '8px' }}>Sys Admin</th>
                </tr>
              </thead>
              <tbody>
                {permissionsMatrix.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{row.module}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{row.roles.district_admin ? <CheckCircle2 size={15} color="#10b981" /> : '—'}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{row.roles.dmft_ceo ? <CheckCircle2 size={15} color="#10b981" /> : '—'}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{row.roles.nodal_officer ? <CheckCircle2 size={15} color="#10b981" /> : '—'}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{row.roles.senior_officer ? <CheckCircle2 size={15} color="#10b981" /> : '—'}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{row.roles.execution_dept ? <CheckCircle2 size={15} color="#10b981" /> : '—'}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{row.roles.inspection_team ? <CheckCircle2 size={15} color="#10b981" /> : '—'}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{row.roles.deo ? <CheckCircle2 size={15} color="#10b981" /> : '—'}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{row.roles.monitoring_user ? <CheckCircle2 size={15} color="#10b981" /> : '—'}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{row.roles.sys_admin ? <CheckCircle2 size={15} color="#10b981" /> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px' }}>
            {language === 'hi' ? 'परियोजना एवं संचिका संचलन ऑडिट लॉग' : 'Digital Audit Trail & Activity Log'}
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: '11.5px', color: 'var(--muted)' }}>
            Immutable digital timestamps recording project sanctions, file movements, inspections, and disbursements.
          </p>

          <div className="timeline">
            {auditLogs.map((log) => (
              <div key={log.id} className="current">
                <i><History size={12} /></i>
                <span>
                  <strong>{language === 'hi' && log.actionHi ? log.actionHi : log.action}</strong>
                  <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: 'var(--text)' }}>{log.details}</p>
                  <small>
                    {new Date(log.timestamp).toLocaleString()} • Performed by: {log.performedBy} ({log.role})
                  </small>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY & 2FA */}
      {activeTab === 'security' && (
        <div className="card" style={{ padding: '24px', maxWidth: '780px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <KeyRound size={22} className="text-green" />
            <h3 style={{ margin: 0, fontSize: '15px' }}>Security Controls &amp; Authentication Parameters</h3>
          </div>

          <div className="info-grid" style={{ marginBottom: '20px' }}>
            <div>
              <span>Authentication Mechanism</span>
              <strong>HMAC SHA-256 HTTP-Only Cookies</strong>
            </div>
            <div>
              <span>Two-Factor Authentication (OTP)</span>
              <strong>Integration Ready (Aadhaar / Gov SMS)</strong>
            </div>
            <div>
              <span>Brute Force Lockout</span>
              <strong>5 Failed Attempts / 60s Cooldown</strong>
            </div>
            <div>
              <span>Session Inactivity Timeout</span>
              <strong>30 Minutes (Configurable)</strong>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '12px' }}>
            <strong>Demo Credentials for Official Roles:</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
              <li><strong>District Administration:</strong> username: <code>admin</code> / password: <code>Admin@12345</code></li>
              <li><strong>DMFT CEO:</strong> username: <code>dmft_ceo</code> / password: <code>Admin@12345</code></li>
              <li><strong>Nodal Officer:</strong> username: <code>nodal_officer</code> / password: <code>Admin@12345</code></li>
              <li><strong>Executive Engineer (Works):</strong> username: <code>exec_rwd</code> / password: <code>Admin@12345</code></li>
              <li><strong>Quality Inspection Team:</strong> username: <code>insp_team</code> / password: <code>Admin@12345</code></li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
