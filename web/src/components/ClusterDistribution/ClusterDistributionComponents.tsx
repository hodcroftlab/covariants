import { Row } from 'reactstrap'
import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { ColCustom } from 'src/components/Common/ColCustom'
import { ClusterDistributionPlotCard } from 'src/components/ClusterDistribution/ClusterDistributionPlotCard'
import { filterClusters, filterCountries } from 'src/io/getPerClusterData'
import { Country } from 'src/state/Places'
import { Cluster, clusterDisplayNameToBuildNameMapSelector } from 'src/state/Clusters'
import { perClusterDataDistributionsSelector } from 'src/state/PerClusterData'

export function ClusterDistributionComponents({
  clustersSelected,
  countriesSelected,
}: {
  clustersSelected: Cluster[]
  countriesSelected: Country[]
}) {
  const clusterBuildNames = useRecoilValue(clusterDisplayNameToBuildNameMapSelector)
  const clusterDistributions = useRecoilValue(perClusterDataDistributionsSelector)

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
          />
        </ColCustom>
      )),
    [clusterBuildNames, enabledCountries, withCountriesFiltered],
  )
  return <Row className={'gx-0'}>{clusterDistributionComponents}</Row>
}
