import React, { useEffect, useState } from 'react'

import { ReactComponent as LogoNextstrain } from 'src/assets/images/logo.svg'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const SpinningLogo = styled(LogoNextstrain)`
  margin: auto;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`

const waitBeforeShow = 1000

function Loading() {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true)
    }, waitBeforeShow)
  }, [])

  return (
    isShown && (
      <Container title="Loading...">
        <SpinningLogo />
      </Container>
    )
  )
}

export default Loading
