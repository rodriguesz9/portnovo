import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

// Integral user preset; no URL normalization or parameter removal.
const preset = 'https://shadergradient.co/customize?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23ff5005&color2=%23dbba95&color3=%23d0bce1&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uAmplitude=1&uDensity=1.3&uFrequency=5.5&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false'
function RendererHealth({ onFailure }) {
  const get = useThree(state => state.get)
  // Health monitoring must not load assets: this exact 3d-light preset needs no HDR.
  useEffect(() => {
    const gl = get().gl
    const previous = gl.debug.onShaderError
    gl.debug.onShaderError = () => {
      console.error('ShaderGradient: falha de compilação WebGL; visual estático ativado.')
      onFailure()
    }
    return () => { gl.debug.onShaderError = previous }
  }, [get, onFailure])
  return null
}

export default function Liquid({ onFailure }) {
  return <ShaderGradientCanvas pixelDensity={1} fov={45} pointerEvents="none" envBasePath="/environments/" powerPreference="low-power" lazyLoad>
    <ShaderGradient control="query" urlString={preset} />
    <RendererHealth onFailure={onFailure} />
  </ShaderGradientCanvas>
}
