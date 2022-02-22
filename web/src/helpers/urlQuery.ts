import { merge } from 'merge-anything'
import Router from 'next/router'
import type { ParsedUrlQuery } from 'querystring'
import { parseUrl } from 'src/helpers/parseUrl'

export async function setUrlQuery(query: ParsedUrlQuery) {
  return Router.replace({ pathname: Router.pathname, query }, undefined, { scroll: false, shallow: true })
}

export async function updateUrlQuery(newQuery: ParsedUrlQuery) {
  const { query: oldQuery } = parseUrl(Router.asPath)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: TS2589: Type instantiation is excessively deep and possibly infinite.
  const query = merge(oldQuery, newQuery) as ParsedUrlQuery

  return setUrlQuery(query)
}
