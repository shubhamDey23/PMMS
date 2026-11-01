import type { Project } from '@/types/project'

export function Status({ value }: { value: Project['status'] }) {
  return (
    <span className={`status-badge ${value.toLowerCase()}`}>
      <i />
      {value}
    </span>
  )
}

