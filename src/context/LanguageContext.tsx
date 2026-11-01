'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { translations, type Language, type TranslationSchema } from '@/lib/i18n/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationSchema
  formatCurrency: (amount: number) => string
  formatDate: (dateStr?: string) => string
  getLocalizedText: (enText: string, hiText?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'pmms_preferred_lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null
      if (saved === 'hi' || saved === 'en') {
        setLanguageState(saved)
      }
    } catch {
      // Ignore localStorage access failures (e.g. private mode)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
      document.cookie = `pmms_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`
    } catch {
      // Ignore
    }
  }

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  const formatCurrency = (amount: number): string => {
    if (isNaN(amount) || amount === 0) return '₹0'
    const absVal = Math.abs(amount)
    if (absVal >= 10000000) {
      const cr = (amount / 10000000).toFixed(2)
      return language === 'hi' ? `₹${cr} करोड़` : `₹${cr} Cr`
    }
    if (absVal >= 100000) {
      const lk = (amount / 100000).toFixed(2)
      return language === 'hi' ? `₹${lk} लाख` : `₹${lk} L`
    }
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return '-'
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr
      return d.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const getLocalizedText = (enText: string, hiText?: string): string => {
    if (language === 'hi' && hiText && hiText.trim().length > 0) {
      return hiText
    }
    return enText
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        formatCurrency,
        formatDate,
        getLocalizedText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}

