import { BufferGeometry, Float32BufferAttribute, CatmullRomCurve3, Vector3 } from 'three'

// Original closed, folded inflatable band. Not a torus primitive or an open hose.
export function createSculptedLoop() {
  const curve = new CatmullRomCurve3([
    new Vector3(-1.35,-.72,.12), new Vector3(-1.55,.32,-.18),
    new Vector3(-.85,1.18,-.28), new Vector3(.38,1.28,.12),
    new Vector3(1.4,.54,.4), new Vector3(1.32,-.48,.12),
    new Vector3(.38,-1.12,-.38), new Vector3(-.65,-1.16,-.12),
  ], true, 'centripetal')
  const rings = 256, sides = 48
  const frames = curve.computeFrenetFrames(rings, true)
  const positions = [], indices = []
  for (let i = 0; i < rings; i++) {
    const t = i / rings, center = curve.getPointAt(t)
    const twist = t * Math.PI * 2 + .35
    const normal = frames.normals[i], binormal = frames.binormals[i]
    for (let j = 0; j < sides; j++) {
      const angle = j / sides * Math.PI * 2
      const a = Math.cos(angle) * .38, b = Math.sin(angle) * .22
      const u = a * Math.cos(twist) - b * Math.sin(twist)
      const v = a * Math.sin(twist) + b * Math.cos(twist)
      positions.push(center.x + normal.x * u + binormal.x * v, center.y + normal.y * u + binormal.y * v, center.z + normal.z * u + binormal.z * v)
      const next = (i + 1) % rings, side = (j + 1) % sides
      const p = i * sides + j, q = next * sides + j, r = next * sides + side, s = i * sides + side
      indices.push(p,s,q,q,s,r)
    }
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position',new Float32BufferAttribute(positions,3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  geometry.computeBoundingSphere()
  return geometry
}
