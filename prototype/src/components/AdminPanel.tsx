import { useRef, useState } from 'react'
import { Plus, ChevronDown, ChevronUp, X } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import type { FormField, FieldType, Slide } from '../context/AdminContext'

const FIELD_TYPES: FieldType[] = ['text', 'email', 'password', 'tel', 'dropdown', 'radio']

function uid() { return Math.random().toString(36).slice(2) }

const SECTIONS = ['Alert Banner', 'Sign-In Form', 'Footer', 'Error Alert', 'Form Fields', 'Carousel Slides', 'Create Account', 'Verify Email', 'Link Services', 'Setup MFA', 'Success', 'Sign-In Password', 'Account Verification', 'Sign-In Code']
const SECTION_ICONS: Record<string, string> = {
  'Alert Banner': '🔔',
  'Sign-In Form': '📝',
  'Footer': '📄',
  'Error Alert': '⚠️',
  'Form Fields': '🗂️',
  'Carousel Slides': '🖼️',
  'Create Account': '👤',
  'Verify Email': '✉️',
  'Link Services': '🔗',
  'Setup MFA': '🔐',
  'Success': '✅',
  'Sign-In Password': '🔑',
  'Account Verification': '📱',
  'Sign-In Code': '🔢',
}

export function AdminPanel() {
  const { config, setConfig, setAdminOpen } = useAdmin()
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Alert Banner': true, 'Sign-In Form': false, 'Footer': false,
    'Error Alert': false, 'Form Fields': false, 'Carousel Slides': false,
    'Create Account': false, 'Verify Email': false, 'Link Services': false,
    'Setup MFA': false, 'Success': false,
    'Sign-In Password': false, 'Account Verification': false, 'Sign-In Code': false,
  })

  function toggleSection(title: string) {
    setOpenSections(s => ({ ...s, [title]: !s[title] }))
  }

  function update(patch: Partial<typeof config>) { setConfig({ ...config, ...patch }) }

  function updateField(id: string, patch: Partial<FormField>) {
    setConfig({ ...config, fields: config.fields.map(f => f.id === id ? { ...f, ...patch } : f) })
  }
  function addField() {
    setConfig({ ...config, fields: [...config.fields, { id: uid(), label: 'New Field', type: 'text' }] })
  }
  function removeField(id: string) {
    setConfig({ ...config, fields: config.fields.filter(f => f.id !== id) })
  }

  function updateSlide(id: string, patch: Partial<Slide>) {
    setConfig({ ...config, slides: config.slides.map(s => s.id === id ? { ...s, ...patch } : s) })
  }
  function addSlide() {
    setConfig({
      ...config, slides: [...config.slides, {
        id: uid(),
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
        label: 'New Slide', title: 'Slide title ', highlight: 'highlight text.', body: 'Slide body text.',
      }],
    })
  }
  function removeSlide(id: string) {
    if (config.slides.length <= 1) return
    setConfig({ ...config, slides: config.slides.filter(s => s.id !== id) })
  }
  function moveSlide(id: string, dir: -1 | 1) {
    const idx = config.slides.findIndex(s => s.id === id)
    const next = idx + dir
    if (next < 0 || next >= config.slides.length) return
    const slides = [...config.slides];
    [slides[idx], slides[next]] = [slides[next], slides[idx]]
    setConfig({ ...config, slides })
  }
  function handleImageUpload(slideId: string, file: File) {
    updateSlide(slideId, { image: URL.createObjectURL(file) })
  }

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: '420px',
      backgroundColor: '#fff', color: '#111',
      display: 'flex', flexDirection: 'column', zIndex: 1000,
      boxShadow: '-4px 0 32px rgba(0,0,0,0.18)', fontFamily: 'inherit',
    }}>
      {/* Header */}
      <div style={{ backgroundColor: '#0d1f3c', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <span style={{ fontSize: '20px' }}>⚙️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Page Editor</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>Edit values to see changes in real time</div>
        </div>
        <button onClick={() => setAdminOpen(false)} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
          <X size={16} />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f5f6f7' }}>

        {SECTIONS.map(title => (
          <div key={title} style={{ borderBottom: '1px solid #e0e0e0' }}>
            {/* Section header */}
            <button
              onClick={() => toggleSection(title)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ fontSize: '16px' }}>{SECTION_ICONS[title]}</span>
              <span style={{ flex: 1, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444' }}>{title}</span>
              {openSections[title]
                ? <ChevronUp size={16} style={{ color: '#888' }} />
                : <ChevronDown size={16} style={{ color: '#888' }} />}
            </button>

            {/* Section body */}
            {openSections[title] && (
              <div style={{ padding: '4px 20px 20px', backgroundColor: '#fff' }}>

                {title === 'Alert Banner' && <>
                  <PRow label="Show Banner">
                    <Toggle checked={config.bannerVisible} onChange={v => update({ bannerVisible: v })} />
                  </PRow>
                  <PRow label="Banner Text">
                    <PTextarea value={config.bannerText} onChange={v => update({ bannerText: v })} />
                  </PRow>
                </>}

                {title === 'Sign-In Form' && <>
                  <PRow label="Heading"><PInput value={config.heading} onChange={v => update({ heading: v })} /></PRow>
                  <PRow label="Subtitle"><PTextarea value={config.subtitleText} onChange={v => update({ subtitleText: v })} /></PRow>
                  <PRow label="Subtitle Link"><PInput value={config.subtitleLinkText} onChange={v => update({ subtitleLinkText: v })} /></PRow>
                  <PRow label="Button Text (Desktop)"><PInput value={config.buttonText} onChange={v => update({ buttonText: v })} /></PRow>
                  <PRow label="Button Text (Mobile)"><PInput value={config.mobileButtonText ?? 'Sign in'} onChange={v => update({ mobileButtonText: v })} /></PRow>
                  <PRow label="New User Text"><PInput value={config.newToFreedomText} onChange={v => update({ newToFreedomText: v })} /></PRow>
                  <PRow label="New User Link"><PInput value={config.newToFreedomLinkText} onChange={v => update({ newToFreedomLinkText: v })} /></PRow>
                </>}

                {title === 'Footer' && <>
                  <PRow label="Footer Text"><PInput value={config.footerText} onChange={v => update({ footerText: v })} /></PRow>
                  <PRow label="Footer Link"><PTextarea value={config.footerLinkText} onChange={v => update({ footerLinkText: v })} /></PRow>
                </>}

                {title === 'Error Alert' && <>
                  <PRow label="Message"><PTextarea value={config.alertMessage} onChange={v => update({ alertMessage: v })} /></PRow>
                  <PRow label="Link 1 Text"><PInput value={config.alertLink1Text} onChange={v => update({ alertLink1Text: v })} /></PRow>
                  <PRow label="Link 2 Text"><PInput value={config.alertLink2Text} onChange={v => update({ alertLink2Text: v })} /></PRow>
                </>}

                {title === 'Form Fields' && <>
                  {config.fields.map((field, i) => (
                    <Card key={field.id} label={`Field ${i + 1}`} onRemove={() => removeField(field.id)}>
                      <PRow label="Label"><PInput value={field.label} onChange={v => updateField(field.id, { label: v })} /></PRow>
                      <PRow label="Type">
                        <select
                          value={field.type}
                          onChange={e => updateField(field.id, { type: e.target.value as FieldType })}
                          style={selectStyle}
                        >
                          {FIELD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </PRow>
                      {(field.type === 'dropdown' || field.type === 'radio') && (
                        <PRow label="Options (one per line)">
                          <PTextarea
                            value={(field.options || []).join('\n')}
                            onChange={v => updateField(field.id, { options: v.split('\n').filter(Boolean) })}
                            rows={3}
                          />
                        </PRow>
                      )}
                    </Card>
                  ))}
                  <AddBtn onClick={addField} label="Add Field" />
                </>}

                {title === 'Create Account' && <>
                  <PRow label="Heading"><PInput value={config.createAccount.heading} onChange={v => update({ createAccount: { ...config.createAccount, heading: v } })} /></PRow>
                  <PRow label="Subtitle"><PTextarea value={config.createAccount.subtitle} onChange={v => update({ createAccount: { ...config.createAccount, subtitle: v } })} /></PRow>
                  <PRow label="Button Text"><PInput value={config.createAccount.buttonText} onChange={v => update({ createAccount: { ...config.createAccount, buttonText: v } })} /></PRow>
                </>}

                {title === 'Verify Email' && <>
                  <PRow label="Heading"><PInput value={config.verifyEmail.heading} onChange={v => update({ verifyEmail: { ...config.verifyEmail, heading: v } })} /></PRow>
                  <PRow label="Subtitle"><PInput value={config.verifyEmail.subtitle} onChange={v => update({ verifyEmail: { ...config.verifyEmail, subtitle: v } })} /></PRow>
                  <PRow label="Button Text"><PInput value={config.verifyEmail.buttonText} onChange={v => update({ verifyEmail: { ...config.verifyEmail, buttonText: v } })} /></PRow>
                  <PRow label="Resend Text"><PInput value={config.verifyEmail.resendText} onChange={v => update({ verifyEmail: { ...config.verifyEmail, resendText: v } })} /></PRow>
                  <PRow label="Resend Link Text"><PInput value={config.verifyEmail.resendLinkText} onChange={v => update({ verifyEmail: { ...config.verifyEmail, resendLinkText: v } })} /></PRow>
                </>}

                {title === 'Link Services' && <>
                  <PRow label="Heading"><PInput value={config.linkServices.heading} onChange={v => update({ linkServices: { ...config.linkServices, heading: v } })} /></PRow>
                  <PRow label="Subtitle"><PTextarea value={config.linkServices.subtitle} onChange={v => update({ linkServices: { ...config.linkServices, subtitle: v } })} /></PRow>
                  <PRow label="Button Text"><PInput value={config.linkServices.buttonText} onChange={v => update({ linkServices: { ...config.linkServices, buttonText: v } })} /></PRow>
                  <PRow label="Current Customer Title"><PInput value={config.linkServices.currentCustomerTitle} onChange={v => update({ linkServices: { ...config.linkServices, currentCustomerTitle: v } })} /></PRow>
                  <PRow label="Current Customer Subtitle"><PInput value={config.linkServices.currentCustomerSubtitle} onChange={v => update({ linkServices: { ...config.linkServices, currentCustomerSubtitle: v } })} /></PRow>
                  <PRow label="Current Customer Button"><PInput value={config.linkServices.currentCustomerButton} onChange={v => update({ linkServices: { ...config.linkServices, currentCustomerButton: v } })} /></PRow>
                  <PRow label="New Customer Title"><PInput value={config.linkServices.newCustomerTitle} onChange={v => update({ linkServices: { ...config.linkServices, newCustomerTitle: v } })} /></PRow>
                  <PRow label="New Customer Subtitle"><PInput value={config.linkServices.newCustomerSubtitle} onChange={v => update({ linkServices: { ...config.linkServices, newCustomerSubtitle: v } })} /></PRow>
                  <PRow label="New Customer Button"><PInput value={config.linkServices.newCustomerButton} onChange={v => update({ linkServices: { ...config.linkServices, newCustomerButton: v } })} /></PRow>
                </>}

                {title === 'Setup MFA' && <>
                  <PRow label="Heading"><PInput value={config.setupMFA.heading} onChange={v => update({ setupMFA: { ...config.setupMFA, heading: v } })} /></PRow>
                  <PRow label="Subtitle"><PTextarea value={config.setupMFA.subtitle} onChange={v => update({ setupMFA: { ...config.setupMFA, subtitle: v } })} /></PRow>
                  <PRow label="Button Text"><PInput value={config.setupMFA.buttonText} onChange={v => update({ setupMFA: { ...config.setupMFA, buttonText: v } })} /></PRow>
                  <PRow label="Skip Text"><PInput value={config.setupMFA.skipText} onChange={v => update({ setupMFA: { ...config.setupMFA, skipText: v } })} /></PRow>
                  {config.setupMFA.methods.map((method, i) => (
                    <Card
                      key={method.value}
                      label={`Method ${i + 1}`}
                      onRemove={config.setupMFA.methods.length > 1 ? () => update({ setupMFA: { ...config.setupMFA, methods: config.setupMFA.methods.filter((_, idx) => idx !== i) } }) : undefined}
                    >
                      <PRow label="Label">
                        <PInput
                          value={method.label}
                          onChange={v => update({ setupMFA: { ...config.setupMFA, methods: config.setupMFA.methods.map((m, idx) => idx === i ? { ...m, label: v } : m) } })}
                        />
                      </PRow>
                      <PRow label="Contact Value">
                        <PInput
                          value={method.contactValue}
                          onChange={v => update({ setupMFA: { ...config.setupMFA, methods: config.setupMFA.methods.map((m, idx) => idx === i ? { ...m, contactValue: v } : m) } })}
                        />
                      </PRow>
                    </Card>
                  ))}
                  <AddBtn onClick={() => update({ setupMFA: { ...config.setupMFA, methods: [...config.setupMFA.methods, { value: uid(), label: 'New option', contactValue: '' }] } })} label="Add Method" />
                </>}

                {title === 'Sign-In Password' && <>
                  <PRow label="Heading"><PInput value={config.signInPassword.heading} onChange={v => update({ signInPassword: { ...config.signInPassword, heading: v } })} /></PRow>
                  <PRow label="Subtitle"><PTextarea value={config.signInPassword.subtitle} onChange={v => update({ signInPassword: { ...config.signInPassword, subtitle: v } })} /></PRow>
                  <PRow label="Button Text"><PInput value={config.signInPassword.buttonText} onChange={v => update({ signInPassword: { ...config.signInPassword, buttonText: v } })} /></PRow>
                  <PRow label="Show Forgot Password">
                    <Toggle checked={config.signInPassword.showForgotPassword} onChange={v => update({ signInPassword: { ...config.signInPassword, showForgotPassword: v } })} />
                  </PRow>
                  {config.signInPassword.showForgotPassword && <PRow label="Forgot Password Text"><PInput value={config.signInPassword.forgotPasswordText} onChange={v => update({ signInPassword: { ...config.signInPassword, forgotPasswordText: v } })} /></PRow>}
                  <PRow label="Show Need Help">
                    <Toggle checked={config.signInPassword.showNeedHelp} onChange={v => update({ signInPassword: { ...config.signInPassword, showNeedHelp: v } })} />
                  </PRow>
                  {config.signInPassword.showNeedHelp && <PRow label="Need Help Text"><PInput value={config.signInPassword.needHelpText} onChange={v => update({ signInPassword: { ...config.signInPassword, needHelpText: v } })} /></PRow>}
                  <PRow label="Show New to Freedom">
                    <Toggle checked={config.signInPassword.showNewToFreedom} onChange={v => update({ signInPassword: { ...config.signInPassword, showNewToFreedom: v } })} />
                  </PRow>
                  {config.signInPassword.showNewToFreedom && <PRow label="New to Freedom Text"><PInput value={config.signInPassword.newToFreedomText} onChange={v => update({ signInPassword: { ...config.signInPassword, newToFreedomText: v } })} /></PRow>}
                </>
                }

                {title === 'Account Verification' && <>
                  <PRow label="Heading"><PInput value={config.accountVerification.heading} onChange={v => update({ accountVerification: { ...config.accountVerification, heading: v } })} /></PRow>
                  <PRow label="Subtitle"><PTextarea value={config.accountVerification.subtitle} onChange={v => update({ accountVerification: { ...config.accountVerification, subtitle: v } })} /></PRow>
                  <PRow label="Button Text"><PInput value={config.accountVerification.buttonText} onChange={v => update({ accountVerification: { ...config.accountVerification, buttonText: v } })} /></PRow>
                  <PRow label="Show Phone Option">
                    <Toggle checked={config.accountVerification.showPhone} onChange={v => update({ accountVerification: { ...config.accountVerification, showPhone: v } })} />
                  </PRow>
                  {config.accountVerification.showPhone && <>
                    <PRow label="Phone Label"><PInput value={config.accountVerification.phoneLabel} onChange={v => update({ accountVerification: { ...config.accountVerification, phoneLabel: v } })} /></PRow>
                    <PRow label="Phone Masked Value"><PInput value={config.accountVerification.phoneMasked} onChange={v => update({ accountVerification: { ...config.accountVerification, phoneMasked: v } })} /></PRow>
                  </>}
                  <PRow label="Show Email Option">
                    <Toggle checked={config.accountVerification.showEmail} onChange={v => update({ accountVerification: { ...config.accountVerification, showEmail: v } })} />
                  </PRow>
                  {config.accountVerification.showEmail && <>
                    <PRow label="Email Label"><PInput value={config.accountVerification.emailLabel} onChange={v => update({ accountVerification: { ...config.accountVerification, emailLabel: v } })} /></PRow>
                    <PRow label="Email Masked Value"><PInput value={config.accountVerification.emailMasked} onChange={v => update({ accountVerification: { ...config.accountVerification, emailMasked: v } })} /></PRow>
                  </>}
                  <PRow label="Show Need Help">
                    <Toggle checked={config.accountVerification.showNeedHelp} onChange={v => update({ accountVerification: { ...config.accountVerification, showNeedHelp: v } })} />
                  </PRow>
                  {config.accountVerification.showNeedHelp && <PRow label="Need Help Text"><PInput value={config.accountVerification.needHelpText} onChange={v => update({ accountVerification: { ...config.accountVerification, needHelpText: v } })} /></PRow>}
                  <PRow label="Show New to Freedom">
                    <Toggle checked={config.accountVerification.showNewToFreedom} onChange={v => update({ accountVerification: { ...config.accountVerification, showNewToFreedom: v } })} />
                  </PRow>
                  {config.accountVerification.showNewToFreedom && <PRow label="New to Freedom Text"><PInput value={config.accountVerification.newToFreedomText} onChange={v => update({ accountVerification: { ...config.accountVerification, newToFreedomText: v } })} /></PRow>}
                </>
                }

                {title === 'Sign-In Code' && <>
                  <PRow label="Heading"><PInput value={config.signInCode.heading} onChange={v => update({ signInCode: { ...config.signInCode, heading: v } })} /></PRow>
                  <PRow label="Subtitle"><PInput value={config.signInCode.subtitle} onChange={v => update({ signInCode: { ...config.signInCode, subtitle: v } })} /></PRow>
                  <PRow label="Input Label"><PInput value={config.signInCode.inputLabel} onChange={v => update({ signInCode: { ...config.signInCode, inputLabel: v } })} /></PRow>
                  <PRow label="Resend Text"><PInput value={config.signInCode.resendText} onChange={v => update({ signInCode: { ...config.signInCode, resendText: v } })} /></PRow>
                  <PRow label="Resend Link Text"><PInput value={config.signInCode.resendLinkText} onChange={v => update({ signInCode: { ...config.signInCode, resendLinkText: v } })} /></PRow>
                  <PRow label="Button Text"><PInput value={config.signInCode.buttonText} onChange={v => update({ signInCode: { ...config.signInCode, buttonText: v } })} /></PRow>
                  <PRow label="Show Need Help">
                    <Toggle checked={config.signInCode.showNeedHelp} onChange={v => update({ signInCode: { ...config.signInCode, showNeedHelp: v } })} />
                  </PRow>
                  {config.signInCode.showNeedHelp && <PRow label="Need Help Text"><PInput value={config.signInCode.needHelpText} onChange={v => update({ signInCode: { ...config.signInCode, needHelpText: v } })} /></PRow>}
                  <PRow label="Show New to Freedom">
                    <Toggle checked={config.signInCode.showNewToFreedom} onChange={v => update({ signInCode: { ...config.signInCode, showNewToFreedom: v } })} />
                  </PRow>
                  {config.signInCode.showNewToFreedom && <PRow label="New to Freedom Text"><PInput value={config.signInCode.newToFreedomText} onChange={v => update({ signInCode: { ...config.signInCode, newToFreedomText: v } })} /></PRow>}
                </>
                }

                {title === 'Success' && <>
                  <PRow label="Heading"><PInput value={config.success.heading} onChange={v => update({ success: { ...config.success, heading: v } })} /></PRow>
                  <PRow label="Subtitle"><PTextarea value={config.success.subtitle} onChange={v => update({ success: { ...config.success, subtitle: v } })} /></PRow>
                  <PRow label="Button Text"><PInput value={config.success.buttonText} onChange={v => update({ success: { ...config.success, buttonText: v } })} /></PRow>
                </>}

                {title === 'Carousel Slides' && <>
                  {config.slides.map((slide, i) => (
                    <Card
                      key={slide.id}
                      label={`Slide ${i + 1}`}
                      onRemove={config.slides.length > 1 ? () => removeSlide(slide.id) : undefined}
                      extra={
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button onClick={() => moveSlide(slide.id, -1)} disabled={i === 0} style={arrowBtn(i === 0)}><ChevronUp size={13} /></button>
                          <button onClick={() => moveSlide(slide.id, 1)} disabled={i === config.slides.length - 1} style={arrowBtn(i === config.slides.length - 1)}><ChevronDown size={13} /></button>
                        </div>
                      }
                    >
                      <div style={{ marginBottom: '12px' }}>
                        <img src={slide.image} alt="" style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                        <input type="file" accept="image/*" ref={el => { fileInputRefs.current[slide.id] = el }} style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) handleImageUpload(slide.id, e.target.files[0]) }} />
                        <button onClick={() => fileInputRefs.current[slide.id]?.click()} style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px dashed #bbb', background: '#f9f9f9', color: '#555', cursor: 'pointer', fontSize: '12px' }}>
                          Upload image
                        </button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <PRow label="Label"><PInput value={slide.label} onChange={v => updateSlide(slide.id, { label: v })} /></PRow>
                        <PRow label="Highlight"><PInput value={slide.highlight} onChange={v => updateSlide(slide.id, { highlight: v })} /></PRow>
                      </div>
                      <PRow label="Title"><PInput value={slide.title} onChange={v => updateSlide(slide.id, { title: v })} /></PRow>
                      <PRow label="Body"><PTextarea value={slide.body} onChange={v => updateSlide(slide.id, { body: v })} rows={3} /></PRow>
                    </Card>
                  ))}
                  <AddBtn onClick={addSlide} label="Add Slide" />
                </>}

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function PRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: '5px' }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', borderRadius: '8px',
  border: '1px solid #ddd', background: '#fff', color: '#111',
  fontSize: '13px', boxSizing: 'border-box', outline: 'none',
}
const selectStyle: React.CSSProperties = {
  ...inputStyle, appearance: 'auto', cursor: 'pointer',
}

function PInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
}

function PTextarea({ value, onChange, rows = 2 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{ width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', backgroundColor: checked ? '#2563eb' : '#ccc', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
    >
      <div style={{ position: 'absolute', top: '3px', left: checked ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  )
}

function Card({ label, children, onRemove, extra }: { label: string; children: React.ReactNode; onRemove?: () => void; extra?: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '14px', marginBottom: '12px', backgroundColor: '#fafafa' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#888', letterSpacing: '0.06em', textTransform: 'uppercase', flex: 1 }}>{label}</span>
        {extra}
        {onRemove && (
          <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C30000', fontSize: '16px', fontWeight: 700, lineHeight: 1, padding: '0 0 0 8px', display: 'flex', alignItems: 'center' }}>✕</button>
        )}
      </div>
      {children}
    </div>
  )
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px dashed #bbb', background: 'transparent', color: '#555', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 500 }}>
      <Plus size={14} /> {label}
    </button>
  )
}

function arrowBtn(disabled: boolean): React.CSSProperties {
  return { background: 'none', border: 'none', cursor: disabled ? 'default' : 'pointer', color: disabled ? '#ccc' : '#555', padding: '2px', display: 'flex', alignItems: 'center' }
}
