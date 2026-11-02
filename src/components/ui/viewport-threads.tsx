import { lazy, Suspense, useEffect, useRef, useState } from 'react'
const Threads = lazy(() => import('./Threads'))

// Load close to contact, not from the initial entry; original shader is unchanged.
export default function ViewportThreads({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); observer.disconnect() }
    }, { rootMargin: '400px' })
    observer.observe(ref.current!)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className="threads-viewport" aria-hidden="true">
    {near && <Suspense fallback={null}><Threads paused={paused} enableMouseInteraction color={[.8,.82,.87]} accentColor={[.65,.57,.8]} opacity={.42} lineCount={55} speed={.3} amplitude={1.2} fade={.25} /></Suspense>}
  </div>
}
