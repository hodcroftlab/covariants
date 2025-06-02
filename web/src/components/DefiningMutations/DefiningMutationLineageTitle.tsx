import React, { useMemo } from 'react'
import { styled } from 'styled-components'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { DefiningMutationClusterMetaData } from 'src/io/getDefiningMutationsClusters'
import { PageHeading } from 'src/components/Common/PageHeading'

export interface DefiningMutationsLineageTitleProps {
  cluster: DefiningMutationClusterMetaData | undefined
}

export function DefiningMutationLineageTitle({ cluster }: DefiningMutationsLineageTitleProps) {
  const { t } = useTranslationSafe()

  const subtitle = useMemo(() => {
    if (cluster === undefined || cluster.nextstrainClade === 'recombinant') {
      return null
    }

    return (
      cluster.pangoLineage &&
      (cluster.isClade ? (
        <ClusterNameSubtitle>
          {t('also known as clade {{clade}}', { clade: cluster.nextstrainClade })}
        </ClusterNameSubtitle>
      ) : (
        <ClusterNameSubtitle>{t('belongs to clade {{clade}}', { clade: cluster.nextstrainClade })}</ClusterNameSubtitle>
      ))
    )
  }, [cluster, t])

  const title = useMemo(() => {
    if (cluster === undefined) {
      return t('Defining mutations')
    }

    return t('Defining mutations for {{lineage}}', { lineage: cluster.pangoLineage ?? cluster.nextstrainClade })
  }, [cluster, t])

  return (
    <VariantTitleWrapper>
      <PageHeading>{title}</PageHeading>
      {subtitle}
    </VariantTitleWrapper>
  )
}

const VariantTitleWrapper = styled.header`
  text-align: center;
  min-height: 90px;
`

const ClusterNameSubtitle = styled.p`
  margin-bottom: 0;
  text-align: center;
`
