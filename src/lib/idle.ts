/**
 * Schedule a callback to run during idle time (or after a short timeout as fallback).
 * Returns a cleanup function.
 */
export function onIdle(callback: () => void, fallbackMs = 100): () => void {
  const win = window as Window & {
    requestIdleCallback?: (cb: () => void) => number
    cancelIdleCallback?: (id: number) => void
  }

  if (win.requestIdleCallback) {
    const id = win.requestIdleCallback(callback)
    return () => win.cancelIdleCallback?.(id)
  }

  const id = setTimeout(callback, fallbackMs)
  return () => clearTimeout(id)
}
