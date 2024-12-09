import React, { PropsWithChildren } from 'react'

import { styled } from 'styled-components'
import { FaTwitterSquare } from 'react-icons/fa'

import type { LinkExternalProps } from './LinkExternal'
import { LinkExternal } from './LinkExternal'

export const TwitterIcon = styled(FaTwitterSquare)`
  margin: 0;
  margin-right: 0.1rem;
`

export interface LinkTwitterProps extends LinkExternalProps {
  username: string
  iconSize?: number
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LinkTwitter({ username, children, iconSize = 20, ...restProps }: PropsWithChildren<LinkTwitterProps>) {
  const href = `https://twitter.com/${username}`
  const text = `@${username}`

  return (
    <LinkExternal href={href} {...restProps}>
      <TwitterIcon size={iconSize} />
      {text}
    </LinkExternal>
  )
}
