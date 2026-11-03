import type {
  DMFTProject,
  Contractor,
  DMFTUser,
  AuditLog,
  InAppNotification,
  PendencyItem,
  WorkflowAction,
  PhysicalProgressRecord,
  PaymentRequisition,
  InspectionRecord,
  ProjectDocumentItem,
  LifecycleStage,
  RamgarhBlock,
} from '@/types/dmft'

// =========================================================================
// 1. SEED USERS & 9 RFP ROLES
// =========================================================================
export const SEED_USERS: DMFTUser[] = [
  {
    id: 'USR-RMG-001',
    username: 'admin',
    name: 'Ananya Sharma, IAS',
    email: 'dc-ramgarh@jharkhandmail.gov.in',
    phone: '06553-231359',
    role: 'district_admin',
    roleLabelEn: 'District Administration (DC / DM)',
    roleLabelHi: 'जिला प्रशासन (उपायुक्त - सह - जिला दंडाधिकारी)',
    department: 'District Collectorate, Ramgarh',
    designation: 'Deputy Commissioner-cum-District Magistrate',
    isActive: true,
    createdAt: '2026-01-10T10:00:00Z',
    lastLoginAt: '2026-11-03T09:15:00Z',
  },
  {
    id: 'USR-RMG-002',
    username: 'dmft_ceo',
    name: 'Rajesh Kumar, DDC',
    email: 'ddc-ramgarh@jharkhandmail.gov.in',
    phone: '06553-231360',
    role: 'dmft_ceo',
    roleLabelEn: 'DMFT CEO / Member Secretary',
    roleLabelHi: 'डीएमएफटी सीईओ / सदस्य सचिव',
    department: 'DMFT Cell, Ramgarh',
    designation: 'Deputy Development Commissioner',
    isActive: true,
    createdAt: '2026-01-10T10:00:00Z',
    lastLoginAt: '2026-11-02T16:20:00Z',
  },
  {
    id: 'USR-RMG-003',
    username: 'nodal_officer',
    name: 'Manoj Sinha',
    email: 'dpo-ramgarh@jharkhandmail.gov.in',
    phone: '06553-231361',
    role: 'nodal_officer',
    roleLabelEn: 'Nodal Officer / DPO',
    roleLabelHi: 'नोडल पदाधिकारी / जिला योजना पदाधिकारी',
    department: 'District Planning Office',
    designation: 'District Planning Officer',
    isActive: true,
    createdAt: '2026-01-12T10:00:00Z',
    lastLoginAt: '2026-11-03T08:30:00Z',
  },
  {
    id: 'USR-RMG-004',
    username: 'senior_officer',
    name: 'Vikram Soren',
    email: 'ac-ramgarh@jharkhandmail.gov.in',
    phone: '06553-231362',
    role: 'senior_officer',
    roleLabelEn: 'Designated Senior Officer',
    roleLabelHi: 'नामित वरिष्ठ पदाधिकारी',
    department: 'Additional Collectorate',
    designation: 'Additional Collector',
    isActive: true,
    createdAt: '2026-01-15T10:00:00Z',
    lastLoginAt: '2026-11-01T11:45:00Z',
  },
  {
    id: 'USR-RMG-005',
    username: 'exec_rwd',
    name: 'Er. R. K. Mahato',
    email: 'ee-rwd-ramgarh@jharkhandmail.gov.in',
    phone: '06553-232111',
    role: 'execution_dept',
    roleLabelEn: 'Execution Department (EE Rural Works)',
    roleLabelHi: 'कार्यकारी विभाग (कार्यपालक अभियंता, ग्रामीण कार्य)',
    department: 'Rural Works Department, Works Division Ramgarh',
    designation: 'Executive Engineer',
    isActive: true,
    createdAt: '2026-02-01T10:00:00Z',
    lastLoginAt: '2026-11-02T14:10:00Z',
  },
  {
    id: 'USR-RMG-006',
    username: 'insp_team',
    name: 'Er. Amit Verma',
    email: 'ae-quality-ramgarh@jharkhandmail.gov.in',
    phone: '06553-232222',
    role: 'inspection_team',
    roleLabelEn: 'Field / Inspection Team',
    roleLabelHi: 'क्षेत्रीय / स्थलीय निरीक्षण दल',
    department: 'District Technical Vigilance Cell',
    designation: 'Assistant Engineer & Quality Auditor',
    isActive: true,
    createdAt: '2026-02-05T10:00:00Z',
    lastLoginAt: '2026-11-03T07:50:00Z',
  },
  {
    id: 'USR-RMG-007',
    username: 'deo_ramgarh',
    name: 'Pooja Kumari',
    email: 'deo1-dpo-ramgarh@jharkhandmail.gov.in',
    phone: '06553-232333',
    role: 'deo',
    roleLabelEn: 'Data Entry Operator',
    roleLabelHi: 'डाटा एंट्री ऑपरेटर',
    department: 'District Planning Office',
    designation: 'Senior Computer Operator',
    isActive: true,
    createdAt: '2026-02-10T10:00:00Z',
    lastLoginAt: '2026-11-03T09:00:00Z',
  },
  {
    id: 'USR-RMG-008',
    username: 'monitor_user',
    name: 'Suresh Prasad',
    email: 'mis-dmft-ramgarh@jharkhandmail.gov.in',
    phone: '06553-232444',
    role: 'monitoring_user',
    roleLabelEn: 'Monitoring & MIS Officer',
    roleLabelHi: 'निगरानी एवं एमआईएस विश्लेषक',
    department: 'DMFT PMU Cell',
    designation: 'MIS Specialist',
    isActive: true,
    createdAt: '2026-02-15T10:00:00Z',
    lastLoginAt: '2026-11-02T17:30:00Z',
  },
  {
    id: 'USR-RMG-009',
    username: 'sys_admin',
    name: 'DIO Ramgarh (NIC)',
    email: 'dio-rmg@nic.in',
    phone: '06553-232555',
    role: 'sys_admin',
    roleLabelEn: 'System Administrator (NIC / IT)',
    roleLabelHi: 'सिस्टम एडमिनिस्ट्रेटर (एनआईसी / आईटी)',
    department: 'National Informatics Centre, Ramgarh',
    designation: 'District Informatics Officer',
    isActive: true,
    createdAt: '2026-01-01T10:00:00Z',
    lastLoginAt: '2026-11-03T08:00:00Z',
  },
]

// =========================================================================
// 2. SEED CONTRACTORS / AGENCIES MASTER
// =========================================================================
export const SEED_CONTRACTORS: Contractor[] = [
  {
    id: 'CONTR-01',
    name: 'Jharkhand Infrastructure & Construction Ltd.',
    registrationNo: 'REG/RWD/RMG/2023/048',
    panNo: 'AAACJ1234F',
    gstNo: '20AAACJ1234F1Z5',
    mobile: '9431102244',
    email: 'contact@jharkhandinfra.in',
    address: 'Main Road, Ramgarh Cantt, Jharkhand - 829122',
    activeProjectsCount: 4,
    completedProjectsCount: 18,
    delayedProjectsCount: 1,
    rating: 4.6,
  },
  {
    id: 'CONTR-02',
    name: 'Chotanagpur Hydro & Water Works PVT LTD',
    registrationNo: 'REG/DWSD/RMG/2022/102',
    panNo: 'AABCC5678G',
    gstNo: '20AABCC5678G1Z2',
    mobile: '9431105588',
    email: 'info@cnphydro.com',
    address: 'Near Subhash Chowk, Ramgarh - 829122',
    activeProjectsCount: 3,
    completedProjectsCount: 12,
    delayedProjectsCount: 0,
    rating: 4.8,
  },
  {
    id: 'CONTR-03',
    name: 'M/S Maa Chhinnamastika Builders',
    registrationNo: 'REG/RWD/RMG/2021/019',
    panNo: 'AACCM9876K',
    gstNo: '20AACCM9876K1Z9',
    mobile: '9835109911',
    email: 'maachhinnamastika@gmail.com',
    address: 'Rajrappa More, Gola Road, Ramgarh - 829110',
    activeProjectsCount: 2,
    completedProjectsCount: 8,
    delayedProjectsCount: 1,
    rating: 4.2,
  },
  {
    id: 'CONTR-04',
    name: 'Patratu Power & Solar Solutions',
    registrationNo: 'REG/JREDA/RMG/2024/005',
    panNo: 'AADDP4321P',
    gstNo: '20AADDP4321P1Z4',
    mobile: '9835114422',
    email: 'patratusolar@yahoo.co.in',
    address: 'PTPS Colony Market, Patratu, Ramgarh - 829119',
    activeProjectsCount: 3,
    completedProjectsCount: 15,
    delayedProjectsCount: 0,
    rating: 4.9,
  },
]

