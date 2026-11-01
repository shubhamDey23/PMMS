export type Language = 'en' | 'hi'

export interface TranslationSchema {
  portalName: string
  departmentName: string
  stateGov: string
  searchPlaceholder: string
  fy: string
  adminLogin: string
  logout: string
  profile: string
  publicPortal: string
  adminDashboard: string
  notifications: string
  helpSupport: string
  language: string
  liveData: string
  updatedToday: string
  lastUpdated: string

  nav: {
    dashboard: string
    projectManagement: string
    projectApprovals: string
    tenderManagement: string
    workProgress: string
    financialMonitoring: string
    inspectionManagement: string
    projectHandover: string
    reportsAnalytics: string
    publicDashboard: string
    userManagement: string
    settings: string
    addNewProject: string
  }

  stats: {
    approvedProjects: string
    ongoingProjects: string
    completedProjects: string
    pendingProjects: string
    delayedProjects: string
    totalProjects: string
    vsPreviousQuarter: string
    publicInvestment: string
    physicalProgress: string
    financialProgress: string
    financialUtilization: string
    totalApproved: string
    expenditure: string
    remaining: string
    availableBalance: string
    agreementAmount: string
    targetProgress: string
    achievedProgress: string
    gapToTarget: string
    higherThanPrevious: string
  }

  sections: {
    executiveOverview: string
    dashboardTitle: string
    dashboardSubtitle: string
    performanceOverview: string
    performanceSubtitle: string
    adminAnalytics: string
    adminAnalyticsSubtitle: string
    pendingActionsTitle: string
    pendingActionsSubtitle: string
    projectDetailsTitle: string
    projectDetailsSubtitle: string
    viewAllProjects: string
    viewDetailedReport: string
    projectsByBlock: string
    departmentPerformance: string
    priorityQueue: string
    priorityQueueSubtitle: string
    geoOverviewTitle: string
    geoOverviewSubtitle: string
  }

  table: {
    idAndName: string
    department: string
    location: string
    approvedAmount: string
    physical: string
    financial: string
    status: string
    stage: string
    actions: string
    columns: string
    export: string
    addProject: string
    createProject: string
    showing: string
    of: string
    projects: string
    searchPrompt: string
    noProjectsFound: string
    tryRefining: string
    resetFilters: string
  }

  filter: {
    advancedFilter: string
    filterSubtitle: string
    filtersApplied: string
    noFilters: string
    keywordLabel: string
    departmentLabel: string
    districtLabel: string
    blockLabel: string
    panchayatLabel: string
    fyLabel: string
    statusLabel: string
    all: string
    clearAll: string
    applyFilters: string
  }

  drawer: {
    publicProfile: string
    projectDetails: string
    report: string
    overview: string
    financials: string
    progress: string
    documents: string
    timeline: string
    activity: string
    projectInfo: string
    implSummary: string
    recentMilestones: string
    estimatedCost: string
    agreementAmount: string
    amountReleased: string
    availableBalance: string
    responsibleOfficer: string
    district: string
    block: string
    panchayat: string
    village: string
    address: string
    gpsCoordinates: string
    noCoordinates: string
    category: string
    stage: string
    approvalDate: string
    startDate: string
    expectedCompletion: string
    actualCompletion: string
    status: string
    health: string
    pendingAction: string
    remarks: string
    noHindiTranslation: string
    showingEnglishFallback: string
    supportingDocs: string
    uploadDoc: string
    activityHistory: string
    noActivity: string
  }

  form: {
    newProjectTitle: string
    newProjectSubtitle: string
    returnToProjects: string
    saveProject: string
    saving: string
    resetForm: string

    secBasic: string
    secBasicDesc: string
    secGeo: string
    secGeoDesc: string
    secFinance: string
    secFinanceDesc: string
    secTimeline: string
    secTimelineDesc: string
    secProgress: string
    secProgressDesc: string
    secDocs: string
    secDocsDesc: string

    nameEn: string
    nameEnPlaceholder: string
    nameHi: string
    nameHiPlaceholder: string
    descEn: string
    descEnPlaceholder: string
    descHi: string
    descHiPlaceholder: string
    category: string
    categorySelect: string
    fy: string
    department: string
    deptSelect: string
    officer: string
    officerPlaceholder: string

    state: string
    district: string
    block: string
    panchayat: string
    village: string
    address: string
    addressPlaceholder: string
    latitude: string
    latitudePlaceholder: string
    longitude: string
    longitudePlaceholder: string
    detectLocation: string
    detectingLocation: string
    locationDetected: string
    locationDenied: string

    estimatedCost: string
    approvedAmount: string
    agreementAmount: string
    amountReleased: string
    expenditure: string

    approvalDate: string
    plannedStartDate: string
    plannedCompletionDate: string
    actualStartDate: string
    actualCompletionDate: string

    physicalProgress: string
    financialProgress: string
    stage: string
    status: string
    priority: string
    remarks: string
    remarksPlaceholder: string

    docTitle: string
    docChoose: string
    docUploadBtn: string
    docUploadedList: string
    noDocsAttached: string
    docSimulatedNotice: string

    errors: {
      nameEnRequired: string
      nameEnMin: string
      descEnRequired: string
      descEnMin: string
      categoryRequired: string
      departmentRequired: string
      districtRequired: string
      estimatedCostRequired: string
      estimatedCostPositive: string
      approvedPositive: string
      agreementPositive: string
      expenditurePositive: string
      approvedExceedsEstimated: string
      expenditureExceedsApproved: string
      latitudeRange: string
      longitudeRange: string
      coordsIncomplete: string
      plannedCompletionBeforeStart: string
      plannedStartRequired: string
      plannedCompletionRequired: string
    }
  }

