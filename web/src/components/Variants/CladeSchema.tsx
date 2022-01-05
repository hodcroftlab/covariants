import React from 'react'

import styled from 'styled-components'

import { ReactComponent as CladeSchemaSvg } from 'src/assets/images/clades.svg'

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
        <small>{'Illustration of phylogenetic relationships of SARS-CoV-2 clades, as defined by Nextstrain'}</small>
      </CladeSchemaFigcaption>
    </CladeSchemaFigure>
  )
}
