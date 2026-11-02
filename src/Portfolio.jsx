import { useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Copy, Github, X } from 'lucide-react'
import './Portfolio.css'
import { Reveal, MinimalCard, Service } from './Effects'
import GlassFolder from './components/ui/glass-folder-cards'
import WildHuntFooter from './components/ui/wild-hunt-footer'
import RobotPreview from './components/ui/robot-preview'
import SectionNavigation from '@/components/ui/section-navigation'
import LiquidMetalButton from './components/ui/liquid-metal-button'
import Timeline2 from './components/ui/timeline2'
import AboutRobert from './components/ui/about-robert'
import ProjectGallery from './components/ui/project-gallery'
import { DitherTrail, MessageReveal } from './components/ui/dither-experience'
import capturesManifest from '../public/imgs/projects/manifest.json'
import { useMotion } from './useMotion'
import './Effects.css'
import './Dark.css'
import ViewportThreads from './components/ui/viewport-threads'
import { Perspective, ScrollWords, SessionIntro } from './components/ui/scroll-story'
import './ScrollThreads.css'

const projects = [
  {
    id: 'seninha', name: 'Salão Seninha', category: 'Site para um negócio local',
    status: 'Proposta em revisão', image: '/imgs/seninha-landing.png', width: 1440, height: 1000,
    alt: 'Captura real da landing do Salão Seninha: cabeçalho e apresentação de cortes infantis e cuidado para a família', caption: 'Captura da landing page',
    description: 'Um site para apresentar o salão infantil e adulto de Contagem, seus serviços e as formas de contato.',
    details: 'Desenvolvido com Astro, TypeScript e CSS. A proposta está em revisão, sem contratação ou entrega final confirmada. O agendamento é combinado diretamente com a equipe do salão; não há agenda automática.',
    tags: ['Astro', 'TypeScript', 'CSS'],
    link: 'https://curly-recipe-ed07.robertrodriguesdecastro.workers.dev/', linkLabel: 'Ver preview em revisão',
  },
  {
    id: 'financas', name: 'Finanças Já', category: 'Projeto pessoal',
    status: 'Organização financeira', image: '/imgs/img1.png', width: 1366, height: 633,
    alt: 'Captura original da interface do projeto Finanças Já', caption: 'Captura do projeto',
    description: 'Organização financeira pessoal: uma forma de reunir gastos e orçamentos em uma interface.',
    details: 'Capturas da página pública de demonstração. Não comprovam dados financeiros reais nem as alegações de marketing. O repositório continua privado e não está disponível para consulta pública.',
    tags: ['Finanças pessoais', 'Interface web'], private: true,
    link: 'https://financasja.free.nf/', linkLabel: 'Ver página pública',
  },
  {
    id: 'trimm', name: 'Trimm Company / Fivonn', category: 'Trabalho em equipe',
    status: 'Projeto para barbearias', image: '/imgs/img2.png', width: 1366, height: 633,
    alt: 'Captura original da interface do projeto Trimm Company, também chamado Fivonn', caption: 'Captura do projeto',
    description: 'Um projeto em equipe voltado à experiência de barbearias, profissionais e seus clientes.',
    details: 'Trabalho colaborativo para barbearias. O código público permite conhecer o projeto e sua estrutura. A captura fornecida documenta a interface, sem afirmar operação comercial ou entrega a clientes.',
    tags: ['Colaboração', 'Interface web'],
    link: 'https://github.com/KaykyFideliss/TrimmCompany-', linkLabel: 'Ver repositório',
  },
  {
    id: 'myday', name: 'MyDay', category: 'Projeto pessoal', status: 'Organização de tarefas',
    description: 'Um projeto em JavaScript para organizar tarefas e dar mais clareza ao que fazer no dia.',
    details: 'Projeto pessoal de tarefas em JavaScript, com repositório público. Capturas de execução local dos componentes originais, com dados de demonstração. O diálogo foi aberto sem salvar uma tarefa.',
    tags: ['JavaScript', 'Tarefas'],
    link: 'https://github.com/rodriguesz9/MyDay', linkLabel: 'Ver repositório',
  },
]

function ExternalLink({ href, children, className = '' }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`external-link ${className}`}>
    {children}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span>
  </a>
}

