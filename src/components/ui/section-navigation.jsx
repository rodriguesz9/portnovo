import { useEffect, useRef, useState } from 'react'

const destinations = [
  { id: 'inicio', label: 'Início' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
]

// Own implementation authorized in USER-UPDATE.md; not Nimbus / gughigug.
export default function SectionNavigation() {
  const ref = useRef(null)
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    const header = ref.current.closest('header')
    const sections = destinations.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const root = document.documentElement
    const previousOffset = root.style.getPropertyValue('--nav-offset')
    let observer
    const select = () => {
      const band = header.getBoundingClientRect().bottom + 30
      const chapter = sections.findLast(section => section.getBoundingClientRect().top <= band)?.id || 'inicio'
      const footer = document.querySelector('footer')?.getBoundingClientRect()
      setActive(footer && footer.top < innerHeight && footer.bottom > band ? 'contato' : chapter)
    }
    const observe = () => {
      observer?.disconnect()
      const height = Math.ceil(header.getBoundingClientRect().height)
      // Header wrapping, text zoom and safe-area padding all affect anchors.
      // Measure only on ResizeObserver notifications, never per scroll frame.
      root.style.setProperty('--nav-offset', `${height + 24}px`)
      observer = new IntersectionObserver(select, { rootMargin: `-${height}px 0px -60% 0px` })
      sections.forEach(section => observer.observe(section))
      select()
    }
    observe()
    const resize = new ResizeObserver(observe)
    resize.observe(header)
    // The last section may be too short to reach the reading band before the
    // document ends. Observe the real footer rather than polling scrollY.
    const end = new IntersectionObserver(select)
    const footer = document.querySelector('footer')
    if (footer) end.observe(footer)
    // Observers cover chapter/footer visibility; a coalesced scroll sample also
    // covers headings crossing the band inside very tall chapter wrappers.
    let sample = 0
    const onScroll = () => {
      if (!sample) sample = requestAnimationFrame(() => { sample = 0; select() })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll); cancelAnimationFrame(sample)
      resize.disconnect(); observer?.disconnect(); end.disconnect()
      if (previousOffset) root.style.setProperty('--nav-offset', previousOffset)
      else root.style.removeProperty('--nav-offset')
    }
  }, [])

  useEffect(() => {
    const nav = ref.current
    const measure = () => {
      const link = nav.querySelector('[aria-current]')
      if (!link) return
      const bounds = link.getBoundingClientRect()
      const capsule = nav.getBoundingClientRect()
      nav.style.setProperty('--selector-x', `${bounds.left - capsule.left - nav.clientLeft}px`)
      nav.style.setProperty('--selector-width', `${bounds.width}px`)
    }
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(nav)
    nav.querySelectorAll('a').forEach(link => resize.observe(link))
    let disposed = false
    document.fonts.ready.then(() => { if (!disposed) measure() })
    return () => { disposed = true; resize.disconnect() }
  }, [active])

  useEffect(() => {
    const connection = navigator.connection
    const update = () => { ref.current.dataset.saveData = String(!!connection?.saveData) }
    update(); connection?.addEventListener('change', update)
    return () => connection?.removeEventListener('change', update)
  }, [])

  return <nav ref={ref} className="glass-navigation" aria-label="Principal">
    <span className="glass-selector" aria-hidden="true" />
    {destinations.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
  </nav>
}
