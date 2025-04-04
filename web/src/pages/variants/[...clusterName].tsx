import type { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { get } from 'lodash'

import React, { ReactElement } from 'react'
import { Variants, type VariantsPageProps } from 'src/components/Variants/Variants'
import clustersJson from 'src/../public/data/clusters.json'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'
import { joinAllMaybe } from 'src/helpers/array'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

const clusters = clustersJson.clusters.filter((cluster) => !cluster.has_no_page)
const clusterBuildNames = clusters.map((cluster) => cluster.build_name)
const clusterLineages = clusters.flatMap((cluster) =>
  cluster.alt_display_name?.map((lineage) => lineage).filter(notUndefinedOrNull),
)
const clusterOldBuildNames = clusters.flatMap((cluster) => cluster.old_build_names).filter(notUndefinedOrNull)

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<VariantsPageProps>> {
  const clusterName = joinAllMaybe(get(context?.params, 'clusterName'))

  return {
    props: {
      clusterName,
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getStaticPaths(_0: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  return {
    paths: [...clusterBuildNames, ...clusterOldBuildNames, ...clusterLineages].map(
      (clusterName) => `/variants/${clusterName}`,
    ),
    fallback: false,
  }
}

export default function VariantsPage({ clusterName }: { clusterName: string }) {
  return <Variants clusterName={clusterName} />
}

VariantsPage.getLayout = function getLayout(page: ReactElement) {
  return <LimitedWidthPage>{page}</LimitedWidthPage>
}
