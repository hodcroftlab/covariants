import React from 'react'
import { useRecoilValue } from 'recoil'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { Layout } from 'src/components/Layout/Layout'
import { DefiningMutationLineageTitle } from 'src/components/DefiningMutations/DefiningMutationLineageTitle'
import { DefiningMutationClusterAtomFamily, useDefiningMutationsCluster } from 'src/state/DefiningMutations'
import { DefiningMutationsInfo } from 'src/components/DefiningMutations/DefiningMutationsInfo'
import { DefiningMutationsNavigation } from 'src/components/DefiningMutations/DefiningMutationsNavigation'

import { DefiningMutationsContent } from 'src/components/DefiningMutations/DefiningMutationsContent'

export default function DefiningMutationsPage() {
  return (
    <Layout>
      <NarrowPageContainer>
        <DefiningMutationsPageContent />
      </NarrowPageContainer>
    </Layout>
  )
}

function DefiningMutationsPageContent() {
  const clusterName = useDefiningMutationsCluster()
  const cluster = useRecoilValue(DefiningMutationClusterAtomFamily(clusterName))

  return (
    <>
      <DefiningMutationLineageTitle cluster={cluster} />

      <div className="row">
        <div className={'col-12 col-md-2 '}>
          <DefiningMutationsNavigation cluster={cluster} />
        </div>
        <div className={'col-12 col-md-8 '}>
          <DefiningMutationsContent cluster={cluster} />
        </div>
        {cluster && (
          <div className={'col-12 col-md-2 mt-4 mt-md-0'}>
            <DefiningMutationsInfo cluster={cluster} />
          </div>
        )}
      </div>
    </>
  )
}