// =========================================================================
// 3. SEED RAMGARH DMFT PROJECTS (10 STAGES REPRESENTED)
// =========================================================================
export const SEED_DMFT_PROJECTS: DMFTProject[] = [
  {
    id: 'PRJ-DMFT-RMG-0814',
    nameEn: 'Piped Water Supply & Deep Borewell Scheme for Mining-Affected Habitations',
    nameHi: 'खनन प्रभावित बस्तियों हेतु नल-जल आपूर्ति एवं डीप बोरवेल योजना',
    descriptionEn: 'Augmentation of drinking water infrastructure across coal belt mining colonies in Kuju East colliery area, Mandu Block.',
    descriptionHi: 'मांडू प्रखंड अंतर्गत कुजू ईस्ट कोलियरी क्षेत्र के खनन प्रभावित बस्तियों में सुरक्षित पेयजल आपूर्ति हेतु पाइपलाइन एवं वाटर ट्रीटमेंट प्लांट।',
    category: 'Drinking Water & Sanitation',
    type: 'Critical Infrastructure',
    financialYear: '2024–25',
    department: 'Drinking Water & Sanitation Dept (DWSD)',
    responsibleOfficer: 'Executive Engineer, DWSD Ramgarh',
    contractorId: 'CONTR-02',
    contractorName: 'Chotanagpur Hydro & Water Works PVT LTD',

    state: 'Jharkhand',
    district: 'Ramgarh',
    block: 'Mandu',
    panchayat: 'Kuju East',
    village: 'Karma Colliery Basti',
    address: 'Near Old Substation, Kuju, Mandu, Ramgarh',
    latitude: 23.7942,
    longitude: 85.4712,

    currentStage: 'Stage 6: Physical Progress',
    stageNumber: 6,
    status: 'Ongoing',
    priority: 'High',
    health: 'On track',

    // Stage 1
    recommendedBy: 'Gram Sabha Kuju East & MLA Mandu',
    recommenderDesignation: 'Honorable Member of Legislative Assembly',
    recommendationLetterNo: 'MLA/MND/DMFT/2024/112',
    recommendationLetterDate: '2024-04-14',
    recommendationReceivedDate: '2024-04-18',
    recommendationDetails: 'Severe water table depletion due to opencast coal mining requiring 35,000 LPH filtration plant and 4.2 km distribution network.',

    // Stage 2
    gramSabhaDate: '2024-05-02',
    gramSabhaResolutionNo: 'GS/KJ-E/2024/09',
    governingCouncilMeetingDate: '2024-05-18',
    managementCommitteeMeetingDate: '2024-05-24',
    acceptanceDecision: 'Accepted',
    acceptanceDate: '2024-05-24',
    acceptingOfficer: 'Deputy Commissioner, Ramgarh',
    acceptanceRemarks: 'Approved unanimously under DMFT High Priority Sector (Drinking Water) guidelines.',

    // Stage 3
    dprDepartment: 'DWSD Technical Division, Ramgarh',
    dprStatus: 'Approved',
    technicalSanctionNo: 'TS/DWSD/RMG/2024/084',
    technicalSanctionDate: '2024-06-15',
    technicalSanctionAmount: 24800000,
    technicalAuthority: 'Superintending Engineer, DWSD Circle Hazaribagh',
    technicalRemarks: 'Detailed Project Report vetted and approved with solar dual pump provision.',

    // Stage 4
    administrativeSanctionNo: 'AS/DMFT/RMG/2024-25/119',
    administrativeSanctionDate: '2024-07-02',
    administrativeSanctionAmount: 24800000,
    adminApprovingAuthority: 'Deputy Commissioner-cum-District Magistrate, Ramgarh',
    currentPendingOfficer: 'Executive Engineer, DWSD Ramgarh',
    fileMovementHistory: [
      {
        id: 'FM-01',
        fromOfficer: 'District Planning Officer, Ramgarh',
        fromDepartment: 'District Planning Section',
        toOfficer: 'Deputy Development Commissioner',
        toDepartment: 'DMFT Cell',
        action: 'Forward',
        remarks: 'Technical approval verified against DMFT trust fund ceiling. Recommended for AS.',
        timestamp: '2024-06-25T11:00:00Z',
        stageBefore: 'Stage 3: Technical Approval',
        stageAfter: 'Stage 4: Administrative Approval',
      },
      {
        id: 'FM-02',
        fromOfficer: 'Deputy Development Commissioner',
        fromDepartment: 'DMFT Cell',
        toOfficer: 'Deputy Commissioner, Ramgarh',
        toDepartment: 'District Collectorate',
        action: 'Approve',
        remarks: 'Administrative Sanction issued for ₹2.48 Crore from DMFT Annual Work Plan 2024-25.',
        timestamp: '2024-07-02T15:30:00Z',
        stageBefore: 'Stage 4: Administrative Approval',
        stageAfter: 'Stage 5: Work Execution',
      },
    ],

    // Stage 5
    tenderNoticeNo: 'NIT/DWSD/RMG/DMFT/2024-25/12',
    tenderFloatingDate: '2024-07-10',
    tenderClosingDate: '2024-07-28',
    bidOpeningDate: '2024-07-30',
    agreementNo: 'AGR/DWSD/RMG/2024/042',
    agreementDate: '2024-08-14',
    agreementAmount: 24200000,
    workOrderNo: 'WO/DWSD/RMG/2024/091',
    workOrderDate: '2024-08-18',
    shilanyasDate: '2024-08-25',
    workCommencementDate: '2024-09-01',
    expectedCompletionDate: '2025-06-30',

    // Stage 6
    physicalProgress: 78,
    physicalProgressHistory: [
      {
        id: 'PPH-01',
        percentage: 35,
        date: '2024-10-15',
        updatedBy: 'Er. R. K. Mahato, EE',
        role: 'execution_dept',
        observations: 'Deep borewells drilled successfully at 4 locations. Pump house foundation laid.',
        stage: 'Stage 6: Physical Progress',
        photos: [
          {
            id: 'PH-01',
            url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f156f?w=600',
            caption: 'Borewell drilling and pump casing at Kuju site',
            stage: 'Before',
            latitude: 23.7942,
            longitude: 85.4712,
            timestamp: '2024-10-15T10:30:00Z',
          },
        ],
      },
      {
        id: 'PPH-02',
        percentage: 78,
        date: '2026-10-28',
        updatedBy: 'Er. Amit Verma, AE',
        role: 'inspection_team',
        observations: 'Overhead reservoir structural frame complete. Pipeline trenching 90% completed.',
        stage: 'Stage 6: Physical Progress',
        photos: [
          {
            id: 'PH-02',
            url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
            caption: 'Water treatment unit framing and pipe manifold installation',
            stage: 'During',
            latitude: 23.7945,
            longitude: 85.4715,
            timestamp: '2026-10-28T14:15:00Z',
          },
        ],
      },
    ],

    // Stage 7
    paymentRequisitions: [
      {
        id: 'REQ-01',
        billNo: 'RA-BILL-01',
        billDate: '2024-11-20',
        requisitionAmount: 7500000,
        requisitionLetterNo: 'DWSD/BILL/2024/110',
        requisitionLetterDate: '2024-11-22',
        paymentStatus: 'Disbursed',
        approvalDate: '2024-11-28',
        disbursedAmount: 7500000,
        paymentRefNo: 'PFMS/RMG/DMFT/2024/99120',
        remarks: 'First running account bill paid upon verification of borewell completion.',
      },
      {
        id: 'REQ-02',
        billNo: 'RA-BILL-02',
        billDate: '2026-10-10',
        requisitionAmount: 11400000,
        requisitionLetterNo: 'DWSD/BILL/2026/045',
        requisitionLetterDate: '2026-10-12',
        paymentStatus: 'Disbursed',
        approvalDate: '2026-10-20',
        disbursedAmount: 11400000,
        paymentRefNo: 'PFMS/RMG/DMFT/2026/10482',
        remarks: 'Second running account bill approved post technical quality audit.',
      },
    ],

    // Stage 8
    inspections: [
      {
        id: 'INSP-01',
        scheduledDate: '2026-10-20',
        inspectionDate: '2026-10-22',
        inspectionTeam: ['Er. Amit Verma (AE Vigilance)', 'Shri Manoj Sinha (DPO)', 'Er. R. K. Mahato (EE DWSD)'],
        checklist: [
          { item: 'Borewell discharge capacity verified (min 25,000 LPH)', itemHi: 'बोरवेल डिस्चार्ज क्षमता सत्यापन (न्यूनतम 25,000 LPH)', verified: true, remark: 'Tested 28,400 LPH average' },
          { item: 'HDPE Pipe quality IS-4984 compliant', itemHi: 'एचडीपीई पाइप गुणवत्ता IS-4984 अनुपालन', verified: true, remark: 'Test certificates verified' },
          { item: 'Solar dual pump invertor installation', itemHi: 'सोलर ड्यूल पंप इन्वर्टर अधिष्ठापन', verified: true, remark: 'Operating normally' },
          { item: 'Geotagged site signboard erected', itemHi: 'जियोटैग युक्त सूचना पट्ट स्थापना', verified: true, remark: 'Installed with DMFT logo' },
        ],
        photos: [
          {
            id: 'INSP-PH-01',
            url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600',
            caption: 'Inspection team verifying pump manifold and flow meter',
            stage: 'During',
            latitude: 23.7942,
            longitude: 85.4712,
            timestamp: '2026-10-22T11:40:00Z',
          },
        ],
        findings: 'Work executed in accordance with technical specifications. Pressure testing completed successfully.',
        deficiencies: 'Minor soil backfilling required along 150m stretch near community hall.',
        actionAssignedTo: 'Chotanagpur Hydro & Water Works PVT LTD',
        dueDate: '2026-11-10',
        complianceStatus: 'Complied',
        complianceRemarks: 'Backfilling and compaction finished on 29-10-2026.',
      },
    ],

    // Stage 9
    estimatedCost: 25000000,
    approvedAmount: 24800000,
    amountReleased: 20000000,
    expenditure: 18900000,
    balanceAmount: 5900000,
    financialProgress: 76.2,
    ucStatus: 'Submitted',
    ucSubmissionDate: '2026-10-25',
    ucCertificateNo: 'UC/DWSD/RMG/2026/088',
    installments: [
      { installmentNo: 1, amount: 8000000, releaseDate: '2024-09-10', sanctionLetterNo: 'DMFT/FIN/REL/2024/09' },
      { installmentNo: 2, amount: 12000000, releaseDate: '2026-05-15', sanctionLetterNo: 'DMFT/FIN/REL/2026/41' },
    ],

    // Stage 10
    isHandedOver: false,
    handoverDepartment: 'Gram Panchayat Kuju East / DWSD O&M',

    documents: [
      {
        id: 'DOC-01',
        projectId: 'PRJ-DMFT-RMG-0814',
        title: 'Gram Sabha Resolution & Demand Letter',
        category: 'Gram Sabha Resolution',
        fileName: 'GramSabha_KujuEast_Resolution.pdf',
        fileSize: '1.8 MB',
        fileUrl: '/documents/seed/GS_Resolution_0814.pdf',
        uploadedBy: 'Pooja Kumari (DEO)',
        uploadedAt: '2024-05-05T11:00:00Z',
        verificationStatus: 'Verified',
      },
      {
        id: 'DOC-02',
        projectId: 'PRJ-DMFT-RMG-0814',
        title: 'Approved Detailed Project Report (DPR)',
        category: 'DPR',
        fileName: 'DPR_Mandu_WaterSupply_Vetted.pdf',
        fileSize: '8.4 MB',
        fileUrl: '/documents/seed/DPR_0814.pdf',
        uploadedBy: 'Er. R. K. Mahato (EE DWSD)',
        uploadedAt: '2024-06-10T14:30:00Z',
        verificationStatus: 'Verified',
      },
      {
        id: 'DOC-03',
        projectId: 'PRJ-DMFT-RMG-0814',
        title: 'Administrative Sanction Order (DC Ramgarh)',
        category: 'Administrative Sanction (AS)',
        fileName: 'AS_Order_DC_Ramgarh_0814.pdf',
        fileSize: '1.2 MB',
        fileUrl: '/documents/seed/AS_0814.pdf',
        uploadedBy: 'Manoj Sinha (DPO)',
        uploadedAt: '2024-07-03T10:00:00Z',
        verificationStatus: 'Verified',
      },
      {
        id: 'DOC-04',
        projectId: 'PRJ-DMFT-RMG-0814',
        title: 'Work Contract Agreement & Work Order',
        category: 'Agreement',
        fileName: 'Agreement_Contractor_0814.pdf',
        fileSize: '4.6 MB',
        fileUrl: '/documents/seed/Agreement_0814.pdf',
        uploadedBy: 'Er. R. K. Mahato (EE DWSD)',
        uploadedAt: '2024-08-20T16:00:00Z',
        verificationStatus: 'Verified',
      },
      {
        id: 'DOC-05',
        projectId: 'PRJ-DMFT-RMG-0814',
        title: 'Vigilance Quality Inspection Report',
        category: 'Inspection Report',
        fileName: 'Quality_Audit_Report_Oct2026.pdf',
        fileSize: '3.1 MB',
        fileUrl: '/documents/seed/Inspection_0814.pdf',
        uploadedBy: 'Er. Amit Verma (AE)',
        uploadedAt: '2026-10-24T12:00:00Z',
        verificationStatus: 'Verified',
      },
    ],

    auditTrail: [
      {
        id: 'AUD-01',
        entityType: 'project',
        entityId: 'PRJ-DMFT-RMG-0814',
        action: 'Project Sanctioned & Registered',
        actionHi: 'परियोजना स्वीकृत एवं पंजीकृत',
        performedBy: 'Ananya Sharma, IAS (DC)',
        role: 'district_admin',
        timestamp: '2024-07-02T15:30:00Z',
        details: 'Project registered under DMFT Annual Work Plan with allocation of ₹2.48 Cr.',
      },
      {
        id: 'AUD-02',
        entityType: 'workflow',
        entityId: 'PRJ-DMFT-RMG-0814',
        action: 'Work Order Issued to Agency',
        actionHi: 'कार्यकारी एजेंसी को कार्य आदेश निर्गत',
        performedBy: 'Er. R. K. Mahato (EE DWSD)',
        role: 'execution_dept',
        timestamp: '2024-08-18T10:00:00Z',
        details: 'Work Order No. WO/DWSD/RMG/2024/091 issued to Chotanagpur Hydro & Water Works.',
      },
      {
        id: 'AUD-03',
        entityType: 'inspection',
        entityId: 'PRJ-DMFT-RMG-0814',
        action: 'Quality Audit Completed',
        actionHi: 'गुणवत्ता निरीक्षण पूर्ण',
        performedBy: 'Er. Amit Verma (AE)',
        role: 'inspection_team',
        timestamp: '2026-10-22T15:00:00Z',
        details: 'Site audit recorded physical progress at 78% with zero critical defects.',
      },
    ],

    createdAt: '2024-07-02T15:30:00Z',
    updatedAt: '2026-10-28T14:15:00Z',
  },

  {
    id: 'PRJ-DMFT-RMG-0762',
    nameEn: 'Model Community Health Centre & Maternal Care Wing Augmentation',
    nameHi: 'मॉडल सामुदायिक स्वास्थ्य केंद्र एवं मातृ देखभाल विंग सुदृढ़ीकरण',
    descriptionEn: 'Construction and medical equipment fitment for 30-bed maternal care building at PTPS Patratu.',
    descriptionHi: 'पतरातू पीटीपीएस क्षेत्र में 30 शैय्या युक्त मातृ एवं शिशु स्वास्थ्य केंद्र भवन का निर्माण एवं आधुनिक जीवन रक्षक उपकरणों की स्थापना।',
    category: 'Health & Family Welfare',
    type: 'Healthcare Infrastructure',
    financialYear: '2024–25',
    department: 'Building Construction Department',
    responsibleOfficer: 'Executive Engineer, BCD Ramgarh',
    contractorId: 'CONTR-01',
    contractorName: 'Jharkhand Infrastructure & Construction Ltd.',

    state: 'Jharkhand',
    district: 'Ramgarh',
    block: 'Patratu',
    panchayat: 'Patratu South',
    village: 'PTPS Colony Sector 3',
    address: 'Near Old Hospital Complex, Patratu, Ramgarh',
    latitude: 23.6685,
    longitude: 85.2892,

    currentStage: 'Stage 10: Handover & Commissioning',
    stageNumber: 10,
    status: 'Completed',
    priority: 'Critical',
    health: 'On track',

    recommendedBy: 'Civil Surgeon Ramgarh & Gram Sabha Patratu',
    recommenderDesignation: 'Civil Surgeon-cum-Chief Medical Officer',
    recommendationLetterNo: 'CS/RMG/DMFT/2023/409',
    recommendationLetterDate: '2023-11-10',
    recommendationReceivedDate: '2023-11-15',
    recommendationDetails: 'Urgent expansion of maternal delivery suites for mining displaced families.',

    gramSabhaDate: '2023-12-04',
    gramSabhaResolutionNo: 'GS/PT-S/2023/18',
    governingCouncilMeetingDate: '2023-12-20',
    managementCommitteeMeetingDate: '2023-12-28',
    acceptanceDecision: 'Accepted',
    acceptanceDate: '2023-12-28',
    acceptingOfficer: 'Deputy Commissioner, Ramgarh',
    acceptanceRemarks: 'Sanctioned under DMFT High Priority Health Sector.',

    dprDepartment: 'Building Construction Department, Ramgarh',
    dprStatus: 'Approved',
    technicalSanctionNo: 'TS/BCD/RMG/2024/011',
    technicalSanctionDate: '2024-01-20',
    technicalSanctionAmount: 18600000,
    technicalAuthority: 'Chief Engineer (South), BCD Ranchi',
    technicalRemarks: 'Hospital building code and seismic zone safety factored into estimate.',

    administrativeSanctionNo: 'AS/DMFT/RMG/2023-24/095',
    administrativeSanctionDate: '2024-02-05',
    administrativeSanctionAmount: 18600000,
    adminApprovingAuthority: 'Deputy Commissioner, Ramgarh',
    currentPendingOfficer: 'Civil Surgeon, Ramgarh',
    fileMovementHistory: [
      {
        id: 'FM-03',
        fromOfficer: 'EE Building Construction Dept',
        fromDepartment: 'BCD Ramgarh',
        toOfficer: 'Civil Surgeon, Ramgarh',
        toDepartment: 'Health Dept Ramgarh',
        action: 'Forward',
        remarks: 'Building completed, joint verification conducted. Handover certificate enclosed for signoff.',
        timestamp: '2026-10-25T11:00:00Z',
        stageBefore: 'Stage 9: Financial Progress',
        stageAfter: 'Stage 10: Handover & Commissioning',
      },
    ],

    tenderNoticeNo: 'NIT/BCD/RMG/2024/04',
    tenderFloatingDate: '2024-02-15',
    tenderClosingDate: '2024-03-05',
    bidOpeningDate: '2024-03-07',
    agreementNo: 'AGR/BCD/RMG/2024/018',
    agreementDate: '2024-03-22',
    agreementAmount: 18400000,
    workOrderNo: 'WO/BCD/RMG/2024/035',
    workOrderDate: '2024-03-25',
    shilanyasDate: '2024-04-02',
    workCommencementDate: '2024-04-10',
    expectedCompletionDate: '2026-09-30',
    actualCompletionDate: '2026-10-15',

    physicalProgress: 100,
    physicalProgressHistory: [
      {
        id: 'PPH-03',
        percentage: 100,
        date: '2026-10-15',
        updatedBy: 'Er. R. K. Mahato, EE',
        role: 'execution_dept',
        observations: 'All finishing, electrification, oxygen pipeline, and medical gas lines completed and commissioned.',
        stage: 'Stage 10: Handover & Commissioning',
        photos: [
          {
            id: 'PH-03',
            url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600',
            caption: 'Completed 30-bed Maternal Care Wing and Entrance at Patratu CHC',
            stage: 'After',
            latitude: 23.6685,
            longitude: 85.2892,
            timestamp: '2026-10-15T16:00:00Z',
          },
        ],
      },
    ],

    paymentRequisitions: [
      {
        id: 'REQ-03',
        billNo: 'FINAL-BILL-03',
        billDate: '2026-10-18',
        requisitionAmount: 18400000,
        requisitionLetterNo: 'BCD/FINAL/2026/012',
        requisitionLetterDate: '2026-10-18',
        paymentStatus: 'Disbursed',
        approvalDate: '2026-10-24',
        disbursedAmount: 18400000,
        paymentRefNo: 'PFMS/RMG/DMFT/2026/88341',
        remarks: 'Final settlement bill cleared following completion certificate.',
      },
    ],

    inspections: [
      {
        id: 'INSP-02',
        scheduledDate: '2026-10-12',
        inspectionDate: '2026-10-14',
        inspectionTeam: ['Civil Surgeon Ramgarh', 'EE BCD Ramgarh', 'AE Quality Auditor'],
        checklist: [
          { item: 'Structural stability & fire safety clearance', itemHi: 'संरचनात्मक स्थिरता एवं अग्नि सुरक्षा अनापत्ति', verified: true, remark: 'NOC issued by Fire Officer' },
          { item: 'Electrical sub-station & 40 KVA generator operational', itemHi: 'विद्युत सब-स्टेशन एवं 40 KVA जनरेटर क्रियाशील', verified: true, remark: 'Tested under load' },
          { item: 'Central oxygen distribution manifold', itemHi: 'केंद्रीय ऑक्सीजन पाइपलाइन वितरण', verified: true, remark: 'Pressure test passed' },
        ],
        photos: [
          {
            id: 'INSP-PH-02',
            url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600',
            caption: 'Final inspection team walkthrough in maternity ward',
            stage: 'After',
            latitude: 23.6685,
            longitude: 85.2892,
            timestamp: '2026-10-14T11:00:00Z',
          },
        ],
        findings: 'Building constructed impeccably. Ready for patient admission.',
        deficiencies: 'None',
        actionAssignedTo: 'Civil Surgeon Office',
        dueDate: '2026-10-31',
        complianceStatus: 'Complied',
      },
    ],

    estimatedCost: 19000000,
    approvedAmount: 18600000,
    amountReleased: 18600000,
    expenditure: 18400000,
    balanceAmount: 200000,
    financialProgress: 98.9,
    ucStatus: 'Verified',
    ucSubmissionDate: '2026-10-26',
    ucCertificateNo: 'UC/HEALTH/RMG/2026/044',
    installments: [
      { installmentNo: 1, amount: 6000000, releaseDate: '2024-04-15', sanctionLetterNo: 'DMFT/FIN/REL/2024/02' },
      { installmentNo: 2, amount: 12600000, releaseDate: '2026-06-20', sanctionLetterNo: 'DMFT/FIN/REL/2026/52' },
    ],

    isHandedOver: true,
    handoverDate: '2026-10-28',
    handoverDepartment: 'Health, Medical Education & Family Welfare Dept',
    handoverLetterNo: 'HANDOVER/DMFT/RMG/2026/109',
    completionCertificateNo: 'COMP/BCD/RMG/2026/08',
    handoverRemarks: 'Keys and asset inventory officially handed over to In-charge Medical Officer, CHC Patratu.',

    documents: [
      {
        id: 'DOC-06',
        projectId: 'PRJ-DMFT-RMG-0762',
        title: 'Completion Certificate',
        category: 'Completion Certificate',
        fileName: 'Completion_Cert_0762.pdf',
        fileSize: '1.4 MB',
        fileUrl: '/documents/seed/Completion_0762.pdf',
        uploadedBy: 'Er. R. K. Mahato (EE BCD)',
        uploadedAt: '2026-10-16T10:00:00Z',
        verificationStatus: 'Verified',
      },
      {
        id: 'DOC-07',
        projectId: 'PRJ-DMFT-RMG-0762',
        title: 'Official Handover Letter to Health Dept',
        category: 'Handover Document',
        fileName: 'Handover_Letter_HealthDept_0762.pdf',
        fileSize: '1.1 MB',
        fileUrl: '/documents/seed/Handover_0762.pdf',
        uploadedBy: 'Manoj Sinha (DPO)',
        uploadedAt: '2026-10-28T17:00:00Z',
        verificationStatus: 'Verified',
      },
    ],

    auditTrail: [
      {
        id: 'AUD-04',
        entityType: 'project',
        entityId: 'PRJ-DMFT-RMG-0762',
        action: 'Handover Completed & Certified',
        actionHi: 'हैंडओवर पूर्ण एवं प्रमाणित',
        performedBy: 'Ananya Sharma, IAS (DC)',
        role: 'district_admin',
        timestamp: '2026-10-28T17:30:00Z',
        details: 'Project officially handed over to Health Dept for public dedication.',
      },
    ],

    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2026-10-28T17:30:00Z',
  },

  {
    id: 'PRJ-DMFT-RMG-0695',
    nameEn: 'Collectorate High-Level Bridge and Connecting Approach Road',
    nameHi: 'समाहरणालय उच्च-स्तरीय सेतु एवं पहुंच पथ निर्माण',
    descriptionEn: 'Four-lane bridge over Damodar sub-stream connecting Chhatarmandu administrative zone to NH-33.',
    descriptionHi: 'छत्तरमांडू समाहरणालय परिसर को एनएच-33 से जोड़ने वाले दामोदर उप-प्रवाह पर 4-लेन उच्च स्तरीय पुल का निर्माण।',
    category: 'Roads & Bridges',
    type: 'Heavy Civil Infrastructure',
    financialYear: '2024–25',
    department: 'Road Construction Department (RCD)',
    responsibleOfficer: 'Executive Engineer, RCD Ramgarh',
    contractorId: 'CONTR-01',
    contractorName: 'Jharkhand Infrastructure & Construction Ltd.',

    state: 'Jharkhand',
    district: 'Ramgarh',
    block: 'Ramgarh',
    panchayat: 'Chhatarmandu',
    village: 'Chhatarmandu',
    address: 'Near Ramgarh Collectorate Block B, Ramgarh - 825101',
    latitude: 23.6186,
    longitude: 85.5245,

    currentStage: 'Stage 5: Work Execution',
    stageNumber: 5,
    status: 'Delayed',
    priority: 'Critical',
    health: 'Delayed',

    recommendedBy: 'District Administration Ramgarh',
    recommenderDesignation: 'District Planning Officer',
    recommendationLetterNo: 'DPO/RMG/ROAD/2023/88',
    recommendationLetterDate: '2023-08-10',
    recommendationReceivedDate: '2023-08-12',
    recommendationDetails: 'Severe traffic congestion during monsoon season leading to district headquarters.',

    acceptanceDecision: 'Accepted',
    acceptanceDate: '2023-09-15',
    acceptingOfficer: 'Deputy Commissioner, Ramgarh',

    dprDepartment: 'Road Construction Department, Ramgarh',
    dprStatus: 'Approved',
    technicalSanctionNo: 'TS/RCD/RMG/2023/140',
    technicalSanctionDate: '2023-11-20',
    technicalSanctionAmount: 54000000,
    technicalAuthority: 'Chief Engineer, RCD Jharkhand',

    administrativeSanctionNo: 'AS/DMFT/RMG/2023-24/188',
    administrativeSanctionDate: '2024-01-10',
    administrativeSanctionAmount: 54000000,
    adminApprovingAuthority: 'Deputy Commissioner, Ramgarh',
    currentPendingOfficer: 'EE Road Construction Dept',
    fileMovementHistory: [],

    tenderNoticeNo: 'NIT/RCD/RMG/2024/09',
    tenderFloatingDate: '2024-01-25',
    tenderClosingDate: '2024-02-20',
    bidOpeningDate: '2024-02-24',
    agreementNo: 'AGR/RCD/RMG/2024/005',
    agreementDate: '2024-03-15',
    agreementAmount: 52400000,
    workOrderNo: 'WO/RCD/RMG/2024/029',
    workOrderDate: '2024-03-20',
    shilanyasDate: '2024-04-05',
    workCommencementDate: '2024-04-15',
    expectedCompletionDate: '2025-08-30',

    physicalProgress: 42,
    physicalProgressHistory: [
      {
        id: 'PPH-04',
        percentage: 42,
        date: '2026-09-30',
        updatedBy: 'Er. R. K. Mahato, EE',
        role: 'execution_dept',
        observations: 'Substructure pier cap casting delayed due to high water level during prolonged monsoons.',
        stage: 'Stage 5: Work Execution',
        photos: [
          {
            id: 'PH-04',
            url: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=600',
            caption: 'Bridge pier well foundation and approach embankment',
            stage: 'During',
            latitude: 23.6186,
            longitude: 85.5245,
            timestamp: '2026-09-30T10:00:00Z',
          },
        ],
      },
    ],

    paymentRequisitions: [
      {
        id: 'REQ-04',
        billNo: 'RA-BILL-01',
        billDate: '2024-09-15',
        requisitionAmount: 18000000,
        requisitionLetterNo: 'RCD/BILL/2024/09',
        requisitionLetterDate: '2024-09-18',
        paymentStatus: 'Disbursed',
        approvalDate: '2024-09-25',
        disbursedAmount: 18000000,
        paymentRefNo: 'PFMS/RMG/DMFT/2024/44812',
        remarks: 'Payment released for pier foundation work.',
      },
    ],

    inspections: [
      {
        id: 'INSP-03',
        scheduledDate: '2026-10-05',
        inspectionDate: '2026-10-08',
        inspectionTeam: ['DDC Ramgarh', 'SE RCD Hazaribagh', 'EE RCD Ramgarh'],
        checklist: [
          { item: 'Concrete cube compressive strength test (M35)', itemHi: 'कंक्रीट क्यूब कंप्रेसिव स्ट्रेंथ टेस्ट (M35)', verified: true, remark: 'Compliant with IRC standard' },
          { item: 'Pier alignment check', itemHi: 'पियर संरेखण जांच', verified: true, remark: 'True verticality confirmed' },
          { item: 'Work mobilization pace', itemHi: 'कार्य गति एवं श्रमिक संख्या', verified: false, remark: 'Contractor deployed insufficient labour force' },
        ],
        photos: [],
        findings: 'Project is running 68 days behind schedule. Notice issued to contractor under penalty clause 5.',
        deficiencies: 'Inadequate manpower and delayed procurement of girder steel.',
        actionAssignedTo: 'Jharkhand Infrastructure & Construction Ltd.',
        dueDate: '2026-11-15',
        complianceStatus: 'Pending',
      },
    ],

    estimatedCost: 55000000,
    approvedAmount: 54000000,
    amountReleased: 25000000,
    expenditure: 21500000,
    balanceAmount: 32500000,
    financialProgress: 39.8,
    ucStatus: 'Pending',
    installments: [
      { installmentNo: 1, amount: 25000000, releaseDate: '2024-05-10', sanctionLetterNo: 'DMFT/FIN/REL/2024/15' },
    ],

    isHandedOver: false,
    documents: [],
    auditTrail: [
      {
        id: 'AUD-05',
        entityType: 'project',
        entityId: 'PRJ-DMFT-RMG-0695',
        action: 'Delay Warning Notice Issued',
        actionHi: 'विलंब चेतावनी नोटिस निर्गत',
        performedBy: 'Rajesh Kumar, DDC',
        role: 'dmft_ceo',
        timestamp: '2026-10-10T12:00:00Z',
        details: 'Contractor served 15-day cure notice for 68 days pendency in girder fabrication.',
      },
    ],

    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2026-10-10T12:00:00Z',
  },

  {
    id: 'PRJ-DMFT-RMG-0551',
    nameEn: 'Barlanga Check Dam & Micro-Lift Irrigation System',
    nameHi: 'बारलंगा चेक डैम एवं सूक्ष्म लिफ्ट सिंचाई प्रणाली निर्माण',
    descriptionEn: 'Check dam construction across Bhera river tributary with solar-powered lift pumps serving 240 hectares of tribal farmland.',
    descriptionHi: 'गोला प्रखंड के बारलंगा में भेड़ा नदी की सहायक धारा पर चेक डैम एवं सौर ऊर्जा चालित सूक्ष्म लिफ्ट सिंचाई प्रणाली का निर्माण।',
    category: 'Water Resources & Irrigation',
    type: 'Agricultural Infrastructure',
    financialYear: '2024–25',
    department: 'Water Resources Department (WRD)',
    responsibleOfficer: 'Executive Engineer, WRD Tenughat/Ramgarh',
    contractorId: 'CONTR-03',
    contractorName: 'M/S Maa Chhinnamastika Builders',

    state: 'Jharkhand',
    district: 'Ramgarh',
    block: 'Gola',
    panchayat: 'Barlanga',
    village: 'Barlanga Purana Basti',
    address: 'Bhera River Confluence, Barlanga, Gola, Ramgarh',
    latitude: 23.5412,
    longitude: 85.7124,

    currentStage: 'Stage 8: Work Inspection',
    stageNumber: 8,
    status: 'Ongoing',
    priority: 'Medium',
    health: 'On track',

    recommendedBy: 'Panchayat Samiti Gola & Farmer Cooperative',
    recommenderDesignation: 'Pramukh, Panchayat Samiti Gola',
    recommendationLetterNo: 'PS/GOLA/2023/118',
    recommendationLetterDate: '2023-10-14',
    recommendationReceivedDate: '2023-10-20',
    recommendationDetails: 'Severe winter crop drought affecting tribal farmers. Check dam will conserve run-off.',

    acceptanceDecision: 'Accepted',
    acceptanceDate: '2023-11-25',
    acceptingOfficer: 'Deputy Commissioner, Ramgarh',

    dprDepartment: 'Water Resources Dept, Ramgarh',
    dprStatus: 'Approved',
    technicalSanctionNo: 'TS/WRD/RMG/2024/032',
    technicalSanctionDate: '2024-02-12',
    technicalSanctionAmount: 31200000,
    technicalAuthority: 'Superintending Engineer, WRD Hazaribagh',

    administrativeSanctionNo: 'AS/DMFT/RMG/2023-24/204',
    administrativeSanctionDate: '2024-03-01',
    administrativeSanctionAmount: 31200000,
    adminApprovingAuthority: 'Deputy Commissioner, Ramgarh',
    currentPendingOfficer: 'EE WRD Ramgarh',
    fileMovementHistory: [],

    tenderNoticeNo: 'NIT/WRD/RMG/2024/02',
    tenderFloatingDate: '2024-03-10',
    tenderClosingDate: '2024-03-30',
    bidOpeningDate: '2024-04-02',
    agreementNo: 'AGR/WRD/RMG/2024/022',
    agreementDate: '2024-04-18',
    agreementAmount: 30800000,
    workOrderNo: 'WO/WRD/RMG/2024/048',
    workOrderDate: '2024-04-22',
    shilanyasDate: '2024-05-02',
    workCommencementDate: '2024-05-10',
    expectedCompletionDate: '2025-04-30',

    physicalProgress: 88,
    physicalProgressHistory: [
      {
        id: 'PPH-05',
        percentage: 88,
        date: '2026-10-18',
        updatedBy: 'Er. R. K. Mahato, EE',
        role: 'execution_dept',
        observations: 'Check dam spillway crest and retaining wing walls constructed. Solar pump intake installed.',
        stage: 'Stage 8: Work Inspection',
        photos: [
          {
            id: 'PH-05',
            url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600',
            caption: 'Concrete spillway and sluice gate testing at Barlanga Check Dam',
            stage: 'During',
            latitude: 23.5412,
            longitude: 85.7124,
            timestamp: '2026-10-18T11:00:00Z',
          },
        ],
      },
    ],

    paymentRequisitions: [
      {
        id: 'REQ-05',
        billNo: 'RA-02',
        billDate: '2026-09-10',
        requisitionAmount: 14000000,
        requisitionLetterNo: 'WRD/BILL/2026/02',
        requisitionLetterDate: '2026-09-12',
        paymentStatus: 'Disbursed',
        approvalDate: '2026-09-20',
        disbursedAmount: 14000000,
        paymentRefNo: 'PFMS/RMG/DMFT/2026/77219',
        remarks: 'Intermediate milestone payment released after inspection.',
      },
    ],

    inspections: [
      {
        id: 'INSP-04',
        scheduledDate: '2026-11-05',
        inspectionDate: '2026-11-02',
        inspectionTeam: ['Er. Amit Verma (AE Vigilance)', 'Shri Suresh Prasad (MIS)', 'Junior Engineer WRD'],
        checklist: [
          { item: 'Spillway crest level & concrete bonding test', itemHi: 'स्पिलवे क्रेस्ट स्तर एवं कंक्रीट बॉन्डिंग परीक्षण', verified: true, remark: 'Meets specifications' },
          { item: 'Solar array 15 KW mounting alignment', itemHi: 'सोलर एरे 15 KW अधिष्ठापन संरेखण', verified: true, remark: 'Proper tilt angle 23 deg verified' },
          { item: 'Sluice gate rubber seal water tightness', itemHi: 'स्लुइस गेट रबर सील जल-रोधी क्षमता', verified: true, remark: 'No leakage observed under pondage' },
        ],
        photos: [],
        findings: 'High construction quality. Submerged intake well tested successfully under 4-meter water head.',
        deficiencies: 'Catchment plantation work to be expedited before monsoon.',
        actionAssignedTo: 'M/S Maa Chhinnamastika Builders',
        dueDate: '2026-11-30',
        complianceStatus: 'Complied',
      },
    ],

    estimatedCost: 32000000,
    approvedAmount: 31200000,
    amountReleased: 26000000,
    expenditure: 24200000,
    balanceAmount: 7000000,
    financialProgress: 77.5,
    ucStatus: 'Submitted',
    ucSubmissionDate: '2026-09-28',
    installments: [
      { installmentNo: 1, amount: 10000000, releaseDate: '2024-06-01', sanctionLetterNo: 'DMFT/FIN/REL/2024/22' },
      { installmentNo: 2, amount: 16000000, releaseDate: '2026-04-12', sanctionLetterNo: 'DMFT/FIN/REL/2026/38' },
    ],

    isHandedOver: false,
    documents: [],
    auditTrail: [],
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2026-11-02T15:00:00Z',
  },

  {
    id: 'PRJ-DMFT-RMG-0418',
    nameEn: 'Marar Model Higher Secondary School Digital ICT Lab & Smart Classrooms',
    nameHi: 'मरार मॉडल उच्चतर माध्यमिक विद्यालय डिजिटल आईसीटी लैब एवं स्मार्ट कक्षा कक्ष',
    descriptionEn: 'Establishment of 40-seat STEM computer lab, smart interactive boards, and solar backup in Marar.',
    descriptionHi: 'चितरपुर प्रखंड के मरार स्थित उच्चतर माध्यमिक विद्यालय में 40 सीटों की आधुनिक कंप्यूटर लैब, स्मार्ट बोर्ड एवं सोलर पावर बैकअप का अधिष्ठापन।',
    category: 'Education & Sports',
    type: 'Social & Educational Infrastructure',
    financialYear: '2024–25',
    department: 'School Education & Literacy Dept',
    responsibleOfficer: 'District Education Officer, Ramgarh',
    contractorId: 'CONTR-04',
    contractorName: 'Patratu Power & Solar Solutions',

    state: 'Jharkhand',
    district: 'Ramgarh',
    block: 'Chitarpur',
    panchayat: 'Marar',
    village: 'Marar Basti',
    address: 'Near Old High School Ground, Marar, Chitarpur, Ramgarh',
    latitude: 23.5780,
    longitude: 85.6540,

    currentStage: 'Stage 10: Handover & Commissioning',
    stageNumber: 10,
    status: 'Completed',
    priority: 'Medium',
    health: 'On track',

    recommendedBy: 'School Management Committee & DEO',
    recommenderDesignation: 'District Education Officer',
    recommendationLetterNo: 'DEO/RMG/ICT/2024/09',
    recommendationLetterDate: '2024-01-15',
    recommendationReceivedDate: '2024-01-18',
    recommendationDetails: 'Equipping rural tribal students with coding and computer literacy tools.',

    acceptanceDecision: 'Accepted',
    acceptanceDate: '2024-02-10',
    acceptingOfficer: 'Deputy Commissioner, Ramgarh',

    dprDepartment: 'IT & Technical Cell, Ramgarh',
    dprStatus: 'Approved',
    technicalSanctionNo: 'TS/IT/RMG/2024/04',
    technicalSanctionDate: '2024-02-28',
    technicalSanctionAmount: 9400000,
    technicalAuthority: 'District Informatics Officer (NIC)',

    administrativeSanctionNo: 'AS/DMFT/RMG/2023-24/225',
    administrativeSanctionDate: '2024-03-12',
    administrativeSanctionAmount: 9400000,
    adminApprovingAuthority: 'Deputy Commissioner, Ramgarh',
    currentPendingOfficer: 'Principal, Marar Model School',
    fileMovementHistory: [],

    tenderNoticeNo: 'NIT/EDU/RMG/2024/01',
    tenderFloatingDate: '2024-03-20',
    tenderClosingDate: '2024-04-05',
    bidOpeningDate: '2024-04-08',
    agreementNo: 'AGR/EDU/RMG/2024/011',
    agreementDate: '2024-04-20',
    agreementAmount: 9200000,
    workOrderNo: 'WO/EDU/RMG/2024/019',
    workOrderDate: '2024-04-25',
    shilanyasDate: '2024-05-01',
    workCommencementDate: '2024-05-08',
    expectedCompletionDate: '2024-11-30',
    actualCompletionDate: '2024-11-15',

    physicalProgress: 100,
    physicalProgressHistory: [
      {
        id: 'PPH-06',
        percentage: 100,
        date: '2024-11-15',
        updatedBy: 'Er. Amit Verma, AE',
        role: 'inspection_team',
        observations: 'All 40 desktop terminals, interactive flat panel display, and 10 KVA hybrid inverter commissioned.',
        stage: 'Stage 10: Handover & Commissioning',
        photos: [
          {
            id: 'PH-06',
            url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600',
            caption: 'Students using the commissioned ICT Computer Lab at Marar Model School',
            stage: 'After',
            latitude: 23.5780,
            longitude: 85.6540,
            timestamp: '2024-11-15T14:00:00Z',
          },
        ],
      },
    ],

    paymentRequisitions: [
      {
        id: 'REQ-06',
        billNo: 'FINAL-BILL-01',
        billDate: '2024-11-20',
        requisitionAmount: 9200000,
        requisitionLetterNo: 'EDU/BILL/2024/44',
        requisitionLetterDate: '2024-11-22',
        paymentStatus: 'Disbursed',
        approvalDate: '2024-11-28',
        disbursedAmount: 9200000,
        paymentRefNo: 'PFMS/RMG/DMFT/2024/99182',
        remarks: 'Full settlement released after user acceptance test.',
      },
    ],

    inspections: [
      {
        id: 'INSP-05',
        scheduledDate: '2024-11-10',
        inspectionDate: '2024-11-12',
        inspectionTeam: ['District Informatics Officer', 'District Education Officer', 'School Principal'],
        checklist: [
          { item: 'Genuine OS and educational software licenses verified', itemHi: 'मूल ओएस एवं शैक्षणिक सॉफ्टवेयर लाइसेंस सत्यापन', verified: true, remark: 'Licenses active' },
          { item: 'Earthing & surge protection for computer lab', itemHi: 'कंप्यूटर लैब हेतु अर्थिंग एवं सर्ज प्रोटेक्शन', verified: true, remark: 'Resistance < 1 ohm' },
        ],
        photos: [],
        findings: 'Setup conforms to CBSE ICT guidelines. Ready for curriculum use.',
        deficiencies: 'None',
        actionAssignedTo: 'School Management',
        dueDate: '2024-11-30',
        complianceStatus: 'Complied',
      },
    ],

    estimatedCost: 9500000,
    approvedAmount: 9400000,
    amountReleased: 9400000,
    expenditure: 9200000,
    balanceAmount: 200000,
    financialProgress: 97.8,
    ucStatus: 'Verified',
    ucSubmissionDate: '2024-12-05',
    ucCertificateNo: 'UC/EDU/RMG/2024/11',
    installments: [
      { installmentNo: 1, amount: 9400000, releaseDate: '2024-05-15', sanctionLetterNo: 'DMFT/FIN/REL/2024/28' },
    ],

    isHandedOver: true,
    handoverDate: '2024-11-25',
    handoverDepartment: 'School Education & Literacy Dept',
    handoverLetterNo: 'HANDOVER/EDU/RMG/2024/09',
    completionCertificateNo: 'COMP/EDU/RMG/2024/14',
    handoverRemarks: 'Asset transferred to School Management Committee.',

    documents: [],
    auditTrail: [],
    createdAt: '2024-03-12T10:00:00Z',
    updatedAt: '2024-11-25T14:00:00Z',
  },

  {
    id: 'PRJ-DMFT-RMG-0382',
    nameEn: 'Potanga Solar Micro-Grid Electrification & Rural Access Road',
    nameHi: 'पोटांगा सौर मिनी-ग्रिड विद्युतीकरण एवं ग्रामीण संपर्क पथ',
    descriptionEn: 'Installation of 50 KW solar micro-grid and 1.8 km concrete pavement for un-electrified tribal hamlets.',
    descriptionHi: 'दुलमी प्रखंड के पोटांगा में अवस्थित गैर-विद्युतीकृत आदिवासी टोलों हेतु 50 KW सौर मिनी-ग्रिड एवं 1.8 किमी कंक्रीट पथ निर्माण।',
    category: 'Renewable Energy & Rural Infrastructure',
    type: 'Energy & Connectivity',
    financialYear: '2024–25',
    department: 'Rural Development & JREDA',
    responsibleOfficer: 'Project Officer, JREDA / DPO Ramgarh',
    contractorId: 'CONTR-04',
    contractorName: 'Patratu Power & Solar Solutions',

    state: 'Jharkhand',
    district: 'Ramgarh',
    block: 'Dulmi',
    panchayat: 'Potanga',
    village: 'Potanga Upar Tola',
    address: 'Hillock Base, Potanga, Dulmi, Ramgarh - 825101',
    latitude: 23.5120,
    longitude: 85.5480,

    currentStage: 'Stage 1: Work Request & Recommendation',
    stageNumber: 1,
    status: 'Pending',
    priority: 'High',
    health: 'On track',

    recommendedBy: 'Gram Sabha Potanga & Block Development Officer Dulmi',
    recommenderDesignation: 'Block Development Officer, Dulmi',
    recommendationLetterNo: 'BDO/DLM/DMFT/2026/04',
    recommendationLetterDate: '2026-09-05',
    recommendationReceivedDate: '2026-09-10',
    recommendationDetails: 'Remote forested hamlet without grid access. Needs decentralized renewable power for 120 households and street lighting.',

    acceptanceDecision: 'Accepted',
    acceptanceDate: '2026-10-02',
    acceptingOfficer: 'Deputy Commissioner, Ramgarh',

    dprDepartment: 'JREDA Technical Wing, Ranchi/Ramgarh',
    dprStatus: 'In Progress',
    technicalSanctionAmount: 0,

    administrativeSanctionAmount: 0,
    currentPendingOfficer: 'DPO Ramgarh',
    fileMovementHistory: [
      {
        id: 'FM-04',
        fromOfficer: 'BDO Dulmi',
        fromDepartment: 'Block Development Office, Dulmi',
        toOfficer: 'District Planning Officer, Ramgarh',
        toDepartment: 'District Planning Section',
        action: 'Forward',
        remarks: 'Recommended by Gram Sabha. Vetted by Block Level Committee. Forwarded for DPR and sanction.',
        timestamp: '2026-09-12T11:00:00Z',
        stageBefore: 'Stage 1: Work Request & Recommendation',
        stageAfter: 'Stage 2: Work Request Acceptance',
      },
    ],

    agreementAmount: 0,
    physicalProgress: 0,
    physicalProgressHistory: [],
    paymentRequisitions: [],
    inspections: [],

    estimatedCost: 16500000,
    approvedAmount: 0,
    amountReleased: 0,
    expenditure: 0,
    balanceAmount: 0,
    financialProgress: 0,
    ucStatus: 'Not Due',
    installments: [],

    isHandedOver: false,
    documents: [
      {
        id: 'DOC-08',
        projectId: 'PRJ-DMFT-RMG-0382',
        title: 'Gram Sabha Resolution & Habitation Survey',
        category: 'Gram Sabha Resolution',
        fileName: 'GramSabha_Potanga_Survey.pdf',
        fileSize: '2.2 MB',
        fileUrl: '/documents/seed/GS_Potanga.pdf',
        uploadedBy: 'Pooja Kumari (DEO)',
        uploadedAt: '2026-09-15T11:00:00Z',
        verificationStatus: 'Verified',
      },
    ],
    auditTrail: [
      {
        id: 'AUD-06',
        entityType: 'project',
        entityId: 'PRJ-DMFT-RMG-0382',
        action: 'Work Request Logged',
        actionHi: 'कार्य अनुशंसा पंजीकृत',
        performedBy: 'Pooja Kumari (DEO)',
        role: 'deo',
        timestamp: '2026-09-15T11:30:00Z',
        details: 'Initial work request registered from BDO Dulmi recommendation.',
      },
    ],
    createdAt: '2026-09-15T11:30:00Z',
    updatedAt: '2026-10-02T10:00:00Z',
  },
]

