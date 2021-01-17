import { get } from 'lodash'

export const lineStyles: Record<string, string | undefined> = {
  ':': '1 2',
  '-.': '3 3 1 3',
  '--': '3 2',
  '-': undefined,
}

export function lineStyleToStrokeDashArray(ls: string): string | undefined {
  return get<typeof lineStyles, string>(lineStyles, ls) ?? undefined
}
