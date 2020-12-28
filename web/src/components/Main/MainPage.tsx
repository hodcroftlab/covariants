import React from 'react'

import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'

import Readme from '../../../../README.md'

export function MainPage() {
  return (
    <Layout>
      <Editable githubUrl={'Index'}>
        <Readme />
      </Editable>
    </Layout>
  )
}
