export interface KnowledgeChunk {
  id: string
  title: string
  titleHi: string
  category: 'overview' | 'lifecycle' | 'pendency' | 'roles' | 'gis' | 'reports' | 'system' | 'roadmap'
  stageNumber?: number
  source: string
  sourceHi: string
  contentEn: string
  contentHi: string
  keywords: string[]
  isImplemented: boolean
}

export const ESAPMADA_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'KB-OVERVIEW-01',
    title: 'eSapmada Portal Purpose & DMFT Governance',
    titleHi: 'ई-सम्पदा पोर्टल का उद्देश्य एवं डीएमएफटी शासन',
    category: 'overview',
    source: 'DFMT RFP Section I & II - Executive Overview & Project Background',
    sourceHi: 'डीएमएफटी आरएफपी खंड I एवं II - कार्यकारी अवलोकन एवं परियोजना पृष्ठभूमि',
    isImplemented: true,
    keywords: ['esapmada', 'dmft', 'ramgarh', 'purpose', 'objective', 'governance', 'portal', 'district mineral foundation trust', 'jharkhand', 'उद्देश्य', 'सम्पदा', 'खनन'],
    contentEn: `eSapmada (Electronic Sanction, Approval, Progress Monitoring and Asset Delivery Application) is the official web-based monitoring portal developed for the District Mineral Foundation Trust (DMFT), Ramgarh, Jharkhand.
Its primary objective is end-to-end digital lifecycle governance of development and infrastructure projects funded through DMFT contributions across all 6 administrative blocks of Ramgarh District (Mandu, Patratu, Ramgarh, Gola, Chitarpur, and Dulmi).
The portal provides transparent tracking, accountability, GIS geotagging, delay prevention, financial auditing, and public disclosure of high-priority mining-affected welfare initiatives including drinking water, healthcare, education, irrigation, rural connectivity, and tribal rehabilitation.`,
    contentHi: `ई-सम्पदा (इलेक्ट्रॉनिक स्वीकृति, अनुमोदन, प्रगति निगरानी एवं परिसंपत्ति वितरण अनुप्रयोग) जिला खनिज फाउंडेशन ट्रस्ट (डीएमएफटी), रामगढ़, झारखंड हेतु विकसित आधिकारिक डिजिटल मॉनिटरिंग पोर्टल है।
इसका मुख्य उद्देश्य रामगढ़ जिले के सभी 6 प्रशासनिक प्रखंडों (मांडू, पतरातू, रामगढ़, गोला, चितरपुर एवं दुलमी) में डीएमएफटी निधि से पोषित विकास और बुनियादी ढांचा परियोजनाओं का पूर्ण जीवनचक्र डिजिटलीकरण एवं निगरानी करना है।
यह पोर्टल पेयजल, स्वास्थ्य सेवा, शिक्षा, सिंचाई, ग्रामीण सड़क संपर्क और जनजातीय पुनर्वास सहित खनन प्रभावित प्राथमिक पहलों की पारदर्शी निगरानी, जीआईएस जियोटैगिंग, विलंब रोकथाम, वित्तीय ऑडिट और जन पारदर्शिता सुनिश्चित करता है।`
  },
  {
    id: 'KB-GEOGRAPHY-01',
    title: 'Ramgarh District Administrative Profile & Blocks',
    titleHi: 'रामगढ़ जिला प्रशासनिक रूपरेखा एवं प्रखंड',
    category: 'overview',
    source: 'DFMT RFP Section II - Geographic Scope of Ramgarh District',
    sourceHi: 'डीएमएफटी आरएफपी खंड II - रामगढ़ जिले का भौगोलिक दायरा',
    isImplemented: true,
    keywords: ['blocks', 'geography', 'ramgarh', 'mandu', 'patratu', 'gola', 'chitarpur', 'dulmi', 'panchayat', 'village', 'प्रखंड', 'रामगढ़'],
    contentEn: `Ramgarh District is an intensive coal mining industrial region in Jharkhand. eSapmada covers all 6 official administrative blocks:
1. Mandu: Heavily affected by CCL mining (Kuju, Topa, Sarubera colliery belts). Key focus: clean piped drinking water, pollution abatement, road connectivity.
2. Patratu: Prominent industrial & thermal power hub (PVUNL / PTPS). Key focus: healthcare upgrades, maternal health, secondary education.
3. Ramgarh (Sadar): Urban and suburban municipal cluster. Key focus: civic infrastructure, drainage, solid waste management.
4. Gola: Rural and agricultural belt. Key focus: minor irrigation check dams, rural health centers, solar cold storage.
5. Chitarpur: Dense habitation near Rajrappa religious pilgrimage and sub-mining zone. Key focus: sanitation, community halls, solar lighting.
6. Dulmi: Predominantly tribal rural zone. Key focus: paver roads, child education centers, livelihood self-help groups.`,
    contentHi: `रामगढ़ जिला झारखंड का एक सघन कोयला खनन औद्योगिक क्षेत्र है। ई-सम्पदा सभी 6 आधिकारिक प्रशासनिक प्रखंडों को कवर करता है:
1. मांडू: सीसीएल खनन (कुजू, टोपा, सारुबेड़ा कोलियरी) से सघन रूप से प्रभावित। मुख्य फोकस: स्वच्छ पाइप पेयजल, प्रदूषण नियंत्रण, सड़क संपर्क।
2. पतरातू: प्रमुख औद्योगिक व ताप विद्युत केंद्र (पीवीयूएनएल / पीटीपीएस)। मुख्य फोकस: स्वास्थ्य उप-केंद्र, मातृ स्वास्थ्य, माध्यमिक शिक्षा।
3. रामगढ़ (सदर): शहरी और उपनगरीय नगर पालिका क्षेत्र। मुख्य फोकस: नागरिक बुनियादी ढांचा, जल निकासी, ठोस अपशिष्ट प्रबंधन।
4. गोला: ग्रामीण व कृषि क्षेत्र। मुख्य फोकस: लघु सिंचाई चेक डैम, ग्रामीण स्वास्थ्य केंद्र, सौर ऊर्जा कोल्ड स्टोरेज।
5. चितरपुर: रजरप्पा तीर्थ एवं उप-खनन क्षेत्र। मुख्य फोकस: स्वच्छता, सामुदायिक भवन, सौर स्ट्रीट लाइट।
6. दुलमी: मुख्यतः जनजातीय ग्रामीण अंचल। मुख्य फोकस: पेवर ब्लॉक सड़कें, बाल शिक्षा केंद्र, आजीविका समूह।`
  },
  {
    id: 'KB-STAGE-01',
    title: 'Stage 1: Work Request / Recommendation Workflow',
    titleHi: 'चरण 1: कार्य प्रस्ताव / अनुशंसा कार्यप्रवाह',
    category: 'lifecycle',
    stageNumber: 1,
    source: 'DFMT RFP Section III, Module 1 - Stage 1: Work Request / Recommendation',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 1 - चरण 1: कार्य प्रस्ताव / अनुशंसा',
    isImplemented: true,
    keywords: ['stage 1', 'recommendation', 'work request', 'mla', 'mp', 'gram sabha', 'letter', 'registration', 'प्रस्ताव', 'अनुशंसा', 'चरण 1'],
    contentEn: `Stage 1 captures the initial proposal for a development work in mining-affected villages:
- Required Fields: Block, Panchayat, Village, Work Type, Work Name, Recommended By (Hon'ble MP, MLA, Gram Sabha, District Administration, or Local Representatives), Designation, Letter Date, Letter Reference Number, Recommendation Details, and Uploaded Recommendation Letter.
- Workflow: Proposed works are recorded in the central repository with unique auto-generated tracking IDs (PRJ-DMFT-RMG-XXXX).
- Status in System: Implemented and accessible at /admin/projects/new where authorized officers can submit proposals.`,
    contentHi: `चरण 1 खनन प्रभावित गांवों में विकास कार्य के प्रारंभिक प्रस्ताव को दर्ज करता है:
- आवश्यक विवरण: प्रखंड, पंचायत, ग्राम, कार्य का प्रकार, कार्य का नाम, अनुशंसक (माननीय सांसद, विधायक, ग्राम सभा, जिला प्रशासन या जनप्रतिनिधि), पदनाम, पत्र संख्या, पत्र दिनांक, अनुशंसा का विवरण एवं अपलोड किया गया अनुशंसा पत्र।
- कार्यप्रवाह: प्रस्तावित कार्य केंद्रीय डेटाबेस में एक अद्वितीय पहचान संख्या (PRJ-DMFT-RMG-XXXX) के साथ दर्ज होते हैं।
- प्रणाली में स्थिति: पूर्णतः लागू है और /admin/projects/new पर अधिकृत पदाधिकारियों द्वारा प्रस्ताव दर्ज किए जा सकते हैं।`
  },
  {
    id: 'KB-STAGE-02',
    title: 'Stage 2: Work Request Acceptance & Scrutiny',
    titleHi: 'चरण 2: कार्य प्रस्ताव स्वीकृति एवं संवीक्षा',
    category: 'lifecycle',
    stageNumber: 2,
    source: 'DFMT RFP Section III, Module 1 - Stage 2: Work Request Acceptance',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 1 - चरण 2: कार्य प्रस्ताव स्वीकृति',
    isImplemented: true,
    keywords: ['stage 2', 'acceptance', 'scrutiny', 'governing council', 'gram sabha', 'mining zone', 'priority', 'स्वीकृति', 'चरण 2'],
    contentEn: `Stage 2 evaluates the submitted work request against DMFT guidelines and statutory norms:
- Verification Points: Gram Sabha resolution verification, Governing Council screening, eligibility check under DMFT mining-affected priority sectors (High Priority: 60% funds for Drinking Water, Health, Education, Environment; Other Priority: 40% for Infrastructure, Energy, Irrigation).
- Workflow: The Nodal Officer and DMFT CEO review the request, record meeting minutes, assign priority rating, and either Accept for Technical Sanction or Reject with specific recorded remarks.
- Status in System: Fully implemented in the eSapmada approval lifecycle state machine.`,
    contentHi: `चरण 2 प्रस्तुत कार्य प्रस्ताव की डीएमएफटी दिशानिर्देशों एवं नियमों के तहत संवीक्षा करता है:
- सत्यापन बिंदु: ग्राम सभा संकल्प का सत्यापन, शासी परिषद द्वारा जांच, डीएमएफटी खनन प्रभावित प्राथमिकता क्षेत्रों के तहत पात्रता जांच (उच्च प्राथमिकता: पेयजल, स्वास्थ्य, शिक्षा, पर्यावरण हेतु 60% निधि; अन्य प्राथमिकता: बुनियादी ढांचा, ऊर्जा, सिंचाई हेतु 40%)।
- कार्यप्रवाह: नोडल पदाधिकारी एवं डीएमएफटी सीईओ प्रस्ताव की समीक्षा करते हैं, बैठक कार्यवाही दर्ज करते हैं, प्राथमिकता निर्धारित करते हैं, और या तो तकनीकी स्वीकृति हेतु 'स्वीकृत' करते हैं अथवा कारण सहित 'अस्वीकृत'।
- प्रणाली में स्थिति: ई-सम्पदा अनुमोदन जीवनचक्र स्टेट मशीन में पूर्णतः कार्यरत है।`
  },
  {
    id: 'KB-STAGE-03',
    title: 'Stage 3: Technical Approval & Sanction (TS)',
    titleHi: 'चरण 3: तकनीकी स्वीकृति एवं प्राक्कलन (TS)',
    category: 'lifecycle',
    stageNumber: 3,
    source: 'DFMT RFP Section III, Module 1 - Stage 3: Technical Approval',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 1 - चरण 3: तकनीकी स्वीकृति',
    isImplemented: true,
    keywords: ['stage 3', 'technical sanction', 'ts', 'dpr', 'executive engineer', 'estimate', 'sor', 'तकनीकी स्वीकृति', 'डीपीआर', 'चरण 3'],
    contentEn: `Stage 3 represents detailed engineering estimation and formal Technical Sanction (TS):
- Requirements: Assigned Execution Line Department (e.g. Rural Works, Drinking Water & Sanitation, Building Construction, Minor Irrigation) conducts site survey and prepares Detailed Project Report (DPR).
- Captured Fields: Technical Sanction Order Number, TS Sanction Date, TS Sanctioned Amount, Schedule of Rates (SoR) compliance, structural design drawings, and DPR PDF document.
- Responsible Officer: Competent Executive Engineer (EE) / Superintending Engineer (SE).
- Status in System: Fully supported with document upload and approval transitions in eSapmada.`,
    contentHi: `चरण 3 विस्तृत इंजीनियरिंग प्राक्कलन एवं औपचारिक तकनीकी स्वीकृति (टीएस) का प्रतिनिधित्व करता है:
- आवश्यकताएँ: नामित कार्यकारी लाइन विभाग (ग्रामीण कार्य, पेयजल एवं स्वच्छता, भवन निर्माण, लघु सिंचाई आदि) द्वारा स्थल सर्वेक्षण और विस्तृत परियोजना रिपोर्ट (डीपीआर) तैयार करना।
- दर्ज विवरण: तकनीकी स्वीकृति आदेश संख्या, टीएस दिनांक, टीएस स्वीकृत राशि, जेएचएसओआर (Schedule of Rates) अनुपालन, संरचनात्मक डिजाइन ड्राइंग्स, एवं डीपीआर पीडीएफ दस्तावेज।
- जिम्मेदार पदाधिकारी: सक्षम कार्यपालक अभियंता (ईई) / अधीक्षण अभियंता (एसई)।
- प्रणाली में स्थिति: ई-सम्पदा में दस्तावेज अपलोड और अनुमोदन ट्रांजिशन के साथ पूर्णतः लागू है।`
  },
  {
    id: 'KB-STAGE-04',
    title: 'Stage 4: Administrative Approval & Sanction (AS)',
    titleHi: 'चरण 4: प्रशासनिक स्वीकृति एवं आदेश (AS)',
    category: 'lifecycle',
    stageNumber: 4,
    source: 'DFMT RFP Section III, Module 1 - Stage 4: Administrative Approval',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 1 - चरण 4: प्रशासनिक स्वीकृति',
    isImplemented: true,
    keywords: ['stage 4', 'administrative sanction', 'as', 'deputy commissioner', 'dc', 'dm', 'order', 'budget', 'प्रशासनिक स्वीकृति', 'चरण 4'],
    contentEn: `Stage 4 is the apex financial commitment and issuance of formal Administrative Sanction (AS):
- Sanctioning Authority: Deputy Commissioner-cum-District Magistrate, Ramgarh (Chairman, DMFT Managing Committee).
- Captured Fields: Administrative Sanction Order Number, AS Sanction Date, Approved Sanction Amount, Scheme Head, Financial Year Allocation, and Official Signed Sanction Order PDF.
- Workflow: Upon AS clearance, the project moves to the Sanctioned/Approved state, budget is committed, and line departments are authorized to initiate tender procurement.
- Status in System: Fully implemented in eSapmada database and project detail views.`,
    contentHi: `चरण 4 सर्वोच्च वित्तीय प्रतिबद्धता एवं औपचारिक प्रशासनिक स्वीकृति (एएस) आदेश जारी करने का चरण है:
- स्वीकृति प्राधिकारी: उपायुक्त-सह-जिला दंडाधिकारी, रामगढ़ (अध्यक्ष, डीएमएफटी प्रबंध समिति)।
- दर्ज विवरण: प्रशासनिक स्वीकृति आदेश संख्या, एएस स्वीकृति दिनांक, स्वीकृत राशि, योजना शीर्ष, वित्तीय वर्ष आवंटन, एवं हस्ताक्षरित एएस आदेश पीडीएफ दस्तावेज।
- कार्यप्रवाह: एएस आदेश जारी होते ही परियोजना 'स्वीकृत' स्थिति में स्थानांतरित हो जाती है, बजट आरक्षित हो जाता है, और कार्यकारी विभाग को निविदा आमंत्रित करने का अधिकार प्राप्त होता है।
- प्रणाली में स्थिति: ई-सम्पदा डेटाबेस और परियोजना विवरण दृश्यों में पूर्णतः लागू है।`
  },
  {
    id: 'KB-STAGE-05',
    title: 'Stage 5: Tender & Contractor Management',
    titleHi: 'चरण 5: निविदा एवं संवेदक अनुबंध प्रबंधन',
    category: 'lifecycle',
    stageNumber: 5,
    source: 'DFMT RFP Section III, Module 1 - Stage 5: Tender Details',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 1 - चरण 5: निविदा विवरण',
    isImplemented: true,
    keywords: ['stage 5', 'tender', 'contractor', 'nit', 'agreement', 'work order', 'bidding', 'निविदा', 'संवेदक', 'अनुबंध', 'चरण 5'],
    contentEn: `Stage 5 governs competitive bidding, contractor selection, and contractual binding:
- Captured Fields: Notice Inviting Tender (NIT) Number & Date, Bidding Mode, Selected Contractor Name, PAN/GSTIN, Empanelment ID, Agreement Reference Number, Agreement Date, Agreement Value (Tender Cost), Defect Liability Period (DLP), Work Order Issuance Date, and Contractual Completion Target Date.
- Safeguards: Prevents commencement of civil works without legally executed agreements and security deposits.
- Status in System: Currently implemented for record management, contractor assignment, and agreement tracking. (Note: Automated 2-way API synchronization with Jharkhand e-Procurement portal is part of the future RFP integration roadmap; data is currently managed through direct portal entry).`,
    contentHi: `चरण 5 प्रतिस्पर्धी निविदा, संवेदक चयन और अनुबंध निष्पादन को नियंत्रित करता है:
- दर्ज विवरण: निविदा आमंत्रण सूचना (एनआईटी) संख्या एवं दिनांक, निविदा प्रकार, चयनित संवेदक का नाम, पैन/जीएसटीआईएन, अनुबंध संख्या, अनुबंध दिनांक, अनुबंध मूल्य (निविदा लागत), दोष दायित्व अवधि (डीएलपी), कार्यादेश (वर्क ऑर्डर) दिनांक, और अनुबंधीय समाप्ति तिथि।
- सुरक्षा मानक: बिना हस्ताक्षरित अनुबंध और सुरक्षा जमा (ईएमडी/एसडी) के निर्माण कार्य प्रारंभ होने पर रोक।
- प्रणाली में स्थिति: वर्तमान में रिकॉर्ड प्रबंधन, संवेदक आवंटन और अनुबंध ट्रैकिंग पूर्णतः लागू है। (नोट: झारखंड ई-प्रोक्योरमेंट पोर्टल के साथ स्वचालित 2-वे एपीआई सिंक भविष्य के रोडमैप का हिस्सा है; वर्तमान में डेटा पोर्टल में सीधे दर्ज किया जाता है)।`
  },
  {
    id: 'KB-STAGE-06',
    title: 'Stage 6: Physical Progress & Milestone Monitoring',
    titleHi: 'चरण 6: भौतिक प्रगति एवं मील का पत्थर निगरानी',
    category: 'lifecycle',
    stageNumber: 6,
    source: 'DFMT RFP Section III, Module 1 - Stage 6: Physical Progress',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 1 - चरण 6: भौतिक प्रगति',
    isImplemented: true,
    keywords: ['stage 6', 'physical progress', 'milestones', 'geotagging', 'photos', 'site engineer', 'percent', 'भौतिक प्रगति', 'मील का पत्थर', 'चरण 6'],
    contentEn: `Stage 6 tracks actual ground-level progress of civil works against agreed timelines:
- Captured Metrics: Cumulative Physical Progress Percentage (0-100%), Specific Stage-wise Milestones (e.g., Plinth level, Roof casting, Finishing, Testing), Milestone Completion Date, Site Engineer Name, and Geo-tagged Site Photographs with coordinates watermark.
- Frequency: Monthly and milestone-based progress reporting. Triggers alerts if progress remains unchanged for more than 30 days.
- Status in System: Fully implemented with visual progress rings, milestone status trackers, and photo audit galleries.`,
    contentHi: `चरण 6 सहमत समय-सीमा के विरुद्ध निर्माण कार्यों की वास्तविक धरातलीय प्रगति को ट्रैक करता है:
- दर्ज मेट्रिक्स: संचयी भौतिक प्रगति प्रतिशत (0-100%), विशिष्ट चरणबद्ध मील के पत्थर (जैसे नींव स्तर, छत ढलाई, फिनिशिंग, परीक्षण), मील का पत्थर पूर्णता तिथि, स्थल अभियंता का नाम, और अक्षांश/देशांतर युक्त जियो-टैग की गई तस्वीरें।
- आवृत्ति: मासिक एवं मील का पत्थर आधारित प्रगति रिपोर्टिंग। यदि 30 दिनों से अधिक समय तक प्रगति अपरिवर्तित रहती है, तो प्रणाली स्वतः अलर्ट जारी करती है।
- प्रणाली में स्थिति: विजुअल प्रोग्रेस रिंग्स, माइलस्टोन ट्रैकर्स और फोटो ऑडिट गैलरी के साथ पूर्णतः लागू है।`
  },
  {
    id: 'KB-STAGE-07',
    title: 'Stage 7: Payment Requisition Workflow',
    titleHi: 'चरण 7: भुगतान अधियाचन कार्यप्रवाह',
    category: 'lifecycle',
    stageNumber: 7,
    source: 'DFMT RFP Section III, Module 1 - Stage 7: Payment Requisition',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 1 - चरण 7: भुगतान अधियाचन',
    isImplemented: true,
    keywords: ['stage 7', 'payment requisition', 'running bill', 'measurement book', 'mb', 'invoice', 'deductions', 'भुगतान', 'बिल', 'चरण 7'],
    contentEn: `Stage 7 manages the contractor's formal claim for completed work stages:
- Captured Fields: Bill / Invoice Number, Bill Date, Running Account (RA) Bill Sequence (1st, 2nd, Final), Measurement Book (MB) Entry Number and Page, Gross Claim Amount, Statutory Deductions (GST, TDS, Labor Welfare Cess, Mining Royalty, Security Deposit Retention), Net Payable Amount, and Line EE Recommendation.
- Prerequisite Validation: System validates that the corresponding physical milestone inspection has been certified before requisition approval.
- Status in System: Implemented in eSapmada database and bill tracking modules.`,
    contentHi: `चरण 7 पूर्ण किए गए कार्य चरणों के लिए संवेदक के औपचारिक बिल दावे का प्रबंधन करता है:
- दर्ज विवरण: बिल / इनवॉइस संख्या, बिल दिनांक, रनिंग अकाउंट (आरए) बिल क्रम (प्रथम, द्वितीय, अंतिम), माप पुस्तिका (एमबी) प्रविष्टि संख्या एवं पृष्ठ, सकल दावा राशि, वैधानिक कटौती (जीएसटी, टीडीएस, उपकर, खनन रॉयल्टी, सुरक्षा जमा), शुद्ध देय राशि, और कार्यपालक अभियंता की अनुशंसा।
- पूर्व-आवश्यकता सत्यापन: प्रणाली सुनिश्चित करती है कि बिल स्वीकृति से पूर्व संबंधित भौतिक निरीक्षण प्रमाणित हो चुका हो।
- प्रणाली में स्थिति: ई-सम्पदा डेटाबेस और बिल ट्रैकिंग मॉड्यूल में लागू है।`
  },
  {
    id: 'KB-STAGE-08',
    title: 'Stage 8: Work Inspection & Quality Audit',
    titleHi: 'चरण 8: स्थल निरीक्षण एवं गुणवत्ता ऑडिट',
    category: 'lifecycle',
    stageNumber: 8,
    source: 'DFMT RFP Section III, Module 1 - Stage 8: Work Inspection',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 1 - चरण 8: स्थल निरीक्षण',
    isImplemented: true,
    keywords: ['stage 8', 'inspection', 'quality', 'audit', 'dqm', 'defects', 'field visit', 'compliance', 'निरीक्षण', 'गुणवत्ता', 'चरण 8'],
    contentEn: `Stage 8 enforces field quality assurance and statutory engineering compliance:
- Inspecting Officers: Assistant Engineer (AE), Executive Engineer (EE), District Quality Monitor (DQM), Technical Cell Ramgarh, and Senior Administrative Officers.
- Captured Fields: Inspection Date, Inspecting Officer Name & Designation, Inspection Type (Milestone Verification, Random Quality Audit, Citizen Grievance Verification), Quality Rating (Satisfactory, Needs Improvement, Critical Defect), Specific Observations / Rectification Notice, Photographic Proof, and Compliance Rectification Report.
- Safety Guard: Unresolved critical defects freeze subsequent payment releases until compliance is verified on-site.
- Status in System: Fully implemented with inspection logs, defect tracking, and compliance checklists.`,
    contentHi: `चरण 8 धरातलीय गुणवत्ता आश्वासन और वैधानिक इंजीनियरिंग अनुपालन सुनिश्चित करता है:
- निरीक्षण पदाधिकारी: सहायक अभियंता (एई), कार्यपालक अभियंता (ईई), जिला गुणवत्ता मॉनिटर (डीक्यूएम), तकनीकी सेल रामगढ़, एवं वरिष्ठ प्रशासनिक पदाधिकारी।
- दर्ज विवरण: निरीक्षण दिनांक, निरीक्षण पदाधिकारी का नाम व पदनाम, निरीक्षण प्रकार (मील का पत्थर सत्यापन, आकस्मिक गुणवत्ता जांच, नागरिक शिकायत जांच), गुणवत्ता रेटिंग (संतोषजनक, सुधार आवश्यक, गंभीर दोष), विशिष्ट टिप्पणियां / दोष निवारण नोटिस, फोटोग्राफिक साक्ष्य, एवं अनुपालन रिपोर्ट।
- सुरक्षा मानक: जब तक गंभीर दोषों का स्थल पर सुधार प्रमाणित नहीं हो जाता, तब तक आगामी भुगतान रोक दिए जाते हैं।
- प्रणाली में स्थिति: निरीक्षण लॉग, दोष ट्रैकिंग और अनुपालन चेकलिस्ट के साथ पूर्णतः लागू है।`
  },
  {
    id: 'KB-STAGE-09',
    title: 'Stage 9: Financial Progress & Fund Release',
    titleHi: 'चरण 9: वित्तीय प्रगति एवं कोष विमुक्ति',
    category: 'lifecycle',
    stageNumber: 9,
    source: 'DFMT RFP Section III, Module 1 - Stage 9: Financial Progress',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 1 - चरण 9: वित्तीय प्रगति',
    isImplemented: true,
    keywords: ['stage 9', 'financial progress', 'expenditure', 'fund release', 'utilization', 'voucher', 'accounts', 'वित्तीय प्रगति', 'व्यय', 'चरण 9'],
    contentEn: `Stage 9 records actual fund disbursement and cumulative financial utilization:
- Captured Fields: Disbursement Voucher Number, Payment Date, Amount Released, Cumulative Expenditure to Date, Unspent Balance, Fund Utilization Percentage, Transaction Mode (NEFT/RTGS/Treasury Voucher), and Accounts Officer Clearance.
- Analytical Metrics: Computes the gap between Physical Progress (%) and Financial Progress (%) to identify over-spending or under-utilization anomalies.
- Status in System: Implemented with financial summary cards, expenditure charts, and block-wise utilization breakdown. (Note: Direct automated bank disbursement via PFMS/CFMS API gateway is planned for future integration; payments are currently recorded via verified voucher entry).`,
    contentHi: `चरण 9 वास्तविक कोष विमुक्ति और संचयी वित्तीय उपयोग को दर्ज करता है:
- दर्ज विवरण: भुगतान वाउचर संख्या, भुगतान दिनांक, जारी की गई राशि, अब तक का संचयी व्यय, अप्रयुक्त शेष राशि, निधि उपयोग प्रतिशत, लेनदेन माध्यम (एनईएफटी/आरटीजीएस/ट्रेजरी वाउचर), और लेखा पदाधिकारी की मंजूरी।
- विश्लेषणात्मक मेट्रिक्स: अधिक भुगतान अथवा कम उपयोग जैसी विसंगतियों की पहचान हेतु भौतिक प्रगति (%) और वित्तीय प्रगति (%) के बीच अंतर (गैप) की गणना।
- प्रणाली में स्थिति: वित्तीय सारांश कार्ड, व्यय चार्ट और प्रखंड-वार उपयोग विश्लेषण के साथ लागू है। (नोट: पीएफएमएस/सीएफएमएस एपीआई द्वारा सीधा बैंक भुगतान भविष्य के रोडमैप में है; वर्तमान में भुगतान सत्यापित वाउचर प्रविष्टि द्वारा दर्ज होते हैं)।`
  },
  {
    id: 'KB-STAGE-10',
    title: 'Stage 10: Project Handover & Asset Delivery',
    titleHi: 'चरण 10: परियोजना हस्तांतरण एवं परिसंपत्ति वितरण',
    category: 'lifecycle',
    stageNumber: 10,
    source: 'DFMT RFP Section III, Module 1 - Stage 10: Project Handover',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 1 - चरण 10: परियोजना हस्तांतरण',
    isImplemented: true,
    keywords: ['stage 10', 'handover', 'completion', 'asset', 'panchayat', 'dlp', 'defect liability', 'हस्तांतरण', 'पूर्णता', 'चरण 10'],
    contentEn: `Stage 10 marks the formal culmination, asset transfer, and operational commissioning:
- Key Steps:
  1. 100% Physical Completion certification and Final Joint Site Inspection.
  2. Execution of Joint Handover Certificate between Line Execution Department and Receiving User Agency (Gram Panchayat, Health Department, Education Department, or Municipal Council).
  3. Asset Takeover Resolution by Gram Sabha / Local Authority.
  4. Maintenance Undertaking and Defect Liability Period (DLP) activation (typically 1 to 5 years).
  5. Issuance of Project Completion Certificate.
- Status in System: Fully implemented with a dedicated Handover Management module at /admin/handover.`,
    contentHi: `चरण 10 परियोजना की औपचारिक पूर्णता, परिसंपत्ति हस्तांतरण और परिचालन का चरण है:
- मुख्य चरण:
  1. 100% भौतिक पूर्णता प्रमाणन एवं अंतिम संयुक्त स्थल निरीक्षण।
  2. कार्यकारी लाइन विभाग और प्राप्तकर्ता एजेंसी (ग्राम पंचायत, स्वास्थ्य विभाग, शिक्षा विभाग, या नगर परिषद) के बीच संयुक्त हस्तांतरण प्रमाणपत्र का निष्पादन।
  3. ग्राम सभा / स्थानीय निकाय द्वारा परिसंपत्ति अधिग्रहण संकल्प।
  4. रखरखाव वचनबद्धता एवं दोष दायित्व अवधि (डीएलपी) सक्रियण (सामान्यतः 1 से 5 वर्ष)।
  5. परियोजना पूर्णता प्रमाणपत्र जारी करना।
- प्रणाली में स्थिति: /admin/handover पर समर्पित हस्तांतरण प्रबंधन मॉड्यूल के साथ पूर्णतः कार्यरत है।`
  },
  {
    id: 'KB-PENDENCY-01',
    title: '11 Specific Pendency Checkpoints & Delay Monitoring',
    titleHi: '11 विशिष्ट लंबित वाद चेकपॉइंट्स एवं विलंब निगरानी',
    category: 'pendency',
    source: 'DFMT RFP Section III, Module 5 - Delay and Pendency Monitoring',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 5 - विलंब एवं लंबित वाद निगरानी',
    isImplemented: true,
    keywords: ['pendency', 'delay', 'checkpoints', 'alerts', 'bottlenecks', 'red', 'amber', 'escalation', 'लंबित', 'विलंब', 'चेकपॉइंट'],
    contentEn: `eSapmada actively enforces the 11 specific pendency checkpoints defined in RFP Section III, Module 5:
1. Approval Pending: Work recommendations awaiting Governing Council or screening approval.
2. DPR Preparation Pending: Line departments delayed in submitting technical DPR (>30 days post-acceptance).
3. Technical Approval Pending: Overdue Technical Sanctions with Executive Engineers (>15 days).
4. Tender & Bidding Pending: Administrative Sanction issued but NIT not published (>15 days).
5. Agreement Pending: Work awarded but contractor contract agreement unsigned (>14 days).
6. Work Not Commenced: Agreement executed but foundation/ground-breaking delayed (>30 days).
7. Progress Update Pending: Ongoing works with no field progress update submitted for >30 days.
8. Pending Inspections: Critical milestone site inspection overdue for AE/EE/DQM.
9. Inspection Compliance Pending: Critical engineering defects detected but rectification report pending (>15 days).
10. Payment Requisition Pending: Contractor running bills submitted but awaiting clearance/disbursement (>15 days).
11. Awaiting Handover: Works 100% physically completed but handover certificate unsigned (>30 days).
Accessible at /admin/alerts with color-coded priority queues (Red for overdue, Amber for warning, Blue/Green for on-track).`,
    contentHi: `ई-सम्पदा आरएफपी खंड III, मॉड्यूल 5 में परिभाषित 11 विशिष्ट लंबित चेकपॉइंट्स की सक्रिय निगरानी करता है:
1. स्वीकृति लंबित: शासी परिषद या स्क्रीनिंग जांच हेतु प्रतीक्षित कार्य प्रस्ताव।
2. डीपीआर तैयारी लंबित: स्वीकृति के 30 दिनों बाद भी लाइन विभाग द्वारा डीपीआर जमा न करना।
3. तकनीकी स्वीकृति लंबित: कार्यपालक अभियंता स्तर पर 15 दिनों से अधिक समय से लंबित तकनीकी स्वीकृति।
4. निविदा प्रक्रिया लंबित: प्रशासनिक स्वीकृति जारी होने के 15 दिनों बाद भी एनआईटी प्रकाशित न होना।
5. अनुबंध हस्ताक्षर लंबित: कार्यादेश जारी होने के 14 दिनों बाद भी संवेदक अनुबंध निष्पादित न होना।
6. कार्य प्रारंभ नहीं: अनुबंध होने के 30 दिनों बाद भी निर्माण कार्य या शिलान्यास प्रारंभ न होना।
7. प्रगति अद्यतन लंबित: चालू कार्यों में 30 दिनों से कोई भौतिक प्रगति दर्ज न होना।
8. लंबित स्थल निरीक्षण: महत्वपूर्ण मील के पत्थर का स्थल निरीक्षण समय पर न होना।
9. निरीक्षण अनुपालन लंबित: निरीक्षण में पाए गए गंभीर दोषों का 15 दिनों में सुधार न होना।
10. भुगतान अधियाचन लंबित: संवेदक रनिंग बिल 15 दिनों से अधिक समय से भुगतान हेतु लंबित।
11. हस्तांतरण प्रतीक्षित: कार्य 100% भौतिक रूप से पूर्ण, किंतु 30 दिनों से हस्तांतरण प्रमाणपत्र अनिष्पादित।
यह /admin/alerts पर लाल (अति-लंबित), पीला (चेतावनी), एवं नीला/हरा (प्रगति पर) प्राथमिकता कतारों के साथ उपलब्ध है।`
  },
  {
    id: 'KB-ROLES-01',
    title: '9 User Roles & Role-Based Access Control (RBAC)',
    titleHi: '9 उपयोगकर्ता भूमिकाएं एवं भूमिका-आधारित नियंत्रण (RBAC)',
    category: 'roles',
    source: 'DFMT RFP Section III, Module 2 - User Management & RBAC',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 2 - उपयोगकर्ता प्रबंधन एवं आरबीएसी',
    isImplemented: true,
    keywords: ['roles', 'permissions', 'users', 'rbac', 'dc', 'ddc', 'dpo', 'engineer', 'contractor', 'भूमिकाएं', 'उपयोगकर्ता', 'अधिकार'],
    contentEn: `eSapmada structures administrative access across 9 specialized user roles:
1. District Administration (DC / DM): Apex sanctioning authority; issues Administrative Sanction (AS); reviews district-wide performance.
2. DMFT CEO / Member Secretary (DDC): Operational authority; chairs scrutiny meetings; tracks lifecycle progression and pendency.
3. Nodal Officer / DPO: Vets work recommendations; compiles agendas; inter-departmental coordination.
4. Designated Senior Officer (AC): Oversees high-value mining welfare projects; resolves land and departmental disputes.
5. Execution Department (Line EE: RWD, DWSD, Building, Irrigation, REO): Prepares DPR; issues Technical Sanction (TS); publishes tenders; submits progress updates.
6. Inspector / Quality Monitor (AE / DQM): Conducts field inspections; uploads geo-tagged evidence; issues defect rectifications.
7. Contractor: Submits bid documents; views agreements; files milestone completion notices; submits payment requisitions.
8. Finance / Accounts Officer: Audits running bills; validates MB entries; calculates statutory deductions; records fund releases.
9. Viewer (Public / Gram Panchayat Representative): Read-only citizen dashboard; monitors village works; views public financial disclosures.
Accessible at /admin/settings for role auditing.`,
    contentHi: `ई-सम्पदा प्रशासनिक पहुंच को 9 विशेष उपयोगकर्ता भूमिकाओं में विभाजित करता है:
1. जिला प्रशासन (उपायुक्त - सह - जिला दंडाधिकारी): सर्वोच्च स्वीकृति प्राधिकारी; प्रशासनिक स्वीकृति जारी करना; जिले की संपूर्ण समीक्षा।
2. डीएमएफटी सीईओ / सदस्य सचिव (डीडीसी): कार्यकारी प्रमुख; संवीक्षा बैठकों की अध्यक्षता; जीवनचक्र एवं पेंडेंसी निगरानी।
3. नोडल पदाधिकारी / जिला योजना पदाधिकारी (डीपीओ): प्रस्तावों की प्राथमिक जांच; बैठक कार्यसूची संकलन; अंतर-विभागीय समन्वय।
4. नामित वरिष्ठ पदाधिकारी (अपर समाहर्ता): उच्च मूल्य खनन विकास कार्यों का पर्यवेक्षण; भूमि व अंतर-विभागीय विवाद निवारण।
5. कार्यकारी विभाग (कार्यपालक अभियंता - ग्रामीण कार्य, पेयजल, भवन, सिंचाई आदि): डीपीआर तैयार करना; तकनीकी स्वीकृति जारी करना; निविदा प्रकाशन; प्रगति अद्यतन।
6. निरीक्षक / गुणवत्ता मॉनिटर (सहायक अभियंता / डीक्यूएम): स्थल निरीक्षण; जियो-टैग तस्वीरें अपलोड करना; दोष सुधार नोटिस जारी करना।
7. संवेदक (ठेकेदार): निविदा में भाग लेना; अनुबंध देखना; मील का पत्थर पूर्णता दावा; रनिंग बिल प्रस्तुत करना।
8. वित्त / लेखा पदाधिकारी: बिलों का ऑडिट; माप पुस्तिका (एमबी) मिलान; वैधानिक कटौती; राशि विमुक्ति प्रविष्टि।
9. दर्शक (नागरिक / ग्राम पंचायत प्रतिनिधि): केवल पढ़ने हेतु सार्वजनिक डैशबोर्ड; गांव के कार्यों की निगरानी; पारदर्शिता प्रकटीकरण।
यह /admin/settings पर भूमिका समीक्षा हेतु उपलब्ध है।`
  },
  {
    id: 'KB-GIS-01',
    title: 'GIS Geotagging & Interactive Map View',
    titleHi: 'जीआईएस जियोटैगिंग एवं इंटरएक्टिव मानचित्र दृश्य',
    category: 'gis',
    source: 'DFMT RFP Section III, Module 3 - GIS Based Project Monitoring',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 3 - जीआईएस आधारित परियोजना निगरानी',
    isImplemented: true,
    keywords: ['gis', 'map', 'geotagging', 'gps', 'coordinates', 'leaflet', 'openstreetmap', 'satellite', 'मानचित्र', 'जीआईएस', 'जियोटैग'],
    contentEn: `eSapmada integrates an interactive GIS mapping engine powered by Leaflet and OpenStreetMap:
- Capabilities:
  - Visualizes geo-tagged projects across Ramgarh with verified GPS latitude and longitude coordinates.
  - Dual Layer Support: Street Map view and High-Resolution Satellite imagery.
  - Interactive Filter Controls: Filter by Administrative Block (Mandu, Patratu, Ramgarh, Gola, Chitarpur, Dulmi) and Project Status (Ongoing, Completed, Delayed).
  - Geolocation Feature: "My Location" browser GPS tracking to show nearby DMFT projects within walking or driving radius.
  - Interactive Popups: Displays project title, department, sanctioned cost, physical completion %, and direct link to detailed record.
- Accessible at: /admin/map in the admin console and embedded on the public transparency home page.`,
    contentHi: `ई-सम्पदा लीफलेट (Leaflet) और ओपनस्ट्रीटमैप (OpenStreetMap) द्वारा संचालित एक इंटरएक्टिव जीआईएस मैपिंग इंजन को एकीकृत करता है:
- क्षमताएं:
  - सत्यापित जीपीएस अक्षांश और देशांतर निर्देशांक के साथ रामगढ़ भर में जियो-टैग की गई परियोजनाओं का दृश्य प्रदर्शन।
  - दोहरा लेयर समर्थन: सामान्य स्ट्रीट मैप दृश्य और उच्च-रिज़ॉल्यूशन सैटेलाइट इमेजरी।
  - इंटरएक्टिव फिल्टर: प्रशासनिक प्रखंड (मांडू, पतरातू, रामगढ़, गोला, चितरपुर, दुलमी) और स्थिति (चालू, पूर्ण, विलंबित) द्वारा फ़िल्टर।
  - जियोलोकेशन सुविधा: उपयोगकर्ता के आसपास डीएमएफटी परियोजनाओं को खोजने हेतु "My Location" जीपीएस ट्रैकिंग।
  - इंटरएक्टिव पॉपअप: परियोजना का नाम, विभाग, स्वीकृत लागत, भौतिक प्रगति प्रतिशत और पूर्ण विवरण देखने हेतु सीधा लिंक।
- उपलब्धता: एडमिन पैनल में /admin/map पर तथा सार्वजनिक पारदर्शिता होमपेज पर अंतर्निहित।`
  },
  {
    id: 'KB-REPORTS-01',
    title: '14 Comprehensive MIS Reports & Analytical Dashboard',
    titleHi: '14 व्यापक एमआईएस रिपोर्ट्स एवं विश्लेषणात्मक डैशबोर्ड',
    category: 'reports',
    source: 'DFMT RFP Section III, Module 4 - Reporting and MIS',
    sourceHi: 'डीएमएफटी आरएफपी खंड III, मॉड्यूल 4 - रिपोर्टिंग एवं एमआईएस',
    isImplemented: true,
    keywords: ['reports', 'mis', 'analytics', 'export', 'csv', 'print', 'pdf', 'summary', 'रिपोर्ट', 'एमआईएस', 'विश्लेषण'],
    contentEn: `eSapmada delivers 14 dedicated MIS reports compliant with RFP Section III, Module 4:
1. Executive Summary: High-level overview of sanctioned, ongoing, completed, and stalled projects.
2. Stage-wise Pipeline Report: Breakdown of works across each of the 10 lifecycle stages.
3. Block-wise Allocation & Progress: Geographic comparative report across the 6 blocks.
4. Departmental Performance Report: Execution speed and bottleneck analysis of line departments.
5. Sectoral Investment Breakdown: Fund allocation in High Priority (Drinking Water, Health, Education) vs Other Priority sectors.
6. Delayed & Overdue Projects: Projects past contractual completion deadlines with delay reasons.
7. Pendency Action Queue: Breakdown across the 11 pendency checkpoints.
8. Financial Utilization & Expenditure: Allocation vs Releases vs Actual Expenditure ledger.
9. Contractor Performance & Workload: Active contracts, completion track records, and delay flags.
10. Quality Inspection & Defect Register: Inspection visits, quality ratings, and unrectified defects.
11. Handover & Asset Delivery Register: Assets transferred to Gram Panchayats with DLP status.
12. Recommendation Source Analysis: Breakdown of proposals received from MPs, MLAs, and Gram Sabhas.
13. Geo-tagged Asset Inventory: Comprehensive spatial audit of all completed DMFT community assets.
14. Audit Trail & System Activity Log: Tamper-evident chronological log of all administrative actions.
Features: Instant CSV download, print-friendly views, and dynamic multi-criteria filtering at /admin/reports.`,
    contentHi: `ई-सम्पदा आरएफपी खंड III, मॉड्यूल 4 के अनुरूप 14 समर्पित एमआईएस रिपोर्ट प्रदान करता है:
1. कार्यकारी सारांश: स्वीकृत, चालू, पूर्ण एवं अवरुद्ध परियोजनाओं का उच्च-स्तरीय अवलोकन।
2. चरण-वार पाइपलाइन रिपोर्ट: 10 जीवनचक्र चरणों में कार्यों का विस्तृत विवरण।
3. प्रखंड-वार आवंटन एवं प्रगति: सभी 6 प्रखंडों की तुलनात्मक प्रगति रिपोर्ट।
4. विभागीय प्रदर्शन रिपोर्ट: कार्यकारी लाइन विभागों की गति और बाधा विश्लेषण।
5. क्षेत्रवार निवेश विवरण: उच्च प्राथमिकता (पेजल, स्वास्थ्य, शिक्षा) बनाम अन्य क्षेत्रों में निधि आवंटन।
6. विलंबित परियोजनाएं रिपोर्ट: अनुबंध समय-सीमा समाप्त होने वाले कार्य एवं विलंब के कारण।
7. लंबित वाद एक्शन कतार: 11 पेंडेंसी चेकपॉइंट्स की विस्तृत स्थिति।
8. वित्तीय उपयोग एवं व्यय: आवंटन बनाम विमुक्ति बनाम वास्तविक व्यय खाता।
9. संवेदक प्रदर्शन एवं कार्यभार: सक्रिय अनुबंध, कार्य पूर्णता रिकॉर्ड और विलंब चेतावनी।
10. गुणवत्ता निरीक्षण एवं दोष रजिस्टर: निरीक्षण दौरे, गुणवत्ता रेटिंग और अनिस्तारित दोष।
11. हस्तांतरण एवं परिसंपत्ति रजिस्टर: ग्राम पंचायतों को सौंपी गई संपत्तियां और डीएलपी अवधि।
12. अनुशंसा स्रोत विश्लेषण: सांसदों, विधायकों और ग्राम सभाओं से प्राप्त प्रस्तावों का वर्गीकरण।
13. जियो-टैग परिसंपत्ति इन्वेंट्री: सभी पूर्ण डीएमएफटी सामुदायिक संपत्तियों का स्थानिक ऑडिट।
14. ऑडिट ट्रेल एवं गतिविधि लॉग: सभी प्रशासनिक निर्णयों का अपरिवर्तनीय कालानुक्रमिक लॉग।
विशेषताएं: /admin/reports पर त्वरित सीएसवी डाउनलोड, प्रिंट दृश्य और बहु-मापदंड फ़िल्टरिंग।`
  },
  {
    id: 'KB-STATUS-MATRIX-01',
    title: 'Implemented Features vs Future RFP Integration Roadmap',
    titleHi: 'वर्तमान में लागू सुविधाएं बनाम भावी आरएफपी एकीकरण रोडमैप',
    category: 'system',
    source: 'eSapmada System Architecture & RFP Compliance Audit Matrix',
    sourceHi: 'ई-सम्पदा प्रणाली वास्तुकला एवं आरएफपी अनुपालन ऑडिट मैट्रिक्स',
    isImplemented: true,
    keywords: ['implemented', 'features', 'roadmap', 'future', 'limitations', 'availability', 'rfp', 'status', 'सुविधाएं', 'लागू', 'रोडमैप'],
    contentEn: `CRITICAL GUIDELINE ON FEATURE AVAILABILITY:
- CURRENTLY IMPLEMENTED IN LIVE ESAPMADA:
  1. Complete 10-Stage Project Lifecycle state machine and stage progression (/admin/projects, /admin/projects/new, /admin/projects/[id]).
  2. 11 Pendency & Delay Monitoring Checkpoints with filterable action queues (/admin/alerts).
  3. Interactive Project Map (GIS) with Leaflet + OpenStreetMap satellite/street layers, GPS coordinates, block filters, and popups (/admin/map and public home map).
  4. Full Work Progress & Analytics breakdown by sector, block, timeline, and milestones (/admin/analytics).
  5. Project Handover Management workflow with defect liability period, asset takeover, and Gram Panchayat signing (/admin/handover).
  6. 14 Comprehensive MIS Reports with multi-parameter filtering, print, and export capabilities (/admin/reports).
  7. User Roles & System Permissions configuration page with 9 RFP roles (/admin/settings).
  8. Predefined Help Assistant with offline procedural FAQs and bilingual search (/admin/help).
  9. Public Transparency Portal displaying sanctioned works, live stats, and GIS map (/).
  10. Cookie-based HMAC SHA-256 Admin Authentication with rate limiting & brute force protection (/admin/login).

- PLANNED FUTURE RFP MODULES (Explicitly NOT yet integrated into live portal - do not claim they are live!):
  1. Automated 2-way API Synchronization with State e-Procurement Portal (e-GP Jharkhand) (NIT and agreements are currently entered directly).
  2. Direct Automated Treasury / PFMS Bank Payout Gateway (Disbursements are currently recorded via verified account vouchers).
  3. Standalone Native Mobile App for Android/iOS offline geotagging (Mobile-responsive web interface is currently used).
  4. Real-time SMS Gateway for automated contractor / citizen SMS alerts (In-app notifications and email dispatch are supported).
  5. Aerial Drone Surveillance Video Processing (High-resolution geo-tagged photographs are supported).`,
    contentHi: `सुविधाओं की उपलब्धता पर स्पष्ट दिशानिर्देश:
- ई-सम्पदा में वर्तमान में पूर्णतः लागू सुविधाएं:
  1. पूर्ण 10-चरणीय परियोजना जीवनचक्र स्टेट मशीन एवं प्रगति प्रबंधन (/admin/projects, /admin/projects/new, /admin/projects/[id])।
  2. 11 विशिष्ट लंबित वाद चेकपॉइंट्स एवं विलंब निगरानी कतार (/admin/alerts)।
  3. लीफलेट + ओपनस्ट्रीटमैप सैटेलाइट व स्ट्रीट लेयर, जीपीएस निर्देशांक और ब्लॉक फिल्टर सहित इंटरएक्टिव जीआईएस मैप (/admin/map एवं होमपेज)।
  4. क्षेत्र, प्रखंड, समय-सीमा और मील के पत्थरों के आधार पर कार्य प्रगति और विश्लेषण (/admin/analytics)।
  5. दोष दायित्व अवधि (डीएलपी) और ग्राम पंचायत हस्तांतरण सहित परियोजना हस्तांतरण प्रबंधन (/admin/handover)।
  6. बहु-मापदंड फ़िल्टरिंग, प्रिंट और सीएसवी निर्यात सहित 14 व्यापक एमआईएस रिपोर्ट (/admin/reports)।
  7. 9 आधिकारिक आरएफपी भूमिकाओं के साथ उपयोगकर्ता भूमिकाएं और अनुमतियां (/admin/settings)।
  8. ऑफलाइन प्रक्रियात्मक पूछे जाने वाले प्रश्नों के साथ हेल्प असिस्टेंट (/admin/help)।
  9. स्वीकृत कार्यों, लाइव आंकड़ों और जीआईएस मानचित्र को प्रदर्शित करने वाला सार्वजनिक पारदर्शिता पोर्टल (/)।
  10. दर-सीमित (Rate limiting) और ब्रूट फोर्स सुरक्षा युक्त कुकी-आधारित एचएमएसी एसएचए-256 एडमिन प्रमाणीकरण (/admin/login)।

- भावी आरएफपी मॉड्यूल (वर्तमान पोर्टल में अभी सीधे एकीकृत नहीं हैं - इन्हें चालू न बताएं):
  1. झारखंड ई-प्रोक्योरमेंट पोर्टल (e-GP) के साथ स्वचालित 2-वे एपीआई सिंक (वर्तमान में एनआईटी व अनुबंध सीधे दर्ज किए जाते हैं)।
  2. पीएफएमएस / सीएफएमएस के साथ सीधा स्वचालित बैंक भुगतान गेटवे (वर्तमान में भुगतान सत्यापित वाउचर प्रविष्टि द्वारा दर्ज होते हैं)।
  3. स्टैंडअलोन नेटिव एंड्रॉइड/आईओएस मोबाइल ऐप (वर्तमान में मोबाइल-अनुकूल वेब पोर्टल का उपयोग होता है)।
  4. स्वचालित संवेदक / नागरिक अलर्ट हेतु रियल-टाइम एसएमएस गेटवे (वर्तमान में इन-ऐप नोटिफिकेशन उपलब्ध है)।
  5. एरियल ड्रोन वीडियो सर्विलांस मैपिंग (वर्तमान में उच्च-गुणवत्ता वाली जियो-टैग तस्वीरें समर्थित हैं)।`
  }
]

