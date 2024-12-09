import React, { PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import { Container as ContainerBase, Row, Col } from 'reactstrap'
import Image from 'next/image'
import { LastUpdated } from '../Common/LastUpdated'
import { NavigationBar } from './NavigationBar'
import { FooterContent } from './Footer'
import GisaidLogoPNG from 'src/assets/images/GISAID_logo.png'
import { ChristmasLightRope, Santa, Snowfall } from 'src/components/Common/Christmas'
import { ChangelogButton } from 'src/components/Common/ChangelogButton'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { LinkExternal } from 'src/components/Link/LinkExternal'

const Container = styled(ContainerBase)`
  min-height: 100%;
  width: 100%;
`

const HeaderRow = styled(Row)`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 0;
`

const HeaderCol = styled(Col)`
  flex-grow: 1;
  flex-shrink: 0;
  padding: 0;
`

const MainContainer = styled(ContainerBase)`
  padding-bottom: 100px;
`

const MainRow = styled(Row)``

const MainCol = styled(Col)``

const FooterRow = styled(Row)`
  position: relative;
  margin-top: -100px; /* negative value of footer height */
  height: 100px;
  clear: both;
  padding-top: 50px;

  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
`

const FooterCol = styled(Col)`
  flex-grow: 1;
  flex-shrink: 0;
  padding: 0;
`

const GisaidText = styled.small`
  font-size: 0.9rem;
`

export interface LayoutProps {
  wide?: boolean
}

export function Layout({ children }: PropsWithChildren<LayoutProps>) {
  const { t } = useTranslationSafe()

  return (
    <Container fluid>
      <HeaderRow noGutters>
        <HeaderCol>
          <NavigationBar />
          <ChristmasLightRope />
        </HeaderCol>
      </HeaderRow>

      <Row noGutters className="ms-3 mt-2 d-none d-md-block">
        <Col className="d-flex">
          <GisaidText className="d-flex me-auto">
            <span className="me-1 align-self-center">{t('Enabled by data from {{ gisaid }}', { gisaid: '' })}</span>
            <LinkExternal className="align-self-center" href="https://www.gisaid.org/" icon={null}>
              <Image src={GisaidLogoPNG} alt="GISAID" height={27} width={73} />
            </LinkExternal>
          </GisaidText>

          <ChangelogButton className="d-flex ms-auto">
            <LastUpdated className="d-flex ms-auto" />
          </ChangelogButton>
        </Col>
      </Row>

      <MainContainer fluid>
        <MainRow noGutters>
          <MainCol>{children}</MainCol>
        </MainRow>
      </MainContainer>

      <FooterRow noGutters>
        <FooterCol>
          <FooterContent />
        </FooterCol>
      </FooterRow>

      <Snowfall />
      <Santa />
    </Container>
  )
}
