import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export function Banner() {
  const { config } = useAdmin()
  const [dismissed, setDismissed] = useState(false)

  if (!config.bannerVisible || dismissed) return null

  return (
    <div style={{ backgroundColor: '#2F7DC1', color: '#fff', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '10px', padding: '12px 48px 12px 16px', fontSize: '14px', position: 'relative', boxSizing: 'border-box' }}>
      <AlertTriangle size={16} style={{ flexShrink: 0 }} />
      <span>{config.bannerText}</span>
      <button
        onClick={() => setDismissed(true)}
        style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  )
}
