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

const clusterDatumSchemaRaw = z.object({
  alt_display_name: z.string().array().optional(),
  aquaria_urls: aquariaDatumSchema.array().optional(),
  build_name: z.string(),
  col: z.string(),
  display_name: z.string(),
  has_no_page: z.boolean().optional(),
  important: z.boolean().optional(),
  mutations: z
    .object({
      nonsynonymous: mutationSchema.array().optional(),
      synonymous: mutationSchema.array().optional(),
    })
    .optional(),
  nextstrain_url: z.string().optional(),
  old_build_names: z.string().array().optional(),
  pango_lineages: z
    .object({
      name: z.string(),
      url: z.string().or(z.null()),
    })
    .array()
    .optional(),
  snps: z.number().array(),
  type: z.string().optional(),
})

const clusterDatumSchema = clusterDatumSchemaRaw.transform(
  ({
    alt_display_name,
    aquaria_urls,
    build_name,
    display_name,
    has_no_page,
    nextstrain_url,
    old_build_names,
    pango_lineages,
    ...rest
  }) => ({
    ...(alt_display_name ? { altDisplayName: alt_display_name } : {}),
    ...(aquaria_urls ? { aquariaUrls: aquaria_urls } : {}),
    buildName: build_name,
    displayName: display_name,
    ...(has_no_page ? { hasNoPage: has_no_page } : {}),
    ...(nextstrain_url ? { nextstrainUrl: nextstrain_url } : {}),
    ...(old_build_names ? { oldBuildNames: old_build_names } : {}),
    ...(pango_lineages ? { pangoLineages: pango_lineages } : {}),
    ...rest,
  }),
)

const clusterDataRawSchema = z.object({
  clusters: clusterDatumSchemaRaw.array(),
})

export type ClusterDatum = z.infer<typeof clusterDatumSchema>

export async function fetchClusters(): Promise<ClusterDatum[]> {
  const clusters = await FETCHER.validatedFetch('/data/clusters.json', clusterDataRawSchema)
  return clusterDatumSchema.array().parse(clusters.clusters)
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
