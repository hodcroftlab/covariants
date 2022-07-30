// https://www.joshwcomeau.com/snippets/react-components/fade-in/

import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
function FadeIn({ duration = 300, delay = 0, children, ...delegated }) {
  return (
    <Wrapper
      {...delegated}
      style={{
        ...delegated.style,
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: backwards;
  }
`
export default FadeIn
