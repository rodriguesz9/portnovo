import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useLocalEffects } from './use-local-effects'
import { useDesktopEffects } from './use-desktop-effects'
import ProjectGallery from './project-gallery'
import manifest from '../../../public/imgs/projects/manifest.json'

// Event-driven only: no idle RAF and no React updates per word.
function useScrollProgress(stopped: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const active = useLocalEffects(ref, stopped)
  const desktop = useDesktopEffects()
  useEffect(() => {
    const el = ref.current!
    if (!active || !desktop) { el.style.removeProperty('--progress'); el.dataset.scrollActive = 'false'; return }
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (innerHeight * .88 - r.top) / (innerHeight * .65)))
      el.style.setProperty('--progress', String(progress))
      el.querySelectorAll<HTMLElement>('[data-word]').forEach((word, i, words) => { word.style.opacity = String(.15 + .85 * Math.max(0, Math.min(1, progress * words.length - i))) })
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }
    el.dataset.scrollActive = 'true'; update()
    window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); el.querySelectorAll<HTMLElement>('[data-word]').forEach(w => w.style.removeProperty('opacity')); el.style.removeProperty('--progress'); el.dataset.scrollActive = 'false' }
  }, [active, desktop])
  return ref
}
export function ScrollWords({ text, stopped }: { text: string; stopped: boolean }) {
  const ref = useScrollProgress(stopped)
  return <span ref={ref} className="scroll-words"><span className="sr-only">{text}</span><span aria-hidden="true">{text.split(' ').map((w, i) => <span data-word key={i}>{w} </span>)}</span></span>
}
export function Perspective({ stopped }: { stopped: boolean }) {
  const ref = useScrollProgress(stopped)
  const screens = [{ id: 'seninha', title: 'Salão Seninha', note: 'Proposta em revisão', capture: manifest.projects.seninha[0] }, { id: 'trimm', title: 'Trimm / Fivonn', note: 'Execução local · demonstração', capture: manifest.projects.trimm[0] }, { id: 'financas', title: 'Finanças Já', note: 'Página pública · demonstração', capture: manifest.projects.financas[1] }]
  return <section className="perspective-section container" aria-labelledby="diagonal-title">
    <div className="section-heading"><h2 id="diagonal-title">Interfaces em perspectiva.</h2><p><ScrollWords stopped={stopped} text="Contextos diferentes. A mesma atenção à experiência, da primeira ideia aos pequenos detalhes." /></p></div>
    <div ref={ref} className="perspective-stage"><div className="perspective-composition">{screens.map((s, i) => <figure className={`perspective-screen screen-${i}`} key={s.id}><div className="browser-bar" aria-hidden="true"><span>● ● ●</span><span>{s.title}</span></div><img src={s.capture.src} width="1280" height="800" alt={`${s.title}: ${s.capture.label}`} loading="lazy" /><figcaption><strong>{s.title}</strong><span>{s.note}</span></figcaption></figure>)}</div></div>
    <details className="perspective-gallery"><summary>Explorar as telas do Salão Seninha</summary><ProjectGallery name="Salão Seninha" captures={manifest.projects.seninha} /></details>
  </section>
}

export function SessionIntro({ stopped }: { stopped: boolean }) {
  const [state, setState] = useState(() => { try { return !stopped && !location.hash && !sessionStorage.getItem('robert-intro-seen') } catch { return false } })
  const [word, setWord] = useState(0)
  const clipPath = useMotionValue('ellipse(150% 140% at 50% 0%)')
  const button = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!state) return
    const previous = document.activeElement as HTMLElement | null
    const finish = () => { setState(false); if (document.activeElement === button.current) previous?.focus() }
    try { sessionStorage.setItem('robert-intro-seen', '1') } catch { finish(); return }
    if (stopped) { finish(); return }
    const keys = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Tab') finish() }
    document.addEventListener('keydown', keys)
    let raf = 0
    const curve = () => {
      const start = performance.now()
      const frame = () => {
        const t = Math.min(1, (performance.now() - start) / 500)
        const eased = t * t * (3 - 2 * t)
        clipPath.set(`ellipse(${150 - 65 * eased}% ${140 * (1 - eased)}% at 50% 0%)`)
        if (t < 1) raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }
    const timers = [setTimeout(() => setWord(1), 420), setTimeout(() => setWord(2), 840), setTimeout(curve, 1200), setTimeout(finish, 1750), setTimeout(finish, 2600)]
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); document.removeEventListener('keydown', keys) }
  }, [state, stopped, clipPath])
  // Page remains mounted, visible and independently usable; no inert/scroll lock.
  return state && !stopped ? <motion.div className="session-intro" style={{ clipPath }}>
    <span className="intro-signature">Robert Rodrigues · portfólio</span><div className="intro-word" aria-hidden="true">{['Construir.', 'Aprender.', 'Refinar.'][word]}</div><button ref={button} className="button secondary" onClick={() => setState(false)}>Pular introdução</button>
  </motion.div> : null
}
