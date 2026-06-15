import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export function Banner() {
  const { config } = useAdmin()
  const [dismissed, setDismissed] = useState(false)

  if (!config.bannerVisible || dismissed) return null

  return (
    <div style={{ backgroundColor: '#2F7DC1', color: '#fff', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px 48px 12px 16px', fontSize: '14px', position: 'relative', boxSizing: 'border-box' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: '16px', height: '16px', marginTop: '2px' }}><AlertTriangle size={16} /></span>
      <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: '16px', height: '16px' }}>{config.bannerText}</span>
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
