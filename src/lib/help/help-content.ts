export interface HelpAction {
  labelEn: string
  labelHi: string
  href: string
  icon?: string
}

export interface HelpQuestion {
  id: string
  categoryId: string
  questionEn: string
  questionHi: string
  answerEn: string
  answerHi: string
  keywords: string[]
  relatedQuestions?: string[]
  action?: HelpAction
}

export interface HelpCategory {
  id: string
  titleEn: string
  titleHi: string
  descriptionEn: string
  descriptionHi: string
  icon: string
  color: string
}

export const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    titleEn: 'Getting Started',
    titleHi: 'शुरुआत कैसे करें',
    descriptionEn: 'Introduction to eSapmada, navigation, and role permissions.',
    descriptionHi: 'eSapmada का परिचय, नेविगेशन और उपयोगकर्ता अधिकार।',
    icon: 'Sparkles',
    color: '#2563eb',
  },
  {
    id: 'dashboard',
    titleEn: 'Dashboard & Analytics',
    titleHi: 'डैशबोर्ड एवं विश्लेषण',
    descriptionEn: 'Understanding high-level KPIs, progress metrics, and charts.',
    descriptionHi: 'मुख्य संकेतक (KPIs), प्रगति मेट्रिक्स और चार्ट को समझना।',
    icon: 'LayoutDashboard',
    color: '#059669',
  },
  {
    id: 'project-mgmt',
    titleEn: 'Project Management',
    titleHi: 'परियोजना प्रबंधन',
    descriptionEn: 'Searching, filtering, and tracking development projects.',
    descriptionHi: 'विकास परियोजनाओं की खोज, फ़िल्टर और निगरानी करना।',
    icon: 'FolderKanban',
    color: '#7c3aed',
  },
  {
    id: 'add-project',
    titleEn: 'Adding New Projects',
    titleHi: 'नई परियोजना जोड़ना',
    descriptionEn: 'Step-by-step guide to sanctioning and registering new works.',
    descriptionHi: 'नए कार्यों की स्वीकृति एवं पंजीकरण की चरणबद्ध प्रक्रिया।',
    icon: 'PlusCircle',
    color: '#0284c7',
  },
  {
    id: 'project-details',
    titleEn: 'Project Details & Milestones',
    titleHi: 'परियोजना विवरण एवं मील के पत्थर',
    descriptionEn: 'Inspecting financials, work orders, timeline stages, and documents.',
    descriptionHi: 'वित्तीय स्थिति, कार्य आदेश, समयसीमा एवं दस्तावेजों का निरीक्षण।',
    icon: 'FileText',
    color: '#d97706',
  },
  {
    id: 'geo-monitoring',
    titleEn: 'Geographic Monitoring & Map',
    titleHi: 'भौगोलिक निगरानी एवं मानचित्र',
    descriptionEn: 'Using interactive OpenStreetMap, GPS coordinates, and status pins.',
    descriptionHi: 'ओपनस्ट्रीटमैप, जीपीएस निर्देशांक और स्थिति पिन का उपयोग।',
    icon: 'MapPin',
    color: '#059669',
  },
  {
    id: 'language-settings',
    titleEn: 'English & Hindi Language',
    titleHi: 'अंग्रेजी एवं हिन्दी भाषा सेटिंग्स',
    descriptionEn: 'Language toggle, persistence, and bilingual fallback behavior.',
    descriptionHi: 'भाषा स्विच, प्राथमिकता सहेजना और द्विभाषी कार्यप्रणाली।',
    icon: 'Languages',
    color: '#0891b2',
  },
  {
    id: 'financial-reports',
    titleEn: 'Financial Reports & Handover',
    titleHi: 'वित्तीय रिपोर्ट एवं हस्तांतरण',
    descriptionEn: 'Expenditure statements, milestone certificates, and asset handover.',
    descriptionHi: 'व्यय विवरण, मील के पत्थर प्रमाण-पत्र और परिसंपत्ति हस्तांतरण।',
    icon: 'Handshake',
    color: '#4f46e5',
  },
  {
    id: 'user-account',
    titleEn: 'User Account & Login',
    titleHi: 'उपयोगकर्ता खाता एवं लॉगिन',
    descriptionEn: 'Admin authentication, session cookies, and logout procedure.',
    descriptionHi: 'प्रशासक प्रमाणीकरण, सत्र सुरक्षा और लॉग आउट प्रक्रिया।',
    icon: 'ShieldCheck',
    color: '#dc2626',
  },
  {
    id: 'troubleshooting',
    titleEn: 'Troubleshooting & FAQs',
    titleHi: 'समस्या निवारण एवं प्रश्नोत्तरी',
    descriptionEn: 'Common issues, browser GPS permissions, and data refresh.',
    descriptionHi: 'सामान्य समस्याएं, ब्राउज़र जीपीएस अनुमति और डेटा रिफ्रेश।',
    icon: 'HelpCircle',
    color: '#ea580c',
  },
]

