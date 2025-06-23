import React from 'react'
import { DefiningMutationsHeadline } from 'src/components/DefiningMutations/DefiningMutationsHeadline'
import { useDefiningMutationsCluster } from 'src/state/DefiningMutations'
import { DefiningMutationsInfo } from 'src/components/DefiningMutations/DefiningMutationsInfo'
import { DefiningMutationsNavigation } from 'src/components/DefiningMutations/DefiningMutationsNavigation'

import { DefiningMutationsContent } from 'src/components/DefiningMutations/DefiningMutationsContent'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function DefiningMutationsPage() {
  return (
    <LimitedWidthPage>
      <DefiningMutations />
    </LimitedWidthPage>
  )
}

function DefiningMutations() {
  const cluster = useDefiningMutationsCluster()

  return (
    <>
      <DefiningMutationsHeadline cluster={cluster} />

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
