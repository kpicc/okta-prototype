import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { TextLink } from '../components/TextLink'
import { Settings } from 'lucide-react'
import { Banner } from '../components/Banner'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

export function SetupMFACode() {
  const navigate = useNavigate()
  const location = useLocation()
  const { config, adminOpen, setAdminOpen } = useAdmin()
  const [code, setCode] = useState('')


  const maskedContact = (location.state as { maskedContact?: string })?.maskedContact ?? '********94'

  const steps = [
    { label: 'Create your account', status: 'completed' as const },
    { label: 'Link your services', status: 'completed' as const },
    { label: 'Set up multi-factor authentication', status: 'active' as const },
  ]

  const handleResend = () => {}

  const handleContinue = () => {
    navigate('/success')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6' }}>
      <Banner />
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

      <main className="ca-main">
        <div className="ca-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Title */}
            <div>
              <h4 className="ca-heading">{config.setupMFA.heading}</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '2px', flexShrink: 0, backgroundColor: '#E87722', borderRadius: '9999px', alignSelf: 'stretch' }} />
                <p className="ca-subtitle" style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  We sent a security code to {maskedContact}
                </p>
              </div>
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <InputField
                label="Enter code"
                value={code}
                onChange={setCode}
              />
              <p className="ca-subtitle" style={{ color: '#4b5563', margin: 0 }}>
                Didn't receive the code?{' '}
                <TextLink onClick={handleResend} showChevron>Resend</TextLink>
              </p>
            </div>

            <Button onClick={handleContinue} fullWidth>
              {config.setupMFA.buttonText}
            </Button>
          </div>
        </div>
      </main>
      {adminOpen && <AdminPanel />}
    </div>
  )
}