  geo: {
    mapTitle: string
    mapSubtitle: string
    allDistricts: string
    projectsWithCoords: string
    projectsWithoutCoords: string
    totalGeoMapped: string
    clickPinToInspect: string
    showMyLocation: string
    myLocationActive: string
    coordsNotFound: string
    openProjectDetails: string
    viewOnMap: string
  }

  common: {
    ongoing: string
    completed: string
    pending: string
    delayed: string
    critical: string
    high: string
    medium: string
    low: string
    onTrack: string
    atRisk: string
    close: string
    cancel: string
    confirm: string
    success: string
    error: string
    notice: string
    projectCreatedSuccess: string
  }
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    portalName: 'Project Monitoring & Management System',
    departmentName: 'Department of Planning & Development',
    stateGov: 'Government Project Monitoring Portal',
    searchPlaceholder: 'Search projects, IDs, locations, or departments...',
    fy: 'FY 2024–25',
    adminLogin: 'Admin Login',
    logout: 'Logout',
    profile: 'My Profile',
    publicPortal: 'Public Dashboard',
    adminDashboard: 'Admin Dashboard',
    notifications: 'Notifications',
    helpSupport: 'Help & Support',
    language: 'Language',
    liveData: 'Live data',
    updatedToday: 'Updated today, 10:42 AM',
    lastUpdated: 'Last updated today',

    nav: {
      dashboard: 'Dashboard',
      projectManagement: 'Project Management',
      projectApprovals: 'Project Approvals',
      tenderManagement: 'Tender Management',
      workProgress: 'Work Progress',
      financialMonitoring: 'Financial Monitoring',
      inspectionManagement: 'Inspection Management',
      projectHandover: 'Project Handover',
      reportsAnalytics: 'Reports & Analytics',
      publicDashboard: 'Public Dashboard',
      userManagement: 'User Management',
      settings: 'Settings',
      addNewProject: 'Add New Project',
    },

    stats: {
      approvedProjects: 'Approved Projects',
      ongoingProjects: 'Ongoing Projects',
      completedProjects: 'Completed Projects',
      pendingProjects: 'Pending Projects',
      delayedProjects: 'Delayed Projects',
      totalProjects: 'Total Sanctioned Projects',
      vsPreviousQuarter: 'vs. previous quarter',
      publicInvestment: 'Public investment',
      physicalProgress: 'Physical progress',
      financialProgress: 'Financial progress',
      financialUtilization: 'Financial utilization',
      totalApproved: 'Total approved',
      expenditure: 'Expenditure',
      remaining: 'Remaining balance',
      availableBalance: 'Available balance',
      agreementAmount: 'Agreement amount',
      targetProgress: 'Target progress',
      achievedProgress: 'Achieved progress',
      gapToTarget: 'Gap to target',
      higherThanPrevious: 'higher than previous quarter',
    },

    sections: {
      executiveOverview: 'Executive overview',
      dashboardTitle: 'Project Dashboard & Monitoring',
      dashboardSubtitle: 'Monitor development projects, implementation progress, financial performance, and administrative activities across all regions.',
      performanceOverview: 'Performance overview',
      performanceSubtitle: 'Physical and financial progress across all active projects',
      adminAnalytics: 'Administrative analytics',
      adminAnalyticsSubtitle: 'Regional project distribution and implementation progress',
      pendingActionsTitle: 'Pending actions & project alerts',
      pendingActionsSubtitle: 'Items requiring attention from your team',
      projectDetailsTitle: 'Project details & monitoring',
      projectDetailsSubtitle: 'Recent and high-priority development projects',
      viewAllProjects: 'View all projects',
      viewDetailedReport: 'View detailed report',
      projectsByBlock: 'Projects by block',
      departmentPerformance: 'Department performance',
      priorityQueue: 'Priority action queue',
      priorityQueueSubtitle: 'Sorted by urgency and due date',
      geoOverviewTitle: 'Geographic Monitoring & Map',
      geoOverviewSubtitle: 'Geo-tagged project distribution, physical coordinates, and field verification',
    },

