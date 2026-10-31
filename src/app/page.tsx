'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3,
  Bell, Building2, CalendarDays, CheckCircle2, ChevronDown, ChevronLeft,
  ChevronRight, CircleDollarSign, ClipboardCheck, Clock3, Download, Eye,
  FileCheck2, FileText, Filter, FolderKanban, Handshake, HelpCircle, IndianRupee,
  LayoutDashboard, Map, MapPin, Menu, PanelLeftClose, PanelLeftOpen, Plus,
  Search, Settings, ShieldCheck, SlidersHorizontal, UserRound, Users, Wallet, X,
  type LucideIcon,
} from 'lucide-react'

type View = 'dashboard' | 'projects' | 'analytics' | 'alerts' | 'public'
type Project = {
  id: string; name: string; department: string; block: string; panchayat: string
  village: string; contractor: string; amount: string; physical: number; financial: number
  status: 'Ongoing' | 'Completed' | 'Pending' | 'Delayed'
}

const projects: Project[] = [
  { id: 'PRJ-2024-0814', name: 'Rural Connectivity Road – Phase II', department: 'Rural Works', block: 'Chandipur', panchayat: 'Sundarpur', village: 'Lakshmipur', contractor: 'Maa Infra Projects', amount: '₹2.48 Cr', physical: 78, financial: 64, status: 'Ongoing' },
  { id: 'PRJ-2024-0762', name: 'Piped Water Supply Augmentation', department: 'Public Health', block: 'Kalyanpur', panchayat: 'Haripur', village: 'Basantpur', contractor: 'Jal Jeevan Engg.', amount: '₹1.86 Cr', physical: 92, financial: 88, status: 'Ongoing' },
  { id: 'PRJ-2023-0618', name: 'Government Higher Secondary School', department: 'Education', block: 'Rajnagar', panchayat: 'Madhopur', village: 'Kishanganj', contractor: 'North Star Buildcon', amount: '₹3.12 Cr', physical: 100, financial: 96, status: 'Completed' },
  { id: 'PRJ-2024-0901', name: 'Primary Health Centre Modernization', department: 'Health & Family', block: 'Kalyanpur', panchayat: 'Rampur', village: 'Bela', contractor: 'Aarogya Infra', amount: '₹1.24 Cr', physical: 38, financial: 41, status: 'Delayed' },
  { id: 'PRJ-2025-0112', name: 'Solar Micro Grid Installation', department: 'Renewable Energy', block: 'Devgarh', panchayat: 'Nandipur', village: 'Bhawanipur', contractor: 'Suryam Energy', amount: '₹84.6 L', physical: 12, financial: 18, status: 'Pending' },
  { id: 'PRJ-2024-0845', name: 'Community Irrigation Channel', department: 'Water Resources', block: 'Chandipur', panchayat: 'Mangalpur', village: 'Nayagaon', contractor: 'Eastern Civil Works', amount: '₹96.4 L', physical: 61, financial: 58, status: 'Ongoing' },
]

