declare module '*.svg' {
  import type { FC, HTMLProps, SVGProps } from 'react'

  declare const url: string
  declare const SVG: FC<SVGProps<SVGElement>>
  export { SVG as ReactComponent }
  export default url
}
