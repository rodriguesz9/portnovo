'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type SpringOptions } from 'framer-motion'
import { cn } from '@/lib/utils'

type SpotlightProps = {
  className?: string
  size?: number
  springOptions?: SpringOptions
  disabled?: boolean
}

export function Spotlight({ className, size = 240, springOptions = { bounce: 0 }, disabled = false }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)
  const opacity = useMotionValue(0)
  const mouseX = useSpring(0, springOptions)
  const mouseY = useSpring(0, springOptions)
  const left = useTransform(mouseX, x => `${x - size / 2}px`)
  const top = useTransform(mouseY, y => `${y - size / 2}px`)

  useEffect(() => {
    const node = ref.current
    const parent = node?.parentElement
    if (!node || !parent || disabled) return
    // Layout belongs to the host CSS, not an effect mutating the parent's styles.
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const hide = () => { opacity.set(0) }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || query.matches) return hide()
      const rect = parent.getBoundingClientRect()
      mouseX.set(event.clientX - rect.left)
      mouseY.set(event.clientY - rect.top)
      opacity.set(1)
    }
    parent.addEventListener('pointermove', move)
    parent.addEventListener('pointerleave', hide)
    query.addEventListener('change', hide)
    return () => {
      parent.removeEventListener('pointermove', move)
      parent.removeEventListener('pointerleave', hide)
      query.removeEventListener('change', hide)
      hide()
    }
  }, [disabled, mouseX, mouseY, opacity])

  return <motion.div ref={ref} aria-hidden="true" className={cn('ui-spotlight', className)} style={{ width: size, height: size, left, top, opacity }} />
}
