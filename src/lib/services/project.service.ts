import { initialProjects } from '@/data/mock-data'
import type { Project, ProjectStatus, ProjectHealth, ProjectPriority } from '@/types/project'

export interface CreateProjectInput {
  nameEn: string
  nameHi?: string
  descriptionEn: string
  descriptionHi?: string
  category: string
  type?: string
  financialYear: string
  department: string
  responsibleOfficer?: string
  contractor?: string

  state?: string
  district: string
  block?: string
  panchayat?: string
  village?: string
  address?: string
  latitude?: number
  longitude?: number

  estimatedCost: number
  approvedAmount?: number
  agreementAmount?: number
  amountReleased?: number
  expenditure?: number

  approvalDate?: string
  plannedStartDate?: string
  plannedCompletionDate?: string
  actualStartDate?: string
  actualCompletionDate?: string

  physicalProgress?: number
  financialProgress?: number
  stage?: string
  status?: ProjectStatus
  health?: ProjectHealth
  priority?: ProjectPriority
  remarks?: string
  documents?: Array<{ name: string; type: string; size: string }>
}

export interface ProjectStatsSummary {
  total: number
  approved: number
  ongoing: number
  completed: number
  pending: number
  delayed: number
  totalApprovedAmount: number
  totalExpenditure: number
  totalAvailableBalance: number
  overallUtilization: number
  withCoordinates: number
  withoutCoordinates: number
}

const STORAGE_KEY = 'pmms_user_created_projects'

class ProjectService {
  private inMemoryCustomProjects: Project[] = []
  private listeners: Set<() => void> = new Set()

  constructor() {
    this.loadFromStorage()
  }

  private isClient(): boolean {
    return typeof window !== 'undefined'
  }

