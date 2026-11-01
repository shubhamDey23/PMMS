'use client'

import { ArrowUpRight } from 'lucide-react'
import { AdminAnalytics } from '@/components/AdminAnalytics'
import { PageIntro } from '@/components/PageIntro'
import { ProgressOverview } from '@/components/ProgressOverview'
import { useTranslation } from '@/context/LanguageContext'

export default function AdminAnalyticsPage() {
  const { t, language } = useTranslation()

  return (
    <>
      <PageIntro
        eyebrow={language === 'hi' ? 'विश्लेषण / क्षेत्रीय प्रदर्शन' : 'Analytics / Regional performance'}
        title={language === 'hi' ? 'प्रशासनिक परियोजना विश्लेषण' : 'Administrative Project Analytics'}
        subtitle={
          language === 'hi'
            ? 'प्रखंडों, पंचायतों और विभागों में क्रियान्वयन प्रदर्शन की तुलना करें।'
            : 'Compare implementation performance across blocks, panchayats and departments.'
        }
      />
      <div className="analytics-hero card">
        <div>
          <span>{language === 'hi' ? 'राज्य प्रदर्शन स्कोर' : 'STATE PERFORMANCE SCORE'}</span>
          <strong>82.6</strong>
          <small>
            <ArrowUpRight size={14} /> {language === 'hi' ? 'इस तिमाही +4.8 अंक' : '4.8 points this quarter'}
          </small>
        </div>
        <div className="score-bars">
          {[68, 82, 74, 91, 86, 78, 88, 82].map((v, i) => (
            <span key={i} style={{ height: `${v}%` }} />
          ))}
        </div>
        <div className="analytics-summary">
          <div>
            <span>{language === 'hi' ? 'सर्वश्रेष्ठ प्रदर्शन प्रखंड' : 'Best performing block'}</span>
            <strong>{language === 'hi' ? 'राजनगर' : 'Rajnagar'}</strong>
            <small>{language === 'hi' ? '91% लक्ष्य उपलब्धि' : '91% target achievement'}</small>
          </div>
          <div>
            <span>{language === 'hi' ? 'समय पर परियोजनाएँ' : 'Projects on track'}</span>
            <strong>84.2%</strong>
            <small>1,618 / 1,922 {language === 'hi' ? 'परियोजनाएँ' : 'projects'}</small>
          </div>
          <div>
            <span>{language === 'hi' ? 'बजट उपयोग' : 'Budget utilized'}</span>
            <strong>₹574.2 Cr</strong>
            <small>68.2% {language === 'hi' ? 'कुल' : 'overall'}</small>
          </div>
        </div>
      </div>
      <AdminAnalytics />
      <ProgressOverview />
    </>
  )
}
