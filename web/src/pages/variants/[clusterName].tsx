/* eslint-disable camelcase */
import type { GetStaticPathsContext, GetStaticPropsContext, GetStaticPathsResult, GetStaticPropsResult } from 'next'
import { get } from 'lodash'

import type { VariantsPageBaseProps } from 'src/components/Variants/VariantsPage'
import { getClusterBuildNames, getClusters, getDefaultCluster } from 'src/io/getClusters'
import { takeFirstMaybe } from 'src/helpers/takeFirstMaybe'

const clusters = getClusters()
const DEFAULT_CLUSTER = getDefaultCluster()
const clusterBuildNames = getClusterBuildNames()

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<VariantsPageBaseProps>> {
  const clusterName = takeFirstMaybe(get(context?.params, 'clusterName'))
  const defaultCluster = clusters.find(({ build_name }) => clusterName === build_name) ?? DEFAULT_CLUSTER

  return {
    props: {
      defaultCluster,
    },
  }
}

export async function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  return {
    paths: clusterBuildNames.map((clusterName) => `/variants/${clusterName}`),
    fallback: false,
  }
}

export { VariantsPage as default } from 'src/components/Variants/VariantsPage'
