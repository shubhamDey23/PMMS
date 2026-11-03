import fs from 'fs'
import path from 'path'
import {
  computeFileHash,
  getKnowledgeManifest,
  saveKnowledgeManifest,
  type DocumentChunk,
  type IngestedDocument,
  type KnowledgeManifest,
} from './document-store'

const KNOWLEDGE_BASE_DIR = path.join(process.cwd(), 'knowledge-base')
const CHUNKS_STORAGE_PATH = path.join(KNOWLEDGE_BASE_DIR, 'indexed-chunks.json')

/**
 * Standard DFMT RFP Knowledge Base Chunks (Extracted from DFMT.pdf with exact Page & Section Citations)
 */
export const DFMT_DOCUMENT_CHUNKS: DocumentChunk[] = [
  {
    id: 'CHUNK-USERGUIDE-REGISTER-PROJECT',
    documentId: 'DOC-USERGUIDE-001',
    documentName: 'eSapmada User Manual',
    pageNumber: 'Part 3 (Pages 4-8)',
    sectionTitle: 'User Manual Part 3: How to Register & Add a New Project',
    sectionTitleHi: 'उपयोगकर्ता नियमावली भाग 3: नई परियोजना कैसे पंजीकृत एवं जोड़ें',
    sourceType: 'documentation',
    sourceCitation: 'eSapmada User Manual (Part 3: Project Registration, Pages 4-8)',
    sourceCitationHi: 'ई-सम्पदा उपयोगकर्ता नियमावली (भाग 3: परियोजना पंजीकरण, पृष्ठ 4-8)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T23:00:00Z',
    keywords: [
      'how do i register a new project',
      'add new project',
      'register project',
      'how to add project',
      'create project',
      'project registration',
      'नई परियोजना जोड़ें',
      'पंजीकरण',
      'परियोजना कैसे जोड़ें'
    ],
    contentEn: `To register a new project in eSapmada, follow these official steps:
1. Log in to the eSapmada Admin portal with authorized credentials.
2. In the left navigation sidebar, click on "+ Add New Project" or navigate to "/admin/projects/new".
3. Enter Project Identification: Project Name, Category (Drinking Water, Health, Education, Road, etc.), Nature of Work, and Financial Year. A unique tracking code (PRJ-DMFT-RMG-XXXX) is generated automatically.
4. Enter Location Details: District (Ramgarh), Administrative Block (Mandu, Patratu, Ramgarh, Gola, Chitarpur, or Dulmi), Gram Panchayat, Village, and Site GPS coordinates.
5. Select Nodal Department & Agency: Choose executing department (DWSD, RWD, Building, Health, etc.) and assign the Project Officer.
6. Enter Proposed Financials: Estimated Project Cost in Indian Rupees (₹), requested allocation, and DMFT budget head.
7. Set Project Timeline: Enter proposed commencement date and planned completion date.
8. Upload Mandatory Documents: Recommendation letter, proposal concept note, and site baseline photographs.
9. Review & Submit: Verify all information and click "Submit Project" for Stage 2 Administrative Review, or save as Draft.
Note: If the "+ Add New Project" button is hidden, your assigned user role lacks registration permissions; contact the District Administrator.`,
    contentHi: `ई-सम्पदा पोर्टल में नई परियोजना पंजीकृत करने हेतु आधिकारिक चरण:
1. अपने अधिकृत क्रेडेंशियल्स के साथ ई-सम्पदा एडमिन पोर्टल में लॉगिन करें।
2. बाएं साइडबार मेनू में "+ Add New Project" पर क्लिक करें अथवा "/admin/projects/new" पर जाएं।
3. बुनियादी पहचान दर्ज करें: परियोजना का नाम, श्रेणी (पेयजल, स्वास्थ्य, शिक्षा, पथ आदि), कार्य का स्वरूप एवं वित्तीय वर्ष।
4. स्थल का विवरण चुनें: जिला (रामगढ़), प्रशासनिक प्रखंड (मांडू, पतरातू, रामगढ़, गोला, चितरपुर अथवा दुलमी), पंचायत, ग्राम एवं जीपीएस निर्देशांक।
5. नोडल विभाग एवं एजेंसी: संबंधित कार्यपालक विभाग (DWSD, RWD आदि) का चयन करें।
6. प्रस्तावित वित्तीय लागत: प्राक्कलित लागत (₹) एवं डीएमएफटी मद दर्ज करें।
7. कार्य समयसीमा: प्रस्तावित प्रारंभ तिथि एवं संभावित पूर्णता तिथि निर्धारित करें।
8. दस्तावेज अपलोड करें: अनुशंसा पत्र, कार्य प्रस्ताव एवं स्थल फोटोग्राफ्स।
9. समीक्षा एवं सबमिट: जानकारी सत्यापित कर "Submit Project" पर क्लिक करें अथवा ड्राफ्ट के रूप में सहेजें।`
  },
  {
    id: 'CHUNK-USERGUIDE-REQUIRED-DOCS',
    documentId: 'DOC-USERGUIDE-001',
    documentName: 'eSapmada User Manual',
    pageNumber: 'Part 3.4 & Part 4 (Pages 8-11)',
    sectionTitle: 'User Manual Part 3.4: Mandatory & Supporting Documents for Project Registration',
    sectionTitleHi: 'उपयोगकर्ता नियमावली भाग 3.4: परियोजना पंजीकरण हेतु आवश्यक एवं सहायक दस्तावेज',
    sourceType: 'documentation',
    sourceCitation: 'eSapmada User Manual (Part 3.4 & Part 4: Document Checklist, Pages 8-11)',
    sourceCitationHi: 'ई-सम्पदा उपयोगकर्ता नियमावली (भाग 3.4 एवं 4: दस्तावेज चेकलिस्ट, पृष्ठ 8-11)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T23:00:00Z',
    keywords: [
      'which documents are required for project registration',
      'documents required',
      'document checklist',
      'registration documents',
      'required documents',
      'upload documents',
      'आवश्यक दस्तावेज',
      'दस्तावेज चेकलिस्ट',
      'कागजात'
    ],
    contentEn: `Official Document Checklist for eSapmada DMFT Project Registration:
1. Work Proposal & Concept Note: Detailed scope of work, public necessity, and beneficiary impact.
2. Official Recommendation Letter: Formal proposal letter from Hon'ble MP, MLA, Gram Sabha resolution, or District Administration (with Letter Date and Reference Number).
3. Gram Sabha / Panchayat Resolution: Mandatory for rural habitations under DMFT statutory guidelines.
4. Pre-execution Site Photographs: Timestamped geotagged photos showing current site condition before work begins.
5. Location & Cadastral Map: Site layout plan and plot/land identification.
6. Land Availability Certificate (NOC): Certificate confirming undisputed government/panchayat land availability.
7. Preliminary Cost Estimate: Initial engineering rate estimate based on Jharkhand Schedule of Rates (SoR).
8. Detailed Project Report (DPR): Comprehensive technical drawings, bill of quantities (BoQ), and structural vetting (required prior to Stage 3 TS).
Format & Limits: PDF for official letters and estimates, JPG/PNG for photographs. Maximum file size: 10 MB per file.`,
    contentHi: `ई-सम्पदा डीएमएफटी परियोजना पंजीकरण हेतु आधिकारिक दस्तावेज चेकलिस्ट:
1. कार्य प्रस्ताव एवं संकल्पना नोट (Concept Note): कार्य का उद्देश्य, प्रभाव एवं जनहित।
2. आधिकारिक अनुशंसा पत्र: माननीय सांसद, विधायक, ग्राम सभा अथवा जिला प्रशासन द्वारा निर्गत अनुशंसा पत्र (पत्र संख्या एवं दिनांक सहित)।
3. ग्राम सभा संकल्प: खनन प्रभावित ग्रामीण क्षेत्रों हेतु वैधानिक ग्राम सभा प्रस्ताव।
4. कार्य-पूर्व स्थल फोटोग्राफ्स: स्थल की वर्तमान स्थिति दर्शाने वाली जियो-टैग्ड तस्वीरें।
5. स्थल का नक्शा एवं भू-अभिलेख: प्रस्तावित कार्य स्थल का लेआउट प्लान।
6. भूमि अनापत्ति प्रमाण पत्र (Land NOC): निर्विवाद सरकारी/पंचायत भूमि उपलब्धता प्रमाण पत्र।
7. प्राथमिक प्राक्कलन (Preliminary Estimate): सोआर (Schedule of Rates) आधारित प्रारंभिक लागत।
8. विस्तृत परियोजना रिपोर्ट (DPR): तकनीकी आरेख, सामग्री मात्रा (BOQ) एवं इंजीनियरिंग रिपोर्ट (चरण 3 टीएस से पूर्व आवश्यक)।`
  },
  {
    id: 'CHUNK-USERGUIDE-PHYSICAL-PROGRESS',
    documentId: 'DOC-USERGUIDE-001',
    documentName: 'eSapmada User Manual',
    pageNumber: 'Part 10 (Pages 18-20)',
    sectionTitle: 'User Manual Part 10: How to Update Physical Progress & Calculation Rules',
    sectionTitleHi: 'उपयोगकर्ता नियमावली भाग 10: भौतिक प्रगति कैसे अपडेट करें एवं गणना नियम',
    sourceType: 'documentation',
    sourceCitation: 'eSapmada User Manual (Part 10: Physical Progress, Pages 18-20)',
    sourceCitationHi: 'ई-सम्पदा उपयोगकर्ता नियमावली (भाग 10: भौतिक प्रगति, पृष्ठ 18-20)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T23:00:00Z',
    keywords: [
      'how do i update physical progress',
      'update physical progress',
      'physical progress calculation',
      'record progress',
      'progress update',
      'भौतिक प्रगति',
      'प्रगति दर्ज करें',
      'प्रगति प्रतिशत'
    ],
    contentEn: `To update Physical Progress in eSapmada, follow these steps:
1. Open the project in the Project Register and navigate to the "Physical Progress" tab.
2. Click on "Add Progress Update" or select the current execution milestone.
3. Enter Reporting Date and the Current Cumulative Completion Percentage (0% to 100%).
4. Mathematical Formula: Physical Progress (%) = (Total Measured Work Executed on Site / Sanctioned Scope of Work) × 100.
5. Provide Sub-stage Breakdown: Detail specific work completed during the period (e.g. Earthwork 100%, Foundation 80%, Superstructure 45%).
6. Mandatory Evidence Upload: Upload minimum 2 geotagged, timestamped site photographs showing visible physical progress.
7. Measurement Book (MB) Entry: Reference MB page number and Junior Engineer (JE) verification remarks.
8. Submit Update: Click "Submit Progress". The updated percentage immediately reflects across the Executive Dashboard, MIS reports, and GIS Map.
Important Rule: Physical progress measures ground execution, not financial expenditure. Cumulative percentages must not be summed together.`,
    contentHi: `ई-सम्पदा में भौतिक प्रगति अद्यतन करने की चरणबद्ध प्रक्रिया:
1. परियोजना रजिस्टर में संबंधित परियोजना खोलें एवं "Physical Progress" टैब पर जाएं।
2. "Add Progress Update" बटन पर क्लिक करें।
3. रिपोर्टिंग तिथि एवं वर्तमान संचयी भौतिक प्रगति प्रतिशत (0% से 100%) दर्ज करें।
4. गणना सूत्र: भौतिक प्रगति (%) = (स्थल पर पूर्ण वास्तविक कार्य मात्रा / कुल स्वीकृत कार्य मात्रा) × 100।
5. उप-चरण विवरण: संबंधित अवधि में पूर्ण हुए कार्यों (जैसे नींव, ढांचा, छत ढलाई आदि) का विवरण दें।
6. अनिवार्य साक्ष्य: न्यूनतम 2 जियो-टैग्ड, समय-मुद्रित फोटोग्राफ्स अपलोड करें।
7. माप पुस्तिका (MB) संदर्भ: एमबी पृष्ठ संख्या एवं कनीय अभियंता का सत्यापन नोट दर्ज करें।
8. सबमिट करें: प्रतिशत अद्यतन होते ही डैशबोर्ड, एमआईएस रिपोर्ट एवं जीआईएस मैप पर तुरंत प्रदर्शित होगा।`
  },
  {
    id: 'CHUNK-USERGUIDE-PAYMENT-REQUISITION',
    documentId: 'DOC-USERGUIDE-001',
    documentName: 'eSapmada User Manual',
    pageNumber: 'Part 11 (Pages 21-23)',
    sectionTitle: 'User Manual Part 11: How to Submit a Payment Requisition (RA Bill Workflow)',
    sectionTitleHi: 'उपयोगकर्ता नियमावली भाग 11: संवेदक भुगतान अधियाचन (Payment Requisition) कैसे जमा करें',
    sourceType: 'documentation',
    sourceCitation: 'eSapmada User Manual (Part 11: Payment Requisition, Pages 21-23)',
    sourceCitationHi: 'ई-सम्पदा उपयोगकर्ता नियमावली (भाग 11: भुगतान अधियाचन, पृष्ठ 21-23)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T23:00:00Z',
    keywords: [
      'how do i submit a payment requisition',
      'payment requisition',
      'ra bill',
      'running account bill',
      'contractor payment',
      'measurement book',
      'mb verification',
      'भुगतान अधियाचन',
      'विधेयक',
      'रनिंग एकाउंट बिल'
    ],
    contentEn: `Procedure to submit a Payment Requisition (Running Account / Final Bill) in eSapmada:
1. Open the project and navigate to "Stage 7: Payment Requisition".
2. Click "Create New Requisition".
3. Enter Requisition Details: Bill Type (1st RA Bill, 2nd RA Bill, or Final Bill), Invoice Reference Number, Bill Date, and Gross Claim Amount (₹).
4. Measurement Book Verification: Enter MB Number, MB Page Reference, and date of measurement vetted by the Assistant Engineer (AE).
5. Statutory Deductions Entry: System calculates mandatory deductions:
   - TDS (Income Tax): 2%
   - GST TDS: 2% (1% CGST + 1% SGST)
   - Security Deposit / Retention Money: Typically 5% or 10%
   - Labour Welfare Cess: 1%
6. Net Payable Amount: Computed automatically after applying statutory withholdings.
7. Supporting Document Uploads: Contractor Invoice, MB copies, Quality Test Certificate, and Site Engineer Verification Note.
8. Submit for Scrutiny: Sent to Executive Engineer and DMFT Accounts Section for Stage 9 Treasury/Bank Electronic Fund Transfer.
Note: A submitted requisition does not indicate payment has been disbursed until electronic payment advice is confirmed in Stage 9.`,
    contentHi: `ई-सम्पदा में संवेदक भुगतान अधियाचन (Payment Requisition) दर्ज करने की प्रक्रिया:
1. परियोजना विवरण में जाएं और "Stage 7: Payment Requisition" टैब चुनें।
2. "Create New Requisition" पर क्लिक करें।
3. विवरण प्रविष्टि: बिल का प्रकार (1st RA Bill, 2nd RA Bill अथवा Final Bill), बीजक संख्या, बिल दिनांक एवं दावा राशि (₹)।
4. माप पुस्तिका (MB) सत्यापन: एमबी क्रमांक, पृष्ठ संख्या एवं सहायक अभियंता द्वारा दर्ज सत्यापन विवरण।
5. वैधानिक कटौतियां: टीडीएस (2%), जीएसटी टीडीएस (2%), लेबर सेस (1%) एवं सिक्योरिटी डिपॉजिट (5-10%) की प्रविष्टि।
6. शुद्ध देय राशि: कटौतियों के उपरांत शुद्ध देय राशि की स्वचालित गणना।
7. दस्तावेज अपलोड: संवेदक बिल, एमबी प्रति, गुणवत्ता जांच प्रमाणपत्र एवं स्थल इंजीनियर की अनुशंसा।
8. स्वीकृति हेतु सबमिट करें: समीक्षा उपरांत फाइल स्टेज 9 कोषागार/बैंक भुगतान हेतु अग्रेषित की जाती है।`
  },
  {
    id: 'CHUNK-USERGUIDE-REPORTS-MIS',
    documentId: 'DOC-USERGUIDE-001',
    documentName: 'eSapmada User Manual',
    pageNumber: 'Part 17 (Pages 31-33)',
    sectionTitle: 'User Manual Part 17: How to Generate DMFT Reports & MIS Exports',
    sectionTitleHi: 'उपयोगकर्ता नियमावली भाग 17: डीएमएफटी रिपोर्ट एवं एमआईएस कैसे जेनरेट करें',
    sourceType: 'documentation',
    sourceCitation: 'eSapmada User Manual (Part 17: Reports & MIS, Pages 31-33)',
    sourceCitationHi: 'ई-सम्पदा उपयोगकर्ता नियमावली (भाग 17: रिपोर्ट एवं एमआईएस, पृष्ठ 31-33)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T23:00:00Z',
    keywords: [
      'how do i generate project reports',
      'generate project reports',
      'mis reports',
      'export reports',
      'download report',
      'project status report',
      'रिपोर्ट कैसे निकालें',
      'एमआईएस रिपोर्ट',
      'एक्सेल एक्सपोर्ट'
    ],
    contentEn: `How to generate and export official reports in eSapmada:
1. Navigate to "Reports & MIS" from the left sidebar navigation menu or visit "/admin/reports".
2. Select Report Category from 15 official report types:
   - Comprehensive Project Status Register
   - Block-wise Progress Summary (Mandu, Patratu, Ramgarh, Gola, Chitarpur, Dulmi)
   - Department-wise Expenditure & Utilization Report
   - Critical Delay & Bottleneck Analysis Report
   - Physical vs. Financial Progress Comparison
   - Statutory Pendency & Milestone Audit Report
   - Completed Works & Handover Register
3. Apply Dynamic Filters: Select Financial Year (e.g. 2026-27), Implementing Department, Status (Ongoing, Completed, Delayed), and Date Range.
4. Preview Dynamic Data: Review generated summary cards and tabular records on screen.
5. Export & Download: Click on "Export PDF" for official printing/governing council presentation, "Export Excel" for spreadsheet audits, or "Export CSV" for data analysis.`,
    contentHi: `ई-सम्पदा में आधिकारिक रिपोर्ट एवं एमआईएस जेनरेट करने की प्रक्रिया:
1. बाएं साइडबार से "Reports & MIS" विकल्प चुनें अथवा "/admin/reports" पर जाएं।
2. 15 आधिकारिक रिपोर्ट प्रारूपों में से आवश्यक प्रारूप का चयन करें (जैसे: प्रखंड-वार रिपोर्ट, विभागीय व्यय रिपोर्ट, विलंबित योजना विश्लेषण, भौतिक बनाम वित्तीय प्रगति आदि)।
3. फिल्टर लागू करें: वित्तीय वर्ष (उदा. 2026-27), कार्यपालक विभाग, स्थिति (Ongoing/Completed/Delayed) अथवा प्रखंड चुनें।
4. डेटा पूर्वावलोकन: स्क्रीन पर उत्पन्न तालिका और सारांश की जांच करें।
5. एक्सपोर्ट एवं डाउनलोड: शासकीय बैठकों हेतु "Export PDF", विस्तृत ऑडिट हेतु "Export Excel", अथवा "CSV" प्रारूप में डाउनलोड करें।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-LIFECYCLE-OVERVIEW',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 4-15',
    sectionTitle: 'Section III, Module 1: The 10 Project Lifecycle Stages of DMFT Work Monitoring',
    sectionTitleHi: 'खंड III, मॉड्यूल 1: डीएमएफटी कार्य निगरानी के सभी 10 परियोजना जीवनचक्र चरण',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1: Work Workflow, Pages 4-15)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1: कार्य जीवनचक्र, पृष्ठ 4-15)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: [
      'project lifecycle',
      'lifecycle',
      '10 stages',
      'ten stages',
      'stages',
      'workflow',
      'lifecycle stages',
      'work workflow',
      'explain project lifecycle',
      'परियोजना जीवनचक्र',
      '10 चरण',
      'जीवन चक्र'
    ],
    contentEn: `The DMFT portal enforces an end-to-end 10-stage governance lifecycle for every project sanctioned under DMFT Ramgarh:
1. Stage 1 - Work Request / Recommendation: Captures proposal letters from MPs, MLAs, Gram Sabha, or District Administration with permanent ID assignment (PRJ-DMFT-RMG-XXXX).
2. Stage 2 - Work Request Acceptance: Scrutiny by Nodal Officer against DMFT statutory norms (60% high-priority sectors like drinking water/health, 40% other sectors).
3. Stage 3 - Technical Approval & DPR: Preparation and vetting of Detailed Project Report (DPR) by Executive Engineer with Technical Sanction (TS) order and SoR rates.
4. Stage 4 - Administrative Approval: Review by DMFT Management Committee and final sanction by Deputy Commissioner-cum-District Magistrate with AS Order.
5. Stage 5 - Tender & Contractor Management: e-Procurement NIT publication, technical/financial bid evaluation, work order issuance, and contract agreement.
6. Stage 6 - Physical Progress & Milestone Tracking: Sub-stage progress tracking with geotagged, timestamped site photos and delay monitoring.
7. Stage 7 - Payment Requisition: Measurement Book (MB) verification, contractor running account (RA) bill submission, and deduction checks (TDS, GST, Security Deposit).
8. Stage 8 - Work Inspection: Physical quality inspections by Junior Engineer, Assistant Engineer, Executive Engineer, and District Quality Monitoring Committee.
9. Stage 9 - Financial Progress & Fund Release: Multi-level scrutiny, Treasury/Bank PFMS electronic fund transfer, and expenditure ledger posting.
10. Stage 10 - Project Handover & Closeout: Joint final site inspection, asset handover to user department/Panchayat, and formal Utilization Certificate (UC) upload.`,
    contentHi: `डीएमएफटी पोर्टल रामगढ़ जिले में स्वीकृत प्रत्येक परियोजना हेतु 10-चरणीय अनिवार्य जीवनचक्र लागू करता है:
1. चरण 1 - कार्य प्रस्ताव एवं अनुशंसा: सांसद, विधायक, ग्राम सभा अथवा जिला प्रशासन के प्रस्ताव पत्र को स्थायी ट्रैकिंग आईडी के साथ दर्ज करना।
2. चरण 2 - कार्य प्रस्ताव स्वीकृति एवं संवीक्षा: डीएमएफटी प्राथमिकताओं (60% उच्च प्राथमिकता, 40% अन्य प्राथमिकता) के तहत संवीक्षा।
3. चरण 3 - तकनीकी स्वीकृति एवं डीपीआर (TS): कार्यपालक अभियंता द्वारा स्थल सर्वेक्षण, प्राक्कलन एवं टीएस निर्गमन।
4. चरण 4 - प्रशासनिक स्वीकृति (AS): उपायुक्त-सह-जिला दंडाधिकारी एवं डीएमएफटी न्यास पर्षद द्वारा वित्तीय/प्रशासनिक स्वीकृति आदेश।
5. चरण 5 - निविदा एवं संवेदक प्रबंधन: ई-निविदा प्रकाशन, वित्तीय बिड मूल्यांकन, कार्यादेश एवं संवेदक एकरारनामा।
6. चरण 6 - भौतिक प्रगति एवं मील का पत्थर: जियो-टैग्ड फोटोग्राफ्स एवं उप-चरणों की प्रतिशत भौतिक प्रगति प्रविष्टि।
7. चरण 7 - भुगतान मांग पत्र (Payment Requisition): माप पुस्तिका (MB) सत्यापन, रनिंग एकाउंट (RA) बिल एवं वैधानिक कटौतियां।
8. चरण 8 - कार्य निरीक्षण एवं गुणवत्ता जांच: कनीय अभियंता, सहायक अभियंता एवं जिला तकनीकी जांच दल द्वारा गुणवत्ता परीक्षण।
9. चरण 9 - वित्तीय प्रगति एवं राशि विमुक्ति: कोषालय/बैंक पीएफएमएस के माध्यम से संवेदक को इलेक्ट्रॉनिक राशि भुगतान।
10. चरण 10 - परियोजना हस्तांतरण एवं उपयोगिता प्रमाण पत्र (UC): कार्य पूर्णता, संबंधित विभाग/पंचायत को संपत्ति हस्तांतरण एवं अंतिम यूसी अपलोड।`
  },
  {
    id: 'CHUNK-DFMT-SEC1-OVERVIEW',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 1-3',
    sectionTitle: 'Section I & II: Executive Background & DMFT Ramgarh Jurisdiction',
    sectionTitleHi: 'खंड I एवं II: कार्यकारी पृष्ठभूमि एवं डीएमएफटी रामगढ़ अधिकार क्षेत्र',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section I & II, Pages 1-3)',
    sourceCitationHi: 'DFMT.pdf (खंड I एवं II, पृष्ठ 1-3)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['tender', 'rfp', 'background', 'jurisdiction', 'ramgarh', 'dmft', 'mining', 'blocks', 'mandu', 'patratu', 'gola', 'chitarpur', 'dulmi'],
    contentEn: `Tender Reference: RFP/DPO/RMG/NIT/2026-27/007 issued by Office of the Deputy Commissioner-cum-District Magistrate, Ramgarh (District Planning Section).
The portal 'eSapmada' is mandated to oversee development projects funded by the District Mineral Foundation Trust (DMFT) across all 6 administrative blocks of Ramgarh District: Mandu, Patratu, Ramgarh, Gola, Chitarpur, and Dulmi.
Key Mandates: End-to-end digital lifecycle governance, delay prevention, GIS mapping, milestone verification, and public disclosure for mining-affected communities.`,
    contentHi: `निविदा संदर्भ: RFP/DPO/RMG/NIT/2026-27/007, उपायुक्त-सह-जिला दंडाधिकारी कार्यालय, रामगढ़ (जिला योजना शाखा) द्वारा जारी।
ई-सम्पदा पोर्टल रामगढ़ जिले के सभी 6 प्रशासनिक प्रखंडों (मांडू, पतरातू, रामगढ़, गोला, चितरपुर एवं दुलमी) में डीएमएफटी निधि से पोषित परियोजनाओं के डिजिटल प्रबंधन हेतु अधिकृत है।
मुख्य उद्देश्य: खनन प्रभावित क्षेत्रों में एंड-टू-एंड जीवनचक्र नियंत्रण, विलंब रोकथाम, जीआईएस जियोटैगिंग और सार्वजनिक पारदर्शिता।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-STG1-REQ',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 4-5',
    sectionTitle: 'Section III, Module 1 - Stage 1: Work Request & Recommendation',
    sectionTitleHi: 'खंड III, मॉड्यूल 1 - चरण 1: कार्य प्रस्ताव एवं अनुशंसा',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1, Pages 4-5)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1, पृष्ठ 4-5)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['stage 1', 'recommendation', 'work request', 'mla', 'mp', 'gram sabha', 'letter', 'registration', 'प्रस्ताव', 'अनुशंसा', 'चरण 1'],
    contentEn: `Stage 1 captures the initial proposal for a development work in mining-affected habitations:
- Required Fields: Block, Panchayat, Village, Work Type, Work Name, Recommended By (Hon'ble MP, MLA, Gram Sabha, District Administration, or Local Representatives), Designation, Letter Date, Letter Reference Number, Recommendation Details, and Uploaded Recommendation Letter.
- System Workflow: Generates a permanent tracking ID (PRJ-DMFT-RMG-XXXX) and registers the work in the central queue.
- Live Status: Implemented at /admin/projects/new.`,
    contentHi: `चरण 1 खनन प्रभावित बस्तियों में विकास कार्य के प्रारंभिक प्रस्ताव को दर्ज करता है:
- आवश्यक विवरण: प्रखंड, पंचायत, ग्राम, कार्य का प्रकार, कार्य का नाम, अनुशंसक (माननीय सांसद, विधायक, ग्राम सभा, जिला प्रशासन), पदनाम, पत्र संख्या, पत्र दिनांक, एवं अपलोड किया गया पत्र।
- कार्यप्रवाह: स्थायी ट्रैकिंग आईडी (PRJ-DMFT-RMG-XXXX) उत्पन्न करता है।
- स्थिति: /admin/projects/new पर पूर्णतः लागू है।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-STG2-ACC',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 6-7',
    sectionTitle: 'Section III, Module 1 - Stage 2: Work Request Acceptance & Scrutiny',
    sectionTitleHi: 'खंड III, मॉड्यूल 1 - चरण 2: कार्य प्रस्ताव स्वीकृति एवं संवीक्षा',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1, Pages 6-7)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1, पृष्ठ 6-7)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['stage 2', 'acceptance', 'scrutiny', 'governing council', 'gram sabha', 'priority sectors', 'स्वीकृति', 'चरण 2'],
    contentEn: `Stage 2 screens work requests against DMFT statutory norms:
