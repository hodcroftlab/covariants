import React from 'react'
import { LinkExternal } from 'src/components/Link/LinkExternal'

import styled from 'styled-components'

import CladeSchemaSvg from 'src/assets/images/clades.svg'

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
  return (
    <CladeSchemaFigure className="figure w-100 text-center">
      <CladeSchemaPicture className="w-100 figure-img">
        <CladeSchemaSvg />
      </CladeSchemaPicture>
      <CladeSchemaFigcaption>
        <small>
          <span>{'Phylogenetic relationships of Nextstrain SARS-CoV-2 clades ('}</span>
          <LinkExternal href="https://github.com/nextstrain/ncov-clades-schema">{'source'}</LinkExternal>
          <span>{'). Please credit/link to '}</span>
          <LinkExternal href="https://nextstrain.org">{'Nextstrain'}</LinkExternal>
          <span>{' if using this figure.'}</span>
        </small>
      </CladeSchemaFigcaption>
    </CladeSchemaFigure>
  )
}
