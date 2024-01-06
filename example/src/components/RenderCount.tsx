import { useEffect, useRef } from 'react'

export const RenderCount = () => {
  const renderCount = useRef(1)
  const firstRender = useRef(true)

  useEffect(() => {
    // This check ensures that renderCount starts from 1 when
    // StrictMode is enabled. If StrictMode is disabled in main.tsx,
    // you can remove the extra check for the correct result.
    if (import.meta.env.DEV && firstRender.current) {
      firstRender.current = false
    } else {
      ++renderCount.current
    }
  })

  return <div>Render {renderCount.current} time(s)</div>
}
