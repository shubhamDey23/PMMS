# Government Project Monitoring Dashboard (PMMS) — Next.js

A modern, accessible, bilingual (English & हिन्दी) Government Project Monitoring & Management System built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Formik**, and **Zod**.

The platform provides a public-facing transparency dashboard for citizens, an interactive GIS/geolocation monitoring map, a comprehensive project details drawer, and a secure, session-protected administrative dashboard for government officers to sanction and monitor development works.

---

## Key Features

### 1. Citizen Landing Page (`/`)
- **Public Dashboard**: Open to citizens without authentication, showing high-level KPIs, project summaries, visual metrics, and interactive project cards.
- **Bilingual Interface**: Seamlessly toggles between English and हिन्दी (`LanguageSwitch`) with zero page reloads and persistent state across sessions.
- **Geographic Overview**: Interactive SVG canvas projecting project locations with color-coded status pins, live summary stats, and browser geolocation.
- **Public Navigation**: Quick access to Home, Analytics, Projects, and a prominent **Admin Login** button.

### 2. Secure Administrative Authentication (`/login`)
- **Server-Side Authentication**: Credentials verified securely against environment variables via Next.js Route Handlers (`/api/auth/login`, `/api/auth/logout`, `/api/auth/me`).
- **Encrypted Session Management**: HMAC-SHA256 signed session tokens stored in secure `HttpOnly`, `SameSite=Lax` cookies.
- **Route Protection**: Edge-ready Next.js Middleware protects `/admin/*` routes and preserves target destinations with `?next=` redirects.
- **Development Demo Box**: Clearly labeled demo credentials banner shown in development mode only.

### 3. Comprehensive Project Details Drawer
- **Bilingual Titles & Descriptions**: Displayed in English or Hindi based on active language.
- **Multi-Tab Workspace**:
  - **Overview**: Core metadata, administrative hierarchy (State, District, Block, Panchayat, Village), category, and department.
  - **Financials**: Sanctioned cost, approved amount, agreement amount, release, and expenditure formatted in INR (Lakhs/Crores) with financial utilization guards (division-by-zero safe).
  - **Progress**: Physical vs. financial progress bars, health indicators (Normal, Delayed, At Risk), and stage badges.
  - **Workflow & Milestones**: Chronological milestone tracker with completion statuses and dates.
  - **Documents**: Attached administrative sanctions, DPRs, MB extracts, and geo-tagged inspection photos.
  - **Activity Log**: Audit trail recording approval, site handovers, inspections, and fund releases.

### 4. Interactive Geolocation & Map Widget (`GeoOverview`)
- **Interactive SVG Map**: Real GPS coordinate projection using bounding box normalization.
- **Status Pins**: Color-coded pins for Approved (Blue), Ongoing (Green), Completed (Teal), Pending (Amber), and Delayed (Red).
- **Interactive Popovers**: Click any map pin to view quick project details, physical progress, department, and a direct button to open the full drawer.
- **Browser Geolocation ("Show My Location")**: Detects citizen/officer GPS coordinates with accuracy radius and nearest project distance.

### 5. Add New Project Form (`/admin/projects/new`)
- **Formik + Zod Architecture**: Powered by Formik state management paired with Zod schema validation via a custom adapter (`formik-zod-adapter.ts`).
- **6-Step Comprehensive Workflow**:
  1. *Basic Information*: English & Hindi project name, category, financial year, department, and responsible officer.
  2. *Geographic Details*: District, Block, Panchayat, Village, with Latitude & Longitude inputs and a one-click **"Detect My GPS Location"** button.
  3. *Financial Sanctions*: Estimated cost, approved amount, agreement amount, released amount, and expenditure in INR Lakhs.
  4. *Project Schedule*: Approval date, planned start/completion, and actual progress dates.
  5. *Status & Lifecycle*: Physical & financial progress sliders, project health, stage, and remarks.
  6. *Supporting Documents*: Dynamic document attachment tool with file type, size, and title.
- **Instant Reactive Dashboard Update**: Newly sanctioned projects immediately populate the project register, KPIs, and geographic map via `projectService`.

### 6. Interactive Admin Help Assistant (`/admin/help`)
- **10 Core Support Categories**: Getting Started, Dashboard & Analytics, Project Management, Adding New Projects, Project Details, Geographic Monitoring, English & Hindi Settings, Financial Reports, User Account & Login, and Troubleshooting.
- **100% Offline Q&A Engine**: Built-in deterministic knowledge base with zero external AI dependencies or paid API keys.
- **Instant Bilingual Search**: Search keywords and topics across questions, answers, and tags in both English and हिन्दी.
- **Conversational UI & Deep Links**: Interactive question and answer stream with contextual action buttons (e.g. *Add New Project*, *View Project Map*, *Open Reports*), related follow-up chips, and conversation reset controls.
- **Floating Help Trigger**: Always-accessible floating assistant button in the admin shell for immediate guidance on any screen.

