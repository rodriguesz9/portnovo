'use client'

import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
const Spline = lazy(() => import('./spline-runtime'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallback?: ReactNode
  enabled?: boolean
}

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode; onFailure: (reason: string) => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure('component-error') }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

export function SplineScene({ scene, className, fallback = <p role="status">Cena 3D indisponível.</p>, enabled = false }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(() => document.hidden)
  const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection
  const [saveData, setSaveData] = useState(() => Boolean(connection?.saveData))
  const [state, setState] = useState('idle')
  const [failed, setFailed] = useState('')
  const loaded = useCallback(() => setState('loaded'), [])
  const unloaded = useCallback(() => setState('idle'), [])
  const fail = useCallback((reason: string) => { setFailed(reason); setState('error') }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .05 })
    observer.observe(ref.current!)
    const visibility = () => setHidden(document.hidden)
    const data = () => setSaveData(Boolean(connection?.saveData))
    document.addEventListener('visibilitychange', visibility)
    connection?.addEventListener('change', data)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); connection?.removeEventListener('change', data) }
  }, [connection])
  // Literal allowlist: neither external URLs nor encoded/path-normalized variants.
  const local = scene === '/scenes/scene.splinecode'
  const running = enabled && local && visible && !hidden && !saveData && !failed
  const status = failed ? 'error' : !enabled ? 'paused' : saveData ? 'save-data' : !visible || hidden ? 'idle' : state === 'loaded' ? 'loaded' : 'loading'
  return <div ref={ref} className={className} data-spline-state={status} data-spline-error={failed || undefined}>
    {running ? <SceneBoundary fallback={fallback} onFailure={fail}>
      <Suspense fallback={<p role="status">Carregando cena 3D…</p>}>
        <Spline scene={scene} onLoad={loaded} onUnload={unloaded} onFailure={fail} />
      </Suspense>
    </SceneBoundary> : <div className="spline-fallback">
      {fallback}
      <p role="status">{failed ? 'Cena 3D indisponível. Nenhum robô substituto está sendo exibido.' : saveData ? 'Economia de dados ativa. Cena 3D não carregada.' : !enabled ? 'Movimento pausado. Cena 3D não carregada.' : 'Cena 3D suspensa fora da área visível.'}</p>
      {failed && <button className="spline-action" type="button" onClick={() => { setFailed(''); setState('idle') }}>Tentar carregar novamente</button>}
    </div>}
  </div>
}
