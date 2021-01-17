import { Container } from 'reactstrap'
import styled from 'styled-components'

export const VariantsPageContainer = styled(Container)`
  max-width: 1500px;
`

export const WrapperFlex = styled.section`
  display: flex;
  flex-wrap: wrap;
`

export const SidebarFlex = styled.aside`
  @media only screen and (max-width: 992px) {
    flex: 1;
  }

  @media only screen and (min-width: 992px) {
    flex: 0 0 150px;
  }
`

export const MainFlex = styled.section`
  flex: 1;
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
