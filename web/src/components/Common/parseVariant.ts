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
  if (formatted === '20A.EU2') {
    return { parent: '20A', version: '.EU2' }
  }

  if (formatted === '20E (EU1)') {
    return { parent: '20E', version: ' (EU1)' }
  }

  if (formatted.includes("(")) {
    const match2  = /(?<parent>)?(?<version>)/i.exec(formatted)
    if (!match2?.groups) {
      return undefined
    }
    const parent = parseNonEmpty(match2.groups?.parent)
    const version = parseNonEmpty(match2.groups?.version)
    return { parent , version }
  }

  const match = /^(?<parent>.*\/)?(?<gene>.*:)?(?<left>[*.a-z-]{0,1})(?<pos>(\d)*)(?<right>[*.a-z-]{0,1})(?<version>\..*)?$/i.exec(formatted) // prettier-ignore

  if (!match?.groups) {
    return undefined
  }

  if (Object.values(match?.groups).every((s) => !s || s.length === 0)) {
    return undefined
  }

  let parent = parseNonEmpty(match.groups?.parent)
  let parentDelimiter: string | undefined
  if (parent?.endsWith('/')) {
    parent = parent.replace('/', '')
    parentDelimiter = '/'
  }
  const gene = parseNonEmpty(match.groups?.gene)?.replace(':', '')
  const left = parseNonEmpty(match.groups?.left)?.toUpperCase()
  const pos = parsePosition(match.groups?.pos)
  const right = parseNonEmpty(match.groups?.right)?.toUpperCase()
  const version = parseNonEmpty(match.groups?.version)

  if (!pos) {
    return undefined
  }

  return { parent, parentDelimiter, gene, left, pos, right, version }
}
