import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiVite, SiTailwindcss, SiAstro, SiPhp, SiPython, SiFastapi, SiLaravel, SiSqlite, SiPostgresql, SiDocker, SiLinux, SiGit, SiGithub } from 'react-icons/si'
import { TbBrandVscode } from 'react-icons/tb'
import { useLocalEffects } from './use-local-effects'
import { WavyBlock, WavyBlockItem } from './wavy-block'
import { EncryptedText } from './encrypted-text'
const LiveOrb = lazy(() => import('./live-orb').then(module => ({ default: module.LiveOrb })))
import DataRain from './data-rain'

const stacks = [
  { label: 'Interfaces', items: [['HTML', SiHtml5], ['CSS', SiCss3], ['JavaScript', SiJavascript], ['TypeScript', SiTypescript], ['React', SiReact], ['Vite', SiVite], ['Tailwind', SiTailwindcss], ['Astro', SiAstro]] },
  { label: 'Backend', items: [['PHP', SiPhp], ['Python', SiPython], ['FastAPI', SiFastapi], ['Laravel', SiLaravel]] },
  { label: 'Dados', items: [['SQLite', SiSqlite], ['PostgreSQL', SiPostgresql]] },
  { label: 'Ambiente', items: [['Docker', SiDocker], ['Linux', SiLinux], ['Git', SiGit], ['GitHub', SiGithub], ['VS Code', TbBrandVscode]] },
] as const

export default function AboutRobert({ stopped }: { stopped: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const eligible = useLocalEffects(ref, stopped)
  const [desktop, setDesktop] = useState(false)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); observer.disconnect() }
    }, { rootMargin: '300px' })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const mq = matchMedia('(min-width: 1000px) and (pointer: fine)')
    const update = () => setDesktop(mq.matches)
    update(); mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return <section ref={ref} className="about-section" aria-labelledby="about-title">
    <DataRain stopped={stopped} />
    <div className="container about-grid">
      <div className="about-editorial">
        <h2 id="about-title" className="sr-only">Construir. Aprender. Refinar.</h2>
        <WavyBlock active={eligible && desktop} className="about-wavy" aria-hidden="true">
          {['Construir.', 'Aprender.', 'Refinar.'].map((phrase, index) => <WavyBlockItem key={phrase} index={index} className="about-wave-line">{phrase}</WavyBlockItem>)}
        </WavyBlock>
        <div className="about-orbs" aria-hidden="true">
          {near && <Suspense fallback={null}>
          <LiveOrb theme="dark" size={96} paused={stopped} />
          <LiveOrb theme="dark" variant="custom" color="#9575ec" eyeColor="#fafafa" size={96} paused={stopped} />
          <LiveOrb theme="dark" variant="webgl" size={96} paused={stopped} />
          </Suspense>}
        </div>
        <p className="about-caption">Curiosidade para experimentar.<br />Cuidado para dar forma.</p>
      </div>
      <div className="about-copy">
        <p className="about-kicker">Sobre Robert</p>
        <p className="about-idea"><EncryptedText text="Ideias que ganham forma em código." stopped={stopped} /></p>
        <p className="large-copy">Sou Robert Rodrigues. Programação é um hobby de que gosto muito: um espaço para experimentar ideias e dar forma a projetos pessoais e em equipe.</p>
        <p>Aprendo construindo, de interfaces a pequenas ferramentas de organização. Gosto de conectar conteúdo, responsividade e interações — e voltar aos detalhes para refinar o que fiz.</p>
        <p>Quero trabalhar em outra área, enquanto sigo explorando código por curiosidade e prazer em aprender.</p>
        <a href="https://github.com/rodriguesz9" target="_blank" rel="noopener noreferrer" className="external-link">Explorar meu GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span></a>
      </div>
    </div>
    <div className="container about-bento">
      <article className="about-panel about-education"><span className="about-panel-index">01 / Formação</span><h3>Técnico em TI</h3><p>Funec Riacho</p><span className="about-note">Em formação, aprendendo na prática.</span></article>
      <article className="about-panel about-stack"><span className="about-panel-index">02 / Ferramentas</span><h3>Tecnologias que exploro</h3><dl>
        {stacks.map(group => <div key={group.label}><dt>{group.label}</dt><dd>{group.items.map(([label, Icon]) => <span className="tech-chip" key={label}><Icon aria-hidden="true" focusable="false" /><span>{label}</span></span>)}</dd></div>)}
      </dl></article>
      <article className="about-panel about-courses"><span className="about-panel-index">03 / Aprendizado</span><h3>Cursos e estudos</h3><ul>
        <li><strong>Matheus Battisti</strong><span>Linux · React</span></li>
        <li><strong>Curso em Vídeo</strong><span>JavaScript · HTML · CSS · Python</span></li>
        <li><strong>CFBCursos</strong><span>JavaScript</span></li>
        <li><strong>CampCode</strong><span>FastAPI</span></li>
        <li><strong>Danki Code</strong><span>Hacker Ético</span></li>
      </ul></article>
    </div>
  </section>
}
