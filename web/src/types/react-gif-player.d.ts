declare module 'react-gif-player' {
  import React from 'react'

  export interface GifPlayerProps {
    gif: string
    still: string
  }

  const GifPlayer: React.FC<GifPlayerProps>

  export default GifPlayer
}
