import { useEffect, useRef } from 'react'
import type { Application } from '@splinetool/runtime'

// Public API of runtime 1.12.98. Kept in a lazy chunk; no private renderer fields.
export default function SplineRuntime({ scene, onLoad, onUnload, onFailure }: {
  scene: string
  onLoad: () => void
  onUnload: () => void
  onFailure: (reason: string) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const abort = new AbortController()
    let cancelled = false
    let app: Application | undefined
    let resize: ResizeObserver | undefined
    let loaded = false
    const dispose = () => {
      resize?.disconnect()
      if (app) {
        app.stop()
        app.dispose()
        app = undefined
      }
    }
    const fail = (reason: string) => {
      if (cancelled) return
      cancelled = true
      clearTimeout(timeout)
      abort.abort()
      dispose()
      onFailure(reason)
    }
    const lost = (event: Event) => {
      event.preventDefault()
      fail('context-lost')
    }
    canvas.addEventListener('webglcontextlost', lost)
    const timeout = window.setTimeout(() => fail('load-timeout'), 20000)
    // Test capability before asking the runtime to decode assets. Do not create a
    // second permanent context or modify the runtime's own context options.
    const probe = document.createElement('canvas')
    try {
      const gl = probe.getContext('webgl2')
      if (!gl) throw new Error('WebGL unavailable')
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    } catch { fail('webgl-unavailable'); return () => { clearTimeout(timeout); canvas.removeEventListener('webglcontextlost', lost) } }
    import('@splinetool/runtime').then(async ({ Application }) => {
      if (cancelled) return
      const instance = new Application(canvas, { renderMode: 'auto', wasmPath: '/scenes/runtime-1.12.98' })
      app = instance
      // A late load completion is disposed again; it must not resurrect an unmounted renderer.
      await instance.load(scene, undefined, { signal: abort.signal, credentials: 'same-origin' })
      if (cancelled) { instance.stop(); instance.dispose(); return }
      loaded = true
      clearTimeout(timeout)
      instance.setGlobalEvents(false)
      resize = new ResizeObserver(() => {
        if (cancelled) return
        const box = canvas.parentElement!.getBoundingClientRect()
        instance.setSize(Math.max(1, box.width), Math.max(1, box.height))
        instance.requestRender()
      })
      resize.observe(canvas.parentElement!)
      canvas.dataset.splineLoaded = 'true'
      onLoad()
    }).catch(() => fail('load-error'))
    return () => {
      cancelled = true
      clearTimeout(timeout)
      abort.abort()
      canvas.removeEventListener('webglcontextlost', lost)
      dispose()
      delete canvas.dataset.splineLoaded
      onUnload()
      // Do not force context loss while a scene is still compiling/loading.
      if (loaded) {
        try { canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext() } catch { /* Already lost. */ }
      }
    }
  }, [scene, onLoad, onUnload, onFailure])
  return <canvas ref={canvasRef} aria-hidden="true" />
}
