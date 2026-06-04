import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { TextLink } from '../components/TextLink'
import { Banner } from '../components/Banner'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

export function SignInPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const { config, adminOpen, setAdminOpen } = useAdmin()
  const c = config.signInPassword
  const routeEmail = (location.state as { email?: string })?.email ?? ''
  const [email, setEmail] = useState(routeEmail)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleContinue = () => {
    if (password !== 'Fr3eD0m!') {
      setPasswordError('Incorrect password. Please try again.')
      return
    }
    setPasswordError('')
    navigate('/account-verification')
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
            <button onClick={() => setAdminOpen(!adminOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      <main className="ca-main">
        <div className="ca-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 className="ca-heading" style={{ marginBottom: 0 }}>{c.heading}</h4>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '3px', flexShrink: 0, borderRadius: '2px', alignSelf: 'stretch', backgroundColor: '#E87722' }} />
              <p className="ca-subtitle" style={{ color: '#4b5563', margin: 0 }}>{c.subtitle}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={routeEmail ? () => {} : setEmail}
                disabled={!!routeEmail}
              />
              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(val) => { setPassword(val); setPasswordError('') }}
                error={passwordError}
              />
              {c.showForgotPassword && <div><TextLink showChevron color="blue" onClick={() => navigate('/forgot-password')}>{c.forgotPasswordText}</TextLink></div>}
            </div>

            <Button onClick={handleContinue} fullWidth>{c.buttonText}</Button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              {c.showNeedHelp && <TextLink showChevron color="blue">{c.needHelpText}</TextLink>}
              {c.showNewToFreedom && <TextLink onClick={() => navigate('/create-account')} showChevron color="blue">{c.newToFreedomText}</TextLink>}
            </div>
          </div>
        </div>
      </main>
      {adminOpen && <AdminPanel />}
    </div>
  )
}
