import { omit } from 'lodash'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import clustersJson from 'src/../data/definingMutationsIndex.json'
import { ClusterDatum, getClusters } from 'src/io/getClusters'

export interface DefMutClusterIndexDatum {
  lineage: string
  nextstrainClade: string
}

export interface DefMutNucRaw {
  ref: string
  alt: string
  annotation: string
}

export interface DefMutNuc {
  ref: string
  pos: number
  alt: string
  annotation: string
}

export interface DefMutAaRaw {
  ref: string
  alt: string
  nucPos: number[]
  annotation: string
}

export interface DefMutAa {
  gene: string
  ref: string
  pos: number
  alt: string
  nucPos: number[]
  nucMuts: DefMutNuc[]
  annotation: string
}

export interface SilentOrCodingMut {
  nucMut?: DefMutNuc
  aaMut?: DefMutAa
}

export interface DefiningMutations {
  nuc: Record<string, DefMutNucRaw>
  aa: Record<string, Record<string, DefMutAaRaw>>
}

export function getDefMutClusters(): DefMutClusterIndexDatum[] {
  return clustersJson.clusters as DefMutClusterIndexDatum[]
}

export interface DefMutClusterDatumRaw {
  lineage: string
  unaliased?: string
  parent?: string
  children?: string[]
  nextstrainClade: string
  frameShifts?: []
  designationDate: string
  designationIssue?: string
  mutations: Record<string, DefiningMutations>
}

export interface DefMutClusterDatum extends Omit<DefMutClusterDatumRaw, 'nextstrainClade'> {
  cluster?: ClusterDatum
}

export function useDefMutCluster(clusterName: string): DefMutClusterDatum {
  const res = useQuery<DefMutClusterDatumRaw>(
    ['definingMutations', clusterName],
    async () => import(`src/../data/definingMutations/${clusterName}.json`),
    {
      staleTime: Number.POSITIVE_INFINITY,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: Number.POSITIVE_INFINITY,
      suspense: true,
      retry: 1,
    },
  )
  return useMemo(() => {
    if (!res.data) {
      throw new Error(`Data not found for clade or lineage '${clusterName}'`)
    }
    const defMutClusterRaw = res.data
    const cluster = getClusters().find((cl) => cl.nextstrain_name === defMutClusterRaw.nextstrainClade)
    return { ...omit(defMutClusterRaw, 'nextstrainClade'), cluster }
  }, [clusterName, res.data])
}

export function getDefMutClusterRedirects(): Record<string, string> {
  return Object.fromEntries(
    getDefMutClusters()
      .filter((cluster) => cluster.nextstrainClade !== 'recombinant')
      .map((cluster) => [cluster.nextstrainClade, cluster.lineage]),
  )
}

export function getDefMutClusterLineages() {
  return getDefMutClusters().map((cluster) => cluster.lineage)
}

export function getDefMutClusterClades() {
  return getDefMutClusters()
    .filter((cluster) => cluster.nextstrainClade !== 'recombinant')
    .map((cluster) => cluster.nextstrainClade)
}
