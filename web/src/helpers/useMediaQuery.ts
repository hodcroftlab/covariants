import { useState, useEffect, useRef } from 'react'

const useMediaQuery = (mediaQuery: string) => {
  const mediaRef = useRef(window ? window?.matchMedia(mediaQuery) : null)

  const [isMatching, setMatching] = useState(mediaRef.current?.matches)

  useEffect(() => {
    const media = mediaRef.current
    if (media) {
      const listener = () => {
        setMatching(media.matches)
      }
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    }
  }, [])

  return isMatching
}

export const useMobile = () => {
  return !useMediaQuery('(min-width: 768px)')
}

export default useMediaQuery
