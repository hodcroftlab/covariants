import styled from 'styled-components'

export const WrapperFlex = styled.section`
  display: flex;
  flex-wrap: wrap;
`

export const SidebarFlex = styled.aside`
  @media only screen and (max-width: 768px) {
    flex: 1 0 100%;
  }

  @media only screen and (min-width: 768px) {
    flex: 0 0 320px;
  }
`

export const MainFlex = styled.section`
  flex: 1 0 350px;
  margin-bottom: 300px;
`

export const ChartContainerOuter = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`

export const ChartContainerInner = styled.div`
  flex: 0 1 100%;
  width: 0;
`
