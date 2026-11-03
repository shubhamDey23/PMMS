'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileSpreadsheet, Plus } from 'lucide-react'
import { FilterPanel } from '@/components/FilterPanel'
import { PageIntro } from '@/components/PageIntro'
import { ProjectsTable } from '@/components/ProjectsTable'
import { BulkUploadModal } from '@/components/projects/BulkUploadModal'
import { useAdminDrawer } from '@/context/AdminDrawerContext'
import { useTranslation } from '@/context/LanguageContext'

export default function AdminProjectsPage() {
  const { openProject } = useAdminDrawer()
  const { t, language } = useTranslation()
  const [bulkModalOpen, setBulkModalOpen] = useState(false)

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
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setBulkModalOpen(true)}
              style={{ textDecoration: 'none' }}
            >
              <FileSpreadsheet size={16} />
              <span>{language === 'hi' ? 'थोक सीएसवी आयात' : 'Bulk CSV Upload'}</span>
            </button>
            <Link
              href="/admin/projects/new"
              className="primary-btn"
              style={{ textDecoration: 'none' }}
            >
              <Plus size={17} />
              <span>{t.table.createProject}</span>
            </Link>
          </div>
        }
      />
      <FilterPanel />
      <ProjectsTable onProject={openProject} />

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        onSuccess={() => setBulkModalOpen(false)}
      />
    </>
  )
}
