'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { AdminAnalytics } from '@/components/AdminAnalytics'
import { KpiGrid } from '@/components/KpiGrid'
import { PageIntro } from '@/components/PageIntro'
import { PendingActions } from '@/components/PendingActions'
import { ProgressOverview } from '@/components/ProgressOverview'
import { ProjectsTable } from '@/components/ProjectsTable'
import { SectionHeader } from '@/components/SectionHeader'
import { GeoOverview } from '@/components/GeoOverview'
import { useAdminDrawer } from '@/context/AdminDrawerContext'
import { useTranslation } from '@/context/LanguageContext'
import { projectService } from '@/lib/services/project.service'
import type { Project } from '@/types/project'

export default function AdminDashboardPage() {
  const { openProject } = useAdminDrawer()
  const { t, language } = useTranslation()
  const [projectsList, setProjectsList] = useState<Project[]>([])

  useEffect(() => {
    setProjectsList(projectService.listProjects())
    const unsubscribe = projectService.subscribe(() => {
      setProjectsList(projectService.listProjects())
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <PageIntro
        eyebrow={t.sections.executiveOverview}
        title={t.sections.dashboardTitle}
        subtitle={t.sections.dashboardSubtitle}
        actions={
          <Link
            href="/admin/projects/new"
            className="primary-btn"
            style={{ textDecoration: 'none' }}
          >
            <Plus size={16} />
            <span>{t.table.createProject}</span>
          </Link>
        }
      />

      <KpiGrid />

      {/* Real Geolocation & Coordinate Map */}
      <GeoOverview projects={projectsList} onOpenProject={openProject} />

      <ProgressOverview />
      <AdminAnalytics />
      <PendingActions />

      <section>
        <SectionHeader
          title={t.sections.projectDetailsTitle}
          subtitle={t.sections.projectDetailsSubtitle}
          action={
            <Link href="/admin/projects" className="text-action">
              {t.sections.viewAllProjects} <ArrowRight size={15} />
            </Link>
          }
        />
        <ProjectsTable onProject={openProject} compact />
      </section>
    </>
  )
}
