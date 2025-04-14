import React from 'react'

import { ClusterButtonPanelLayout } from '../ClusterButtonPanel/ClusterButtonPanelLayout'
import { MdxContent } from 'src/i18n/getMdxContent'
import { Editable } from 'src/components/Common/Editable'

export function VariantsIndex() {
  return (
    <ClusterButtonPanelLayout>
      <Editable githubUrl="blob/master/content/VariantsPageIntro.mdx">
        <MdxContent filepath="VariantsPageIntro.mdx" />
      </Editable>
    </ClusterButtonPanelLayout>
  )
}
