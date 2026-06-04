import { useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'

interface InputFieldProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  showClear?: boolean
  disabled?: boolean
  onBlur?: () => void
}

export function InputField({
  label,
  type = 'text',
  value,
  onChange,
  error,
  showClear = true,
  disabled = false,
  onBlur,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const hasValue = value.length > 0
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  const borderColor = error
    ? 'border-[#C30000]'
    : focused
    ? 'border-[#E87722]'
    : 'border-gray-300'

  const isFloated = focused || hasValue

  return (
    <div className="w-full">
      <div
        className={`relative border rounded-lg transition-all bg-gray-50 ${borderColor}`}
        style={focused ? { boxShadow: '0 0 0 3px rgba(232, 119, 34, 0.2)' } : undefined}
      >
        {/* Floating label */}
        <label
          className="absolute pointer-events-none transition-all duration-150 text-gray-500"
          style={{
            left: '16px',
            top: isFloated ? '8px' : '50%',
            transform: isFloated ? 'none' : 'translateY(-50%)',
            fontSize: isFloated ? '11px' : '14px',
          }}
        >
          {label}
        </label>
        <div className="flex items-center" style={{ paddingLeft: '16px', paddingRight: '8px' }}>
          <input
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); onBlur?.() }}
            disabled={disabled}
            className="flex-1 min-w-0 outline-none text-sm bg-transparent"
            style={{ color: error ? '#C30000' : undefined, paddingTop: isFloated ? '22px' : '0', paddingBottom: isFloated ? '8px' : '0', height: '52px' }}
          />
          <div className="flex items-center gap-1 ml-2 shrink-0">
            {isPassword && hasValue && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
            {(error || (showClear && hasValue)) && !isPassword && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      {error && error !== 'invalid' && (
        <div className="flex items-center gap-1.5 mt-1.5 text-xs" style={{ color: '#C30000' }}>
          <WarningIcon />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <line x1="8" y1="6" x2="8" y2="9.5" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="8" cy="11.2" r="0.7" fill="currentColor"/>
    </svg>
  )
}
