import styled from 'styled-components'

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & a {
    overflow-wrap: anywhere;
  }
`

export const ErrorMessage = styled.p`
  overflow-wrap: break-word;
  word-break: normal;
`

export const ErrorStack = styled.pre`
  white-space: pre-wrap;
`
