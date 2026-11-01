import { ArrowUpRight } from 'lucide-react'
import { Card } from './card'
import { Spotlight } from './spotlight'
import { SplineScene } from './splite'
import './robot-preview.css'

export default function RobotPreview({ stopped }: { stopped: boolean }) {
  return <Card className="robot-preview" aria-labelledby="experiment-title">
    <Spotlight size={300} disabled={stopped} />
    <div className="robot-preview-top"><span>Estudo de interface</span><span aria-hidden="true">01 / WEBGL</span></div>
    <div className="robot-preview-copy">

      <h2 id="experiment-title">Código.<br />Forma.<br /><span>Movimento.</span></h2>
      <p>Explorar possibilidades.<br />Construir com intenção.</p>
    </div>
    <SplineScene scene="/scenes/scene.splinecode" enabled={!stopped} className="robot-scene" fallback={<p>NEXBOT — estudo de personagem 3D.</p>} />
    <div className="robot-preview-footer"><span>Spline · NEXBOT local</span><ArrowUpRight size={18} aria-hidden="true" /></div>
    <p className="robot-help">Explore o robô com o ponteiro quando a cena estiver disponível. No toque, a rolagem vertical permanece livre. A cena é decorativa; todos os projetos e ações estão acessíveis sem 3D.</p>
  </Card>
}