function Project({ project, stopped }) {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef(null)
  const captures = capturesManifest.projects[project.id] || []
  return <MinimalCard aria-labelledby={`title-${project.id}`}>
    <div className="project-folder"><GlassFolder label={project.name} tone="dark" meta="Explorar capturas" image={captures[0]?.src} art="none" action="none" appear={false} width={240} stopped={stopped}
      files={captures.map(capture => ({ name: capture.label, meta: 'Captura real', image: capture.src }))}
      onOpenChange={open => { if (open) setExpanded(true) }}
      onFileSelect={() => { setExpanded(true); requestAnimationFrame(() => contentRef.current?.focus()) }} />
    </div>
    <div className="project-copy">
    <div className="project-category"><span>{project.category}</span><span>{project.status}</span></div>
    <h3 id={`title-${project.id}`}>{project.name}</h3>
    <p className="project-description">{project.description}</p>
    <div hidden={!expanded} ref={contentRef} tabIndex={-1} className="folder-content" aria-label={`Conteúdo de ${project.name}`}>
    <ProjectGallery name={project.name} captures={captures} />
    <button className="external-link folder-close" onClick={() => setExpanded(false)}>Recolher conteúdo</button>
    </div>
    <ul className="tags" aria-label={`Tecnologias e contexto de ${project.name}`}>
      {project.tags.map(tag => <li key={tag}>{tag}</li>)}
    </ul>
    <details>
      <summary>Contexto do projeto<span className="sr-only"> {project.name}</span></summary>
      <p>{project.details}</p>
    </details>
    <div className="project-link">
      {project.link && <ExternalLink href={project.link}>{project.linkLabel}</ExternalLink>}{project.private && <span className="private-note">Repositório privado</span>}
    </div>
    </div>
  </MinimalCard>
}

function BriefDialog({ dialogRef }) {
  const [idea, setIdea] = useState('')
  const [kind, setKind] = useState('Site de apresentação')
  const [error, setError] = useState('')
  const [summary, setSummary] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const ideaRef = useRef(null)

  function generate(event) {
    event.preventDefault()
    setCopyStatus('')
    if (idea.trim().length < 10) {
      setError('Descreva sua ideia com pelo menos 10 caracteres para preparar o resumo.')
      setSummary('')
      ideaRef.current?.focus()
      return
    }
    setError('')
    setSummary(`Ideia para conversar com Robert Rodrigues\n\nTipo: ${kind}\n\nO que imagino: ${idea.trim()}\n\nResumo inicial para revisão. Escopo e condições ainda precisam ser conversados.`)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopyStatus('Resumo copiado. Você decide onde compartilhar.')
    } catch {
      setCopyStatus('Selecione o resumo e copie manualmente. O navegador não permitiu a cópia automática.')
    }
  }

  function containFocus(event) {
    if (event.key !== 'Tab') return
    const controls = [...event.currentTarget.querySelectorAll('button, textarea, select')]
      .filter(control => !control.disabled && control.getClientRects().length)
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return <dialog ref={dialogRef} aria-labelledby="brief-title" aria-describedby="brief-description" className="brief-dialog" onKeyDown={containFocus}>
    <div className="dialog-heading"><h2 id="brief-title">Uma ideia para começar.</h2><button type="button" className="icon-button" aria-label="Fechar resumo" onClick={() => dialogRef.current.close()}><X size={22} /></button></div>
    <p id="brief-description">Prepare um resumo para copiar. Nada é enviado, salvo ou compartilhado por este site. Não inclua dados pessoais.</p>
    <form onSubmit={generate} noValidate>
      <label htmlFor="ideia">Sua ideia</label>
      <textarea ref={ideaRef} id="ideia" autoFocus maxLength={1000} rows={4} value={idea} onChange={event => { setIdea(event.target.value); setSummary(''); setCopyStatus(''); setError('') }} aria-invalid={Boolean(error)} aria-describedby={error ? 'idea-error' : 'idea-hint'} placeholder="O que você quer apresentar ou organizar?" />
      <p className="field-hint" id="idea-hint">Entre 10 e 1.000 caracteres. Não precisa ter tudo definido.</p>
      {error && <p id="idea-error" role="alert" className="field-error">{error}</p>}
      <label htmlFor="tipo">Tipo de projeto</label>
      <select id="tipo" value={kind} onChange={event => { setKind(event.target.value); setSummary(''); setCopyStatus('') }}>
        <option>Site de apresentação</option><option>Interface web</option><option>Ainda quero entender as possibilidades</option>
      </select>
      <button className="button primary" type="submit">Gerar resumo</button>
    </form>
    {summary && <div className="summary-result">
      <label htmlFor="resumo">Resumo para copiar</label>
      <textarea id="resumo" rows={7} readOnly value={summary} />
      <button className="button secondary" type="button" onClick={copy}><Copy size={17} aria-hidden="true" />Copiar resumo</button>
    </div>}
    <p className="copy-status" role="status">{copyStatus}</p>
  </dialog>
}

