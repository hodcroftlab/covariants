import { Row } from 'reactstrap'
import React, { useMemo } from 'react'
import { ColCustom } from 'src/components/Common/ColCustom'
import { ClusterDistributionPlotCard } from 'src/components/ClusterDistribution/ClusterDistributionPlotCard'
import { useTicks, useTimeDomain } from 'src/io/useParams'
import { filterClusters, filterCountries, usePerClusterData } from 'src/io/getPerClusterData'
import { Country } from 'src/state/Places'
import { Cluster } from 'src/state/Clusters'

export function ClusterDistributionComponents({
  clustersSelected,
  countriesSelected,
}: {
  clustersSelected: Cluster[]
  countriesSelected: Country[]
}) {
  const ticks = useTicks()
  const timeDomain = useTimeDomain()
  const { clusterBuildNames, clusterDistributions } = usePerClusterData()

  const { withClustersFiltered } = useMemo(
    () => filterClusters(clustersSelected, clusterDistributions),
    [clustersSelected, clusterDistributions],
  )
  const { enabledCountries, withCountriesFiltered } = useMemo(
    () => filterCountries(countriesSelected, withClustersFiltered),
    [countriesSelected, withClustersFiltered],
  )

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
