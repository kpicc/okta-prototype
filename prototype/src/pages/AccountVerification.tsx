import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { Button } from '../components/Button'
import { TextLink } from '../components/TextLink'
import { Banner } from '../components/Banner'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

export function AccountVerification() {
  const navigate = useNavigate()
  const { config, adminOpen, setAdminOpen } = useAdmin()
  const c = config.accountVerification
  const [selected, setSelected] = useState<'phone' | 'email'>('phone')

  const handleContinue = () => {
    navigate('/sign-in-code', { state: { maskedContact: selected === 'phone' ? c.phoneMasked : c.emailMasked } })
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
              {c.showPhone && (
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #d1d5db', borderRadius: '12px', padding: '14px 16px', cursor: 'pointer', backgroundColor: '#fff' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px' }}>{c.phoneLabel}</p>
                    <p style={{ fontSize: '15px', color: '#111827', margin: 0, fontWeight: 500 }}>{c.phoneMasked}</p>
                  </div>
                  <input type="radio" name="verification" checked={selected === 'phone'} onChange={() => setSelected('phone')} style={{ width: '20px', height: '20px', accentColor: '#DB5C05', cursor: 'pointer' }} />
                </label>
              )}
              {c.showEmail && (
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #d1d5db', borderRadius: '12px', padding: '14px 16px', cursor: 'pointer', backgroundColor: '#fff' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px' }}>{c.emailLabel}</p>
                    <p style={{ fontSize: '15px', color: '#111827', margin: 0, fontWeight: 500 }}>{c.emailMasked}</p>
                  </div>
                  <input type="radio" name="verification" checked={selected === 'email'} onChange={() => setSelected('email')} style={{ width: '20px', height: '20px', accentColor: '#DB5C05', cursor: 'pointer' }} />
                </label>
              )}
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
