declare module 'react-gif-player' {
  import React, { HTMLProps } from 'react'

  export interface GifPlayerProps extends HTMLProps<HTMLImageElement> {
    gif: string
    still: string
  }

  const GifPlayer: React.FC<GifPlayerProps>

  export default GifPlayer
}
