import React from 'react'
import { useRecoilValue } from 'recoil'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { DefiningMutationsClusterIndexTableWithSearch } from 'src/components/DefiningMutations/Index/DefiningMutationsClusterTable'
import { Layout } from 'src/components/Layout/Layout'
import { definingMutationClustersAtom } from 'src/state/DefiningMutations'
import { DefiningMutationTitle } from 'src/components/DefiningMutations/Index/DefiningMutationsTitle'
import { DefiningMutationsIndexInfoText } from 'src/components/DefiningMutations/Index/DefiningMutationsIndexInfoText'

export default function DefiningMutationsIndexPage() {
  const clusters = useRecoilValue(definingMutationClustersAtom)

  return (
    <Layout>
      <NarrowPageContainer>
        <DefiningMutationTitle />
        <DefiningMutationsIndexInfoText />
        <DefiningMutationsClusterIndexTableWithSearch clusters={clusters} />
      </NarrowPageContainer>
    </Layout>
  )
}
