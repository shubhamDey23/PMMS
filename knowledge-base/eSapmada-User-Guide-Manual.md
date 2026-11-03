# eSapmada: DMFT Project Monitoring Portal – Complete User Guide and AI Knowledge Manual

**Portal:** eSapmada – Government Project Monitoring Portal  
**Project Area:** District Mineral Foundation Trust (DMFT), Ramgarh, Jharkhand  
**Purpose:** Project registration, approval tracking, implementation monitoring, financial monitoring, inspection, reporting and project handover.

---

# PART 1 – INTRODUCTION TO eSapmada

## 1.1 What is eSapmada?
eSapmada is a digital project monitoring and management platform designed to manage the complete lifecycle of government development projects funded through DMFT.
The portal provides a centralized platform where authorized government officials and other permitted users can register projects, submit recommendations, process approvals, upload documents, monitor implementation, update progress, record expenditure, conduct inspections and track project completion.
Instead of maintaining project information in disconnected spreadsheets, physical files and separate departmental records, eSapmada aims to maintain project information in a structured digital system.
The portal supports transparency, accountability, monitoring and timely decision-making.

## 1.2 Main objectives
The main objectives of eSapmada are:
1. Maintain a centralized database of DMFT-funded projects.
2. Register and track projects from initial recommendation to final handover.
3. Maintain project-related documents in one location.
4. Record technical and administrative approvals.
5. Monitor physical progress and financial progress.
6. Identify delayed projects and pending approvals.
7. Maintain inspection and payment records.
8. Provide department-wise, block-wise and financial-year-wise reports.
9. Display project information through dashboards and GIS maps.
10. Help authorized officials make decisions using accurate project information.
11. Provide historical records and an audit trail of project activities.
12. Make project monitoring easier for district-level administrators.

## 1.3 What can users do through the portal?
Depending on their assigned permissions, users may be able to:
- View the dashboard.
- Register a new project.
- Submit a work recommendation.
- Review submitted projects.
- Accept or return a work request.
- Upload technical documents.
- Record technical approval.
- Record administrative approval.
- Assign departments and responsible officers.
- Update project implementation details.
- Submit physical progress.
- Upload photographs and supporting evidence.
- Submit payment requisitions.
- Record inspection findings.
- Update financial progress.
- Record project completion.
- Upload handover documents.
- Generate reports.
- Track pending and delayed projects.
- Search for projects.
- View project locations on a map.

Not every user can perform every operation. Access depends on the user's role and assigned permissions.

---

# PART 2 – UNDERSTANDING THE PROJECT LIFECYCLE

## 2.1 Overview of the 10 stages
A DMFT project moves through the following ten stages:
1. Work Request / Recommendation
2. Work Request Acceptance
3. Technical Approval
4. Administrative Approval
5. Work Execution
6. Physical Progress
7. Payment Requisition
8. Work Inspection
9. Financial Progress
10. Handover

The portal should maintain the project's current stage, status, responsible department, relevant dates, documents and activity history.
A project may require multiple updates or repeated activities during its implementation. For example, physical progress, payment requisitions and inspections may occur more than once.
The ten stages describe the overall lifecycle; they should not be interpreted as a rule that every activity can happen only once.

---

# PART 3 – HOW TO ADD A NEW PROJECT

## 3.1 Who can add a project?
Only users who have permission to register or recommend projects can add a new project.
Depending on the configured workflow, the user may be:
- Department-level authorized officer.
- Project recommending authority.
- District-level authorized officer.
- Administrator.
- Another designated government official.

The AI must check the portal's actual role configuration before telling a user that they have permission.
If the user cannot see the Add Project button, the AI should explain that their account may not have the required permission and recommend contacting the portal administrator.