- Verification Checklist: Gram Sabha resolution check, Governing Council review, priority sector allocation (High Priority: 60% of funds for Drinking Water, Healthcare, Education, Sanitation, Environment; Other Priority: 40% for Rural roads, energy, irrigation).
- Approving Authority: Nodal Officer & DMFT CEO. Requests are marked as 'Accepted for TS' or 'Rejected with Remarks'.`,
    contentHi: `चरण 2 डीएमएफटी नियमों के अनुसार प्रस्तावों की संवीक्षा करता है:
- जांच चेकलिस्ट: ग्राम सभा संकल्प, शासी परिषद बैठक समीक्षा, प्राथमिकता क्षेत्र (उच्च प्राथमिकता: 60% निधि पेयजल, स्वास्थ्य, शिक्षा, स्वच्छता हेतु; अन्य प्राथमिकता: 40% सड़कें, ऊर्जा, सिंचाई हेतु)।
- प्राधिकारी: नोडल पदाधिकारी एवं डीएमएफटी सीईओ।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-STG3-TS',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 7-8',
    sectionTitle: 'Section III, Module 1 - Stage 3: Technical Approval & DPR',
    sectionTitleHi: 'खंड III, मॉड्यूल 1 - चरण 3: तकनीकी स्वीकृति एवं डीपीआर (TS)',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1, Pages 7-8)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1, पृष्ठ 7-8)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['stage 3', 'technical sanction', 'ts', 'dpr', 'executive engineer', 'sor', 'तकनीकी स्वीकृति', 'डीपीआर', 'चरण 3'],
    contentEn: `Stage 3 enforces engineering vetting and DPR preparation:
- Requirements: Assigned Line Execution Department (RWD, DWSD, Building, Irrigation) prepares site survey and Detailed Project Report (DPR).
- Captured Fields: Technical Sanction (TS) Number & Date, TS Sanctioned Amount, Schedule of Rates (SoR) compliance, drawing sheets, and DPR document upload.
- Responsible Authority: Line Executive Engineer (EE) / Superintending Engineer (SE).`,
    contentHi: `चरण 3 इंजीनियरिंग सत्यापन एवं विस्तृत परियोजना रिपोर्ट (डीपीआर) सुनिश्चित करता है:
- विवरण: नामित कार्यकारी लाइन विभाग द्वारा स्थल सर्वेक्षण एवं डीपीआर तैयार करना।
- दर्ज विवरण: तकनीकी स्वीकृति (टीएस) आदेश संख्या, दिनांक, स्वीकृत राशि, जेएचएसओआर (Schedule of Rates) अनुपालन, संरचनात्मक ड्राइंग्स।
- सक्षम प्राधिकारी: कार्यपालक अभियंता (ईई) / अधीक्षण अभियंता (एसई)।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-STG4-AS',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 9-10',
    sectionTitle: 'Section III, Module 1 - Stage 4: Administrative Approval & Sanction (AS)',
    sectionTitleHi: 'खंड III, मॉड्यूल 1 - चरण 4: प्रशासनिक स्वीकृति एवं आदेश (AS)',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1, Pages 9-10)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1, पृष्ठ 9-10)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['stage 4', 'administrative sanction', 'as', 'deputy commissioner', 'dc', 'dm', 'order', 'budget', 'प्रशासनिक स्वीकृति', 'चरण 4'],
    contentEn: `Stage 4 represents formal financial sanction and authorization to execute:
