'use client'

import { Shield, UserCheck, Users, Wrench } from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'

export default function AdminSettingsPage() {
  return (
    <>
      <PageIntro
        eyebrow="System Administration"
        title="Settings & Access Management"
        subtitle="Configure portal parameters, security controls, and departmental user permissions."
      />

      <div className="card" style={{ padding: '24px', maxWidth: '800px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#eaf5ea',
              color: 'var(--green)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Shield size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px' }}>Administrator Profile</h3>
            <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '3px' }}>
              Current authenticated session and authority level
            </p>
          </div>
        </div>

        <div className="info-grid">
          <div>
            <span>Account Role</span>
            <strong>System Administrator</strong>
          </div>
          <div>
            <span>Username</span>
            <strong>admin</strong>
          </div>
          <div>
            <span>Department</span>
            <strong>Department of Planning &amp; Development</strong>
          </div>
          <div>
            <span>Session Status</span>
            <strong style={{ color: 'var(--green)' }}>Active &amp; Verified</strong>
          </div>
        </div>
      </div>
    </>
  )
}

