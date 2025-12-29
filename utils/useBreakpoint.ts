import { useEffect, useState } from 'react'

const BREAKPOINTS = ['', 'sm', 'md', 'lg', 'xl', '2xl'] as const

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] =
    useState<(typeof BREAKPOINTS)[number]>('sm')
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      let done = false
      BREAKPOINTS.forEach((breakpoint, index) => {
        const breakpointValue = Number(
          window
            .getComputedStyle(document.body)
            .getPropertyValue(`--breakpoint-${breakpoint}`)
            .split('px')[0]
        )

        if (Number.isNaN(breakpointValue)) {
          throw new Error(`Invalid breakpoint value for ${breakpoint}`)
        }

        if (done === false && entries[0].contentRect.width < breakpointValue) {
          done = true
          setBreakpoint(BREAKPOINTS[index + 1])
        }
      })
    })
    observer.observe(document.body)

    return () => {
      observer.disconnect()
    }
  }, [])

  return breakpoint
}
