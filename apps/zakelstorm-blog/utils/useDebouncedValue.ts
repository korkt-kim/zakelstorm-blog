import { useEffect, useRef, useState } from 'react'

export const useDebouncedValue = <T>(value: T, delayTime = 500) => {
  const timeoutId = useRef(0)
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    timeoutId.current = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delayTime)

    return () => {
      window.clearTimeout(timeoutId.current)
    }
  }, [value, delayTime])

  return debouncedValue
}
