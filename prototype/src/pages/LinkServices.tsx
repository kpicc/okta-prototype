import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, Check } from 'lucide-react'
import { ProgressBar } from '../components/ProgressBar'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { TextLink } from '../components/TextLink'
import { GridOverlay } from '../components/GridOverlay'

import { Banner } from '../components/Banner'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

type View = 'choice' | 'link-form' | 'pin-phone' | 'pin-email-sent' | 'pin-new' | 'pin-success'

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
  const [pinPhone, setPinPhone] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [pinError, setPinError] = useState('')

  const steps = [
    { label: 'Create your account', status: 'completed' as const },
    { label: 'Link your services', status: 'active' as const },
    { label: 'Set up multi-factor authentication', status: 'inactive' as const },
  ]

  const handleLinkContinue = () => {
    if (!phone || !pin) return
    navigate('/setup-mfa')
  }

  const handlePinPhoneContinue = () => {
    if (!pinPhone) return
    setView('pin-email-sent')
  }

  const handleNewPinContinue = () => {
    if (!newPin || !confirmPin) return
    if (newPin !== confirmPin) {
      setPinError('PINs do not match. Please try again.')
      return
    }
    setPinError('')
    setView('pin-success')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6' }}>
      <Banner />
      {showGrid && <GridOverlay />}
      {/* Logo row */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#fff', paddingTop: '24px', paddingBottom: '24px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/logo-black.svg" alt="Freedom Mobile" style={{ height: '28px', width: 'auto', cursor: 'pointer', flexShrink: 0 }} onClick={() => navigate('/')} />
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
              <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 1px 6px rgba(0,0,0,0.1)', padding: 'clamp(24px, 5vw, 40px)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ minHeight: '160px' }}>
                  <p className="ls-eyebrow" style={{ fontFamily: 'Ambra Sans Text Medium, sans-serif', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: '#DB5C05', marginBottom: '16px' }}>
                    Current Customer
                  </p>
                  <h3 className="ca-heading ls-card-heading">{config.linkServices.currentCustomerTitle}</h3>
                  <p className="ca-subtitle" style={{ color: '#4b5563', marginBottom: '26px' }}>
                    {config.linkServices.currentCustomerSubtitle}
                  </p>
                </div>
                <Button onClick={() => setView('link-form')} fullWidth>
                  {config.linkServices.currentCustomerButton}
                </Button>
                <div style={{ textAlign: 'center', marginTop: '18px' }}>
                  <TextLink showChevron color="blue" onClick={() => {}}>Activate SIM</TextLink>
                </div>
              </div>

              {/* New Customer */}
              <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 1px 6px rgba(0,0,0,0.1)', padding: 'clamp(24px, 5vw, 40px)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ minHeight: '160px' }}>
                  <p className="ls-eyebrow" style={{ fontFamily: 'Ambra Sans Text Medium, sans-serif', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: '#DB5C05', marginBottom: '16px' }}>
                    New Customer
                  </p>
                  <h3 className="ca-heading ls-card-heading">{config.linkServices.newCustomerTitle}</h3>
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
        ) : view === 'link-form' ? (
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
                  <TextLink showChevron={false} onClick={() => { setPinPhone(''); setView('pin-phone') }}>Reset PIN</TextLink>
                </p>
              </div>

              <Button onClick={handleLinkContinue} fullWidth>
                {config.linkServices.buttonText}
              </Button>
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <TextLink showChevron={false} color="blue" onClick={() => {}}>Activate SIM</TextLink>
              </div>

            </div>
          </div>
        ) : view === 'pin-phone' ? (
          <div className="ca-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 className="ca-heading">PIN Reset</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '2px', flexShrink: 0, backgroundColor: '#E87722', borderRadius: '9999px', alignSelf: 'stretch' }} />
                  <p className="ca-subtitle" style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>Forgot your PIN? No problem, let's get you a new one.</p>
                </div>
              </div>
              <InputField label="Phone number" type="tel" value={pinPhone} onChange={setPinPhone} />
              <Button onClick={handlePinPhoneContinue} fullWidth>Continue</Button>
              <div style={{ textAlign: 'center' }}>
                <TextLink showChevron={false} color="blue" onClick={() => setView('link-form')}>Cancel</TextLink>
              </div>
            </div>
          </div>
        ) : view === 'pin-email-sent' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '480px' }}>
            <div className="ca-card" onClick={() => setView('pin-new')} style={{ cursor: 'default', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={28} color="#16a34a" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="ca-heading" style={{ marginBottom: '8px' }}>Got it! Now check your email.</h4>
                  <p className="ca-subtitle" style={{ color: '#4b5563', margin: 0 }}>We sent you an email, follow the instructions to reset your PIN.</p>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', margin: 0 }}>
              🧪 <strong>Prototype note:</strong> In production the user clicks a link in their email to continue. Click anywhere on the card above to simulate this and progress to the next step.
            </p>
          </div>
        ) : view === 'pin-new' ? (
          <div className="ca-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 className="ca-heading">PIN Reset</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '2px', flexShrink: 0, backgroundColor: '#E87722', borderRadius: '9999px', alignSelf: 'stretch' }} />
                  <p className="ca-subtitle" style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>Please update to a more secure PIN. Avoid weak combinations such as 1111, 1234, or the last 4-digits of your phone number.</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputField label="New PIN" type="password" value={newPin} onChange={(v) => { setNewPin(v); setPinError('') }} />
                <InputField label="Confirm PIN" type="password" value={confirmPin} onChange={(v) => { setConfirmPin(v); setPinError('') }} error={pinError} />
              </div>
              <Button onClick={handleNewPinContinue} fullWidth>Continue</Button>
            </div>
          </div>
        ) : view === 'pin-success' ? (
          <div className="ca-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={28} color="#16a34a" strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="ca-heading" style={{ marginBottom: '8px' }}>You're all set!</h4>
                <p className="ca-subtitle" style={{ color: '#4b5563', margin: 0 }}>Success! Your PIN has been reset.</p>
              </div>
              <Button onClick={() => { setNewPin(''); setConfirmPin(''); setPin(''); setView('link-form') }} fullWidth>Continue</Button>
            </div>
          </div>
        ) : null}
      </main>
      {adminOpen && <AdminPanel />}
    </div>
  )
}
