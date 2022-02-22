import Router from 'next/router'
import type { ParsedUrlQuery } from 'querystring'

export async function setUrlQuery(query: ParsedUrlQuery) {
  return Router.replace({ pathname: Router.pathname, query }, undefined, { scroll: false, shallow: true })
}
