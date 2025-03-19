import type { ParsedUrlQuery } from 'querystring'
import { omit } from 'lodash'
import { merge } from 'merge-anything'
import Router from 'next/router'
import { parseUrl } from 'src/helpers/parseUrl'

export async function setUrlQuery(query: ParsedUrlQuery) {
  return Router.replace({ pathname: Router.pathname, query }, undefined, { scroll: false })
}

export async function removeFromUrlQuery(key: string) {
  const { query: oldQuery } = parseUrl(Router.asPath)
  await setUrlQuery(omit(oldQuery, key))
}

export async function updateUrlQuery(newQuery: ParsedUrlQuery) {
  const { query: oldQuery } = parseUrl(Router.asPath)

  const query = merge(oldQuery, newQuery)

  return setUrlQuery(query)
}

export async function setUrlPath(path: string) {
  return Router.replace(path, undefined, { scroll: false })
}
