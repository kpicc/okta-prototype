import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

interface TextLinkProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  showChevron?: boolean
  color?: 'blue' | 'orange'
  noWrap?: boolean
  fontSize?: string
}

export function TextLink({
  children,
  onClick,
  href,
  showChevron = true,
  color = 'blue',
  noWrap = false,
  fontSize,
}: TextLinkProps) {
  const colorClass = color === 'blue' ? 'text-[#2F7DC1]' : 'text-[#DB5C05]'

  const content = (
    <span className={`${colorClass} hover:underline cursor-pointer text-base font-medium${noWrap ? ' whitespace-nowrap' : ''}`} style={fontSize ? { fontSize } : undefined}>
      {children}
      {showChevron && <span className="inline-flex items-center whitespace-nowrap" style={{ transform: 'translateY(3px)' }}><ChevronRight size={16} color="#DB5C05" /></span>}
    </span>
  )

  if (href) {
    return <a href={href}>{content}</a>
  }

  return <button type="button" onClick={onClick} className="bg-transparent border-none p-0">{content}</button>
}