### 7. Interactive Leaflet & OpenStreetMap Project Map (`/admin/map`)
- **OpenStreetMap Standard Tile Provider**: Seamless raster map integration (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`) with compliant attribution.
- **Status-Coded SVG Markers**: Real-time project markers with status color coding (Ongoing, Completed, Delayed) and pulsating locator rings.
- **Interactive Map Popups**: Displays project ID, bilingual name, department, location hierarchy, physical progress bar, financial breakdown, and direct integration with the `ProjectDrawer`.
- **Side Panel & Fly-To Controls**: Collapsible project list with search and block/status filters; selecting any project flies the map smoothly to its GPS coordinates and opens its popup.
- **Device Geolocation**: "Show My Location" control queries device GPS to display user location and proximity to infrastructure projects.
- **SSR Safe**: Dynamically imported with `ssr: false` to guarantee flawless React 19 / Next.js hydration without server-side window errors.

---

## Default Development Credentials

For local testing and evaluation, the following credentials are configured in `.env.local`:

| Field | Value |
| :--- | :--- |
| **Username** | `admin` |
| **Password** | `Admin@12345` |
| **Session Secret** | 32+ character crypto key |

> [!IMPORTANT]
> The development credentials box is displayed on `/login` strictly in development mode (`NODE_ENV === 'development'`).

---

## Project Structure & Architecture

```
PMMS/
├── src/
│   ├── app/                                 # Next.js App Router
│   │   ├── admin/                           # Protected Administrative Area
│   │   │   ├── alerts/page.tsx              # Alerts & Approvals
│   │   │   ├── analytics/page.tsx           # Reports & District Analytics
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx                 # Project Register & Filters
│   │   │   │   └── new/page.tsx             # Add Project Form (Formik + Zod)
│   │   │   ├── layout.tsx                   # Admin Shell (Sidebar, Header, Drawer)
│   │   │   └── page.tsx                     # Admin Dashboard
│   │   ├── api/
│   │   │   └── auth/                        # Server Auth Handlers
│   │   │       ├── login/route.ts           # Login verification & cookie issue
│   │   │       ├── logout/route.ts          # Session termination
│   │   │       └── me/route.ts              # Session verification
│   │   ├── login/page.tsx                   # Dedicated Admin Login
│   │   ├── layout.tsx                       # Root Layout with LanguageProvider
│   │   ├── page.tsx                         # Public Citizen Landing Page
│   │   └── globals.css                      # Global Styles & Design System
│   ├── components/                          # Reusable UI Components
│   │   ├── projects/
│   │   │   └── ProjectForm.tsx              # Formik + Zod 6-Section Add Project Form
│   │   ├── AdminHeader.tsx                  # Admin Top Bar with LangSwitch & Logout
│   │   ├── AdminSidebar.tsx                 # Admin Navigation Sidebar
│   │   ├── FilterPanel.tsx                  # Department & Status Filters
│   │   ├── GeoOverview.tsx                  # Interactive SVG Geolocation Map
│   │   ├── KpiGrid.tsx                      # Dynamic Metric Cards
│   │   ├── LanguageSwitch.tsx               # English / हिन्दी Toggle
│   │   ├── ProjectDrawer.tsx                # 6-Tab Comprehensive Details Drawer
│   │   ├── ProjectsTable.tsx                # Filterable Project Register Table
│   │   └── PublicHeader.tsx                 # Public Citizen Header
│   ├── context/
│   │   ├── AdminDrawerContext.tsx           # Drawer open/close state
│   │   └── LanguageContext.tsx              # Language state, cookie sync & formatters
│   ├── data/
│   │   └── mock-data.ts                     # Enhanced Seed Projects with GPS & INR data
│   ├── lib/
│   │   ├── auth/                            # HMAC-SHA256 Token Crypto & Cookie helpers
│   │   ├── i18n/
│   │   │   └── translations.ts              # English and Hindi Localization Dictionary
│   │   ├── services/
│   │   │   └── project.service.ts           # Project Data Service & Local Storage
│   │   └── validation/
│   │       ├── project.schema.ts            # Zod Validation Schema with bilingual errors
│   │       └── formik-zod-adapter.ts        # Formik-Zod Bridge Adapter
│   ├── types/
│   │   └── project.ts                       # Complete Project Data Model
│   └── middleware.ts                        # Route Protection & NextUrl Redirects
└── test/
    ├── functional-test.mjs                  # Phase 1 Auth & Landing Page Tests (33 tests)
    └── phase2-functional-test.mjs           # Phase 2 Bilingual, Geo & Form Tests (29 tests)
```

---

## Localization Architecture (English & हिन्दी)

- **Dictionary (`src/lib/i18n/translations.ts`)**: Centralized translation dictionary defining strict typings for all navigation items, form inputs, validation messages, table headers, and status badges.
- **Provider (`src/context/LanguageContext.tsx`)**:
  - Exposes `language`, `setLanguage`, `t`, `formatCurrency`, `formatDate`, and `getLocalizedText`.
  - Persists language choice in `localStorage` and a lightweight cookie (`pmms_lang`), ensuring consistency across public and administrative pages.
  - Number & currency formatting respects Indian numbering system (`₹1.25 Cr`, `₹45.00 L`).

---

## Formik + Zod Form Architecture

The project form at `/admin/projects/new` implements **Formik** for state management and **Zod** for schema validation:

```
[User Input] ──► Formik Form State ──► formikZodAdapter ──► Zod Schema (projectSchema)
                                                                 │
                                                       (Validation Rules)
                                                                 │
[Error Display] ◄── Formik Errors (Bilingual) ◄──────────────────┘
```

1. **Schema Validation (`src/lib/validation/project.schema.ts`)**:
   - String length constraints (minimum 3 characters for names).
   - Geographic coordinates range (`latitude`: -90 to 90, `longitude`: -180 to 180).
   - Financial constraints (`estimatedCost` must be greater than 0; expenditure cannot exceed approved amount).
   - Chronological timeline checks (completion date must be after start date).
2. **Adapter (`src/lib/validation/formik-zod-adapter.ts`)**: Converts Zod's structured issue list into Formik-compatible dot-notation error maps (`errors[field] = message`).

---

## Project Data Service (`projectService`)

Located in `src/lib/services/project.service.ts`:
- **Single Source of Truth**: Provides `listProjects()`, `getProjectById()`, `createProject()`, and `getStatsSummary()`.
- **Observer Pattern**: Components subscribe via `projectService.subscribe(callback)` to receive reactive updates whenever a new project is created.
- **Client Persistence**: Newly created projects persist to browser `localStorage` (`pmms_user_created_projects`), combined with pre-seeded projects from `mock-data.ts`.
- **Dynamic Metrics Calculation**: Aggregate numbers (Total, Approved, Ongoing, Completed, Delayed, Expenditure, Fund Utilization, GPS Pin counts) are re-calculated dynamically from live data.

### Replacing Local Storage with a REST API Backend

To connect a PostgreSQL, MongoDB, or REST API backend:
1. Update `createProject` in `src/lib/services/project.service.ts` to execute `fetch('/api/projects', { method: 'POST', body: JSON.stringify(input) })`.
2. Update `listProjects` to fetch from `GET /api/projects`.
3. The UI components (`ProjectsTable`, `KpiGrid`, `GeoOverview`, `ProjectForm`) require **zero changes** because they depend solely on `projectService`.

---

## Installation & Local Development

### Prerequisites
- Node.js 20.9+ or newer
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy or create `.env.local` in the project root:
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@12345
SESSION_SECRET=c29tZV9zdXBlcl9zZWNyZXRfY3J5cHRvX2tleV8zMl9jaGFyc19taW5pbXVt
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Verification & Automated Test Suites

The codebase includes two automated end-to-end integration test suites:

### 1. Run Complete Test Suites
```bash
# Phase 1: Authentication, Route Guards & Public Landing Tests
node test/functional-test.mjs

# Phase 2: Bilingual, Geolocation, Project Form & Service Tests
node test/phase2-functional-test.mjs
```

### Test Coverage Highlights
- ✅ **Public Landing Page**: Loads without login; displays bilingual toggle, branding, and map widget.
- ✅ **Language Switching**: English / हिन्दी toggle state persistence and translation dictionary mapping.
- ✅ **Route Guards**: Unauthorized visits to `/admin`, `/admin/projects`, `/admin/projects/new`, etc., are securely blocked and redirected to `/login?next=...`.
- ✅ **Session Authentication**: Secure cookie issuance, tamper detection, and session invalidation on logout.
- ✅ **Add Project Form**: 6-section form rendering, Formik state bindings, Zod validation constraints, GPS detection button, and document upload UI.
- ✅ **Interactive Map**: Geolocation coordinate rendering, status pin popovers, and browser GPS locator.
- ✅ **Project Drawer**: Detailed multi-tab inspection with financial guards and milestone tracker.

---

## Production Build & Deployment

### Build Locally
```bash
npm run build
npm run start
```

### Deploy to Vercel

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. In the [Vercel Dashboard](https://vercel.com), select **Add New Project** and import the repository.
3. Configure the following **Environment Variables** in the Vercel project settings:
   - `ADMIN_USERNAME`: Production administrator username.
   - `ADMIN_PASSWORD`: Strong production administrator password.
   - `SESSION_SECRET`: Random 32+ character string for HMAC signing.
4. Click **Deploy**. Vercel will build and deploy the Next.js application automatically.

---

## License
Open Government Project Monitoring System (PMMS) — Next.js Edition.
