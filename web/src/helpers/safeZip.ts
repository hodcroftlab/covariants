import { zip } from 'lodash'

export function safeZip<T, U>(first: T[], second: U[]) {
  const firstLen = first.length
  const secondLen = second.length
  if (first.length !== second.length) {
    throw new Error(
      `safeZip: expected zipped arrays to be of equal length, but got arrays of lengths ${firstLen} and ${secondLen}`,
    )
  }

  return zip(first, second) as [T, U][]
}
