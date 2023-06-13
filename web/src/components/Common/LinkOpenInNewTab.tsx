import React, { PropsWithChildren } from 'react'

import styled from 'styled-components'
import { GoLinkExternal } from 'react-icons/go'

import { LinkExternal } from 'src/components/Link/LinkExternal'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

const ProposeChangesLink = styled(LinkExternal)`
  color: ${(props) => props.theme.gray500};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.gray500};
    text-decoration: none;
  }
`

const ProposeChangesIcon = styled.span`
  margin-right: 0.25rem;
  color: ${(props) => props.theme.gray500};
`

const ProposeChangesText = styled.span`
  font-size: 0.85rem;
`

export interface LinkOpenInNewTabProps {
  href: string
  text?: string
}

export function LinkOpenInNewTab({ href, text, children, ...restProps }: PropsWithChildren<LinkOpenInNewTabProps>) {
  const { t } = useTranslationSafe()
  return (
    <ProposeChangesLink href={href}>
      <ProposeChangesIcon>
        <GoLinkExternal />
      </ProposeChangesIcon>
      <ProposeChangesText>{text ?? t('Propose changes to this section')}</ProposeChangesText>
    </ProposeChangesLink>
  )
}
