import React, { HTMLProps } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

import { getLastUpdatedDate, getLastUpdatedFull } from 'src/io/getLastUpdatedDate'

const LAST_UPDATED_DATE = `Last updated: ${getLastUpdatedDate()}`
const LAST_UPDATED_FULL = `Last updated on: ${getLastUpdatedFull()}`

const LastUpdatedText = styled.small`
  font-size: 0.9rem;
`

export function LastUpdated({ className }: HTMLProps<HTMLParagraphElement>) {
  return (
    <LastUpdatedText className={classNames(className)}>
      <span className="ml-1" title={LAST_UPDATED_FULL}>
        {LAST_UPDATED_DATE}
      </span>
    </LastUpdatedText>
  )
}
