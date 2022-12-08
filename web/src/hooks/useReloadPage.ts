import { useCallback } from 'react'

export function useReloadPage(url?: string | URL) {
  return useCallback(() => {
    window.history.replaceState(null, '', url)
    window.location.reload()
    // trigger React suspense forever, to display loading spinner until the page is refreshed
    throw new Promise(() => {}) // eslint-disable-line @typescript-eslint/no-throw-literal
  }, [url])
}