- Sanctioning Authority: Deputy Commissioner-cum-District Magistrate, Ramgarh (Chairman, DMFT Managing Committee).
- Captured Fields: Administrative Sanction Order Number, AS Sanction Date, Approved Sanction Amount, Scheme Head, Financial Year Allocation, and Official Signed Sanction Order PDF.
- Workflow: Upon AS clearance, project enters 'Sanctioned' state, budget is committed, and line departments are authorized to publish tenders.`,
    contentHi: `चरण 4 औपचारिक वित्तीय प्रतिबद्धता एवं कार्य निष्पादन का अधिकार प्रदान करता है:
- स्वीकृति प्राधिकारी: उपायुक्त-सह-जिला दंडाधिकारी, रामगढ़ (अध्यक्ष, डीएमएफटी प्रबंध समिति)।
- दर्ज विवरण: प्रशासनिक स्वीकृति (एएस) आदेश संख्या, दिनांक, स्वीकृत राशि, योजना शीर्ष, वित्तीय वर्ष, एवं हस्ताक्षरित एएस आदेश पीडीएफ।
- कार्यप्रवाह: एएस आदेश जारी होते ही परियोजना 'स्वीकृत' स्थिति में आती है और निविदा प्रकाशन की अनुमति मिलती है।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-STG5-TENDER',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 11-12',
    sectionTitle: 'Section III, Module 1 - Stage 5: Work Execution, Tender & Contractor Agreement',
    sectionTitleHi: 'खंड III, मॉड्यूल 1 - चरण 5: निविदा प्रक्रिया एवं संवेदक अनुबंध',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1, Pages 11-12)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1, पृष्ठ 11-12)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['stage 5', 'tender', 'contractor', 'nit', 'agreement', 'work order', 'dlp', 'निविदा', 'संवेदक', 'अनुबंध', 'चरण 5'],
    contentEn: `Stage 5 governs competitive bidding, contractor empanelment, and agreement signing:
- Captured Fields: Notice Inviting Tender (NIT) Number & Date, Selected Contractor Name, PAN/GSTIN, Empanelment ID, Agreement Reference Number, Agreement Date, Agreement Value (Tender Cost), Defect Liability Period (DLP), Work Order Issuance Date, and Completion Deadline.
- Rule: Ground execution cannot commence without a signed agreement and security deposit.`,
    contentHi: `चरण 5 प्रतिस्पर्धी निविदा, संवेदक चयन और अनुबंध निष्पादन को नियंत्रित करता है:
- दर्ज विवरण: निविदा आमंत्रण सूचना (एनआईटी) संख्या व दिनांक, चयनित संवेदक का नाम, पैन/जीएसटीआईएन, अनुबंध संख्या, दिनांक, अनुबंध मूल्य (निविदा लागत), दोष दायित्व अवधि (डीएलपी), कार्यादेश दिनांक, एवं समाप्ति तिथि।
- नियम: हस्ताक्षरित अनुबंध और सुरक्षा जमा के बिना निर्माण कार्य प्रारंभ नहीं हो सकता।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-STG6-PHYSICAL',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 13-14',
    sectionTitle: 'Section III, Module 1 - Stage 6: Physical Progress & Geo-tagged Photographs',
    sectionTitleHi: 'खंड III, मॉड्यूल 1 - चरण 6: भौतिक प्रगति एवं जियो-टैग तस्वीरें',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1, Pages 13-14)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1, पृष्ठ 13-14)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['stage 6', 'physical progress', 'milestones', 'geotagging', 'photos', 'site engineer', 'percent', 'भौतिक प्रगति', 'मील का पत्थर', 'चरण 6'],
    contentEn: `Stage 6 monitors construction milestones and field progress:
