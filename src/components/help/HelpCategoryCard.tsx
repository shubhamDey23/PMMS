'use client'

import React from 'react'
import {
  Sparkles,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  CheckCircle2,
  MapPin,
  Languages,
  FileBarChart,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import type { HelpCategory } from '@/lib/help/help-content'
import { useTranslation } from '@/context/LanguageContext'

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  CheckCircle2,
  MapPin,
  Languages,
  FileBarChart,
  ShieldCheck,
  HelpCircle,
}

interface HelpCategoryCardProps {
  category: HelpCategory
  questionCount: number
  isSelected?: boolean
  onClick: () => void
}

export function HelpCategoryCard({
  category,
  questionCount,
  isSelected,
  onClick,
}: HelpCategoryCardProps) {
  const { language } = useTranslation()
  const IconComponent = ICON_MAP[category.icon] || HelpCircle
  const title = language === 'hi' ? category.titleHi : category.titleEn
  const description = language === 'hi' ? category.descriptionHi : category.descriptionEn

  return (
    <button
      type="button"
      onClick={onClick}
      className={`help-cat-card ${isSelected ? 'selected' : ''}`}
    >
      <div>
        <div className="help-cat-top">
          <div
            className="help-cat-icon"
            style={{
              backgroundColor: `${category.color}15`,
              color: category.color,
            }}
          >
            <IconComponent size={20} />
          </div>
          <span className="help-cat-badge">
            {questionCount} {language === 'hi' ? 'विषय' : questionCount === 1 ? 'topic' : 'topics'}
          </span>
        </div>

        <h3 className="help-cat-title">{title}</h3>
        <p className="help-cat-desc">{description}</p>
      </div>

      <div className="help-cat-footer">
        <span>{language === 'hi' ? 'उत्तर देखें' : 'View answers'}</span>
        <ChevronRight size={14} />
      </div>
    </button>
  )
}
