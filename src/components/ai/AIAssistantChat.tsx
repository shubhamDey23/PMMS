'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import {
  Bot,
  Sparkles,
  Send,
  Square,
  Copy,
  Check,
  Plus,
  Trash2,
  FileText,
  AlertCircle,
  Info,
  CheckCircle2,
  Layers,
  ChevronDown,
  ChevronUp,
  PanelLeftClose,
  PanelLeft,
  X,
  ExternalLink,
  Search,
  ArrowLeft,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Edit2,
  PlusCircle,
  TrendingUp,
  CreditCard,
  BarChart3,
  BookOpen,
  LogOut,
  Palette,
  ShieldCheck,
  Globe,
} from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'
import { useTheme, THEMES, type ThemeName } from '@/context/ThemeContext'
import { logoutAction } from '@/app/actions/auth'

export interface CitationSource {
  id: string
  title: string
  source: string
  sourceType?: 'documentation' | 'live_project'
  documentName?: string
  pageNumber?: string
  category?: string
  isImplemented: boolean
  score?: number
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: CitationSource[]
  timestamp: string
  isStreaming?: boolean
  feedback?: 'like' | 'dislike' | null
}

export interface Conversation {
  id: string
  title: string
  updatedAt: string
  messages: Message[]
}

const STORAGE_KEY = 'esapmada_ai_conversations_v2'

// 6 Official Recommended Question Cards
interface SuggestedCard {
  id: string
  titleEn: string
  titleHi: string
  descEn: string
  descHi: string
  query: string
  icon: React.ElementType
}

const SUGGESTED_CARDS: SuggestedCard[] = [
  {
    id: 'sug-register',
    titleEn: 'How do I register a new project?',
    titleHi: 'नई परियोजना कैसे पंजीकृत करें?',
    descEn: 'Step-by-step registration workflow, required fields & ID assignment.',
    descHi: 'पंजीकरण के चरण, आवश्यक विवरण एवं ट्रैकिंग आईडी।',
    query: 'How do I register a new project?',
    icon: PlusCircle,
  },
  {
    id: 'sug-docs',
    titleEn: 'Which documents are required for project registration?',
    titleHi: 'पंजीकरण हेतु कौन से दस्तावेज आवश्यक हैं?',
    descEn: 'Official document checklist: proposal, Gram Sabha NOC & DPR.',
    descHi: 'आधिकारिक चेकलिस्ट: प्रस्ताव, ग्राम सभा संकल्प एवं डीपीआर।',
    query: 'Which documents are required for project registration?',
    icon: FileText,
  },
  {
    id: 'sug-lifecycle',
    titleEn: 'Explain the 10 stages of the DMFT workflow.',
    titleHi: 'डीएमएफटी कार्यप्रवाह के 10 चरण समझाएं।',
    descEn: 'End-to-end statutory lifecycle from proposal to asset handover.',
    descHi: 'प्रस्ताव से लेकर परिसंपत्ति हस्तांतरण तक का 10-चरणीय चक्र।',
    query: 'Explain the 10 stages of the DMFT workflow.',
    icon: Layers,
  },
  {
    id: 'sug-progress',
    titleEn: 'How do I update physical progress?',
    titleHi: 'भौतिक प्रगति कैसे अपडेट करें?',
    descEn: 'Measurement formulas, geotagged site photos & MB verification.',
    descHi: 'माप सूत्र, जियो-टैग्ड तस्वीरें एवं माप पुस्तिका सत्यापन।',
    query: 'How do I update physical progress?',
    icon: TrendingUp,
  },
  {
    id: 'sug-payment',
    titleEn: 'How do I submit a payment requisition?',
    titleHi: 'भुगतान अधियाचन कैसे जमा करें?',
    descEn: 'Running account (RA) bill workflow & statutory tax deductions.',
    descHi: 'रनिंग एकाउंट बिल कार्यप्रवाह एवं वैधानिक कटौतियां।',
    query: 'How do I submit a payment requisition?',
    icon: CreditCard,
  },
  {
    id: 'sug-reports',
    titleEn: 'How do I generate project reports?',
    titleHi: 'परियोजना रिपोर्ट कैसे जेनरेट करें?',
    descEn: '15 official MIS report types, filtering & PDF/Excel exports.',
    descHi: '15 आधिकारिक एमआईएस रिपोर्ट, फिल्टर एवं पीडीएफ/एक्सेल डाउनलोड।',
    query: 'How do I generate project reports?',
    icon: BarChart3,
  },
]

