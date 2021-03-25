import React, { HTMLProps } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

import { getLastUpdatedDate } from 'src/io/getLastUpdatedDate'

const LastUpdatedText = styled.small`
  font-size: 0.9rem;
`

export function LastUpdated({ className }: HTMLProps<HTMLParagraphElement>) {
  return (
    <LastUpdatedText className={classNames(className)}>
      <span className="ml-1">{`Last updated: ${getLastUpdatedDate()}`}</span>
    </LastUpdatedText>
  )
}
