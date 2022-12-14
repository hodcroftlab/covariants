declare module '*.svg' {
  import type { ComponentType, SVGProps } from 'react'

  declare const SVG: ComponentType<SVGProps<SVGSVGElement>>
  export default SVG
}
