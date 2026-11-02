import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { ShaderMount } from '@paper-design/shaders'
import { useLocalEffects } from './use-local-effects'

// Adapted from Johuniq / JolyUI liquid-metal-button, MIT.
// Original layered chrome, dark inset and Paper shader; local lifecycle/accessibility revision.
export default function LiquidMetalButton({ children, href, onClick, stopped = false, type = 'button' }: {
  children: ReactNode; href?: string; onClick?: () => void; stopped?: boolean; type?: 'button' | 'submit'
}) {
  const root = useRef<HTMLSpanElement>(null)
  const shader = useRef<HTMLSpanElement>(null)
  const mount = useRef<ShaderMount | null>(null)
  const active = useLocalEffects(root, stopped)
  const [failed, setFailed] = useState(false)
  const [hover, setHover] = useState(false)
  useEffect(() => {
    if (!active || failed || !shader.current) return
    const el = shader.current
    const loss = (event: Event) => { event.preventDefault(); setFailed(true) }
    el.addEventListener('webglcontextlost', loss, true)
    let cancelled = false
    import('@paper-design/shaders').then(({ ShaderMount, liquidMetalFragmentShader }) => {
      if (cancelled) return
      mount.current = new ShaderMount(el, liquidMetalFragmentShader, {
        u_repetition: 4, u_softness: .5, u_shiftRed: .05, u_shiftBlue: .05,
        u_distortion: 0, u_contour: 0, u_angle: 45, u_scale: 8, u_shape: 1,
        u_offsetX: .1, u_offsetY: -.1, u_colorBack: [0, 0, 0, 1], u_colorTint: [1, 1, 1, 1],
        u_isImage: false, u_fit: 2, u_rotation: 0, u_originX: .5, u_originY: .5,
        u_worldWidth: 0, u_worldHeight: 0,
      }, { alpha: true, antialias: false }, .6, 0, 1, 160000)
    }).catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true; mount.current?.setSpeed(0); mount.current?.dispose(); mount.current = null; el.removeEventListener('webglcontextlost', loss, true) }
  }, [active, failed])
  useEffect(() => { mount.current?.setSpeed(active ? (hover ? 1 : .6) : 0) }, [active, hover])
  const content = <><span ref={shader} className="metal-shader" aria-hidden="true" /><span className="metal-inset" aria-hidden="true" /><span className="metal-label">{children}</span></>
  const events = { onPointerEnter: () => setHover(true), onPointerLeave: () => setHover(false), onFocus: () => setHover(true), onBlur: () => setHover(false) }
  return <span ref={root} className="metal-shell" data-metal-state={failed ? 'fallback' : active ? 'webgl' : 'static'}>
    {href ? <a className="metal-control" href={href} {...events}>{content}</a> : <button className="metal-control" type={type} onClick={onClick} {...events}>{content}</button>}
  </span>
}
