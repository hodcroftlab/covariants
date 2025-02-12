import React from 'react'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable } from 'src/components/Common/Editable'

export function DefiningMutationsInfoText() {
  const infoFilename = 'DefiningMutationsVariantIntro.mdx'

  return (
    <CenteredEditable githubUrl={`blob/master/content/${infoFilename}`}>
      <MdxContent filepath={`${infoFilename}`} />
    </CenteredEditable>
  )
}
