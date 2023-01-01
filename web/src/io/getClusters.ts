/* eslint-disable camelcase */
import { groupBy, isNil } from 'lodash'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'

import type { Mutation } from 'src/types'
import type { Cluster } from 'src/state/Clusters'
import { theme } from 'src/theme'

import clustersJson from 'src/../data/clusters.json'

export const CLUSTER_NAME_OTHERS = 'others' as const

export interface AquariaDatum {
  gene: string
  url: string
}

export type ClusterDatum = {
  build_name: string
  old_build_names?: string[]
  nextstrain_url?: string
  col: string
  display_name: string
  alt_display_name?: string[]
  snps: number[]
  mutations?: {
    nonsynonymous?: Mutation[]
    synonymous?: Mutation[]
  }
  aquaria_urls?: AquariaDatum[]
  type?: string
  important?: boolean
  has_no_page?: boolean
}

export function getClusters(): ClusterDatum[] {
  return clustersJson.clusters
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

  const clusters = getClusters()
  const found = clusters.find(({ display_name }) => display_name === clusterName)
  return found ? found.col : theme.clusters.color.unknown
}

export type ClusterDataGrouped = Record<string, ClusterDatum[]>

export function getClustersGrouped(clusters: ClusterDatum[]): ClusterDataGrouped {
  const clustersWithType = clusters.filter((cluster) => !isNil(cluster.type))
  return groupBy(clustersWithType, 'type')
}

export function sortClusters(clusters: Cluster[]): Cluster[] {
  const clusterNames = getClusterNames()
  return clusterNames.reduce((result, name) => {
    const cluster = clusters.find((cluster) => cluster.cluster === name)
    if (cluster) {
      result.push(cluster)
    }
    return result
  }, [] as Cluster[])
}
