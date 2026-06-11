import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { Button } from '../components/Button'
import { InputField } from '../components/InputField'
import { Settings, ChevronDown } from 'lucide-react'
import { Banner } from '../components/Banner'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

type MFAMethod = 'sms' | 'email' | ''

export function SetupMFA() {
  const navigate = useNavigate()
  const { config, adminOpen, setAdminOpen } = useAdmin()
  const [selected, setSelected] = useState<MFAMethod>('')
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [contactVerified, setContactVerified] = useState(false)

  const selectedMethod = config.setupMFA.methods.find(m => m.value === selected)
  const selectedLabel = selectedMethod?.label

  function maskContact(value: string | undefined): string {
    if (!value) return ''
    const last2 = value.slice(-2)
    return '(***) ***-**' + last2
  }

  function maskEmail(value: string | undefined): string {
    if (!value) return ''
    const atIndex = value.indexOf('@')
    if (atIndex < 0) return maskContact(value)
    const local = value.slice(0, atIndex)
    const domain = value.slice(atIndex)
    if (local.length <= 2) return local + domain
    return local[0] + '*'.repeat(local.length - 2) + local[local.length - 1] + domain
  }

  const steps = [
    { label: 'Create your account', status: 'completed' as const },
    { label: 'Link your services', status: 'completed' as const },
    { label: 'Set up multi-factor authentication', status: 'active' as const },
  ]

  const handleContinue = () => {
    if (selected && !contactVerified) {
      setCodeError('The value entered does not match. Please try again.')
      return
    }
    const methodIndex = config.setupMFA.methods.findIndex(m => m.value === selected)
    const masked = selectedMethod?.contactValue
      ? (methodIndex === 1 ? maskEmail(selectedMethod.contactValue) : maskContact(selectedMethod.contactValue))
      : ''
    navigate('/setup-mfa-code', { state: { maskedContact: masked } })
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
                  {config.setupMFA.subtitle}
                </p>
              </div>
            </div>

            {/* MFA method dropdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
              <button
                type="button"
                onClick={() => setDropdownOpen(o => !o)}
                style={{
                  width: '100%', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 12px', borderRadius: '8px', border: '1px solid #d1d5db',
                  backgroundColor: '#fff', cursor: 'pointer', fontSize: '14px',
                  color: selected ? '#111827' : '#4b5563', textAlign: 'left',
                }}
              >
                <span>{selectedMethod ? (selectedMethod.contactValue ? (config.setupMFA.methods.indexOf(selectedMethod) === 1 ? maskEmail(selectedMethod.contactValue) : maskContact(selectedMethod.contactValue)) : selectedLabel) : 'Select a verification method'}</span>
                <ChevronDown size={16} style={{ color: '#DB5C05', flexShrink: 0, transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
              </button>
              {dropdownOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, overflow: 'hidden' }}>
                  {config.setupMFA.methods.map(m => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => { setSelected(m.value as MFAMethod); setCode(''); setDropdownOpen(false) }}
                      style={{
                        width: '100%', padding: '10px 12px', textAlign: 'left', background: selected === m.value ? '#f3f4f6' : '#fff',
                        border: 'none', cursor: 'pointer', fontSize: '14px', color: '#111827',
                        borderBottom: '1px solid #f3f4f6',
                      }}
                    >
                      {m.contactValue ? (config.setupMFA.methods.indexOf(m) === 1 ? maskEmail(m.contactValue) : maskContact(m.contactValue)) : m.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selected && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputField
                  label={config.setupMFA.methods.findIndex(m => m.value === selected) === 1 ? 'Re-enter selected email address' : 'Re-enter selected phone number'}
                  value={code}
                  onChange={v => {
                    setCode(v)
                    if (codeError) setCodeError('')
                    if (selectedMethod && v === selectedMethod.contactValue) {
                      setContactVerified(true)
                    } else {
                      setContactVerified(false)
                    }
                  }}
                  error={codeError}
                />
              </div>
            )}

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
