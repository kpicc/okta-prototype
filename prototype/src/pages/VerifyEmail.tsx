import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { TextLink } from '../components/TextLink'
import { CheckCircle, Settings } from 'lucide-react'
import { Banner } from '../components/Banner'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

export function VerifyEmail() {
  const navigate = useNavigate()
  const location = useLocation()
  const { config, adminOpen, setAdminOpen } = useAdmin()
  const email = (location.state as { email?: string })?.email || 'e***l@address.com'
  const maskedEmail = email.includes('@')
    ? `${email[0]}***${email[email.indexOf('@') - 1]}@${email.split('@')[1]}`
    : email

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [resent, setResent] = useState(false)

  const steps = [
    { label: 'Create your account', status: 'active' as const },
    { label: 'Link your services', status: 'inactive' as const },
    { label: 'Set up multi-factor authentication', status: 'inactive' as const },
  ]

  const handleContinue = () => {
    if (!code) {
      setError('Please enter the verification code')
      return
    }
    if (code.length < 6) {
      setError('Code must be 6 digits')
      return
    }
    if (code === '000000') {
      setError('Invalid code')
      return
    }
    setError('')
    navigate('/link-services')
  }

  const handleResend = () => {
    setResent(true)
    setError('')
    setTimeout(() => setResent(false), 3000)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6' }}>
      <Banner />
      {/* Logo row */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#fff', paddingTop: '24px', paddingBottom: '24px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/logo-black.svg" alt="Freedom Mobile" style={{ height: '28px', width: 'auto', cursor: 'pointer', flexShrink: 0 }} onClick={() => navigate('/')} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
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
              <h4 className="ca-heading">
                {config.verifyEmail.heading}
              </h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '2px', flexShrink: 0, backgroundColor: '#E87722', borderRadius: '9999px', alignSelf: 'stretch' }} />
                <p className="ca-subtitle" style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  {config.verifyEmail.subtitle} {maskedEmail}
                </p>
              </div>
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <InputField
                label="Enter code"
                value={code}
                onChange={(val) => {
                  setCode(val.replace(/\D/g, '').slice(0, 6))
                  setError('')
                }}
                error={error}
              />

              {resent && (
                <div className="ca-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a' }}>
                  <CheckCircle size={15} style={{ flexShrink: 0 }} />
                  <span>Code resent</span>
                </div>
              )}

              <p className="ca-subtitle" style={{ color: '#4b5563', margin: 0 }}>
                {config.verifyEmail.resendText}{' '}
                <TextLink onClick={handleResend} showChevron>{config.verifyEmail.resendLinkText}</TextLink>
              </p>
            </div>

            <Button onClick={handleContinue} fullWidth>{config.verifyEmail.buttonText}</Button>
          </div>
        </div>
      </main>
      {adminOpen && <AdminPanel />}
    </div>
  )
}
