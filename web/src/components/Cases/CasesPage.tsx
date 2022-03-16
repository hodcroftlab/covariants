import React, { useMemo } from 'react'
import { Col, Row } from 'reactstrap'

import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { ColCustom } from 'src/components/Common/ColCustom'
import { Layout } from 'src/components/Layout/Layout'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'

import IntroContent from 'src/../../content/PerCountryCasesIntro.md'

import { getPerCountryCasesData, filterClusters, filterCountries } from 'src/io/getPerCountryCasesData'
import { CasesPlotCard } from './CasesPlotCard'
import { CountryFlag } from '../Common/CountryFlag'
import { PageHeading } from '../Common/PageHeading'

export function CasesPage() {
  const { countries, clusters, perCountryCasesDistributions } = useMemo(() => getPerCountryCasesData(), [])

  const { enabledClusters, withClustersFiltered } = useMemo(() => {
    const { withCountriesFiltered } = filterCountries(countries, perCountryCasesDistributions)
    const filteredClusters = filterClusters(clusters, withCountriesFiltered)
    const { enabledClusters, withClustersFiltered } = filteredClusters
    return { enabledClusters, withClustersFiltered }
  }, [countries, perCountryCasesDistributions, clusters])

  const casesComponents = useMemo(
    () =>
      withClustersFiltered.map(({ country, distribution }) => (
        <ColCustom key={country} md={12} lg={6} xl={6} xxl={4}>
          <CasesPlotCard
            country={country}
            distribution={distribution}
            cluster_names={enabledClusters}
            Icon={CountryFlag}
          />
        </ColCustom>
      )),
    [enabledClusters, withClustersFiltered],
  )

  return (
    <Layout wide>
      <Row noGutters>
        <Col>
          <PageHeading>{'Give me a name'}</PageHeading>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <CenteredEditable githubUrl="tree/master/content/PerCountryCasesIntro.md">
            <IntroContent />
          </CenteredEditable>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="blob/master/scripts" text={'View data generation scripts'}>
            <WrapperFlex>
              <SidebarFlex />

              <MainFlex>
                <Row noGutters>
                  <Col>
                    <Row noGutters>{casesComponents}</Row>
                  </Col>
                </Row>
              </MainFlex>
            </WrapperFlex>
          </Editable>
        </Col>
      </Row>
    </Layout>
  )
}
