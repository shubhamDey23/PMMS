'use client'

import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  FolderKanban,
} from 'lucide-react'
import { projectService, type ProjectStatsSummary } from '@/lib/services/project.service'
import { useTranslation } from '@/context/LanguageContext'
import { MiniChart } from './MiniChart'

export function KpiGrid({ onSelectCategory }: { onSelectCategory?: () => void }) {
  const { t } = useTranslation()
  const [statsSummary, setStatsSummary] = useState<ProjectStatsSummary>(projectService.getStatsSummary())

  useEffect(() => {
    setStatsSummary(projectService.getStatsSummary())
    const unsubscribe = projectService.subscribe(() => {
      setStatsSummary(projectService.getStatsSummary())
    })
    return () => unsubscribe()
  }, [])

  const cards = [
    {
      label: t.stats.approvedProjects,
      value: statsSummary.approved.toLocaleString(),
      delta: '+8.2%',
      icon: ClipboardCheck,
      tone: 'blue' as const,
      bars: [25, 35, 32, 48, 55, 52, 70],
    },
    {
      label: t.stats.ongoingProjects,
      value: statsSummary.ongoing.toLocaleString(),
      delta: '+4.6%',
      icon: Clock3,
      tone: 'green' as const,
      bars: [30, 28, 40, 46, 42, 58, 64],
    },
    {
      label: t.stats.completedProjects,
      value: statsSummary.completed.toLocaleString(),
      delta: '+12.4%',
      icon: CheckCircle2,
      tone: 'teal' as const,
      bars: [22, 34, 31, 48, 50, 62, 75],
    },
    {
      label: t.stats.pendingProjects,
      value: statsSummary.pending.toLocaleString(),
      delta: '-3.1%',
      icon: FileText,
      tone: 'amber' as const,
      bars: [68, 62, 58, 50, 48, 42, 36],
      down: true,
    },
    {
      label: t.stats.delayedProjects,
      value: statsSummary.delayed.toLocaleString(),
      delta: '+1.8%',
      icon: AlertTriangle,
      tone: 'red' as const,
      bars: [30, 35, 32, 40, 42, 46, 52],
      negative: true,
    },
    {
      label: t.stats.totalProjects,
      value: statsSummary.total.toLocaleString(),
      delta: '+7.8%',
      icon: FolderKanban,
      tone: 'purple' as const,
      bars: [28, 35, 42, 40, 54, 62, 72],
    },
  ]

  return (
    <div className="kpi-grid">
      {cards.map((item, i) => (
        <button
          className="kpi-card"
          key={item.label}
          onClick={() => onSelectCategory?.()}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="kpi-top">
            <span className={`icon-tile ${item.tone}`}>
              <item.icon size={20} />
            </span>
            <span className={`trend ${item.negative ? 'bad' : item.down ? 'good' : 'good'}`}>
              {item.down ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
              {item.delta}
            </span>
          </div>
          <span className="kpi-label">{item.label}</span>
          <div className="kpi-value-row">
            <strong>{item.value}</strong>
            <MiniChart bars={item.bars} />
          </div>
          <small>{t.stats.vsPreviousQuarter}</small>
        </button>
      ))}
    </div>
  )
}
