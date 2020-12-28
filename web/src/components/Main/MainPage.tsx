import React from 'react'

import { Editable } from 'src/components/Common/Editable'

import Readme from '../../../../README.md'

export function MainPage() {
  return (
    <div>
      <Editable githubUrl={'Index'}>
        <Readme />
      </Editable>
    </div>
  )
}
