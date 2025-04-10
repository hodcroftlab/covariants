import React from 'react'
import { ClusterButtonPanelLayout } from 'src/components/ClusterButtonPanel/ClusterButtonPanelLayout'
import { Editable } from 'src/components/Common/Editable'
import { MdxContent } from 'src/i18n/getMdxContent'

export function Home() {
  return (
    <ClusterButtonPanelLayout>
      <Editable>
        <MdxContent filepath="Home.md" />
      </Editable>
    </ClusterButtonPanelLayout>
  )
}
