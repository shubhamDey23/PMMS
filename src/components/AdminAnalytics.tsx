'use client'

import { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { blocks } from '@/data/mock-data'
import { SectionHeader } from './SectionHeader'
import { useTranslation } from '@/context/LanguageContext'

export function AdminAnalytics() {
  const { t, language } = useTranslation()
  const [activeTab, setActiveTab] = useState<'Block' | 'Panchayat' | 'Department'>('Block')

  const tabLabels = {
    Block: language === 'hi' ? 'प्रखंड' : 'Block',
    Panchayat: language === 'hi' ? 'पंचायत' : 'Panchayat',
    Department: language === 'hi' ? 'विभाग' : 'Department',
  }

  return (
    <section>
      <SectionHeader
        title={t.sections.adminAnalytics}
        subtitle={t.sections.adminAnalyticsSubtitle}
        action={
          <div className="segmented">
            {(['Block', 'Panchayat', 'Department'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        }
      />
      <div className="analytics-grid">
        <div className="card block-card">
          <div className="card-title">
            <div>
              <h3>{t.sections.projectsByBlock}</h3>
              <p>{t.common.completed} vs {t.common.ongoing}</p>
            </div>
            <button type="button" className="period">
              {language === 'hi' ? 'शीर्ष 5 प्रखंड' : 'Top 5 blocks'} <ChevronDown size={14} />
            </button>
          </div>
          <div className="bar-legend">
            <span>
              <i className="complete" />
              {t.common.completed}
            </span>
            <span>
              <i className="ongoing" />
              {t.common.ongoing}
            </span>
          </div>
          <div className="horizontal-bars">
            {blocks.map((b) => (
              <div className="bar-row" key={b.name}>
                <span>{language === 'hi' && b.nameHi ? b.nameHi : b.name}</span>
                <div className="stack-bar">
                  <i style={{ width: `${(b.completed / 300) * 100}%` }} />
                  <b style={{ width: `${(b.ongoing / 300) * 100}%` }} />
                </div>
                <strong>{b.total}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="card dept-card">
          <div className="card-title">
            <div>
              <h3>{t.sections.departmentPerformance}</h3>
              <p>{t.stats.physicalProgress} &amp; {t.stats.financialProgress}</p>
            </div>
            <ArrowUpRight size={18} />
          </div>
          {[
            { name: 'Rural Works', nameHi: 'ग्रामीण कार्य', count: '128 projects', physical: 84, financial: 76 },
            { name: 'Public Health', nameHi: 'लोक स्वास्थ्य', count: '96 projects', physical: 78, financial: 72 },
            { name: 'Education', nameHi: 'स्कूली शिक्षा', count: '84 projects', physical: 91, financial: 88 },
            { name: 'Water Resources', nameHi: 'जल संसाधन', count: '72 projects', physical: 69, financial: 62 },
            { name: 'Health & Family', nameHi: 'स्वास्थ्य एवं परिवार', count: '58 projects', physical: 74, financial: 68 },
          ].map((d) => (
            <div className="dept-row" key={d.name}>
              <div className="dept-icon">{d.name.slice(0, 2).toUpperCase()}</div>
              <div className="dept-info">
                <div>
                  <strong>{language === 'hi' ? d.nameHi : d.name}</strong>
                  <span>{d.count}</span>
                </div>
                <div className="dual-bars">
                  <span>
                    <i style={{ width: `${d.physical}%` }} />
                  </span>
                  <span>
                    <i style={{ width: `${d.financial}%` }} />
                  </span>
                </div>
              </div>
              <b>{d.physical}%</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
