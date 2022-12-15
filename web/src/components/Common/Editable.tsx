import React, { PropsWithChildren, useMemo } from 'react'

import styled from 'styled-components'
import { FaGithub } from 'react-icons/fa'

import { URL_GITHUB } from 'src/constants'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { useTranslationSafe } from "src/helpers/useTranslationSafe";
import { theme } from 'src/theme'

const Container = styled.div`
  margin: 0 auto;
  padding: 0.65rem 1rem;
  border-radius: 3px;
`

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`

const LinkWrapper = styled.span`
  box-shadow: ${(props) => props.theme.shadows.light};
  border-radius: 5px;
  padding: 0 5px;
`

const ProposeChangesText = styled.span`
  font-size: 0.85rem;
`

const ContentWrapper = styled.div`
  p,
  ul {
    max-width: 100ch;
    margin-left: auto;
    margin-right: auto;
  }

  & > * {
    margin-bottom: 0;
  }

  & > * + * {
    margin-top: 1.5rem;
  }

  & > p + h2,
  & > p + h3 {
    margin-top: 3rem;
  }
`

export interface EditableBodyProps {
  githubUrl?: string
  text?: string
}

export function EditableHeader({ githubUrl, text }: EditableBodyProps) {
  const { t } = useTranslationSafe()

  const href = useMemo(() => `${URL_GITHUB}/${githubUrl ?? ''}`, [githubUrl])
  const icon = useMemo(() => <FaGithub />, [])
  const titleText = useMemo(() => text ?? t('Propose changes to this section'), [text])

  if (!githubUrl) {
    return null
  }

  return (
    <Flex>
      <LinkWrapper>
        <LinkExternal href={href} icon={icon} $color={theme.link.dim.color}>
          <ProposeChangesText>{titleText}</ProposeChangesText>
        </LinkExternal>
      </LinkWrapper>
    </Flex>
  )
}

export interface EditableProps {
  githubUrl?: string
  text?: string
}

export function Editable({ githubUrl, text, children, ...restProps }: PropsWithChildren<EditableProps>) {
  return (
    <Container {...restProps}>
      <EditableHeader githubUrl={githubUrl} text={text} />
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  )
}

export const CenteredEditable = styled(Editable)`
  max-width: 100ch;
  margin-left: auto;
  margin-right: auto;
`
