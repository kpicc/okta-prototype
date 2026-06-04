interface CarouselDotsProps {
  count: number
  active: number
  onDotClick?: (index: number) => void
}

export function CarouselDots({ count, active, onDotClick }: CarouselDotsProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          onClick={() => onDotClick?.(i)}
          style={{ cursor: onDotClick ? 'pointer' : 'default' }}
          className={`w-5 h-1.5 rounded-full transition-colors ${
            i === active ? 'bg-[#E87722]' : 'bg-white'
          }`}
        />
      ))}
    </div>
  )
}
