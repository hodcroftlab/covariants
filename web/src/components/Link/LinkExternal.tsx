import React, { PropsWithChildren, HTMLProps } from 'react'

import styled from 'styled-components'
import { GoLinkExternal } from 'react-icons/go'

const LinkExternalIconWrapper = styled.span<{ $color?: string }>`
  margin-right: 0.25rem;
  color: ${(props) => props.$color ?? props.theme.link.dim.iconColor};
`

export interface LinkExternalProps extends HTMLProps<HTMLAnchorElement> {
  href?: string
  $color?: string
  $iconColor?: string
  icon?: React.ReactNode
}

const A = styled.a<{ $color?: string } & LinkExternalProps>`
  color: ${(props) => props.$color ?? undefined};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.$color ?? undefined};
    text-decoration: none;
  }
`

export function LinkExternal({
  href,
  $color,
  $iconColor,
  icon,
  children,
  ref,
  as,
  ...restProps
}: PropsWithChildren<LinkExternalProps>) {
  const Icon: React.ReactNode = <GoLinkExternal />

  return (
    <>
      <LinkExternalIconWrapper $color={$iconColor}>{Icon}</LinkExternalIconWrapper>
      <A target="_blank" rel="noopener noreferrer" href={href} $color={$color} {...restProps}>
        {children}
      </A>
    </>
  )
}
