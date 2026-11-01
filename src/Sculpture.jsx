import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MathUtils, PMREMGenerator, PCFSoftShadowMap } from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { createSculptedLoop } from './sculptedLoop'

function Ribbon({ onFailure, interaction, quality }) {
  const mesh = useRef(null)
  const light = useRef(null)
  const material = useRef(null)
  const elapsed = useRef(0)
  const wake = useRef(0)
  const antialias = useRef(false)
  const get = useThree(state => state.get)
  const geometry = useMemo(() => createSculptedLoop(), [])
  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(() => {
    const gl = get().gl
    const canvas = gl.domElement
    antialias.current = Boolean(gl.getContext().getContextAttributes()?.antialias)
    const lost = e => { e.preventDefault(); onFailure() }
    canvas.addEventListener('webglcontextlost', lost)
    const previous = gl.debug.onShaderError
    gl.debug.onShaderError = onFailure
    const shadow = light.current.shadow
    const probe = {
      disposed: false,
      shadowType: gl.shadowMap.type,
      readShadow: () => {
        const target = shadow.map
        if (!target) return null
        const { width, height } = target
        const pixels = new Uint8Array(width * height * 4)
        gl.readRenderTargetPixels(target, 0, 0, width, height, pixels)
        let hash = 2166136261, min = 255, max = 0
        for (let i = 0; i < pixels.length; i += 16) {
          hash = Math.imul(hash ^ pixels[i], 16777619) >>> 0
          min = Math.min(min, pixels[i]); max = Math.max(max, pixels[i])
        }
        return { width, height, hash, min, max, realShadowMap: true }
      },
    }
    // Read-only diagnostics; no GPU readback occurs unless explicitly requested.
    canvas.sceneProbe = probe
    return () => { clearTimeout(wake.current); probe.disposed = true; shadow.dispose(); canvas.removeEventListener('webglcontextlost', lost); gl.debug.onShaderError = previous }
  }, [get, onFailure])
  useEffect(() => {
    const gl = get().gl
    const room = new RoomEnvironment()
    const generator = new PMREMGenerator(gl)
    const environment = generator.fromScene(room, .04)
    const surface = material.current
    surface.envMap = environment.texture
    surface.envMapIntensity = .45
    surface.needsUpdate = true
    room.dispose(); generator.dispose()
    return () => { surface.envMap = null; environment.dispose() }
  }, [get])
  useFrame(({ gl, size, invalidate, setDpr }, delta) => {
    if (gl.getContext().isContextLost()) return
    clearTimeout(wake.current)
    const dt = Math.min(delta, .05)
    elapsed.current += dt
    const pose = interaction.current
    const t = elapsed.current
    const targetYaw = -.24 + pose.yaw + pose.hoverYaw + Math.sin(t * .22) * .025
    const targetPitch = .14 + pose.pitch + pose.hoverPitch
    const targetY = .12 + pose.y + Math.sin(t * .8) * .035
    const moving = pose.dragging || Math.abs(mesh.current.rotation.y - targetYaw) > .004 || Math.abs(mesh.current.rotation.x - targetPitch) > .004 || Math.abs(mesh.current.position.y - targetY) > .005
    // Preserve full density at rest; bounded density and up-to-rAF cadence while manipulating.
    const desiredDpr = Math.min(devicePixelRatio, quality.maxDpr, moving ? 1.5 : 2)
    if (gl.getPixelRatio() !== desiredDpr) setDpr(desiredDpr)
    mesh.current.rotation.y = MathUtils.damp(mesh.current.rotation.y, targetYaw, 10, dt)
    mesh.current.rotation.x = MathUtils.damp(mesh.current.rotation.x, targetPitch, 10, dt)
    mesh.current.rotation.z = -.18
    mesh.current.position.x = MathUtils.damp(mesh.current.position.x, pose.x, 10, dt)
    mesh.current.position.y = MathUtils.damp(mesh.current.position.y, targetY, 10, dt)
    const previous = gl.domElement.renderEvidence
    gl.domElement.renderEvidence = { frames: (previous?.frames || 0) + 1, calls: gl.info.render.calls, triangles: gl.info.render.triangles, geometries: gl.info.memory.geometries, textures: gl.info.memory.textures, rotationY: mesh.current.rotation.y, rotationX: mesh.current.rotation.x, x: mesh.current.position.x, y: mesh.current.position.y, targetYaw, targetPitch, dragging: pose.dragging, settling: moving, dpr: gl.getPixelRatio(), cssWidth: size.width, cssHeight: size.height, bufferWidth: gl.domElement.width, bufferHeight: gl.domElement.height, shadowSize: quality.shadowSize, shadowType: gl.shadowMap.type, antialias: antialias.current, localEnvironment: Boolean(material.current.envMap) }
    if (moving) invalidate()
    else wake.current = setTimeout(invalidate, 16)
  })
  return <>
    <ambientLight intensity={.9} />
    <directionalLight ref={light} castShadow position={[-3,5,5]} intensity={3.4} color="#ffffff" shadow-mapSize={[quality.shadowSize,quality.shadowSize]} shadow-normalBias={.015} shadow-bias={-.00015} shadow-camera-left={-2.8} shadow-camera-right={2.8} shadow-camera-top={2.8} shadow-camera-bottom={-2.8} shadow-camera-near={.5} shadow-camera-far={14} />
    <directionalLight position={[4,1,3]} intensity={1.7} color="#a4d2ff" />
    <directionalLight position={[1,3,-4]} intensity={2.5} color="#e3eeff" />
    <mesh ref={mesh} geometry={geometry} rotation={[.14,-.24,-.18]} position={[0,.12,0]} castShadow>
      <meshPhysicalMaterial ref={material} color="#2373dd" roughness={.28} metalness={.1} clearcoat={.65} clearcoatRoughness={.24} />
    </mesh>
    <mesh rotation={[-Math.PI / 2,0,0]} position={[0,-1.55,0]} receiveShadow>
      <planeGeometry args={[12,12]} />
      <shadowMaterial transparent opacity={.16} />
    </mesh>
  </>
}

export default function Sculpture({ onFailure, interaction, quality }) {
  return <Canvas frameloop="demand" shadows={{ type: PCFSoftShadowMap }} camera={{ position: [0,.45,7.8], fov: 36 }} dpr={[1,quality.maxDpr]} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} fallback={null}>
    <Ribbon onFailure={onFailure} interaction={interaction} quality={quality} />
  </Canvas>
}
