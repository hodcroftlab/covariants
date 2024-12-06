import React, { HTMLAttributes, PropsWithChildren } from 'react'

import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export interface LinkProps extends PropsWithChildren<NextLinkProps & HTMLAttributes<HTMLAnchorElement>> {
  className?: string
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Link({ className, children, href, ...restProps }: LinkProps) {
  return (
    <NextLink href={href} passHref={false} className={className}>
      {}
      {children}
    </NextLink>
  )
}
