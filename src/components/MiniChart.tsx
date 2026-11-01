export function MiniChart({ bars }: { bars: number[] }) {
  const points = bars.map((v, i) => `${i * 18},${46 - v / 2}`).join(' ')
  return (
    <svg className="spark" viewBox="0 0 108 48" preserveAspectRatio="none">
      <path d={`M0,46 L${points} L108,46 Z`} />
      <polyline points={points} />
    </svg>
  )
}

