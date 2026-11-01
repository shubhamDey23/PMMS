'use client'

import { useState, useTransition } from 'react'
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
import { loginAction } from '@/app/actions/auth'
import { Logo } from '@/components/Logo'

export function LoginFormClient({ initialNextUrl }: { initialNextUrl: string }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Show dev credentials only when not in production
  const isDevMode = process.env.NODE_ENV !== 'production'

  const handleFillDemo = () => {
    setUsername('admin')
    setPassword('Admin@12345')
    setFieldErrors({})
    setServerError(null)
  }

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setServerError(null)

    // Client-side validation
    const errors: { username?: string; password?: string } = {}
    if (!username.trim()) {
      errors.username = 'Username is required.'
    }
    if (!password) {
      errors.password = 'Password is required.'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})

    startTransition(async () => {
      try {
        const result = await loginAction({
          username: username.trim(),
          password,
          rememberMe,
          nextUrl: initialNextUrl,
        })

        if (!result.success) {
          setServerError(result.error || 'Authentication failed. Please verify your credentials.')
          return
        }

        // Force full navigation to destination to ensure fresh cookie loading
        const destination = result.redirectUrl || '/admin'
        window.location.href = destination
      } catch {
        setServerError('An unexpected error occurred. Please try again.')
      }
    })
  }

  return (
    <div className="login-card">
      <div className="login-card-head">
        <Link href="/" className="login-brand" title="PMMS Homepage">
          <Logo />
        </Link>
        <span className="login-badge">
          <ShieldCheck size={14} /> Official Admin Gateway
        </span>
        <h1 className="login-title">Admin Login</h1>
        <p className="login-subtitle">
          Sign in to manage and monitor government development projects.
        </p>
      </div>

      {serverError && (
        <div className="login-error-banner" role="alert">
          <AlertCircle size={18} />
          <div>
            <strong>Authentication Error</strong>
            <p>{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form" noValidate>
        {/* Username Field */}
        <div className={`form-group ${fieldErrors.username ? 'has-error' : ''}`}>
          <label htmlFor="username">Username</label>
          <div className="input-affix-wrap">
            <span className="input-icon">
              <UserRound size={17} />
            </span>
            <input
              id="username"
              type="text"
              autoComplete="username"
              autoFocus
              disabled={isPending}
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                if (fieldErrors.username) {
                  setFieldErrors((prev) => ({ ...prev, username: undefined }))
                }
              }}
              className={fieldErrors.username ? 'input-error' : ''}
            />
          </div>
          {fieldErrors.username && (
            <span className="field-error-msg">{fieldErrors.username}</span>
          )}
        </div>

        {/* Password Field */}
        <div className={`form-group ${fieldErrors.password ? 'has-error' : ''}`}>
          <label htmlFor="password">Password</label>
          <div className="input-affix-wrap">
            <span className="input-icon">
              <Lock size={17} />
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              disabled={isPending}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: undefined }))
                }
              }}
              className={fieldErrors.password ? 'input-error' : ''}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {fieldErrors.password && (
            <span className="field-error-msg">{fieldErrors.password}</span>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="login-options-row">
          <label className="remember-me-checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isPending}
            />
            <span>Remember me for 30 days</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="login-submit-btn"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="spinner-icon" />
              <span>Verifying credentials...</span>
            </>
          ) : (
            <>
              <KeyRound size={17} />
              <span>Sign In to Dashboard</span>
            </>
          )}
        </button>
      </form>

      {/* Development Demo Credentials - Dev mode only */}
      {isDevMode && (
        <div className="demo-credentials-box">
          <div className="demo-credentials-header">
            <div className="demo-badge">Development Demo Credentials</div>
            <button
              type="button"
              className="demo-fill-btn"
              onClick={handleFillDemo}
              title="Auto-fill form with demo credentials"
            >
              Auto-fill Form
            </button>
          </div>
          <p className="demo-note">
            Use these credentials for local testing. This card is hidden in production builds.
          </p>
          <div className="demo-credentials-grid">
            <div className="demo-cred-row">
              <span className="demo-label">Username:</span>
              <code className="demo-val">admin</code>
              <button
                type="button"
                className="demo-copy-btn"
                onClick={() => handleCopy('admin', 'user')}
                title="Copy username"
              >
                {copiedField === 'user' ? <CheckCircle2 size={13} className="text-green" /> : <Copy size={13} />}
              </button>
            </div>
            <div className="demo-cred-row">
              <span className="demo-label">Password:</span>
              <code className="demo-val">Admin@12345</code>
              <button
                type="button"
                className="demo-copy-btn"
                onClick={() => handleCopy('Admin@12345', 'pass')}
                title="Copy password"
              >
                {copiedField === 'pass' ? <CheckCircle2 size={13} className="text-green" /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return to Public Landing Page */}
      <div className="login-footer">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Return to Public Dashboard</span>
        </Link>
      </div>
    </div>
  )
}

