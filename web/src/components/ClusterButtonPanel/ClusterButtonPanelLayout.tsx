import React, { PropsWithChildren } from 'react'

import styled from 'styled-components'

import type { ClusterDatum } from 'src/io/getClusters'
import { ClusterButtonPanel } from './ClusterButtonPanel'

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 767.98px) {
    flex-direction: column;
  }
`

const FlexFixed = styled.div`
  flex: 0 0 180px;
  display: flex;
  flex-wrap: wrap;
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
