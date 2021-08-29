import styled from 'styled-components'

export const FlagOutline = styled.div<{ $missingCode?: string }>`
  height: calc(1em + 2px);
  width: calc(1.5em + 2px);
  border: 1px solid #ced4da;
  display: flex;
  > * {
    width: 100%;
    height: 100%;
  }
`
