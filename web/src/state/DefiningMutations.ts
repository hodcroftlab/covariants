import { atomFamily, selector, useRecoilValue } from 'recoil'
import Router from 'next/router'
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
        .map((cluster) => [cluster.nextstrainClade, cluster.pangoLineage]),
    )
  },
})

export const definingMutationsClusterLineages = selector({
  key: 'definingMutationsClusterLineages',
  get: ({ get }) => {
    const clusters = get(definingMutationClustersAtom)
    return clusters.map((cluster) => cluster.pangoLineage)
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

export function useClusterNameFromUrl() {
  const { query } = parseUrl(Router.asPath)
  return takeFirstMaybe(query.variant)
}

export function setClusterNameToUrl(clusterName: string | undefined) {
  const newQuery = clusterName ? { variant: clusterName } : {}
  setUrlQuery(newQuery).catch(() => {})
}

export const DefiningMutationClusterAtomFamily = atomFamily({
  key: 'DefiningMutationClusterFamily',
  default: async (clusterName: string | undefined) => {
    if (clusterName === undefined) {
      return undefined
    }
    return fetchDefiningMutationsCluster(clusterName)
  },
})

export function useDefiningMutationsCluster() {
  const clusterNameFromUrl = useClusterNameFromUrl()
  const allClusters = useRecoilValue(definingMutationClustersAtom)
  return allClusters.find(
    (cluster) => cluster.pangoLineage === clusterNameFromUrl || cluster.nextstrainClade == clusterNameFromUrl,
  )
}
