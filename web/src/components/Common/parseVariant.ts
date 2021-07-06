/* eslint-disable security/detect-unsafe-regex */
import type { Mutation } from 'src/types'
import { parsePosition } from './parsePosition'

export function parseNonEmpty(raw: string | undefined | null) {
  if (!raw || raw.length === 0) {
    return undefined
  }
  return raw
}

export function parseSlashBasedVariant(variantString: string): Mutation | undefined {
  const match = /^(?<parent>.*\/)?(?<gene>.*:)?(?<left>[*.a-z-]{0,1})(?<pos>(\d)*)(?<right>[*.a-z-]{0,1})(?<version>\..*)?$/i.exec(variantString) // prettier-ignore

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

export function parseWhoBasedVariant(variantString: string): Mutation | undefined {
  const match = /^(?<parent>.*)\s(?<version>\(.*\))$/i.exec(variantString)

  if (!match?.groups) {
    return undefined
  }

  const parent = parseNonEmpty(match.groups?.parent)
  const version = parseNonEmpty(match.groups?.version)

  return { parent, version }
}

export function parseSimpleNextstrainClade(variantString: string): Mutation | undefined {
  const match = /^(?<parent>\d\d[A-Z])$/i.exec(variantString)

  if (!match?.groups) {
    return undefined
  }

  const parent = parseNonEmpty(match.groups?.parent)

  return { parent }
}

export function parseVariant(variantString: string): Mutation | undefined {
  if (variantString === '20A.EU2') {
    return { parent: '20A', version: '.EU2' }
  }

  if (variantString === '20E (EU1)') {
    return { parent: '20E', version: ' (EU1)' }
  }

  let parsed = parseSimpleNextstrainClade(variantString)
  if (parsed) {
    return parsed
  }

  parsed = parseWhoBasedVariant(variantString)
  if (parsed) {
    return parsed
  }

  parsed = parseSlashBasedVariant(variantString)
  if (parsed) {
    return parsed
  }

  return undefined
}