// =========================================================================
// 4. PERSISTENT IN-MEMORY & LOCALSTORAGE DMFT DATABASE SERVICE
// =========================================================================
const STORAGE_PROJECTS_KEY = 'esapmada_dmft_projects_v2'
const STORAGE_NOTIF_KEY = 'esapmada_dmft_notifications_v2'
const STORAGE_AUDIT_KEY = 'esapmada_dmft_audit_logs_v2'

class DMFTDatabaseService {
  private projects: DMFTProject[] = []
  private contractors: Contractor[] = [...SEED_CONTRACTORS]
  private users: DMFTUser[] = [...SEED_USERS]
  private notifications: InAppNotification[] = []
  private auditLogs: AuditLog[] = []
  private subscribers: Set<() => void> = new Set()

  constructor() {
    this.initDatabase()
  }

  private isClient(): boolean {
    return typeof window !== 'undefined'
  }

  private initDatabase() {
    if (this.isClient()) {
      try {
        const storedProjects = localStorage.getItem(STORAGE_PROJECTS_KEY)
        if (storedProjects) {
          this.projects = JSON.parse(storedProjects)
        } else {
          this.projects = [...SEED_DMFT_PROJECTS]
          this.saveProjects()
        }

        const storedNotif = localStorage.getItem(STORAGE_NOTIF_KEY)
        if (storedNotif) {
          this.notifications = JSON.parse(storedNotif)
        } else {
          this.seedInitialNotifications()
          this.saveNotifications()
        }

        const storedAudit = localStorage.getItem(STORAGE_AUDIT_KEY)
        if (storedAudit) {
          this.auditLogs = JSON.parse(storedAudit)
        } else {
          this.seedInitialAuditLogs()
          this.saveAuditLogs()
        }
      } catch (err) {
        console.warn('Failed to load DMFT database from localStorage:', err)
        this.projects = [...SEED_DMFT_PROJECTS]
      }
    } else {
      this.projects = [...SEED_DMFT_PROJECTS]
      this.seedInitialNotifications()
      this.seedInitialAuditLogs()
    }
  }

