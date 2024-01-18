import { pickBy } from 'lodash'
import { SetterOrUpdater, useRecoilState } from 'recoil'
import { FETCHER, useAxiosQuery, UseAxiosQueryOptions } from 'src/hooks/useAxiosQuery'
import { clustersForPerClusterDataAtom } from 'src/state/ClustersForPerClusterData'
import type { Country } from 'src/state/Places'
import type { Cluster } from 'src/state/Clusters'
import { getClusters } from 'src/io/getClusters'

export interface ClusterDistributionDatum {
  week: string
  frequencies: {
    [country: string]: number | undefined
  }
  interp: {
    [country: string]: boolean | undefined
  }
  orig: {
    [country: string]: boolean | undefined
  }
}

export interface ClusterDistribution {
  cluster: string
  distribution: ClusterDistributionDatum[]
}

export interface PerClusterDataRaw {
  country_names: string[]
  distributions: ClusterDistribution[]
}

export interface PerClusterData {
  clusters: Cluster[]
  clusterBuildNames: Map<string, string>
  clusterDistributions: ClusterDistribution[]
}

export function usePerClusterDataRaw(options?: UseAxiosQueryOptions<PerClusterDataRaw>): PerClusterDataRaw {
  return useAxiosQuery<PerClusterDataRaw>('data/perClusterData.json', options)
}

export function fetchPerClusterDataRaw() {
  return FETCHER.fetch<PerClusterDataRaw>('data/perClusterData.json')
}

export function usePerClusterData(): PerClusterData & { setClusters: SetterOrUpdater<Cluster[]> } {
  const perClusterData = usePerClusterDataRaw()

  const [clusters, setClusters] = useRecoilState(clustersForPerClusterDataAtom)
  const clusterBuildNames: Map<string, string> = new Map(getClusters().map((c) => [c.display_name, c.build_name]))
  const clusterDistributions: ClusterDistribution[] = perClusterData.distributions

  return {
    clusters,
    setClusters,
    clusterBuildNames,
    clusterDistributions,
  }
}

export function useClusterDistribution(cluster: string): ClusterDistribution {
  const perClusterData = usePerClusterDataRaw()
  const clusterDistributions: ClusterDistribution[] = perClusterData.distributions
  const clusterDistribution = clusterDistributions.find((dist) => dist.cluster === cluster)
  if (!clusterDistribution) {
    throw new Error(`Cluster distribution not found for cluster '${cluster}'`)
  }
  return clusterDistribution
}

export function useCountryNames(): string[] {
  const perClusterData = usePerClusterDataRaw()
  return perClusterData.country_names
}

export function filterCountries(countries: Country[], withClustersFiltered: ClusterDistribution[]) {
  const enabledCountries = new Set<string>(
    countries.filter((country) => country.enabled).map((country) => country.country),
  )

  const withCountriesFiltered = withClustersFiltered.map(({ cluster, distribution }) => {
    const distributionFiltered = distribution.map((dist) => {
      const frequenciesFiltered = pickBy(dist.frequencies, (_0, country) => {
        return enabledCountries.has(country)
      })

      return { ...dist, frequencies: frequenciesFiltered }
    })
    return { cluster, distribution: distributionFiltered }
  })

  return { enabledCountries: Array.from(enabledCountries), withCountriesFiltered }
}

export function filterClusters(clusters: Cluster[], clusterDistributions: ClusterDistribution[]) {
  const enabledClusters = clusters.filter(({ enabled }) => enabled).map(({ cluster }) => cluster)
  const withClustersFiltered = clusterDistributions.filter(({ cluster }) => {
    return enabledClusters.includes(cluster)
  })
  return { enabledClusters, withClustersFiltered }
}
