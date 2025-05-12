import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import Router from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { atomAsync } from 'src/state/utils/atomAsync'
import {
  DefiningMutationListElement,
  fetchDefiningMutationClusters,
  fetchDefiningMutationsCluster,
} from 'src/io/getDefiningMutationsClusters'
import { parseUrl } from 'src/helpers/parseUrl'
import { takeFirstMaybe } from 'src/helpers/array'
import { setUrlQuery } from 'src/helpers/urlQuery'

export const definingMutationClustersAtom = atomAsync<DefiningMutationListElement[]>({
  key: 'definingMutations',
  async default() {
    return await fetchDefiningMutationClusters()
  },
})

export const definingMutationsCladeToLineage = selector({
  key: 'definingMutationsCladeToLineage',
  get: ({ get }) => {
    const clusters = get(definingMutationClustersAtom)
    return Object.fromEntries(
      clusters
        .filter((cluster) => cluster.nextstrainClade !== 'recombinant')
        .map((cluster) => [cluster.nextstrainClade, cluster.lineage]),
    )
  },
})

export const definingMutationsClusterLineages = selector({
  key: 'definingMutationsClusterLineages',
  get: ({ get }) => {
    const clusters = get(definingMutationClustersAtom)
    return clusters.map((cluster) => cluster.lineage)
  },
})

export const definingMutationClusterClades = selector({
  key: 'definingMutationClusterClades',
  get: ({ get }) => {
    const clusters = get(definingMutationClustersAtom)
    return clusters
      .filter((cluster) => cluster.nextstrainClade !== 'recombinant')
      .map((cluster) => cluster.nextstrainClade)
  },
})

export const definingMutationClusterQueryParamAtom = atom<string | undefined>({
  key: 'definingMutationCluster',
  default: undefined,
})

export function useClusterNameFromUrlOrAtom() {
  const { query } = parseUrl(Router.asPath)
  const clusterNameFromUrl = takeFirstMaybe(query.variant)

  const [clusterNameFromAtom, setClusterNameAtom] = useRecoilState(definingMutationClusterQueryParamAtom)

  if (clusterNameFromUrl === undefined) {
    const newQuery = clusterNameFromAtom ? { variant: clusterNameFromAtom } : {}
    setUrlQuery(newQuery).catch(() => {})
    return clusterNameFromAtom
  }

  if (clusterNameFromAtom !== clusterNameFromUrl) {
    setClusterNameAtom(clusterNameFromUrl)
  }

  return clusterNameFromUrl
}

export function setClusterName(clusterName: string | undefined) {
  const newQuery = clusterName ? { variant: clusterName } : {}
  setUrlQuery(newQuery).catch(() => {})
}

export function useDefiningMutationsCluster() {
  const clusterNameFromUrl = useClusterNameFromUrlOrAtom()
  const allClusters = useRecoilValue(definingMutationClustersAtom)
  const isInClusterList = allClusters.some((cluster) => cluster.lineage === clusterNameFromUrl)
  const cleanClusterName = clusterNameFromUrl !== undefined && isInClusterList ? clusterNameFromUrl : undefined

  const { data: cluster } = useQuery({
    queryKey: [`fetchDefiningMutationsCluster_${cleanClusterName}`],
    queryFn: async () => {
      return fetchDefiningMutationsCluster(cleanClusterName)
    },
  })
  return cluster
}
