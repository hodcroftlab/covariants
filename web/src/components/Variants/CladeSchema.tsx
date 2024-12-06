import React from 'react'
import { styled } from 'styled-components'
import { LinkExternal } from 'src/components/Link/LinkExternal'

import CladeSchemaSvg from 'src/assets/images/clades.svg'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

const CladeSchemaFigure = styled.figure`
  display: flex;
  width: 100%;
  max-width: 850px;
  flex-direction: column;
  margin: 0 auto;
`

const CladeSchemaPicture = styled.picture`
  flex: 0 1 100%;
`

const CladeSchemaFigcaption = styled.figcaption`
  flex: 1 1 100%;
`

export function CladeSchema() {
  const { t } = useTranslationSafe()

  return (
    <CladeSchemaFigure className="figure w-100 text-center">
      <CladeSchemaPicture className="w-100 figure-img">
        <CladeSchemaSvg />
      </CladeSchemaPicture>
      <CladeSchemaFigcaption>
        <small>
          <span>
            {t('Phylogenetic relationships of SARS-CoV-2 clades as defined by {{nextstrain}}', {
              nextstrain: 'Nextstrain',
            })}
          </span>
          <span>{' ('}</span>
          <LinkExternal href="https://github.com/nextstrain/ncov-clades-schema">{t('source')}</LinkExternal>
          <span>{')'}</span>
        </small>
      </CladeSchemaFigcaption>
    </CladeSchemaFigure>
  )
}
