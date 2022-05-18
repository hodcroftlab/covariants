import type { Mutation } from 'src/types'
import { parsePosition } from './parsePosition'

export function parseNucleotide(raw: string | undefined | null) {
  if (!raw || raw.length === 0) {
    return undefined
  }
  return raw.toUpperCase()
}

export function parseNucleotideMutation(formatted: string): Mutation | undefined {
  const match = /^(?<left>[.a-z-]{0,1})(?<pos>(\d)*)(?<right>[.a-z-]{0,1})$/i.exec(formatted)

  if (!match?.groups) {
    return undefined
  }

  if (Object.values(match?.groups).every((s) => s.length === 0)) {
    return undefined
  }

  const left = parseNucleotide(match.groups?.left)
  const pos = parsePosition(match.groups?.pos)
  const right = parseNucleotide(match.groups?.right)

  if (!pos) {
    return undefined
  }

  return { left, pos, right }
}
