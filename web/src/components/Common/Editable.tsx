import React, { PropsWithChildren } from 'react'

import styled from 'styled-components'
import { FaGithub } from 'react-icons/fa'

import { URL_GITHUB } from 'src/constants'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { theme } from 'src/theme'

const Container = styled.div`
  margin: 0px auto;
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

  h3,
  .h3 {
    font-size: 1.5rem;
  }

  & > p + h2,
  & > p + h3 {
    margin-top: 3rem;
  }
`

export interface EditableProps {
  githubUrl?: string
  text?: string
}

export function Editable({ githubUrl, text, children, ...restProps }: PropsWithChildren<EditableProps>) {
  return (
    <Container {...restProps}>
      {githubUrl && (
        <Flex>
          <LinkWrapper>
            <LinkExternal href={`${URL_GITHUB}/${githubUrl}`} icon={<FaGithub />} $color={theme.link.dim.color}>
              <ProposeChangesText>{text ?? 'Propose changes to this section'}</ProposeChangesText>
            </LinkExternal>
          </LinkWrapper>
        </Flex>
      )}
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  )
}

export const CenteredEditable = styled(Editable)`
  max-width: 100ch;
  margin-left: auto;
  margin-right: auto;
`
