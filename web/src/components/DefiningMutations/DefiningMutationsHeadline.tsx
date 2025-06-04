import React, { useMemo } from 'react'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { DefiningMutationClusterMetaData } from 'src/io/getDefiningMutationsClusters'
import { Subtitle, Title } from 'src/components/Layout/WithHeadline'

export interface DefiningMutationsLineageTitleProps {
  cluster: DefiningMutationClusterMetaData | undefined
}

export function DefiningMutationsHeadline({ cluster }: DefiningMutationsLineageTitleProps) {
  const { t } = useTranslationSafe()

  const subtitle = useMemo(() => {
    if (cluster === undefined || cluster.nextstrainClade === 'recombinant') {
      return undefined
    }

    return cluster.pangoLineage
      ? cluster.isClade
        ? t('also known as clade {{clade}}', { clade: cluster.nextstrainClade })
        : t('belongs to clade {{clade}}', { clade: cluster.nextstrainClade })
      : undefined
  }, [cluster, t])

  const title = useMemo(() => {
    if (cluster === undefined) {
      return t('Defining mutations')
    }

    return t('Defining mutations for {{lineage}}', { lineage: cluster.pangoLineage ?? cluster.nextstrainClade })
  }, [cluster, t])

  return (
    <div>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </div>
  )
}