## 3.2 Where should the user start?
A typical project registration process is:
1. Log in to eSapmada using authorized credentials.
2. Open the Projects section.
3. Select Add New Project or Register Project.
4. Select the appropriate project category or work type, if available.
5. Complete the basic project information.
6. Enter location details.
7. Enter department and implementing agency details.
8. Enter the proposed financial information.
9. Upload the required supporting documents.
10. Review all entered information.
11. Save the project as a draft or submit it, depending on the available options.
12. Note the generated project reference number.
13. Track the project's subsequent workflow.

The exact button names and navigation paths must be synchronized with the deployed portal interface.

## 3.3 Basic information required for project registration
### A. Project identification
- Project Name: Name of the proposed work (e.g. Construction of Community Health Centre)
- Project Code: Unique project identification number (auto-generated e.g. PRJ-DMFT-RMG-0814)
- Project Category: Health, Education, Drinking Water, Sanitation, Road, etc.
- Project Type: Construction, Repair, Infrastructure
- Financial Year: Financial year associated with the project (e.g. 2026-27)
- Project Description: Detailed explanation of the proposed work
- Project Objective: What the project aims to achieve
- Priority: High, Medium, Low

### B. Location information
- District: Ramgarh
- Block: Mandu, Patratu, Ramgarh, Gola, Chitarpur, or Dulmi
- Panchayat: Gram Panchayat
- Village: Village where work will be executed
- Ward: Ward number, where applicable
- Project Site Address: Detailed location of proposed work
- Latitude & Longitude: Geographic coordinates
- Land/Plot Details: Land identification details where applicable

### C. Department and implementing agency information
- Nodal Department: Drinking Water & Sanitation (DWSD), Rural Works (RWD), Building Construction, Health, Education, etc.
- Implementing Agency: Agency or organization executing the work
- Project Officer: Officer responsible for monitoring
- Department Contact: Official contact information
- Responsible Engineer: Technical officer
- Contractor/Agency: Executing contractor

### D. Financial information
- Estimated Project Cost: Total estimated cost in ₹
- Requested Amount: Amount requested for consideration
- Technical Sanction Amount: Amount recorded in technical sanction (TS)
- Administrative Approval Amount: Amount recorded in administrative approval (AS)
- Fund Source: DMFT Fund
- Financial Year: Allocation year

### E. Project timeline
- Proposed Start Date & Expected Completion Date
- Actual Start Date & Revised Completion Date
- Project Duration

## 3.4 Documents required during project registration
- Work Proposal: Explains proposed work
- Concept Note: Objective and expected benefits
- Recommendation Letter: Official letter by MP, MLA, Gram Sabha or District Admin
- Gram Sabha/Panchayat Resolution: Supporting proposal
- Site Photographs: Existing site condition
- Location Map: Project location map
- Land Availability Certificate: Land NOC
- Preliminary Cost Estimate
- Detailed Project Report (DPR)

---

# PART 4 – DOCUMENT MANAGEMENT

## 4.2 How to upload a project document
1. Log in to the portal.
2. Open Projects and search for the relevant project.
3. Open project details page and select Documents tab.
4. Select Upload Document.
5. Choose category, title, file, workflow stage and upload.
Supported formats: PDF, JPG, PNG, XLSX, DOCX.

---

# PART 5 – WORK REQUEST / RECOMMENDATION
Initial proposal for undertaking development work under DMFT.
Captures Block, Panchayat, Village, Work Type, Work Name, Recommender, Letter Date & Number.
Generates tracking ID (PRJ-DMFT-RMG-XXXX).

---

# PART 6 – WORK REQUEST ACCEPTANCE
Scrutiny stage by Nodal Officer and DMFT CEO.
Checks priority sector allocation (High Priority: 60% funds for Drinking Water, Healthcare, Education, Sanitation; Other Priority: 40% for rural roads, irrigation, energy).

---

# PART 7 – TECHNICAL APPROVAL & DPR (TS)
Engineering examination and Detailed Project Report vetting by Executive Engineer.
Records Technical Sanction (TS) Number, Date, TS Sanctioned Amount, and Schedule of Rates (SoR) compliance.

---