export const helpQuestions: HelpQuestion[] = [
  // 1. Getting Started
  {
    id: 'faq-what-is-esampada',
    categoryId: 'getting-started',
    questionEn: 'What is eSapmada by Eccentric?',
    questionHi: 'eSapmada by Eccentric क्या है?',
    answerEn:
      'eSapmada by Eccentric is an integrated Government Project Monitoring and Management Portal. It enables department officers and stakeholders to monitor infrastructure works, track physical and financial progress, inspect milestones, manage site handovers, and view real-time geographic distributions across districts and blocks.',
    answerHi:
      'eSapmada by Eccentric एक एकीकृत शासकीय परियोजना निगरानी एवं प्रबंधन पोर्टल है। यह विभागीय अधिकारियों और हितधारकों को अवसंरचना कार्यों की निगरानी, भौतिक एवं वित्तीय प्रगति की ट्रैकिंग, मील के पत्थरों के निरीक्षण, स्थल हस्तांतरण और वास्तविक समय में भौगोलिक मानचित्रण की सुविधा प्रदान करता है।',
    keywords: ['about', 'introduction', 'overview', 'esampada', 'eccentric', 'परिचय', 'क्या है'],
    relatedQuestions: ['faq-how-to-navigate', 'faq-public-vs-admin', 'faq-how-to-add-project'],
    action: {
      labelEn: 'Open Admin Dashboard',
      labelHi: 'डैशबोर्ड खोलें',
      href: '/admin',
      icon: 'LayoutDashboard',
    },
  },
  {
    id: 'faq-how-to-navigate',
    categoryId: 'getting-started',
    questionEn: 'How do I navigate the admin panel?',
    questionHi: 'एडमिन पैनल में नेविगेट कैसे करें?',
    answerEn:
      'The admin interface features a fixed left sidebar with direct access to: Dashboard (/admin), Project Management (/admin/projects), Project Approvals (/admin/alerts), Work Progress (/admin/analytics), Project Handover (/admin/handover), Reports (/admin/reports), Project Map (/admin/map), and Help Assistant (/admin/help). The top bar provides global search, language switcher, and logout.',
    answerHi:
      'एडमिन इंटरफ़ेस में बाईं ओर एक साइडबार है जिसमें डैशबोर्ड (/admin), परियोजना प्रबंधन (/admin/projects), परियोजना अनुमोदन (/admin/alerts), कार्य प्रगति (/admin/analytics), परियोजना हस्तांतरण (/admin/handover), रिपोर्ट्स (/admin/reports), परियोजना मानचित्र (/admin/map) और सहायता सहायक (/admin/help) शामिल हैं।',
    keywords: ['navigate', 'sidebar', 'menu', 'links', 'routes', 'नेविगेट', 'साइडबार'],
    relatedQuestions: ['faq-what-is-esampada', 'faq-how-to-logout'],
    action: {
      labelEn: 'View Project Register',
      labelHi: 'परियोजना रजिस्टर देखें',
      href: '/admin/projects',
      icon: 'FolderKanban',
    },
  },
  {
    id: 'faq-public-vs-admin',
    categoryId: 'getting-started',
    questionEn: 'What is the difference between Public and Admin Dashboards?',
    questionHi: 'सार्वजनिक और एडमिन डैशबोर्ड में क्या अंतर है?',
    answerEn:
      'The Public Dashboard (at /) is open to all citizens without login. It displays high-level project cards, geographic summaries, and overall statistics for public transparency. The Admin Dashboard (at /admin/*) requires authentication and provides officer-level controls, project sanctioning forms, milestone approvals, handover certification, and detailed reports.',
    answerHi:
      'सार्वजनिक डैशबोर्ड (/) सभी नागरिकों के लिए बिना लॉगिन के खुला है। यह पारदर्शिता हेतु परियोजना कार्ड, सारांश और आंकड़े दिखाता है। एडमिन डैशबोर्ड (/admin/*) पासवर्ड से सुरक्षित है और अधिकारियों को नई परियोजना जोड़ने, अनुमोदन करने और विस्तृत रिपोर्ट निकालने की सुविधा देता है।',
    keywords: ['public', 'citizen', 'admin', 'difference', 'permissions', 'सार्वजनिक', 'प्रशासनिक'],
    relatedQuestions: ['faq-what-is-esampada', 'faq-how-to-logout'],
  },
  {
    id: 'faq-how-to-logout',
    categoryId: 'getting-started',
    questionEn: 'How do I log out of the admin panel?',
    questionHi: 'एडमिन पैनल से लॉग आउट कैसे करें?',
    answerEn:
      'You can log out at any time by clicking the red "Logout" button in the top right header, or by clicking the logout icon at the bottom of the left sidebar. Logging out destroys your secure HTTP-only session cookie and redirects you back to the public login page.',
    answerHi:
      'आप शीर्ष दाएँ हेडर में दिए गए लाल "Logout" बटन पर क्लिक करके या साइडबार के नीचे दिए गए लॉगआउट आइकन पर क्लिक करके कभी भी सुरक्षित रूप से बाहर निकल सकते हैं। इससे आपका सत्र समाप्त हो जाएगा।',
    keywords: ['logout', 'signout', 'exit', 'session', 'लॉग आउट', 'बाहर निकलें'],
    relatedQuestions: ['faq-how-to-login', 'faq-how-to-navigate'],
  },

  // 2. Dashboard & Analytics
  {
    id: 'faq-dashboard-kpis',
    categoryId: 'dashboard',
    questionEn: 'How are the dashboard KPI cards calculated?',
    questionHi: 'डैशबोर्ड के KPI कार्ड की गणना कैसे की जाती है?',
    answerEn:
      'KPI counts (Approved, Ongoing, Completed, Pending, and Delayed) are calculated dynamically from the shared project service (projectService). When you add a new project via the Sanction form, the service notifies all subscribers, recalculating totals, financial utilization, and coordinate counts instantly.',
    answerHi:
      'KPI आंकड़े (स्वीकृत, चालू, पूर्ण, लंबित और विलंबित) प्रोजेक्ट सर्विस (projectService) द्वारा लाइव डेटा से स्वतः गिने जाते हैं। नई परियोजना जोड़ने पर कुल संख्या, वित्तीय उपयोग और जीपीएस गणना तत्काल अपडेट हो जाती है।',
    keywords: ['kpi', 'metrics', 'counters', 'statistics', 'गणना', 'आंकड़े'],
    relatedQuestions: ['faq-how-to-check-financials', 'faq-how-to-add-project'],
    action: {
      labelEn: 'Open Dashboard',
      labelHi: 'डैशबोर्ड खोलें',
      href: '/admin',
      icon: 'LayoutDashboard',
    },
  },
  {
    id: 'faq-how-to-check-financials',
    categoryId: 'dashboard',
    questionEn: 'How do I check financial progress and budget utilization?',
    questionHi: 'वित्तीय प्रगति और बजट उपयोग की जांच कैसे करें?',
    answerEn:
      'Open any project card or table row to inspect its Financials tab in the Project Drawer. You will see Sanctioned Cost, Approved Amount, Agreement Amount, Released Funds, and Actual Expenditure in INR (Lakhs/Crores), along with an automated utilization percentage gauge.',
    answerHi:
      'किसी भी परियोजना पर क्लिक करके प्रोजेक्ट ड्रॉअर का "Financials" टैब खोलें। यहाँ आप स्वीकृत राशि, अनुबंध राशि, जारी राशि, व्यय और उपयोगिता प्रतिशत देख सकते हैं।',
    keywords: ['financial', 'budget', 'expenditure', 'utilization', 'वित्तीय', 'बजट', 'खर्च'],
    relatedQuestions: ['faq-dashboard-kpis', 'faq-project-reports'],
    action: {
      labelEn: 'View Financial Analytics',
      labelHi: 'वित्तीय विश्लेषण देखें',
      href: '/admin/analytics',
      icon: 'BarChart3',
    },
  },

  // 3. Project Management
  {
    id: 'faq-how-to-search-projects',
    categoryId: 'project-mgmt',
    questionEn: 'How do I search and filter projects in the register?',
    questionHi: 'प्रोजेक्ट रजिस्टर में परियोजनाओं को कैसे खोजें और फ़िल्टर करें?',
    answerEn:
      'Navigate to Project Management (/admin/projects). Use the search input to search by Project ID (e.g. PRJ-2024-0814), name in English or Hindi, department, block, or village. You can also filter by department, financial year, and status using the Filter Panel.',
    answerHi:
      'प्रोजेक्ट प्रबंधन (/admin/projects) पर जाएं। सर्च बॉक्स में प्रोजेक्ट आईडी, अंग्रेजी या हिन्दी नाम, विभाग या ब्लॉक लिखकर खोजें। फ़िल्टर पैनल से विभाग और स्थिति के आधार पर भी छांट सकते हैं।',
    keywords: ['search', 'filter', 'register', 'query', 'खोजें', 'फ़िल्टर'],
    relatedQuestions: ['faq-how-to-view-details', 'faq-project-status-meaning'],
    action: {
      labelEn: 'Go to Project Register',
      labelHi: 'प्रोजेक्ट रजिस्टर पर जाएं',
      href: '/admin/projects',
      icon: 'FolderKanban',
    },
  },
  {
    id: 'faq-project-status-meaning',
    categoryId: 'project-mgmt',
    questionEn: 'What do the different project statuses mean?',
    questionHi: 'विभिन्न परियोजना स्थितियों का क्या अर्थ है?',
    answerEn:
      'eSapmada tracks 5 lifecycle statuses: 1. Approved (sanctioned, preparing for tender/work order), 2. Ongoing (contractor on site, physical execution underway), 3. Completed (100% physical works finished), 4. Pending (awaiting technical scrutiny or approvals), and 5. Delayed (milestone overdue or show-cause issued).',
    answerHi:
      'पोर्टल 5 स्थितियों को ट्रैक करता है: 1. स्वीकृत (Approved - कार्य स्वीकृत), 2. चालू (Ongoing - कार्य प्रगति पर), 3. पूर्ण (Completed - कार्य 100% समाप्त), 4. लंबित (Pending - तकनीकी स्वीकृति प्रतीक्षित), 5. विलंबित (Delayed - समयसीमा से पीछे)।',
    keywords: ['status', 'approved', 'ongoing', 'completed', 'pending', 'delayed', 'स्थिति'],
    relatedQuestions: ['faq-how-to-search-projects', 'faq-handover-process'],
  },

  // 4. Adding New Projects
  {
    id: 'faq-how-to-add-project',
    categoryId: 'add-project',
    questionEn: 'How do I sanction and add a new development project?',
    questionHi: 'नई विकास परियोजना को कैसे स्वीकृत और पंजीकृत करें?',
    answerEn:
      'Go to /admin/projects/new or click "Add New Project" in the sidebar. Fill out the 6 sections: 1. Basic Info (English & Hindi name/description), 2. Geographic Location (District, Block, Panchayat, Lat/Long), 3. Financial Sanctions (Cost, Approved Amount), 4. Timeline (Planned start/completion), 5. Progress, and 6. Supporting Documents. Click "Save & Sanction Project" to submit.',
    answerHi:
      'साइडबार में "Add New Project" (/admin/projects/new) पर क्लिक करें। 6 चरणों को भरें: 1. सामान्य जानकारी (द्विभाषी नाम), 2. भौगोलिक स्थिति (अक्षांश/देशांतर सहित), 3. वित्तीय स्वीकृति, 4. समयसीमा, 5. प्रारंभिक प्रगति, 6. दस्तावेज। इसके बाद "Save & Sanction Project" पर क्लिक करें।',
    keywords: ['add', 'create', 'new', 'sanction', 'form', 'नई परियोजना', 'जोड़ें'],
    relatedQuestions: ['faq-required-project-fields', 'faq-browser-gps-detection'],
    action: {
      labelEn: 'Open Add Project Form',
      labelHi: 'नया प्रोजेक्ट फॉर्म खोलें',
      href: '/admin/projects/new',
      icon: 'PlusCircle',
    },
  },
  {
    id: 'faq-required-project-fields',
    categoryId: 'add-project',
    questionEn: 'Which fields are required when adding a project?',
    questionHi: 'परियोजना जोड़ते समय कौन से फ़ील्ड अनिवार्य हैं?',
    answerEn:
      'The form validates via Zod schema: Required fields are Project Name (English, min 3 chars), Description (English), Category, Financial Year, Department, District, and Estimated Cost (must be greater than 0). Hindi names, GPS coordinates, agreement amounts, and document uploads are recommended for full GIS tracking.',
    answerHi:
      'अनिवार्य फ़ील्ड हैं: परियोजना का नाम (अंग्रेजी, न्यूनतम 3 अक्षर), विवरण, श्रेणी, वित्तीय वर्ष, विभाग, जिला और अनुमानित लागत (0 से अधिक)। जीपीएस निर्देशांक और हिन्दी नाम बेहतर मैपिंग के लिए अनुशंसित हैं।',
    keywords: ['required', 'validation', 'fields', 'zod', 'rules', 'अनिवार्य', 'नियम'],
    relatedQuestions: ['faq-how-to-add-project', 'faq-browser-gps-detection'],
  },
  {
    id: 'faq-browser-gps-detection',
    categoryId: 'add-project',
    questionEn: 'How does the "Detect My GPS Location" button work in the project form?',
    questionHi: 'प्रोजेक्ट फॉर्म में "Detect My GPS Location" बटन कैसे काम करता है?',
    answerEn:
      'When adding a project while at the work site, click "Detect My GPS Location" in Section 2. Your browser will ask for location permission. Once granted, it captures high-accuracy latitude and longitude coordinates directly into the form fields, ensuring precise map placement.',
    answerHi:
      'कार्यस्थल पर होने पर फॉर्म के सेक्शन 2 में "Detect My GPS Location" पर क्लिक करें। ब्राउज़र अनुमति मिलने पर यह आपके सटीक जीपीएस अक्षांश एवं देशांतर को फॉर्म में स्वतः भर देगा।',
    keywords: ['gps', 'detect', 'coordinates', 'geolocation', 'site', 'स्थान', 'जीपीएस'],
    relatedQuestions: ['faq-how-to-add-project', 'faq-how-to-open-map'],
  },

  // 5. Project Details & Milestones
  {
    id: 'faq-how-to-view-details',
    categoryId: 'project-details',
    questionEn: 'How do I view a project\'s complete details and documents?',
    questionHi: 'किसी परियोजना का संपूर्ण विवरण और दस्तावेज कैसे देखें?',
    answerEn:
      'Click on any project title in the Project Register, or click on a marker popup in the Project Map. The comprehensive 6-tab Project Drawer will slide open from the right, showing Overview, Financials in INR, Progress, Workflow & Milestones, Supporting Documents (DPRs, Sanctions), and Activity Audit Log.',
    answerHi:
      'प्रोजेक्ट रजिस्टर या मानचित्र के किसी भी प्रोजेक्ट पर क्लिक करें। दाईं ओर से 6-टैब वाला प्रोजेक्ट ड्रॉअर खुलेगा जिसमें सामान्य जानकारी, वित्तीय ब्यौरा, मील के पत्थर, संलग्न दस्तावेज और ऑडिट लॉग उपलब्ध होंगे।',
    keywords: ['drawer', 'details', 'documents', 'inspection', 'milestones', 'विवरण', 'दस्तावेज'],
    relatedQuestions: ['faq-how-to-search-projects', 'faq-handover-process'],
    action: {
      labelEn: 'Open Project Register',
      labelHi: 'प्रोजेक्ट रजिस्टर खोलें',
      href: '/admin/projects',
      icon: 'FolderKanban',
    },
  },

  // 6. Geographic Monitoring & Map
  {
    id: 'faq-how-to-open-map',
    categoryId: 'geo-monitoring',
    questionEn: 'How do I open and interact with the Project Map?',
    questionHi: 'प्रोजेक्ट मानचित्र को कैसे खोलें और उपयोग करें?',
    answerEn:
      'Navigate to /admin/map from the sidebar. The interactive map uses Leaflet and OpenStreetMap tiles to plot all sanctioned projects with verified coordinates. You can zoom, pan, toggle between Street and Satellite maps, filter by district/status, and click any marker to view its details.',
    answerHi:
      'साइडबार से /admin/map पर जाएं। यह इंटरएक्टिव मानचित्र लीफलेट और ओपनस्ट्रीटमैप का उपयोग करके वास्तविक निर्देशांकों वाले सभी प्रोजेक्ट्स को दिखाता है। आप ज़ूम कर सकते हैं, मार्कर पर क्लिक करके विवरण देख सकते हैं।',
    keywords: ['map', 'leaflet', 'openstreetmap', 'gis', 'pins', 'मानचित्र', 'मैप'],
    relatedQuestions: ['faq-why-project-missing-from-map', 'faq-map-marker-colors'],
    action: {
      labelEn: 'Open Project Map',
      labelHi: 'प्रोजेक्ट मैप खोलें',
      href: '/admin/map',
      icon: 'MapPin',
    },
  },
  {
    id: 'faq-why-project-missing-from-map',
    categoryId: 'geo-monitoring',
    questionEn: 'Why does a project not appear on the map?',
    questionHi: 'कोई परियोजना मानचित्र पर क्यों नहीं दिखाई दे रही है?',
    answerEn:
      'Projects only appear as pins on the map if they possess valid numeric Latitude (-90 to 90) and Longitude (-180 to 180) coordinates in their record. Projects created without coordinates are counted under "Without Coordinates" and remain accessible in the table register.',
    answerHi:
      'परियोजनाएं मानचित्र पर केवल तभी दिखाई देती हैं जब उनके रिकॉर्ड में मान्य अक्षांश (-90 से 90) और देशांतर (-180 से 180) दर्ज हों। बिना निर्देशांक वाले प्रोजेक्ट केवल तालिका रजिस्टर में दिखाई देते हैं।',
    keywords: ['missing', 'coordinates', 'pin', 'error', 'अनुपस्थित', 'निर्देशांक'],
    relatedQuestions: ['faq-how-to-open-map', 'faq-how-to-add-project'],
  },
  {
    id: 'faq-map-marker-colors',
    categoryId: 'geo-monitoring',
    questionEn: 'What do the map marker colors represent?',
    questionHi: 'मानचित्र मार्कर रंगों का क्या अर्थ है?',
    answerEn:
      'Markers are color-coded by project lifecycle status: Green = Completed (100% finished), Blue = Ongoing (execution in progress), Amber = Pending (awaiting sanctions/tenders), Red = Delayed (exceeded planned completion date). Pulsing rings indicate high-priority active works.',
    answerHi:
      'मार्कर रंगों का अर्थ: हरा = पूर्ण (Completed), नीला = चालू (Ongoing), पीला = लंबित (Pending), लाल = विलंबित (Delayed)। पल्स रिंग सक्रिय कार्यों को दर्शाती है।',
    keywords: ['colors', 'legend', 'markers', 'pins', 'status', 'रंग', 'संकेत'],
    relatedQuestions: ['faq-how-to-open-map', 'faq-project-status-meaning'],
  },

  // 7. English & Hindi Language Settings
  {
    id: 'faq-how-to-switch-language',
    categoryId: 'language-settings',
    questionEn: 'How do I switch between English and Hindi (हिन्दी)?',
    questionHi: 'अंग्रेजी और हिन्दी के बीच भाषा कैसे बदलें?',
    answerEn:
      'Click the language toggle (English / हिन्दी) in the top right header on any page. The interface immediately translates without reloading the page. Your choice is automatically saved in browser localStorage and a cookie, so it persists when you refresh or navigate across pages.',
    answerHi:
      'हेडर में ऊपर दाईं ओर स्थित भाषा टॉगल (English / हिन्दी) पर क्लिक करें। पूरा इंटरफ़ेस बिना पेज रीलोड हुए तुरंत बदल जाता है और आपकी पसंद स्वतः सहेजी जाती है।',
    keywords: ['language', 'hindi', 'english', 'switch', 'translate', 'भाषा', 'हिन्दी'],
    relatedQuestions: ['faq-language-fallback-behavior'],
  },
  {
    id: 'faq-language-fallback-behavior',
    categoryId: 'language-settings',
    questionEn: 'Why is some project text still in English when Hindi is selected?',
    questionHi: 'हिन्दी चुनने पर भी कुछ प्रोजेक्ट टेक्स्ट अंग्रेजी में क्यों दिखता है?',
    answerEn:
      'Static portal labels, navigation, filters, validation messages, and buttons are fully translated. However, user-entered project records (like custom contractor names or descriptions entered in English only) will display their English text if no Hindi translation was provided during project sanctioning.',
    answerHi:
      'सिस्टम के सभी बटन, मेनू और संदेश पूरी तरह अनुवादित हैं। लेकिन यदि किसी नए प्रोजेक्ट को जोड़ते समय केवल अंग्रेजी नाम दर्ज किया गया था, तो सिस्टम सुरक्षित रूप से उसी नाम को प्रदर्शित करता है।',
    keywords: ['fallback', 'translation', 'bilingual', 'text', 'अनुवाद', 'फ़ॉलबैक'],
    relatedQuestions: ['faq-how-to-switch-language', 'faq-how-to-add-project'],
  },

  // 8. Financial Reports & Handover
  {
    id: 'faq-handover-process',
    categoryId: 'financial-reports',
    questionEn: 'How does the Project Handover and Commissioning workflow work?',
    questionHi: 'परियोजना हस्तांतरण एवं कमीशनिंग कार्यप्रणाली कैसे काम करती है?',
    answerEn:
      'Navigate to /admin/handover. This dedicated page lists all 100% completed works. Line officers review the 4-point handover checklist: 1. Site Work Completion, 2. Quality & Safety Clearance, 3. Joint Field Inspection Signoff, and 4. Asset Register Memo. Clicking "Certify Handover" formally signs off the asset transfer.',
    answerHi:
      'हस्तांतरण पृष्ठ (/admin/handover) पर जाएं। यहाँ 100% पूर्ण कार्य सूचीबद्ध होते हैं। अधिकारी 4-बिंदु चेकलिस्ट (स्थल कार्य, गुणवत्ता प्रमाणन, संयुक्त निरीक्षण, परिसंपत्ति पंजी) की समीक्षा करके "हस्तांतरण प्रमाणित करें" पर क्लिक करते हैं।',
    keywords: ['handover', 'commissioning', 'asset', 'completion', 'हस्तांतरण', 'कमीशनिंग'],
    relatedQuestions: ['faq-project-reports', 'faq-how-to-view-details'],
    action: {
      labelEn: 'Go to Project Handover',
      labelHi: 'प्रोजेक्ट हस्तांतरण पर जाएं',
      href: '/admin/handover',
      icon: 'Handshake',
    },
  },
  {
    id: 'faq-project-reports',
    categoryId: 'financial-reports',
    questionEn: 'How do I generate and export project reports and audit statements?',
    questionHi: 'परियोजना रिपोर्ट एवं ऑडिट विवरण कैसे जनरेट और डाउनलोड करें?',
    answerEn:
      'Go to /admin/reports. You can generate: 1. Monthly Progress Report (MPR), 2. Financial Sanction vs. Expenditure Statement, 3. Delayed Projects Remedial Audit, and 4. GIS Field Photo Register. Filter by Financial Year and Department, then click "Generate & Download Report" or export pre-compiled PDFs and Excel sheets.',
    answerHi:
      'रिपोर्ट्स पृष्ठ (/admin/reports) पर जाएं। यहाँ से मासिक प्रगति रिपोर्ट (MPR), वित्तीय व्यय लेखा, विलंबित परियोजना समीक्षा और जीआईएस फोटो पंजी जनरेट करके पीडीएफ या एक्सेल में डाउनलोड कर सकते हैं।',
    keywords: ['reports', 'export', 'pdf', 'excel', 'mpr', 'audit', 'रिपोर्ट', 'डाउनलोड'],
    relatedQuestions: ['faq-handover-process', 'faq-how-to-check-financials'],
    action: {
      labelEn: 'Go to Reports Page',
      labelHi: 'रिपोर्ट्स पृष्ठ पर जाएं',
      href: '/admin/reports',
      icon: 'FileText',
    },
  },

  // 9. User Account & Login
  {
    id: 'faq-how-to-login',
    categoryId: 'user-account',
    questionEn: 'How does authentication and session security work?',
    questionHi: 'प्रमाणीकरण एवं सत्र सुरक्षा कैसे कार्य करती है?',
    answerEn:
      'Officer login at /login authenticates credentials against server-side environment variables. Upon verification, the server issues an encrypted HMAC-SHA256 session cookie (pmms_session) with HttpOnly, SameSite=Lax, and Secure flags. Unauthenticated requests to /admin/* are automatically intercepted and redirected to /login?next=...',
    answerHi:
      'लॉगिन पृष्ठ (/login) पर क्रेडेंशियल्स सर्वर द्वारा सत्यापित किए जाते हैं और एक सुरक्षित एन्क्रिप्टेड कुकी जारी की जाती है। बिना लॉगिन के एडमिन पृष्ठों पर जाने का प्रयास करने पर उपयोगकर्ता को स्वतः लॉगिन पर भेज दिया जाता है।',
    keywords: ['login', 'auth', 'security', 'cookie', 'session', 'लॉगिन', 'सुरक्षा'],
    relatedQuestions: ['faq-how-to-logout', 'faq-public-vs-admin'],
  },

  // 10. Troubleshooting
  {
    id: 'faq-location-permission-denied',
    categoryId: 'troubleshooting',
    questionEn: 'What should I do if browser GPS location is denied or unavailable?',
    questionHi: 'यदि ब्राउज़र जीपीएस अनुमति अस्वीकृत हो जाए तो क्या करें?',
    answerEn:
      'If you see "Location permission was denied", click the lock/settings icon next to the URL in your browser address bar, set "Location" to "Allow", and refresh the page. GPS detection requires HTTPS or localhost and an active device GPS sensor.',
    answerHi:
      'यदि स्थान अनुमति अस्वीकृत दिखाई दे, तो ब्राउज़र के एड्रेस बार में यूआरएल के पास दिए गए लॉक आइकन पर क्लिक करें, Location को "Allow" करें और पेज रिफ्रेश करें।',
    keywords: ['gps', 'permission', 'denied', 'location', 'error', 'अनुमति', 'त्रुटि'],
    relatedQuestions: ['faq-browser-gps-detection', 'faq-how-to-open-map'],
  },
]

export function searchHelp(query: string, language: 'en' | 'hi' = 'en'): HelpQuestion[] {
  const clean = query.trim().toLowerCase()
  if (!clean) return []

  return helpQuestions.filter((q) => {
    const matchEn =
      q.questionEn.toLowerCase().includes(clean) ||
      q.answerEn.toLowerCase().includes(clean) ||
      q.keywords.some((k) => k.toLowerCase().includes(clean))

    const matchHi =
      q.questionHi.toLowerCase().includes(clean) ||
      q.answerHi.toLowerCase().includes(clean) ||
      q.keywords.some((k) => k.toLowerCase().includes(clean))

    const cat = helpCategories.find((c) => c.id === q.categoryId)
    const matchCat =
      cat &&
      (cat.titleEn.toLowerCase().includes(clean) ||
        cat.titleHi.toLowerCase().includes(clean) ||
        cat.descriptionEn.toLowerCase().includes(clean) ||
        cat.descriptionHi.toLowerCase().includes(clean))

    return matchEn || matchHi || matchCat
  })
}