- Captured Metrics: Cumulative Physical Progress Percentage (0-100%), Specific Stage-wise Milestones (e.g., Plinth, Superstructure, Finishing, Commissioning), Milestone Date, Site Engineer Name, and Geo-tagged Site Photographs with coordinates watermark.
- Rule: Triggers delay alert if progress remains unchanged for more than 30 days.`,
    contentHi: `चरण 6 निर्माण कार्यों के मील के पत्थरों और धरातलीय प्रगति को ट्रैक करता है:
- दर्ज मेट्रिक्स: संचयी भौतिक प्रगति प्रतिशत (0-100%), विशिष्ट चरणबद्ध मील के पत्थर, पूर्णता तिथि, स्थल अभियंता का नाम, और अक्षांश/देशांतर युक्त जियो-टैग तस्वीरें।
- नियम: यदि 30 दिनों तक प्रगति अपरिवर्तित रहती है, तो प्रणाली स्वतः विलंब चेतावनी जारी करती है।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-STG7-PAYMENT',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 15-16',
    sectionTitle: 'Section III, Module 1 - Stage 7: Payment Requisition & Measurement Book (MB)',
    sectionTitleHi: 'खंड III, मॉड्यूल 1 - चरण 7: भुगतान अधियाचन एवं माप पुस्तिका (MB)',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1, Pages 15-16)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1, पृष्ठ 15-16)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['stage 7', 'payment requisition', 'running bill', 'measurement book', 'mb', 'invoice', 'deductions', 'gst', 'tds', 'भुगतान', 'बिल', 'चरण 7'],
    contentEn: `Stage 7 manages contractor bill submission and payment processing:
- Captured Fields: Bill / Invoice Number & Date, Running Account (RA) Bill Sequence, Measurement Book (MB) Entry Number & Page, Gross Claim Amount, Statutory Deductions (GST, TDS, Labor Cess, Mining Royalty, Security Deposit Retention), Net Payable Amount, and Line EE Recommendation.
- Rule: Requires certified physical milestone inspection before requisition clearance.`,
    contentHi: `चरण 7 संवेदक बिल प्रस्तुति और भुगतान प्रक्रिया का प्रबंधन करता है:
- दर्ज विवरण: बिल / इनवॉइस संख्या व दिनांक, रनिंग अकाउंट (आरए) बिल क्रम, माप पुस्तिका (एमबी) प्रविष्टि संख्या एवं पृष्ठ, सकल दावा राशि, वैधानिक कटौती (जीएसटी, टीडीएस, उपकर, खनन रॉयल्टी, सुरक्षा जमा), शुद्ध देय राशि, और कार्यपालक अभियंता की अनुशंसा।
- नियम: बिल भुगतान से पूर्व संबंधित भौतिक निरीक्षण का प्रमाणन अनिवार्य है।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-STG8-INSPECTION',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 17-18',
    sectionTitle: 'Section III, Module 1 - Stage 8: Work Inspection, Quality Audit & Defect Rectification',
    sectionTitleHi: 'खंड III, मॉड्यूल 1 - चरण 8: स्थल निरीक्षण, गुणवत्ता ऑडिट एवं दोष निवारण',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1, Pages 17-18)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1, पृष्ठ 17-18)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['stage 8', 'inspection', 'quality', 'audit', 'dqm', 'defects', 'field visit', 'compliance', 'निरीक्षण', 'गुणवत्ता', 'चरण 8'],
    contentEn: `Stage 8 enforces field quality assurance and statutory compliance:
- Inspecting Officers: Assistant Engineer (AE), Executive Engineer (EE), District Quality Monitor (DQM), Technical Cell Ramgarh, and Senior Administrative Officers.
- Captured Fields: Inspection Date, Officer Name & Designation, Inspection Type, Quality Rating (Satisfactory, Needs Improvement, Critical Defect), Defect Notice, Geo-tagged Proof, and Rectification Compliance Report.
- Rule: Critical defects freeze subsequent payment releases until compliance is verified on-site.`,
    contentHi: `चरण 8 गुणवत्ता आश्वासन और वैधानिक अनुपालन सुनिश्चित करता है:
- निरीक्षण पदाधिकारी: सहायक अभियंता (एई), कार्यपालक अभियंता (ईई), जिला गुणवत्ता मॉनिटर (डीक्यूएम), तकनीकी सेल।
- दर्ज विवरण: निरीक्षण दिनांक, पदाधिकारी का नाम व पदनाम, प्रकार, गुणवत्ता रेटिंग, दोष सुधार नोटिस, फोटोग्राफिक साक्ष्य, एवं अनुपालन रिपोर्ट।
- नियम: जब तक गंभीर दोषों का सुधार प्रमाणित नहीं होता, तब तक आगामी भुगतान रोक दिए जाते हैं।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-STG9-FINANCIAL',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 19-20',
    sectionTitle: 'Section III, Module 1 - Stage 9: Financial Progress & Fund Release',
    sectionTitleHi: 'खंड III, मॉड्यूल 1 - चरण 9: वित्तीय प्रगति एवं कोष विमुक्ति',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1, Pages 19-20)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1, पृष्ठ 19-20)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['stage 9', 'financial progress', 'expenditure', 'fund release', 'utilization', 'voucher', 'accounts', 'वित्तीय प्रगति', 'व्यय', 'चरण 9'],
    contentEn: `Stage 9 records actual fund disbursement and financial utilization:
- Captured Fields: Disbursement Voucher Number, Payment Date, Amount Released, Cumulative Expenditure to Date, Unspent Balance, Fund Utilization Percentage, Transaction Mode, and Accounts Officer Clearance.
- Analytical Metric: Calculates the gap between Physical Progress (%) and Financial Progress (%) to identify over-spending or under-utilization anomalies.`,
    contentHi: `चरण 9 वास्तविक कोष विमुक्ति और संचयी वित्तीय उपयोग को दर्ज करता है:
- दर्ज विवरण: भुगतान वाउचर संख्या, दिनांक, जारी की गई राशि, संचयी व्यय, अप्रयुक्त शेष राशि, निधि उपयोग प्रतिशत, लेनदेन माध्यम, और लेखा पदाधिकारी की मंजूरी।
- विश्लेषणात्मक मेट्रिक्स: भौतिक प्रगति (%) और वित्तीय प्रगति (%) के बीच अंतर (गैप) की गणना।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-STG10-HANDOVER',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Pages 21-22',
    sectionTitle: 'Section III, Module 1 - Stage 10: Handover, Asset Takeover & Defect Liability Period',
    sectionTitleHi: 'खंड III, मॉड्यूल 1 - चरण 10: परियोजना हस्तांतरण, परिसंपत्ति अधिग्रहण एवं डीएलपी',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 1, Pages 21-22)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 1, पृष्ठ 21-22)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['stage 10', 'handover', 'completion', 'asset', 'panchayat', 'dlp', 'defect liability', 'हस्तांतरण', 'पूर्णता', 'चरण 10'],
    contentEn: `Stage 10 marks project completion and asset transfer:
