import React from 'react'
import { ClusterDatum } from 'src/io/getClusters'

import styled from 'styled-components'

const VariantTitleWrapper = styled.header`
  text-align: center;
  min-height: 90px;
`

const ClusterNameTitle = styled.h1``

const ClusterNameSubtitle = styled.p`
  margin-bottom: 0;
  text-align: center;
`

export interface VariantTitleProps {
  cluster?: ClusterDatum
}

export function VariantTitle({ cluster }: VariantTitleProps) {
  return (
    <VariantTitleWrapper>
      <ClusterNameTitle>{cluster?.display_name && `Variant: ${cluster?.display_name}`}</ClusterNameTitle>
      {
        <ClusterNameSubtitle>
          {cluster?.alt_display_name && (
            <>
              {`also known as `}
              {cluster.alt_display_name.join(', ')}
            </>
          )}
        </ClusterNameSubtitle>
      }
    </VariantTitleWrapper>
  )
}
