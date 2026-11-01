'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { FilterPanel } from '@/components/FilterPanel'
import { PageIntro } from '@/components/PageIntro'
import { ProjectsTable } from '@/components/ProjectsTable'
import { useAdminDrawer } from '@/context/AdminDrawerContext'
import { useTranslation } from '@/context/LanguageContext'

export default function AdminProjectsPage() {
  const { openProject } = useAdminDrawer()
  const { t, language } = useTranslation()

  return (
    <>
      <PageIntro
        eyebrow={language === 'hi' ? 'परियोजनाएँ / निगरानी' : 'Projects / Monitoring'}
        title={language === 'hi' ? 'परियोजना रजिस्टर एवं निगरानी' : 'Project Details & Monitoring'}
        subtitle={
          language === 'hi'
            ? 'एक ही एकीकृत कार्यक्षेत्र से सभी स्वीकृत विकास परियोजनाओं को खोजें, फ़िल्टर करें और निगरानी करें।'
            : 'Search, filter and monitor all sanctioned development projects from a single workspace.'
        }
        actions={
          <Link
            href="/admin/projects/new"
            className="primary-btn"
            style={{ textDecoration: 'none' }}
          >
            <Plus size={17} />
            <span>{t.table.createProject}</span>
          </Link>
        }
      />
      <FilterPanel />
      <ProjectsTable onProject={openProject} />
    </>
  )
}
