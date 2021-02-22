/* eslint-disable security/detect-unsafe-regex */
import type { Mutation } from 'src/types'
import { parsePosition } from './parsePosition'

export function parseNonEmpty(raw: string | undefined | null) {
  if (!raw || raw.length === 0) {
    return undefined
  }
  return raw
}

export function parseVariant(formatted: string): Mutation | undefined {
  const match = /^(?<parent>.*\/)?(?<gene>.*:)?(?<left>[*.a-z-]{0,1})(?<pos>(\d)*)(?<right>[*.a-z-]{0,1})(?<version>\..*)?$/i.exec(formatted) // prettier-ignore

  if (!match?.groups) {
    return undefined
  }

  if (Object.values(match?.groups).every((s) => !s || s.length === 0)) {
    return undefined
  }

  const parent = parseNonEmpty(match.groups?.parent)?.replace('/', '')
  const gene = parseNonEmpty(match.groups?.gene)?.replace(':', '')
  const left = parseNonEmpty(match.groups?.left)?.toUpperCase()
  const pos = parsePosition(match.groups?.pos)
  const right = parseNonEmpty(match.groups?.right)?.toUpperCase()
  const version = parseNonEmpty(match.groups?.gene)?.replace('.', '')

  if (!pos) {
    return undefined
  }

  return { parent, gene, left, pos, right, version }
}
