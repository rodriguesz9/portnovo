export const neutralPose = () => ({ yaw: 0, pitch: 0, x: 0, y: 0, hoverYaw: 0, hoverPitch: 0, dragging: false })
export const limit = (value, min, max) => Math.max(min, Math.min(max, value))

export function sculptureQuality({ deviceDpr = 1, coarse = false, saveData = false, memory = 8, cores = 8 }) {
  const limited = saveData || memory <= 4 || cores <= 4 || coarse
  const maxDpr = limited ? 1.5 : 2
  return { maxDpr, shadowSize: !limited && deviceDpr > 1 ? 2048 : 1024, limited }
}