const nav: { label: string; icon: LucideIcon; view?: View }[] = [
  { label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
  { label: 'Project Management', icon: FolderKanban, view: 'projects' },
  { label: 'Project Approvals', icon: ClipboardCheck, view: 'alerts' },
  { label: 'Tender Management', icon: FileCheck2 },
  { label: 'Work Progress', icon: BarChart3, view: 'analytics' },
  { label: 'Financial Monitoring', icon: Wallet },
  { label: 'Inspection Management', icon: Search, view: 'alerts' },
  { label: 'Project Handover', icon: Handshake },
  { label: 'Reports & Analytics', icon: BarChart3, view: 'analytics' },
  { label: 'Public Dashboard', icon: Map, view: 'public' },
  { label: 'User Management', icon: Users },
  { label: 'Settings', icon: Settings },
]

const stats = [
  { label: 'Approved Projects', value: '1,284', delta: '+8.2%', icon: ClipboardCheck, tone: 'blue', bars: [25, 35, 32, 48, 55, 52, 70] },
  { label: 'Ongoing Projects', value: '486', delta: '+4.6%', icon: Clock3, tone: 'green', bars: [30, 28, 40, 46, 42, 58, 64] },
  { label: 'Completed Projects', value: '638', delta: '+12.4%', icon: CheckCircle2, tone: 'teal', bars: [22, 34, 31, 48, 50, 62, 75] },
  { label: 'Pending Projects', value: '92', delta: '-3.1%', icon: FileText, tone: 'amber', bars: [68, 62, 58, 50, 48, 42, 36], down: true },
  { label: 'Delayed Projects', value: '68', delta: '+1.8%', icon: AlertTriangle, tone: 'red', bars: [30, 35, 32, 40, 42, 46, 52], negative: true },
  { label: 'Total Projects', value: '1,922', delta: '+7.8%', icon: FolderKanban, tone: 'purple', bars: [28, 35, 42, 40, 54, 62, 72] },
]

const blocks = [
  { name: 'Chandipur', total: 284, completed: 184, ongoing: 100 },
  { name: 'Kalyanpur', total: 248, completed: 138, ongoing: 110 },
  { name: 'Rajnagar', total: 218, completed: 151, ongoing: 67 },
  { name: 'Devgarh', total: 186, completed: 108, ongoing: 78 },
  { name: 'Bhawanipur', total: 154, completed: 92, ongoing: 62 },
]

function Button({ children, className = '', onClick, title }: { children: React.ReactNode; className?: string; onClick?: () => void; title?: string }) {
  return <button title={title} onClick={onClick} className={`btn ${className}`}>{children}</button>
}

function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="brand brand-compact" title="Government Project Monitoring Dashboard">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-icon.png"
          alt="PMMS Icon"
          className="brand-logo-icon"
          width={38}
          height={38}
        />
      </div>
    )
  }

  return (
    <div className="brand brand-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Government Project Monitoring Dashboard"
        className="brand-logo-full"
      />
    </div>
  )
}

function Sidebar({ collapsed, setCollapsed, view, setView, mobileOpen, closeMobile }: {
  collapsed: boolean; setCollapsed: (v: boolean) => void; view: View; setView: (v: View) => void
  mobileOpen: boolean; closeMobile: () => void
}) {
  return <>
    {mobileOpen && <div className="mobile-overlay" onClick={closeMobile} />}
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-brand"><Logo compact={collapsed} /><Button className="icon-btn mobile-close" onClick={closeMobile}><X size={20} /></Button></div>
      <div className="nav-label">{!collapsed && 'MAIN MENU'}</div>
      <nav>
        {nav.map(({ label, icon: Icon, view: target }) => (
          <button key={label} title={collapsed ? label : undefined} className={`nav-item ${target === view ? 'active' : ''}`}
            onClick={() => { if (target) setView(target); closeMobile() }}>
            <Icon size={19} /><span>{label}</span>{!collapsed && target === view && <span className="active-dot" />}
          </button>
        ))}
      </nav>
      <div className="sidebar-foot">
        {!collapsed && <div className="support-card"><HelpCircle size={19} /><div><strong>Need assistance?</strong><span>Contact PMMS helpdesk</span></div></div>}
        <Button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <PanelLeftOpen size={18} /> : <><PanelLeftClose size={18} /><span>Collapse sidebar</span></>}
        </Button>
      </div>
    </aside>
  </>
}

function Header({ onMenu }: { onMenu: () => void }) {
  return <header className="topbar">
    <Button className="icon-btn menu-btn" onClick={onMenu}><Menu size={21} /></Button>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/logo-icon.png" alt="PMMS Logo" className="topbar-icon" width={32} height={32} />
    <div className="portal-title"><strong>Project Monitoring & Management System</strong><span>Department of Planning & Development</span></div>
    <div className="global-search"><Search size={18} /><input placeholder="Search projects, IDs, locations..." /><kbd>⌘ K</kbd></div>
    <button className="fy-select"><CalendarDays size={17} /><span>FY 2024–25</span><ChevronDown size={15} /></button>
    <Button className="icon-btn" title="Help & Support"><HelpCircle size={20} /></Button>
    <Button className="icon-btn notification" title="Notifications"><Bell size={20} /><i>5</i></Button>
    <button className="profile"><div className="avatar">AS</div><div><strong>Ananya Sharma</strong><span>State Project Director</span></div><ChevronDown size={15} /></button>
  </header>
}

