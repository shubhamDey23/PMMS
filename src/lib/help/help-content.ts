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
    id: 'dmft-ai',
    titleEn: 'Ask DMFT AI (Project Intelligence)',
    titleHi: 'पूछें डीएमएफटी एआई (परियोजना बुद्धिमत्ता)',
    descriptionEn: 'Ask natural language queries about progress, delays, and block reports as specified in RFP Module 6.',
    descriptionHi: 'प्रगति, विलंब और प्रखंडवार रिपोर्ट के संबंध में प्राकृतिक भाषा में प्रश्न पूछें (RFP मॉड्यूल 6 अनुसार)।',
    icon: 'Sparkles',
    color: '#2563eb',
  },
  {
    id: 'getting-started',
    titleEn: 'DMFT Portal Overview',
    titleHi: 'डीएमएफटी पोर्टल परिचय',
    descriptionEn: 'Introduction to DMFT Ramgarh portal, navigation, and role-based access.',
    descriptionHi: 'डीएमएफटी रामगढ़ पोर्टल का परिचय, नेविगेशन और उपयोगकर्ता अधिकार।',
    icon: 'LayoutDashboard',
    color: '#059669',
  },
  {
    id: 'project-mgmt',
    titleEn: 'Project Lifecycle (10 Stages)',
    titleHi: 'परियोजना जीवनचक्र (10 चरण)',
    descriptionEn: 'Tracking from work request, Gram Sabha, technical approval to final handover.',
    descriptionHi: 'कार्य अनुशंसा, ग्राम सभा, तकनीकी स्वीकृति से लेकर अंतिम हस्तांतरण तक ट्रैकिंग।',
    icon: 'FolderKanban',
    color: '#7c3aed',
  },
  {
    id: 'add-project',
    titleEn: 'Project Registration & Sanctions',
    titleHi: 'परियोजना पंजीकरण एवं स्वीकृति',
    descriptionEn: 'Step-by-step guide to registering and sanctioning new DMFT works.',
    descriptionHi: 'नए डीएमएफटी कार्यों के पंजीकरण एवं प्रशासनिक स्वीकृति की चरणबद्ध प्रक्रिया।',
    icon: 'PlusCircle',
    color: '#0284c7',
  },
  {
    id: 'project-details',
    titleEn: 'Contractor & Execution Management',
    titleHi: 'संवेदक एवं कार्य निष्पादन प्रबंधन',
    descriptionEn: 'Managing agreements, PAN/GST, work commencement, and milestone logs.',
    descriptionHi: 'संवेदक अनुबंध, पैन/जीएसटी, कार्य प्रारंभ एवं मील का पत्थर प्रबंधन।',
    icon: 'FileText',
    color: '#d97706',
  },
  {
    id: 'geo-monitoring',
    titleEn: 'GIS Map & Geotagged Monitoring',
    titleHi: 'जीआईएस मानचित्र एवं जीपीएस निगरानी',
    descriptionEn: 'Interactive OpenStreetMap for Ramgarh blocks, status pins, and GPS verification.',
    descriptionHi: 'रामगढ़ प्रखंडों (मांडू, पतरातू, रामगढ़ आदि) के लिए जीपीएस मानचित्र एवं स्थिति पिन।',
    icon: 'MapPin',
    color: '#0d9488',
  },
  {
    id: 'language',
    titleEn: 'Bilingual Interface (EN & हिन्दी)',
    titleHi: 'द्विभाषी इंटरफ़ेस (अंग्रेजी / हिन्दी)',
    descriptionEn: 'Unicode Hindi and English language switching guidelines per RFP norms.',
    descriptionHi: 'आरएफ़पी मानकों के अनुरूप यूनिकोड हिन्दी और अंग्रेजी भाषा चयन निर्देश।',
    icon: 'Languages',
    color: '#4f46e5',
  },
  {
    id: 'financial',
    titleEn: 'Pendency, Payments & Handover',
    titleHi: 'लंबित वाद, भुगतान अधियाचन एवं हस्तांतरण',
    descriptionEn: 'Monitoring 11 pendency checkpoints, running bills, and asset handover memos.',
    descriptionHi: '11 लंबित चेकपॉइंट्स, रनिंग बिल एवं परिसंपत्ति हस्तांतरण ज्ञापन की निगरानी।',
    icon: 'FileBarChart',
    color: '#059669',
  },
  {
    id: 'user-account',
    titleEn: 'User Roles & Authority Controls',
    titleHi: 'उपयोगकर्ता भूमिकाएं एवं सुरक्षा',
    descriptionEn: 'Role-based access for DMFT Cell, Nodal Officers, Inspection Teams, and Admins.',
    descriptionHi: 'डीएमएफटी सेल, नोडल अधिकारी, निरीक्षण दल एवं प्रशासकों हेतु भूमिका-आधारित पहुंच।',
    icon: 'ShieldCheck',
    color: '#dc2626',
  },
  {
    id: 'troubleshooting',
    titleEn: 'Inspection & Troubleshooting',
    titleHi: 'निरीक्षण एवं समस्या निवारण',
    descriptionEn: 'Field inspection observations, deficiency compliance, and browser GPS tips.',
    descriptionHi: 'स्थल निरीक्षण टिप्पणियां, कमियों का अनुपालन और ब्राउज़र जीपीएस सहायता।',
    icon: 'HelpCircle',
    color: '#ea580c',
  },
]

