'use client'

import React from 'react'
import { AIAssistantChat } from '@/components/ai/AIAssistantChat'
import { useTranslation } from '@/context/LanguageContext'

export default function AdminAIAssistantPage() {
  const { language } = useTranslation()
  const isHi = language === 'hi'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Compact Top Header Bar - Keeps branding without pushing layout into scroll */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '9.5px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
              }}
            >
              {isHi ? 'परियोजना बुद्धिमत्ता एवं जेमिनी एआई (आरएफपी मॉड्यूल 6)' : 'PROJECT INTELLIGENCE & GEMINI AI (RFP MODULE 6)'}
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-muted)' }} />
            <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
              {isHi ? 'रामगढ़ डीएमएफटी संवादात्मक कार्यक्षेत्र' : 'DMFT Ramgarh Workspace'}
            </span>
          </div>
          <h1
            style={{
              fontSize: '18px',
              fontWeight: 800,
              margin: '2px 0 0',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
            }}
          >
            {isHi ? 'ई-सम्पदा एआई सहायक' : 'eSapmada AI Assistant'}
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-primary)',
              background: 'var(--color-hover)',
              padding: '4px 12px',
              borderRadius: '20px',
              border: '1px solid var(--color-border)',
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            {isHi ? 'लाइव ज्ञानकोश सत्यापन (DFMT.pdf)' : 'Live Knowledge Grounding (DFMT.pdf)'}
          </span>
        </div>
      </div>

      {/* Main Full-Height AI Chat Component */}
      <div style={{ flex: 1, minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <AIAssistantChat />
      </div>
    </div>
  )
}
