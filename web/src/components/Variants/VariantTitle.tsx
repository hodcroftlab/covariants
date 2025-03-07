import React, { useMemo } from 'react'
import { styled } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { ClusterDatum } from 'src/io/getClusters'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { clusterPangoLineageMapSelector } from 'src/state/Clusters'

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
  const { t } = useTranslationSafe()
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineageMap = useRecoilValue(clusterPangoLineageMapSelector)
  const pangoName = cluster && pangoLineageMap.get(cluster.displayName)

  const subtitle = useMemo(() => {
    if (!pangoName) {
      return null
    }

    return (
      <ClusterNameSubtitle>
        {t(`also known as {{aliases}}`, { aliases: '' })}
        {enablePangolin ? cluster.displayName : pangoName}
      </ClusterNameSubtitle>
    )
  }, [cluster?.displayName, t, enablePangolin, pangoName])

  return (
    <VariantTitleWrapper>
      <ClusterNameTitle>
        {cluster &&
          `${cluster.type == 'variant' ? t('Variant') : t('Mutation')}: ${enablePangolin && pangoName ? pangoName : cluster.displayName}`}
      </ClusterNameTitle>
      {subtitle}
    </VariantTitleWrapper>
  )
}
