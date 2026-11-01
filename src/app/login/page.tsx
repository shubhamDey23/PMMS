import Link from 'next/link'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { LoginFormClient } from './LoginFormClient'

export const dynamic = 'force-dynamic'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const resolvedParams = await searchParams
  const nextUrl = resolvedParams?.next || '/admin'

  return (
    <div className="login-page-wrapper">
      <LoginFormClient initialNextUrl={nextUrl} />
    </div>
  )
}
