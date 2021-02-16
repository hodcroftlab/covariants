/* eslint-disable camelcase */
import type { Mutation } from 'src/types'
import { theme } from 'src/theme'

import clustersJson from 'src/../data/clusters.json'

export const CLUSTER_NAME_OTHERS = 'others' as const

export type ClusterDatum = {
  build_name: string
  nextstrain_url: string
  cluster_data: unknown[]
  col: string
  country_info: unknown[]
  display_name: string
  display_name2?: string
  snps: number[]
  mutations?: {
    nonsynonymous?: Mutation[]
    synonymous?: Mutation[]
  }
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

export function getClusterBuildNames() {
  return getClusters().map((cluster) => cluster.build_name)
}

export function getClusterColor(clusterName: string) {
  if (clusterName === CLUSTER_NAME_OTHERS) {
    return theme.clusters.color.others
  }

  const clusters = getClusters()
  const found = clusters.find(({ display_name }) => display_name === clusterName)
  return found ? found.col : theme.clusters.color.unknown
}
