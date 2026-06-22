import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, Check } from 'lucide-react'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { TextLink } from '../components/TextLink'
import { PasswordRequirements } from '../components/PasswordRequirements'
import { Banner } from '../components/Banner'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

type Step = 'email' | 'email-sent' | 'new-password' | 'success'

export function ForgotPassword() {
  const navigate = useNavigate()
  const { adminOpen, setAdminOpen } = useAdmin()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmError, setConfirmError] = useState('')

  const allReqsMet =
    newPassword.length >= 8 &&
    /[^a-zA-Z0-9]/.test(newPassword) &&
    /[A-Z]/.test(newPassword) &&
    /[0-9]/.test(newPassword) &&
    /[a-z]/.test(newPassword)

  const handleNewPasswordContinue = () => {
    if (!allReqsMet) return
    if (newPassword !== confirmPassword) {
      setConfirmError('Passwords do not match. Please try again.')
      return
    }
    setConfirmError('')
    setStep('success')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6' }}>
      <Banner />
      {/* Logo row */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#fff', paddingTop: '24px', paddingBottom: '24px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/logo-black.svg" alt="Freedom Mobile" style={{ height: '28px', width: 'auto', cursor: 'pointer', flexShrink: 0 }} onClick={() => navigate('/')} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button onClick={() => navigate(-1)} fullWidth={false} style={{ width: '60px', height: '40px' }}>Back</Button>
            <button onClick={() => setAdminOpen(!adminOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#6b7280', display: 'none', alignItems: 'center' }}>
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      <main className="ca-main">
        {step === 'email' && (
          <div className="ca-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 className="ca-heading">Password reset</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '2px', flexShrink: 0, backgroundColor: '#E87722', borderRadius: '9999px', alignSelf: 'stretch' }} />
                  <p className="ca-subtitle" style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>Forgot your password? No problem, let's get you a new one.</p>
                </div>
              </div>
              <InputField label="Email" type="email" value={email} onChange={setEmail} />
              <Button onClick={() => { if (email) setStep('email-sent') }} fullWidth>Continue</Button>
              <div style={{ textAlign: 'center' }}>
                <TextLink showChevron={false} color="blue" onClick={() => navigate('/sign-in-password')}>Cancel</TextLink>
              </div>
            </div>
          </div>
        )}

        {step === 'email-sent' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '480px' }}>
            <div className="ca-card" onClick={() => setStep('new-password')} style={{ cursor: 'default', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={28} color="#16a34a" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="ca-heading" style={{ marginBottom: '8px' }}>Got it! Now check your email.</h4>
                  <p className="ca-subtitle" style={{ color: '#4b5563', margin: 0 }}>We sent you an email, follow the instructions to reset your password.</p>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', margin: 0 }}>
              🧪 <strong>Prototype note:</strong> In production the user clicks a link in their email to continue. Click anywhere on the card above to simulate this and progress to the next step.
            </p>
          </div>
        )}

        {step === 'new-password' && (
          <div className="ca-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 className="ca-heading">Password reset</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '2px', flexShrink: 0, backgroundColor: '#E87722', borderRadius: '9999px', alignSelf: 'stretch' }} />
                  <p className="ca-subtitle" style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>Please update to a more secure password.</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputField label="New password" type="password" value={newPassword} onChange={(v) => { setNewPassword(v); setConfirmError('') }} />
                <InputField label="Confirm password" type="password" value={confirmPassword} onChange={(v) => { setConfirmPassword(v); setConfirmError('') }} error={confirmError} />
                <PasswordRequirements password={newPassword} email={email} />
              </div>
              <Button onClick={handleNewPasswordContinue} fullWidth>Continue</Button>
              <div style={{ textAlign: 'center' }}>
                <TextLink showChevron={false} color="blue" onClick={() => navigate('/sign-in-password')}>Cancel</TextLink>
              </div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="ca-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={28} color="#16a34a" strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="ca-heading" style={{ marginBottom: '8px' }}>You're all set!</h4>
                <p className="ca-subtitle" style={{ color: '#4b5563', margin: 0 }}>Your password has been reset.</p>
              </div>
              <Button onClick={() => navigate('/sign-in-password')} fullWidth>Continue to sign in</Button>
            </div>
          </div>
        )}
      </main>
      {adminOpen && <AdminPanel />}
    </div>
  )
}
