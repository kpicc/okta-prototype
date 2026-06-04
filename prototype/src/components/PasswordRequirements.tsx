import { CheckCircle, XCircle } from 'lucide-react'

interface Requirement {
  label: string
  met: boolean
}

interface PasswordRequirementsProps {
  password: string
  email?: string
}

export function PasswordRequirements({ password, email = '' }: PasswordRequirementsProps) {
  const requirements: Requirement[] = [
    { label: 'Min 8 characters', met: password.length >= 8 },
    { label: '1 symbol', met: /[^a-zA-Z0-9]/.test(password) },
    { label: '1 uppercase letter', met: /[A-Z]/.test(password) },
    { label: '1 number', met: /[0-9]/.test(password) },
    { label: '1 lowercase letter', met: /[a-z]/.test(password) },
    { label: 'No parts of your username', met: !email || !password || !password.toLowerCase().includes(email.split('@')[0].toLowerCase()) },
    { label: 'Does not include your first name', met: password.length === 0 || !password.toLowerCase().includes('john') },
  ]

  return (
    <div style={{ width: '100%' }}>
      <p style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Password requirements</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {requirements.map((req, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            {req.met ? (
              <CheckCircle size={16} style={{ color: '#16a34a', flexShrink: 0 }} />
            ) : (
              <XCircle size={16} style={{ color: '#f87171', flexShrink: 0 }} />
            )}
            <span style={{ color: req.met ? '#4b5563' : '#6b7280' }}>{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