    table: {
      idAndName: 'Project ID / Name',
      department: 'Department',
      location: 'Location',
      approvedAmount: 'Approved amount',
      physical: 'Physical',
      financial: 'Financial',
      status: 'Status',
      stage: 'Lifecycle stage',
      actions: 'Actions',
      columns: 'Columns',
      export: 'Export',
      addProject: 'Add Project',
      createProject: 'Create project',
      showing: 'Showing',
      of: 'of',
      projects: 'projects',
      searchPrompt: 'Search project name, ID, or location...',
      noProjectsFound: 'No projects match your search criteria.',
      tryRefining: 'Try refining your query or resetting filters.',
      resetFilters: 'Reset filters',
    },

    filter: {
      advancedFilter: 'Advanced project filter',
      filterSubtitle: 'Refine results across administrative and project attributes',
      filtersApplied: 'filters applied',
      noFilters: 'No filters applied',
      keywordLabel: 'Project ID or keyword',
      departmentLabel: 'Department',
      districtLabel: 'District',
      blockLabel: 'Block',
      panchayatLabel: 'Panchayat',
      fyLabel: 'Financial year',
      statusLabel: 'Project status',
      all: 'All',
      clearAll: 'Clear all',
      applyFilters: 'Apply filters',
    },

    drawer: {
      publicProfile: 'PUBLIC PROJECT PROFILE',
      projectDetails: 'PROJECT DETAILS',
      report: 'Download Report',
      overview: 'Overview',
      financials: 'Financials',
      progress: 'Progress',
      documents: 'Documents',
      timeline: 'Timeline',
      activity: 'Activity Log',
      projectInfo: 'Project information',
      implSummary: 'Implementation summary',
      recentMilestones: 'Recent milestones',
      estimatedCost: 'Estimated project cost',
      agreementAmount: 'Agreement amount',
      amountReleased: 'Amount released',
      availableBalance: 'Available balance',
      responsibleOfficer: 'Responsible officer',
      district: 'District',
      block: 'Block',
      panchayat: 'Panchayat',
      village: 'Village',
      address: 'Address / Location',
      gpsCoordinates: 'GPS Coordinates',
      noCoordinates: 'No GPS coordinates recorded',
      category: 'Category',
      stage: 'Lifecycle stage',
      approvalDate: 'Approval date',
      startDate: 'Start date',
      expectedCompletion: 'Expected completion',
      actualCompletion: 'Actual completion',
      status: 'Current status',
      health: 'Health',
      pendingAction: 'Pending action',
      remarks: 'Remarks',
      noHindiTranslation: 'Hindi title unavailable',
      showingEnglishFallback: 'Showing English title',
      supportingDocs: 'Supporting project documents',
      uploadDoc: 'Upload Document',
      activityHistory: 'Activity history & status changes',
      noActivity: 'No recent activity records found.',
    },

