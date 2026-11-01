import Image from 'next/image'

export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="brand brand-compact" title="eSapmada by Eccentric">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-icon.png"
          alt="eSapmada by Eccentric Icon"
          className="brand-logo-icon"
          width={38}
          height={38}
        />
      </div>
    )
  }

  return (
    <div className="brand brand-full" title="eSapmada by Eccentric">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/esampada-logo.png"
        alt="eSapmada by Eccentric"
        className="brand-logo-full"
        style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
      />
    </div>
  )
}

