import React, { useEffect, useState } from 'react'

import Logo from 'src/assets/images/logo.svg'
import styled from 'styled-components'
import { Oval as OvalLoader, ThreeDots as ThreeDotsLoader } from 'react-loader-spinner'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const SpinningLogo = styled(Logo)`
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

const waitBeforeShow = 500

export function Loading() {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true)
    }, waitBeforeShow)
  }, [])

  if (!isShown) {
    return null
  }

  return (
    <Container title="Loading...">
      <SpinningLogo />
    </Container>
  )
}

export const LOADING = <Loading />

export function Spinner() {
  return (
    <div className="d-flex">
      <div className="mx-auto">
        <OvalLoader color="#777" height={100} width={50} />
      </div>
    </div>
  )
}

export const SPINNER = <Spinner />

export function ThreeDots() {
  return (
    <div className="d-flex">
      <div className="mx-auto">
        <ThreeDotsLoader color="#777" height={100} width={50} />
      </div>
    </div>
  )
}

export const THREE_DOTS = <ThreeDots />
