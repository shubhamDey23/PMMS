'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type ThemeName = 'blue' | 'purple' | 'grey' | 'dark'

export interface ThemeConfig {
  id: ThemeName
  name: string
  nameHi: string
  description: string
  descriptionHi: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  surfaceColor: string
  textColor: string
  borderColor: string
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  blue: {
    id: 'blue',
    name: 'Blue (Default)',
    nameHi: 'नीला (डिफ़ॉल्ट)',
    description: 'Clean government portal theme with professional navy & blue accents',
    descriptionHi: 'पेशेवर नेवी और ब्लू एक्सेंट के साथ स्वच्छ सरकारी पोर्टल थीम',
    primaryColor: '#2563EB',
    secondaryColor: '#1D4ED8',
    backgroundColor: '#F4F8FF',
    surfaceColor: '#FFFFFF',
    textColor: '#172554',
    borderColor: '#DCE6F5',
  },
  purple: {
    id: 'purple',
    name: 'Purple',
    nameHi: 'बैंगनी',
    description: 'Modern AI workspace theme with soft lavender background and violet highlights',
    descriptionHi: 'हल्के लैवेंडर बैकग्राउंड और वायलेट हाइलाइट्स के साथ आधुनिक एआई थीम',
    primaryColor: '#7C3AED',
    secondaryColor: '#6D28D9',
    backgroundColor: '#F7F4FF',
    surfaceColor: '#FFFFFF',
    textColor: '#31204F',
    borderColor: '#E7DDFB',
  },
  grey: {
    id: 'grey',
    name: 'Grey',
    nameHi: 'ग्रे',
    description: 'Neutral enterprise theme with minimal accent and balanced contrast',
    descriptionHi: 'न्यूनतम एक्सेंट और संतुलित कंट्रास्ट के साथ पेशेवर उद्यम थीम',
    primaryColor: '#525B69',
    secondaryColor: '#374151',
    backgroundColor: '#F3F4F6',
    surfaceColor: '#FFFFFF',
    textColor: '#1F2937',
    borderColor: '#D9DEE5',
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    nameHi: 'डार्क',
    description: 'Professional high-contrast dark theme with charcoal background and vibrant accents',
    descriptionHi: 'चारकोल बैकग्राउंड और आकर्षक नीले एक्सेंट के साथ पेशेवर डार्क थीम',
    primaryColor: '#60A5FA',
    secondaryColor: '#3B82F6',
    backgroundColor: '#111827',
    surfaceColor: '#1F2937',
    textColor: '#F9FAFB',
    borderColor: '#374151',
  },
}

interface ThemeContextType {
  theme: ThemeName
  themeConfig: ThemeConfig
  setTheme: (theme: ThemeName) => void
  availableThemes: ThemeConfig[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'esapmada_theme_v1'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('blue')
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage or data-theme attribute
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null
      if (savedTheme && THEMES[savedTheme]) {
        setThemeState(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
      } else {
        const docTheme = document.documentElement.getAttribute('data-theme') as ThemeName | null
        if (docTheme && THEMES[docTheme]) {
          setThemeState(docTheme)
        } else {
          document.documentElement.setAttribute('data-theme', 'blue')
        }
      }
    } catch {
      // Fallback
      document.documentElement.setAttribute('data-theme', 'blue')
    }
    setMounted(true)
  }, [])

  const setTheme = (newTheme: ThemeName) => {
    if (!THEMES[newTheme]) return
    setThemeState(newTheme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    } catch (e) {
      console.warn('Could not persist theme in localStorage', e)
    }
  }

  const themeConfig = THEMES[theme] || THEMES.blue
  const availableThemes = Object.values(THEMES)

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

