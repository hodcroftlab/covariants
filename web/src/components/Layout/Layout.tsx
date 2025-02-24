import React, { PropsWithChildren, Suspense } from 'react'
import { styled } from 'styled-components'
import { Container as ContainerBase, Row, Col } from 'reactstrap'
import Image from 'next/image'
import { ErrorBoundary } from 'react-error-boundary'
import { useRecoilState } from 'recoil'
import { LastUpdated } from '../Common/LastUpdated'
import { NavigationBar } from './NavigationBar'
import { FooterContent } from './Footer'
import GisaidLogoPNG from 'src/assets/images/GISAID_logo.png'
import { ChristmasLightRope, Santa, Snowfall } from 'src/components/Common/Christmas'
import { ChangelogButton } from 'src/components/Common/ChangelogButton'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { FetchError } from 'src/components/Error/FetchError'
import { ToggleTwoLabels } from 'src/components/Common/ToggleTwoLabels'
import { enablePangolinAtom } from 'src/state/Nomenclature'

export function Layout({ children }: PropsWithChildren<LayoutProps>) {
  const { t } = useTranslationSafe()

  return (
    <Container fluid>
      <HeaderRow className={'gx-0'}>
        <HeaderCol>
          <NavigationBar />
          <ChristmasLightRope />
        </HeaderCol>
      </HeaderRow>

      <Row className="ms-3 mt-2 d-none d-md-block gx-0">
        <Col className="d-flex">
          <GisaidText className="me-auto d-flex align-items-center gap-1">
            {t('Enabled by data from {{ gisaid }}', { gisaid: '' })}
            <LinkExternal href="https://www.gisaid.org/" icon={null}>
              <Image src={GisaidLogoPNG} alt="GISAID" height={27} width={73} />
            </LinkExternal>
          </GisaidText>

          <NomenclatureSwitch />

          <ChangelogButton>
            <ErrorBoundary FallbackComponent={FetchError}>
              <Suspense>
                <LastUpdated />
              </Suspense>
            </ErrorBoundary>
          </ChangelogButton>
        </Col>
      </Row>

      <MainContainer fluid>
        <MainRow className={'gx-0 mt-2'}>
          <MainCol>{children}</MainCol>
        </MainRow>
      </MainContainer>

      <FooterRow className={'gx-0'}>
        <FooterCol>
          <FooterContent />
        </FooterCol>
      </FooterRow>

      <Snowfall />
      <Santa />
    </Container>
  )
}

function NomenclatureSwitch({ className }: { className?: string }) {
  const [enablePangolin, setEnablePangolin] = useRecoilState(enablePangolinAtom)

  return (
    <NomenclatureToggle
      className={className}
      identifier="nomenclature-switch"
      title="Switch nomenclature"
      checked={enablePangolin}
      onCheckedChanged={setEnablePangolin}
      labelLeft="Pangolin"
      labelRight="Nextstrain"
    />
  )
}

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

const NomenclatureToggle = styled(ToggleTwoLabels)`
  transform: scale(0.9);
`
