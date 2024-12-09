import { ParsedUrlQuery } from 'querystring'
import { get } from 'lodash'
import { atom } from 'recoil'
import type { Cluster } from './Clusters'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'

import { updateUrlQuery } from 'src/helpers/urlQuery'
import { getPerCountryCasesData } from 'src/io/getPerCountryCasesData'

function getAllClusters(): Cluster[] {
  return getPerCountryCasesData().clusters
}

/**
 * Converts values incoming from URL query into clusters.
 * To be used during app startup.
 */
export function urlQueryToClustersCases(query: ParsedUrlQuery) {
  const enabledClusters = convertToArrayMaybe(get(query, 'variant'))

  // Take all clusters and set only the clusters present in the query as `enabled`
  let clusters = getAllClusters()
  if (enabledClusters) {
    clusters = clusters.map((cluster) => ({
      ...cluster,
      enabled: includesCaseInsensitive(enabledClusters, cluster.cluster),
    }))
  }

  return clusters
}

/**
 * Represents a list of currently enabled clusters (variants)
 */
export const clustersCasesAtom = atom<Cluster[]>({
  key: 'clustersCases',
  default: getAllClusters(),
  effects: [
    ({ onSet }) => {
      onSet((clusters) => {
        // If all clusters are enabled, we will remove cluster url params
        const hasAllEnabled = clusters.every((cluster) => cluster.enabled)

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
