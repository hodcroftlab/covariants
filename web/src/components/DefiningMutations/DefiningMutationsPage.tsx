import React from 'react'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { Layout } from 'src/components/Layout/Layout'
import { DefiningMutationLineageTitle } from 'src/components/DefiningMutations/DefiningMutationLineageTitle'
import { useDefiningMutationsCluster } from 'src/state/DefiningMutations'
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
  const cluster = useDefiningMutationsCluster()

  return (
    <>
      <DefiningMutationLineageTitle cluster={cluster} />

      <div className="row">
        <div className={'col-12 col-md-2 order-1 order-md-1'}>
          <DefiningMutationsNavigation cluster={cluster} />
        </div>
        <div className={'col-12 col-md-8 order-3 order-md-2'}>
          <DefiningMutationsContent cluster={cluster} />
        </div>
        {cluster && (
          <div className={'col-12 col-md-2 order-2 order-md-3'}>
            <DefiningMutationsInfo cluster={cluster} />
          </div>
        )}
      </div>
    </>
  )
}
