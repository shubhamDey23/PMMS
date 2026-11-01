'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Plus,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { projectService } from '@/lib/services/project.service'
import type { Project } from '@/types/project'
import { useTranslation } from '@/context/LanguageContext'
import { Status } from './Status'

export function ProjectsTable({
  onProject,
  compact = false,
  onAddProject,
}: {
  onProject: (p: Project) => void
  compact?: boolean
  onAddProject?: () => void
}) {
  const { t, language, formatCurrency, getLocalizedText } = useTranslation()
  const [allProjects, setAllProjects] = useState<Project[]>(() => projectService.listProjects())
  const [query, setQuery] = useState('')

  useEffect(() => {
    // Initial fetch to pick up any client-side localStorage overrides
    setAllProjects(projectService.listProjects())

    // Subscribe to service updates (e.g. when project is added)
    const unsubscribe = projectService.subscribe(() => {
      setAllProjects(projectService.listProjects())
    })

    return () => unsubscribe()
  }, [])

  const shown = allProjects.filter((p) => {
    const q = query.toLowerCase()
    return (
      p.id.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      (p.nameHi && p.nameHi.toLowerCase().includes(q)) ||
      p.department.toLowerCase().includes(q) ||
      p.location.block?.toLowerCase().includes(q) ||
      p.location.district?.toLowerCase().includes(q) ||
      p.location.village?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="card table-card">
      <div className="table-tools">
        <div className="table-search">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.table.searchPrompt}
            aria-label="Search projects"
          />
        </div>
        <button type="button" className="secondary-btn">
          <SlidersHorizontal size={16} /> {t.table.columns}
        </button>
        <button type="button" className="secondary-btn" onClick={() => window.print()}>
          <Download size={16} /> {t.table.export}
        </button>
        {!compact && (
          <Link
            href="/admin/projects/new"
            className="primary-btn"
            style={{ textDecoration: 'none' }}
          >
            <Plus size={16} /> {t.table.addProject}
          </Link>
        )}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{t.table.idAndName}</th>
              <th>{t.table.department}</th>
              <th>{t.table.location}</th>
              <th>{t.table.approvedAmount}</th>
              <th>{t.table.physical}</th>
              <th>{t.table.financial}</th>
              <th>{t.table.status}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {shown.length > 0 ? (
              shown.map((p) => {
                const displayName = getLocalizedText(p.nameEn, p.nameHi)
                const isHiFallback = language === 'hi' && (!p.nameHi || p.nameHi.trim().length === 0)

                return (
                  <tr key={p.id} onClick={() => onProject(p)}>
                    <td>
                      <span className="project-id">{p.id}</span>
                      <strong className="project-name">{displayName}</strong>
                      {isHiFallback && (
                        <small style={{ color: '#9a6d22', fontSize: '8px', display: 'block', marginTop: '2px' }}>
                          {t.drawer.showingEnglishFallback}
                        </small>
                      )}
                    </td>
                    <td>{p.department}</td>
                    <td>
                      <strong className="location">{p.location.block || p.block}</strong>
                      <span>
                        {p.location.panchayat || p.panchayat} · {p.location.village || p.village}
                      </span>
                    </td>
                    <td>
                      <strong>{formatCurrency(p.financials?.approvedAmount || 0)}</strong>
                    </td>
                    <td>
                      <div className="table-progress">
                        <span>
                          <i style={{ width: `${p.physicalProgress}%` }} />
                        </span>
                        <b>{p.physicalProgress}%</b>
                      </div>
                    </td>
                    <td>
                      <div className="table-progress financial">
                        <span>
                          <i style={{ width: `${p.financialProgress}%` }} />
                        </span>
                        <b>{p.financialProgress}%</b>
                      </div>
                    </td>
                    <td>
                      <Status value={p.status} />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="row-action"
                        aria-label="View project details"
                        onClick={(e) => {
                          e.stopPropagation()
                          onProject(p)
                        }}
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '36px 12px' }}>
                  <AlertCircle size={28} style={{ color: 'var(--muted)', margin: '0 auto 8px' }} />
                  <strong>{t.table.noProjectsFound}</strong>
                  <p style={{ color: 'var(--muted)', fontSize: '10px', marginTop: '4px' }}>
                    {t.table.tryRefining}
                  </p>
                  {query && (
                    <button
                      type="button"
                      className="clear-btn"
                      style={{ marginTop: '8px', color: 'var(--green)' }}
                      onClick={() => setQuery('')}
                    >
                      {t.table.resetFilters}
                    </button>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>
          {t.table.showing} 1–{shown.length} {t.table.of} {allProjects.length} {t.table.projects}
        </span>
        <div>
          <button aria-label="Previous page">
            <ChevronLeft size={15} />
          </button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <span>…</span>
          <button>{Math.max(1, Math.ceil(allProjects.length / 10))}</button>
          <button aria-label="Next page">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
