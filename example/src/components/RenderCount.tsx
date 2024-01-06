import { useEffect, useRef } from 'react'

export const RenderCount = () => {
  const renderCount = useRef(1)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      ++renderCount.current
    }
  })

  return <div>Render {renderCount.current} time(s)</div>
}