export function AIAssistantChat() {
  const { language, setLanguage } = useTranslation()
  const isHi = language === 'hi'
  const { theme, setTheme, availableThemes } = useTheme()

  // State
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConvId, setActiveConvId] = useState<string>('')
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchFilter, setSearchFilter] = useState('')
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({})
  const [showSourcesModal, setShowSourcesModal] = useState(false)
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null)
  const [editingTitleText, setEditingTitleText] = useState('')
  const [configStatus, setConfigStatus] = useState<{ configured: boolean; model: string; provider: string }>({
    configured: true,
    model: 'gemini-2.5-flash',
    provider: 'gemini',
  })
  const [configError, setConfigError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const conversationsRef = useRef<Conversation[]>([])

  // Keep conversationsRef in sync with conversations state
  useEffect(() => {
    conversationsRef.current = conversations
  }, [conversations])

  // Save conversations helper
  const persistConversations = (updated: Conversation[]) => {
    conversationsRef.current = updated
    setConversations(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // Ignore storage quota errors
    }
  }

  // 1. Initial Load: Check AI status & load conversations
  useEffect(() => {
    fetch('/api/ai/chat')
      .then((res) => res.json())
      .then((data) => {
        if (data.configured !== undefined) {
          setConfigStatus({
            configured: !!data.configured,
            model: data.model || 'gemini-2.5-flash',
            provider: data.provider || 'gemini',
          })
          if (!data.configured && data.instructions) {
            setConfigError(data.instructions)
          }
        }
      })
      .catch(() => {
        // Fallback
      })

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed: Conversation[] = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setConversations(parsed)
          conversationsRef.current = parsed
          setActiveConvId(parsed[0].id)
          return
        }
      }
    } catch {
      // Ignore
    }

    // Default new conversation if nothing saved
    const newId = `conv_${Date.now()}`
    const initConv: Conversation = {
      id: newId,
      title: isHi ? 'नया संवाद' : 'New Chat',
      updatedAt: new Date().toISOString(),
      messages: [],
    }
    setConversations([initConv])
    conversationsRef.current = [initConv]
    setActiveConvId(newId)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([initConv]))
    } catch {}
  }, [])

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversations, activeConvId, isLoading])

  // Active conversation object
  const activeConv = useMemo(() => {
    return (
      conversations.find((c) => c.id === activeConvId) || {
        id: activeConvId || 'default',
        title: isHi ? 'नया संवाद' : 'New Chat',
        updatedAt: new Date().toISOString(),
        messages: [],
      }
    )
  }, [conversations, activeConvId, isHi])

  // Create new conversation
  const createNewConversation = () => {
    const newId = `conv_${Date.now()}`
    const newConv: Conversation = {
      id: newId,
      title: isHi ? 'नया संवाद' : 'New Chat',
      updatedAt: new Date().toISOString(),
      messages: [],
    }
    setConversations((prev) => {
      const updated = [newConv, ...prev]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {}
      return updated
    })
    setActiveConvId(newId)
    setEditingTitleId(null)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  // Delete conversation with confirmation
  const handleDeleteConversation = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const confirmMsg = isHi
      ? 'क्या आप इस बातचीत को हटाना चाहते हैं?'
      : 'Are you sure you want to delete this conversation?'
    if (!window.confirm(confirmMsg)) return

    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id)
      if (filtered.length === 0) {
        const newId = `conv_${Date.now()}`
        const newConv: Conversation = {
          id: newId,
          title: isHi ? 'नया संवाद' : 'New Chat',
          updatedAt: new Date().toISOString(),
          messages: [],
        }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify([newConv]))
        } catch {}
        setActiveConvId(newId)
        return [newConv]
      } else {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
        } catch {}
        if (activeConvId === id) {
          setActiveConvId(filtered[0].id)
        }
        return filtered
      }
    })
  }

  // Rename conversation
  const handleSaveRename = (id: string) => {
    if (!editingTitleText.trim()) {
      setEditingTitleId(null)
      return
    }
    setConversations((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, title: editingTitleText.trim() } : c))
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {}
      return updated
    })
    setEditingTitleId(null)
  }

  // Copy message
  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedMessageId(id)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }

  // Feedback (Helpful / Not helpful)
  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setConversations((prev) => {
      const updated = prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            messages: c.messages.map((m) =>
              m.id === messageId ? { ...m, feedback: m.feedback === type ? null : type } : m
            ),
          }
        }
        return c
      })
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {}
      return updated
    })
  }

  // Stop streaming
  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setIsLoading(false)
    }
  }

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim()
    if (!query || isLoading) return

    setInputMessage('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const assistantMsgId = `a_${Date.now()}`
    const assistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true,
      sources: [],
    }

    // Determine target conversation ID and updated title
    let targetConvId = activeConvId
    const currentList = conversationsRef.current
    let targetConv = currentList.find((c) => c.id === targetConvId)

    if (!targetConv) {
      targetConvId = `conv_${Date.now()}`
      setActiveConvId(targetConvId)
      targetConv = {
        id: targetConvId,
        title: query.slice(0, 36) + (query.length > 36 ? '...' : ''),
        updatedAt: new Date().toISOString(),
        messages: [],
      }
    }

    const currentMessages = targetConv.messages || []
    const isFirst = currentMessages.length === 0
    const newTitle = isFirst ? query.slice(0, 36) + (query.length > 36 ? '...' : '') : targetConv.title

    const updatedMessages = [...currentMessages, userMsg, assistantMsg]

    // Set initial updated conversations state with user & assistant placeholder
    setConversations((prev) => {
      let found = false
      const next = prev.map((c) => {
        if (c.id === targetConvId) {
          found = true
          return {
            ...c,
            title: newTitle,
            updatedAt: new Date().toISOString(),
            messages: updatedMessages,
          }
        }
        return c
      })
      const finalConvs = found
        ? next
        : [
            {
              id: targetConvId,
              title: newTitle,
              updatedAt: new Date().toISOString(),
              messages: updatedMessages,
            },
            ...next,
          ]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(finalConvs))
      } catch {}
      return finalConvs
    })

    setIsLoading(true)

    const controller = new AbortController()
    abortControllerRef.current = controller

    let accumulatedContent = ''
    let retrievedSources: CitationSource[] = []

    try {
      const apiMessages = [...currentMessages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          language: isHi ? 'hi' : 'en',
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMsg =
          errorData.message || (isHi ? 'प्रतिक्रिया उत्पन्न करने में त्रुटि।' : 'Failed to generate response.')

        setConversations((prev) => {
          const finalConvs = prev.map((c) => {
            if (c.id === targetConvId) {
              return {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === assistantMsgId
                    ? {
                        ...m,
                        content: `⚠️ **${isHi ? 'त्रुटि' : 'Error'}:** ${errorMsg}`,
                        isStreaming: false,
                      }
                    : m
                ),
              }
            }
            return c
          })
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(finalConvs))
          } catch {}
          return finalConvs
        })
        setIsLoading(false)
        return
      }

      // Parse RAG sources from headers
      const sourcesHeader = response.headers.get('X-RAG-Sources')
      if (sourcesHeader) {
        try {
          retrievedSources = JSON.parse(decodeURIComponent(sourcesHeader))
        } catch {
          // Ignore
        }
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder('utf-8')

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          accumulatedContent += chunk

          setConversations((prev) =>
            prev.map((c) => {
              if (c.id === targetConvId) {
                return {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === assistantMsgId
                      ? {
                          ...m,
                          content: accumulatedContent,
                          sources: retrievedSources,
                          isStreaming: true,
                        }
                      : m
                  ),
                }
              }
              return c
            })
          )
        }
      }

      // Mark streaming done permanently using functional update so response sticks
      setConversations((prev) => {
        const completedConvs = prev.map((c) => {
          if (c.id === targetConvId) {
            return {
              ...c,
              messages: c.messages.map((m) =>
                m.id === assistantMsgId
                  ? {
                      ...m,
                      content: accumulatedContent,
                      sources: retrievedSources,
                      isStreaming: false,
                    }
                  : m
              ),
            }
          }
          return c
        })
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(completedConvs))
        } catch {}
        return completedConvs
      })
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Chat stream error:', err)
        setConversations((prev) => {
          const completedConvs = prev.map((c) => {
            if (c.id === targetConvId) {
              return {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === assistantMsgId
                    ? {
                        ...m,
                        content:
                          accumulatedContent ||
                          `⚠️ **${isHi ? 'त्रुटि' : 'Error'}:** ${isHi ? 'कनेक्शन बाधित हुआ।' : 'Connection interrupted.'}`,
                        isStreaming: false,
                      }
                    : m
                ),
              }
            }
            return c
          })
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(completedConvs))
          } catch {}
          return completedConvs
        })
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  // Handle textarea auto-resize & key submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`
  }

  // Group conversations by date (Today, Yesterday, Previous Days)
  const groupedConversations = useMemo(() => {
    const today = new Date().toDateString()
    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)
    const yesterday = yesterdayDate.toDateString()

    const groups: {
      today: Conversation[]
      yesterday: Conversation[]
      earlier: Conversation[]
    } = {
      today: [],
      yesterday: [],
      earlier: [],
    }

    const filtered = searchFilter
      ? conversations.filter(
          (c) =>
            c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
            c.messages.some((m) => m.content.toLowerCase().includes(searchFilter.toLowerCase()))
        )
      : conversations

    filtered.forEach((c) => {
      const d = new Date(c.updatedAt).toDateString()
      if (d === today) {
        groups.today.push(c)
      } else if (d === yesterday) {
        groups.yesterday.push(c)
      } else {
        groups.earlier.push(c)
      }
    })

    return groups
  }, [conversations, searchFilter])

  // Custom Markdown & Table Formatter
  const renderFormattedContent = (content: string) => {
    if (!content) return null

    // Split by code blocks or lines
    const paragraphs = content.split('\n\n')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {paragraphs.map((para, pIdx) => {
          const trimmed = para.trim()

          // Check for Markdown Table (| col | col |)
          if (trimmed.includes('|') && trimmed.includes('\n|') && trimmed.includes('---')) {
            const lines = trimmed.split('\n').filter((l) => l.trim().startsWith('|'))
            if (lines.length >= 3) {
              const headers = lines[0]
                .split('|')
                .filter((_, i, arr) => i > 0 && i < arr.length - 1)
                .map((h) => h.trim())

              const rows = lines.slice(2).map((line) =>
                line
                  .split('|')
                  .filter((_, i, arr) => i > 0 && i < arr.length - 1)
                  .map((c) => c.trim())
              )

              return (
                <div key={pIdx} style={{ overflowX: 'auto', margin: '8px 0' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '12px',
                      background: 'var(--color-surface)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <thead>
                      <tr style={{ background: 'var(--color-hover)' }}>
                        {headers.map((h, hIdx) => (
                          <th
                            key={hIdx}
                            style={{
                              padding: '8px 12px',
                              textAlign: 'left',
                              fontWeight: 700,
                              color: 'var(--color-text)',
                              borderBottom: '1px solid var(--color-border)',
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          style={{
                            borderBottom: '1px solid var(--color-border)',
                            background: rIdx % 2 === 0 ? 'transparent' : 'var(--color-hover)',
                          }}
                        >
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} style={{ padding: '8px 12px', color: 'var(--color-text)' }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            }
          }

          // Check for Headings
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={pIdx} style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)', margin: '6px 0 2px' }}>
                {trimmed.replace(/^###\s+/, '')}
              </h4>
            )
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={pIdx} style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-primary)', margin: '8px 0 2px' }}>
                {trimmed.replace(/^##\s+/, '')}
              </h3>
            )
          }
          if (trimmed.startsWith('# ')) {
            return (
              <h2 key={pIdx} style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-primary)', margin: '10px 0 4px' }}>
                {trimmed.replace(/^#\s+/, '')}
              </h2>
            )
          }

          // Check for Lists
          const lines = trimmed.split('\n')
          const isOrderedList = lines.every((l) => /^\d+\.\s/.test(l.trim()))
          const isBulletList = lines.every((l) => /^[•\-\*]\s/.test(l.trim()))

          if (isOrderedList && lines.length > 1) {
            return (
              <ol key={pIdx} style={{ margin: '4px 0', paddingLeft: '20px', lineHeight: 1.6, fontSize: '13px' }}>
                {lines.map((l, lIdx) => (
                  <li key={lIdx} style={{ marginBottom: '4px' }}>
                    {formatInlineMarkup(l.replace(/^\d+\.\s*/, ''))}
                  </li>
                ))}
              </ol>
            )
          }

          if (isBulletList && lines.length > 1) {
            return (
              <ul key={pIdx} style={{ margin: '4px 0', paddingLeft: '20px', lineHeight: 1.6, fontSize: '13px' }}>
                {lines.map((l, lIdx) => (
                  <li key={lIdx} style={{ marginBottom: '4px' }}>
                    {formatInlineMarkup(l.replace(/^[•\-\*]\s*/, ''))}
                  </li>
                ))}
              </ul>
            )
          }

          return (
            <p key={pIdx} style={{ margin: 0, lineHeight: 1.65, fontSize: '13px' }}>
              {formatInlineMarkup(trimmed)}
            </p>
          )
        })}
      </div>
    )
  }

  // Format bold, italics, inline code
  const formatInlineMarkup = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g)
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} style={{ fontWeight: 700, color: 'var(--color-text)' }}>
            {part.slice(2, -2)}
          </strong>
        )
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            style={{
              padding: '2px 5px',
              borderRadius: '4px',
              background: 'var(--color-hover)',
              border: '1px solid var(--color-border)',
              fontSize: '11.5px',
              color: 'var(--color-primary)',
              fontFamily: 'monospace',
            }}
          >
            {part.slice(1, -1)}
          </code>
        )
      }
      return part
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        minHeight: 0,
        flex: 1,
        overflow: 'hidden',
        background: 'var(--color-surface)',
        color: 'var(--color-text)',
        borderRadius: '14px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow)',
        position: 'relative',
      }}
    >
      {/* =========================================================================
          PART A: CHAT HISTORY DRAWER / SIDEBAR (Collapsible Workspace History)
          ========================================================================= */}
      <aside
        style={{
          width: sidebarOpen ? '260px' : '0px',
          minWidth: sidebarOpen ? '260px' : '0px',
          height: '100%',
          background: 'var(--color-sidebar)',
          borderRight: sidebarOpen ? '1px solid var(--color-border)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all .25s ease',
          overflow: 'hidden',
          zIndex: 30,
          position: 'relative',
        }}
      >
        {/* Sidebar Header: History Title & Close */}
        <div
          style={{
            height: '56px',
            padding: '0 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--color-primary)" />
            <strong style={{ fontSize: '13px', color: 'var(--color-text)' }}>
              {isHi ? 'बातचीत इतिहास' : 'Chat History'}
            </strong>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            title="Collapse History"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              background: 'transparent',
              color: 'var(--color-muted)',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
            }}
          >
            <PanelLeftClose size={15} />
          </button>
        </div>

        {/* New Chat Primary Action Button */}
        <div style={{ padding: '12px 14px 8px', flexShrink: 0 }}>
          <button
            type="button"
            onClick={createNewConversation}
            style={{
              width: '100%',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(37,99,235,0.2)',
              transition: 'all .2s ease',
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>{isHi ? 'नया संवाद शुरू करें' : 'Start New Chat'}</span>
          </button>
        </div>

        {/* Search Conversations Input */}
        <div style={{ padding: '0 14px 10px', flexShrink: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--color-input)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '6px 10px',
            }}
          >
            <Search size={14} color="var(--color-muted)" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={isHi ? 'संवाद खोजें...' : 'Search chats...'}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '11.5px',
                color: 'var(--color-text)',
                width: '100%',
              }}
            />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter('')}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
              >
                <X size={12} color="var(--color-muted)" />
              </button>
            )}
          </div>
        </div>

        {/* Grouped Conversations Scroll Area */}
        <div
          className="chat-scroll-area"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '4px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Today Group */}
          {groupedConversations.today.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--color-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '4px 8px',
                }}
              >
                {isHi ? 'आज' : 'Today'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {groupedConversations.today.map((c) => renderConversationItem(c))}
              </div>
            </div>
          )}

          {/* Yesterday Group */}
          {groupedConversations.yesterday.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--color-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '4px 8px',
                }}
              >
                {isHi ? 'कल' : 'Yesterday'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {groupedConversations.yesterday.map((c) => renderConversationItem(c))}
              </div>
            </div>
          )}

          {/* Earlier Group */}
          {groupedConversations.earlier.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--color-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '4px 8px',
                }}
              >
                {isHi ? 'पूर्व के संवाद' : 'Previous Days'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {groupedConversations.earlier.map((c) => renderConversationItem(c))}
              </div>
            </div>
          )}

          {conversations.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--color-muted)', fontSize: '12px' }}>
              {isHi ? 'कोई सहेजा गया संवाद नहीं है' : 'No saved conversations'}
            </div>
          )}
        </div>

        {/* Sidebar Footer: Sources, Theme, Dashboard link, Profile */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            padding: '12px 14px',
            background: 'var(--color-sidebar)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          {/* Knowledge Base Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowSourcesModal(true)}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-hover)',
              color: 'var(--color-primary)',
              fontSize: '11.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={14} />
              <span>{isHi ? 'ज्ञानकोश स्रोत (DFMT.pdf)' : 'Knowledge Sources'}</span>
            </div>
            <span
              style={{
                fontSize: '10px',
                padding: '1px 6px',
                borderRadius: '9999px',
                background: 'var(--color-primary)',
                color: '#ffffff',
                fontWeight: 700,
              }}
            >
              2 Docs
            </span>
          </button>

          {/* Theme Quick Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 8px',
              borderRadius: '8px',
              background: 'var(--color-input)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-muted)' }}>
              <Palette size={13} />
              <span>{isHi ? 'थीम:' : 'Theme:'}</span>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              {availableThemes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  title={t.name}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: t.primaryColor,
                    border: theme === t.id ? '2px solid #ffffff' : '1px solid transparent',
                    outline: theme === t.id ? `2px solid ${t.primaryColor}` : 'none',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          PART B: MAIN CHAT WORKSPACE (Canva/ChatGPT Clean Conversation Canvas)
          ========================================================================= */}
      <main
        style={{
          flex: 1,
          height: '100%',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--color-background)',
        }}
      >
        {/* Top Workspace Bar */}
        <header
          style={{
            height: '60px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          {/* Left: Sidebar toggle & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                title="Expand Sidebar"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <PanelLeft size={16} />
              </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text)' }}>
                {activeConv.title}
              </span>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  background: 'var(--color-hover)',
                  color: 'var(--color-primary)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Sparkles size={11} color="var(--color-primary)" />
                <span>{configStatus.model}</span>
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Language Switch */}
            <div
              style={{
                display: 'flex',
                background: 'var(--color-input)',
                borderRadius: '8px',
                padding: '2px',
                border: '1px solid var(--color-border)',
              }}
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                style={{
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: !isHi ? 'var(--color-primary)' : 'transparent',
                  color: !isHi ? '#ffffff' : 'var(--color-muted)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                style={{
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: isHi ? 'var(--color-primary)' : 'transparent',
                  color: isHi ? '#ffffff' : 'var(--color-muted)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                हिन्दी
              </button>
            </div>

            {/* Clear Conversation */}
            <button
              type="button"
              onClick={() => handleDeleteConversation(activeConvId)}
              title={isHi ? 'बातचीत हटाएं' : 'Clear conversation'}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-muted)',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </header>

        {/* Message Stream Area */}
        <div
          className="chat-scroll-area"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            padding: '20px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '100%', maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Empty State: Canva/ChatGPT Welcome Presentation */}
            {activeConv.messages.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 10px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {/* Glowing AI Emblem */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                    color: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    boxShadow: '0 10px 25px rgba(37,99,235,0.25)',
                    marginBottom: '8px',
                  }}
                >
                  <Sparkles size={32} />
                </div>

                <div>
                  <h1
                    style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: 'var(--color-primary)',
                      letterSpacing: '-0.03em',
                      margin: 0,
                    }}
                  >
                    {isHi ? 'आज मैं आपकी क्या सहायता कर सकता हूँ?' : 'How can I help you today?'}
                  </h1>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-muted)',
                      marginTop: '8px',
                      maxWidth: '560px',
                      lineHeight: 1.5,
                    }}
                  >
                    {isHi
                      ? 'रामगढ़ जिले में डीएमएफटी परियोजनाओं, 10 जीवनचक्र चरणों, तकनीकी एवं प्रशासनिक स्वीकृति (AS/TS), संवेदक भुगतान और विलंब निगरानी हेतु आपका बुद्धिमान सहायक।'
                      : 'Your intelligent conversational workspace for DMFT Ramgarh projects, 10 lifecycle stages, technical/administrative sanctions, payments, and delay analytics.'}
                  </p>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'var(--color-hover)',
                    border: '1px solid var(--color-border)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                  }}
                >
                  <ShieldCheck size={13} />
                  <span>
                    {isHi
                      ? 'आधिकारिक DFMT.pdf एवं उपयोगकर्ता नियमावली द्वारा सत्यापित'
                      : 'Grounded in official DFMT.pdf & eSapmada Knowledge Base'}
                  </span>
                </div>

                {/* 6 Clickable Suggested Cards (2x3 Grid) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '12px',
                    width: '100%',
                    marginTop: '20px',
                    textAlign: 'left',
                  }}
                >
                  {SUGGESTED_CARDS.map((card) => {
                    const Icon = card.icon
                    return (
                      <div
                        key={card.id}
                        onClick={() => handleSendMessage(card.query)}
                        style={{
                          borderRadius: '12px',
                          border: '1px solid var(--color-border)',
                          background: 'var(--color-surface)',
                          padding: '14px 16px',
                          cursor: 'pointer',
                          transition: 'all .2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          boxShadow: 'var(--shadow)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-primary)'
                          e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-border)'
                          e.currentTarget.style.transform = 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              background: 'var(--color-hover)',
                              color: 'var(--color-primary)',
                              display: 'grid',
                              placeItems: 'center',
                            }}
                          >
                            <Icon size={15} />
                          </div>
                          <strong style={{ fontSize: '13px', color: 'var(--color-text)', lineHeight: 1.3 }}>
                            {isHi ? card.titleHi : card.titleEn}
                          </strong>
                        </div>
                        <p style={{ fontSize: '11px', color: 'var(--color-muted)', margin: 0, lineHeight: 1.4 }}>
                          {isHi ? card.descHi : card.descEn}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Conversation Messages */}
            {activeConv.messages.map((msg, index) => {
              const isUser = msg.role === 'user'

              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: isUser ? 'row-reverse' : 'row',
                      alignItems: 'flex-start',
                      gap: '12px',
                      maxWidth: isUser ? '85%' : '100%',
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: isUser ? 'var(--color-hover)' : 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        color: isUser ? 'var(--color-primary)' : '#ffffff',
                        border: isUser ? '1px solid var(--color-border)' : 'none',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      {isUser ? 'U' : <Bot size={17} />}
                    </div>

                    {/* Message Bubble Container */}
                    <div
                      style={{
                        borderRadius: '14px',
                        padding: '14px 18px',
                        background: isUser ? 'var(--color-primary)' : 'var(--color-surface)',
                        color: isUser ? '#ffffff' : 'var(--color-text)',
                        border: isUser ? 'none' : '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow)',
                        position: 'relative',
                        wordBreak: 'break-word',
                      }}
                    >
                      {/* Assistant Header Badge */}
                      {!isUser && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                            paddingBottom: '8px',
                            borderBottom: '1px solid var(--color-border)',
                            fontSize: '11px',
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              color: 'var(--color-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <Sparkles size={13} />
                            <span>eSapmada Gemini Intelligence</span>
                          </span>
                          <span style={{ color: 'var(--color-muted)' }}>{msg.timestamp}</span>
                        </div>
                      )}

                      {/* Content */}
                      {isUser ? (
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.5, fontSize: '13px' }}>
                          {msg.content}
                        </p>
                      ) : (
                        renderFormattedContent(msg.content)
                      )}

                      {/* Typing Streaming Indicator */}
                      {msg.isStreaming && (
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '10px' }}>
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--color-primary)',
                              animation: 'pulse 1s infinite',
                            }}
                          />
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--color-primary)',
                              animation: 'pulse 1s infinite 0.2s',
                            }}
                          />
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--color-primary)',
                              animation: 'pulse 1s infinite 0.4s',
                            }}
                          />
                        </div>
                      )}

                      {/* Verified RAG Sources Expansion Card */}
                      {!isUser && msg.sources && msg.sources.length > 0 && (
                        <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedSources((prev) => ({
                                ...prev,
                                [msg.id]: !prev[msg.id],
                              }))
                            }
                            style={{
                              border: 'none',
                              background: 'transparent',
                              color: 'var(--color-primary)',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              cursor: 'pointer',
                              padding: 0,
                            }}
                          >
                            <ShieldCheck size={14} />
                            <span>
                              {isHi
                                ? `सत्यापित संदर्भ (${msg.sources.length})`
                                : `Verified Source References (${msg.sources.length})`}
                            </span>
                            {expandedSources[msg.id] ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                          </button>

                          {expandedSources[msg.id] && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                              {msg.sources.map((src, sIdx) => (
                                <div
                                  key={sIdx}
                                  style={{
                                    padding: '8px 10px',
                                    borderRadius: '6px',
                                    background: 'var(--color-hover)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '11px',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <strong style={{ color: 'var(--color-text)' }}>{src.title}</strong>
                                    <span
                                      style={{
                                        fontSize: '9.5px',
                                        padding: '1px 6px',
                                        borderRadius: '4px',
                                        background: src.sourceType === 'live_project' ? '#ecfdf5' : '#eff6ff',
                                        color: src.sourceType === 'live_project' ? '#047857' : '#1d4ed8',
                                        fontWeight: 600,
                                      }}
                                    >
                                      {src.sourceType === 'live_project' ? 'Live DB Record' : 'Official Policy / RFP'}
                                    </span>
                                  </div>
                                  <div style={{ color: 'var(--color-muted)', fontSize: '10px', marginTop: '2px' }}>
                                    {src.source} {src.pageNumber ? `• ${src.pageNumber}` : ''}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* AI Message Action Bar */}
                      {!isUser && !msg.isStreaming && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '10px',
                            paddingTop: '6px',
                            borderTop: '1px solid var(--color-border)',
                            fontSize: '11px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {/* Copy button */}
                            <button
                              type="button"
                              onClick={() => handleCopyMessage(msg.content, msg.id)}
                              style={{
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--color-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: 'pointer',
                                padding: '2px 4px',
                                borderRadius: '4px',
                              }}
                            >
                              {copiedMessageId === msg.id ? (
                                <>
                                  <Check size={12} color="#16a34a" />
                                  <span style={{ color: '#16a34a' }}>{isHi ? 'कॉपी हो गया' : 'Copied'}</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  <span>{isHi ? 'कॉपी' : 'Copy'}</span>
                                </>
                              )}
                            </button>

                            {/* Regenerate button */}
                            {index === activeConv.messages.length - 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const lastUser = [...activeConv.messages].reverse().find((m) => m.role === 'user')
                                  if (lastUser) handleSendMessage(lastUser.content)
                                }}
                                style={{
                                  border: 'none',
                                  background: 'transparent',
                                  color: 'var(--color-muted)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  cursor: 'pointer',
                                  padding: '2px 4px',
                                }}
                              >
                                <RotateCcw size={12} />
                                <span>{isHi ? 'पुनः प्रयास' : 'Retry'}</span>
                              </button>
                            )}
                          </div>

                          {/* Feedback */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={() => handleFeedback(msg.id, 'like')}
                              title="Helpful"
                              style={{
                                border: 'none',
                                background: 'transparent',
                                color: msg.feedback === 'like' ? '#16a34a' : 'var(--color-muted)',
                                cursor: 'pointer',
                                padding: '2px',
                              }}
                            >
                              <ThumbsUp size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleFeedback(msg.id, 'dislike')}
                              title="Not helpful"
                              style={{
                                border: 'none',
                                background: 'transparent',
                                color: msg.feedback === 'dislike' ? '#dc2626' : 'var(--color-muted)',
                                cursor: 'pointer',
                                padding: '2px',
                              }}
                            >
                              <ThumbsDown size={13} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* =========================================================================
            PART C: MODERN MESSAGE COMPOSER (Flex Flow Pinned at Bottom)
            ========================================================================= */}
        <div
          style={{
            flexShrink: 0,
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            padding: '12px 20px 14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <div style={{ width: '100%', maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {/* Composer Input Box */}
            <div
              style={{
                borderRadius: '14px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-input)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'border-color .2s ease',
              }}
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputMessage}
                onChange={handleInputResize}
                onKeyDown={handleKeyDown}
                placeholder={
                  isHi
                    ? 'डीएमएफटी परियोजना, 10 जीवनचक्र चरण, या स्वीकृति के बारे में प्रश्न पूछें...'
                    : 'Ask anything about DMFT project lifecycle, approvals, progress, or expenditure...'
                }
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: 'var(--color-text)',
                  fontSize: '13.5px',
                  lineHeight: 1.5,
                  resize: 'none',
                  maxHeight: '180px',
                  fontFamily: 'inherit',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                  {isHi ? 'Enter से भेजें • Shift+Enter नई पंक्ति' : 'Enter to send • Shift+Enter for new line'}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isLoading ? (
                    <button
                      type="button"
                      onClick={handleStopStreaming}
                      style={{
                        height: '32px',
                        padding: '0 12px',
                        borderRadius: '8px',
                        background: '#fee2e2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      <Square size={12} fill="#dc2626" />
                      <span>{isHi ? 'रोकें' : 'Stop'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim()}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: inputMessage.trim() ? 'var(--color-primary)' : 'var(--color-hover)',
                        color: inputMessage.trim() ? '#ffffff' : 'var(--color-muted)',
                        border: 'none',
                        display: 'grid',
                        placeItems: 'center',
                        cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                        transition: 'all .2s ease',
                      }}
                    >
                      <Send size={15} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Official Disclaimer */}
            <p style={{ textAlign: 'center', fontSize: '10.5px', color: 'var(--color-muted)', margin: 0 }}>
              {isHi
                ? 'एआई-जनरेटेड उत्तरों को विभागीय रिकॉर्ड के अनुसार सत्यापित करना आवश्यक हो सकता है।'
                : 'AI-generated responses may require verification against official departmental records.'}
            </p>
          </div>
        </div>
      </main>

      {/* =========================================================================
          KNOWLEDGE BASE SOURCES MODAL
          ========================================================================= */}
      {showSourcesModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(3px)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 100,
            padding: '20px',
          }}
          onClick={() => setShowSourcesModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              background: 'var(--color-surface)',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              padding: '24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={20} color="var(--color-primary)" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text)' }}>
                  {isHi ? 'ई-सम्पदा आधिकारिक ज्ञानकोश एवं स्रोत' : 'eSapmada Official Knowledge Sources'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSourcesModal(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <X size={18} color="var(--color-muted)" />
              </button>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.5, margin: '0 0 16px' }}>
              {isHi
                ? 'यह एआई सहायक मनगढ़ंत उत्तर नहीं देता है। सभी प्रतिक्रियाएं सीधे उपायुक्त कार्यालय रामगढ़ द्वारा जारी आरएफपी और आधिकारिक उपयोगकर्ता नियमावली द्वारा संचालित होती हैं।'
                : 'This AI Assistant does not hallucinate. Responses are grounded strictly in official documents approved by the District Administration Ramgarh.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Document 1: DFMT.pdf */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'var(--color-hover)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <FileText size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--color-text)', display: 'block' }}>
                    DFMT.pdf (Official RFP NIT/2026-27/007)
                  </strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-muted)', display: 'block', marginTop: '2px' }}>
                    27 Pages • Office of the Deputy Commissioner-cum-District Magistrate, Ramgarh (District Planning Section)
                  </span>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-primary)', marginTop: '4px', fontWeight: 600 }}>
                    10 Lifecycle Stages, AS/TS Norms, 11 Pendency Checkpoints & RBAC
                  </div>
                </div>
              </div>

              {/* Document 2: User Guide */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'var(--color-hover)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <BookOpen size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--color-text)', display: 'block' }}>
                    eSapmada: Complete User Guide & AI Knowledge Manual
                  </strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-muted)', display: 'block', marginTop: '2px' }}>
                    25 Parts • Step-by-step Portal Procedures, Forms, Documents, & Troubleshooting
                  </span>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-primary)', marginTop: '4px', fontWeight: 600 }}>
                    Registration Workflow, MB & RA Bill Rules, Inspection & Handover Protocols
                  </div>
                </div>
              </div>

              {/* Live Database Status */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'var(--color-hover)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <Layers size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--color-text)', display: 'block' }}>
                    Live eSapmada Project Master Database
                  </strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-muted)', display: 'block', marginTop: '2px' }}>
                    6 Verified Projects in Mandu, Patratu, Ramgarh, Gola, Chitarpur & Dulmi (₹13.80 Cr Allocated)
                  </span>
                  <div style={{ fontSize: '10.5px', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>
                    Synchronized in real-time with GPS Geo-tagging
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowSourcesModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: 'var(--color-primary)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isHi ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Render conversation item in sidebar
  function renderConversationItem(c: Conversation) {
    const isActive = c.id === activeConvId
    const isEditing = editingTitleId === c.id

    return (
      <div
        key={c.id}
        onClick={() => {
          setActiveConvId(c.id)
          setEditingTitleId(null)
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 10px',
          borderRadius: '8px',
          background: isActive ? 'var(--color-hover)' : 'transparent',
          border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
          cursor: 'pointer',
          transition: 'all .15s ease',
        }}
        className="conv-item"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
          <Sparkles size={13} color={isActive ? 'var(--color-primary)' : 'var(--color-muted)'} style={{ flexShrink: 0 }} />
          {isEditing ? (
            <input
              type="text"
              value={editingTitleText}
              onChange={(e) => setEditingTitleText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveRename(c.id)
                if (e.key === 'Escape') setEditingTitleId(null)
              }}
              onBlur={() => handleSaveRename(c.id)}
              autoFocus
              style={{
                fontSize: '12px',
                border: '1px solid var(--color-primary)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                borderRadius: '4px',
                padding: '2px 4px',
                width: '100%',
                outline: 'none',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              style={{
                fontSize: '12px',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: isActive ? 600 : 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {c.title}
            </span>
          )}
        </div>

        {/* Hover / Active Actions */}
        {isActive && !isEditing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setEditingTitleId(c.id)
                setEditingTitleText(c.title)
              }}
              title="Rename"
              style={{
                border: 'none',
                background: 'transparent',
                color: 'var(--color-muted)',
                cursor: 'pointer',
                padding: '2px',
              }}
            >
              <Edit2 size={12} />
            </button>
            <button
              type="button"
              onClick={(e) => handleDeleteConversation(c.id, e)}
              title="Delete"
              style={{
                border: 'none',
                background: 'transparent',
                color: 'var(--color-muted)',
                cursor: 'pointer',
                padding: '2px',
              }}
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </div>
    )
  }
}
