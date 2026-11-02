import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLocalEffects } from './use-local-effects'

// Adapted from Manu Arora / Aceternity EncryptedText (public Manual source).
// MIT declared by the author on 21st; provenance in public/licenses/about.
const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?'
function generateRandomCharacter(charset: string) {
  return charset.charAt(Math.floor(Math.random() * charset.length))
}
function generateGibberishPreservingSpaces(original: string, charset: string) {
  return original.split('').map(ch => ch === ' ' ? ' ' : generateRandomCharacter(charset)).join('')
}
export function EncryptedText({ text, stopped }: { text: string; stopped: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const active = useLocalEffects(ref, stopped)
  const [display, setDisplay] = useState(text)
  const completed = useRef(false)
  useEffect(() => {
    if (!active || !isInView || completed.current) return
    const start = performance.now()
    let lastFlip = 0
    let frame = 0
    let scramble = generateGibberishPreservingSpaces(text, DEFAULT_CHARSET).split('')
    const update = (now: number) => {
      const revealCount = Math.min(text.length, Math.floor((now - start) / 28))
      if (now - lastFlip >= 50) {
        scramble = generateGibberishPreservingSpaces(text, DEFAULT_CHARSET).split('')
        lastFlip = now
      }
      setDisplay(text.split('').map((char, index) => index < revealCount ? char : scramble[index]).join(''))
      if (revealCount < text.length) frame = requestAnimationFrame(update)
      else completed.current = true
    }
    frame = requestAnimationFrame(update)
    // The inactive render already exposes text. Persist it before re-entry;
    // completion also prevents another RAF chain after pause/resume.
    return () => { cancelAnimationFrame(frame); completed.current = true; setDisplay(text) }
  }, [active, isInView, text])
  return <motion.span ref={ref} className="about-encrypted">
    <span className="sr-only">{text}</span>
    <span aria-hidden="true" className="encrypted-layout">{text}</span>
    <span aria-hidden="true" className="encrypted-display">{active ? display : text}</span>
  </motion.span>
}
