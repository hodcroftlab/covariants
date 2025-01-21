import React, { useMemo } from 'react'
import { Row } from 'reactstrap'
import { ColCustom } from 'src/components/Common/ColCustom'
import { CountryDistributionPlotCard } from 'src/components/CountryDistribution/CountryDistributionPlotCard'
import { CountryFlagProps } from 'src/components/Common/CountryFlag'
import { CountryDistribution } from 'src/io/getPerCountryData'

export interface ClusterDistributionComponentsProps {
  withClustersFiltered: CountryDistribution[]
  enabledClusters: string[]
  iconComponent?: React.ComponentType<CountryFlagProps>
}

export function CountryDistributionComponents({
  withClustersFiltered,
  enabledClusters,
  iconComponent,
}: ClusterDistributionComponentsProps) {
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
