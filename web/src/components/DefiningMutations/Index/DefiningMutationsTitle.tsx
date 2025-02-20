import React from 'react'
import { styled } from 'styled-components'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

export function DefiningMutationTitle() {
  const { t } = useTranslationSafe()

  return <ClusterNameTitle>{t('Defining mutations')}</ClusterNameTitle>
}

const ClusterNameTitle = styled.h1`
  text-align: center;
`
