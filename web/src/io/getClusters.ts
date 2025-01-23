/* eslint-disable camelcase */
import { groupBy, isNil } from 'lodash'
import { z } from 'zod'

import type { Cluster } from 'src/state/Clusters'

import { FETCHER } from 'src/hooks/useAxiosQuery'

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
  return clusterDataRawSchema.parse(clusters).clusters
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
