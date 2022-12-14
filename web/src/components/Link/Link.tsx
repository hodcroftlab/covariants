import React, { HTMLAttributes, PropsWithChildren } from 'react'

import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export interface LinkProps extends PropsWithChildren<NextLinkProps & HTMLAttributes<HTMLAnchorElement>> {
  className?: string
}

export function Link({ className, children, href, onClick, ...restProps }: LinkProps) {
  return (
    <NextLink href={href} passHref={false} {...restProps}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </NextLink>
  )
}
