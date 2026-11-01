'use client'

import { useState, useEffect } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Search,
  X,
} from 'lucide-react'
import { projectService } from '@/lib/services/project.service'
import type { Project } from '@/types/project'
import { PublicHeader } from '@/components/PublicHeader'
import { ProjectDrawer } from '@/components/ProjectDrawer'
import { SectionHeader } from '@/components/SectionHeader'
import { Status } from '@/components/Status'
import { GeoOverview } from '@/components/GeoOverview'
import { useTranslation } from '@/context/LanguageContext'

export default function PublicLandingPage() {
  const { t, language, formatCurrency, getLocalizedText } = useTranslation()
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setAllProjects(projectService.listProjects())
    const unsubscribe = projectService.subscribe(() => {
      setAllProjects(projectService.listProjects())
    })
    return () => unsubscribe()
  }, [])

  const filteredProjects = allProjects.filter((p) => {
    const q = searchQuery.toLowerCase()
    return (
      p.nameEn.toLowerCase().includes(q) ||
      (p.nameHi && p.nameHi.toLowerCase().includes(q)) ||
      p.id.toLowerCase().includes(q) ||
      p.location.block?.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q) ||
      p.location.village?.toLowerCase().includes(q)
    )
  })

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="public-page" id="top">
      <div className="public-hero">
        <PublicHeader onSearchClick={() => setSearchModalOpen(true)} />

        <div className="public-copy">
          <span>
            {language === 'hi'
              ? 'पारदर्शी विकास। सशक्त समुदाय।'
              : 'Transparent development. Stronger communities.'}
          </span>
          <h1>
            {language === 'hi' ? (
              <>
                देखें कैसे सार्वजनिक परियोजनाएँ
                <br />
                एक बेहतर कल का निर्माण कर रही हैं।
              </>
            ) : (
              <>
                See how public projects are
                <br />
                building a better tomorrow.
              </>
            )}
          </h1>
          <p>
            {language === 'hi'
              ? 'प्रत्येक प्रखंड और गाँव में विकास कार्यों के लिए सत्यापित प्रगति, सार्वजनिक निवेश और पूर्णता अद्यतन देखें।'
              : 'Explore verified progress, public investment and completion updates for development work across every block and village.'}
          </p>
          <div>
            <button
              type="button"
              className="public-primary"
              onClick={() => scrollTo('featured-projects')}
            >
              {language === 'hi' ? 'परियोजनाएँ देखें' : 'Explore projects'} <ArrowRight size={17} />
            </button>
            <button
              type="button"
              className="public-link"
              onClick={() => scrollTo('map-progress')}
            >
              <MapPin size={17} />
              {language === 'hi' ? 'मानचित्र पर देखें' : 'View on map'}
            </button>
          </div>
        </div>

        <div className="public-stat-row">
          {[
            ['1,922', t.stats.totalProjects],
            ['638', t.common.completed],
            ['486', t.common.ongoing],
            ['₹842.6 Cr', t.stats.publicInvestment],
          ].map((s, i) => (
            <div key={s[1]}>
              <i>{String(i + 1).padStart(2, '0')}</i>
              <strong>{s[0]}</strong>
              <span>{s[1]}</span>
            </div>
          ))}
        </div>
      </div>

      <main className="public-content">
        <section id="overview">
          <SectionHeader
            title={language === 'hi' ? 'विकास की एक झलक' : 'Development at a glance'}
            subtitle={
              language === 'hi'
                ? 'जिला एवं प्रखंड कार्यालयों से प्रतिदिन अद्यतन सत्यापित परियोजना डेटा।'
                : 'Verified project data, updated daily from district and block offices.'
            }
            action={
              <span className="public-updated">
                <i />
                {t.lastUpdated}
              </span>
            }
          />
        </section>

        {/* Geographic Monitoring & Real Coordinate Map Section */}
        <div id="map-progress">
          <GeoOverview projects={allProjects} onOpenProject={setSelectedProject} />
        </div>

        <section id="featured-projects">
          <SectionHeader
            title={language === 'hi' ? 'विशेष सार्वजनिक परियोजनाएँ' : 'Featured public projects'}
            subtitle={
              language === 'hi'
                ? 'राज्य भर से हाल ही में अद्यतन की गई मुख्य विकास परियोजनाएँ'
                : 'Recently updated projects from across the state'
            }
            action={
              <button
                type="button"
                className="text-action"
                onClick={() => setSearchModalOpen(true)}
              >
                {language === 'hi'
                  ? `सभी ${allProjects.length} परियोजनाएँ देखें`
                  : `Browse all ${allProjects.length} projects`}{' '}
                <ArrowRight size={15} />
              </button>
            }
          />

          <div className="public-projects">
            {allProjects.slice(0, 3).map((p, i) => {
              const displayName = getLocalizedText(p.nameEn, p.nameHi)

              return (
                <button
                  key={p.id}
                  type="button"
                  className="public-project"
                  onClick={() => setSelectedProject(p)}
                >
                  <div className={`project-photo photo-${i % 3}`}>
                    <Status value={p.status} />
                  </div>
                  <div>
                    <span>{p.department}</span>
                    <h3>{displayName}</h3>
                    <p>
                      <MapPin size={14} />
                      {p.location.village}, {p.location.block}
                    </p>
                    <div className="project-meter">
                      <span>
                        <i style={{ width: `${p.physicalProgress}%` }} />
                      </span>
                      <strong>
                        {p.physicalProgress}% {t.common.completed}
                      </strong>
                    </div>
                    <footer>
                      <span>{formatCurrency(p.financials?.approvedAmount || 0)}</span>
                      <b>
                        {language === 'hi' ? 'विवरण देखें' : 'View details'} <ArrowUpRight size={14} />
                      </b>
                    </footer>
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      </main>

      {/* Project Detail Drawer */}
      {selectedProject && (
        <ProjectDrawer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          publicMode
        />
      )}

      {/* Search & Browse Modal */}
      {searchModalOpen && (
        <div className="public-search-modal-overlay" onClick={() => setSearchModalOpen(false)}>
          <div className="public-search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="public-search-modal-head">
              <div className="public-search-input-wrap">
                <Search size={18} />
                <input
                  type="text"
                  placeholder={
                    language === 'hi'
                      ? 'परियोजना का नाम, आईडी, विभाग या स्थान खोजें...'
                      : 'Search by project name, ID, department, or location...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setSearchModalOpen(false)}
                aria-label={t.common.close}
              >
                <X size={18} />
              </button>
            </div>

            <div className="public-search-results">
              <div className="public-search-count">
                {language === 'hi'
                  ? `${filteredProjects.length} परिणाम प्रदर्शित`
                  : `Showing ${filteredProjects.length} results`}
              </div>
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="public-search-item"
                  onClick={() => {
                    setSearchModalOpen(false)
                    setSelectedProject(p)
                  }}
                >
                  <div>
                    <span className="project-id">{p.id}</span>
                    <strong className="public-search-name">
                      {getLocalizedText(p.nameEn, p.nameHi)}
                    </strong>
                    <span className="public-search-loc">
                      <MapPin size={12} /> {p.location.village}, {p.location.block} · {p.department}
                    </span>
                  </div>
                  <div className="public-search-meta">
                    <Status value={p.status} />
                    <strong>{formatCurrency(p.financials?.approvedAmount || 0)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
