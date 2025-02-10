import React from 'react'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable } from 'src/components/Common/Editable'

export function DefiningMutationsIndexInfoText() {
  const infoFilename = 'DefiningMutationsIndexIntro.mdx'

  return (
    <CenteredEditable githubUrl={`blob/master/content/${infoFilename}`}>
      <MdxContent filepath={`${infoFilename}`} />
    </CenteredEditable>
  )
}
