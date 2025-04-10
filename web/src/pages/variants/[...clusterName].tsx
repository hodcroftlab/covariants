import type { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { get } from 'lodash'

import React from 'react'
import { useCluster, Variants } from 'src/components/Variants/Variants'
import clustersJson from 'src/../public/data/clusters.json'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'
import { joinAllMaybe } from 'src/helpers/array'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'
import { VariantHeadline } from 'src/components/Variants/VariantHeadline'
import { ClusterButtonPanelLayout } from 'src/components/ClusterButtonPanel/ClusterButtonPanelLayout'
import { DeveloperError } from 'src/components/Error/DeveloperError'

const clusters = clustersJson.clusters.filter((cluster) => !cluster.has_no_page)
const clusterBuildNames = clusters.map((cluster) => cluster.build_name)
const clusterLineages = clusters.flatMap((cluster) =>
  cluster.alt_display_name?.map((lineage) => lineage).filter(notUndefinedOrNull),
)
const clusterOldBuildNames = clusters.flatMap((cluster) => cluster.old_build_names).filter(notUndefinedOrNull)

export interface VariantsPageProps {
  clusterName?: string
}

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

export default function VariantsPage({ clusterName }: { clusterName?: string }) {
  const cluster = useCluster(clusterName)

  if (!cluster) {
    return (
      <LimitedWidthPage>
        <DeveloperError errorMessage={`Could not find cluster by name: ${clusterName}`} />
      </LimitedWidthPage>
    )
  }

  return (
    <LimitedWidthPage>
      <VariantHeadline cluster={cluster} />
      <ClusterButtonPanelLayout currentCluster={cluster}>
        <Variants currentCluster={cluster} />
      </ClusterButtonPanelLayout>
    </LimitedWidthPage>
  )
}
