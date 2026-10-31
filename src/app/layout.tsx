import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Monitoring & Management System',
  description: 'Government Project Monitoring & Management System — Department of Planning & Development.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
