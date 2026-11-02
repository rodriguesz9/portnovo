import { useEffect, useRef, useState } from 'react'
import { useLocalEffects } from './use-local-effects'

// Original Canvas2D interpretation of the authorized particle reference.
// Not anark17r's source. No character rain, global listener or remote assets.
export default function DataRain({ stopped }: { stopped: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const eligible = useLocalEffects(ref, stopped)
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches)
    update(); mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    const canvas = ref.current
    const section = canvas?.parentElement
    if (!canvas || !section || !eligible || !fine) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let width = 1, height = 1, frame = 0, last = 0, time = 0
    const pointer = { x: -1000, y: -1000 }
    const colors = ['#b9c8cd', '#7ba895', '#718fbd', '#a28ac9']
    const particles = Array.from({ length: 64 }, (_, i) => ({
      x: ((i * 0.6180339) % 1), y: ((i * 0.381966) % 1), vx: 0, vy: 1.1 + (i % 5) * .12,
    }))
    const resize = new ResizeObserver(() => {
      const rect = section.getBoundingClientRect()
      width = rect.width; height = rect.height
      const dpr = Math.min(devicePixelRatio || 1, 1.25)
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    })
    resize.observe(section)
    const move = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top
    }
    const leave = () => { pointer.x = -1000; pointer.y = -1000 }
    section.addEventListener('pointermove', move, { passive: true })
    section.addEventListener('pointerleave', leave)
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw)
      if (now - last < 1000 / 30) return
      const dt = Math.min((now - (last || now)) / 33.333, 2)
      last = now; time += dt * .012
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = .75
      particles.forEach((p, i) => {
        const x = p.x * width, y = p.y * height
        const dx = pointer.x - x, dy = pointer.y - y
        const distance = Math.hypot(dx, dy)
        const influence = Math.max(0, 1 - distance / 300)
        const flow = Math.sin(y * .006 + time + i * .2) * .38
        p.vx += (flow + influence * dx * .035 - p.vx) * .08 * dt
        const vy = p.vy + influence * dy * .018
        ctx.strokeStyle = colors[i % colors.length]
        ctx.globalAlpha = .22 + (i % 4) * .035
        ctx.beginPath(); ctx.moveTo(x - p.vx * 4, y - vy * 5)
        ctx.quadraticCurveTo(x - p.vx, y - vy * 2, x, y); ctx.stroke()
        p.x = (p.x + p.vx * dt / width + 1) % 1
        p.y = (p.y + vy * dt / height + 1) % 1
      })
    }
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame); resize.disconnect()
      section.removeEventListener('pointermove', move); section.removeEventListener('pointerleave', leave)
      ctx.clearRect(0, 0, width, height)
    }
  }, [eligible, fine])
  return <canvas ref={ref} className="about-data-rain" aria-hidden="true" />
}
