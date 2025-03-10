import type { ParsedUrlQuery } from 'querystring'
import { takeFirstMaybe } from 'src/helpers/array'

export function getQueryParamMaybe(urlQuery: ParsedUrlQuery, param: string): string | undefined {
  return takeFirstMaybe(urlQuery?.[param]) ?? undefined
}
