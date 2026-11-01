export interface MapConfig {
  tileUrl: string
  attribution: string
  defaultCenter: [number, number]
  defaultZoom: number
  maxZoom: number
  minZoom: number
}

export const defaultMapConfig: MapConfig = {
  tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
  defaultCenter: [23.3441, 85.3096], // Ranchi District Headquarters, Jharkhand
  defaultZoom: 12,
  maxZoom: 19,
  minZoom: 6,
}

export const statusColors: Record<string, { bg: string; border: string; label: string; labelHi: string }> = {
  Ongoing: {
    bg: '#2563eb',
    border: '#1d4ed8',
    label: 'Ongoing',
    labelHi: 'चालू',
  },
  Completed: {
    bg: '#059669',
    border: '#047857',
    label: 'Completed',
    labelHi: 'पूर्ण',
  },
  Delayed: {
    bg: '#dc2626',
    border: '#b91c1c',
    label: 'Delayed',
    labelHi: 'विलंबित',
  },
  'Under Tender': {
    bg: '#d97706',
    border: '#b45309',
    label: 'Under Tender',
    labelHi: 'निविदा प्रक्रिया',
  },
  Sanctioned: {
    bg: '#7c3aed',
    border: '#6d28d9',
    label: 'Sanctioned',
    labelHi: 'स्वीकृत',
  },
}

