export function GridOverlay() {
  const columns = 12
  const gutter = 24
  const margin = 120

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        paddingLeft: margin,
        paddingRight: margin,
        gap: gutter,
      }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            height: '100%',
          }}
        />
      ))}
    </div>
  )
}
