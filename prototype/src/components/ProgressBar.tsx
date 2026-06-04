import { Check } from 'lucide-react'

interface Step {
  label: string
  status: 'completed' | 'active' | 'inactive'
}

interface ProgressBarProps {
  steps: Step[]
}

export function ProgressBar({ steps }: ProgressBarProps) {
  return (
    <div style={{ width: '100%', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', paddingLeft: '16px', paddingRight: '16px' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {step.status === 'completed' ? (
                <Check size={14} style={{ color: '#008000', flexShrink: 0 }} strokeWidth={2.5} />
              ) : step.status === 'active' ? (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000', flexShrink: 0, display: 'inline-block' }} />
              ) : (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '1px solid #000', flexShrink: 0, display: 'inline-block' }} />
              )}
              <span className={step.status !== 'active' ? 'pb-label-inactive' : undefined} style={{ fontSize: '14px', whiteSpace: 'nowrap', color: step.status === 'completed' ? '#008000' : '#000' }}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="pb-connector" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