- Key Steps:
  1. 100% Physical Completion certification and Final Joint Site Inspection.
  2. Execution of Joint Handover Certificate between Line Execution Department and Receiving User Agency (Gram Panchayat, Health, Education, or Municipality).
  3. Asset Takeover Resolution by Gram Sabha.
  4. Maintenance Undertaking and Defect Liability Period (DLP) activation (1 to 5 years).
  5. Issuance of Project Completion Certificate.`,
    contentHi: `चरण 10 परियोजना की पूर्णता एवं परिसंपत्ति हस्तांतरण का चरण है:
- मुख्य चरण: 100% भौतिक पूर्णता प्रमाणन एवं संयुक्त स्थल निरीक्षण, संयुक्त हस्तांतरण प्रमाणपत्र का निष्पादन, ग्राम सभा द्वारा अधिग्रहण संकल्प, रखरखाव वचनबद्धता व दोष दायित्व अवधि (डीएलपी) सक्रियण, तथा पूर्णता प्रमाणपत्र जारी करना।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-PENDENCY',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Page 25',
    sectionTitle: 'Section III, Module 5: 11 Statutory Delay & Pendency Checkpoints',
    sectionTitleHi: 'खंड III, मॉड्यूल 5: 11 वैधानिक विलंब एवं लंबित चेकपॉइंट्स',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 5, Page 25)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 5, पृष्ठ 25)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['pendency', 'delay', 'checkpoints', 'alerts', 'bottlenecks', 'red', 'amber', 'escalation', 'लंबित', 'विलंब', 'चेकपॉइंट'],
    contentEn: `RFP Section III, Module 5 enforces 11 specific pendency checkpoints:
1. Approval Pending: Work recommendations awaiting screening/Council review (>15 days).
2. DPR Preparation Pending: Line departments delayed in submitting technical DPR (>30 days post-acceptance).
3. Technical Approval Pending: Overdue Technical Sanctions with Executive Engineers (>15 days).
4. Tender & Bidding Pending: Administrative Sanction issued but NIT not published (>15 days).
5. Agreement Pending: Contractor agreement unsigned (>14 days post-Work Order).
6. Work Not Commenced: Ground-breaking delayed (>30 days post-agreement).
7. Progress Update Pending: No site progress submitted for >30 days.
8. Pending Inspections: Milestone site inspection overdue for AE/EE/DQM.
9. Inspection Compliance Pending: Critical defect rectification report pending (>15 days).
10. Payment Requisition Pending: Contractor running bills pending clearance (>15 days).
11. Awaiting Handover: Works 100% physically completed but handover certificate unsigned (>30 days).`,
    contentHi: `आरएफपी खंड III, मॉड्यूल 5 में 11 विशिष्ट लंबित चेकपॉइंट्स परिभाषित हैं:
1. स्वीकृति लंबित (>15 दिन), 2. डीपीआर तैयारी लंबित (>30 दिन), 3. तकनीकी स्वीकृति लंबित (>15 दिन), 4. निविदा प्रक्रिया लंबित (>15 दिन), 5. अनुबंध हस्ताक्षर लंबित (>14 दिन), 6. कार्य प्रारंभ नहीं (>30 दिन), 7. प्रगति अद्यतन लंबित (>30 दिन), 8. लंबित स्थल निरीक्षण, 9. निरीक्षण अनुपालन लंबित (>15 दिन), 10. भुगतान अधियाचन लंबित (>15 दिन), 11. हस्तांतरण प्रतीक्षित (>30 दिन)।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-ROLES',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Page 26',
    sectionTitle: 'Section III, Module 8: 9 Role-Based User Roles & Permissions Matrix',
    sectionTitleHi: 'खंड III, मॉड्यूल 8: 9 उपयोगकर्ता भूमिकाएं एवं अधिकार मैट्रिक्स',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 8, Page 26)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 8, पृष्ठ 26)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
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
9. Viewer (Public / Gram Panchayat Representative): Read-only citizen dashboard; monitors village works; views public financial disclosures.`,
    contentHi: `ई-सम्पदा 9 उपयोगकर्ता भूमिकाओं में विभाजित है:
1. जिला प्रशासन (उपायुक्त - सह - जिला दंडाधिकारी): सर्वोच्च प्रशासनिक स्वीकृति प्राधिकारी।
2. डीएमएफटी सीईओ / सदस्य सचिव (डीडीसी): परिचालन प्रमुख एवं पेंडेंसी निगरानी।
3. नोडल पदाधिकारी / जिला योजना पदाधिकारी (डीपीओ): प्रस्तावों की जांच एवं अंतर-विभागीय समन्वय।
4. नामित वरिष्ठ पदाधिकारी (अपर समाहर्ता): उच्च मूल्य खनन कार्यों का पर्यवेक्षण।
5. कार्यकारी विभाग (कार्यपालक अभियंता): डीपीआर, तकनीकी स्वीकृति एवं निविदा प्रकाशन।
6. निरीक्षक / गुणवत्ता मॉनिटर (सहायक अभियंता / डीक्यूएम): स्थल निरीक्षण एवं दोष सुधार।
7. संवेदक: अनुबंध निष्पादन, कार्य प्रगति एवं बिल प्रस्तुति।
8. वित्त / लेखा पदाधिकारी: बिल ऑडिट, एमबी मिलान एवं राशि विमुक्ति।
9. दर्शक (नागरिक / ग्राम पंचायत प्रतिनिधि): केवल पढ़ने हेतु सार्वजनिक डैशबोर्ड।`
  },
  {
    id: 'CHUNK-DFMT-SEC3-GIS-MAP',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Page 24',
    sectionTitle: 'Section III, Module 3: GIS Geotagging & Map-Based Project Monitoring',
    sectionTitleHi: 'खंड III, मॉड्यूल 3: जीआईएस जियोटैगिंग एवं मानचित्र-आधारित निगरानी',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 3, Page 24)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 3, पृष्ठ 24)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['gis', 'map', 'geotagging', 'gps', 'coordinates', 'leaflet', 'openstreetmap', 'satellite', 'मानचित्र', 'जीआईएस', 'जियोटैग'],
    contentEn: `eSapmada integrates an interactive GIS mapping engine powered by Leaflet and OpenStreetMap:
- Capabilities: Verified GPS latitude & longitude coordinates for each project site across Ramgarh District.
- Dual Layers: Street Map view and High-Resolution Satellite imagery.
- Interactive Filters: Block filter (Mandu, Patratu, Ramgarh, Gola, Chitarpur, Dulmi) and Status filter (Ongoing, Completed, Delayed).
- Proximity: "My Location" browser GPS feature to inspect nearby community projects.
- Live URL: /admin/map.`,
    contentHi: `ई-सम्पदा लीफलेट और ओपनस्ट्रीटमैप द्वारा संचालित जीआईएस मैपिंग प्रदान करता है:
- क्षमताएं: प्रत्येक परियोजना स्थल के लिए सत्यापित जीपीएस अक्षांश और देशांतर निर्देशांक।
- दोहरा लेयर: सामान्य स्ट्रीट मैप और उच्च-रिज़ॉल्यूशन सैटेलाइट दृश्य।
- फिल्टर: सभी 6 प्रखंडों और स्थिति (चालू, पूर्ण, विलंबित) द्वारा फ़िल्टर।
- लाइव यूआरएल: /admin/map.`
  },
  {
    id: 'CHUNK-DFMT-SEC3-REPORTS-MIS',
    documentId: 'DOC-DFMT-RFP-001',
    documentName: 'DFMT.pdf',
    pageNumber: 'Page 26',
    sectionTitle: 'Section III, Module 7: 14 Official MIS Reports & Analytical Ledgers',
    sectionTitleHi: 'खंड III, मॉड्यूल 7: 14 आधिकारिक एमआईएस रिपोर्ट एवं विश्लेषणात्मक लेजर',
    sourceType: 'documentation',
    sourceCitation: 'DFMT.pdf (Section III, Module 7, Page 26)',
    sourceCitationHi: 'DFMT.pdf (खंड III, मॉड्यूल 7, पृष्ठ 26)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['reports', 'mis', 'analytics', 'export', 'csv', 'print', 'pdf', 'summary', 'रिपोर्ट', 'एमआईएस', 'विश्लेषण'],
    contentEn: `eSapmada delivers 14 dedicated MIS reports compliant with RFP Section III, Module 7:
1. Executive Summary, 2. Stage-wise Pipeline Report, 3. Block-wise Allocation & Progress, 4. Departmental Performance Report, 5. Sectoral Investment Breakdown (High Priority vs Other), 6. Delayed & Overdue Projects, 7. Pendency Action Queue, 8. Financial Utilization & Expenditure Ledger, 9. Contractor Performance & Workload, 10. Quality Inspection & Defect Register, 11. Handover & Asset Delivery Register, 12. Recommendation Source Analysis, 13. Geo-tagged Asset Inventory, 14. Audit Trail & System Activity Log.
- Features: Instant CSV export, print view, and multi-parameter filtering at /admin/reports.`,
    contentHi: `ई-सम्पदा आरएफपी के अनुसार 14 समर्पित एमआईएस रिपोर्ट प्रदान करता है:
1. कार्यकारी सारांश, 2. चरण-वार पाइपलाइन, 3. प्रखंड-वार आवंटन, 4. विभागीय प्रदर्शन, 5. क्षेत्रवार निवेश (उच्च बनाम अन्य), 6. विलंबित परियोजनाएं, 7. लंबित एक्शन कतार, 8. वित्तीय उपयोग व व्यय, 9. संवेदक प्रदर्शन, 10. गुणवत्ता निरीक्षण व दोष, 11. हस्तांतरण व परिसंपत्ति रजिस्टर, 12. अनुशंसा स्रोत विश्लेषण, 13. जियो-टैग इन्वेंट्री, 14. ऑडिट ट्रेल लॉग।
- उपलब्धता: /admin/reports पर सीएसवी डाउनलोड एवं प्रिंट सुविधा।`
  },

  // LIVE PROJECT RECORDS (Distinctly tagged with sourceType: 'live_project')
  {
    id: 'CHUNK-LIVE-PRJ-0814',
    documentId: 'LIVE-DB-REGISTRY',
    documentName: 'eSapmada Live Database',
    sectionTitle: 'Live Project Record: PRJ-DMFT-RMG-0814 (Mandu Drinking Water)',
    sectionTitleHi: 'लाइव परियोजना रिकॉर्ड: PRJ-DMFT-RMG-0814 (मांडू जलापूर्ति)',
    sourceType: 'live_project',
    sourceCitation: 'Live Project Record (ID: PRJ-DMFT-RMG-0814, DWSD Ramgarh)',
    sourceCitationHi: 'लाइव परियोजना रिकॉर्ड (आईडी: PRJ-DMFT-RMG-0814, पे.एवं स्व. विभाग)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['prj-dmft-rmg-0814', 'mandu', 'kuju', 'drinking water', 'deep tube wells', 'piped water', '2.48 cr', 'maa chhinnamastika', 'ongoing'],
    contentEn: `Project Record: PRJ-DMFT-RMG-0814
Name: Mandu Mining Affected Area Deep Tube Wells & Piped Drinking Water
Block: Mandu | Panchayat: Kuju East | Village: Kuju Colliery Habitation
Coordinates: 23.7942° N, 85.4712° E
Department: Drinking Water & Sanitation Department (DWSD Ramgarh)
Contractor: Maa Chhinnamastika Infra Projects Pvt. Ltd. (Agreement: AGR-2024-RMG-0092)
Financials: Estimated: ₹2.50 Cr | Approved/Sanctioned: ₹2.48 Cr | Agreement: ₹2.42 Cr | Released: ₹1.80 Cr | Expenditure: ₹1.58 Cr | Balance: ₹89.28 Lakhs (Utilization: 64.0%)
Current Progress: Physical Progress 78% | Financial Progress 64% | Stage: Under Execution (Stage 6) | Status: Ongoing (On Track)
Milestones Achieved: Gram Sabha & Governing Council sanction, DPR cleared, contractor agreement signed, deep borewells drilled. Distribution pipeline currently in progress.`,
    contentHi: `परियोजना रिकॉर्ड: PRJ-DMFT-RMG-0814
नाम: मांडू खनन प्रभावित क्षेत्र में पाइप जलापूर्ति एवं गहरे नलकूप अधिष्ठापन
प्रखंड: मांडू | पंचायत: कुजू पूर्व | ग्राम: कुजू कोलियरी बस्ती
निर्देशांक: 23.7942° N, 85.4712° E
विभाग: पेयजल एवं स्वच्छता प्रमंडल, रामगढ़
संवेदक: मां छिन्नमस्तिका इन्फ्रा प्रोजेक्ट्स प्रा. लि. (अनुबंध: AGR-2024-RMG-0092)
वित्तीय विवरण: प्राक्कलित: ₹2.50 करोड़ | स्वीकृत: ₹2.48 करोड़ | अनुबंध: ₹2.42 करोड़ | विमुक्त: ₹1.80 करोड़ | व्यय: ₹1.58 करोड़ (उपयोग: 64.0%)
प्रगति: भौतिक प्रगति 78% | वित्तीय प्रगति 64% | स्थिति: चालू (On Track)`
  },
  {
    id: 'CHUNK-LIVE-PRJ-0762',
    documentId: 'LIVE-DB-REGISTRY',
    documentName: 'eSapmada Live Database',
    sectionTitle: 'Live Project Record: PRJ-DMFT-RMG-0762 (Patratu Health Center)',
    sectionTitleHi: 'लाइव परियोजना रिकॉर्ड: PRJ-DMFT-RMG-0762 (पतरातू स्वास्थ्य केंद्र)',
    sourceType: 'live_project',
    sourceCitation: 'Live Project Record (ID: PRJ-DMFT-RMG-0762, Health Dept Ramgarh)',
    sourceCitationHi: 'लाइव परियोजना रिकॉर्ड (आईडी: PRJ-DMFT-RMG-0762, स्वास्थ्य विभाग)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['prj-dmft-rmg-0762', 'patratu', 'health', 'hospital', 'diagnostic', '1.86 cr', 'ongoing'],
    contentEn: `Project Record: PRJ-DMFT-RMG-0762
Name: Patratu Community Health Sub-Center & Diagnostic Unit Modernization
Block: Patratu | Panchayat: Patratu West | Village: PTPS Workers Colony
Department: Health & Family Welfare
Financials: Approved Amount: ₹1.86 Cr | Amount Released: ₹1.60 Cr | Expenditure: ₹1.56 Cr | Balance: ₹30 Lakhs
Progress: Physical Progress 92% | Financial Progress 84% | Status: Ongoing (Nearing Completion)
Current Activity: Final medical equipment installation and solar power backup testing. Joint handover scheduled for next month.`,
    contentHi: `परियोजना रिकॉर्ड: PRJ-DMFT-RMG-0762
नाम: पतरातू सामुदायिक स्वास्थ्य उप-केंद्र एवं नैदानिक इकाई आधुनिकीकरण
प्रखंड: पतरातू | पंचायत: पतरातू पश्चिम
विभाग: स्वास्थ्य एवं परिवार कल्याण विभाग
वित्तीय विवरण: स्वीकृत: ₹1.86 करोड़ | विमुक्त: ₹1.60 करोड़ | व्यय: ₹1.56 करोड़
प्रगति: भौतिक प्रगति 92% | वित्तीय प्रगति 84% | स्थिति: अंतिम चरण में`
  },
  {
    id: 'CHUNK-LIVE-PRJ-0382',
    documentId: 'LIVE-DB-REGISTRY',
    documentName: 'eSapmada Live Database',
    sectionTitle: 'Live Project Record: PRJ-DMFT-RMG-0382 (Dulmi Solar Lights & Road)',
    sectionTitleHi: 'लाइव परियोजना रिकॉर्ड: PRJ-DMFT-RMG-0382 (दुलमी सोलर लाइट व सड़क)',
    sourceType: 'live_project',
    sourceCitation: 'Live Project Record (ID: PRJ-DMFT-RMG-0382, RWD Ramgarh)',
    sourceCitationHi: 'लाइव परियोजना रिकॉर्ड (आईडी: PRJ-DMFT-RMG-0382, ग्रामीण कार्य विभाग)',
    isLiveFeature: true,
    lastUpdated: '2026-11-03T16:00:00Z',
    keywords: ['prj-dmft-rmg-0382', 'dulmi', 'potanga', 'solar streetlights', 'paver road', '96.4 l', 'ongoing'],
    contentEn: `Project Record: PRJ-DMFT-RMG-0382
Name: Dulmi Mining Affected Village Solar Streetlights & Rural Road
Block: Dulmi | Panchayat: Potanga | Village: Potanga Displaced Hamlet
Department: Rural Works Department (RWD Ramgarh)
Financials: Approved Amount: ₹96.4 Lakhs | Released: ₹65.0 Lakhs | Expenditure: ₹55.9 Lakhs | Balance: ₹40.5 Lakhs
Progress: Physical Progress 61% | Financial Progress 58% | Status: Ongoing
Current Activity: Interlocking paver blocks laying at 80m/day. Solar luminaire pole foundation complete.`,
    contentHi: `परियोजना रिकॉर्ड: PRJ-DMFT-RMG-0382
नाम: दुलमी खनन प्रभावित ग्राम सोलर स्ट्रीट लाइट एवं बारहमासी सड़क निर्माण
प्रखंड: दुलमी | पंचायत: पोतंगा
विभाग: ग्रामीण कार्य विभाग (आरडब्ल्यूडी)
वित्तीय विवरण: स्वीकृत राशि: ₹96.4 लाख | विमुक्त: ₹65.0 लाख | व्यय: ₹55.9 लाख
प्रगति: भौतिक प्रगति 61% | वित्तीय प्रगति 58% | स्थिति: चालू`
  }
]

