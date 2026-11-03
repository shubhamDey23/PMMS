'use client'

import React, { useState, useMemo } from 'react'
import {
  Search,
  Bot,
  Sparkles,
  HelpCircle,
  FolderKanban,
  X,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Info,
} from 'lucide-react'
import {
  helpCategories,
  helpQuestions,
  searchHelp,
  type HelpCategory,
  type HelpQuestion,
} from '@/lib/help/help-content'
import { useTranslation } from '@/context/LanguageContext'
import { HelpCategoryCard } from './HelpCategoryCard'
import { HelpConversation, type ConversationEntry } from './HelpConversation'

export function HelpAssistant() {
  const { language } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [conversation, setConversation] = useState<ConversationEntry[]>([])

  // Calculate question count per category
  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const q of helpQuestions) {
      counts[q.categoryId] = (counts[q.categoryId] || 0) + 1
    }
    return counts
  }, [])

  // Search results
  const searchResults = useMemo(() => {
    return searchHelp(searchQuery, language)
  }, [searchQuery, language])

  // Category questions
  const categoryQuestions = useMemo(() => {
    if (!selectedCategoryId) return []
    return helpQuestions.filter((q) => q.categoryId === selectedCategoryId)
  }, [selectedCategoryId])

  // Selected category object
  const selectedCategory = useMemo(() => {
    return helpCategories.find((c) => c.id === selectedCategoryId) || null
  }, [selectedCategoryId])

  // Suggested questions (curated popular questions & RFP AI queries)
  const suggestedQuestions = useMemo(() => {
    const ids = [
      'ai-how-many-under-execution',
      'ai-delayed-in-mandu',
      'ai-pending-administrative-approval',
      'ai-department-delayed',
      'ai-physical-progress-below-30',
      'ai-generate-monthly-report',
      'ai-summarize-district-status',
      'faq-10-lifecycle-stages',
    ]
    return ids
      .map((id) => helpQuestions.find((q) => q.id === id))
      .filter((q): q is HelpQuestion => Boolean(q))
  }, [])

  const handleSelectQuestion = (q: HelpQuestion) => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setConversation((prev) => [
      ...prev,
      {
        id: `${q.id}-${Date.now()}`,
        question: q,
        timestamp: timeStr,
      },
    ])
  }

  const handleAskCustomQuery = async (queryToAsk: string) => {
    if (!queryToAsk.trim()) return
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    try {
      const res = await fetch('/api/dmft/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToAsk }),
      })
      const data = await res.json()
      if (data.success && data.result) {
        const aiQ: HelpQuestion = {
          id: `ai-${Date.now()}`,
          categoryId: 'dmft-ai',
          questionEn: queryToAsk,
          questionHi: queryToAsk,
          answerEn: data.result.answerEn,
          answerHi: data.result.answerHi,
          keywords: ['ai', 'dmft', 'ramgarh'],
          action: data.result.deepLink
            ? {
                href: data.result.deepLink,
                labelEn: data.result.deepLinkText || 'View Details',
                labelHi: data.result.deepLinkTextHi || 'विवरण देखें',
              }
            : undefined,
        }
        setConversation((prev) => [
          ...prev,
          {
            id: `conv-${Date.now()}`,
            question: aiQ,
            timestamp: timeStr,
          },
        ])
        setSearchQuery('')
      }
    } catch (e) {
      console.error('AI query error:', e)
    }
  }

  const handleClearConversation = () => {
    setConversation([])
  }

  const handleBackToCategories = () => {
    setSelectedCategoryId(null)
  }

  return (
    <div className="help-page-shell">
      {/* Hero Search Section */}
      <div className="help-hero-card">
        <div className="help-hero-badge">
          <Bot size={15} />
          <span>
            {language === 'hi'
              ? 'पूछें डीएमएफटी एआई — परियोजना बुद्धिमत्ता (RFP मॉड्यूल 6)'
              : 'Ask DMFT AI — Natural Language Interface (RFP Section III, Module 6)'}
          </span>
        </div>

        <h1 className="help-hero-title">
          {language === 'hi'
            ? 'पूछें डीएमएफटी एआई: हम आपकी क्या सहायता कर सकते हैं?'
            : 'Ask DMFT AI: Project Intelligence'}
        </h1>
        <p className="help-hero-subtitle">
          {language === 'hi'
            ? 'प्राकृतिक भाषा में प्रश्न पूछें जैसे "मांडू प्रखंड की विलंबित परियोजनाएं दिखाएं", "कितनी परियोजनाएं चालू हैं?" या 10 जीवनचक्र मॉड्यूल की प्रक्रिया समझें।'
            : 'Ask project questions in natural language e.g. "Show delayed projects in Mandu Block", "How many projects are under execution?", or explore the 10 lifecycle stages.'}
        </p>

        {/* Search Input Bar with Ask AI Trigger */}
        <div className="help-hero-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAskCustomQuery(searchQuery)
              }
            }}
            placeholder={
              language === 'hi'
                ? 'प्रश्न पूछें (उदा. कितनी योजनाएं चालू हैं? मांडू में विलंबित कार्य? प्रशासनिक स्वीकृति?)...'
                : 'Ask a question (e.g. How many projects under execution? Delayed projects in Mandu?)...'
            }
            className="help-hero-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleAskCustomQuery(searchQuery)}
              className="primary-btn"
              style={{ height: '32px', padding: '0 12px', fontSize: '11px', margin: '0 6px', whiteSpace: 'nowrap' }}
            >
              <Bot size={13} />
              <span>Ask AI</span>
            </button>
          )}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="help-hero-clear-btn"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Suggested Questions Quick Chips */}
      {!searchQuery && (
        <div className="help-section-block">
          <div className="help-section-header">
            <h2>
              <Sparkles size={16} color="#f59e0b" />
              {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
            </h2>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>
              {language === 'hi' ? 'तुरंत उत्तर देखने के लिए क्लिक करें' : 'Click any chip to ask'}
            </span>
          </div>

          <div className="help-faq-chips-row">
            {suggestedQuestions.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSelectQuestion(q)}
                className="help-chip-btn"
              >
                <span>{language === 'hi' ? q.questionHi : q.questionEn}</span>
                <ArrowRight size={13} color="#94a3b8" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results Mode */}
      {searchQuery.trim().length > 0 && (
        <div className="card" style={{ padding: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '12px',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
              <Search size={15} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '6px', color: '#2563eb' }} />
              {language === 'hi'
                ? `खोज परिणाम: "${searchQuery}" (${searchResults.length})`
                : `Search results for "${searchQuery}" (${searchResults.length})`}
            </h3>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                background: 'transparent',
                border: 0,
                color: '#2563eb',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {language === 'hi' ? 'खोज हटाएं' : 'Clear search'}
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748b' }}>
              <HelpCircle size={36} style={{ color: '#cbd5e1', margin: '0 auto 8px' }} />
              <p style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 4px' }}>
                {language === 'hi'
                  ? 'कोई संबंधित सहायता विषय नहीं मिला।'
                  : 'No matching help topics found.'}
              </p>
              <p style={{ fontSize: '11px', margin: 0, color: '#94a3b8' }}>
                {language === 'hi'
                  ? 'कृपया अन्य कीवर्ड खोजें या नीचे दी गई श्रेणियों में से चुनें।'
                  : 'Try searching with different terms or select a category below.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {searchResults.map((q) => {
                const category = helpCategories.find((c) => c.id === q.categoryId)
                const catTitle = language === 'hi' ? category?.titleHi : category?.titleEn
                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      handleSelectQuestion(q)
                      setSearchQuery('')
                    }}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid var(--line)',
                      background: '#ffffff',
                      cursor: 'pointer',
                      transition: 'all .15s ease',
                    }}
                    className="map-project-item"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                        {language === 'hi' ? q.questionHi : q.questionEn}
                      </strong>
                      {catTitle && (
                        <span
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            background: '#eff6ff',
                            color: '#1d4ed8',
                          }}
                        >
                          {catTitle}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                      {language === 'hi' ? q.answerHi : q.answerEn}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Active Conversation Stream */}
      {conversation.length > 0 && (
        <HelpConversation
          entries={conversation}
          onSelectQuestion={handleSelectQuestion}
          onClear={handleClearConversation}
          onBackToCategories={handleBackToCategories}
        />
      )}

      {/* Category Selected Questions View */}
      {selectedCategoryId && selectedCategory && (
        <div className="card" style={{ padding: '20px', border: '1px solid #bfdbfe', background: '#f8fafc' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '12px',
              marginBottom: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: selectedCategory.color,
                  }}
                />
                <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                  {language === 'hi' ? selectedCategory.titleHi : selectedCategory.titleEn}
                </h2>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748b', margin: '4px 0 0' }}>
                {language === 'hi' ? selectedCategory.descriptionHi : selectedCategory.descriptionEn}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategoryId(null)}
              className="map-action-btn secondary"
              style={{ fontSize: '11.5px', padding: '6px 12px' }}
            >
              {language === 'hi' ? 'सभी श्रेणियां देखें' : 'View all categories'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
            {categoryQuestions.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSelectQuestion(q)}
                className="map-project-item"
                style={{ padding: '14px', textAlign: 'left' }}
              >
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                    {language === 'hi' ? q.questionHi : q.questionEn}
                  </h4>
                  <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
                    {language === 'hi' ? q.answerHi : q.answerEn}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '10px', color: '#2563eb', fontSize: '11.5px', fontWeight: 600 }}>
                  <span>{language === 'hi' ? 'उत्तर पूछें' : 'Ask this question'}</span>
                  <ArrowRight size={13} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 10 Category Cards Grid */}
      <div className="help-section-block">
        <div className="help-section-header">
          <div>
            <h2>
              <FolderKanban size={16} color="#2563eb" />
              {language === 'hi' ? 'विषय अनुसार सहायता ब्राउज़ करें' : 'Browse Help by Category'}
            </h2>
            <p style={{ fontSize: '11.5px', color: '#64748b', margin: '3px 0 0' }}>
              {language === 'hi'
                ? 'विशिष्ट मॉड्यूल या कार्यप्रणाली की जानकारी के लिए श्रेणी चुनें।'
                : 'Select a module below to inspect specific workflows and procedures.'}
            </p>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: '9999px',
              background: '#f1f5f9',
              color: '#475569',
            }}
          >
            {helpCategories.length} {language === 'hi' ? 'श्रेणियां' : 'Categories'}
          </span>
        </div>

        <div className="help-categories-grid">
          {helpCategories.map((cat) => (
            <HelpCategoryCard
              key={cat.id}
              category={cat}
              questionCount={countsByCategory[cat.id] || 0}
              isSelected={selectedCategoryId === cat.id}
              onClick={() => {
                if (selectedCategoryId === cat.id) {
                  setSelectedCategoryId(null)
                } else {
                  setSelectedCategoryId(cat.id)
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Offline Guarantee Info Card */}
      <div className="help-security-card">
        <ShieldCheck size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>
            {language === 'hi'
              ? 'शत-प्रतिशत सुरक्षित एवं ऑफ़लाइन समर्थित डीएमएफटी एआई ज्ञानकोष'
              : '100% Offline-Capable Predefined AI Knowledge Base — DMFT Ramgarh'}
          </strong>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            {language === 'hi'
              ? 'यह प्राकृतिक भाषा सहायता प्रणाली पूरी तरह से इन-ब्राउज़र काम करती है। इसमें किसी तीसरे पक्ष या बाहरी सशुल्क एपीआई की आवश्यकता नहीं है, जिससे आपकी प्रशासनिक गोपनीयता शत-प्रतिशत सुरक्षित रहती है।'
              : 'All natural language project analysis and answers run locally within the DMFT Ramgarh application. No sensitive departmental queries or tender records leave your local network.'}
          </p>
        </div>
      </div>
    </div>
  )
}
