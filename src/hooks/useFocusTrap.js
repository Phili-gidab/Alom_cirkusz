import { useEffect } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Keeps Tab inside an open dialog and restores focus to whatever opened it.
 * Without this, keyboard and screen-reader users tab straight out of the
 * dialog and into the page behind it, which is still fully interactive.
 */
export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return
    const node = ref.current
    const previous = document.activeElement

    // move focus in — prefer the first field over the close button
    const items = () => Array.from(node.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent)
    const first = items()
    ;(first.find((el) => el.tagName !== 'BUTTON') || first[0] || node).focus({
      preventScroll: true,
    })

    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const list = items()
      if (!list.length) return
      const head = list[0]
      const tail = list[list.length - 1]
      if (e.shiftKey && document.activeElement === head) {
        e.preventDefault()
        tail.focus()
      } else if (!e.shiftKey && document.activeElement === tail) {
        e.preventDefault()
        head.focus()
      }
    }

    node.addEventListener('keydown', onKey)
    return () => {
      node.removeEventListener('keydown', onKey)
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true })
    }
  }, [ref, active])
}
