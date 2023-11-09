import React, { useMemo } from 'react'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import type { DefMutClusterDatum } from 'src/io/getDefiningMutationsClusters'

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

export interface DefMutLineageTitleProps {
  cluster: DefMutClusterDatum
}

export function DefMutLineageTitle({ cluster: { lineage, cluster } }: DefMutLineageTitleProps) {
  const { t } = useTranslationSafe()

  const subtitle = useMemo(() => {
    return (
      <ClusterNameSubtitle>
        {t(`also known as clade `)}
        {cluster?.display_name}
      </ClusterNameSubtitle>
    )
  }, [cluster?.display_name, t])

  return (
    <VariantTitleWrapper>
      <ClusterNameTitle>{`Defining mutations for ${lineage}`}</ClusterNameTitle>
      {subtitle}
    </VariantTitleWrapper>
  )
}