    form: {
      newProjectTitle: 'Sanction New Development Project',
      newProjectSubtitle: 'Enter complete administrative, financial, geographic, and timeline attributes.',
      returnToProjects: 'Return to Projects List',
      saveProject: 'Save & Sanction Project',
      saving: 'Validating & Sanctioning...',
      resetForm: 'Reset Form',

      secBasic: '1. Basic Project Information',
      secBasicDesc: 'Official identification, bilingual nomenclature, departmental allocation, and scope.',
      secGeo: '2. Geographic Details & Geolocation',
      secGeoDesc: 'Administrative hierarchy, territorial boundaries, and physical GPS coordinates.',
      secFinance: '3. Financial Sanction & Estimates',
      secFinanceDesc: 'Cost estimates, approved allocation, agreement amounts, and fund releases.',
      secTimeline: '4. Project Schedule & Milestones',
      secTimelineDesc: 'Sanction dates, planned work commencement, and contractual completion deadlines.',
      secProgress: '5. Initial Status & Lifecycle Stage',
      secProgressDesc: 'Baseline physical progress, initial project stage, and monitoring priority.',
      secDocs: '6. Supporting Documents',
      secDocsDesc: 'Administrative approvals, DPR, technical sanctions, or site inspection orders.',

      nameEn: 'Project Name (English)',
      nameEnPlaceholder: 'e.g., Construction of Rural Connectivity Road',
      nameHi: 'Project Name (Hindi - हिन्दी)',
      nameHiPlaceholder: 'उदा. ग्रामीण संपर्क सड़क का निर्माण',
      descEn: 'Project Description (English)',
      descEnPlaceholder: 'Provide comprehensive details regarding the project scope, technical parameters, and beneficiaries...',
      descHi: 'Project Description (Hindi - हिन्दी)',
      descHiPlaceholder: 'परियोजना के कार्यक्षेत्र, तकनीकी विनिर्देशों और लाभार्थियों का विस्तृत विवरण प्रदान करें...',
      category: 'Project Category',
      categorySelect: 'Select project category',
      fy: 'Financial Year',
      department: 'Implementing Department',
      deptSelect: 'Select department',
      officer: 'Responsible Officer / Engineer',
      officerPlaceholder: 'e.g., Er. Rajesh Kumar, Executive Engineer',

      state: 'State',
      district: 'District',
      block: 'Block',
      panchayat: 'Gram Panchayat',
      village: 'Village / Town',
      address: 'Site Address / Location Landmark',
      addressPlaceholder: 'e.g., Connecting Ward 4 to Main Highway via River Bridge',
      latitude: 'Latitude (GPS)',
      latitudePlaceholder: 'e.g., 23.6345',
      longitude: 'Longitude (GPS)',
      longitudePlaceholder: 'e.g., 85.5123',
      detectLocation: 'Detect My GPS Location',
      detectingLocation: 'Detecting GPS coordinates...',
      locationDetected: 'GPS coordinates populated from browser geolocation.',
      locationDenied: 'Location permission denied or unavailable.',

      estimatedCost: 'Estimated Project Cost (₹)',
      approvedAmount: 'Approved / Sanctioned Amount (₹)',
      agreementAmount: 'Contract / Agreement Amount (₹)',
      amountReleased: 'Initial Amount Released (₹)',
      expenditure: 'Expenditure to Date (₹)',

      approvalDate: 'Administrative Approval Date',
      plannedStartDate: 'Planned Start Date',
      plannedCompletionDate: 'Planned Completion Date',
      actualStartDate: 'Actual Start Date',
      actualCompletionDate: 'Actual Completion Date',

      physicalProgress: 'Initial Physical Progress (%)',
      financialProgress: 'Initial Financial Progress (%)',
      stage: 'Project Lifecycle Stage',
      status: 'Initial Status',
      priority: 'Monitoring Priority',
      remarks: 'Administrative Remarks / Notes',
      remarksPlaceholder: 'Enter any special instructions, inspection notes, or monitoring directives...',

      docTitle: 'Document Title / Type',
      docChoose: 'Choose File to Attach',
      docUploadBtn: 'Attach Document',
      docUploadedList: 'Attached Documents',
      noDocsAttached: 'No documents attached yet. Attach administrative sanctions, technical approvals, or proposals.',
      docSimulatedNotice: 'Note: Documents are stored with the project record for this session.',

      errors: {
        nameEnRequired: 'Project name in English is required (min 3 characters).',
        nameEnMin: 'Project name must be at least 3 characters.',
        descEnRequired: 'Project description in English is required (min 10 characters).',
        descEnMin: 'Description must be at least 10 characters.',
        categoryRequired: 'Please select a project category.',
        departmentRequired: 'Please select an implementing department.',
        districtRequired: 'District is required.',
        estimatedCostRequired: 'Estimated project cost is required.',
        estimatedCostPositive: 'Estimated cost must be greater than zero.',
        approvedPositive: 'Approved amount cannot be negative.',
        agreementPositive: 'Agreement amount cannot be negative.',
        expenditurePositive: 'Expenditure cannot be negative.',
        approvedExceedsEstimated: 'Approved amount should not exceed estimated project cost.',
        expenditureExceedsApproved: 'Expenditure cannot exceed approved sanctioned amount.',
        latitudeRange: 'Latitude must be between -90 and 90 degrees.',
        longitudeRange: 'Longitude must be between -180 and 180 degrees.',
        coordsIncomplete: 'Please provide both latitude and longitude, or leave both empty.',
        plannedCompletionBeforeStart: 'Planned completion date cannot be earlier than planned start date.',
        plannedStartRequired: 'Planned start date is required.',
        plannedCompletionRequired: 'Planned completion date is required.',
      },
    },

    geo: {
      mapTitle: 'Geographic Project Distribution',
      mapSubtitle: 'Interactive map displaying geo-tagged projects with verified coordinates',
      allDistricts: 'All Districts',
      projectsWithCoords: 'With GPS Coordinates',
      projectsWithoutCoords: 'Without Coordinates',
      totalGeoMapped: 'Total Geo-mapped',
      clickPinToInspect: 'Click on a project marker to inspect details',
      showMyLocation: 'Show My Location',
      myLocationActive: 'Your Location Pin Active',
      coordsNotFound: 'Coordinates not provided for this project.',
      openProjectDetails: 'Open Project Details',
      viewOnMap: 'View on map',
    },

