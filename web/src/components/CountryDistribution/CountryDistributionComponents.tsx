import React, { useMemo } from 'react'
import { Row } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { ColCustom } from 'src/components/Common/ColCustom'
import { CountryDistributionPlotCard } from 'src/components/CountryDistribution/CountryDistributionPlotCard'
import { CountryFlagProps } from 'src/components/Common/CountryFlag'
import { filterClusters, filterCountries } from 'src/io/getPerCountryData'
import { Country } from 'src/state/Places'
import { Cluster } from 'src/state/Clusters'
import { perCountryDataDistributionsSelector } from 'src/state/PerCountryData'

export function CountryDistributionComponents({
  countries,
  clusters,
  iconComponent,
  region,
}: ClusterDistributionComponentsProps) {
  const countryDistributions = useRecoilValue(perCountryDataDistributionsSelector(region))

  const { enabledClusters, withClustersFiltered } = useMemo(() => {
    const { withCountriesFiltered } = filterCountries(countries, countryDistributions)
    const filteredClusters = filterClusters(clusters, withCountriesFiltered)
    const { enabledClusters, withClustersFiltered } = filteredClusters
    return { enabledClusters, withClustersFiltered }
  }, [countries, countryDistributions, clusters])

  const countryDistributionComponents = useMemo(
    () =>
      withClustersFiltered.map(({ country, distribution }) => (
        <ColCustom key={country} md={12} lg={6} xl={6} xxl={4}>
          <CountryDistributionPlotCard
            country={country}
            distribution={distribution}
            cluster_names={enabledClusters}
            Icon={iconComponent}
          />
        </ColCustom>
      )),
    [enabledClusters, withClustersFiltered, iconComponent],
  )

  return <Row className={'gx-0'}>{countryDistributionComponents}</Row>
}

export interface ClusterDistributionComponentsProps {
  clusters: Cluster[]
  countries: Country[]
  region: string
  iconComponent?: React.ComponentType<CountryFlagProps>
}
