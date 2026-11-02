import { useEffect, useState } from 'react'

export function useMotion() {
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [saveData, setSaveData] = useState(() => Boolean(navigator.connection?.saveData))
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    const connection = navigator.connection
    const update = () => setSaveData(Boolean(connection?.saveData))
    connection?.addEventListener('change', update)
    return () => connection?.removeEventListener('change', update)
  }, [])
  return { stopped: paused || reduced || saveData, paused, setPaused, reduced }
}
