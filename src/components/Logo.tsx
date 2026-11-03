import Image from 'next/image'

export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="brand brand-compact" title="DMFT Work Monitoring Portal — Ramgarh">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-icon.png"
          alt="DMFT Work Monitoring Portal Icon"
          className="brand-logo-icon"
          width={38}
          height={38}
        />
      </div>
    )
  }

  return (
    <div className="brand brand-full" title="DMFT Work Monitoring Portal — Ramgarh">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/esampada-logo.png"
        alt="DMFT Work Monitoring Portal — Ramgarh"
        className="brand-logo-full"
        style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
      />
    </div>
  )
}

