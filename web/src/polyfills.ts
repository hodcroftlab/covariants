export async function loadPolyfills() {
  if (globalThis === undefined) {
    return
  }

  if (globalThis.IntersectionObserver === undefined) {
    await import('intersection-observer')
  }
}
