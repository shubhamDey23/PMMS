import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  title: 'DMFT Work Monitoring Portal — Ramgarh District, Jharkhand',
  description: 'District Mineral Foundation Trust (DMFT), Ramgarh — End-to-end Project Lifecycle, GIS Monitoring, MIS Reporting & Digital Governance.',
  icons: {
    icon: '/logo-icon.png',
    shortcut: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
