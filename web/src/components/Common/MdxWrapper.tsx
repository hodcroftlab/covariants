import React from 'react'

import { styled } from 'styled-components'

export const MdxSection = styled.section`
  margin: 10px 5px;
  padding: 0.65rem 2rem;
  background-color: ${(props) => props.theme.gray100};
  box-shadow: ${(props) => props.theme.shadows.slight};
  border-radius: 3px;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MdxWrapper(props: any) {
  return <MdxSection {...props} />
}
