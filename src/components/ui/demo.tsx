'use client'

import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'

// Prepared demo, not mounted: packages + reviewed local scene are still missing.
// Exact requested upstream scene (reference only, never fetched here):
// https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode
export function SplineSceneBasic({ scene, enabled = false }: { scene: string; enabled?: boolean }) {
  return <Card className="robot-preview">
    <Spotlight disabled={!enabled} />
    <div className="spline-demo-layout">
      <div className="robot-preview-copy"><h2>Interfaces com outra dimensão.</h2><p>Um experimento interativo para explorar ideias na tela.</p></div>
      <SplineScene scene={scene} enabled={enabled} className="spline-demo-scene" fallback={<p className="robot-pending">Robô 3D pendente de material local revisado.</p>} />
    </div>
  </Card>
}
