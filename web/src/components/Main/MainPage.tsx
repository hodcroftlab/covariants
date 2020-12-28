import React, {useMemo, useState, useRef} from 'react'

import styled from 'styled-components'
import {Col, Row} from 'reactstrap'
import dynamic from 'next/dynamic'

import {Link} from 'src/components/Link/Link'
import {Editable} from 'src/components/Common/Editable'

import Readme from '../../../../README.md'

export function MainPage() {

  return (
    <div>
      <Editable githubUrl={'Index'}>
        <Readme/>
      </Editable>
    </div>
  )
}
