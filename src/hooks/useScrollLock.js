import { useEffect } from 'react'

// Module-level so the count survives the component remount that a language
// switch causes. Without this, closing/remounting one lock holder released a
// lock a *different* holder still needed — the page scrolled behind the open
// fullscreen menu.
let holders = 0

const apply = () => {
  if (holders > 0) window.lenis?.stop()
  else window.lenis?.start()
}

/**
 * Reference-counted page-scroll lock. The page only unlocks once every
 * holder has released, so overlapping overlays cannot unlock each other.
 */
export function useScrollLock(locked) {
  useEffect(() => {
    // A non-holder must never call start() — that is the bug this prevents.
    if (!locked) return
    holders += 1
    apply()
    return () => {
      holders = Math.max(0, holders - 1)
      apply()
    }
  }, [locked])
}
