import React from 'react'
import { MdxContent } from 'src/i18n/getMdxContent'
import { Editable } from 'src/components/Common/Editable'
import { getContentGithubUrl } from 'src/helpers/getContentGithubUrl'

export function DefiningMutationsDescription() {
  const infoFilename = 'DefiningMutationsIntro.mdx'

  return (
    <Editable githubUrl={getContentGithubUrl({ filename: infoFilename })}>
      <MdxContent filepath={`${infoFilename}`} />
    </Editable>
  )
}
