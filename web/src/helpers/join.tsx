import type { ReactNode } from 'react'

export function joinWithCommas(elems: ReactNode[]): ReactNode {
  if (elems.length === 0) {
    return ' '
  }

  return elems.reduce((prev, curr) => [prev, ', ', curr])
}
