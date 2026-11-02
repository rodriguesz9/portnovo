import { useEffect, useState, type RefObject } from 'react'

// Local-only eligibility shared by the two adapted originals.
export function useLocalEffects(ref: RefObject<HTMLElement | null>, stopped: boolean) {
  const [eligible, setEligible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let visible = false
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection
    const update = () => setEligible(visible && !document.hidden && !reduced.matches && !connection?.saveData)
    const io = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update() })
    io.observe(el)
    document.addEventListener('visibilitychange', update)
    reduced.addEventListener('change', update)
    connection?.addEventListener('change', update)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', update); reduced.removeEventListener('change', update); connection?.removeEventListener('change', update) }
  }, [ref])
  return eligible && !stopped
}
