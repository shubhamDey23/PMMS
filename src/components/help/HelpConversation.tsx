'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Bot,
  User,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react'
import type { HelpQuestion } from '@/lib/help/help-content'
import { helpQuestions } from '@/lib/help/help-content'
import { useTranslation } from '@/context/LanguageContext'

export interface ConversationEntry {
  id: string
  question: HelpQuestion
  timestamp: string
}

interface HelpConversationProps {
  entries: ConversationEntry[]
  onSelectQuestion: (question: HelpQuestion) => void
  onClear: () => void
  onBackToCategories: () => void
}

export function HelpConversation({
  entries,
  onSelectQuestion,
  onClear,
  onBackToCategories,
}: HelpConversationProps) {
  const { language } = useTranslation()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries])

  if (entries.length === 0) {
    return null
  }

  const latestEntry = entries[entries.length - 1]
  const latestQuestion = latestEntry?.question
  const relatedQuestions = (latestQuestion?.relatedQuestions || [])
    .map((id) => helpQuestions.find((q) => q.id === id))
    .filter((q): q is HelpQuestion => Boolean(q))

  return (
    <div className="help-chat-box">
      {/* Top Bar */}
      <div className="help-chat-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={onBackToCategories}
            className="map-action-btn secondary"
            style={{ fontSize: '11px', padding: '6px 12px' }}
          >
            <ArrowLeft size={14} />
            <span>{language === 'hi' ? 'श्रेणियों पर वापस' : 'Back to categories'}</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
              DMFT Knowledge & Help Desk
            </span>
          </div>
          <Link
            href="/admin/ai-assistant"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '6px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8',
              fontSize: '11px',
              fontWeight: 600,
              textDecoration: 'none',
              marginLeft: '8px',
            }}
          >
            <Sparkles size={12} color="#f59e0b" />
            <span>{language === 'hi' ? 'लाइव जेमिनी एआई चैट' : 'Open Gemini AI Chat'}</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <button
          type="button"
          onClick={onClear}
          style={{
            background: '#fef2f2',
            border: '1px solid #fee2e2',
            color: '#dc2626',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '11.5px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={13} />
          <span>{language === 'hi' ? 'बातचीत साफ करें' : 'Clear conversation'}</span>
        </button>
      </div>

      {/* Message Stream */}
      <div className="help-chat-stream">
        {entries.map((entry, index) => {
          const qText = language === 'hi' ? entry.question.questionHi : entry.question.questionEn
          const aText = language === 'hi' ? entry.question.answerHi : entry.question.answerEn
          const actionLabel =
            language === 'hi'
              ? entry.question.action?.labelHi
              : entry.question.action?.labelEn

          const paragraphs = aText.split('\n\n').filter(Boolean)

          return (
            <div key={`${entry.id}-${index}`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* User Question */}
              <div className="help-msg-row user">
                <div className="help-bubble-user">
                  <p style={{ margin: 0, fontWeight: 500 }}>{qText}</p>
                  <time>{entry.timestamp}</time>
                </div>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#dbeafe',
                    color: '#1d4ed8',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <User size={16} />
                </div>
              </div>

              {/* Bot Answer */}
              <div className="help-msg-row">
                <div className="help-bot-avatar">
                  <Bot size={18} />
                </div>
                <div className="help-bubble-bot">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Sparkles size={13} color="#f59e0b" />
                      Ask DMFT AI — Intelligence Engine
                    </span>
                    <span style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                      {language === 'hi' ? 'प्रशासनिक नियम' : 'Official Workflow'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {paragraphs.map((p, pIdx) => {
                      if (p.includes('\n•') || p.startsWith('•')) {
                        const lines = p.split('\n').filter(Boolean)
                        return (
                          <ul
                            key={pIdx}
                            style={{
                              margin: '6px 0',
                              paddingLeft: '18px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                            }}
                          >
                            {lines.map((line, lIdx) => (
                              <li key={lIdx} style={{ fontSize: '12.5px' }}>
                                {line.replace(/^•\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        )
                      }
                      return (
                        <p key={pIdx} style={{ margin: 0, fontSize: '12.5px' }}>
                          {p}
                        </p>
                      )
                    })}
                  </div>

                  {/* Contextual Action Button */}
                  {entry.question.action && (
                    <div style={{ paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                      <Link href={entry.question.action.href} className="help-action-cta">
                        <span>{actionLabel}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        <div ref={endRef} />
      </div>

      {/* Suggested Follow-up Questions */}
      {relatedQuestions.length > 0 && (
        <div style={{ padding: '14px 18px', background: '#ffffff', borderTop: '1px solid var(--line)' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#475569',
              margin: '0 0 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <HelpCircle size={14} color="#2563eb" />
            {language === 'hi' ? 'संबंधित प्रश्न' : 'Related questions'}:
          </p>
          <div className="help-faq-chips-row">
            {relatedQuestions.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion(q)}
                className="help-chip-btn"
              >
                <span>{language === 'hi' ? q.questionHi : q.questionEn}</span>
                <ArrowRight size={12} color="#94a3b8" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