function MiniChart({ bars }: { bars: number[] }) {
  const points = bars.map((v, i) => `${i * 18},${46 - v / 2}`).join(' ')
  return <svg className="spark" viewBox="0 0 108 48" preserveAspectRatio="none"><path d={`M0,46 L${points} L108,46 Z`} /><polyline points={points} /></svg>
}

function KpiGrid({ setView }: { setView: (v: View) => void }) {
  return <div className="kpi-grid">
    {stats.map((item, i) => <button className="kpi-card" key={item.label} onClick={() => setView('projects')} style={{ animationDelay: `${i * 60}ms` }}>
      <div className="kpi-top"><span className={`icon-tile ${item.tone}`}><item.icon size={20} /></span><span className={`trend ${item.negative ? 'bad' : item.down ? 'good' : 'good'}`}>{item.down ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}{item.delta}</span></div>
      <span className="kpi-label">{item.label}</span>
      <div className="kpi-value-row"><strong>{item.value}</strong><MiniChart bars={item.bars} /></div>
      <small>vs. previous quarter</small>
    </button>)}
  </div>
}

function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return <div className="section-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>
}

function ProgressOverview() {
  return <section>
    <SectionHeader title="Performance overview" subtitle="Physical and financial progress across all active projects" action={<button className="text-action">View detailed report <ArrowUpRight size={15} /></button>} />
    <div className="performance-grid">
      <div className="card physical-card">
        <div className="card-title"><div><h3>Physical progress</h3><p>Overall completion against target</p></div><span className="period">This quarter <ChevronDown size={14} /></span></div>
        <div className="physical-content">
          <div className="donut-progress"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" /><circle className="progress-ring" cx="60" cy="60" r="48" /></svg><div><strong>72%</strong><span>Achieved</span></div></div>
          <div className="progress-metrics"><div><span>Target progress</span><strong>78%</strong></div><div><span>Achieved progress</span><strong>72%</strong></div><div><span>Gap to target</span><strong className="warning-text">6%</strong></div></div>
        </div>
        <div className="month-chart">{[40, 46, 44, 54, 58, 66, 72].map((v, i) => <div key={i}><span style={{ height: `${v}%` }} /><small>{['Oct','Nov','Dec','Jan','Feb','Mar','Apr'][i]}</small></div>)}</div>
      </div>
      <div className="card finance-card">
        <div className="card-title"><div><h3>Financial progress</h3><p>Approved amount and expenditure</p></div><CircleDollarSign size={21} className="muted-icon" /></div>
        <div className="big-money">₹842.6 Cr <span>Total approved</span></div>
        <div className="money-grid"><div><span>Expenditure</span><strong>₹574.2 Cr</strong></div><div><span>Remaining</span><strong>₹268.4 Cr</strong></div></div>
        <div className="util-row"><span>Financial utilization</span><strong>68.2%</strong></div>
        <div className="progress-track large"><span style={{ width: '68.2%' }} /></div>
        <div className="finance-note"><ArrowUpRight size={15} /><span><strong>8.4% higher</strong> than previous quarter</span></div>
      </div>
      <div className="card status-card">
        <div className="card-title"><div><h3>Project status</h3><p>Distribution by current stage</p></div><button className="more-btn">•••</button></div>
        <div className="status-content"><div className="status-donut"><div><strong>1,922</strong><span>Total</span></div></div>
          <div className="legend">
            {[['Completed','638','green'],['Ongoing','486','blue'],['Approved','638','teal'],['Pending','92','amber'],['Delayed','68','red']].map(x => <div key={x[0]}><span><i className={x[2]} />{x[0]}</span><strong>{x[1]}</strong></div>)}
          </div>
        </div>
      </div>
    </div>
  </section>
}

