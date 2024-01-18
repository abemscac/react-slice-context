import { useEffect, useState } from 'react'

const MAX_DOT_COUNT = 3

export const Loading = () => {
  const [dotCount, setDotCount] = useState(1)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount((prev) => Math.max((prev + 1) % (MAX_DOT_COUNT + 1), 1))
    }, 500)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return <div className="loading">Loading{'.'.repeat(dotCount)}</div>
}
