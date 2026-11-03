export type DMFTUserRole =
  | 'district_admin'
  | 'dmft_ceo'
  | 'nodal_officer'
  | 'senior_officer'
  | 'execution_dept'
  | 'inspection_team'
  | 'deo'
  | 'monitoring_user'
  | 'sys_admin'

export interface DMFTUser {
  id: string
  username: string
  name: string
  email: string
  phone: string
  role: DMFTUserRole
  roleLabelEn: string
  roleLabelHi: string
  department: string
  designation: string
  isActive: boolean
  createdAt: string
  lastLoginAt?: string
}

export interface AuditLog {
  id: string
  entityType: 'project' | 'document' | 'inspection' | 'payment' | 'user' | 'workflow'
  entityId: string
  action: string
  actionHi?: string
  performedBy: string
  role: string
  timestamp: string
  details: string
  ipAddress?: string
}

export interface Contractor {
  id: string
  name: string
  registrationNo: string
  panNo: string
  gstNo: string
  mobile: string
  email: string
  address: string
  activeProjectsCount: number
  completedProjectsCount: number
  delayedProjectsCount: number
  rating: number
}

export type LifecycleStage =
  | 'Stage 1: Work Request & Recommendation'
  | 'Stage 2: Work Request Acceptance'
  | 'Stage 3: Technical Approval'
  | 'Stage 4: Administrative Approval'
  | 'Stage 5: Work Execution'
  | 'Stage 6: Physical Progress'
  | 'Stage 7: Payment Requisition'
  | 'Stage 8: Work Inspection'
  | 'Stage 9: Financial Progress'
  | 'Stage 10: Handover & Commissioning'

export type FileMovementAction =
  | 'Forward'
  | 'Return'
  | 'Revert'
  | 'Resubmit'
  | 'Approve'
  | 'Reject'

export interface WorkflowAction {
  id: string
  fromOfficer: string
  fromDepartment: string
  toOfficer: string
  toDepartment: string
  action: FileMovementAction
  remarks: string
  timestamp: string
  stageBefore: string
  stageAfter: string
}

export interface PhotoAttachment {
  id: string
  url: string
  caption: string
  stage: 'Before' | 'During' | 'After'
  latitude?: number
  longitude?: number
  timestamp: string
}

export interface PhysicalProgressRecord {
  id: string
  percentage: number
  date: string
  updatedBy: string
  role: string
  observations: string
  stage: string
  photos: PhotoAttachment[]
}

export interface PaymentRequisition {
  id: string
  billNo: string
  billDate: string
  requisitionAmount: number
  requisitionLetterNo: string
  requisitionLetterDate: string
  paymentStatus: 'Submitted' | 'Under Scrutiny' | 'Approved' | 'Disbursed' | 'Rejected'
  approvalDate?: string
  disbursedAmount?: number
  paymentRefNo?: string
  remarks?: string
}

export interface ChecklistItem {
  item: string
  itemHi?: string
  verified: boolean
  remark: string
}

export interface InspectionRecord {
  id: string
  scheduledDate: string
  inspectionDate: string
  inspectionTeam: string[]
  checklist: ChecklistItem[]
  photos: PhotoAttachment[]
  findings: string
  deficiencies: string
  actionAssignedTo: string
  dueDate: string
  complianceStatus: 'Pending' | 'Complied' | 'Re-inspection Required'
  complianceRemarks?: string
  reInspectionDate?: string
}

export type DocumentCategory =
  | 'Recommendation Letter'
  | 'Gram Sabha Resolution'
  | 'Meeting Proceedings'
  | 'DPR'
  | 'Technical Sanction (TS)'
  | 'Administrative Sanction (AS)'
  | 'Tender Document'
  | 'Agreement'
  | 'Work Order'
  | 'Progress Photo'
  | 'Payment Requisition'
  | 'Inspection Report'
  | 'Financial Document'
  | 'Utilization Certificate (UC)'
  | 'Handover Document'
  | 'Completion Certificate'

export interface ProjectDocumentItem {
  id: string
  projectId: string
  title: string
  category: DocumentCategory
  fileName: string
  fileSize: string
  fileUrl: string
  uploadedBy: string
  uploadedAt: string
  verificationStatus: 'Pending' | 'Verified' | 'Rejected'
}

export interface InstallmentRecord {
  installmentNo: number
  amount: number
  releaseDate: string
  sanctionLetterNo: string
}