function AdminAnalytics() {
  return <section>
    <SectionHeader title="Administrative analytics" subtitle="Regional project distribution and implementation progress"
      action={<div className="segmented"><button className="active">Block</button><button>Panchayat</button><button>Department</button></div>} />
    <div className="analytics-grid">
      <div className="card block-card">
        <div className="card-title"><div><h3>Projects by block</h3><p>Completed vs ongoing projects</p></div><button className="period">Top 5 blocks <ChevronDown size={14} /></button></div>
        <div className="bar-legend"><span><i className="complete" />Completed</span><span><i className="ongoing" />Ongoing</span></div>
        <div className="horizontal-bars">
          {blocks.map(b => <div className="bar-row" key={b.name}><span>{b.name}</span><div className="stack-bar"><i style={{ width: `${(b.completed / 300) * 100}%` }} /><b style={{ width: `${(b.ongoing / 300) * 100}%` }} /></div><strong>{b.total}</strong></div>)}
        </div>
      </div>
      <div className="card dept-card">
        <div className="card-title"><div><h3>Department performance</h3><p>Physical and financial achievement</p></div><ArrowUpRight size={18} /></div>
        {[
          { name: 'Rural Works', count: '128 projects', physical: 84, financial: 76 },
          { name: 'Public Health', count: '96 projects', physical: 78, financial: 72 },
          { name: 'Education', count: '84 projects', physical: 91, financial: 88 },
          { name: 'Water Resources', count: '72 projects', physical: 69, financial: 62 },
          { name: 'Health & Family', count: '58 projects', physical: 74, financial: 68 },
        ].map((d) =>
          <div className="dept-row" key={d.name}><div className="dept-icon">{d.name.slice(0, 2).toUpperCase()}</div><div className="dept-info"><div><strong>{d.name}</strong><span>{d.count}</span></div><div className="dual-bars"><span><i style={{ width: `${d.physical}%` }} /></span><span><i style={{ width: `${d.financial}%` }} /></span></div></div><b>{d.physical}%</b></div>)}
      </div>
    </div>
  </section>
}

const alerts = [
  { label: 'Awaiting approval', count: 28, meta: '8 high priority', icon: ClipboardCheck, tone: 'amber' },
  { label: 'Awaiting tender', count: 16, meta: '3 overdue', icon: FileText, tone: 'blue' },
  { label: 'Work not commenced', count: 12, meta: '5 over 30 days', icon: Clock3, tone: 'red' },
  { label: 'Pending inspections', count: 34, meta: 'Due this week', icon: Search, tone: 'purple' },
  { label: 'Inspection actions', count: 21, meta: '6 critical', icon: AlertTriangle, tone: 'red' },
  { label: 'Awaiting handover', count: 9, meta: '2 ready today', icon: Handshake, tone: 'green' },
]

function PendingActions({ full = false }: { full?: boolean }) {
  return <section>
    <SectionHeader title="Pending actions & project alerts" subtitle="Items requiring attention from your team" action={<button className="text-action">View all actions <ArrowRight size={15} /></button>} />
    <div className={`alert-banner ${full ? 'full' : ''}`}><span><AlertTriangle size={20} /><div><strong>8 critical projects require immediate attention</strong><p>Delayed by more than 60 days or exceeding approved cost thresholds.</p></div></span><button>Review critical projects <ArrowRight size={15} /></button></div>
    <div className="action-grid">{alerts.map(a => <button className="action-card" key={a.label}><span className={`icon-tile ${a.tone}`}><a.icon size={19} /></span><div><span>{a.label}</span><strong>{a.count}</strong><small>{a.meta}</small></div><ChevronRight size={17} /></button>)}</div>
  </section>
}

function Status({ value }: { value: Project['status'] }) { return <span className={`status-badge ${value.toLowerCase()}`}><i />{value}</span> }

