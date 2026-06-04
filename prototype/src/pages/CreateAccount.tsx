import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { PasswordRequirements } from '../components/PasswordRequirements'
import { AlertTriangle, Settings } from 'lucide-react'
import { Banner } from '../components/Banner'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

export function CreateAccount() {
  const navigate = useNavigate()
  const { config, adminOpen, setAdminOpen } = useAdmin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false)

  const steps = [
    { label: 'Create your account', status: 'active' as const },
    { label: 'Link your services', status: 'inactive' as const },
    { label: 'Set up multi-factor authentication', status: 'inactive' as const },
  ]

  const isPasswordValid =
    password.length >= 8 &&
    /[^a-zA-Z0-9]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[a-z]/.test(password)

  const handleContinue = () => {
    if (!email) {
      setEmailError('Please enter your email')
      return
    }
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address')
      return
    }
    if (email === 'test@test.com') {
      setShowDuplicateWarning(true)
      return
    }
    if (!isPasswordValid) return
    setEmailError('')
    setShowDuplicateWarning(false)
    navigate('/verify-email', { state: { email } })
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
              <h4 className="ca-heading">
                {config.createAccount.heading}
              </h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '2px', flexShrink: 0, backgroundColor: '#E87722', borderRadius: '9999px', alignSelf: 'stretch' }} />
                <p className="ca-subtitle" style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  {config.createAccount.subtitle}
                </p>
              </div>
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(val) => {
                  setEmail(val)
                  setEmailError('')
                  setShowDuplicateWarning(false)
                }}
                error={emailError}
              />

              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(val) => {
                  setPassword(val)
                  if (passwordError) setPasswordError('')
                }}
                onBlur={() => {
                  if (password && !isPasswordValid) setPasswordError('Password does not meet requirements')
                }}
                error={passwordError}
              />

              {showDuplicateWarning && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#dc2626', fontSize: '14px' }}>
                  <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Looks like this email is linked to another account.</span>
                </div>
              )}

              <PasswordRequirements password={password} email={email} />
            </div>

            <Button onClick={handleContinue} fullWidth>
              {showDuplicateWarning ? 'Return to sign in' : config.createAccount.buttonText}
            </Button>
          </div>
        </div>
      </main>
      {adminOpen && <AdminPanel />}
    </div>
  )
}
