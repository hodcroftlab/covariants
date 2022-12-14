import React from 'react'

import styled from 'styled-components'
import HomeContent from '../../../../content/Home.md'

const HomePageWrapper = styled.main`
  margin: 0 auto;
  max-width: ${(props) => props.theme.containerWidth.md};
`

export function HomePage() {
  return (
    <HomePageWrapper>
      <HomeContent />
    </HomePageWrapper>
  )
}
