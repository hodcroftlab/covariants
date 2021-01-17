/* eslint-disable camelcase */
import type { Mutation } from 'src/types'

import clustersJson from 'src/../data/clusters.json'

const CLUSTER_COLOR_UNKNOWN = '#555555' as const

export type ClusterDatum = {
  build_name: string
  build_url: string
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
  const clusters = getClusters()
  const found = clusters.find(({ display_name }) => display_name === clusterName)
  return found ? found.col : CLUSTER_COLOR_UNKNOWN
}
