/* eslint-disable camelcase */
import { groupBy } from 'lodash'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'

import type { Mutation } from 'src/types'
import { theme } from 'src/theme'

import clustersJson from 'src/../data/clusters.json'

export const CLUSTER_NAME_OTHERS = 'others' as const

export type ClusterDatum = {
  build_name: string
  old_build_names?: string[]
  nextstrain_url?: string
  cluster_data: unknown[]
  col: string
  country_info: unknown[]
  display_name: string
  alt_display_name?: string[]
  snps: number[]
  mutations?: {
    nonsynonymous?: Mutation[]
    synonymous?: Mutation[]
  }
  type: string
  important: boolean
}

export function getClustersIncludingHidden(): ClusterDatum[] {
  return clustersJson.clusters
}

export function getClusters(): ClusterDatum[] {
  return clustersJson.clusters.filter(({ type }) => type !== 'do_not_display')
}

export function getDefaultCluster(): ClusterDatum {
  return getClusters()[0]
}

export function getClusterNames() {
  return getClusters().map((cluster) => cluster.display_name)
}

export function getClusterRedirects(): Map<string, string> {
  return getClusters().reduce((result, cluster) => {
    if (cluster.old_build_names) {
      cluster.old_build_names.forEach((oldName) => result.set(oldName, cluster.build_name))
    }
    return result
  }, new Map<string, string>())
}

export function getClusterBuildNames() {
  return getClusters().map((cluster) => cluster.build_name)
}

export function getClusterOldBuildNames() {
  return getClusters()
    .flatMap((cluster) => cluster.old_build_names)
    .filter(notUndefinedOrNull)
}

export function getClusterColor(clusterName: string) {
  if (clusterName === CLUSTER_NAME_OTHERS) {
    return theme.clusters.color.others
  }

  const clusters = getClustersIncludingHidden()
  const found = clusters.find(({ display_name }) => display_name === clusterName)
  return found ? found.col : theme.clusters.color.unknown
}

export type ClusterDataGrouped = Record<string, ClusterDatum[]>

export function getClustersGrouped(): ClusterDataGrouped {
  const clusters = getClusters()
  return groupBy(clusters, 'type')
}
