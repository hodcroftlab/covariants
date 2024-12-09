import type { GetStaticPathsContext, GetStaticPropsContext, GetStaticPathsResult, GetStaticPropsResult } from 'next'
import { get } from 'lodash'

import type { VariantsPageProps } from 'src/components/Variants/VariantsPage'
import { getClusterBuildNames, getClusterOldBuildNames } from 'src/io/getClusters'
import { takeFirstMaybe } from 'src/helpers/takeFirstMaybe'

const clusterBuildNames = getClusterBuildNames()
const clusterOldBuildNames = getClusterOldBuildNames()

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<VariantsPageProps>> {
  const clusterName = takeFirstMaybe(get(context?.params, 'clusterName'))

  return {
    props: {
      clusterName,
    },
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getStaticPaths(_0: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  return {
    paths: [...clusterBuildNames, ...clusterOldBuildNames].map((clusterName) => `/variants/${clusterName}`),
    fallback: false,
  }
}

export { VariantsPage as default } from 'src/components/Variants/VariantsPage'