  private seedInitialNotifications() {
    this.notifications = [
      {
        id: 'NOTIF-01',
        title: 'Critical Delay: Collectorate Bridge (Ramgarh Block)',
        titleHi: 'अति-गंभीर विलंब: समाहरणालय पुल पहुंच पथ (रामगढ़ प्रखंड)',
        message: 'Project PRJ-DMFT-RMG-0695 is pending girder fabrication for 68 days. Cure notice issued to contractor.',
        messageHi: 'परियोजना PRJ-DMFT-RMG-0695 गर्डर निर्माण में 68 दिनों से विलंबित है। संवेदक को नोटिस निर्गत।',
        category: 'pendency',
        recipientRole: 'district_admin',
        projectId: 'PRJ-DMFT-RMG-0695',
        read: false,
        createdAt: '2026-10-10T12:00:00Z',
        actionUrl: '/admin/alerts',
      },
      {
        id: 'NOTIF-02',
        title: 'Inspection Compliance Verified: Mandu Water Supply',
        titleHi: 'निरीक्षण अनुपालन सत्यापित: मांडू पेयजल योजना',
        message: 'Quality auditor Er. Amit Verma verified trench backfilling at Kuju East site. Ready for commissioning.',
        messageHi: 'गुणवत्ता परीक्षक द्वारा कुजू ईस्ट स्थल पर मिट्टी भराई कार्य का सत्यापन पूर्ण किया गया।',
        category: 'inspection',
        recipientRole: 'execution_dept',
        projectId: 'PRJ-DMFT-RMG-0814',
        read: false,
        createdAt: '2026-10-29T10:00:00Z',
        actionUrl: '/admin/projects',
      },
      {
        id: 'NOTIF-03',
        title: 'Handover Completed: Patratu Maternal Care Center',
        titleHi: 'हैंडओवर पूर्ण: पतरातू मातृ देखभाल केंद्र',
        message: 'Project PRJ-DMFT-RMG-0762 successfully completed and handed over to Health Department.',
        messageHi: 'परियोजना PRJ-DMFT-RMG-0762 का कार्य शत-प्रतिशत पूर्ण कर स्वास्थ्य विभाग को सुपुर्द किया गया।',
        category: 'approval',
        recipientRole: 'all',
        projectId: 'PRJ-DMFT-RMG-0762',
        read: true,
        createdAt: '2026-10-28T17:30:00Z',
        actionUrl: '/admin/handover',
      },
    ]
  }

