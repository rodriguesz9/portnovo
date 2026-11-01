import { useEffect, useRef, useState } from 'react'

// Official Paper Perlin shader, listed by 21st.dev. Local lifecycle adapter;
// core is used because the React wrapper has no initialization-error callback.
export default function ProjectNoise({ stopped, variant = 'light' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(() => document.hidden)
  const [saveData, setSaveData] = useState(() => Boolean(navigator.connection?.saveData))
  const [failed, setFailed] = useState(false)
  const running = visible && !hidden && !saveData && !stopped && !failed

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .05 })
    observer.observe(ref.current)
    const visibility = () => setHidden(document.hidden)
    const connection = () => setSaveData(Boolean(navigator.connection?.saveData))
    document.addEventListener('visibilitychange', visibility)
    navigator.connection?.addEventListener('change', connection)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      navigator.connection?.removeEventListener('change', connection)
    }
  }, [])

  useEffect(() => {
    if (!running) return
    const host = ref.current
    let cancelled = false
    let mount
    let resize
    const loss = event => { event.preventDefault(); setFailed(true) }
    host.addEventListener('webglcontextlost', loss, true)
    const releaseContext = canvas => {
      try { canvas?.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext() }
      catch { /* Context creation itself may be unavailable or throw. */ }
    }
    const release = () => {
      resize?.disconnect()
      const canvas = mount?.canvasElement
      mount?.setSpeed(0)
      mount?.dispose()
      releaseContext(canvas)
      mount = undefined
      // Also release a partially constructed renderer after initialization errors.
      for (const canvas of host.querySelectorAll('canvas')) {
        releaseContext(canvas)
        canvas.remove()
      }
    }
    import('@paper-design/shaders').then(({ ShaderMount, perlinNoiseFragmentShader, getShaderColorFromString }) => {
      if (cancelled) return
      try {
        const budget = () => Math.max(1, Math.floor(host.clientWidth * host.clientHeight * 1.25 ** 2))
        mount = new ShaderMount(host, perlinNoiseFragmentShader, {
          u_colorBack: getShaderColorFromString(variant === 'dark' ? '#101b32' : '#e8eef7'),
          u_colorFront: getShaderColorFromString(variant === 'dark' ? '#356ba6' : '#b5cae9'),
          u_proportion: .38, u_softness: .65, u_octaveCount: 2,
          u_persistence: .5, u_lacunarity: 1.8,
          u_fit: 0, u_scale: 1.4, u_rotation: 0,
          u_offsetX: 0, u_offsetY: 0, u_originX: .5, u_originY: .5,
          u_worldWidth: 0, u_worldHeight: 0,
        }, { alpha: false, antialias: false, powerPreference: 'low-power' }, .16, 0, 1, budget())
        const gl = mount.canvasElement.getContext('webgl2')
        const program = gl.getParameter(gl.CURRENT_PROGRAM)
        if (!program || !gl.getProgramParameter(program, gl.LINK_STATUS) || gl.getError() !== gl.NO_ERROR) throw new Error('Perlin initialization failed')
        resize = new ResizeObserver(() => mount?.setMaxPixelCount(budget()))
        resize.observe(host)
        host.dataset.noiseReady = 'true'
      } catch {
        release()
        setFailed(true)
      }
    }).catch(() => { if (!cancelled) setFailed(true) })
    return () => {
      cancelled = true
      host.removeEventListener('webglcontextlost', loss, true)
      release()
      delete host.dataset.noiseReady
    }
  }, [running, variant])

  return <div ref={ref} className="project-noise" aria-hidden="true" data-noise-state={failed ? 'unavailable' : running ? 'running' : 'static'} />
}
