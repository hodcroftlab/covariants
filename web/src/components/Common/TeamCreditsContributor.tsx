import React from 'react'

import type { ContributorData } from 'src/../../.all-contributorsrc'
import { LinkExternal as LinkExternalBase } from 'src/components/Link/LinkExternal'

import styled from 'styled-components'

const FlexOuter = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const FlexInner = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  flex: 1 0 60px;
  padding: 10px;
`

const LinkExternal = styled(LinkExternalBase)`
  margin: 0 auto;

  text-align: center;
  color: ${(props) => props.theme.gray650};

  &:hover {
    color: ${(props) => props.theme.gray650};
    text-decoration: none;
  }
`

const Portrait = styled.img`
  margin: auto;
  width: 50px;
  border-radius: 50px;
`

const NameText = styled.h2`
  font-size: 0.8rem;
`

export interface ContributorProps {
  contributor: ContributorData
}

export function TeamCreditsContributor({ contributor }: ContributorProps) {
  return (
    <FlexOuter>
      <FlexInner>
        <LinkExternal title={contributor.name} href={contributor.profile} alt={contributor.profile} icon={null}>
          <Portrait src={contributor.avatar_url} />
          <NameText>{contributor.name}</NameText>
        </LinkExternal>
      </FlexInner>
    </FlexOuter>
  )
}
