import type { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  variant?: 'error' | 'success' | 'info'
}

export function Alert({ children, variant = 'error' }: AlertProps) {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
  }

  const icons = {
    error: <WarningTriangle />,
    success: <CheckCircle />,
    info: <InfoCircle />,
  }

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${styles[variant]} text-sm`}>
      <span className="shrink-0 mt-0.5">{icons[variant]}</span>
      <div>{children}</div>
    </div>
  )
}

function WarningTriangle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L16 15H2L9 2Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <line x1="9" y1="7" x2="9" y2="10.5" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="9" cy="12.5" r="0.7" fill="currentColor"/>
    </svg>
  )
}

function CheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5.5 9L8 11.5L12.5 6.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function InfoCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="9" y1="8" x2="9" y2="13" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="9" cy="5.8" r="0.8" fill="currentColor"/>
    </svg>
  )
}
