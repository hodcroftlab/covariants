import React, { PropsWithChildren } from 'react'

import styled from 'styled-components'
import { MdEdit } from 'react-icons/md'

import { URL_GITHUB } from 'src/constants'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { theme } from 'src/theme'

const Container = styled.div`
  margin: 10px 5px;
  padding: 0.65rem 1rem;
  box-shadow: ${(props) => props.theme.shadows.light};
  border-radius: 3px;
`

const Flex = styled.div`
  display: flex;
`

const FlexRight = styled.div`
  margin-left: auto;
`

const ProposeChangesText = styled.span`
  font-size: 0.85rem;
`

export interface EditableProps {
  githubUrl: string
  text?: string
}

export function Editable({ githubUrl, text, children, ...restProps }: PropsWithChildren<EditableProps>) {
  return (
    <Container {...restProps}>
      <Flex>
        <FlexRight>
          <LinkExternal href={`${URL_GITHUB}/${githubUrl}`} icon={<MdEdit />} color={theme.link.dim.color}>
            <ProposeChangesText>{text ?? 'Propose changes to this section'}</ProposeChangesText>
          </LinkExternal>
        </FlexRight>
      </Flex>
      {children}
    </Container>
  )
}
