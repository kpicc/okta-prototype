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
    <div style={{ width: '100%', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', backgroundColor: '#fff', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40px', paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px', flexWrap: 'nowrap', overflow: 'hidden' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: i === steps.findIndex(s => s.status === 'active') ? 1 : 0, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
              {step.status === 'completed' ? (
                <Check size={14} style={{ color: '#008000', flexShrink: 0 }} strokeWidth={2.5} />
              ) : step.status === 'active' ? (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000', flexShrink: 0, display: 'inline-block' }} />
              ) : (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '1px solid #000', flexShrink: 0, display: 'inline-block' }} />
              )}
              <span className={step.status !== 'active' ? 'pb-label-inactive' : undefined} style={{ fontSize: '13px', whiteSpace: 'nowrap', color: step.status === 'completed' ? '#008000' : '#000', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
