import { useEffect, useState } from 'react'

// Reactive eligibility for the new scroll/Threads features only.
export function useDesktopEffects() {
  const [matches, setMatches] = useState(() => matchMedia('(min-width: 760px) and (pointer: fine)').matches)
  useEffect(() => {
    const query = matchMedia('(min-width: 760px) and (pointer: fine)')
    const update = () => setMatches(query.matches)
    query.addEventListener('change', update)
    update()
    return () => query.removeEventListener('change', update)
  }, [])
  return matches
}
