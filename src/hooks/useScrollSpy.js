import { useEffect, useState } from 'react'

export function useScrollSpy(ids, { offset = 130 } = {}) {
  const idsKey = ids.join(',')
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    let frame = 0

    const compute = () => {
      const pos = window.scrollY + offset
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) current = id
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 8) {
        current = ids[ids.length - 1] ?? current
      }
      setActive(current)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, offset])

  return active
}