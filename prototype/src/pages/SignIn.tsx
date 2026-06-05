import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { TextLink } from '../components/TextLink'
import { CarouselDots } from '../components/CarouselDots'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'
import { AlertTriangle, X, Settings } from 'lucide-react'
import { GridOverlay } from '../components/GridOverlay'

export function SignIn() {
  const navigate = useNavigate()
  const { config, adminOpen, setAdminOpen } = useAdmin()
  const slides = config.slides
  const [email, setEmail] = useState('')
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const [showSheet, setShowSheet] = useState(false)
  const [closingSheet, setClosingSheet] = useState(false)
  const [showGrid, setShowGrid] = useState(false)

  function closeSheet() {
    setClosingSheet(true)
    setTimeout(() => { setShowSheet(false); setClosingSheet(false) }, 280)
  }

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [paused, slides.length])

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768 && showSheet) {
        closeSheet()
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [showSheet])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'g' || e.key === 'G') setShowGrid(p => !p)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleContinue = () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }
    if (!isValidEmail) {
      setShowAlert(true)
      setError('invalid')
      return
    }
    setError('')
    setShowAlert(false)
    navigate('/sign-in-password', { state: { email } })
  }

  return (
    <div className="min-h-screen flex flex-col page-bg">
      {showGrid && <GridOverlay />}
      {adminOpen && <AdminPanel />}
      {/* Global alert banner */}
      {config.bannerVisible && showBanner && (
        <div style={{ backgroundColor: '#2F7DC1', color: '#fff', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px 48px 12px 24px', fontSize: '14px', position: 'relative' }}>
          <AlertTriangle size={16} style={{ flexShrink: 0 }} />
          <span>{config.bannerText}</span>
          <button
            onClick={() => setShowBanner(false)}
            style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Logo + Admin toggle */}
      <div className="w-full flex justify-center md:px-8" style={{ paddingTop: '24px', paddingBottom: '24px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div className="w-full md:max-w-[1200px]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/logo-white.svg" alt="Freedom Mobile" className="md:hidden" style={{ width: '90px', height: 'auto' }} />
          <img src="/logo-black.svg" alt="Freedom Mobile" className="hidden md:block" style={{ height: '32px', width: 'auto' }} />
          <button
            onClick={() => setAdminOpen(!adminOpen)}
            title="Open Admin Panel"
            style={{ background: adminOpen ? '#E87722' : '#0d1f3c', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s', flexShrink: 0 }}
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      <main className="flex-1 flex items-start justify-center md:px-8 pb-10">
        {/* Single card */}
        <div className="w-full md:max-w-[1200px] md:rounded-2xl overflow-hidden flex flex-col md:flex-row md:shadow-sm">

          {/* LEFT — dark navy panel */}
          <div className="left-panel w-full md:w-[53%] flex flex-col" style={{ padding: '16px', gap: '16px' }}>
            {/* Photo — inset with rounded corners all around */}
            <div style={{ borderRadius: '12px', height: 'clamp(200px, 45vw, 320px)', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
              {slides.map((slide, i) => (
                <img
                  key={i}
                  src={slide.image}
                  alt={slide.label}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    opacity: i === activeSlide ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}
                />
              ))}
            </div>
            {/* Marketing text — active slide is relative (sizes container), others are absolute */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {slides.map((slide, i) => (
                <div
                  key={i}
                  style={{
                    position: i === activeSlide ? 'relative' : 'absolute',
                    inset: i === activeSlide ? undefined : 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    opacity: i === activeSlide ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    width: '100%',
                    pointerEvents: i === activeSlide ? 'auto' : 'none',
                  }}
                >
                  <p className="text-[#E87722] uppercase" style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.15em' }}>
                    {slide.label}
                  </p>
                  <h3 className="text-white leading-snug" style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 500 }}>
                    {slide.title}
                    <span className="text-[#E87722]">{slide.highlight}</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed" style={{ fontSize: 'clamp(14px, 2vw, 16px)' }}>
                    {slide.body}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, minHeight: '40px' }}>
              <CarouselDots
                count={slides.length}
                active={activeSlide}
                onDotClick={(i) => { setActiveSlide(i); setPaused(true) }}
              />
              <button
                onClick={() => setPaused(p => !p)}
                style={{
                  position: 'absolute',
                  right: 0,
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                }}
                aria-label={paused ? 'Play' : 'Pause'}
              >
                {paused ? (
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><path d="M0 0l10 6-10 6z"/></svg>
                ) : (
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><rect x="0" y="0" width="3" height="12"/><rect x="6" y="0" width="3" height="12"/></svg>
                )}
              </button>
            </div>

            {/* Mobile-only CTA */}
            <div className="flex flex-col gap-3 md:hidden" style={{ flexShrink: 0 }}>
              <button
                onClick={() => setShowSheet(true)}
                style={{ width: '100%', height: '56px', borderRadius: '28px', backgroundColor: '#DB5C05', color: '#fff', fontSize: '16px', fontWeight: 500, border: 'none', cursor: 'pointer' }}
              >
                {config.mobileButtonText || 'Sign in'}
              </button>
              <div className="text-center" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
                {config.newToFreedomText}{' '}
                <button
                  onClick={() => navigate('/create-account')}
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {config.newToFreedomLinkText}
                </button>
                {' '}<span style={{ color: '#DB5C05', fontSize: '14px' }}>›</span>
              </div>
            </div>
          </div>

          {/* Mobile bottom sheet */}
          {showSheet && (
            <div className="md:hidden" style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div onClick={closeSheet} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)' }} />
              <div style={{ position: 'relative', backgroundColor: '#fff', borderRadius: '20px 20px 0 0', padding: '24px 50px 40px', display: 'flex', flexDirection: 'column', gap: '16px', animation: closingSheet ? 'slideDown 0.28s ease forwards' : 'slideUp 0.3s ease' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 500, fontFamily: "'Ambra Sans Text', sans-serif", color: '#111', margin: 0 }}>{config.heading}</h3>
                  <button onClick={closeSheet} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center', padding: '4px' }}>
                    <X size={20} />
                  </button>
                </div>
                {/* Subtitle */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '3px', flexShrink: 0, borderRadius: '2px', alignSelf: 'stretch', backgroundColor: '#E87722' }} />
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.5 }}>{config.subtitleText}{' '}<TextLink onClick={() => navigate('/create-account')} showChevron color="blue">{config.subtitleLinkText}</TextLink></p>
                </div>
                {/* Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {config.fields.map((field) => (
                    <InputField
                      key={field.id}
                      label={field.label}
                      type={field.type === 'dropdown' || field.type === 'radio' ? 'text' : field.type}
                      value={fieldValues[field.id] ?? ''}
                      onChange={(val) => {
                        setFieldValues(prev => ({ ...prev, [field.id]: val }))
                        if (field.type === 'email') { setEmail(val); setError(''); setShowAlert(false) }
                      }}
                      error={field.type === 'email' ? error : undefined}
                    />
                  ))}
                  {showAlert ? (
                    <div style={{ border: '1px solid #C30000', borderRadius: '12px', overflow: 'hidden' }}>
                      <div style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <AlertTriangle size={18} style={{ color: '#C30000', flexShrink: 0, marginTop: '2px' }} />
                        <p style={{ fontSize: '14px', color: '#C30000', lineHeight: 1.5 }}>{config.alertMessage}</p>
                      </div>
                      <div style={{ borderTop: '1px solid #e5e7eb', padding: '12px 16px', display: 'flex', gap: '24px', justifyContent: 'flex-end' }}>
                        <TextLink onClick={() => navigate('/create-account')} showChevron={false}>{config.alertLink1Text}</TextLink>
                        <TextLink showChevron={false}>{config.alertLink2Text}</TextLink>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={handleContinue}>{config.buttonText}</Button>
                  )}
                </div>
                {/* New to Freedom */}
                {!showAlert && (
                  <div style={{ textAlign: 'center', fontSize: '14px', color: '#555' }}>
                    {config.newToFreedomText}{' '}
                    <TextLink onClick={() => navigate('/create-account')} showChevron>{config.newToFreedomLinkText}</TextLink>
                  </div>
                )}
                {/* Footer */}
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '4px' }}>{config.footerText}</p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextLink color="blue" showChevron fontSize="14px">{config.footerLinkText}</TextLink>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT — white panel (desktop only) */}
          <div className="hidden md:flex w-full md:w-[47%] bg-white flex-col">
            {/* Form area — vertically centered */}
            <div className="flex-1 flex flex-col justify-center" style={{ paddingLeft: 'clamp(24px, 8vw, 100px)', paddingRight: 'clamp(24px, 8vw, 100px)', paddingTop: '32px', paddingBottom: '32px' }}>
              <h1 className="text-[32px] text-gray-900 mb-4" style={{ fontWeight: 500, marginBottom: '16px' }}>{config.heading}</h1>

              <div className="flex gap-2" style={{ marginBottom: '16px' }}>
                <div className="w-[3px] shrink-0 bg-[#E87722] self-stretch rounded-full" />
                <p className="text-base text-gray-600 leading-relaxed">
                  {config.subtitleText}{' '}
                  <TextLink onClick={() => navigate('/create-account')} showChevron color="blue">
                    {config.subtitleLinkText}
                  </TextLink>
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {config.fields.map((field) => (
                  <InputField
                    key={field.id}
                    label={field.label}
                    type={field.type === 'dropdown' || field.type === 'radio' ? 'text' : field.type}
                    value={fieldValues[field.id] ?? ''}
                    onChange={(val) => {
                      setFieldValues(prev => ({ ...prev, [field.id]: val }))
                      if (field.type === 'email') { setEmail(val); setError(''); setShowAlert(false) }
                    }}
                    error={field.type === 'email' ? error : undefined}
                  />
                ))}

                {showAlert ? (
                  <div style={{ border: '1px solid #C30000', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <AlertTriangle size={18} style={{ color: '#C30000', flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ fontSize: '16px', color: '#C30000', lineHeight: 1.5 }}>
                        {config.alertMessage}
                      </p>
                    </div>
                    <div style={{ borderTop: '1px solid #e5e7eb', padding: '12px 16px', display: 'flex', gap: '24px', justifyContent: 'flex-end' }}>
                      <TextLink onClick={() => navigate('/create-account')} showChevron={false}>
                        {config.alertLink1Text}
                      </TextLink>
                      <TextLink showChevron={false}>{config.alertLink2Text}</TextLink>
                    </div>
                  </div>
                ) : (
                  <Button onClick={handleContinue}>{config.buttonText}</Button>
                )}
              </div>

              {!showAlert && (
                <div className="text-base text-gray-600 text-center" style={{ marginTop: '16px' }}>
                  {config.newToFreedomText}{' '}
                  <TextLink onClick={() => navigate('/create-account')} showChevron>
                    {config.newToFreedomLinkText}
                  </TextLink>
                </div>
              )}
            </div>

            {/* Bottom divider section */}
            <div className="border-t border-gray-200 text-center" style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: 'clamp(24px, 8vw, 100px)', paddingRight: 'clamp(24px, 8vw, 100px)' }}>
              <p className="text-base text-gray-700 mb-1">{config.footerText}</p>
              <div className="flex justify-center">
                <TextLink color="blue" showChevron>
                  {config.footerLinkText}
                </TextLink>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
