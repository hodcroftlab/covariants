import { get } from 'lodash'
import { ParsedUrlQuery } from 'querystring'
import { atomFamily } from 'recoil'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'

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

/**
 * Converts values incoming from URL query into clusters.
 * To be used during app startup.
 */
export function urlQueryToClusters(query: ParsedUrlQuery, { dataFlavor, region }: ClustersDataParams) {
  const enabledCountries = convertToArrayMaybe(get(query, 'variant'))

  // Take all clusters and set only the clusters present in the query as `enabled`
  let clusters = getAllClusters({ dataFlavor, region })
  if (enabledCountries) {
    clusters = clusters.map((cluster) => ({
      ...cluster,
      enabled: includesCaseInsensitive(enabledCountries, cluster.cluster),
    }))
  }

  return clusters
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
        // If all clusters are enabled, we will remove cluster url params
        const hasAllEnabled = clusters.every((cluster) => cluster.enabled)

        // eslint-disable-next-line no-void
        void updateUrlQuery({
          variant: hasAllEnabled ? [] : clusters.filter((cluster) => cluster.enabled).map((cluster) => cluster.cluster),
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
