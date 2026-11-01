'use client'

import { createContext, useContext, useState } from 'react'
import type { Project } from '@/types/project'
import { ProjectDrawer } from '@/components/ProjectDrawer'

interface AdminDrawerContextType {
  openProject: (project: Project) => void
  closeProject: () => void
  selectedProject: Project | null
}

const AdminDrawerContext = createContext<AdminDrawerContextType | undefined>(undefined)

export function AdminDrawerProvider({ children }: { children: React.ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <AdminDrawerContext.Provider
      value={{
        openProject: (p) => setSelectedProject(p),
        closeProject: () => setSelectedProject(null),
        selectedProject,
      }}
    >
      {children}
      {selectedProject && (
        <ProjectDrawer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </AdminDrawerContext.Provider>
  )
}

export function useAdminDrawer() {
  const context = useContext(AdminDrawerContext)
  if (!context) {
    throw new Error('useAdminDrawer must be used within an AdminDrawerProvider')
  }
  return context
}

