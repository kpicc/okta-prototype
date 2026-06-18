import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { CheckCircle, Settings } from 'lucide-react'
import { Banner } from '../components/Banner'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

export function Success() {
  const navigate = useNavigate()
  const { config, adminOpen, setAdminOpen } = useAdmin()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6' }}>
      <Banner />
      {/* Logo row */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#fff', paddingTop: '24px', paddingBottom: '24px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/logo-black.svg" alt="Freedom Mobile" style={{ height: '28px', width: 'auto', cursor: 'pointer', flexShrink: 0 }} onClick={() => navigate('/')} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button onClick={() => navigate(-1)} fullWidth={false} style={{ width: '60px', height: '40px' }}>Back</Button>
            <button onClick={() => setAdminOpen(!adminOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      <ProgressBar steps={[
        { label: 'Create account', status: 'completed' as const },
        { label: 'Link services', status: 'completed' as const },
        { label: 'Set up MFA', status: 'completed' as const },
      ]} />

      <main className="ca-main">
        <div className="ca-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={32} style={{ color: '#008000' }} />
            </div>
            <div>
              <h4 className="ca-heading" style={{ marginBottom: '8px' }}>{config.success.heading}</h4>
              <p className="ca-subtitle" style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                {config.success.subtitle}
              </p>
            </div>
            <Button onClick={() => navigate('/overview')} fullWidth>
              {config.success.buttonText}
            </Button>
          </div>
        </div>
      </main>
      {adminOpen && <AdminPanel />}
    </div>
  )
}
