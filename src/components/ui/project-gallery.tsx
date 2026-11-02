import { useRef, useState } from 'react'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
export type Capture = { src: string; label: string; caption: string; width?: number; height?: number }
export default function ProjectGallery({ name, captures }: { name: string; captures: Capture[] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)
  const selected = captures[index]
  const select = (next: number) => { setIndex((next + captures.length) % captures.length); setFailed(false) }
  const close = () => { dialog.current?.close(); trigger.current?.focus() }
  function open(i: number, button: HTMLButtonElement) { trigger.current = button; select(i); dialog.current?.showModal() }
  return <div className="project-gallery">
    <div className="gallery-thumbnails">{captures.map((capture, i) => <button key={capture.src} className="gallery-thumb" onClick={e => open(i, e.currentTarget)} aria-label={`Ampliar ${name}: ${capture.label}`}><img src={capture.src} alt={capture.label} width={1280} height={800} loading="lazy" /><span>{capture.label}</span></button>)}</div>
    <dialog ref={dialog} className="media-dialog" aria-label={`Capturas de ${name}`} onCancel={close} onKeyDown={e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); select(index + 1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select(index - 1) }
      if (e.key === 'Tab') { const buttons = [...e.currentTarget.querySelectorAll('button')]; const first=buttons[0], last=buttons[buttons.length-1]; if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus()} }
    }}>
      <div className="media-heading"><div><h2>{name}</h2><p role="status">{selected?.label} · {index + 1} de {captures.length}. {selected?.caption}. Imagem estática.</p></div><button autoFocus className="icon-button" aria-label="Fechar captura" onClick={close}><X /></button></div>
      {failed ? <p>Captura indisponível. As outras imagens e o contexto continuam disponíveis.</p> : <img src={selected?.src} alt={`${name}: ${selected?.label}`} width={1280} height={800} onError={() => setFailed(true)} />}
      <div className="gallery-controls"><button className="button secondary" onClick={() => select(index - 1)}><ArrowLeft size={18} />Anterior</button><button className="button secondary" onClick={() => select(index + 1)}>Próxima<ArrowRight size={18} /></button></div>
    </dialog>
  </div>
}
