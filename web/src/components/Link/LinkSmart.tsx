import React, { useMemo } from 'react'

import isAbsoluteUrl from 'is-absolute-url'

import { Link, LinkProps } from './Link'
import { LinkExternal, LinkExternalProps } from './LinkExternal'

export function LinkSmart({ href, ...restProps }: LinkProps & LinkExternalProps) {
  const hrefString = href.toString()
  const external = useMemo(() => isAbsoluteUrl(hrefString), [hrefString])

  if (external) {
    return <LinkExternal href={hrefString} {...restProps} />
  }

  return <Link href={href} {...restProps} />
}
