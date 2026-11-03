'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown, CircleDollarSign } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { useTranslation } from '@/context/LanguageContext'
import { projectService, type ProjectStatsSummary } from '@/lib/services/project.service'

export function ProgressOverview({ onDetailedReport }: { onDetailedReport?: () => void }) {
  const { t, formatCurrency } = useTranslation()
  const [stats, setStats] = useState<ProjectStatsSummary>(projectService.getStatsSummary())

  useEffect(() => {
    setStats(projectService.getStatsSummary())
    const unsubscribe = projectService.subscribe(() => {
      setStats(projectService.getStatsSummary())
    })
    return () => unsubscribe()
  }, [])

  return (
    <section>
      <SectionHeader
        title={t.sections.performanceOverview}
        subtitle={t.sections.performanceSubtitle}
        action={
          <Link href="/admin/analytics" className="text-action">
            {t.sections.viewDetailedReport} <ArrowUpRight size={15} />
          </Link>
        }
      />
      <div className="performance-grid">
        {/* Physical Progress Card */}
        <div className="card physical-card">
          <div className="card-title">
            <div>
              <h3>{t.stats.physicalProgress}</h3>
              <p>{t.stats.achievedProgress}</p>
            </div>
            <span className="period">
              {t.fy} <ChevronDown size={14} />
            </span>
          </div>
          <div className="physical-content">
            <div className="donut-progress">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="48" />
                <circle className="progress-ring" cx="60" cy="60" r="48" />
              </svg>
              <div>
                <strong>72%</strong>
                <span>{t.common.completed}</span>
              </div>
            </div>
            <div className="progress-metrics">
              <div>
                <span>{t.stats.targetProgress}</span>
                <strong>78%</strong>
              </div>
              <div>
                <span>{t.stats.achievedProgress}</span>
                <strong>72%</strong>
              </div>
              <div>
                <span>{t.stats.gapToTarget}</span>
                <strong className="warning-text">6%</strong>
              </div>
            </div>
          </div>
          <div className="month-chart">
            {[40, 46, 44, 54, 58, 66, 72].map((v, i) => (
              <div key={i}>
                <span style={{ height: `${v}%` }} />
                <small>{['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'][i]}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Progress Card */}
        <div className="card finance-card">
          <div className="card-title">
            <div>
              <h3>{t.stats.financialProgress}</h3>
              <p>{t.stats.totalApproved}</p>
            </div>
            <CircleDollarSign size={21} className="muted-icon" />
          </div>
          <div className="big-money">
            {formatCurrency(stats.totalApprovedAmount)} <span>{t.stats.totalApproved}</span>
          </div>
          <div className="money-grid">
            <div>
              <span>{t.stats.expenditure}</span>
              <strong>{formatCurrency(stats.totalExpenditure)}</strong>
            </div>
            <div>
              <span>{t.stats.remaining}</span>
              <strong>{formatCurrency(stats.totalAvailableBalance)}</strong>
            </div>
          </div>
          <div className="util-row">
            <span>{t.stats.financialUtilization}</span>
            <strong>{stats.overallUtilization}%</strong>
          </div>
          <div className="progress-track large">
            <span style={{ width: `${Math.min(100, stats.overallUtilization)}%` }} />
          </div>
          <div className="finance-note">
            <ArrowUpRight size={15} />
            <span>
              <strong>8.4%</strong> {t.stats.higherThanPrevious}
            </span>
          </div>
        </div>

        {/* Project Status Donut Card */}
        <div className="card status-card">
          <div className="card-title">
            <div>
              <h3>{t.filter.statusLabel}</h3>
              <p>{t.table.stage}</p>
            </div>
            <button className="more-btn" aria-label="More options">
              •••
            </button>
          </div>
          <div className="status-content">
            <div className="status-donut">
              <div>
                <strong>{stats.total}</strong>
                <span>{t.stats.totalProjects}</span>
              </div>
            </div>
            <div className="legend">
              {[
                [t.common.completed, String(stats.completed), 'green'],
                [t.common.ongoing, String(stats.ongoing), 'blue'],
                [t.stats.approvedProjects, String(stats.approved), 'teal'],
                [t.common.pending, String(stats.pending), 'amber'],
                [t.common.delayed, String(stats.delayed), 'red'],
              ].map((x) => (
                <div key={x[0]}>
                  <span>
                    <i className={x[2]} />
                    {x[0]}
                  </span>
                  <strong>{x[1]}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