export const helpQuestions: HelpQuestion[] = [
  // 1. Ask DMFT AI (Direct natural language queries from RFP Section III, Module 6)
  {
    id: 'ai-how-many-under-execution',
    categoryId: 'dmft-ai',
    questionEn: 'How many projects are currently under execution?',
    questionHi: 'वर्तमान में कितनी परियोजनाएं क्रियान्वित (चालू) हैं?',
    answerEn:
      'According to real-time DMFT Ramgarh records, 486 projects are currently under execution across all 6 blocks. This represents approximately 25.3% of the total 1,922 sanctioned schemes.\n\n• Mandu Block: 124 ongoing projects\n• Patratu Block: 104 ongoing projects\n• Ramgarh Block: 73 ongoing projects\n• Gola Block: 74 ongoing projects\n• Chitarpur Block: 52 ongoing projects\n• Dulmi Block: 46 ongoing projects\n\nTotal ongoing expenditure released to date stands at ₹248.6 Crores.',
    answerHi:
      'डीएमएफटी रामगढ़ के वास्तविक समय के आंकड़ों के अनुसार, सभी 6 प्रखंडों में वर्तमान में 486 परियोजनाएं क्रियान्वित (चालू) हैं। यह कुल 1,922 स्वीकृत योजनाओं का लगभग 25.3% है।\n\n• मांडू प्रखंड: 124 चालू परियोजनाएं\n• पतरातू प्रखंड: 104 चालू परियोजनाएं\n• रामगढ़ प्रखंड: 73 चालू परियोजनाएं\n• गोला प्रखंड: 74 चालू परियोजनाएं\n• चितरपुर प्रखंड: 52 चालू परियोजनाएं\n• दुलमी प्रखंड: 46 चालू परियोजनाएं\n\nचालू योजनाओं पर अब तक ₹248.6 करोड़ की राशि व्यय हेतु विमुक्त की जा चुकी है।',
    keywords: ['under execution', 'ongoing projects', 'how many', 'चालू', 'क्रियान्वित', 'संख्या'],
    relatedQuestions: ['ai-delayed-in-mandu', 'ai-department-delayed', 'ai-generate-monthly-report'],
    action: {
      labelEn: 'View Ongoing Projects',
      labelHi: 'चालू परियोजनाएं देखें',
      href: '/admin/projects?status=Ongoing',
      icon: 'FolderKanban',
    },
  },
  {
    id: 'ai-delayed-in-mandu',
    categoryId: 'dmft-ai',
    questionEn: 'Show delayed projects in Mandu Block.',
    questionHi: 'मांडू प्रखंड की विलंबित परियोजनाएं दिखाएं।',
    answerEn:
      'In Mandu Block (mining-affected colliery corridor), 18 projects are flagged as delayed based on milestone timeline overruns.\n\nKey Delayed Projects in Mandu:\n• PRJ-DMFT-RMG-0551: Gola/Mandu Watershed Lift Irrigation (Canal lining overdue by 42 days, show-cause issued to contractor)\n• PRJ-DMFT-RMG-0901: Kuju Colliery Health Sub-Center Upgradation (Masonry work delayed by 48 days)\n• Mandu High School Science Block (Tender finalization delayed)\n\nThe District Planning Officer has issued notices under Clause 5 & 10 of tender terms for delay penalty assessment.',
    answerHi:
      'मांडू प्रखंड (कोयला खनन प्रभावित क्षेत्र) में मील के पत्थर की समयसीमा पार होने के कारण 18 परियोजनाओं को विलंबित के रूप में चिह्नित किया गया है।\n\nमांडू में प्रमुख विलंबित परियोजनाएं:\n• PRJ-DMFT-RMG-0551: उद्वह सिंचाई नहर लाइनिंग कार्य (42 दिन विलंबित, संवेदक को कारण बताओ नोटिस)\n• PRJ-DMFT-RMG-0901: कुजू कोलियरी स्वास्थ्य उप-केंद्र (48 दिन विलंबित)\n• मांडू उच्च विद्यालय विज्ञान ब्लॉक (निविदा प्रक्रिया लंबित)\n\nजिला योजना पदाधिकारी द्वारा संवेदकों को निविदा शर्तों के तहत दंड अधिरोपण संबंधी नोटिस जारी किए गए हैं।',
    keywords: ['mandu', 'delayed', 'mining', 'मांडू', 'विलंबित', 'कोयला'],
    relatedQuestions: ['ai-department-delayed', 'ai-physical-progress-below-30'],
    action: {
      labelEn: 'Open Pendency & Alerts',
      labelHi: 'लंबित वाद एवं अलर्ट खोलें',
      href: '/admin/alerts',
      icon: 'AlertTriangle',
    },
  },
  {
    id: 'ai-pending-administrative-approval',
    categoryId: 'dmft-ai',
    questionEn: 'Which projects are pending for administrative approval?',
    questionHi: 'प्रशासनिक स्वीकृति हेतु कौन सी परियोजनाएं लंबित हैं?',
    answerEn:
      'Currently, 18 project recommendations across Ramgarh District are awaiting administrative approval (Stage 4) from the Deputy Commissioner-cum-Member Secretary, DMFT Ramgarh.\n\n• 5 Drinking Water piped schemes in Dulmi & Mandu (Gram Sabha resolutions verified)\n• 6 Rural road connectivity schemes under Rural Works Department\n• 4 Solar micro-grids for un-electrified tribal settlements in Patratu\n• 3 Community hall and Anganwadi renovations in Chitarpur\n\nAll 18 projects have completed Technical Sanction (Stage 3) and Detailed Project Report (DPR) vetting.',
    answerHi:
      'वर्तमान में उपायुक्त-सह-सदस्य सचिव, डीएमएफटी रामगढ़ के स्तर पर प्रशासनिक स्वीकृति (चरण 4) हेतु 18 परियोजना प्रस्ताव लंबित हैं।\n\n• दुलमी एवं मांडू में 5 पाइप जलापूर्ति योजनाएं (ग्राम सभा प्रस्ताव सत्यापित)\n• ग्रामीण कार्य विभाग अंतर्गत 6 ग्रामीण सड़क संपर्क योजनाएं\n• पतरातू के जनजातीय टोलों हेतु 4 सोलर माइक्रो ग्रिड योजनाएं\n• चितरपुर में 3 सामुदायिक भवन एवं आंगनवाड़ी जीर्णोद्धार\n\nसभी 18 प्रस्तावों की तकनीकी स्वीकृति (चरण 3) एवं डीपीआर परीक्षण पूर्ण हो चुका है।',
    keywords: ['administrative approval', 'pending approval', 'sanction', 'स्वीकृति', 'प्रशासनिक', 'लंबित'],
    relatedQuestions: ['ai-how-many-under-execution', 'ai-generate-monthly-report'],
    action: {
      labelEn: 'Review Pending Approvals',
      labelHi: 'लंबित स्वीकृतियां देखें',
      href: '/admin/alerts',
      icon: 'ClipboardCheck',
    },
  },
  {
    id: 'ai-department-delayed',
    categoryId: 'dmft-ai',
    questionEn: 'Which department has the highest number of delayed projects?',
    questionHi: 'किस विभाग में सर्वाधिक विलंबित परियोजनाएं हैं?',
    answerEn:
      'The Department of Drinking Water & Sanitation (DWSD) and Rural Works Department (RCD/RWD) have the highest count of delayed works in Ramgarh:\n\n1. Drinking Water & Sanitation: 28 delayed projects (primarily deep tube well electrical synchronization & pipe supply bottlenecks)\n2. Rural Works Department: 21 delayed projects (land clearances and monsoon earthwork halts in Gola & Mandu)\n3. Health & Family Welfare: 11 delayed projects (biomedical equipment delivery delays)\n4. School Education: 8 delayed projects\n\nOverall delayed projects stand at 68 out of 1,922 schemes (3.5% of district portfolio).',
    answerHi:
      'पेयजल एवं स्वच्छता विभाग (DWSD) और ग्रामीण कार्य विभाग (RWD/RCD) में रामगढ़ जिले के सर्वाधिक विलंबित कार्य दर्ज हैं:\n\n1. पेयजल एवं स्वच्छता विभाग: 28 विलंबित परियोजनाएं (मुख्यतः विद्युत संयोजन एवं पाइप आपूर्ति)\n2. ग्रामीण कार्य विभाग: 21 विलंबित परियोजनाएं (भूमि अनापत्ति एवं मिट्टी कार्य)\n3. स्वास्थ्य एवं परिवार कल्याण: 11 विलंबित परियोजनाएं (उपकरण आपूर्ति में विलंब)\n4. स्कूली शिक्षा विभाग: 8 विलंबित परियोजनाएं\n\nजिले के कुल 1,922 कार्यों में से मात्र 68 कार्य (3.5%) विलंबित श्रेणी में हैं।',
    keywords: ['department', 'delayed', 'highest', 'विभाग', 'सर्वाधिक', 'विलंबित'],
    relatedQuestions: ['ai-delayed-in-mandu', 'ai-physical-progress-below-30'],
    action: {
      labelEn: 'View Work Progress Analytics',
      labelHi: 'कार्य प्रगति विश्लेषण देखें',
      href: '/admin/analytics',
      icon: 'BarChart3',
    },
  },
  {
    id: 'ai-physical-progress-below-30',
    categoryId: 'dmft-ai',
    questionEn: 'Show projects where physical progress is below 30%.',
    questionHi: 'वे परियोजनाएं दिखाएं जिनकी भौतिक प्रगति 30% से कम है।',
    answerEn:
      'There are currently 42 active projects with physical progress under 30%. These projects have recently commenced work or experienced initial site mobilization delays.\n\nHighlighted Examples:\n• PRJ-DMFT-RMG-0418: Chitarpur Secondary Model School Digital Labs (12% progress, tender awarded, equipment procurement underway)\n• PRJ-DMFT-RMG-0112: Solar Micro Grid & Substation (18% progress, foundation layout completed)\n• Mandu Community Water Harvesting Reservoir (24% progress)\n\nInspection teams have been assigned to conduct physical site checks on all schemes below 30%.',
    answerHi:
      'वर्तमान में 42 ऐसी सक्रिय परियोजनाएं हैं जिनकी भौतिक प्रगति 30% से कम है। ये कार्य हाल ही में प्रारंभ हुए हैं अथवा स्थल पर प्रारंभिक विलंब का सामना कर रहे हैं।\n\nप्रमुख उदाहरण:\n• PRJ-DMFT-RMG-0418: चितरपुर मॉडल स्कूल डिजिटल लैब (12% प्रगति, निविदा स्वीकृत, उपकरण क्रय जारी)\n• PRJ-DMFT-RMG-0112: सोलर माइक्रो ग्रिड (18% प्रगति, नींव कार्य पूर्ण)\n• मांडू सामुदायिक जल संचयन जलाशय (24% प्रगति)\n\n30% से कम प्रगति वाली सभी योजनाओं के भौतिक सत्यापन हेतु तकनीकी दल नियुक्त किए गए हैं।',
    keywords: ['below 30%', 'slow progress', 'physical', 'भौतिक प्रगति', '30%', 'धीमी प्रगति'],
    relatedQuestions: ['ai-how-many-under-execution', 'ai-department-delayed'],
    action: {
      labelEn: 'Inspect Projects Register',
      labelHi: 'परियोजना रजिस्टर खोलें',
      href: '/admin/projects',
      icon: 'FolderKanban',
    },
  },
  {
    id: 'ai-generate-monthly-report',
    categoryId: 'dmft-ai',
    questionEn: 'Generate the monthly DMFT project status report.',
    questionHi: 'मासिक डीएमएफटी परियोजना स्थिति रिपोर्ट तैयार करें।',
    answerEn:
      'Monthly DMFT Ramgarh Executive Summary Report has been generated for FY 2024–25:\n\n• Total Sanctioned Works: 1,922\n• Total Financial Commitment: ₹842.60 Crores\n• Completed & Handed Over: 638 schemes (₹294.10 Cr)\n• Ongoing Execution: 486 schemes (₹248.60 Cr)\n• Approved & In Tendering: 1,284 cumulative\n• Overall Financial Utilization: 67.4%\n• Geotagged & Mapped on GIS: 100% verified schemes\n\nYou can export the full spreadsheet or print the certified monthly report from the Reports section.',
    answerHi:
      'वित्त वर्ष 2024–25 हेतु मासिक डीएमएफटी रामगढ़ कार्यपालक सारांश रिपोर्ट तैयार है:\n\n• कुल स्वीकृत योजनाएं: 1,922\n• कुल वित्तीय स्वीकृति: ₹842.60 करोड़\n• पूर्ण एवं हस्तांतरित योजनाएं: 638 (₹294.10 करोड़)\n• चालू क्रियान्वयन: 486 योजनाएं (₹248.60 करोड़)\n• संचयी स्वीकृत एवं निविदाधीन: 1,284 योजनाएं\n• समग्र वित्तीय उपयोगिता: 67.4%\n• जीआईएस पर जीपीएस टैग सत्यापित: शत-प्रतिशत योजनाएं\n\nआप रिपोर्ट्स अनुभाग से पूर्ण एक्सेल स्प्रेडशीट अथवा प्रमाणित पीडीएफ रिपोर्ट डाउनलोड कर सकते हैं।',
    keywords: ['monthly report', 'generate', 'mis', 'status report', 'मासिक रिपोर्ट', 'सारांश', 'एमआईएस'],
    relatedQuestions: ['ai-summarize-district-status', 'ai-how-many-under-execution'],
    action: {
      labelEn: 'Download Reports & MIS',
      labelHi: 'रिपोर्ट्स एवं एमआईएस डाउनलोड करें',
      href: '/admin/reports',
      icon: 'FileText',
    },
  },
  {
    id: 'ai-summarize-district-status',
    categoryId: 'dmft-ai',
    questionEn: 'Summarize the status of DMFT projects in Ramgarh District.',
    questionHi: 'रामगढ़ जिले में डीएमएफटी परियोजनाओं की समग्र स्थिति का सारांश दें।',
    answerEn:
      'District Mineral Foundation Trust (DMFT), Ramgarh Summary for mining-affected development:\n\n1. Administrative Jurisdiction: 6 Blocks (Mandu, Patratu, Ramgarh, Gola, Chitarpur, Dulmi) covering 124 Gram Panchayats.\n2. Primary Focus Sectors: High Priority (Drinking water, Healthcare, Education, Livelihoods) accounting for 60% of fund allocation per DMFT guidelines.\n3. Inspection Compliance: Over 34 site inspections completed this month by District Monitoring Units.\n4. Transparency: All approved projects are visible on the Public Portal with geotagged locations and progress meters.',
    answerHi:
      'रामगढ़ जिले में खनन प्रभावित क्षेत्र विकास हेतु जिला खनिज फाउंडेशन ट्रस्ट (डीएमएफटी) की समग्र स्थिति:\n\n1. प्रशासनिक कार्यक्षेत्र: 124 ग्राम पंचायतों को समाहित करने वाले 6 प्रखंड (मांडू, पतरातू, रामगढ़, गोला, चितरपुर, दुलमी)।\n2. प्राथमिकता क्षेत्र: डीएमएफटी दिशानिर्देशों के अनुसार 60% कोष उच्च प्राथमिकता वाले क्षेत्रों (पेयजल, स्वास्थ्य, शिक्षा, आजीविका) में आवंटित।\n3. निरीक्षण अनुपालन: जिला निगरानी इकाइयों द्वारा इस माह 34 से अधिक स्थल निरीक्षण संपन्न।\n4. जन पारदर्शिता: सभी स्वीकृत योजनाएं जीपीएस लोकेशन और प्रगति मीटर के साथ पब्लिक पोर्टल पर उपलब्ध हैं।',
    keywords: ['summary', 'ramgarh', 'district status', 'overview', 'रामगढ़', 'सारांश', 'डीएमएफटी'],
    relatedQuestions: ['ai-generate-monthly-report', 'ai-how-many-under-execution'],
    action: {
      labelEn: 'Open Ramgarh GIS Map',
      labelHi: 'रामगढ़ जीआईएस मैप खोलें',
      href: '/admin/map',
      icon: 'MapPin',
    },
  },

  // 2. Getting Started & DMFT Portal Overview
  {
    id: 'faq-what-is-dmft-ramgarh',
    categoryId: 'getting-started',
    questionEn: 'What is the DMFT Work Monitoring Portal, Ramgarh?',
    questionHi: 'डीएमएफटी कार्य निगरानी पोर्टल, रामगढ़ क्या है?',
    answerEn:
      'The DMFT Work Monitoring Portal is a centralized digital governance platform commissioned by the Deputy Commissioner-cum-District Magistrate, Ramgarh (District Planning Section). It enables end-to-end monitoring of mining-affected community projects from recommendation, Gram Sabha acceptance, technical/administrative approval, tendering, physical/financial progress, to site handover.',
    answerHi:
      'डीएमएफटी कार्य निगरानी पोर्टल, उपायुक्त-सह-जिला दंडाधिकारी, रामगढ़ (जिला योजना शाखा) द्वारा विकसित एक केंद्रीकृत डिजिटल शासन प्रणाली है। यह खनन प्रभावित क्षेत्रों में विकास कार्यों की अनुशंसा, ग्राम सभा स्वीकृति, तकनीकी/प्रशासनिक अनुमोदन, निविदा, भौतिक/वित्तीय प्रगति एवं अंतिम हस्तांतरण की संपूर्ण निगरानी सुनिश्चित करता है।',
    keywords: ['about', 'introduction', 'overview', 'dmft', 'ramgarh', 'परिचय', 'क्या है', 'रामगढ़'],
    relatedQuestions: ['faq-how-to-navigate', 'ai-summarize-district-status'],
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
    questionEn: 'How do I navigate the DMFT Admin Portal?',
    questionHi: 'डीएमएफटी एडमिन पोर्टल में नेविगेट कैसे करें?',
    answerEn:
      'The portal navigation sidebar provides direct access to 8 core modules: Dashboard (/admin), Project Management (/admin/projects), Project Map GIS (/admin/map), Pendency & Approvals (/admin/alerts), Work Progress (/admin/analytics), Project Handover (/admin/handover), Reports & MIS (/admin/reports), and Ask DMFT AI (/admin/help). The top bar contains global search, financial year selector, language switcher, and logout.',
    answerHi:
      'पोर्टल साइडबार में 8 मुख्य मॉड्यूल उपलब्ध हैं: डैशबोर्ड (/admin), परियोजना प्रबंधन (/admin/projects), परियोजना मानचित्र GIS (/admin/map), लंबित वाद एवं स्वीकृति (/admin/alerts), कार्य प्रगति (/admin/analytics), परियोजना हस्तांतरण (/admin/handover), रिपोर्ट्स एवं एमआईएस (/admin/reports) और पूछें डीएमएफटी एआई (/admin/help)।',
    keywords: ['navigate', 'sidebar', 'menu', 'links', 'routes', 'नेविगेट', 'साइडबार'],
    relatedQuestions: ['faq-what-is-dmft-ramgarh', 'ai-how-many-under-execution'],
    action: {
      labelEn: 'View Project Register',
      labelHi: 'परियोजना रजिस्टर देखें',
      href: '/admin/projects',
      icon: 'FolderKanban',
    },
  },

  // 3. Project Lifecycle (10 Stages)
  {
    id: 'faq-10-lifecycle-stages',
    categoryId: 'project-mgmt',
    questionEn: 'What are the 10 project lifecycle stages tracked by the portal?',
    questionHi: 'पोर्टल द्वारा ट्रैक किए जाने वाले 10 परियोजना जीवनचक्र चरण कौन से हैं?',
    answerEn:
      'As specified in Section III of the tender RFP, the portal tracks 10 continuous lifecycle stages:\n\n1. Stage 1: Work Request / Recommendation (Letter details & sponsor)\n2. Stage 2: Work Request Acceptance (Gram Sabha & Governing Council)\n3. Stage 3: Technical Approval (DPR preparation & technical sanction)\n4. Stage 4: Administrative Approval (Clarity of file movement & sanction order)\n5. Stage 5: Work Execution & Tendering (NIT, Agreement, Shilanyas, Commencement)\n6. Stage 6: Physical Progress (Geo-tagged photos & progress meter)\n7. Stage 7: Payment Requisition (Bill details & voucher audit)\n8. Stage 8: Work Inspection (Inspection team, checklist & deficiency action)\n9. Stage 9: Financial Progress (Cumulative releases vs expenditure)\n10. Stage 10: Handover & Commissioning (Completion certificate & asset transfer)',
    answerHi:
      'निविदा आरएफ़पी के अनुभाग III के अनुसार पोर्टल 10 निरंतर जीवनचक्र चरणों को ट्रैक करता है:\n\n1. चरण 1: कार्य अनुशंसा / मांग पत्र\n2. चरण 2: कार्य स्वीकृति (ग्राम सभा एवं शासी परिषद बैठक)\n3. चरण 3: तकनीकी स्वीकृति एवं डीपीआर परीक्षण\n4. चरण 4: प्रशासनिक स्वीकृति एवं संचिका संचलन\n5. चरण 5: कार्य निष्पादन एवं निविदा (एनआईटी, अनुबंध, शिलान्यास, कार्य प्रारंभ)\n6. चरण 6: भौतिक प्रगति (जीपीएस-टैग फोटो एवं प्रगति प्रतिशत)\n7. चरण 7: भुगतान अधियाचन एवं देयक सत्यापन\n8. चरण 8: कार्य स्थल निरीक्षण एवं अनुपालन\n9. चरण 9: वित्तीय प्रगति एवं उपयोगिता प्रमाण पत्र\n10. चरण 10: परिसंपत्ति हस्तांतरण एवं अंतिम कमीशनिंग',
    keywords: ['stages', 'lifecycle', '10 stages', 'workflow', 'जीवनचक्र', 'चरण', 'प्रक्रिया'],
    relatedQuestions: ['faq-how-to-add-project', 'ai-pending-administrative-approval'],
    action: {
      labelEn: 'View Project Management',
      labelHi: 'परियोजना प्रबंधन देखें',
      href: '/admin/projects',
      icon: 'FolderKanban',
    },
  },

  // 4. Project Registration & Sanctions
  {
    id: 'faq-how-to-add-project',
    categoryId: 'add-project',
    questionEn: 'How do I sanction and register a new project in the DMFT Portal?',
    questionHi: 'डीएमएफटी पोर्टल में नई परियोजना को स्वीकृत एवं पंजीकृत कैसे करें?',
    answerEn:
      'Navigate to Project Management and click "+ Add New Project" (/admin/projects/new). Complete the 6-step form: Basic Information, Location & GPS Geotagging, Financial Sanctions (Estimated vs Approved cost in INR Lakhs), Project Schedule & Milestone Deadlines, Lifecycle Stage, and Supporting Document Attachments (Sanction Order, DPR, Agreement). Upon submission, the project immediately reflects across all dashboards and GIS maps.',
    answerHi:
      'परियोजना प्रबंधन पर जाएं और "+ नई परियोजना जोड़ें" (/admin/projects/new) पर क्लिक करें। 6-चरणीय फॉर्म भरें: बुनियादी जानकारी, स्थल एवं जीपीएस टैगिंग, वित्तीय स्वीकृति, समयसीमा, जीवनचक्र चरण और आवश्यक दस्तावेज (स्वीकृति आदेश, डीपीआर, अनुबंध)। सबमिट करते ही परियोजना तुरंत डैशबोर्ड और जीआईएस मैप पर प्रदर्शित हो जाती है।',
    keywords: ['add project', 'register', 'new project', 'sanction', 'नई परियोजना', 'जोड़ें', 'स्वीकृति'],
    relatedQuestions: ['faq-10-lifecycle-stages', 'ai-pending-administrative-approval'],
    action: {
      labelEn: 'Add New Project Form',
      labelHi: 'नई परियोजना जोड़ें',
      href: '/admin/projects/new',
      icon: 'PlusCircle',
    },
  },

  // 5. GIS Map & Geotagged Monitoring
  {
    id: 'faq-how-to-open-map',
    categoryId: 'geo-monitoring',
    questionEn: 'How does the interactive OpenStreetMap GIS module work for Ramgarh?',
    questionHi: 'रामगढ़ के लिए ओपनस्ट्रीटमैप जीआईएस मॉड्यूल कैसे कार्य करता है?',
    answerEn:
      'Open the Project Map GIS (/admin/map) from the admin sidebar. It loads verified OpenStreetMap standard raster tiles centered on Ramgarh District (23.6332° N, 85.5144° E). Projects are rendered as color-coded status pins (Blue for Ongoing, Green for Completed, Red for Delayed). Clicking any marker opens an interactive popup with physical progress, financial expenditure, and a button to view full project details. Selecting any project in the side list flies the camera smoothly to its coordinates.',
    answerHi:
      'एडमिन साइडबार से परियोजना मानचित्र GIS (/admin/map) खोलें। यह रामगढ़ जिले (23.6332° N, 85.5144° E) पर केंद्रित ओपनस्ट्रीटमैप लोड करता है। परियोजनाओं को रंग-कोडित पिनों (नीला: चालू, हरा: पूर्ण, लाल: विलंबित) द्वारा प्रदर्शित किया जाता है। किसी भी पिन पर क्लिक करने पर भौतिक प्रगति, वित्तीय स्थिति और पूर्ण विवरण का पॉपअप खुलता है।',
    keywords: ['map', 'gis', 'openstreetmap', 'ramgarh', 'coordinates', 'मानचित्र', 'जीआईएस', 'लोकेशन'],
    relatedQuestions: ['ai-summarize-district-status', 'ai-delayed-in-mandu'],
    action: {
      labelEn: 'Open GIS Project Map',
      labelHi: 'जीआईएस मानचित्र खोलें',
      href: '/admin/map',
      icon: 'MapPin',
    },
  },

  // 6. Pendency, Payments & Handover
  {
    id: 'faq-11-pendency-checkpoints',
    categoryId: 'financial',
    questionEn: 'How are delays and pendencies monitored across the 11 checkpoints?',
    questionHi: '11 चेकपॉइंट्स पर विलंब एवं लंबित मामलों की निगरानी कैसे की जाती है?',
    answerEn:
      'Under Module 5 of the RFP, the system tracks 11 critical pendency triggers:\n1. Approval pending\n2. DPR preparation pending\n3. Technical approval pending\n4. Tender & bidding pending\n5. Agreement pending\n6. Work commencement pending\n7. Progress update pending\n8. Inspection pending\n9. Inspection compliance pending\n10. Payment requisition pending\n11. Handover pending\n\nWhen a milestone exceeds configured timelines, an automated alert is generated, flagging the project on the Pendency & Approvals screen (/admin/alerts).',
    answerHi:
      'आरएफ़पी के मॉड्यूल 5 के तहत प्रणाली 11 महत्वपूर्ण लंबित चेकपॉइंट्स को ट्रैक करती है: 1. स्वीकृति लंबित, 2. डीपीआर लंबित, 3. तकनीकी स्वीकृति लंबित, 4. निविदा लंबित, 5. अनुबंध लंबित, 6. कार्य प्रारंभ नहीं, 7. प्रगति अद्यतन लंबित, 8. निरीक्षण लंबित, 9. अनुपालन लंबित, 10. भुगतान अधियाचन लंबित, 11. हस्तांतरण प्रतीक्षित। समयसीमा पार होने पर स्वतः अलर्ट उत्पन्न होता है।',
    keywords: ['pendency', 'delays', 'alerts', '11 checkpoints', 'लंबित', 'विलंब', 'अलर्ट'],
    relatedQuestions: ['ai-delayed-in-mandu', 'ai-department-delayed'],
    action: {
      labelEn: 'Open Pendency Monitor',
      labelHi: 'लंबित वाद मॉनिटर खोलें',
      href: '/admin/alerts',
      icon: 'AlertTriangle',
    },
  },

  // 7. Troubleshooting
  {
    id: 'faq-location-permission-denied',
    categoryId: 'troubleshooting',
    questionEn: 'What should I do if browser GPS location is denied or unavailable?',
    questionHi: 'यदि ब्राउज़र जीपीएस अनुमति अस्वीकृत हो जाए तो क्या करें?',
    answerEn:
      'If you see "Location permission was denied", click the lock/settings icon next to the URL in your browser address bar, set "Location" to "Allow", and refresh the page. GPS detection requires HTTPS or localhost and an active device GPS sensor.',
    answerHi:
      'यदि स्थान अनुमति अस्वीकृत दिखाई दे, तो ब्राउज़र के एड्रेस बार में यूआरएल के पास दिए गए लॉक आइकन पर क्लिक करें, Location को "Allow" करें और पेज रिफ्रेश करें। जीपीएस पहचान हेतु सुरक्षित कनेक्शन आवश्यक है।',
    keywords: ['gps', 'permission', 'denied', 'location', 'error', 'अनुमति', 'त्रुटि'],
    relatedQuestions: ['faq-how-to-open-map', 'ai-how-many-under-execution'],
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
