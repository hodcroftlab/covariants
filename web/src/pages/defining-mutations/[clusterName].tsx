import type { GetStaticPathsContext, GetStaticPropsContext, GetStaticPathsResult, GetStaticPropsResult } from 'next'
import { get } from 'lodash'
import dynamic from 'next/dynamic'
import type { DefiningMutationsPageProps } from 'src/components/DefiningMutations/DefiningMutationsPage'
import { takeFirstMaybe } from 'src/helpers/takeFirstMaybe'
import { getDefMutClusterClades, getDefMutClusterLineages } from 'src/io/getDefiningMutationsClusters'

const lineages = getDefMutClusterLineages()
const clades = getDefMutClusterClades()

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<DefiningMutationsPageProps>> {
  const clusterName = takeFirstMaybe(get(context?.params, 'clusterName'))

  return {
    props: {
      clusterName,
    },
  }
}

export async function getStaticPaths(_0: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  return {
    paths: [...lineages, ...clades].map((clusterName) => `/defining-mutations/${clusterName}`),
    fallback: false,
  }
}

export default dynamic(async () => import('src/components/DefiningMutations/DefiningMutationsPage'), {
  ssr: false,
})
