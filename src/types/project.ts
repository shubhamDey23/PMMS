import type { LucideIcon } from 'lucide-react'

export type View = 'dashboard' | 'projects' | 'analytics' | 'alerts' | 'public'

export type ProjectStatus = 'Ongoing' | 'Completed' | 'Pending' | 'Delayed'
export type ProjectHealth = 'On track' | 'Delayed' | 'At risk'
export type ProjectPriority = 'Critical' | 'High' | 'Medium' | 'Low'

export interface ProjectLocation {
  state?: string
  district: string
  block?: string
  panchayat?: string
  village?: string
  address?: string
  latitude?: number
  longitude?: number
}

export interface ProjectFinancials {
  estimatedCost: number
  approvedAmount: number
  agreementAmount: number
  amountReleased: number
  expenditure: number
  balance: number
  utilization: number
}

export interface ProjectMilestone {
  label: string
  labelHi?: string
  date: string
  state: 'done' | 'active' | 'future'
}

export interface ProjectDocument {
  id: string
  name: string
  type: string
  size: string
  date: string
  url?: string
}

export interface ProjectActivity {
  id: string
  action: string
  by: string
  date: string
}

export interface Project {
  id: string
  nameEn: string
  nameHi?: string
  descriptionEn: string
  descriptionHi?: string
  category: string
  type?: string
  financialYear: string
  department: string
  responsibleOfficer: string
  contractor?: string
  location: ProjectLocation
  financials: ProjectFinancials
  physicalProgress: number
  financialProgress: number
  stage: string
  status: ProjectStatus
  health: ProjectHealth
  priority: ProjectPriority
  recommendationDate?: string
  approvalDate?: string
  plannedStartDate?: string
  plannedCompletionDate?: string
  actualStartDate?: string
  actualCompletionDate?: string
  milestones: ProjectMilestone[]
  pendingAction?: string
  remarks?: string
  documents: ProjectDocument[]
  activityLog: ProjectActivity[]

  // Backward compatibility fields for legacy components
  name: string
  amount: string
  departmentLegacy?: string
  block: string
  panchayat: string
  village: string
  physical: number
  financial: number
}

export interface NavItem {
  label: string
  labelHi?: string
  icon: LucideIcon
  href: string
  view?: View
  exact?: boolean
}

export interface StatItem {
  label: string
  labelHi?: string
  value: string
  delta: string
  icon: LucideIcon
  tone: 'blue' | 'green' | 'teal' | 'amber' | 'red' | 'purple'
  bars: number[]
  down?: boolean
  negative?: boolean
}

export interface BlockStat {
  name: string
  nameHi?: string
  total: number
  completed: number
  ongoing: number
}

export interface AlertItem {
  label: string
  labelHi?: string
  count: number
  meta: string
  metaHi?: string
  icon: LucideIcon
  tone: string
}
