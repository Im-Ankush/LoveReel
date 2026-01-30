import { useState, useEffect } from 'react'

const BREAKPOINT_MOBILE = 768

/**
 * Returns true when viewport width is <= 768px (phone/small tablet).
 * Use for responsive layout (e.g. drawer sidebar, reduced padding).
 */
export function useMediaQuery(query = `(max-width: ${BREAKPOINT_MOBILE}px)`) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const m = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    m.addEventListener('change', handler)
    setMatches(m.matches)
    return () => m.removeEventListener('change', handler)
  }, [query])

  return matches
}

export const isMobileBreakpoint = BREAKPOINT_MOBILE
