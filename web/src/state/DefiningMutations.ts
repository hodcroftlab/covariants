import { selector } from 'recoil'
import { atomAsync } from 'src/state/utils/atomAsync'
import { DefiningMutationListElement, fetchDefiningMutationClusters } from 'src/io/getDefiningMutationsClusters'

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
