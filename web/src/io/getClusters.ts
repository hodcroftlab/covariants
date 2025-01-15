/* eslint-disable camelcase */
import { groupBy, isNil } from 'lodash'
import { z } from 'zod'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'

import type { Cluster } from 'src/state/Clusters'
import { theme } from 'src/theme'

import { FETCHER, useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

export const CLUSTER_NAME_OTHERS = 'others'

const mutationSchema = z.object({
  parent: z.string().optional(),
  parentDelimiter: z.string().optional(),
  gene: z.string().optional(),
  left: z.string().optional(),
  pos: z.number().optional(),
  right: z.string().optional(),
  version: z.string().optional(),
  note: z.string().optional(),
})

const aquariaDatumSchema = z.object({
  gene: z.string(),
  url: z.string(),
})

const clusterDatumSchema = z.object({
  build_name: z.string(),
  old_build_names: z.string().array().optional(),
  nextstrain_url: z.string().optional(),
  col: z.string(),
  display_name: z.string(),
  alt_display_name: z.string().array().optional(),
  snps: z.number().array(),
  mutations: z
    .object({
      nonsynonymous: mutationSchema.array().optional(),
      synonymous: mutationSchema.array().optional(),
    })
    .optional(),
  aquaria_urls: aquariaDatumSchema.array().optional(),
  type: z.string().optional(),
  important: z.boolean().optional(),
  has_no_page: z.boolean().optional(),
})

const clusterDataRawSchema = z.object({
  clusters: clusterDatumSchema.array(),
})

type ClusterDataRaw = z.infer<typeof clusterDataRawSchema>
export type ClusterDatum = z.infer<typeof clusterDatumSchema>

export async function fetchClusters(): Promise<ClusterDatum[]> {
  const clusters = await FETCHER.fetch<ClusterDataRaw>('/data/clusters.json')
  return clusters.clusters
}

export function useClusters(): ClusterDatum[] {
  const { data: clusters } = useValidatedAxiosQuery<ClusterDataRaw>('/data/clusters.json', clusterDataRawSchema)
  return clusters.clusters
}

export async function fetchClusterNames() {
  const clusters = await fetchClusters()
  return clusters.map((cluster) => cluster.display_name)
}

export function useClusterNames() {
  return useClusters().map((cluster) => cluster.display_name)
}

export function useClusterRedirects(): Map<string, string> {
  return useClusters().reduce((result, cluster) => {
    if (cluster.old_build_names) {
      cluster.old_build_names.forEach((oldName) => result.set(oldName, cluster.build_name))
    }
    return result
  }, new Map<string, string>())
}

export function useClusterBuildNames() {
  return useClusters().map((cluster) => cluster.build_name)
}

export function useClusterOldBuildNames() {
  return useClusters()
    .flatMap((cluster) => cluster.old_build_names)
    .filter(notUndefinedOrNull)
}

export function useClusterColors() {
  const clusters = useClusters()

  return (clusterName: string) => {
    if (clusterName === CLUSTER_NAME_OTHERS) {
      return theme.clusters.color.others
    }

    const found = clusters.find(({ display_name }) => display_name === clusterName)
    return found ? found.col : theme.clusters.color.unknown
  }
}

export type ClusterDataGrouped = Record<string, ClusterDatum[]>

export function getClustersGrouped(clusters: ClusterDatum[]): ClusterDataGrouped {
  const clustersWithType = clusters.filter((cluster) => !isNil(cluster.type))
  return groupBy(clustersWithType, 'type')
}

export function sortClustersByClusterNames(clusters: Cluster[], clusterNames: string[]): Cluster[] {
  return clusterNames.reduce((result, name) => {
    const cluster = clusters.find((cluster) => cluster.cluster === name)
    if (cluster) {
      result.push(cluster)
    }
    return result
  }, [] as Cluster[])
}
