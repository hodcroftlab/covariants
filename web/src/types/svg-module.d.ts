declare module '*.svg' {
  import type { FC, SVGProps } from 'react'

  declare const SVG: FC<SVGProps<SVGElement>>
  export default SVG
}
