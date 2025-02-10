import type { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { get } from 'lodash'
import dynamic from 'next/dynamic'
import type { DefiningMutationsPageProps } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsPage'
import { getClades, getDefiningMutationClustersFromDisk, getLineages } from 'src/io/getDefiningMutationsClusters'
import { joinAllMaybe } from 'src/helpers/array'

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<DefiningMutationsPageProps>> {
  const clusterName = joinAllMaybe(get(context?.params, 'clusterName'))

  if (!clusterName) {
    throw new Error(
      `Tried to build page for unknown clusterName: ${clusterName}. Please provide a clusterName, which is defined in getDefiningMutationClustersFromDisk`,
    )
  }

  return {
    props: {
      clusterName,
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getStaticPaths(_0: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const clusters = getDefiningMutationClustersFromDisk()
  const lineages = getLineages(clusters)
  const clades = getClades(clusters)

  return {
    paths: [...lineages, ...clades].map((clusterName) => `/defining-mutations/${clusterName}`),
    fallback: false,
  }
}

export default dynamic(
  async () => import('src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsPage'),
  {
    ssr: false,
  },
)
