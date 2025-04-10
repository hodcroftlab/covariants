import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { ClusterDatum } from 'src/io/getClusters'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { Title, Subtitle } from 'src/components/Layout/WithHeadline'

export interface VariantHeadlineProps {
  cluster: ClusterDatum
}

export function VariantHeadline({ cluster }: VariantHeadlineProps) {
  const { t } = useTranslationSafe()
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoName = cluster.pangoLineages?.map((lin) => lin.name).join(', ')

  const subtitle = useMemo(() => {
    if (!pangoName) {
      return null
    }

    return `${t(`also known as {{aliases}}`, { aliases: '' })}${enablePangolin ? cluster.displayName : pangoName}`
  }, [cluster.displayName, t, enablePangolin, pangoName])

  const title = useMemo(() => {
    return `${cluster.type == 'variant' ? t('Variant') : t('Mutation')}: ${enablePangolin && pangoName ? pangoName : cluster.displayName}`
  }, [cluster.displayName, cluster.type, enablePangolin, pangoName, t])

  return (
    <div>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </div>
  )
}
