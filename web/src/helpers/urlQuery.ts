import { merge } from 'merge-anything'
import Router from 'next/router'
import type { ParsedUrlQuery } from 'querystring'
import { parseUrl } from 'src/helpers/parseUrl'

export async function setUrlQuery(query: ParsedUrlQuery) {
  return Router.replace({ pathname: Router.pathname, query }, undefined, { scroll: false, shallow: true })
}

export async function updateUrlQuery(newQuery: ParsedUrlQuery) {
  const { query: oldQuery } = parseUrl(Router.asPath)
  const query = merge(oldQuery, newQuery)
  return setUrlQuery(query)
}
