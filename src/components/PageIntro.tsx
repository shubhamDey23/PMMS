export function PageIntro({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow: string
  title: string
  subtitle: string
  actions?: React.ReactNode
}) {
  return (
    <div className="page-intro">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {actions || (
        <div className="updated">
          <span>
            <i />
            Live data
          </span>
          <small>Updated today, 10:42 AM</small>
        </div>
      )}
    </div>
  )
}

