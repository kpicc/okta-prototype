import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { ProgressBar } from '../components/ProgressBar'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { TextLink } from '../components/TextLink'
import { GridOverlay } from '../components/GridOverlay'

import { Banner } from '../components/Banner'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

type View = 'choice' | 'link-form'

export function LinkServices() {
  const navigate = useNavigate()
  const { config, adminOpen, setAdminOpen } = useAdmin()
  const [view, setView] = useState<View>('choice')
  const [showGrid, setShowGrid] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'g' || e.key === 'G') setShowGrid(p => !p)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')

  const steps = [
    { label: 'Create your account', status: 'completed' as const },
    { label: 'Link your services', status: 'active' as const },
    { label: 'Set up multi-factor authentication', status: 'inactive' as const },
  ]

  const handleLinkContinue = () => {
    if (!phone || !pin) return
    navigate('/setup-mfa')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6' }}>
      <Banner />
      {showGrid && <GridOverlay />}
      {/* Logo row */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#fff', paddingTop: '24px', paddingBottom: '24px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/logo-black.svg" alt="Freedom Mobile" style={{ height: '32px', width: 'auto', cursor: 'pointer' }} onClick={() => navigate('/')} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button onClick={() => navigate(-1)} fullWidth={false} style={{ width: '60px', height: '40px' }}>Back</Button>
            <button onClick={() => setAdminOpen(!adminOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#6b7280', display: 'flex', alignItems: 'center' }}><Settings size={20} /></button>
          </div>
        </div>
      </div>
      <ProgressBar steps={steps} />

      <main className="ca-main" style={{ alignItems: 'flex-start' }}>
        {view === 'choice' ? (
          <div style={{ width: '100%', maxWidth: '960px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Choice cards */}
            <div className="ls-choice-grid">
              {/* Current Customer */}
              <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 1px 6px rgba(0,0,0,0.1)', padding: '40px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '16px' }}>
                    Current Customer
                  </p>
                  <h4 className="ca-heading">{config.linkServices.currentCustomerTitle}</h4>
                  <p className="ca-subtitle" style={{ color: '#4b5563', marginBottom: '32px' }}>
                    {config.linkServices.currentCustomerSubtitle}
                  </p>
                </div>
                <Button onClick={() => setView('link-form')} fullWidth>
                  {config.linkServices.currentCustomerButton}
                </Button>
              </div>

              {/* New Customer */}
              <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 1px 6px rgba(0,0,0,0.1)', padding: '40px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '16px' }}>
                    New Customer
                  </p>
                  <h4 className="ca-heading">{config.linkServices.newCustomerTitle}</h4>
                  <p className="ca-subtitle" style={{ color: '#4b5563', marginBottom: '32px' }}>
                    {config.linkServices.newCustomerSubtitle}
                  </p>
                </div>
                <Button onClick={() => navigate('/setup-mfa')} fullWidth>
                  {config.linkServices.newCustomerButton}
                </Button>
              </div>
            </div>

          </div>
        ) : (
          <div className="ca-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Title */}
              <div>
                <h4 className="ca-heading">{config.linkServices.heading}</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '2px', flexShrink: 0, backgroundColor: '#E87722', borderRadius: '9999px', alignSelf: 'stretch' }} />
                  <p className="ca-subtitle" style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                    {config.linkServices.subtitle}
                  </p>
                </div>
              </div>

              {/* Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputField label="Phone number" value={phone} onChange={setPhone} />
                <InputField label="Account PIN" type="password" value={pin} onChange={setPin} />
                <p className="ca-subtitle" style={{ color: '#6b7280', margin: 0 }}>
                  Don't know your PIN?{' '}
                  <TextLink showChevron={false}>Reset PIN</TextLink>
                </p>
              </div>

              <Button onClick={handleLinkContinue} fullWidth>
                {config.linkServices.buttonText}
              </Button>

            </div>
          </div>
        )}
      </main>
      {adminOpen && <AdminPanel />}
    </div>
  )
}
