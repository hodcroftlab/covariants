import React, { PropsWithChildren, HTMLProps, useCallback } from 'react'
import { usePlausible } from 'src/components/Common/Plausible'

import styled from 'styled-components'
import { GoLinkExternal } from 'react-icons/go'

const LinkExternalIconWrapper = styled.span<{ $color?: string }>`
  margin-right: 0.25rem;
  color: ${(props) => props.$color ?? props.theme.link.dim.iconColor};
`

export interface LinkExternalProps extends Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref'> {
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

  white-space: nowrap;
`

export const ContentWrapper = styled.span`
  white-space: normal;
`

export function LinkExternal({
  href,
  $color,
  $iconColor,
  icon,
  children,
  ...restProps
}: PropsWithChildren<LinkExternalProps>) {
  const plausible = usePlausible()
  const handleClick = useCallback(() => plausible('LinkExternal', { props: { href } }), [href, plausible])

  const Icon: React.ReactNode = icon === undefined ? <GoLinkExternal /> : icon

  return (
    <>
      <A target="_blank" rel="noopener noreferrer" href={href} $color={$color} {...restProps} onClick={handleClick}>
        {Icon && <LinkExternalIconWrapper $color={$iconColor}>{Icon}</LinkExternalIconWrapper>}
        <ContentWrapper>{children}</ContentWrapper>
      </A>
    </>
  )
}