  private loadFromStorage() {
    if (!this.isClient()) return
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        this.inMemoryCustomProjects = JSON.parse(data)
      }
    } catch (e) {
      console.warn('Failed to load projects from storage:', e)
    }
  }

  private saveToStorage() {
    if (!this.isClient()) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.inMemoryCustomProjects))
    } catch (e) {
      console.warn('Failed to save projects to storage:', e)
    }
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback)
    return () => {
      this.listeners.delete(callback)
    }
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn()
      } catch (err) {
        console.error('Error notifying project listener:', err)
      }
    })
  }

  public listProjects(): Project[] {
    this.loadFromStorage()
    // Custom user projects placed on top, followed by initial baseline projects
    return [...this.inMemoryCustomProjects, ...initialProjects]
  }

  public getProjectById(id: string): Project | undefined {
    return this.listProjects().find((p) => p.id === id)
  }

  public createProject(input: CreateProjectInput): Project {
    const id = `PRJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

    const estimatedCost = Number(input.estimatedCost) || 0
    const approvedAmount = Number(input.approvedAmount) || estimatedCost
    const agreementAmount = Number(input.agreementAmount) || approvedAmount
    const amountReleased = Number(input.amountReleased) || 0
    const expenditure = Number(input.expenditure) || 0
    const balance = Math.max(0, approvedAmount - expenditure)
    const utilization = approvedAmount > 0 ? Math.min(100, Math.round((expenditure / approvedAmount) * 100)) : 0

    const physical = Number(input.physicalProgress) || 0
    const financial = Number(input.financialProgress) || (approvedAmount > 0 ? utilization : 0)

    const status: ProjectStatus = input.status || 'Pending'
    const stage = input.stage || 'Recommendation'
    const health: ProjectHealth = input.health || 'On track'
    const priority: ProjectPriority = input.priority || 'Medium'

    // Format human-readable amount string for legacy components
    const amountInCr = (approvedAmount / 10000000).toFixed(2)
    const amountInL = (approvedAmount / 100000).toFixed(1)
    const amountString = approvedAmount >= 10000000 ? `₹${amountInCr} Cr` : `₹${amountInL} L`

    const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

    const documents = (input.documents || []).map((doc, idx) => ({
      id: `doc-${Date.now()}-${idx}`,
      name: doc.name,
      type: doc.type,
      size: doc.size,
      date: nowStr,
    }))

    const newProject: Project = {
      id,
      nameEn: input.nameEn.trim(),
      nameHi: input.nameHi?.trim(),
      descriptionEn: input.descriptionEn.trim(),
      descriptionHi: input.descriptionHi?.trim(),
      category: input.category,
      type: input.type || 'Development',
      financialYear: input.financialYear,
      department: input.department,
      responsibleOfficer: input.responsibleOfficer?.trim() || 'Assigned Division Officer',
      contractor: input.contractor?.trim() || 'Tender / Contractor Not Assigned',

      location: {
        state: input.state?.trim() || 'Jharkhand',
        district: input.district.trim(),
        block: input.block?.trim() || 'Unassigned Block',
        panchayat: input.panchayat?.trim() || 'Gram Panchayat',
        village: input.village?.trim() || 'Local Area',
        address: input.address?.trim(),
        latitude: input.latitude !== undefined && !isNaN(input.latitude) ? Number(input.latitude) : undefined,
        longitude: input.longitude !== undefined && !isNaN(input.longitude) ? Number(input.longitude) : undefined,
      },

      financials: {
        estimatedCost,
        approvedAmount,
        agreementAmount,
        amountReleased,
        expenditure,
        balance,
        utilization,
      },

      physicalProgress: physical,
      financialProgress: financial,
      stage,
      status,
      health,
      priority,
      approvalDate: input.approvalDate,
      plannedStartDate: input.plannedStartDate,
      plannedCompletionDate: input.plannedCompletionDate,
      actualStartDate: input.actualStartDate,
      actualCompletionDate: input.actualCompletionDate,

      milestones: [
        { label: 'Project sanctioned and registered', labelHi: 'परियोजना स्वीकृत एवं पंजीकृत', date: nowStr, state: 'done' },
        ...(input.plannedStartDate ? [{ label: 'Planned work commencement', labelHi: 'नियोजित कार्य प्रारंभ', date: input.plannedStartDate, state: 'future' as const }] : []),
        ...(input.plannedCompletionDate ? [{ label: 'Target completion deadline', labelHi: 'लक्ष्य पूर्णता समयसीमा', date: input.plannedCompletionDate, state: 'future' as const }] : []),
      ],

      pendingAction: status === 'Pending' ? 'Administrative verification in progress' : 'Scheduled field inspection',
      remarks: input.remarks?.trim() || 'Newly registered project.',
      documents,
      activityLog: [
        { id: `act-${Date.now()}`, action: 'Project sanctioned and entered into eSapmada by Eccentric portal', by: 'Authenticated Administrator', date: 'Just now' },
      ],

      // Backward compatibility getters
      name: input.nameEn.trim(),
      amount: amountString,
      block: input.block?.trim() || 'Central',
      panchayat: input.panchayat?.trim() || '',
      village: input.village?.trim() || '',
      physical,
      financial,
    }

    this.inMemoryCustomProjects.unshift(newProject)
    this.saveToStorage()
    this.notify()
    return newProject
  }

  public getStatsSummary(): ProjectStatsSummary {
    const list = this.listProjects()
    let approved = 0
    let ongoing = 0
    let completed = 0
    let pending = 0
    let delayed = 0

    let totalApprovedAmount = 0
    let totalExpenditure = 0
    let withCoordinates = 0
    let withoutCoordinates = 0

    list.forEach((p) => {
      if (p.status === 'Completed') completed++
      else if (p.status === 'Ongoing') ongoing++
      else if (p.status === 'Delayed') delayed++
      else if (p.status === 'Pending') pending++
      else approved++

      totalApprovedAmount += p.financials.approvedAmount
      totalExpenditure += p.financials.expenditure

      if (p.location.latitude !== undefined && p.location.longitude !== undefined) {
        withCoordinates++
      } else {
        withoutCoordinates++
      }
    })

    const totalAvailableBalance = Math.max(0, totalApprovedAmount - totalExpenditure)
    const overallUtilization = totalApprovedAmount > 0 ? (totalExpenditure / totalApprovedAmount) * 100 : 0

    return {
      total: list.length,
      approved,
      ongoing,
      completed,
      pending,
      delayed,
      totalApprovedAmount,
      totalExpenditure,
      totalAvailableBalance,
      overallUtilization: Math.round(overallUtilization * 10) / 10,
      withCoordinates,
      withoutCoordinates,
    }
  }
}

export const projectService = new ProjectService()

