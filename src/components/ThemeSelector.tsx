'use client'

import React from 'react'
import { Check, Palette, Sparkles, Moon, Sun, Layers } from 'lucide-react'
import { useTheme, THEMES, type ThemeName } from '@/context/ThemeContext'
import { useTranslation } from '@/context/LanguageContext'

export function ThemeSelector({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, availableThemes } = useTheme()
  const { language } = useTranslation()
  const isHi = language === 'hi'

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {availableThemes.map((t) => {
          const isActive = theme === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              title={`${t.name} ${isActive ? '(Active)' : ''}`}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: t.primaryColor,
                border: isActive ? '2px solid #ffffff' : '2px solid transparent',
                outline: isActive ? `2px solid ${t.primaryColor}` : 'none',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.2)' : 'none',
                transition: 'all .2s ease',
              }}
            >
              {isActive && <Check size={12} color="#ffffff" strokeWidth={3} />}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
            {isHi ? 'पोर्टल थीम एवं उपस्थिति' : 'Portal Theme & Visual Appearance'}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginTop: '4px' }}>
            {isHi
              ? 'पोर्टल के लिए अपना पसंदीदा थीम चुनें। चयनित थीम पूरे एडमिन डैशबोर्ड और एआई चैट में तुरंत लागू होगी।'
              : 'Select your preferred visual theme. The active theme persists automatically across all admin pages and AI workspace.'}
          </p>
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '9999px',
            background: 'var(--color-hover)',
            border: '1px solid var(--color-border)',
            fontSize: '11.5px',
            fontWeight: 600,
            color: 'var(--color-primary)',
          }}
        >
          <Palette size={14} />
          <span>
            {isHi ? 'सक्रिय थीम:' : 'Active Theme:'} <strong>{THEMES[theme]?.name}</strong>
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {availableThemes.map((t) => {
          const isActive = theme === t.id

          return (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              style={{
                borderRadius: '14px',
                border: isActive ? `2px solid ${t.primaryColor}` : '1px solid var(--color-border)',
                background: t.surfaceColor,
                padding: '18px',
                cursor: 'pointer',
                transition: 'all .25s ease',
                boxShadow: isActive ? `0 8px 24px rgba(0,0,0,0.12)` : 'var(--shadow)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Active Badge */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: t.primaryColor,
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Check size={11} strokeWidth={3} />
                  <span>{isHi ? 'सक्रिय' : 'Active'}</span>
                </div>
              )}

              <div>
                {/* Theme Title & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: t.primaryColor,
                      color: '#ffffff',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    {t.id === 'dark' ? <Moon size={16} /> : t.id === 'purple' ? <Sparkles size={16} /> : <Palette size={16} />}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: t.textColor }}>
                      {isHi ? t.nameHi : t.name}
                    </h4>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>
                      Primary: {t.primaryColor}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.5, margin: '8px 0 14px' }}>
                  {isHi ? t.descriptionHi : t.description}
                </p>

                {/* Miniature UI Preview */}
                <div
                  style={{
                    borderRadius: '8px',
                    background: t.backgroundColor,
                    border: `1px solid ${t.borderColor}`,
                    padding: '10px',
                    marginBottom: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  {/* Miniature Topbar */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: t.surfaceColor,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: `1px solid ${t.borderColor}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: t.primaryColor }} />
                      <span style={{ fontSize: '8.5px', fontWeight: 700, color: t.textColor }}>eSapmada</span>
                    </div>
                    <span
                      style={{
                        fontSize: '7px',
                        padding: '1px 5px',
                        borderRadius: '3px',
                        background: t.primaryColor,
                        color: '#ffffff',
                        fontWeight: 600,
                      }}
                    >
                      Admin
                    </span>
                  </div>

                  {/* Miniature Card */}
                  <div
                    style={{
                      background: t.surfaceColor,
                      borderRadius: '4px',
                      padding: '8px',
                      border: `1px solid ${t.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '8px', color: '#64748B' }}>Total Sanctioned</div>
                      <div style={{ fontSize: '10.5px', fontWeight: 800, color: t.textColor }}>₹13.80 Cr</div>
                    </div>
                    <div
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: t.primaryColor,
                        color: '#ffffff',
                        fontSize: '8px',
                        fontWeight: 600,
                      }}
                    >
                      View
                    </div>
                  </div>
                </div>

                {/* Color Swatches */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '9.5px', color: '#64748B', marginRight: '4px' }}>Palette:</span>
                  <div
                    title="Primary"
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      background: t.primaryColor,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  />
                  <div
                    title="Secondary"
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      background: t.secondaryColor,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  />
                  <div
                    title="Background"
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      background: t.backgroundColor,
                      border: '1px solid #cbd5e1',
                    }}
                  />
                  <div
                    title="Surface"
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      background: t.surfaceColor,
                      border: '1px solid #cbd5e1',
                    }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setTheme(t.id)
                }}
                style={{
                  width: '100%',
                  padding: '9px 0',
                  borderRadius: '8px',
                  border: isActive ? `1px solid ${t.primaryColor}` : '1px solid var(--color-border)',
                  background: isActive ? t.primaryColor : 'var(--color-surface)',
                  color: isActive ? '#ffffff' : 'var(--color-text)',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all .2s ease',
                }}
              >
                {isActive ? (
                  <>
                    <Check size={14} />
                    <span>{isHi ? 'वर्तमान में सक्रिय' : 'Currently Active'}</span>
                  </>
                ) : (
                  <span>{isHi ? 'थीम लागू करें' : 'Select Theme'}</span>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