export default function Portfolio() {
  const dialogRef = useRef(null)
  const { stopped, paused, setPaused, reduced } = useMotion()
  function openBrief() {
    dialogRef.current.showModal()
    dialogRef.current.querySelector('#ideia').focus()
  }
  return <div className={stopped ? 'portfolio motion-stopped' : 'portfolio'}>
    <SessionIntro stopped={stopped} />
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header container">
      <a href="#inicio" className="identity" aria-label="Robert Rodrigues, início">Robert Rodrigues<span className="identity-dot" aria-hidden="true">.</span></a>
      <SectionNavigation />
      <button className="motion-control" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Retomar efeitos' : 'Pausar efeitos'}</button>
      {reduced && <span className="sr-only">Movimento reduzido ativo.</span>}
    </header>
    <main id="conteudo" tabIndex={-1}>
      <section id="inicio" className="intro container" aria-labelledby="intro-title">
        <div className="intro-editorial"><div className="intro-heading"><p className="intro-role">Desenvolvimento web</p><h1 id="intro-title">Robert<br />Rodrigues.</h1></div>
        <div className="intro-copy"><p>Gosto de transformar ideias em interfaces que fazem sentido.</p><p className="muted">Projetos pessoais, trabalho em equipe e aprendizado na prática. Um pouco do que estou construindo está aqui.</p><LiquidMetalButton href="#projetos" stopped={stopped}>Conhecer projetos<ArrowDown size={18} aria-hidden="true" /></LiquidMetalButton></div>
        </div><RobotPreview stopped={stopped} />
      </section>
      <section id="projetos" className="projects-section container" aria-labelledby="projects-title">
        <div className="section-heading"><h2 id="projects-title">Projetos selecionados</h2><p>Da ideia à interface, cada projeto tem seu contexto.</p></div>
        <div className="projects-grid">{projects.map(project => <Reveal key={project.id} stopped={stopped}><Project project={project} stopped={stopped} /></Reveal>)}</div>
      </section>

      <div id="sobre">
      <AboutRobert stopped={stopped} />
      <Timeline2 stopped={stopped} />
      <Perspective stopped={stopped} />
      <MessageReveal stopped={stopped} />
      <Service stopped={stopped} />
      </div>
      <section id="contato" className="contact-section container" aria-labelledby="contact-title">
        <ViewportThreads paused={stopped} />
        <div className="contact-copy"><h2 id="contact-title"><ScrollWords stopped={stopped} text="O próximo projeto começa com uma ideia." /></h2><p>Uma ideia, uma dúvida ou um projeto em mente? Vamos conversar.</p></div>
        <div className="contact-actions"><a className="button primary" href="mailto:robertrodriguesdecastro@gmail.com">Enviar e-mail<ArrowUpRight size={18} aria-hidden="true" /></a><a className="button secondary" href="https://wa.me/5531994090721" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp<ArrowUpRight size={18} aria-hidden="true" /></a><p className="contact-note">(31) 99409-0721 · Você decide quando iniciar o contato.</p><button className="external-link" onClick={openBrief}>Preparar resumo local</button><ExternalLink href="https://github.com/rodriguesz9"><Github size={18} aria-hidden="true" />Encontrar no GitHub</ExternalLink></div>
      </section>
    </main>
    <WildHuntFooter stopped={stopped} wordmark="Robert" preset="ink" palette={{ background: '#050506', ink: '#eceef2' }} fontFamily="system-ui, -apple-system, sans-serif" height="max(900px, 100svh)" sigils={false}
      tagline="Robert Rodrigues · desenvolvimento web" sideNote="Construir · aprender · refinar"
      legal="Robert Rodrigues · Feito com React"
      colophon="Peter Nicolai Arbo, Åsgårdsreien, 1872. Domínio público declarado pelo autor do componente; pintura e recorte da demo oficial. Wild Hunt Footer: Kedhareswer Naidu, MIT. Proveniência e licença em /licenses/quatro/."
      columns={[
        { title: 'Projetos', links: [{ label: 'Explorar projetos', href: '#projetos' }] },
        { title: 'Percurso', links: [{ label: 'Sobre Robert', href: '#sobre' }] },
        { title: 'Código', links: [{ label: 'GitHub', href: 'https://github.com/rodriguesz9' }] },
        { title: 'Uma ideia', links: [{ label: 'Preparar resumo', href: '#contato' }] },
      ]} />
    <DitherTrail stopped={stopped} />
    <BriefDialog dialogRef={dialogRef} />
  </div>
}
