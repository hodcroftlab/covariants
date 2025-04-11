import React from 'react'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable } from 'src/components/Common/Editable'

export function Faq() {
  return (
    <CenteredEditable githubUrl="blob/master/content/Faq.md">
      <MdxContent filepath="Faq.mdx" />
    </CenteredEditable>
  )
}
