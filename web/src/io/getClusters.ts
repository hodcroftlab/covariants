import urljoin from 'url-join'
import type { Mutation } from 'src/types'
import { useAxiosQuery } from 'src/hooks/useAxiosQuery'
import { getDataRootUrl } from 'src/io/getDataRootUrl'

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

export function useClusters() {
  const { clusters } = useAxiosQuery<{ clusters: ClusterDatum[] }>(urljoin(getDataRootUrl(), 'clusters.json'))
  return clusters.filter((cluster) => !cluster.has_no_page)
}

export function useClusterNames() {
  const clusters = useClusters()
  return clusters.map((cluster) => cluster.display_name)
}

export function useClusterUrl(displayName: string) {
  const clusters = useClusters()
  const cluster = clusters.find(({ display_name }) => display_name === displayName)
  if (!cluster) {
    return undefined
  }
  return `/variants/${cluster.build_name}`
}
