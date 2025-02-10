import React, { useMemo } from 'react'
import { styled } from 'styled-components'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import type { DefiningMutationCluster } from 'src/io/getDefiningMutationsClusters'

const VariantTitleWrapper = styled.header`
  text-align: center;
  min-height: 90px;
`

const ClusterNameTitle = styled.h1``

const ClusterNameSubtitle = styled.p`
  margin-bottom: 0;
  text-align: center;
`

export interface DefiningMutationsLineageTitleProps {
  cluster: DefiningMutationCluster
}

export function DefiningMutationLineageTitle({ cluster }: DefiningMutationsLineageTitleProps) {
  const { t } = useTranslationSafe()

  const subtitle = useMemo(() => {
    if (cluster.nextstrainClade === 'recombinant') {
      return null
    }

    return (
      <ClusterNameSubtitle>
        {t('also known as clade {{clade}}', { clade: cluster.nextstrainClade })}
      </ClusterNameSubtitle>
    )
  }, [cluster.nextstrainClade, t])

  return (
    <VariantTitleWrapper>
      <ClusterNameTitle>{t('Defining mutations for {{lineage}}', { lineage: cluster.lineage })}</ClusterNameTitle>
      {subtitle}
    </VariantTitleWrapper>
  )
}
