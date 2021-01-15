import type { GetStaticPropsContext, GetStaticPropsResult } from 'next'

import type { VariantsPageBaseProps } from 'src/components/Variants/VariantsPage'
import { getClusterBuildNames } from 'src/io/getClusters'

const clusterBuildNames = getClusterBuildNames()

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<VariantsPageBaseProps>> {
  return {
    redirect: {
      destination: `/variants/${clusterBuildNames[0]}`,
      permanent: false,
    },
  }
}

export { VariantsPage as default } from 'src/components/Variants/VariantsPage'
