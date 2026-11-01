import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { limit, neutralPose, sculptureQuality } from './sculptureControls'
const Sculpture = lazy(() => import('./Sculpture'))

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? null : this.props.children }
}

export default function SculptureStage({ stopped }) {
  const ref = useRef(null)
  const viewport = useRef(null)
  const interaction = useRef(neutralPose())
  const drag = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(document.hidden)
  const [lost, setLost] = useState(false)
  const [exploring, setExploring] = useState(false)
  const [coarse, setCoarse] = useState(() => matchMedia('(max-width: 600px), (pointer: coarse)').matches)
  const [saving, setSaving] = useState(() => Boolean(navigator.connection?.saveData))
  const fail = useCallback(() => setLost(true), [])
  const [capable] = useState(() => {
    try { const c = document.createElement('canvas'); const gl = c.getContext('webgl2'); if (!gl) return false; gl.getExtension('WEBGL_lose_context')?.loseContext(); return true } catch { return false }
  })
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(viewport.current)
    const visibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', visibility)
    const query = matchMedia('(max-width: 600px), (pointer: coarse)')
    const device = () => setCoarse(query.matches)
    const data = () => setSaving(Boolean(navigator.connection?.saveData))
    query.addEventListener('change', device)
    navigator.connection?.addEventListener('change', data)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); query.removeEventListener('change', device); navigator.connection?.removeEventListener('change', data) }
  }, [])
  const running = visible && !hidden && !stopped && !saving && capable && !lost && (!coarse || exploring)
  const quality = sculptureQuality({ deviceDpr: devicePixelRatio, coarse, saveData: saving, memory: navigator.deviceMemory || 8, cores: navigator.hardwareConcurrency || 8 })
  useEffect(() => {
    if (running) return
    const el = viewport.current
    const gesture = drag.current
    drag.current = null
    if (gesture && el.hasPointerCapture(gesture.id)) el.releasePointerCapture(gesture.id)
    delete el.dataset.dragging
    interaction.current = neutralPose()
  }, [running])

  function finish(event) {
    const gesture = drag.current
    drag.current = null
    interaction.current.dragging = false
    delete viewport.current.dataset.dragging
    if (gesture && event.currentTarget.hasPointerCapture(gesture.id)) event.currentTarget.releasePointerCapture(gesture.id)
  }
  function reset() {
    const el = viewport.current
    const gesture = drag.current
    drag.current = null
    if (gesture && el.hasPointerCapture(gesture.id)) el.releasePointerCapture(gesture.id)
    delete el.dataset.dragging
    interaction.current = neutralPose()
  }
  function down(event) {
    if (!running || !event.isPrimary || event.button !== 0) return
    const el = event.currentTarget
    const box = el.getBoundingClientRect()
    el.focus({ preventScroll: true })
    drag.current = { id: event.pointerId, clientX: event.clientX, clientY: event.clientY, width: box.width, height: box.height, yaw: interaction.current.yaw, pitch: interaction.current.pitch }
    interaction.current.dragging = true
    interaction.current.hoverYaw = 0; interaction.current.hoverPitch = 0
    el.dataset.dragging = 'true'
    el.setPointerCapture(event.pointerId)
  }
  function move(event) {
    if (!running) return
    const gesture = drag.current
    if (gesture && gesture.id === event.pointerId) {
      const pose = interaction.current
      pose.yaw = limit(gesture.yaw + (event.clientX - gesture.clientX) / gesture.width * 1.7, -.6, .6)
      if (event.pointerType !== 'touch') pose.pitch = limit(gesture.pitch + (event.clientY - gesture.clientY) / gesture.height * .85, -.28, .28)
      pose.x = pose.yaw * .12
      pose.y = pose.pitch * .12
    }
  }
  function keys(event) {
    if (!running) return
    const pose = interaction.current
    if (['Home', 'r', 'R', 'Escape'].includes(event.key)) { event.preventDefault(); reset(); return }
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
    event.preventDefault()
    pose.yaw = limit(pose.yaw + (event.key === 'ArrowLeft' ? -.12 : event.key === 'ArrowRight' ? .12 : 0), -.6, .6)
    pose.pitch = limit(pose.pitch + (event.key === 'ArrowUp' ? -.08 : event.key === 'ArrowDown' ? .08 : 0), -.28, .28)
    pose.x = pose.yaw * .12; pose.y = pose.pitch * .12
  }
  return <div className="sculpture-stage" ref={ref}>
    <div ref={viewport} className="sculpture-viewport" role="group" aria-label={running ? 'Elo azul em 3D' : 'Elo azul em imagem estática'} aria-describedby="sculpture-help" tabIndex={running ? 0 : -1} onPointerDown={down} onPointerMove={move} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish} onBlur={finish} onKeyDown={keys}>
      <img className="sculpture-projection" src="/imgs/sculpted-loop.svg" width="480" height="420" alt="Elo azul fechado com acabamento liso e sombra, representação estática." aria-hidden={running} />
      {running && <SceneBoundary onFailure={fail}><Suspense fallback={null}><div className="sculpture-canvas" aria-hidden="true"><Sculpture onFailure={fail} interaction={interaction} quality={quality} /></div></Suspense></SceneBoundary>}
    </div>
    <div className="sculpture-footer">
      <p id="sculpture-help">{running ? 'Arraste ou use as setas. R redefine.' : stopped ? 'Imagem estática. Movimento pausado ou reduzido.' : saving ? 'Imagem estática para economizar dados.' : 'Elo azul em versão estática.'}</p>
      {running && <button className="sculpture-action" type="button" onClick={reset}>Redefinir objeto</button>}
      {coarse && capable && !lost && !stopped && !saving && <button className="sculpture-action" type="button" onClick={() => { reset(); setExploring(!exploring) }}>{exploring ? 'Voltar à imagem' : 'Explorar em 3D'}</button>}
    </div>
  </div>
}