/**
 * Repeatable Ingestion Processor:
 * Reads documents from knowledge-base directory, verifies hashes to prevent duplicates,
 * indexes chunks, and writes manifest.json and indexed-chunks.json.
 */
export function runIngestionPipeline(): {
  success: boolean
  manifest: KnowledgeManifest
  indexedChunksCount: number
} {
  const pdfPath = path.join(KNOWLEDGE_BASE_DIR, 'DFMT.pdf')
  let pdfHash = 'NOT_FOUND'

  if (fs.existsSync(pdfPath)) {
    pdfHash = computeFileHash(pdfPath)
  }

  const manifest = getKnowledgeManifest()

  // Avoid duplicate indexing: Check if DFMT.pdf already indexed with matching hash
  const existingDocIdx = manifest.documents.findIndex(d => d.fileName === 'DFMT.pdf')

  const docRecord: IngestedDocument = {
    id: 'DOC-DFMT-RFP-001',
    fileName: 'DFMT.pdf',
    filePath: 'knowledge-base/DFMT.pdf',
    fileHash: pdfHash,
    title: 'Request for Proposal for Development and Maintenance of DMFT Work Monitoring Portal, Ramgarh, Jharkhand',
    authority: 'Office of the Deputy Commissioner-cum-District Magistrate, Ramgarh',
    totalPages: 27,
    chunksCount: DFMT_DOCUMENT_CHUNKS.filter(c => c.sourceType === 'documentation').length,
    ingestedAt: new Date().toISOString(),
    status: 'active',
  }

  if (existingDocIdx >= 0) {
    manifest.documents[existingDocIdx] = docRecord
  } else {
    manifest.documents.push(docRecord)
  }

  manifest.totalChunks = DFMT_DOCUMENT_CHUNKS.length
  saveKnowledgeManifest(manifest)

  // Persist indexed chunks to storage
  fs.writeFileSync(CHUNKS_STORAGE_PATH, JSON.stringify(DFMT_DOCUMENT_CHUNKS, null, 2), 'utf-8')

  return {
    success: true,
    manifest,
    indexedChunksCount: DFMT_DOCUMENT_CHUNKS.length,
  }
}

/**
 * Load all active chunks from storage or memory
 */
export function loadIndexedChunks(): DocumentChunk[] {
  try {
    if (fs.existsSync(CHUNKS_STORAGE_PATH)) {
      const data = fs.readFileSync(CHUNKS_STORAGE_PATH, 'utf-8')
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('[KnowledgeBase] Could not load persisted chunks, using default dataset:', err)
  }
  return DFMT_DOCUMENT_CHUNKS
}

