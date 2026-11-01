'use client'

import { useState } from 'react'
import { ChevronDown, Filter, Search, X } from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'

export function FilterPanel() {
  const { t, language } = useTranslation()
  const [open, setOpen] = useState(true)
  const [applied, setApplied] = useState(false)

  const filterFields = [
    { id: 'dept', label: t.filter.departmentLabel, defaultVal: language === 'hi' ? 'सभी विभाग' : 'All departments' },
    { id: 'block', label: t.filter.blockLabel, defaultVal: language === 'hi' ? 'सभी प्रखंड' : 'All blocks' },
    { id: 'panchayat', label: t.filter.panchayatLabel, defaultVal: language === 'hi' ? 'सभी पंचायतें' : 'All panchayats' },
    { id: 'fy', label: t.filter.fyLabel, defaultVal: language === 'hi' ? 'सभी वित्तीय वर्ष' : 'All financial years' },
    { id: 'status', label: t.filter.statusLabel, defaultVal: language === 'hi' ? 'सभी स्थितियाँ' : 'All project statuses' },
  ]

  return (
    <div className={`filter-card ${open ? 'open' : ''}`}>
      <button className="filter-title" onClick={() => setOpen(!open)}>
        <span>
          <Filter size={19} />
          <div>
            <strong>{t.filter.advancedFilter}</strong>
            <small>{t.filter.filterSubtitle}</small>
          </div>
        </span>
        <span className="filter-count">
          {applied ? `3 ${t.filter.filtersApplied}` : t.filter.noFilters}
        </span>
        <ChevronDown size={18} />
      </button>
      {open && (
        <div className="filter-body">
          <div className="filter-fields">
            <label>
              <span>{t.filter.keywordLabel}</span>
              <div>
                <Search size={16} />
                <input placeholder="e.g. PRJ-2024 or road" aria-label="Project ID or keyword" />
              </div>
            </label>
            {filterFields.map((x) => (
              <label key={x.id}>
                <span>{x.label}</span>
                <button type="button" className="select-field">
                  {x.defaultVal} <ChevronDown size={15} />
                </button>
              </label>
            ))}
          </div>
          <div className="filter-footer">
            <button type="button" className="clear-btn" onClick={() => setApplied(false)}>
              {t.filter.clearAll}
            </button>
            <button
              type="button"
              className="primary-btn"
              onClick={() => setApplied(true)}
            >
              <Search size={16} />
              {t.filter.applyFilters}
            </button>
          </div>
          {applied && (
            <div className="filter-chips">
              <span>
                Rural Works <X size={13} />
              </span>
              <span>
                FY 2024–25 <X size={13} />
              </span>
              <span>
                Ongoing <X size={13} />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
