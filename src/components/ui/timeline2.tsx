import { useEffect, useRef } from 'react'
import { useLocalEffects } from './use-local-effects'

// Timeline2, TheOrcDev / 8bitcn-ui, MIT: checkpoint, connector, title and description
// composition retained; scoped style and cumulative scroll are local adaptations.
const steps = [
  { icon: 'I', title: 'Descoberta', description: 'Entender a ideia, o público e o que precisa estar na página.' },
  { icon: 'II', title: 'Design', description: 'Organizar conteúdo, hierarquia e direção visual para aprovação.' },
  { icon: 'III', title: 'Desenvolvimento', description: 'Transformar o brief aprovado em uma interface responsiva.' },
  { icon: 'IV', title: 'Testes e entrega para revisão', description: 'Verificar navegação, acessibilidade e telas. Publicação é uma decisão separada.' },
]
export default function Timeline2({ stopped }: { stopped: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const active = useLocalEffects(ref, stopped)
  useEffect(() => {
    const el = ref.current!
    const media = matchMedia('(min-width: 1000px) and (pointer: fine)')
    let raf = 0
    const update = () => {
      raf = 0
      const enabled = active && media.matches
      el.dataset.animated = String(enabled)
      const rect = el.getBoundingClientRect()
      const progress = enabled ? Math.max(0, Math.min(1, (150 - rect.top) / (rect.height - innerHeight))) : 1
      const count = Math.min(4, 1 + Math.floor(progress * 3.999))
      el.dataset.stage = String(count)
      el.style.setProperty('--quest-progress', String((count - 1) / 3))
      el.querySelectorAll<HTMLElement>('.quest-step').forEach((step, i) => {
        step.dataset.reached = String(i < count)
        // Remain in the accessibility tree; keyboard focus reveals all, never a hidden stop.
      })
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule)
    media.addEventListener('change', schedule)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); media.removeEventListener('change', schedule) }
  }, [active])
  return <section ref={ref} className="quest-section" aria-labelledby="quest-title" data-stage="4">
    <div className="quest-sticky container">
      <div className="section-heading"><h2 id="quest-title">Da ideia à interface</h2><p>Um percurso construído em conjunto.</p></div>
      <ol className="quest-track" tabIndex={0} aria-label="Etapas do trabalho">
        <li className="quest-connector" aria-hidden="true"><span /></li>
        {steps.map(step => <li key={step.title} className="quest-step" data-reached="true"><span className="quest-checkpoint" aria-hidden="true">{step.icon}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}
      </ol>
    </div>
  </section>
}
