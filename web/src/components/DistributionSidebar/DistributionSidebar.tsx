import get from 'lodash/get'
import React, { useState, useMemo, useCallback } from 'react'
import { Col, Row } from 'reactstrap'
import { SetterOrUpdater, useRecoilValue } from 'recoil'
import { CountryFlagProps } from '../Common/CountryFlag'
import { ClusterFilters } from './ClusterFilters'
import { CountryFilters } from './CountryFilters'
import { Cluster, clusterNamesSelector, disableAllClusters, enableAllClusters, toggleCluster } from 'src/state/Clusters'

import {
  Continent,
  Country,
  disableAllCountries,
  enableAllCountries,
  toggleContinent,
  toggleCountry,
} from 'src/state/Places'
import { sortClustersByClusterNames } from 'src/io/getClusters'

export interface DistributionSidebarProps {
  countries: Country[]
  continents: Continent[]
  clusters?: Cluster[]
  setCountries: SetterOrUpdater<Country[]>
  setContinents: SetterOrUpdater<Continent[]>
  setClusters: SetterOrUpdater<Cluster[]>
  regionsTitle: string
  clustersCollapsedByDefault?: boolean
  countriesCollapsedByDefault?: boolean
  enabledFilters: string[]
  Icon?: React.ComponentType<CountryFlagProps>
}

export function DistributionSidebar({
  countries,
  continents,
  clusters,
  setCountries,
  setContinents,
  setClusters,
  regionsTitle,
  clustersCollapsedByDefault = true,
  countriesCollapsedByDefault = true,
  enabledFilters,
  Icon,
}: DistributionSidebarProps) {
  const [clustersCollapsed, setClustersCollapsed] = useState(clustersCollapsedByDefault)
  const [countriesCollapsed, setCountriesCollapsed] = useState(countriesCollapsedByDefault)
  const clusterNames = useRecoilValue(clusterNamesSelector)
  const clustersSorted = useMemo(
    () => sortClustersByClusterNames(clusters ?? [], clusterNames),
    [clusters, clusterNames],
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

  const availableFilters: Record<string, React.ReactNode> = useMemo(
    () => ({
      countries: (
        <CountryFilters
          key="country-filters"
          countries={countries}
          continents={continents}
          regionsTitle={regionsTitle}
          onFilterSelectRegion={handleContinentCheckedChange}
          onFilterChange={handleCountryCheckedChange}
          onFilterSelectAll={handleCountrySelectAll}
          onFilterDeselectAll={handleCountryDeselectAll}
          collapsed={countriesCollapsed}
          setCollapsed={setCountriesCollapsed}
        />
      ),
      countriesWithIcons: (
        <CountryFilters
          key="country-filters"
          regionsTitle={regionsTitle}
          countries={countries}
          continents={continents}
          withIcons
          Icon={Icon}
          onFilterChange={handleCountryCheckedChange}
          onFilterSelectRegion={handleContinentCheckedChange}
          onFilterSelectAll={handleCountrySelectAll}
          onFilterDeselectAll={handleCountryDeselectAll}
          collapsed={countriesCollapsed}
          setCollapsed={setCountriesCollapsed}
        />
      ),
      clusters: clusters && (
        <ClusterFilters
          key="cluster-filters"
          clusters={clustersSorted}
          onFilterChange={handleClusterCheckedChange}
          onFilterSelectAll={handleClusterSelectAll}
          onFilterDeselectAll={handleClusterDeselectAll}
          collapsed={clustersCollapsed}
          setCollapsed={setClustersCollapsed}
        />
      ),
    }),
    [
      Icon,
      clustersCollapsed,
      clusters,
      clustersSorted,
      countriesCollapsed,
      handleClusterCheckedChange,
      handleClusterDeselectAll,
      handleClusterSelectAll,
      handleCountryCheckedChange,
      handleCountryDeselectAll,
      handleCountrySelectAll,
      handleContinentCheckedChange,
      regionsTitle,
      countries,
      continents,
    ],
  )

  return (
    <Row className={'gx-0'}>
      <Col>{enabledFilters.map((filterName) => get(availableFilters, filterName))}</Col>
    </Row>
  )
}
