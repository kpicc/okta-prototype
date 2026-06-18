interface Step {
  label: string
  status: 'completed' | 'active' | 'inactive'
}

interface ProgressBarProps {
  steps: Step[]
}

function MobileStepIcon({ status }: { status: Step['status'] }) {
  if (status === 'completed') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11.5" stroke="#2E7D32" fill="none" />
        <circle cx="12" cy="12" r="9" fill="#2E7D32" />
        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (status === 'active') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11.5" stroke="#191919" fill="none" />
        <circle cx="12" cy="12" r="6" fill="#191919" />
      </svg>
    )
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="#D9D9D9" />
    </svg>
  )
}

function DesktopStepIcon({ status }: { status: Step['status'] }) {
  if (status === 'completed') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11.5" stroke="#2E7D32" fill="none" />
        <circle cx="12" cy="12" r="9" fill="#2E7D32" />
        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (status === 'active') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11.5" stroke="#4e4e4e" fill="none" />
        <circle cx="12" cy="12" r="6" fill="#4e4e4e" />
      </svg>
    )
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11.5" stroke="#D9D9D9" fill="none" />
    </svg>
  )
}

export function ProgressBar({ steps }: ProgressBarProps) {
  return (
    <>
      <style>{`
        .pb-mobile { display: flex; }
        .pb-desktop { display: none; }
        @media (min-width: 768px) {
          .pb-mobile { display: none; }
          .pb-desktop { display: flex; }
        }
      `}</style>

      {/* Mobile layout — icon stacked above label */}
      <div className="pb-mobile" style={{ width: '100%', backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 24px', gap: '0', width: '100%' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '80px' }}>
                <MobileStepIcon status={step.status} />
                <span style={{
                  fontSize: '14px',
                  lineHeight: '18px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  color: step.status === 'completed' ? '#2E7D32' : step.status === 'active' ? '#191919' : '#989898',
                  fontWeight: step.status === 'active' ? 500 : 400,
                }}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: '75px', height: '1px', backgroundColor: '#D9D9D9', marginBottom: '26px', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop layout — icon inline with label */}
      <div className="pb-desktop" style={{ width: '100%', backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 24px', gap: '0', width: '100%' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <DesktopStepIcon status={step.status} />
                <span style={{
                  fontSize: '16px',
                  lineHeight: '20px',
                  whiteSpace: 'nowrap',
                  color: step.status === 'completed' ? '#2E7D32' : step.status === 'active' ? '#4e4e4e' : '#666666',
                  fontWeight: step.status === 'active' ? 500 : 400,
                }}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: '95px', height: '1px', backgroundColor: '#D9D9D9', flexShrink: 0, margin: '0 0' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
