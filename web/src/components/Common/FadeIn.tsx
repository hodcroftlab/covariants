// https://www.joshwcomeau.com/snippets/react-components/fade-in/

import React, { PropsWithChildren } from 'react'
import styled, { keyframes } from 'styled-components'

export interface FadeInProps {
  duration?: number
  delay?: number
}

export function FadeIn({ duration = 300, delay = 0, children }: PropsWithChildren<FadeInProps>) {
  return (
    <Wrapper $delay={delay} $duration={duration}>
      {children}
    </Wrapper>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Wrapper = styled.div<{ $delay?: number; $duration?: number }>`
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: backwards;
    animation-delay: ${(props) => props.$delay}ms;
    animation-duration: ${(props) => props.$duration}ms;
  }
`
