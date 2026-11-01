import Image from 'next/image'

export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="brand brand-compact" title="ecentric">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-icon.png"
          alt="ecentric Icon"
          className="brand-logo-icon"
          width={36}
          height={36}
        />
      </div>
    )
  }

  return (
    <div className="brand brand-full" title="ecentric">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ecentric-logo.png"
        alt="ecentric Corporate Services"
        className="brand-logo-full"
        style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
      />
    </div>
  )
}

