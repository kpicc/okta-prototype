import React, { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  fullWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
  style?: React.CSSProperties
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  fullWidth = true,
  disabled = false,
  type = 'button',
  style,
}: ButtonProps) {
  const base = 'rounded-full font-medium transition-all duration-200 flex items-center justify-center'
  const sizes = fullWidth ? 'w-full text-base' : 'px-4 text-sm'

  const variants = {
    primary: `${base} ${sizes} bg-[#DB5C05] text-white hover:bg-[#c45204] active:bg-[#ad4803] disabled:opacity-50`,
    secondary: `${base} ${sizes} bg-white text-[#003DA5] border-2 border-[#003DA5] hover:bg-blue-50`,
    outline: `${base} ${sizes} bg-white text-gray-700 border border-gray-300 hover:border-gray-400`,
    text: `text-[#003DA5] hover:underline text-sm font-medium inline-flex items-center gap-1`,
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={variants[variant]}
      style={{ height: fullWidth ? '60px' : '48px', ...style }}
    >
      {children}
    </button>
  )
}
