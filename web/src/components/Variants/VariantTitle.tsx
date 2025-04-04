import React, { useMemo } from 'react'
import { styled } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { ClusterDatum } from 'src/io/getClusters'
import { enablePangolinAtom } from 'src/state/Nomenclature'

const VariantTitleWrapper = styled.header`
  text-align: center;
  min-height: 90px;
`

export interface VariantTitleProps {
  cluster?: ClusterDatum
}

export function VariantTitle({ cluster }: VariantTitleProps) {
  const { t } = useTranslationSafe()
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoName = cluster?.pangoLineages?.map((lin) => lin.name).join(', ')

  const subtitle = useMemo(() => {
    if (!pangoName) {
      return null
    }

    return (
      <p className="mb-0 text-center">
        {t(`also known as {{aliases}}`, { aliases: '' })}
        {enablePangolin ? cluster?.displayName : pangoName}
      </p>
    )
  }, [cluster?.displayName, t, enablePangolin, pangoName])

  return (
    <VariantTitleWrapper>
      <h1>
        {cluster &&
          `${cluster.type == 'variant' ? t('Variant') : t('Mutation')}: ${enablePangolin && pangoName ? pangoName : cluster.displayName}`}
      </h1>
      {subtitle}
    </VariantTitleWrapper>
  )
}
