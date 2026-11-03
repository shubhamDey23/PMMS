import { dmftDatabase } from './dmft-database.service'
import type { DMFTProject } from '@/types/dmft'
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

function dmftToLegacyProject(d: DMFTProject): Project {
  const approvedAmount = d.approvedAmount || d.estimatedCost || 0
  const expenditure = d.expenditure || 0
  const balance = Math.max(0, approvedAmount - expenditure)
  const utilization = approvedAmount > 0 ? Math.min(100, Math.round((expenditure / approvedAmount) * 100)) : 0
  const amountInCr = (approvedAmount / 10000000).toFixed(2)
  const amountInL = (approvedAmount / 100000).toFixed(1)
  const amountString = approvedAmount >= 10000000 ? `₹${amountInCr} Cr` : `₹${amountInL} L`

  return {
    id: d.id,
    nameEn: d.nameEn,
    nameHi: d.nameHi,
    descriptionEn: d.descriptionEn,
    descriptionHi: d.descriptionHi,
    category: d.category,
    type: d.type,
    financialYear: d.financialYear,
    department: d.department,
    responsibleOfficer: d.responsibleOfficer,
    contractor: d.contractorName || 'Assigned Agency',
    location: {
      state: d.state,
      district: d.district,
      block: d.block,
      panchayat: d.panchayat,
      village: d.village,
      address: d.address,
      latitude: d.latitude,
      longitude: d.longitude,
    },
    financials: {
      estimatedCost: d.estimatedCost,
      approvedAmount,
      agreementAmount: d.agreementAmount || approvedAmount,
      amountReleased: d.amountReleased,
      expenditure,
      balance,
      utilization,
    },
    physicalProgress: d.physicalProgress,
    financialProgress: d.financialProgress || utilization,
    stage: d.currentStage,
    status: d.status,
    health: d.health,
    priority: d.priority,
    approvalDate: d.administrativeSanctionDate || d.createdAt.split('T')[0],
    plannedStartDate: d.tenderFloatingDate,
    plannedCompletionDate: d.expectedCompletionDate,
    actualStartDate: d.workCommencementDate,
    actualCompletionDate: d.actualCompletionDate,
    milestones: [
      { label: 'Work Request Logged', labelHi: 'कार्य अनुशंसा दर्ज', date: d.recommendationLetterDate, state: 'done' },
      { label: 'Administrative Approval (AS)', labelHi: 'प्रशासनिक स्वीकृति', date: d.administrativeSanctionDate || 'Pending', state: d.stageNumber >= 4 ? 'done' : 'active' },
      { label: 'Work Execution / Tender', labelHi: 'निविदा एवं एकरारनामा', date: d.workOrderDate || 'Pending', state: d.stageNumber >= 5 ? 'done' : 'future' },
      { label: 'Handover & Commissioning', labelHi: 'हैंडओवर एवं लोकार्पण', date: d.handoverDate || 'Future', state: d.isHandedOver ? 'done' : 'future' },
    ],
    pendingAction: d.status === 'Completed' ? 'Project Commissioned' : d.status === 'Delayed' ? 'Recovery plan notice' : 'Work in progress',
    remarks: d.recommendationDetails || '',
    documents: d.documents.map((doc) => ({
      id: doc.id,
      name: doc.title || doc.fileName,
      type: doc.category,
      size: doc.fileSize,
      date: doc.uploadedAt.split('T')[0],
      url: doc.fileUrl,
    })),
    activityLog: (d.auditTrail || []).map((a) => ({
      id: a.id,
      action: a.action,
      by: a.performedBy,
      date: a.timestamp.split('T')[0],
    })),
    name: d.nameEn,
    amount: amountString,
    block: d.block,
    panchayat: d.panchayat,
    village: d.village,
    physical: d.physicalProgress,
    financial: d.financialProgress || utilization,
  }
}

class ProjectService {
  private listeners: Set<() => void> = new Set()

  constructor() {
    dmftDatabase.subscribe(() => {
      this.notify()
    })
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
    const dmftList = dmftDatabase.getAllProjects()
    return dmftList.map(dmftToLegacyProject)
  }

  public getProjectById(id: string): Project | undefined {
    const p = dmftDatabase.getProjectById(id)
    return p ? dmftToLegacyProject(p) : undefined
  }

  public createProject(input: CreateProjectInput): Project {
    const adminUser = dmftDatabase.getUsers()[0]
    const created = dmftDatabase.createProject(
      {
        nameEn: input.nameEn,
        nameHi: input.nameHi,
        descriptionEn: input.descriptionEn,
        descriptionHi: input.descriptionHi,
        category: input.category,
        type: input.type,
        financialYear: input.financialYear,
        department: input.department,
        responsibleOfficer: input.responsibleOfficer,
        block: (input.block as any) || 'Mandu',
        panchayat: input.panchayat,
        village: input.village,
        address: input.address,
        latitude: input.latitude,
        longitude: input.longitude,
        estimatedCost: Number(input.estimatedCost) || 0,
        approvedAmount: Number(input.approvedAmount) || Number(input.estimatedCost) || 0,
        agreementAmount: Number(input.agreementAmount) || 0,
        amountReleased: Number(input.amountReleased) || 0,
        expenditure: Number(input.expenditure) || 0,
        physicalProgress: Number(input.physicalProgress) || 0,
        status: input.status || 'Pending',
        priority: input.priority || 'Medium',
      },
      adminUser
    )

    this.notify()
    return dmftToLegacyProject(created)
  }

  public getStatsSummary(): ProjectStatsSummary {
    const kpis = dmftDatabase.getDashboardKPIs()
    const all = dmftDatabase.getAllProjects()
    let withCoords = 0
    let withoutCoords = 0

    all.forEach((p) => {
      if (p.latitude !== undefined && p.longitude !== undefined) withCoords++
      else withoutCoords++
    })

    return {
      total: kpis.total,
      approved: kpis.approved,
      ongoing: kpis.ongoing,
      completed: kpis.completed,
      pending: kpis.pending,
      delayed: kpis.delayed,
      totalApprovedAmount: kpis.totalApprovedCost,
      totalExpenditure: kpis.totalExpenditure,
      totalAvailableBalance: kpis.totalAvailableBalance,
      overallUtilization: kpis.overallUtilization,
      withCoordinates: withCoords,
      withoutCoordinates: withoutCoords,
    }
  }
}

export const projectService = new ProjectService()

