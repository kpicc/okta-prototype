import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-9 w-full max-w-[384px] mx-auto ${className}`}>
      {children}
    </div>
  )
}
