import Image from 'next/image'

export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="brand brand-compact" title="Government Project Monitoring Dashboard">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-icon.png"
          alt="PMMS Icon"
          className="brand-logo-icon"
          width={38}
          height={38}
        />
      </div>
    )
  }

  return (
    <div className="brand brand-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Government Project Monitoring Dashboard"
        className="brand-logo-full"
      />
    </div>
  )
}

