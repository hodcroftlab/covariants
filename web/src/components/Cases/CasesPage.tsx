import React, { useCallback, useMemo } from 'react'
import { Col, Row } from 'reactstrap'
import { useRecoilState } from 'recoil'
import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { ColCustom } from 'src/components/Common/ColCustom'
import { Layout } from 'src/components/Layout/Layout'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { MdxContent } from 'src/i18n/getMdxContent'
import { getPerCountryCasesData, filterClusters, filterCountries } from 'src/io/getPerCountryCasesData'
import { clustersCasesAtom, disableAllClusters, enableAllClusters, toggleCluster } from 'src/state/ClustersForCaseData'
import {
  continentsCasesAtom,
  countriesCasesAtom,
  disableAllCountries,
  enableAllCountries,
  toggleContinent,
  toggleCountry,
} from 'src/state/PlacesForCaseData'
import { CountryFlag } from 'src/components/Common/CountryFlag'
import { PageHeading } from 'src/components/Common/PageHeading'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { useMobile } from 'src/helpers/useMediaQuery'
import { CasesPlotCard } from './CasesPlotCard'
import { StickyToolbar, ToolbarGroup } from '../Common/StickyToolbar'
import { DateFilter } from '../Common/DateFilter'

const enabledFilters = ['clusters', 'countriesWithIcons']

export function CasesPage() {
  const { t } = useTranslationSafe()
  const isMobile = useMobile()

  const [countries, setCountries] = useRecoilState(countriesCasesAtom)
  const [continents, setContinents] = useRecoilState(continentsCasesAtom)
  const [clusters, setClusters] = useRecoilState(clustersCasesAtom)

  const { perCountryCasesDistributions } = useMemo(() => getPerCountryCasesData(), [])

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

  const handleClusterCheckedChange = useCallback(
    (cluster: string) => {
      setClusters((oldClusters) => toggleCluster(oldClusters, cluster))
    },
    [setClusters],
  )

  const handleClusterSelectAll = useCallback(() => {
    setClusters((oldClusters) => enableAllClusters(oldClusters))
  }, [setClusters])

  const handleClusterDeselectAll = useCallback(() => {
    setClusters((oldClusters) => disableAllClusters(oldClusters))
  }, [setClusters])

  const handleCountryCheckedChange = useCallback(
    (countryName: string) => {
      setCountries((oldCountries) => toggleCountry(oldCountries, countryName))
    },
    [setCountries],
  )

  const handleContinentCheckedChange = useCallback(
    (continentName: string) => {
      setContinents((oldContinents) => toggleContinent(oldContinents, continentName))
    },
    [setContinents],
  )

  const handleCountrySelectAll = useCallback(() => {
    setCountries(enableAllCountries)
  }, [setCountries])

  const handleCountryDeselectAll = useCallback(() => {
    setCountries(disableAllCountries)
  }, [setCountries])

  return (
    <Layout wide>
      <Row noGutters>
        <Col>
          <PageHeading>{t('Estimated Cases by Variant')}</PageHeading>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <CenteredEditable githubUrl="tree/master/web/src/content/en/PerCountryCasesIntro.md">
            <MdxContent filepath="PerCountryCasesIntro.md" />
          </CenteredEditable>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <SharingPanel />
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="blob/master/scripts" text={t('View data generation scripts')}>
            <StickyToolbar>
              <ToolbarGroup>
                <DateFilter />
              </ToolbarGroup>
            </StickyToolbar>
            <WrapperFlex>
              <SidebarFlex>
                <DistributionSidebar
                  countries={countries}
                  continents={continents}
                  clusters={clusters}
                  regionsTitle={t('Countries')}
                  enabledFilters={enabledFilters}
                  clustersCollapsedByDefault={!isMobile}
                  countriesCollapsedByDefault={!isMobile}
                  Icon={CountryFlag}
                  onClusterFilterChange={handleClusterCheckedChange}
                  onClusterFilterSelectAll={handleClusterSelectAll}
                  onClusterFilterDeselectAll={handleClusterDeselectAll}
                  onCountryFilterChange={handleCountryCheckedChange}
                  onRegionFilterChange={handleContinentCheckedChange}
                  onCountryFilterSelectAll={handleCountrySelectAll}
                  onCountryFilterDeselectAll={handleCountryDeselectAll}
                />
              </SidebarFlex>

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
