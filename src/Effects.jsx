import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
const Liquid = lazy(() => import('./Liquid'))


export function Reveal({ children, stopped }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      el.classList.toggle('entered', entry.isIntersecting)
    }, { threshold: .12 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`scroll-reveal ${stopped ? 'still' : ''}`}>{children}</div>
}

export function MinimalCard({ children, ...props }) {
  // Further local adaptation of Cult UI MinimalCard: semantic composable shell.
  // This editorial revision keeps depth on project media, not every card.
  return <article className="minimal-card" {...props}>{children}</article>
}

export function Tilt({ children, stopped }) {
  const ref = useRef(null)
  const frame = useRef(0)
  const bounds = useRef(null)
  useEffect(() => () => cancelAnimationFrame(frame.current), [])
  function move(event) {
    if (stopped || event.pointerType !== 'mouse') return
    const el = ref.current
    const box = bounds.current || (bounds.current = el.getBoundingClientRect())
    const x = (event.clientX - box.x) / box.width - .5
    const y = (event.clientY - box.y) / box.height - .5
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => { el.style.transform = `rotateX(${-y * 6}deg) rotateY(${x * 8}deg)` })
  }
  function reset() { cancelAnimationFrame(frame.current); bounds.current = null; ref.current.style.transform = '' }
  return <div className="perspective"><div ref={ref} className="image-tilt" onPointerEnter={() => { bounds.current = ref.current.getBoundingClientRect() }} onPointerMove={move} onPointerLeave={reset} onBlur={reset}>{children}</div></div>
}

class ShaderBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <span className="shader-message">Apresentação estática. Todas as informações continuam disponíveis.</span> : this.props.children }
}

export function Service({ stopped }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const [lost, setLost] = useState(false)
  const fail = useCallback(() => setLost(true), [])
  const [hidden, setHidden] = useState(document.hidden)
  const [capable] = useState(() => {
    if (matchMedia('(max-width: 600px)').matches || navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory < 4)) return false
    try { const c = document.createElement('canvas'); const gl = c.getContext('webgl2'); if (!gl) return false; gl.getExtension('WEBGL_lose_context')?.loseContext(); return true } catch { return false }
  })
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: '0px' })
    observer.observe(ref.current)
    const visibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', visibility)
    const loss = e => { e.preventDefault(); setLost(true) }
    // Error boundaries do not catch errors thrown from an asynchronous R3F loop.
    // Keep the error observable; only remove this decorative renderer.
    const renderError = e => {
      if (/ShaderGradient|WebGL|THREE\.|shader|cube_uv/i.test(e.message || '') || /Liquid-/.test(e.filename || '')) setLost(true)
    }
    window.addEventListener('error', renderError)
    const el = ref.current
    el.addEventListener('webglcontextlost', loss, true)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); el.removeEventListener('webglcontextlost', loss, true); window.removeEventListener('error', renderError) }
  }, [])
  const running = active && !hidden && !stopped && capable && !lost
  return <section className="service-section container" aria-labelledby="service-title">
    <div className="service-copy"><h2 id="service-title">Uma ideia.<br />Uma primeira página.</h2><p>Uma landing page para apresentar seu trabalho com clareza: até cinco seções, responsividade, links de contato e uma rodada consolidada de ajustes.</p><details><summary>O que está incluído</summary><p>Manutenção: uma pequena alteração de conteúdo por mês, não novas funcionalidades. Agenda, pagamentos, login, integrações pagas e administração exigem escopo separado.</p><p>Cerca de sete dias após brief e materiais aprovados, sujeito a confirmação. Valores de referência para revisão, sem contratação automática.</p></details></div>
    <div ref={ref} className="service-stage" data-shader-state={running ? 'running' : 'static'}>
      <div className="liquid-surface" aria-hidden="true">
        {running && <ShaderBoundary><Suspense fallback={<span>Carregando visual…</span>}><Liquid onFailure={fail} /></Suspense></ShaderBoundary>}
      </div>
      <div className="glass-price"><h3>Landing page inicial</h3><p className="price">R$130 <span>implantação</span></p><p>R$10/mês de manutenção.<br />Domínio pago pelo cliente.</p>
        <p className="commercial-note">Referência para conversar.<br />Escopo e condições sujeitos à confirmação.</p>
      </div>
    </div>
  </section>
}
