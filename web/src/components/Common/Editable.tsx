import React, { PropsWithChildren } from 'react'

import styled from 'styled-components'
import { MdEdit } from 'react-icons/md'

import { URL_GITHUB } from 'src/constants'
import { LinkExternal } from 'src/components/Link/LinkExternal'

const Container = styled.div`
  margin: 10px 5px;
  padding: 0.65rem 1rem;
  //background-color: ${(props) => props.theme.gray100};
  box-shadow: ${(props) => props.theme.shadows.light};
  border-radius: 3px;
`

const Flex = styled.div`
  display: flex;
`

const FlexRight = styled.div`
  margin-left: auto;
`

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

export interface EditableProps {
  githubUrl: string
  text?: string
}

export function Editable({ githubUrl, text, children, ...restProps }: PropsWithChildren<EditableProps>) {
  return (
    <Container {...restProps}>
      <Flex>
        <FlexRight>
          <ProposeChangesLink href={`${URL_GITHUB}/${githubUrl}`}>
            <ProposeChangesIcon>
              <MdEdit />
            </ProposeChangesIcon>
            <ProposeChangesText>{text ?? 'Propose changes to this section'}</ProposeChangesText>
          </ProposeChangesLink>
        </FlexRight>
      </Flex>
      {children}
    </Container>
  )
}
