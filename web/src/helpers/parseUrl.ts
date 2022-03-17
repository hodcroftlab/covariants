import { ParsedUrlQuery } from 'querystring'

/** Borrowed from Next.js */
export function getLocationOrigin() {
  const { protocol, hostname, port } = window.location
  return `${protocol}//${hostname}${port ? `:${port}` : ''}` // eslint-disable-line sonarjs/no-nested-template-literals
}

/** Borrowed from Next.js */
export function searchParamsToUrlQuery(searchParams: URLSearchParams): ParsedUrlQuery {
  const query: ParsedUrlQuery = {}
  searchParams.forEach((value, key) => {
    if (typeof query[key] === 'undefined') {
      query[key] = value
    } else if (Array.isArray(query[key])) {
      ;(query[key] as string[]).push(value)
    } else {
      query[key] = [query[key] as string, value]
    }
  })
  return query
}

/** Borrowed from Next.js */
export function parseRelativeUrl(url: string, base?: string) {
  const globalBase = new URL(typeof window === 'undefined' ? 'http://n' : getLocationOrigin())
  const resolvedBase = base ? new URL(base, globalBase) : globalBase
  const { pathname, searchParams, search, hash, href, origin } = new URL(url, resolvedBase)
  if (origin !== globalBase.origin) {
    throw new Error(`invariant: invalid relative URL, router received ${url}`)
  }
  return {
    pathname,
    query: searchParamsToUrlQuery(searchParams),
    search,
    hash,
    href: href.slice(globalBase.origin.length),
  }
}

/** Borrowed from Next.js */
export interface ParsedUrl {
  hash: string
  hostname?: string | null
  href: string
  pathname: string
  port?: string | null
  protocol?: string | null
  query: ParsedUrlQuery
  search: string
}

/** Borrowed from Next.js */
export function parseUrl(url: string): ParsedUrl {
  if (url.startsWith('/')) {
    return parseRelativeUrl(url)
  }

  const parsedURL = new URL(url)
  return {
    hash: parsedURL.hash,
    hostname: parsedURL.hostname,
    href: parsedURL.href,
    pathname: parsedURL.pathname,
    port: parsedURL.port,
    protocol: parsedURL.protocol,
    query: searchParamsToUrlQuery(parsedURL.searchParams),
    search: parsedURL.search,
  }
}
