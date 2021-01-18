/* eslint-disable security/detect-unsafe-regex */
import type { Mutation } from 'src/types'
import { parsePosition } from './parsePosition'

export function parseAminoacid(raw: string | undefined | null) {
  if (!raw || raw.length === 0) {
    return undefined
  }
  return raw.toUpperCase()
}

export function parseGene(raw: string | undefined | null) {
  if (!raw || raw.length === 0) {
    return undefined
  }
  return raw
}

export function parseAminoacidMutation(formatted: string): Mutation | undefined {
  const match = /^(?<gene>.*):(?<left>[.a-z-]{0,1})(?<pos>(\d)*)(?<right>[.a-z-]{0,1})$/i.exec(formatted)

  if (!match?.groups) {
    return undefined
  }

  if (Object.values(match?.groups).every((s) => s.length === 0)) {
    return undefined
  }

  const gene = parseGene(match.groups?.gene)
  const left = parseAminoacid(match.groups?.left)
  const pos = parsePosition(match.groups?.pos)
  const right = parseAminoacid(match.groups?.right)

  if (!left || !right || !pos) {
    return undefined
  }

  return { gene, left, pos, right }
}