export type RamgarhBlock =
  | 'Mandu'
  | 'Patratu'
  | 'Ramgarh'
  | 'Gola'
  | 'Chitarpur'
  | 'Dulmi'

export interface DMFTProject {
  id: string
  nameEn: string
  nameHi: string
  descriptionEn: string
  descriptionHi: string
  category: string
  type: string
  financialYear: string
  department: string
  responsibleOfficer: string
  contractorId?: string
  contractorName?: string

  // Location
  state: string
  district: string
  block: RamgarhBlock
  panchayat: string
  village: string
  address: string
  latitude?: number
  longitude?: number

  // Current Lifecycle & Status
  currentStage: LifecycleStage
  stageNumber: number // 1 to 10
  status: 'Ongoing' | 'Completed' | 'Pending' | 'Delayed'
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  health: 'On track' | 'Delayed' | 'At risk'

  // Stage 1: Recommendation
  recommendedBy: string
  recommenderDesignation: string
  recommendationLetterNo: string
  recommendationLetterDate: string
  recommendationReceivedDate: string
  recommendationDetails: string

  // Stage 2: Acceptance
  gramSabhaDate?: string
  gramSabhaResolutionNo?: string
  governingCouncilMeetingDate?: string
  managementCommitteeMeetingDate?: string
  acceptanceDecision: 'Accepted' | 'Rejected' | 'Deferred'
  acceptanceDate?: string
  acceptingOfficer?: string
  acceptanceRemarks?: string

  // Stage 3: Technical Approval
  dprDepartment: string
  dprStatus: 'Pending' | 'In Progress' | 'Submitted' | 'Approved'
  technicalSanctionNo?: string
  technicalSanctionDate?: string
  technicalSanctionAmount: number
  technicalAuthority?: string
  technicalRemarks?: string

  // Stage 4: Administrative Approval
  administrativeSanctionNo?: string
  administrativeSanctionDate?: string
  administrativeSanctionAmount: number
  adminApprovingAuthority?: string
  currentPendingOfficer: string
  fileMovementHistory: WorkflowAction[]

  // Stage 5: Work Execution
  tenderNoticeNo?: string
  tenderFloatingDate?: string
  tenderClosingDate?: string
  bidOpeningDate?: string
  agreementNo?: string
  agreementDate?: string
  agreementAmount: number
  workOrderNo?: string
  workOrderDate?: string
  shilanyasDate?: string
  workCommencementDate?: string
  expectedCompletionDate?: string
  actualCompletionDate?: string

  // Stage 6: Physical Progress
  physicalProgress: number
  physicalProgressHistory: PhysicalProgressRecord[]

  // Stage 7: Payment Requisitions
  paymentRequisitions: PaymentRequisition[]

  // Stage 8: Work Inspection
  inspections: InspectionRecord[]

  // Stage 9: Financial Progress & UC
  estimatedCost: number
  approvedAmount: number
  amountReleased: number
  expenditure: number
  balanceAmount: number
  financialProgress: number // utilization %
  ucStatus: 'Not Due' | 'Pending' | 'Submitted' | 'Verified'
  ucSubmissionDate?: string
  ucCertificateNo?: string
  installments: InstallmentRecord[]

  // Stage 10: Handover
  isHandedOver: boolean
  handoverDate?: string
  handoverDepartment?: string
  handoverLetterNo?: string
  completionCertificateNo?: string
  handoverRemarks?: string

  // Document Repository
  documents: ProjectDocumentItem[]

  // Audit Log
  auditTrail: AuditLog[]

  createdAt: string
  updatedAt: string
}

export interface InAppNotification {
  id: string
  title: string
  titleHi: string
  message: string
  messageHi: string
  category: 'pendency' | 'approval' | 'inspection' | 'payment' | 'system'
  recipientRole?: DMFTUserRole | 'all'
  projectId?: string
  read: boolean
  createdAt: string
  actionUrl?: string
}

export interface PendencyItem {
  id: string
  projectId: string
  projectNameEn: string
  projectNameHi: string
  stage: LifecycleStage
  checkpoint: string
  checkpointHi: string
  department: string
  responsibleOfficer: string
  pendingSince: string
  daysPending: number
  delayStatus: 'On Track' | 'Warning' | 'Delayed' | 'Critical'
  requiredAction: string
  requiredActionHi: string
}

