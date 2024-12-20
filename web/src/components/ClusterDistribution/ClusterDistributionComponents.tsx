import { Row } from 'reactstrap'
import React, { useMemo } from 'react'
import { ColCustom } from 'src/components/Common/ColCustom'
import { ClusterDistributionPlotCard } from 'src/components/ClusterDistribution/ClusterDistributionPlotCard'
import { useTicks, useTimeDomain } from 'src/io/useParams'
import { ClusterDistribution } from 'src/io/getPerClusterData'

export function ClusterDistributionComponents({
  withCountriesFiltered,
  clusterBuildNames,
  enabledCountries,
}: {
  withCountriesFiltered: ClusterDistribution[]
  clusterBuildNames: Map<string, string>
  enabledCountries: string[]
}) {
  const ticks = useTicks()
  const timeDomain = useTimeDomain()

  const clusterDistributionComponents = useMemo(
    () =>
      withCountriesFiltered.map(({ cluster, distribution }) => (
        <ColCustom key={cluster} md={12} lg={6} xl={6} xxl={4}>
          <ClusterDistributionPlotCard
            key={cluster}
            clusterBuildName={clusterBuildNames.get(cluster) ?? ''}
            clusterDisplayName={cluster}
            distribution={distribution}
            country_names={enabledCountries}
            ticks={ticks}
            timeDomain={timeDomain}
          />
        </ColCustom>
      )),
    [clusterBuildNames, enabledCountries, withCountriesFiltered, ticks, timeDomain],
  )
  return <Row className={'gx-0'}>{clusterDistributionComponents}</Row>
}
