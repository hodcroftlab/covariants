import React from 'react'
import type { ReactNode } from 'react'

export function joinWithCommas(elems: ReactNode[]): ReactNode {
  if (elems.length === 0) {
    return ' '
  }

  return elems.reduce((prev, curr) => [prev, ', ', curr])
}

export function joinWithNewlines(elems: ReactNode[]): ReactNode {
  if (elems.length === 0) {
    return ' '
  }

  // eslint-disable-next-line react/no-array-index-key
  return elems.reduce((prev, curr, i) => [prev, <br key={i} />, curr])
}
