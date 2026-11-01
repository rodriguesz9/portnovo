import { useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, Copy, Github, X } from 'lucide-react'
import './Portfolio.css'
import { Reveal, MinimalCard, Tilt, Service } from './Effects'
import RobotPreview from './components/ui/robot-preview'
import ProjectNoise from './ProjectNoise'
import { useMotion } from './useMotion'
import './Effects.css'

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
    details: 'Projeto pessoal voltado à organização financeira. A imagem é uma captura fornecida do projeto, não uma demonstração interativa. O repositório é privado e não está disponível para consulta pública.',
    tags: ['Finanças pessoais', 'Interface web'], private: true,
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
    details: 'Projeto pessoal de tarefas em JavaScript, com repositório público. A composição acima é ilustrativa, criada para este portfólio; não é uma captura nem representa funcionalidades verificadas do aplicativo.',
    tags: ['JavaScript', 'Tarefas'],
    link: 'https://github.com/rodriguesz9/MyDay', linkLabel: 'Ver repositório',
  },
]

function ExternalLink({ href, children, className = '' }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`external-link ${className}`}>
    {children}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span>
  </a>
}

function ProjectVisual({ project, stopped }) {
  const [failed, setFailed] = useState(false)
  const mediaRef = useRef(null)
  return <figure>
    <div className={`project-visual visual-${project.id}`}>
      {project.id === 'myday' && <ProjectNoise stopped={stopped} />}
      {failed ? <p className="image-fallback">Imagem indisponível. O contexto do projeto está abaixo.</p>
        : project.image ? <button className="screen-button" aria-label={`Ampliar captura de ${project.name}`} onClick={() => mediaRef.current.showModal()}><span className="browser-edge" aria-hidden="true"><i /><i /><i /><span>{project.name}</span></span><img src={project.image} width={project.width} height={project.height} alt={project.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} /><span className="capture-peek" aria-hidden="true">Ver a interface em detalhe<ArrowUpRight size={18} /></span></button>
          : <div className="myday-composition" aria-hidden="true">
            <div className="myday-top"><span>MyDay</span><span>Seu dia, mais claro.</span></div>
            <div className="myday-title">Uma coisa<br />de cada vez.</div>
            <div className="task-line"><span className="task-check"><Check size={13} /></span><span>Organizar as ideias</span></div>
            <div className="task-line"><span className="task-circle" /><span>Dar o próximo passo</span></div>
          </div>}
    </div>
    <figcaption>{project.caption || 'Composição ilustrativa, não é captura do aplicativo'}</figcaption>
    {project.image && <dialog ref={mediaRef} className="media-dialog" aria-labelledby={`media-title-${project.id}`} onKeyDown={event => { if (event.key === 'Tab') { event.preventDefault(); event.currentTarget.querySelector('button').focus() } }}>
      <div className="media-heading"><div><h2 id={`media-title-${project.id}`}>{project.name}</h2><p>{project.caption}. Imagem estática, não é o aplicativo em execução.</p></div><button autoFocus type="button" className="icon-button" aria-label={`Fechar captura de ${project.name}`} onClick={() => mediaRef.current.close()}><X size={22} /></button></div>
      <img src={project.image} width={project.width} height={project.height} alt={project.alt} />
    </dialog>}
  </figure>
}

function Project({ project, stopped }) {
  return <MinimalCard aria-labelledby={`title-${project.id}`}>
    <Tilt stopped={stopped}><ProjectVisual project={project} stopped={stopped} /></Tilt>
    <div className="project-copy">
    <div className="project-category"><span>{project.category}</span><span>{project.status}</span></div>
    <h3 id={`title-${project.id}`}>{project.name}</h3>
    <p className="project-description">{project.description}</p>
    <ul className="tags" aria-label={`Tecnologias e contexto de ${project.name}`}>
      {project.tags.map(tag => <li key={tag}>{tag}</li>)}
    </ul>
    <details>
      <summary>Contexto do projeto<span className="sr-only"> {project.name}</span></summary>
      <p>{project.details}</p>
    </details>
    <div className="project-link">
      {project.link ? <ExternalLink href={project.link}>{project.linkLabel}</ExternalLink> : <span className="private-note">Repositório privado</span>}
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
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header container">
      <a href="#inicio" className="identity" aria-label="Robert Rodrigues, início">Robert Rodrigues<span className="identity-dot" aria-hidden="true">.</span></a>
      <nav aria-label="Principal"><a href="#projetos">Projetos</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></nav>
      <button className="motion-control" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Retomar efeitos' : 'Pausar efeitos'}</button>
      {reduced && <span className="sr-only">Movimento reduzido ativo.</span>}
    </header>
    <main id="conteudo" tabIndex={-1}>
      <section id="inicio" className="intro container" aria-labelledby="intro-title">
        <div className="intro-editorial"><div className="intro-heading"><p className="intro-role">Desenvolvimento web</p><h1 id="intro-title">Robert<br />Rodrigues.</h1></div>
        <div className="intro-copy"><p>Gosto de transformar ideias em interfaces que fazem sentido.</p><p className="muted">Projetos pessoais, trabalho em equipe e aprendizado na prática. Um pouco do que estou construindo está aqui.</p><a href="#projetos" className="button primary">Conhecer projetos<ArrowDown size={18} aria-hidden="true" /></a></div>
        </div><RobotPreview stopped={stopped} />
      </section>
      <section id="projetos" className="projects-section container" aria-labelledby="projects-title">
        <div className="section-heading"><h2 id="projects-title">Projetos selecionados</h2><p>Da ideia à interface, cada projeto tem seu contexto.</p></div>
        <div className="projects-grid">{projects.map(project => <Reveal key={project.id} stopped={stopped}><Project project={project} stopped={stopped} /></Reveal>)}</div>
      </section>

      <section id="sobre" className="about-section" aria-labelledby="about-title"><div className="container about-grid">
        <h2 id="about-title">Construir.<br />Aprender.<br />Refinar.</h2>
        <div className="about-copy"><p className="large-copy">Sou Robert Rodrigues. Meu interesse por desenvolvimento passa por entender uma ideia e encontrar uma forma clara de colocá-la na tela.</p><p>Meu percurso inclui estudos de Informática na Funec Riacho, projetos pessoais e experiências em equipe. Uso esses espaços para experimentar, resolver problemas e melhorar o que construo.</p><div className="tools"><h3>Ferramentas neste percurso</h3><p>JavaScript, React, Astro, TypeScript e CSS, presentes neste portfólio e nos projetos apresentados.</p></div><ExternalLink href="https://github.com/rodriguesz9">Explorar meu GitHub</ExternalLink></div>
      </div></section>
      <Service stopped={stopped} />
      <section id="contato" className="contact-section container" aria-labelledby="contact-title">
        <div><h2 id="contact-title">O próximo projeto<br />começa com uma ideia.</h2><p>Conheça meu trabalho no GitHub ou organize o que você tem em mente em um resumo para copiar.</p></div>
        <div className="contact-actions"><button className="button primary" onClick={openBrief}>Preparar resumo</button><ExternalLink href="https://github.com/rodriguesz9"><Github size={18} aria-hidden="true" />Encontrar no GitHub</ExternalLink><p className="contact-note">O resumo é local. Nenhuma mensagem é enviada.</p></div>
      </section>
    </main>
    <footer className="site-footer container"><span>Robert Rodrigues</span><span>Feito com React e atenção aos detalhes.</span><a href="#inicio">Voltar ao início<ArrowUpRight size={16} aria-hidden="true" /></a></footer>
    <BriefDialog dialogRef={dialogRef} />
  </div>
}
