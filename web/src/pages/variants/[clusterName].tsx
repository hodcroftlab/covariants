/* eslint-disable camelcase */
import type { GetStaticPathsContext, GetStaticPropsContext, GetStaticPathsResult, GetStaticPropsResult } from 'next'
import { get } from 'lodash'

import type { VariantsPageBaseProps } from 'src/components/Variants/VariantsPage'
import {
  getClusterBuildNames,
  getClusterOldBuildNames,
  getClusterRedirects,
  getClusters,
  getDefaultCluster,
} from 'src/io/getClusters'
import { takeFirstMaybe } from 'src/helpers/takeFirstMaybe'

const clusters = getClusters()
const DEFAULT_CLUSTER = getDefaultCluster()
const clusterBuildNames = getClusterBuildNames()
const clusterOldBuildNames = getClusterOldBuildNames()
const clusterRedirects = getClusterRedirects()

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<VariantsPageBaseProps>> {
  const clusterName = takeFirstMaybe(get(context?.params, 'clusterName'))

  if (clusterName) {
    const clusterNewName = clusterRedirects.get(clusterName)
    if (clusterNewName) {
      return {
        redirect: {
          destination: `/variants/${clusterNewName}`,
          permanent: true,
        },
      }
    }
  }

  const defaultCluster = clusters.find(({ build_name }) => clusterName === build_name) ?? DEFAULT_CLUSTER

  return {
    props: {
      currentCluster: defaultCluster,
    },
  }
}

export async function getStaticPaths(_0: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  return {
    paths: [...clusterBuildNames, ...clusterOldBuildNames].map((clusterName) => `/variants/${clusterName}`),
    fallback: false,
  }
}

export { VariantsPage as default } from 'src/components/Variants/VariantsPage'
