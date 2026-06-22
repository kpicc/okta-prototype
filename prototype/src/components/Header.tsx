import { Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  showBack?: boolean
  onSettingsClick?: () => void
}

export function Header({ showBack = false, onSettingsClick }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header
      className="w-full flex items-center justify-between bg-white border border-[#e4e4e4] shrink-0 md:px-[120px] px-4 py-4"
    >
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img src="/logo-black.svg" alt="Freedom Mobile" style={{ height: '36px', width: '100px' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center bg-[#db5c05] text-white hover:bg-[#c45204] transition-colors font-medium shrink-0"
            style={{
              width: '125px',
              padding: '12px 16px',
              borderRadius: '30px',
              fontSize: '16px',
              lineHeight: '24px',
            }}
          >
            Back
          </button>
        )}
        {onSettingsClick && (
          <button onClick={onSettingsClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#6b7280', display: 'none', alignItems: 'center' }}>
            <Settings size={20} />
          </button>
        )}
      </div>
    </header>
  )
}
