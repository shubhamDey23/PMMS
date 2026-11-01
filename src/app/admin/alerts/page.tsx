'use client'

import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/mock-data'
import { PageIntro } from '@/components/PageIntro'
import { PendingActions } from '@/components/PendingActions'
import { SectionHeader } from '@/components/SectionHeader'
import { useAdminDrawer } from '@/context/AdminDrawerContext'
import { useTranslation } from '@/context/LanguageContext'

export default function AdminAlertsPage() {
  const { openProject } = useAdminDrawer()
  const { t, language, getLocalizedText } = useTranslation()

  return (
    <>
      <PageIntro
        eyebrow={language === 'hi' ? 'कार्यवाही / लंबित' : 'Actions / Pending'}
        title={t.sections.pendingActionsTitle}
        subtitle={t.sections.pendingActionsSubtitle}
      />
      <PendingActions full />
      <div className="card alert-table">
        <SectionHeader
          title={t.sections.priorityQueue}
          subtitle={t.sections.priorityQueueSubtitle}
        />
        <table>
          <thead>
            <tr>
              <th>{language === 'hi' ? 'प्राथमिकता' : 'Priority'}</th>
              <th>{t.table.idAndName}</th>
              <th>{t.table.department}</th>
              <th>{language === 'hi' ? 'लंबित अवधि' : 'Pending since'}</th>
              <th>{language === 'hi' ? 'नियत तिथि' : 'Due date'}</th>
              <th>{t.table.actions}</th>
            </tr>
          </thead>
          <tbody>
            {projects.slice(0, 5).map((p, i) => (
              <tr key={p.id} onClick={() => openProject(p)}>
                <td>
                  <span className={`priority ${i < 2 ? 'critical' : 'medium'}`}>
                    {i < 2 ? t.common.critical : t.common.medium}
                  </span>
                </td>
                <td>
                  <strong>{getLocalizedText(p.nameEn, p.nameHi)}</strong>
                  <span>
                    {p.id} ·{' '}
                    {[
                      language === 'hi' ? 'निरीक्षण कार्रवाई' : 'Inspection action',
                      language === 'hi' ? 'प्रशासनिक स्वीकृति' : 'Administrative approval',
                      language === 'hi' ? 'निविदा समीक्षा' : 'Tender review',
                    ][i % 3]}
                  </span>
                </td>
                <td>{p.department}</td>
                <td>{8 + i * 6} {language === 'hi' ? 'दिन' : 'days'}</td>
                <td>
                  {[
                    language === 'hi' ? 'आज' : 'Today',
                    language === 'hi' ? 'कल' : 'Tomorrow',
                    '28 Apr',
                    '30 Apr',
                    '02 May',
                  ][i]}
                </td>
                <td>
                  <button type="button" className="text-action">
                    {language === 'hi' ? 'समीक्षा करें' : 'Review'} <ArrowRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