# PART 8 – ADMINISTRATIVE APPROVAL (AS)
Formal administrative sanction issued by Deputy Commissioner-cum-District Magistrate and DMFT Governing Council.
Records AS Order Number, Date, Sanctioned Budget, and Financial Year.

---

# PART 9 – WORK EXECUTION
Implementation stage: e-procurement NIT, contractor award, work order issuance, agreement date, and commencement report.

---

# PART 10 – PHYSICAL PROGRESS
Measures on-ground execution completion percentage (not expenditure).
Formula: Physical Progress (%) = (Completed Quantity / Sanctioned Quantity) × 100.
Requires geotagged, timestamped site photos and milestone updates.

---

# PART 11 – PAYMENT REQUISITION
Contractor running account (RA) bill submission, Measurement Book (MB) verification, and statutory deductions (TDS, GST, Security Deposit).
A requisition is a request for payment, not proof that payment has been disbursed.

---

# PART 12 – WORK INSPECTION
Physical verification by site engineers (JE, AE, EE) and District Quality Monitoring Committee.
Records quality observations, material testing compliance, deficiencies, and corrective action instructions.

---

# PART 13 – FINANCIAL PROGRESS
Financial implementation measuring fund allocation, fund released, and actual expenditure.
Formula: Financial Progress (%) = (Actual Expenditure / Approved Project Amount) × 100.
Distinguishes between requested, approved, released, and actually disbursed expenditure.

---

# PART 14 – PROJECT HANDOVER & CLOSEOUT
Final stage: Joint completion inspection, asset handover to user department/Panchayat, and formal Utilization Certificate (UC) upload.

---

# PART 15 – DASHBOARD AND ANALYTICS
Monitors total projects, active projects, completed projects, delayed projects, pendency list, fund utilization rate, and block-wise distribution across Ramgarh's 6 blocks.

---

# PART 16 – GIS MAP AND PROJECT LOCATION
Geographic visualization of projects across Mandu, Patratu, Ramgarh, Gola, Chitarpur, and Dulmi with GPS coordinates, status pins, and popup project cards.

---

# PART 17 – REPORTS AND MIS
Generates 15 standard official reports including Project Status Report, Block-wise Report, Department-wise Report, Delay Report, Financial Progress Report, and Handover Report. Exportable in PDF, Excel, and CSV.

---

# PART 18 – USER ROLES AND ACCESS CONTROL
Role-Based Access Control (RBAC) covering 9 official roles:
1. Super Administrator
2. District Administrator (DC/DDC)
3. DMFT CEO
4. Nodal Officer
5. Senior Reviewing Officer
6. Execution Department Engineer (EE/AE)
7. Inspection Officer
8. Data Entry Operator (DEO)
9. Monitoring User / General Viewer

---

# PART 19 – NOTIFICATIONS & PENDENCY MONITORING
Monitors 11 statutory pendency checkpoints:
1. Work Request Scrutiny
2. DPR Preparation
3. Technical Sanction
4. Administrative Approval
5. Tender Publication
6. Work Order Issuance
7. Physical Progress Verification
8. Quality Inspection Compliance
9. Payment Requisition Clearance
10. Final Handover
11. Utilization Certificate Submission

---

# PART 20 – TROUBLESHOOTING & COMMON ISSUES
- Unable to log in: Check credentials, account activation, or session timeout.
- Add Project button hidden: Check assigned user role and department permissions.
- Cannot edit approved project: Projects in later workflow stages are locked to maintain audit integrity; changes require formal amendment process.
- Delay flagged: Expected completion date passed or physical progress is below threshold.
- Financial figure mismatch: Distinguish between estimated, sanctioned, agreement, and actual expenditure.

---

# PART 21 – AI CHATBOT RULES
1. Ground answers strictly in approved DMFT RFP and User Manual.
2. Differentiate between official RFP policy and live database project records.
3. Never invent document checklists, financial figures, or approval statuses.
4. Provide structured, step-by-step guidance in English and Hindi.

