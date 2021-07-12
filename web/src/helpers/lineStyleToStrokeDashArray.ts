import { get } from 'lodash'

export const lineStyles: Record<string, string | undefined> = {
  ':': '3 3',
  '-.': '5 3 2 3 2 3',
  '--': '8 6',
  'dotted': '16 2 2 3',
  '-': undefined,
}

export function lineStyleToStrokeDashArray(ls: string): string | undefined {
  return get<typeof lineStyles, string>(lineStyles, ls) ?? undefined
}
