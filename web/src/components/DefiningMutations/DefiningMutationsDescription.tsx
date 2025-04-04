import React from 'react'
import { MdxContent } from 'src/i18n/getMdxContent'
import { Editable } from 'src/components/Common/Editable'

export function DefiningMutationsDescription() {
  const infoFilename = 'DefiningMutationsIntro.mdx'

  return (
    <Editable githubUrl={`blob/master/content/${infoFilename}`}>
      <MdxContent filepath={`${infoFilename}`} />
    </Editable>
  )
}
