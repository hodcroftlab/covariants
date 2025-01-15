import React, { useMemo } from 'react'
import { Row } from 'reactstrap'
import { ColCustom } from 'src/components/Common/ColCustom'
import { CountryDistributionPlotCard } from 'src/components/CountryDistribution/CountryDistributionPlotCard'
import { useTicks, useTimeDomain } from 'src/io/useParams'
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
  const ticks = useTicks()
  const timeDomain = useTimeDomain()

  const countryDistributionComponents = useMemo(
    () =>
      withClustersFiltered.map(({ country, distribution }) => (
        <ColCustom key={country} md={12} lg={6} xl={6} xxl={4}>
          <CountryDistributionPlotCard
            country={country}
            distribution={distribution}
            cluster_names={enabledClusters}
            Icon={iconComponent}
            ticks={ticks}
            timeDomain={timeDomain}
          />
        </ColCustom>
      )),
    [enabledClusters, withClustersFiltered, iconComponent, ticks, timeDomain],
  )

  return <Row className={'gx-0'}>{countryDistributionComponents}</Row>
}
