import React from 'react'

import type { ContributorData } from 'json-loader!src/../../.all-contributorsrc'
import { LinkExternal as LinkExternalBase } from 'src/components/Link/LinkExternal'

import styled from 'styled-components'

const FlexOuter = styled.section`
  display: flex;
  flex: 0 0 150px;

  flex-direction: column;
  padding: 15px;
`

const FlexInner = styled.section`
  display: flex;
  height: 130px;

  flex-direction: column;
  justify-content: flex-start;
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
  width: 66px;
  border-radius: 50px;
`

const NameText = styled.h2`
  margin-top: 10px;
  font-size: 0.9rem;
  max-width: 130px;
`

export interface ContributorProps {
  contributor: ContributorData
}

export function TeamCreditsContributor({ contributor }: ContributorProps) {
  return (
    <FlexOuter>
      <FlexInner>
        <LinkExternal title={contributor.name} href={contributor.profile} alt={contributor.profile} icon={null}>
          <Portrait src={`${contributor.avatar_url}&s=100`} />
          <NameText>{contributor.name}</NameText>
        </LinkExternal>
      </FlexInner>
    </FlexOuter>
  )
}
