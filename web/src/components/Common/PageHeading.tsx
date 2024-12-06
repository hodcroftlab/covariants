import { styled } from 'styled-components'

export const PageHeading = styled.h1`
  text-align: center;

  @media (min-width: 768px) {
    line-height: 1.2;
    font-weight: 300;
    margin: 1.5rem 0;
  }

  @media (min-width: 1120px) {
    font-size: 3rem;
    margin-top: 0;
  }
`