    common: {
      ongoing: 'Ongoing',
      completed: 'Completed',
      pending: 'Pending',
      delayed: 'Delayed',
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      onTrack: 'On track',
      atRisk: 'At risk',
      close: 'Close',
      cancel: 'Cancel',
      confirm: 'Confirm',
      success: 'Success',
      error: 'Error',
      notice: 'Notice',
      projectCreatedSuccess: 'Project sanctioned and registered successfully!',
    },
  },

  hi: {
    portalName: 'परियोजना निगरानी एवं प्रबंधन प्रणाली',
    departmentName: 'योजना एवं विकास विभाग',
    stateGov: 'शासकीय परियोजना निगरानी पोर्टल',
    searchPlaceholder: 'परियोजना, आईडी, स्थान या विभाग खोजें...',
    fy: 'वित्त वर्ष 2024–25',
    adminLogin: 'प्रशासनिक लॉगिन',
    logout: 'लॉग आउट',
    profile: 'मेरी प्रोफ़ाइल',
    publicPortal: 'सार्वजनिक डैशबोर्ड',
    adminDashboard: 'प्रशासनिक डैशबोर्ड',
    notifications: 'सूचनाएं',
    helpSupport: 'सहायता एवं संपर्क',
    language: 'भाषा',
    liveData: 'लाइव डेटा',
    updatedToday: 'आज अद्यतन, पूर्वाह्न 10:42',
    lastUpdated: 'आज अद्यतन किया गया',

    nav: {
      dashboard: 'डैशबोर्ड',
      projectManagement: 'परियोजना प्रबंधन',
      projectApprovals: 'परियोजना अनुमोदन',
      tenderManagement: 'निविदा प्रबंधन',
      workProgress: 'कार्य प्रगति',
      financialMonitoring: 'वित्तीय निगरानी',
      inspectionManagement: 'निरीक्षण प्रबंधन',
      projectHandover: 'परियोजना हस्तांतरण',
      reportsAnalytics: 'रिपोर्ट एवं विश्लेषण',
      publicDashboard: 'सार्वजनिक डैशबोर्ड',
      userManagement: 'उपयोगकर्ता प्रबंधन',
      settings: 'सेटिंग्स',
      addNewProject: 'नई परियोजना जोड़ें',
    },

    stats: {
      approvedProjects: 'स्वीकृत परियोजनाएँ',
      ongoingProjects: 'चालू परियोजनाएँ',
      completedProjects: 'पूर्ण परियोजनाएँ',
      pendingProjects: 'लंबित परियोजनाएँ',
      delayedProjects: 'विलंबित परियोजनाएँ',
      totalProjects: 'कुल स्वीकृत परियोजनाएँ',
      vsPreviousQuarter: 'पिछली तिमाही की तुलना में',
      publicInvestment: 'सार्वजनिक निवेश',
      physicalProgress: 'भौतिक प्रगति',
      financialProgress: 'वित्तीय प्रगति',
      financialUtilization: 'निधि उपयोग दर',
      totalApproved: 'कुल स्वीकृत राशि',
      expenditure: 'कुल व्यय',
      remaining: 'शेष राशि',
      availableBalance: 'उपलब्ध शेष राशि',
      agreementAmount: 'अनुबंध राशि',
      targetProgress: 'लक्ष्य प्रगति',
      achievedProgress: 'प्राप्त प्रगति',
      gapToTarget: 'लक्ष्य से अंतर',
      higherThanPrevious: 'पिछली तिमाही से अधिक',
    },

    sections: {
      executiveOverview: 'कार्यकारी अवलोकन',
      dashboardTitle: 'परियोजना डैशबोर्ड एवं निगरानी',
      dashboardSubtitle: 'सभी क्षेत्रों में विकास परियोजनाओं, क्रियान्वयन प्रगति, वित्तीय प्रदर्शन और प्रशासनिक गतिविधियों की निगरानी करें।',
      performanceOverview: 'प्रदर्शन का अवलोकन',
      performanceSubtitle: 'सभी सक्रिय परियोजनाओं में भौतिक और वित्तीय प्रगति की स्थिति',
      adminAnalytics: 'प्रशासनिक विश्लेषण',
      adminAnalyticsSubtitle: 'क्षेत्रीय परियोजना वितरण एवं क्रियान्वयन प्रगति',
      pendingActionsTitle: 'लंबित कार्यवाहियाँ एवं चेतावनियाँ',
      pendingActionsSubtitle: 'आपके विभाग एवं दल द्वारा त्वरित ध्यान देने योग्य मामले',
      projectDetailsTitle: 'परियोजना विवरण एवं निगरानी',
      projectDetailsSubtitle: 'हाल की और उच्च प्राथमिकता वाली विकास परियोजनाएँ',
      viewAllProjects: 'सभी परियोजनाएँ देखें',
      viewDetailedReport: 'विस्तृत रिपोर्ट देखें',
      projectsByBlock: 'प्रखंड-वार परियोजनाएँ',
      departmentPerformance: 'विभाग-वार प्रदर्शन',
      priorityQueue: 'प्राथमिकता कार्य सूची',
      priorityQueueSubtitle: 'तात्कालिकता और नियत तिथि के अनुसार क्रमबद्ध',
      geoOverviewTitle: 'भौगोलिक निगरानी एवं मानचित्र',
      geoOverviewSubtitle: 'जियो-टैग्ड परियोजना वितरण, वास्तविक अक्षांश-देशांतर और स्थल सत्यापन',
    },

    table: {
      idAndName: 'परियोजना आईडी / नाम',
      department: 'विभाग',
      location: 'स्थान',
      approvedAmount: 'स्वीकृत राशि',
      physical: 'भौतिक',
      financial: 'वित्तीय',
      status: 'स्थिति',
      stage: 'जीवनचक्र चरण',
      actions: 'कार्रवाई',
      columns: 'कॉलम',
      export: 'निर्यात',
      addProject: 'परियोजना जोड़ें',
      createProject: 'नई परियोजना बनाएँ',
      showing: 'दिखाया जा रहा है',
      of: 'कुल',
      projects: 'परियोजनाएँ',
      searchPrompt: 'परियोजना का नाम, आईडी या स्थान खोजें...',
      noProjectsFound: 'कोई परियोजना आपके खोज मापदंड से मेल नहीं खाती।',
      tryRefining: 'फ़िल्टर बदलकर पुनः प्रयास करें।',
      resetFilters: 'फ़िल्टर रीसेट करें',
    },

    filter: {
      advancedFilter: 'उन्नत परियोजना फ़िल्टर',
      filterSubtitle: 'प्रशासनिक एवं परियोजना मानकों के आधार पर परिणाम परिष्कृत करें',
      filtersApplied: 'फ़िल्टर लागू',
      noFilters: 'कोई फ़िल्टर लागू नहीं',
      keywordLabel: 'परियोजना आईडी या कीवर्ड',
      departmentLabel: 'विभाग',
      districtLabel: 'जिला',
      blockLabel: 'प्रखंड',
      panchayatLabel: 'ग्राम पंचायत',
      fyLabel: 'वित्तीय वर्ष',
      statusLabel: 'परियोजना स्थिति',
      all: 'सभी',
      clearAll: 'सभी हटाएँ',
      applyFilters: 'फ़िल्टर लागू करें',
    },

    drawer: {
      publicProfile: 'सार्वजनिक परियोजना प्रोफ़ाइल',
      projectDetails: 'परियोजना का विस्तृत विवरण',
      report: 'रिपोर्ट डाउनलोड करें',
      overview: 'अवलोकन',
      financials: 'वित्तीय विवरण',
      progress: 'प्रगति',
      documents: 'दस्तावेज़',
      timeline: 'समयरेखा',
      activity: 'गतिविधि लॉग',
      projectInfo: 'परियोजना जानकारी',
      implSummary: 'क्रियान्वयन सारांश',
      recentMilestones: 'हाल के माइलस्टोन',
      estimatedCost: 'अनुमानित परियोजना लागत',
      agreementAmount: 'अनुबंध राशि',
      amountReleased: 'जारी की गई राशि',
      availableBalance: 'उपलब्ध शेष राशि',
      responsibleOfficer: 'उत्तरदायी अधिकारी',
      district: 'जिला',
      block: 'प्रखंड',
      panchayat: 'ग्राम पंचायत',
      village: 'गाँव / क्षेत्र',
      address: 'स्थल का पता / लैंडमार्क',
      gpsCoordinates: 'जीपीएस निर्देशांक',
      noCoordinates: 'कोई जीपीएस निर्देशांक दर्ज नहीं',
      category: 'श्रेणी',
      stage: 'जीवनचक्र चरण',
      approvalDate: 'स्वीकृति तिथि',
      startDate: 'प्रारंभ तिथि',
      expectedCompletion: 'अपेक्षित पूर्णता तिथि',
      actualCompletion: 'वास्तविक पूर्णता तिथि',
      status: 'वर्तमान स्थिति',
      health: 'स्वास्थ्य स्थिति',
      pendingAction: 'लंबित कार्रवाई',
      remarks: 'टिप्पणी',
      noHindiTranslation: 'हिन्दी शीर्षक उपलब्ध नहीं',
      showingEnglishFallback: 'अंग्रेज़ी शीर्षक दिखाया गया',
      supportingDocs: 'संबंधित परियोजना दस्तावेज़',
      uploadDoc: 'दस्तावेज़ अपलोड करें',
      activityHistory: 'गतिविधि इतिहास एवं स्थिति परिवर्तन',
      noActivity: 'कोई हाल की गतिविधि दर्ज नहीं है।',
    },

    form: {
      newProjectTitle: 'नई विकास परियोजना स्वीकृत करें',
      newProjectSubtitle: 'संपूर्ण प्रशासनिक, वित्तीय, भौगोलिक और समयरेखा विवरण दर्ज करें।',
      returnToProjects: 'परियोजना सूची पर वापस जाएँ',
      saveProject: 'परियोजना स्वीकृत एवं सहेजें',
      saving: 'सत्यापन एवं स्वीकृति जारी...',
      resetForm: 'फॉर्म रीसेट करें',

      secBasic: '1. बुनियादी परियोजना जानकारी',
      secBasicDesc: 'आधिकारिक पहचान, द्विभाषी नाम, विभागीय आवंटन और कार्यक्षेत्र।',
      secGeo: '2. भौगोलिक विवरण एवं भू-स्थान (Geolocation)',
      secGeoDesc: 'प्रशासनिक पदानुक्रम, क्षेत्रीय सीमाएँ और वास्तविक जीपीएस निर्देशांक।',
      secFinance: '3. वित्तीय स्वीकृति एवं लागत अनुमान',
      secFinanceDesc: 'लागत अनुमान, स्वीकृत आवंटन, अनुबंध राशि और निधि निर्गमन।',
      secTimeline: '4. परियोजना समय-सारणी एवं माइलस्टोन',
      secTimelineDesc: 'स्वीकृति तिथियाँ, कार्य प्रारंभ की नियोजित तिथि और पूर्णता की समय-सीमा।',
      secProgress: '5. प्रारंभिक स्थिति एवं जीवनचक्र चरण',
      secProgressDesc: 'प्रारंभिक भौतिक प्रगति, चरण और निगरानी प्राथमिकता।',
      secDocs: '6. सहायक दस्तावेज़',
      secDocsDesc: 'प्रशासनिक स्वीकृति, डीपीआर, तकनीकी स्वीकृति या स्थल निरीक्षण आदेश।',

      nameEn: 'परियोजना का नाम (अंग्रेज़ी में)',
      nameEnPlaceholder: 'उदा. Construction of Rural Connectivity Road',
      nameHi: 'परियोजना का नाम (हिन्दी में)',
      nameHiPlaceholder: 'उदा. ग्रामीण संपर्क सड़क का निर्माण',
      descEn: 'परियोजना विवरण (अंग्रेज़ी में)',
      descEnPlaceholder: 'परियोजना के कार्यक्षेत्र, तकनीकी विनिर्देशों और लाभार्थियों का विवरण...',
      descHi: 'परियोजना विवरण (हिन्दी में)',
      descHiPlaceholder: 'परियोजना के कार्यक्षेत्र, तकनीकी विनिर्देशों और लाभार्थियों का विस्तृत विवरण प्रदान करें...',
      category: 'परियोजना श्रेणी',
      categorySelect: 'परियोजना श्रेणी चुनें',
      fy: 'वित्तीय वर्ष',
      department: 'क्रियान्वयन विभाग',
      deptSelect: 'विभाग चुनें',
      officer: 'उत्तरदायी अधिकारी / अभियंता',
      officerPlaceholder: 'उदा. इं. राजेश कुमार, कार्यपालक अभियंता',

      state: 'राज्य',
      district: 'जिला',
      block: 'प्रखंड',
      panchayat: 'ग्राम पंचायत',
      village: 'गाँव / कस्बा',
      address: 'स्थल का पता / लैंडमार्क',
      addressPlaceholder: 'उदा. वार्ड 4 से मुख्य मार्ग तक नदी पुल होते हुए',
      latitude: 'अक्षांश (Latitude)',
      latitudePlaceholder: 'उदा. 23.6345',
      longitude: 'देशांतर (Longitude)',
      longitudePlaceholder: 'उदा. 85.5123',
      detectLocation: 'मेरा वर्तमान जीपीएस स्थान प्राप्त करें',
      detectingLocation: 'जीपीएस निर्देशांक प्राप्त किए जा रहे हैं...',
      locationDetected: 'ब्राउज़र भू-स्थान से जीपीएस निर्देशांक भर दिए गए।',
      locationDenied: 'स्थान अनुमति अस्वीकृत या अनुपलब्ध है।',

      estimatedCost: 'अनुमानित परियोजना लागत (₹)',
      approvedAmount: 'स्वीकृत राशि (₹)',
      agreementAmount: 'अनुबंध / अनुबंध राशि (₹)',
      amountReleased: 'प्रारंभिक जारी राशि (₹)',
      expenditure: 'अब तक का व्यय (₹)',

      approvalDate: 'प्रशासनिक स्वीकृति तिथि',
      plannedStartDate: 'नियोजित प्रारंभ तिथि',
      plannedCompletionDate: 'नियोजित पूर्णता तिथि',
      actualStartDate: 'वास्तविक प्रारंभ तिथि',
      actualCompletionDate: 'वास्तविक पूर्णता तिथि',

      physicalProgress: 'प्रारंभिक भौतिक प्रगति (%)',
      financialProgress: 'प्रारंभिक वित्तीय प्रगति (%)',
      stage: 'परियोजना जीवनचक्र चरण',
      status: 'प्रारंभिक स्थिति',
      priority: 'निगरानी प्राथमिकता',
      remarks: 'प्रशासनिक टिप्पणी / निर्देश',
      remarksPlaceholder: 'कोई विशेष निर्देश, स्थल निरीक्षण टिप्पणी या निगरानी दिशा-निर्देश दर्ज करें...',

      docTitle: 'दस्तावेज़ का नाम / प्रकार',
      docChoose: 'संलग्न करने हेतु फ़ाइल चुनें',
      docUploadBtn: 'दस्तावेज़ संलग्न करें',
      docUploadedList: 'संलग्न दस्तावेज़',
      noDocsAttached: 'अब तक कोई दस्तावेज़ संलग्न नहीं है। प्रशासनिक स्वीकृति, तकनीकी स्वीकृति या डीपीआर संलग्न करें।',
      docSimulatedNotice: 'नोट: दस्तावेज़ इस सत्र के परियोजना रिकॉर्ड के साथ संलग्न रहेंगे।',

      errors: {
        nameEnRequired: 'परियोजना का अंग्रेज़ी नाम अनिवार्य है (न्यूनतम 3 अक्षर)।',
        nameEnMin: 'परियोजना का नाम न्यूनतम 3 अक्षरों का होना चाहिए।',
        descEnRequired: 'परियोजना का विवरण अंग्रेज़ी में अनिवार्य है (न्यूनतम 10 अक्षर)।',
        descEnMin: 'विवरण न्यूनतम 10 अक्षरों का होना चाहिए।',
        categoryRequired: 'कृपया परियोजना श्रेणी चुनें।',
        departmentRequired: 'कृपया क्रियान्वयन विभाग चुनें।',
        districtRequired: 'जिला अनिवार्य है।',
        estimatedCostRequired: 'अनुमानित लागत अनिवार्य है।',
        estimatedCostPositive: 'अनुमानित लागत शून्य से अधिक होनी चाहिए।',
        approvedPositive: 'स्वीकृत राशि ऋणात्मक नहीं हो सकती।',
        agreementPositive: 'अनुबंध राशि ऋणात्मक नहीं हो सकती।',
        expenditurePositive: 'व्यय ऋणात्मक नहीं हो सकता।',
        approvedExceedsEstimated: 'स्वीकृत राशि अनुमानित लागत से अधिक नहीं होनी चाहिए।',
        expenditureExceedsApproved: 'व्यय स्वीकृत राशि से अधिक नहीं हो सकता।',
        latitudeRange: 'अक्षांश -90 से 90 डिग्री के बीच होना चाहिए।',
        longitudeRange: 'देशांतर -180 से 180 डिग्री के बीच होना चाहिए।',
        coordsIncomplete: 'कृपया दोनों अक्षांश और देशांतर भरें या दोनों रिक्त छोड़ें।',
        plannedCompletionBeforeStart: 'नियोजित पूर्णता तिथि प्रारंभ तिथि से पूर्व नहीं हो सकती।',
        plannedStartRequired: 'नियोजित प्रारंभ तिथि अनिवार्य है।',
        plannedCompletionRequired: 'नियोजित पूर्णता तिथि अनिवार्य है।',
      },
    },

    geo: {
      mapTitle: 'भौगोलिक परियोजना वितरण',
      mapSubtitle: 'सत्यापित निर्देशांकों के साथ जियो-टैग्ड परियोजनाओं का इंटरैक्टिव मानचित्र',
      allDistricts: 'सभी जिले',
      projectsWithCoords: 'जीपीएस निर्देशांक सहित',
      projectsWithoutCoords: 'निर्देशांक रहित',
      totalGeoMapped: 'कुल जियो-टैग्ड',
      clickPinToInspect: 'विवरण देखने के लिए परियोजना मार्कर पर क्लिक करें',
      showMyLocation: 'मेरा स्थान दिखाएँ',
      myLocationActive: 'आपका स्थान पिन सक्रिय है',
      coordsNotFound: 'इस परियोजना के लिए निर्देशांक दर्ज नहीं हैं।',
      openProjectDetails: 'परियोजना विवरण खोलें',
      viewOnMap: 'मानचित्र पर देखें',
    },

    common: {
      ongoing: 'चालू',
      completed: 'पूर्ण',
      pending: 'लंबित',
      delayed: 'विलंबित',
      critical: 'अति-गंभीर',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'निम्न',
      onTrack: 'समय पर',
      atRisk: 'जोखिम में',
      close: 'बंद करें',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      success: 'सफलता',
      error: 'त्रुटि',
      notice: 'सूचना',
      projectCreatedSuccess: 'परियोजना सफलतापूर्वक स्वीकृत एवं पंजीकृत कर दी गई है!',
    },
  },
}
