import type { Cluster } from 'src/state/Clusters'
import { getClusters, sortClusters } from 'src/io/getClusters'

import perClusterData from '../../data/perClusterData.json'

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
  country_names: string[] // eslint-disable-line camelcase
  distributions: ClusterDistribution[]
}

export interface PerClusterData {
  clusters: Cluster[]
  clusterBuildNames: Map<string, string>
  clusterDistributions: ClusterDistribution[]
}

export function getPerClusterDataRaw(): PerClusterDataRaw {
  return perClusterData as PerClusterDataRaw
}
export function getPerClusterData(): PerClusterData {
  const perClusterData = getPerClusterDataRaw()

  const clusterNames = perClusterData.distributions.map(({ cluster }) => cluster).sort()
  const clusters = sortClusters(clusterNames.map((cluster) => ({ cluster, enabled: true })))

  const clusterBuildNames: Map<string, string> = new Map(getClusters().map((c) => [c.display_name, c.build_name]))

  const clusterDistributions: ClusterDistribution[] = perClusterData.distributions

  return {
    clusters,
    clusterBuildNames,
    clusterDistributions,
  }
}

export function getClusterDistribution(cluster: string): ClusterDistribution {
  const perClusterData = getPerClusterDataRaw()
  const clusterDistributions: ClusterDistribution[] = perClusterData.distributions
  const clusterDistribution = clusterDistributions.find((dist) => dist.cluster === cluster)
  if (!clusterDistribution) {
    throw new Error(`Cluster distribution not found for cluster '${cluster}'`)
  }
  return clusterDistribution
}

export function getCountryNames(): string[] {
  const perClusterData = getPerClusterDataRaw()
  return perClusterData.country_names
}