  private seedInitialAuditLogs() {
    this.auditLogs = []
    this.projects.forEach((p) => {
      if (p.auditTrail && p.auditTrail.length > 0) {
        this.auditLogs.push(...p.auditTrail)
      }
    })
  }

  private saveProjects() {
    if (!this.isClient()) return
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(this.projects))
      this.notifySubscribers()
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e)
    }
  }

  private saveNotifications() {
    if (!this.isClient()) return
    try {
      localStorage.setItem(STORAGE_NOTIF_KEY, JSON.stringify(this.notifications))
      this.notifySubscribers()
    } catch (e) {
      console.error('Failed to save notifications to localStorage:', e)
    }
  }

  private saveAuditLogs() {
    if (!this.isClient()) return
    try {
      localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(this.auditLogs))
    } catch (e) {
      console.error('Failed to save audit logs to localStorage:', e)
    }
  }

  public subscribe(fn: () => void): () => void {
    this.subscribers.add(fn)
    return () => this.subscribers.delete(fn)
  }

  private notifySubscribers() {
    this.subscribers.forEach((fn) => {
      try {
        fn()
      } catch (err) {
        console.error('Subscriber notification error:', err)
      }
    })
  }

  // =========================================================================
  // QUERIES & FILTERING
  // =========================================================================
  public getAllProjects(): DMFTProject[] {
    return [...this.projects]
  }

  public getProjectById(id: string): DMFTProject | undefined {
    return this.projects.find((p) => p.id === id)
  }

  public getProjectsByBlock(block: RamgarhBlock): DMFTProject[] {
    return this.projects.filter((p) => p.block === block)
  }

  public filterProjects(criteria: {
    financialYear?: string
    block?: string
    department?: string
    status?: string
    stage?: string
    search?: string
    contractorId?: string
  }): DMFTProject[] {
    return this.projects.filter((p) => {
      if (criteria.financialYear && criteria.financialYear !== 'All' && p.financialYear !== criteria.financialYear) {
        return false
      }
      if (criteria.block && criteria.block !== 'All' && p.block !== criteria.block) {
        return false
      }
      if (criteria.department && criteria.department !== 'All' && p.department !== criteria.department) {
        return false
      }
      if (criteria.status && criteria.status !== 'All' && p.status !== criteria.status) {
        return false
      }
      if (criteria.stage && criteria.stage !== 'All' && p.currentStage !== criteria.stage) {
        return false
      }
      if (criteria.contractorId && criteria.contractorId !== 'All' && p.contractorId !== criteria.contractorId) {
        return false
      }
      if (criteria.search) {
        const q = criteria.search.toLowerCase()
        const matchesName = p.nameEn.toLowerCase().includes(q) || p.nameHi.toLowerCase().includes(q)
        const matchesId = p.id.toLowerCase().includes(q)
        const matchesLoc = p.village.toLowerCase().includes(q) || p.panchayat.toLowerCase().includes(q)
        const matchesDept = p.department.toLowerCase().includes(q)
        if (!matchesName && !matchesId && !matchesLoc && !matchesDept) {
          return false
        }
      }
      return true
    })
  }

  // =========================================================================
  // 12 RFP KPI METRICS CALCULATOR
  // =========================================================================
  public getDashboardKPIs() {
    const total = this.projects.length
    const approved = this.projects.filter((p) => p.stageNumber >= 4).length
    const ongoing = this.projects.filter((p) => p.status === 'Ongoing').length
    const completed = this.projects.filter((p) => p.status === 'Completed').length
    const pending = this.projects.filter((p) => p.status === 'Pending').length
    const delayed = this.projects.filter((p) => p.status === 'Delayed').length
    const rejected = this.projects.filter((p) => p.acceptanceDecision === 'Rejected').length

    // Specific Stage Checkpoints
    const awaitingApproval = this.projects.filter((p) => p.stageNumber < 4).length
    const awaitingTender = this.projects.filter((p) => p.stageNumber === 4).length
    const workNotCommenced = this.projects.filter((p) => p.stageNumber === 5 && !p.workCommencementDate).length
    const awaitingInspection = this.projects.filter((p) => p.stageNumber >= 6 && p.inspections.some((i) => i.complianceStatus === 'Pending')).length
    const awaitingHandover = this.projects.filter((p) => p.physicalProgress >= 100 && !p.isHandedOver).length

    const totalApprovedCost = this.projects.reduce((acc, p) => acc + (p.approvedAmount || 0), 0)
    const totalExpenditure = this.projects.reduce((acc, p) => acc + (p.expenditure || 0), 0)
    const totalAvailableBalance = Math.max(0, totalApprovedCost - totalExpenditure)
    const overallUtilization = totalApprovedCost > 0 ? Math.round((totalExpenditure / totalApprovedCost) * 1000) / 10 : 0

    return {
      total,
      approved,
      ongoing,
      completed,
      pending,
      delayed,
      rejected,
      awaitingApproval,
      awaitingTender,
      workNotCommenced,
      awaitingInspection,
      awaitingHandover,
      totalApprovedCost,
      totalExpenditure,
      totalAvailableBalance,
      overallUtilization,
    }
  }

  // =========================================================================
  // 11 STATUTORY PENDENCY CHECKPOINTS
  // =========================================================================
  public getPendencyList(): PendencyItem[] {
    const items: PendencyItem[] = []

    this.projects.forEach((p) => {
      // 1. Administrative Approval Pending
      if (p.stageNumber === 3) {
        items.push({
          id: `PEND-AS-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'Administrative Approval Pending',
          checkpointHi: 'प्रशासनिक स्वीकृति लंबित',
          department: p.department,
          responsibleOfficer: p.currentPendingOfficer || 'District Planning Officer',
          pendingSince: p.createdAt.split('T')[0],
          daysPending: this.calculateDaysAgo(p.createdAt),
          delayStatus: 'Warning',
          requiredAction: 'Issue AS Order from DMFT Council',
          requiredActionHi: 'डीएमएफटी परिषद से प्रशासनिक स्वीकृति निर्गत करें',
        })
      }

      // 2. DPR Pending
      if (p.stageNumber === 2 && p.dprStatus !== 'Approved') {
        items.push({
          id: `PEND-DPR-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'DPR Preparation Pending',
          checkpointHi: 'डीपीआर तैयारी लंबित',
          department: p.dprDepartment || p.department,
          responsibleOfficer: 'Executive Engineer / Technical Cell',
          pendingSince: p.createdAt.split('T')[0],
          daysPending: this.calculateDaysAgo(p.createdAt),
          delayStatus: 'Warning',
          requiredAction: 'Submit Vetted Detailed Project Report',
          requiredActionHi: 'सत्यापित डीपीआर समर्पित करें',
        })
      }

      // 3. Technical Sanction Pending
      if (p.stageNumber === 2 && !p.technicalSanctionNo) {
        items.push({
          id: `PEND-TS-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'Technical Sanction (TS) Pending',
          checkpointHi: 'तकनीकी स्वीकृति लंबित',
          department: p.department,
          responsibleOfficer: 'Superintending Engineer',
          pendingSince: p.createdAt.split('T')[0],
          daysPending: this.calculateDaysAgo(p.createdAt),
          delayStatus: 'Warning',
          requiredAction: 'Issue Technical Sanction order',
          requiredActionHi: 'तकनीकी स्वीकृति आदेश निर्गत करें',
        })
      }

      // 4. Tender Floating Pending
      if (p.stageNumber === 4 && !p.tenderNoticeNo) {
        items.push({
          id: `PEND-TND-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'Tender Floating Pending',
          checkpointHi: 'निविदा आमंत्रण लंबित',
          department: p.department,
          responsibleOfficer: 'Executive Engineer',
          pendingSince: p.administrativeSanctionDate || p.createdAt.split('T')[0],
          daysPending: this.calculateDaysAgo(p.administrativeSanctionDate || p.createdAt),
          delayStatus: 'Warning',
          requiredAction: 'Publish NIT on e-procurement portal',
          requiredActionHi: 'ई-प्रोक्योरमेंट पर निविदा प्रकाशित करें',
        })
      }

      // 5. Agreement & Work Order Pending
      if (p.stageNumber === 5 && !p.agreementNo) {
        items.push({
          id: `PEND-AGR-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'Contractor Agreement Pending',
          checkpointHi: 'संवेदक एकरारनामा लंबित',
          department: p.department,
          responsibleOfficer: 'Executive Engineer',
          pendingSince: p.tenderClosingDate || p.createdAt.split('T')[0],
          daysPending: this.calculateDaysAgo(p.tenderClosingDate || p.createdAt),
          delayStatus: 'Warning',
          requiredAction: 'Execute Form-F2 Agreement',
          requiredActionHi: 'प्रपत्र-F2 एकरारनामा निष्पादित करें',
        })
      }

      // 6. Work Commencement Pending
      if (p.stageNumber === 5 && !p.workCommencementDate) {
        items.push({
          id: `PEND-COMM-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'Work Commencement Pending',
          checkpointHi: 'कार्य प्रारंभ लंबित',
          department: p.department,
          responsibleOfficer: p.contractorName || 'Assigned Contractor',
          pendingSince: p.workOrderDate || p.createdAt.split('T')[0],
          daysPending: this.calculateDaysAgo(p.workOrderDate || p.createdAt),
          delayStatus: 'Warning',
          requiredAction: 'Mobilize site machinery and begin earthwork',
          requiredActionHi: 'कार्यस्थल पर मशीनरी लगाकर कार्य प्रारंभ करें',
        })
      }

      // 7. Progress Update Pending
      if (p.status === 'Delayed' || (p.stageNumber === 5 && p.physicalProgress < 50)) {
        items.push({
          id: `PEND-PROG-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'Physical Progress Milestone Delayed',
          checkpointHi: 'भौतिक प्रगति मील का पत्थर विलंबित',
          department: p.department,
          responsibleOfficer: p.responsibleOfficer,
          pendingSince: p.updatedAt.split('T')[0],
          daysPending: 68,
          delayStatus: 'Critical',
          requiredAction: 'Enforce recovery schedule or levy liquidated damages',
          requiredActionHi: 'क्षतिपूर्ति अधिरोपित करें अथवा रिकवरी प्लान मांगें',
        })
      }

      // 8. Quality Inspection Pending
      if (p.stageNumber >= 6 && p.inspections.length === 0) {
        items.push({
          id: `PEND-INSP-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'Mandatory Technical Inspection Pending',
          checkpointHi: 'अनिवार्य तकनीकी निरीक्षण लंबित',
          department: p.department,
          responsibleOfficer: 'District Quality Auditor',
          pendingSince: p.updatedAt.split('T')[0],
          daysPending: this.calculateDaysAgo(p.updatedAt),
          delayStatus: 'Warning',
          requiredAction: 'Deploy Vigilance Team for stage verification',
          requiredActionHi: 'गुणवत्ता जांच हेतु टीम प्रतिनियुक्त करें',
        })
      }

      // 9. Inspection Compliance Action Pending
      const openInsp = p.inspections.find((i) => i.complianceStatus === 'Pending')
      if (openInsp) {
        items.push({
          id: `PEND-COMPL-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'Inspection Rectification Compliance Pending',
          checkpointHi: 'निरीक्षण सुधार अनुपालन लंबित',
          department: p.department,
          responsibleOfficer: openInsp.actionAssignedTo,
          pendingSince: openInsp.inspectionDate,
          daysPending: this.calculateDaysAgo(openInsp.inspectionDate),
          delayStatus: 'Delayed',
          requiredAction: openInsp.deficiencies,
          requiredActionHi: 'स्थल पर चिन्हित त्रुटियों का निराकरण कर रिपोर्ट भेजें',
        })
      }

      // 10. Payment Requisition Scrutiny Pending
      const openReq = p.paymentRequisitions.find((r) => r.paymentStatus === 'Submitted')
      if (openReq) {
        items.push({
          id: `PEND-PAY-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'Payment Requisition Bill Scrutiny Pending',
          checkpointHi: 'भुगतान अधियाचन विपत्र समीक्षा लंबित',
          department: 'DMFT Accounts Section',
          responsibleOfficer: 'Finance Officer / DDC',
          pendingSince: openReq.billDate,
          daysPending: this.calculateDaysAgo(openReq.billDate),
          delayStatus: 'Warning',
          requiredAction: `Verify MB entries and pass bill for ₹${(openReq.requisitionAmount / 100000).toFixed(2)} Lakh`,
          requiredActionHi: 'मापी पुस्तिका जांच कर विपत्र अग्रसारित करें',
        })
      }

      // 11. Handover Pending
      if (p.physicalProgress >= 100 && !p.isHandedOver) {
        items.push({
          id: `PEND-HO-${p.id}`,
          projectId: p.id,
          projectNameEn: p.nameEn,
          projectNameHi: p.nameHi,
          stage: p.currentStage,
          checkpoint: 'Handover & Commissioning Pending',
          checkpointHi: 'हैंडओवर एवं लोकार्पण लंबित',
          department: p.department,
          responsibleOfficer: p.responsibleOfficer,
          pendingSince: p.actualCompletionDate || p.updatedAt.split('T')[0],
          daysPending: this.calculateDaysAgo(p.actualCompletionDate || p.updatedAt),
          delayStatus: 'Warning',
          requiredAction: 'Issue Joint Handover Certificate to End-User Dept',
          requiredActionHi: 'उपयोगकर्ता विभाग को संयुक्त हस्तांतरण प्रमाण पत्र निर्गत करें',
        })
      }
    })

    return items
  }

  private calculateDaysAgo(dateStr: string): number {
    try {
      const past = new Date(dateStr).getTime()
      const now = Date.now()
      const diff = Math.max(1, Math.floor((now - past) / (1000 * 60 * 60 * 24)))
      return diff
    } catch {
      return 15
    }
  }

  // =========================================================================
  // TRANSACTIONAL OPERATIONS & WORKFLOW
  // =========================================================================

  /**
   * Register a new DMFT Project (Stage 1)
   */
  public createProject(input: Partial<DMFTProject>, user: DMFTUser): DMFTProject {
    const nextNum = this.projects.length + 850
    const id = input.id || `PRJ-DMFT-RMG-0${nextNum}`
    const now = new Date().toISOString()

    const newProject: DMFTProject = {
      id,
      nameEn: input.nameEn || 'Untitled Development Scheme',
      nameHi: input.nameHi || input.nameEn || 'अनामित विकास योजना',
      descriptionEn: input.descriptionEn || '',
      descriptionHi: input.descriptionHi || '',
      category: input.category || 'Roads & Bridges',
      type: input.type || 'Infrastructure',
      financialYear: input.financialYear || '2024–25',
      department: input.department || 'Rural Works Department',
      responsibleOfficer: input.responsibleOfficer || user.name,
      contractorId: input.contractorId,
      contractorName: input.contractorName,

      state: 'Jharkhand',
      district: 'Ramgarh',
      block: (input.block as RamgarhBlock) || 'Mandu',
      panchayat: input.panchayat || 'Central',
      village: input.village || '',
      address: input.address || '',
      latitude: input.latitude || 23.6332,
      longitude: input.longitude || 85.5144,

      currentStage: (input.currentStage as LifecycleStage) || 'Stage 1: Work Request & Recommendation',
      stageNumber: input.stageNumber || 1,
      status: input.status || 'Pending',
      priority: input.priority || 'Medium',
      health: 'On track',

      recommendedBy: input.recommendedBy || user.name,
      recommenderDesignation: input.recommenderDesignation || user.designation,
      recommendationLetterNo: input.recommendationLetterNo || `REC/${now.slice(0, 10)}/01`,
      recommendationLetterDate: input.recommendationLetterDate || now.slice(0, 10),
      recommendationReceivedDate: input.recommendationReceivedDate || now.slice(0, 10),
      recommendationDetails: input.recommendationDetails || '',

      acceptanceDecision: 'Accepted',
      dprDepartment: input.department || 'Planning Technical Cell',
      dprStatus: 'Pending',
      technicalSanctionAmount: input.estimatedCost || 0,
      administrativeSanctionAmount: input.approvedAmount || 0,
      currentPendingOfficer: 'District Planning Officer',
      fileMovementHistory: [
        {
          id: `FM-${Date.now()}`,
          fromOfficer: user.name,
          fromDepartment: user.department,
          toOfficer: 'District Planning Officer',
          toDepartment: 'District Planning Section',
          action: 'Forward',
          remarks: 'Project created and forwarded for initial administrative review.',
          timestamp: now,
          stageBefore: 'Registration',
          stageAfter: 'Stage 1: Work Request & Recommendation',
        },
      ],

      agreementAmount: input.agreementAmount || 0,
      physicalProgress: input.physicalProgress || 0,
      physicalProgressHistory: [],
      paymentRequisitions: [],
      inspections: [],

      estimatedCost: Number(input.estimatedCost) || 0,
      approvedAmount: Number(input.approvedAmount) || 0,
      amountReleased: Number(input.amountReleased) || 0,
      expenditure: Number(input.expenditure) || 0,
      balanceAmount: Math.max(0, (Number(input.approvedAmount) || 0) - (Number(input.expenditure) || 0)),
      financialProgress: 0,
      ucStatus: 'Not Due',
      installments: [],

      isHandedOver: false,
      documents: input.documents || [],
      auditTrail: [
        {
          id: `AUD-${Date.now()}`,
          entityType: 'project',
          entityId: id,
          action: 'Project Registered in DMFT Portal',
          actionHi: 'डीएमएफटी पोर्टल में परियोजना पंजीकृत',
          performedBy: user.name,
          role: user.role,
          timestamp: now,
          details: `Scheme registered under FY ${input.financialYear || '2024-25'} with estimated cost ₹${input.estimatedCost || 0}`,
        },
      ],
      createdAt: now,
      updatedAt: now,
    }

    this.projects.unshift(newProject)
    this.saveProjects()

    // Add Audit Log
    this.recordAuditLog({
      entityType: 'project',
      entityId: id,
      action: 'Project Registered',
      actionHi: 'परियोजना पंजीकृत',
      performedBy: user.name,
      role: user.role,
      details: `Project ${id} - ${newProject.nameEn} created.`,
    })

    return newProject
  }

  /**
   * Officer-to-officer File Movement (Forward, Return, Revert, Resubmit, Approve, Reject)
   */
  public moveFile(
    projectId: string,
    action: WorkflowAction['action'],
    toOfficer: string,
    toDepartment: string,
    remarks: string,
    user: DMFTUser,
    newStage?: LifecycleStage
  ): DMFTProject {
    const project = this.getProjectById(projectId)
    if (!project) throw new Error(`Project ${projectId} not found`)

    const now = new Date().toISOString()
    const stageBefore = project.currentStage
    let stageAfter = project.currentStage
    let nextStageNumber = project.stageNumber

    if (action === 'Approve') {
      if (project.stageNumber === 1) {
        stageAfter = 'Stage 2: Work Request Acceptance'
        nextStageNumber = 2
      } else if (project.stageNumber === 2) {
        stageAfter = 'Stage 3: Technical Approval'
        nextStageNumber = 3
      } else if (project.stageNumber === 3) {
        stageAfter = 'Stage 4: Administrative Approval'
        nextStageNumber = 4
      } else if (project.stageNumber === 4) {
        stageAfter = 'Stage 5: Work Execution'
        nextStageNumber = 5
        project.status = 'Ongoing'
      } else if (project.stageNumber === 9 || (project.stageNumber >= 5 && project.physicalProgress >= 100)) {
        stageAfter = 'Stage 10: Handover & Commissioning'
        nextStageNumber = 10
        project.status = 'Completed'
        project.isHandedOver = true
        project.handoverDate = now.split('T')[0]
      }
    } else if (newStage) {
      stageAfter = newStage
      const match = newStage.match(/Stage (\d+)/)
      if (match) nextStageNumber = parseInt(match[1], 10)
    }

    const workflowEntry: WorkflowAction = {
      id: `FM-${Date.now()}`,
      fromOfficer: user.name,
      fromDepartment: user.department,
      toOfficer,
      toDepartment,
      action,
      remarks,
      timestamp: now,
      stageBefore,
      stageAfter,
    }

    project.fileMovementHistory.push(workflowEntry)
    project.currentStage = stageAfter
    project.stageNumber = nextStageNumber
    project.currentPendingOfficer = toOfficer
    project.updatedAt = now

    this.saveProjects()

    this.recordAuditLog({
      entityType: 'workflow',
      entityId: projectId,
      action: `File Action: ${action}`,
      actionHi: `फ़ाइल कार्रवाई: ${action}`,
      performedBy: user.name,
      role: user.role,
      details: `${action} to ${toOfficer} (${toDepartment}). Remarks: ${remarks}`,
    })

    // Emit Notification
    this.addNotification({
      title: `File ${action}: ${project.id}`,
      titleHi: `फ़ाइल ${action}: ${project.id}`,
      message: `File moved to ${toOfficer}. Remarks: ${remarks}`,
      messageHi: `फ़ाइल ${toOfficer} को अग्रसारित की गई। टिप्पणी: ${remarks}`,
      category: 'approval',
      recipientRole: 'all',
      projectId: project.id,
      actionUrl: `/admin/projects`,
    })

    return project
  }

  /**
   * Record Physical Progress Update (Stage 6) with Geotagged Photos
   */
  public recordProgress(
    projectId: string,
    percentage: number,
    observations: string,
    photos: Array<{ url: string; caption: string; stage: 'Before' | 'During' | 'After'; latitude?: number; longitude?: number }>,
    user: DMFTUser
  ): DMFTProject {
    const project = this.getProjectById(projectId)
    if (!project) throw new Error(`Project ${projectId} not found`)

    const now = new Date().toISOString()
    const record: PhysicalProgressRecord = {
      id: `PPH-${Date.now()}`,
      percentage,
      date: now.split('T')[0],
      updatedBy: user.name,
      role: user.role,
      observations,
      stage: project.currentStage,
      photos: photos.map((p, idx) => ({
        id: `PH-${Date.now()}-${idx}`,
        url: p.url,
        caption: p.caption,
        stage: p.stage,
        latitude: p.latitude || project.latitude,
        longitude: p.longitude || project.longitude,
        timestamp: now,
      })),
    }

    project.physicalProgress = percentage
    project.physicalProgressHistory.push(record)
    project.updatedAt = now

    if (percentage >= 100) {
      project.status = 'Completed'
      project.currentStage = 'Stage 10: Handover & Commissioning'
      project.stageNumber = 10
      project.actualCompletionDate = now.split('T')[0]
    } else if (project.status === 'Pending') {
      project.status = 'Ongoing'
      project.currentStage = 'Stage 6: Physical Progress'
      project.stageNumber = 6
    }

    this.saveProjects()

    this.recordAuditLog({
      entityType: 'project',
      entityId: projectId,
      action: `Progress Updated to ${percentage}%`,
      actionHi: `भौतिक प्रगति ${percentage}% अद्यतन`,
      performedBy: user.name,
      role: user.role,
      details: `Field observations: ${observations}. Photos attached: ${photos.length}`,
    })

    return project
  }

  /**
   * Submit or Clear Payment Requisition (Stage 7)
   */
  public submitPaymentRequisition(
    projectId: string,
    billNo: string,
    billDate: string,
    requisitionAmount: number,
    requisitionLetterNo: string,
    remarks: string,
    user: DMFTUser
  ): PaymentRequisition {
    const project = this.getProjectById(projectId)
    if (!project) throw new Error(`Project ${projectId} not found`)

    const req: PaymentRequisition = {
      id: `REQ-${Date.now()}`,
      billNo,
      billDate,
      requisitionAmount,
      requisitionLetterNo,
      requisitionLetterDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'Submitted',
      remarks,
    }

    project.paymentRequisitions.push(req)
    project.currentStage = 'Stage 7: Payment Requisition'
    project.stageNumber = 7
    project.updatedAt = new Date().toISOString()

    this.saveProjects()

    this.recordAuditLog({
      entityType: 'payment',
      entityId: projectId,
      action: `Payment Bill Submitted: ₹${(requisitionAmount / 100000).toFixed(2)} Lakh`,
      actionHi: `भुगतान विपत्र समर्पित: ₹${(requisitionAmount / 100000).toFixed(2)} लाख`,
      performedBy: user.name,
      role: user.role,
      details: `Bill No: ${billNo}, Amount: ₹${requisitionAmount}`,
    })

    return req
  }

  /**
   * Record Site Quality Inspection (Stage 8)
   */
  public recordInspection(
    projectId: string,
    inspectionDate: string,
    inspectionTeam: string[],
    checklist: Array<{ item: string; itemHi?: string; verified: boolean; remark: string }>,
    findings: string,
    deficiencies: string,
    actionAssignedTo: string,
    dueDate: string,
    user: DMFTUser
  ): InspectionRecord {
    const project = this.getProjectById(projectId)
    if (!project) throw new Error(`Project ${projectId} not found`)

    const now = new Date().toISOString()
    const inspection: InspectionRecord = {
      id: `INSP-${Date.now()}`,
      scheduledDate: inspectionDate,
      inspectionDate,
      inspectionTeam,
      checklist,
      photos: [],
      findings,
      deficiencies,
      actionAssignedTo,
      dueDate,
      complianceStatus: deficiencies.trim().length > 0 ? 'Pending' : 'Complied',
    }

    project.inspections.push(inspection)
    project.currentStage = 'Stage 8: Work Inspection'
    project.stageNumber = 8
    project.updatedAt = now

    this.saveProjects()

    this.recordAuditLog({
      entityType: 'inspection',
      entityId: projectId,
      action: 'Site Inspection Report Recorded',
      actionHi: 'स्थलीय निरीक्षण रिपोर्ट दर्ज',
      performedBy: user.name,
      role: user.role,
      details: `Inspection conducted by ${inspectionTeam.join(', ')}. Status: ${inspection.complianceStatus}`,
    })

    return inspection
  }

  /**
   * Add Document to Project Repository (15 Categories)
   */
  public addDocument(
    projectId: string,
    doc: Omit<ProjectDocumentItem, 'id' | 'projectId' | 'uploadedAt'>,
    user: DMFTUser
  ): ProjectDocumentItem {
    const project = this.getProjectById(projectId)
    if (!project) throw new Error(`Project ${projectId} not found`)

    const now = new Date().toISOString()
    const newDoc: ProjectDocumentItem = {
      id: `DOC-${Date.now()}`,
      projectId,
      title: doc.title,
      category: doc.category,
      fileName: doc.fileName,
      fileSize: doc.fileSize,
      fileUrl: doc.fileUrl,
      uploadedBy: user.name,
      uploadedAt: now,
      verificationStatus: 'Verified',
    }

    project.documents.push(newDoc)
    project.updatedAt = now

    this.saveProjects()

    this.recordAuditLog({
      entityType: 'document',
      entityId: projectId,
      action: `Document Uploaded: ${doc.title}`,
      actionHi: `दस्तावेज़ अपलोड: ${doc.title}`,
      performedBy: user.name,
      role: user.role,
      details: `Category: ${doc.category}, File: ${doc.fileName}`,
    })

    return newDoc
  }

  // =========================================================================
  // NOTIFICATIONS & AUDIT LOGS
  // =========================================================================
  public getNotifications(): InAppNotification[] {
    return [...this.notifications]
  }

  public markNotificationRead(id: string): void {
    const notif = this.notifications.find((n) => n.id === id)
    if (notif) {
      notif.read = true
      this.saveNotifications()
    }
  }

  public addNotification(notif: Omit<InAppNotification, 'id' | 'createdAt' | 'read'>): InAppNotification {
    const newNotif: InAppNotification = {
      ...notif,
      id: `NOTIF-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    }
    this.notifications.unshift(newNotif)
    this.saveNotifications()
    return newNotif
  }

  public getAuditLogs(): AuditLog[] {
    return [...this.auditLogs]
  }

  private recordAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const newLog: AuditLog = {
      ...log,
      id: `AUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    }
    this.auditLogs.unshift(newLog)
    this.saveAuditLogs()
  }

  // =========================================================================
  // CONTRACTORS & USERS
  // =========================================================================
  public getContractors(): Contractor[] {
    return [...this.contractors]
  }

  public getUsers(): DMFTUser[] {
    return [...this.users]
  }
}

// Global Singleton Instance
export const dmftDatabase = new DMFTDatabaseService()

