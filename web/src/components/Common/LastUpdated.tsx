import React, { HTMLProps, useMemo } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

import { getLastUpdatedDate, getLastUpdatedFull } from 'src/io/getLastUpdatedDate'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

const LastUpdatedText = styled.small`
  font-size: 0.9rem;
`

export function LastUpdated({ className }: HTMLProps<HTMLParagraphElement>) {
  const { t } = useTranslationSafe()

  const { lastUpdated, lastUpdatedFull } = useMemo(
    () => ({
      lastUpdated: t('Last updated: {{ date }}', { date: getLastUpdatedDate() }),
      lastUpdatedFull: getLastUpdatedFull(),
    }),
    [t],
  )

  return (
    <LastUpdatedText className={classNames(className)}>
      <span className="ml-1" title={lastUpdatedFull}>
        {lastUpdated}
      </span>
    </LastUpdatedText>
  )
}
