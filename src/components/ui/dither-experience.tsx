import { useEffect, useRef } from 'react'
import { useLocalEffects } from './use-local-effects'

// Original local implementation, authorized screenshot inspiration; NOT heyquincy / 21st source.
export function DitherTrail({ stopped }: { stopped: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const active = useLocalEffects(ref, stopped)
  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')
    const fine = matchMedia('(pointer: fine)')
    if (!ctx || !active || !fine.matches) { canvas.width = canvas.width; canvas.dataset.trailState = 'off'; return }
    canvas.dataset.trailState = 'ready'
    let raf = 0, last = 0
    let particles: { x: number; y: number; time: number; shade: number }[] = []
    const resize = () => { const dpr = Math.min(devicePixelRatio || 1, 1.5); canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const paint = (now: number) => {
      raf = 0; ctx.clearRect(0, 0, innerWidth, innerHeight)
      particles = particles.filter(p => now - p.time < 520)
      particles.forEach(p => { const fade = 1 - (now - p.time) / 520; ctx.fillStyle = `rgba(${p.shade ? '208,226,211' : '232,235,239'},${fade * fade * .55})`; ctx.fillRect(p.x, p.y, 2, 2) })
      canvas.dataset.particles = String(particles.length)
      if (particles.length) raf = requestAnimationFrame(paint)
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || performance.now() - last < 24) return
      last = performance.now()
      for (let i = 0; i < 7; i++) particles.push({ x: Math.round((e.clientX + (Math.random() - .5) * 30) / 3) * 3, y: Math.round((e.clientY + (Math.random() - .5) * 30) / 3) * 3, time: last, shade: i % 3 })
      particles = particles.slice(-140)
      if (!raf) raf = requestAnimationFrame(paint)
    }
    const clear = () => { cancelAnimationFrame(raf); raf = 0; particles = []; ctx.clearRect(0, 0, innerWidth, innerHeight); canvas.dataset.particles = '0' }
    resize(); window.addEventListener('resize', resize); window.addEventListener('pointermove', move, { passive: true }); document.documentElement.addEventListener('pointerleave', clear)
    return () => { clear(); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', clear); canvas.dataset.trailState = 'off' }
  }, [active])
  return <canvas className="dither-trail" ref={ref} aria-hidden="true" />
}

export function MessageReveal({ stopped }: { stopped: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const active = useLocalEffects(ref, stopped)
  return <section ref={ref} className="message-reveal container" data-static={!active} aria-labelledby="message-title">
    <p className="intro-role">Clareza em cada detalhe</p>
    <h2 id="message-title" className="message-box" tabIndex={0}
      onPointerMove={e => { if (!active || e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--reveal-x', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--reveal-y', `${e.clientY - r.top}px`); e.currentTarget.dataset.inside = 'true' }}
      onPointerLeave={e => { e.currentTarget.dataset.inside = 'false' }}>
      <span className="message-ghost">Ideias claras.<br />Experiências que ficam.</span>
      <span className="message-light" aria-hidden="true">Ideias claras.<br />Experiências que ficam.</span>
    </h2>
    <p className="message-hint">Passe o cursor pela frase. Ou explore com o teclado.</p>
  </section>
}
