import { atomFamily } from 'recoil'

import { updateUrlQuery } from 'src/helpers/urlQuery'
import { getPerClusterData } from 'src/io/getPerClusterData'
import { getPerCountryData } from 'src/io/getPerCountryData'

/** Tells which clusters data to load */
export enum ClustersDataFlavor {
  PerCountry = 'PerCountry',
  PerCluster = 'PerCluster',
}

export type ClustersDataParams = {
  dataFlavor: ClustersDataFlavor
  region: string
}

export interface Cluster {
  cluster: string
  enabled: boolean
}

export function getAllClusters({ dataFlavor, region }: ClustersDataParams): Cluster[] {
  // Data is different depending on page (/par-cluster or /per-variant)
  switch (dataFlavor) {
    case ClustersDataFlavor.PerCountry: {
      // NOTE: Per country page data also differs by region
      const { clusters } = getPerCountryData(region)
      return clusters
    }
    case ClustersDataFlavor.PerCluster: {
      const { clusters } = getPerClusterData()
      return clusters
    }
    default:
      throw new RangeError('Unknown clusters data flavor. This is an internal error. Please report it to developers')
  }
}

/**
 * Represents a list of currently enabled clusters (variants)
 */
export const clustersAtom = atomFamily<Cluster[], ClustersDataParams>({
  key: 'clusters',
  default: (params) => getAllClusters(params),
  effects: [
    ({ onSet }) => {
      onSet((clusters) => {
        // eslint-disable-next-line no-void
        void updateUrlQuery({
          variant: clusters.filter((cluster) => cluster.enabled).map((cluster) => cluster.cluster),
        })
      })
    },
  ],
})

/** Toggles a given cluster enabled/disabled */
export function toggleCluster(clusters: Cluster[], clusterName: string): Cluster[] {
  return clusters.map((cluster) => {
    if (cluster.cluster === clusterName) {
      return { ...cluster, enabled: !cluster.enabled }
    }
    return cluster
  })
}

/** Toggles all clusters enabled */
export function enableAllClusters(clusters: Cluster[]): Cluster[] {
  return clusters.map((cluster) => ({ ...cluster, enabled: true }))
}

/** Toggles all clusters disabled */
export function disableAllClusters(clusters: Cluster[]): Cluster[] {
  return clusters.map((cluster) => ({ ...cluster, enabled: false }))
}
