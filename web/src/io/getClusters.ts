/* eslint-disable camelcase */
import { groupBy } from 'lodash'
import Color from 'color'

import type { Mutation } from 'src/types'
import { theme } from 'src/theme'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'

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

/**
 * Finds an opaque color equivalent to a transparent color (with given hex RGB color and  given opacity)
 * added on top of white background
 */
export function opaqueAlpha(color: string, opacity: number) {
  let clr = new Color(color)

  const rgb = clr
    .rgb()
    .array()
    .map((c) => 255 - opacity * (255 - c))

  clr = new Color(rgb)
  return clr.hex()
}

export function getClusterPlotColor(clusterName: string, opacity: number) {
  const color = getClusterColor(clusterName)
  return opaqueAlpha(color, opacity)
}

export type ClusterDataGrouped = Record<string, ClusterDatum[]>

export function getClustersGrouped(): ClusterDataGrouped {
  const clusters = getClusters()
  return groupBy(clusters, 'type')
}
