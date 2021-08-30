import React, { PropsWithChildren } from 'react'

import styled from 'styled-components'

import type { ClusterDatum } from 'src/io/getClusters'
import { ClusterButtonPanel } from './ClusterButtonPanel'

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: calc(100ch + 256px);
  margin: 0 auto;

  @media (max-width: 767.98px) {
    flex-direction: column;
  }
`

const FlexFixed = styled.div`
  flex: 0 0;
  flex-basis: 180px;

  flex-wrap: wrap;

  @media (min-width: 1120px) {
    border-right: 2px solid ${(props) => props.theme.gray200};
    padding-right: 1rem;
  }
`

const FlexGrowing = styled.div`
  display: flex;
  flex: 1 0;
`

export interface ClusterButtonPanelLayoutProps {
  currentCluster?: ClusterDatum
}

export function ClusterButtonPanelLayout({
  children,
  currentCluster,
}: PropsWithChildren<ClusterButtonPanelLayoutProps>) {
  return (
    <FlexContainer>
      <FlexFixed>
        <ClusterButtonPanel currentCluster={currentCluster} />
      </FlexFixed>

      <FlexGrowing>{children}</FlexGrowing>
    </FlexContainer>
  )
}
