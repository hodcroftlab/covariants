export async function loadPolyfills() {
  if (typeof window === 'undefined') {
    return
  }
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}
