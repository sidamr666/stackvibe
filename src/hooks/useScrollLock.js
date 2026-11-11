import { useEffect } from 'react'

export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const original = document.body.style.overflow
    const originalTouch = document.documentElement.style.overscrollBehaviorY
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehaviorY = 'none'
    return () => {
      document.body.style.overflow = original
      document.documentElement.style.overscrollBehaviorY = originalTouch
    }
  }, [locked])
}