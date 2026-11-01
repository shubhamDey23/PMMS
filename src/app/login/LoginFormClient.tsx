'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
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
    <div className="ecentric-login-layout">
      {/* Top bar with ecentric logo and back to home */}
      <div className="login-top-nav">
        <Link href="/" className="login-nav-logo" title="ecentric Portal">
          <Logo />
        </Link>
        <Link href="/" className="login-nav-back">
          <ArrowLeft size={16} />
          <span>Public Portal</span>
        </Link>
      </div>

      <div className="ecentric-login-body">
        {/* Left Side: Welcome Hero Copy matching screenshot */}
        <div className="ecentric-login-hero">
          <div className="hero-text-block">
            <h1 className="hero-heading">Welcome to ecentric</h1>
            <p className="hero-description">
              An online monitoring system, End to End AI &amp; Blockchain based Portal for Monitoring
              all the Inventories Supplied, Raising Complaints &amp; Suggesting better Vendors/Suppliers.
            </p>
          </div>
        </div>

        {/* Right Side: Floating Login Card matching screenshot */}
        <div className="ecentric-login-card-wrap">
          <div className="ecentric-login-card">
            {/* Header prompt inside card */}
            <div className="card-top-header">
              <span className="card-admin-tag">
                <ShieldCheck size={14} /> Admin Login
              </span>
              <p className="card-lead-text">
                Login now to access real-time insights and keep operations running smoothly.
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

            <form onSubmit={handleSubmit} className="ecentric-form" noValidate>
              {/* Username Input with pill border and user icon */}
              <div className={`pill-input-group ${fieldErrors.username ? 'has-error' : ''}`}>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="pill-input-affix">
                  <span className="pill-icon">
                    <UserRound size={19} />
                  </span>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    autoFocus
                    disabled={isPending}
                    placeholder="User Name / E-mail"
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

              {/* Password Input with pill border and key icon */}
              <div className={`pill-input-group ${fieldErrors.password ? 'has-error' : ''}`}>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="pill-input-affix">
                  <span className="pill-icon">
                    <KeyRound size={19} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    disabled={isPending}
                    placeholder="Password"
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
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <span className="field-error-msg">{fieldErrors.password}</span>
                )}
              </div>

              {/* Options Row: Remember Me & Forgot Password */}
              <div className="ecentric-options-row">
                <label className="remember-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isPending}
                  />
                  <span>Remember me</span>
                </label>

                <a
                  href="#forgot-password"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Please contact your ecentric system administrator to reset your credentials.')
                  }}
                  className="forgot-password-link"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Green Capsule Login Button with chevron */}
              <button
                type="submit"
                className="ecentric-login-btn"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 size={18} className="spinner-icon" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ChevronRight size={19} />
                  </>
                )}
              </button>

              {/* Don't have an account yet? */}
              <div className="card-signup-row">
                <span>Don’t have an account yet?</span>{' '}
                <a
                  href="#signup"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Officer registration is managed through the ecentric administrative portal. Contact your department administrator.')
                  }}
                  className="signup-link"
                >
                  Sign up
                </a>
              </div>
            </form>

            {/* Development Demo Credentials - Visible only in dev mode */}
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
                      {copiedField === 'user' ? (
                        <CheckCircle2 size={13} className="text-green" />
                      ) : (
                        <Copy size={13} />
                      )}
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
                      {copiedField === 'pass' ? (
                        <CheckCircle2 size={13} className="text-green" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