function ProjectsTable({ onProject, compact = false }: { onProject: (p: Project) => void; compact?: boolean }) {
  const [query, setQuery] = useState('')
  const shown = projects.filter(p => `${p.name} ${p.id} ${p.block}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="card table-card">
    <div className="table-tools">
      <div className="table-search"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search project name or ID..." /></div>
      <button className="secondary-btn"><SlidersHorizontal size={16} /> Columns</button>
      <button className="secondary-btn"><Download size={16} /> Export</button>
      {!compact && <button className="primary-btn"><Plus size={16} /> Add project</button>}
    </div>
    <div className="table-wrap"><table><thead><tr><th>Project ID / Name</th><th>Department</th><th>Location</th><th>Approved amount</th><th>Physical</th><th>Financial</th><th>Status</th><th /></tr></thead>
      <tbody>{shown.map(p => <tr key={p.id} onClick={() => onProject(p)}><td><span className="project-id">{p.id}</span><strong className="project-name">{p.name}</strong></td><td>{p.department}</td><td><strong className="location">{p.block}</strong><span>{p.panchayat} · {p.village}</span></td><td><strong>{p.amount}</strong></td><td><div className="table-progress"><span><i style={{ width: `${p.physical}%` }} /></span><b>{p.physical}%</b></div></td><td><div className="table-progress financial"><span><i style={{ width: `${p.financial}%` }} /></span><b>{p.financial}%</b></div></td><td><Status value={p.status} /></td><td><button className="row-action"><Eye size={17} /></button></td></tr>)}</tbody></table></div>
    <div className="pagination"><span>Showing 1–{shown.length} of 1,922 projects</span><div><button><ChevronLeft size={15} /></button><button className="active">1</button><button>2</button><button>3</button><span>…</span><button>193</button><button><ChevronRight size={15} /></button></div></div>
  </div>
}

function FilterPanel() {
  const [open, setOpen] = useState(true)
  const [applied, setApplied] = useState(false)
  return <div className={`filter-card ${open ? 'open' : ''}`}>
    <button className="filter-title" onClick={() => setOpen(!open)}><span><Filter size={19} /><div><strong>Advanced project filter</strong><small>Refine results across administrative and project attributes</small></div></span><span className="filter-count">{applied ? '3 filters applied' : 'No filters applied'}</span><ChevronDown size={18} /></button>
    {open && <div className="filter-body">
      <div className="filter-fields">
        <label><span>Project ID or keyword</span><div><Search size={16} /><input placeholder="e.g. PRJ-2024 or road" /></div></label>
        {['Department','Block','Panchayat','Financial year','Project status'].map(x => <label key={x}><span>{x}</span><button className="select-field">All {x.toLowerCase()}s <ChevronDown size={15} /></button></label>)}
      </div>
      <div className="filter-footer"><button className="clear-btn" onClick={() => setApplied(false)}>Clear all</button><button className="primary-btn" onClick={() => setApplied(true)}><Search size={16} />Apply filters</button></div>
      {applied && <div className="filter-chips"><span>Rural Works <X size={13} /></span><span>FY 2024–25 <X size={13} /></span><span>Ongoing <X size={13} /></span></div>}
    </div>}
  </div>
}

function Dashboard({ setView, onProject }: { setView: (v: View) => void; onProject: (p: Project) => void }) {
  return <>
    <PageIntro eyebrow="Executive overview" title="Project Dashboard & Monitoring" subtitle="Monitor development projects, implementation progress, financial performance, and administrative activities across all regions." />
    <KpiGrid setView={setView} />
    <ProgressOverview />
    <AdminAnalytics />
    <PendingActions />
    <section><SectionHeader title="Project details & monitoring" subtitle="Recent and high-priority development projects" action={<button className="text-action" onClick={() => setView('projects')}>View all projects <ArrowRight size={15} /></button>} /><ProjectsTable onProject={onProject} compact /></section>
  </>
}

function PageIntro({ eyebrow, title, subtitle, actions }: { eyebrow: string; title: string; subtitle: string; actions?: React.ReactNode }) {
  return <div className="page-intro"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>{actions || <div className="updated"><span><i />Live data</span><small>Updated today, 10:42 AM</small></div>}</div>
}

function ProjectsView({ onProject }: { onProject: (p: Project) => void }) {
  return <><PageIntro eyebrow="Projects / Monitoring" title="Project Details & Monitoring" subtitle="Search, filter and monitor all sanctioned development projects from a single workspace." actions={<button className="primary-btn"><Plus size={17} />Create project</button>} /><FilterPanel /><ProjectsTable onProject={onProject} /></>
}

function AnalyticsView() {
  return <><PageIntro eyebrow="Analytics / Regional performance" title="Administrative Project Analytics" subtitle="Compare implementation performance across blocks, panchayats and departments." /><div className="analytics-hero card">
    <div><span>STATE PERFORMANCE SCORE</span><strong>82.6</strong><small><ArrowUpRight size={14} /> 4.8 points this quarter</small></div>
    <div className="score-bars">{[68,82,74,91,86,78,88,82].map((v,i)=><span key={i} style={{height:`${v}%`}} />)}</div>
    <div className="analytics-summary"><div><span>Best performing block</span><strong>Rajnagar</strong><small>91% target achievement</small></div><div><span>Projects on track</span><strong>84.2%</strong><small>1,618 of 1,922 projects</small></div><div><span>Budget utilized</span><strong>₹574.2 Cr</strong><small>68.2% overall</small></div></div>
  </div><AdminAnalytics /><ProgressOverview /></>
}

function AlertsView() { return <><PageIntro eyebrow="Actions / Pending" title="Pending Activities & Alerts" subtitle="Prioritized operational queue for approvals, inspections, tenders and project handovers." /><PendingActions full /><div className="card alert-table"><SectionHeader title="Priority action queue" subtitle="Sorted by urgency and due date" /><table><thead><tr><th>Priority</th><th>Project / Activity</th><th>Responsible office</th><th>Pending since</th><th>Due date</th><th>Action</th></tr></thead><tbody>{projects.slice(0,5).map((p,i)=><tr key={p.id}><td><span className={`priority ${i<2?'critical':'medium'}`}>{i<2?'Critical':'Medium'}</span></td><td><strong>{p.name}</strong><span>{p.id} · {['Inspection action','Administrative approval','Tender review'][i%3]}</span></td><td>{p.department}</td><td>{8+i*6} days</td><td>{['Today','Tomorrow','28 Apr','30 Apr','02 May'][i]}</td><td><button className="text-action">Review <ArrowRight size={14}/></button></td></tr>)}</tbody></table></div></>
}

function PublicView({ onProject }: { onProject: (p: Project) => void }) {
  return <div className="public-page">
    <div className="public-hero">
      <nav className="public-nav"><Logo /><div><button>Home</button><button>Projects</button><button>Block-wise Progress</button><button>About</button><button>Contact</button></div><button className="secondary-btn"><Search size={16} />Find a project</button></nav>
      <div className="public-copy"><span>Transparent development. Stronger communities.</span><h1>See how public projects are<br/>building a better tomorrow.</h1><p>Explore verified progress, public investment and completion updates for development work across every block and village.</p><div><button className="public-primary">Explore projects <ArrowRight size={17}/></button><button className="public-link"><MapPin size={17}/>View on map</button></div></div>
      <div className="public-stat-row">{[['1,922','Total projects'],['638','Completed'],['486','In progress'],['₹842.6 Cr','Public investment']].map((s,i)=><div key={s[1]}><i>{String(i+1).padStart(2,'0')}</i><strong>{s[0]}</strong><span>{s[1]}</span></div>)}</div>
    </div>
    <div className="public-content">
      <SectionHeader title="Development at a glance" subtitle="Verified project data, updated daily from district and block offices." action={<span className="public-updated"><i/>Last updated today</span>} />
      <div className="public-overview">
        <div className="public-map card"><div className="map-head"><div><h3>Projects across the state</h3><p>Select a marker to view project details</p></div><button className="period">All blocks <ChevronDown size={14}/></button></div><div className="map-canvas"><div className="map-shape">STATE<br/>PROJECT MAP</div>{[[22,35],[41,24],[58,42],[70,28],[35,62],[62,67],[78,55]].map((p,i)=><button key={i} className={`map-pin pin-${i}`} style={{left:`${p[0]}%`,top:`${p[1]}%`}}><MapPin size={i===2?28:22}/></button>)}<div className="map-tooltip"><strong>Chandipur Block</strong><span>284 projects · 65% completed</span></div></div></div>
        <div className="public-progress card"><span>OVERALL PHYSICAL PROGRESS</span><div className="public-ring"><div><strong>72%</strong><small>completed</small></div></div><div className="public-legend"><div><span>Completed</span><strong>638</strong></div><div><span>In progress</span><strong>486</strong></div><div><span>Other stages</span><strong>798</strong></div></div></div>
      </div>
      <SectionHeader title="Featured public projects" subtitle="Recently updated projects from across the state" action={<button className="text-action">Browse all 1,922 projects <ArrowRight size={15}/></button>} />
      <div className="public-projects">{projects.slice(0,3).map((p,i)=><button key={p.id} className="public-project" onClick={()=>onProject(p)}><div className={`project-photo photo-${i}`}><Status value={p.status}/></div><div><span>{p.department}</span><h3>{p.name}</h3><p><MapPin size={14}/>{p.village}, {p.block}</p><div className="project-meter"><span><i style={{width:`${p.physical}%`}}/></span><strong>{p.physical}% complete</strong></div><footer><span>{p.amount}</span><b>View details <ArrowUpRight size={14}/></b></footer></div></button>)}</div>
    </div>
  </div>
}

function ProjectDrawer({ project, onClose, publicMode = false }: { project: Project; onClose: () => void; publicMode?: boolean }) {
  const [tab,setTab]=useState('Overview')
  return <><div className="drawer-overlay" onClick={onClose}/><aside className={`drawer ${publicMode?'public-drawer':''}`}>
    <div className="drawer-head"><button className="icon-btn" onClick={onClose}><X size={20}/></button><div><span>{publicMode?'PUBLIC PROJECT PROFILE':'PROJECT DETAILS'}</span><strong>{project.id}</strong></div><button className="secondary-btn"><Download size={15}/>Report</button></div>
    <div className="drawer-scroll">
      {publicMode && <div className="detail-photo" />}
      <div className="project-title"><Status value={project.status}/><h2>{project.name}</h2><p><MapPin size={15}/>{project.village}, {project.panchayat}, {project.block}</p></div>
      <div className="drawer-tabs">{['Overview','Financials','Progress','Documents','Timeline'].map(t=><button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t}</button>)}</div>
      {tab==='Overview' && <div className="drawer-content">
        <div className="drawer-progress"><div><span>Physical progress</span><strong>{project.physical}%</strong><div className="progress-track"><i style={{width:`${project.physical}%`}}/></div></div><div><span>Financial progress</span><strong>{project.financial}%</strong><div className="progress-track financial"><i style={{width:`${project.financial}%`}}/></div></div></div>
        <h3>Project information</h3><div className="info-grid">{[['Department',project.department],['Contractor',project.contractor],['Financial year','2024–25'],['Approval no.','AA/PD/2024/418'],['Agreement no.','AGR-2024-0092'],['Start date','18 June 2024'],['Expected completion','30 September 2025'],['Approved amount',project.amount]].map(x=><div key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></div>)}</div>
        <h3>Implementation summary</h3><p className="detail-copy">The project is being implemented under the State Development Programme to improve access to essential public infrastructure and strengthen local service delivery. Progress is verified through scheduled field inspections and geo-tagged updates.</p>
        <h3>Recent milestones</h3><div className="timeline">{[['Technical approval issued','12 May 2024'],['Contractor assigned','06 June 2024'],['Work commenced','18 June 2024'],['Second milestone verified','14 April 2025']].map((x,i)=><div key={x[0]} className={i===3?'current':''}><i>{i<3?<CheckCircle2 size={14}/>:<Clock3 size={14}/>}</i><span><strong>{x[0]}</strong><small>{x[1]}</small></span></div>)}</div>
      </div>}
      {tab!=='Overview' && <div className="tab-placeholder"><FileText size={32}/><h3>{tab} records</h3><p>Verified {tab.toLowerCase()} and supporting project information are available for this project.</p><button className="primary-btn">View all {tab.toLowerCase()}</button></div>}
    </div>
  </aside></>
}

export default function App() {
  const [view, setView] = useState<View>('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const publicMode = view === 'public'
  const content = useMemo(() => {
    if (view === 'projects') return <ProjectsView onProject={setSelected}/>
    if (view === 'analytics') return <AnalyticsView/>
    if (view === 'alerts') return <AlertsView/>
    if (view === 'public') return <PublicView onProject={setSelected}/>
    return <Dashboard setView={setView} onProject={setSelected}/>
  }, [view])
  if (publicMode) return <>{content}{selected && <ProjectDrawer project={selected} onClose={()=>setSelected(null)} publicMode/>}<button className="admin-return" onClick={()=>setView('dashboard')}><ArrowLeft size={16}/>Return to admin portal</button></>
  return <div className={`app-shell ${collapsed?'is-collapsed':''}`}>
    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} view={view} setView={setView} mobileOpen={mobileOpen} closeMobile={()=>setMobileOpen(false)}/>
    <Header onMenu={()=>setMobileOpen(true)}/>
    <main>{content}</main>
    {selected && <ProjectDrawer project={selected} onClose={()=>setSelected(null)}/>}
  </div>
}
