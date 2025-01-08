import React, { HTMLProps } from 'react'
import { styled } from 'styled-components'
import classNames from 'classnames'

import { useLastUpdated } from 'src/io/useLastUpdated'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

const LastUpdatedText = styled.small`
  font-size: 0.9rem;
`

export function LastUpdated({ className }: HTMLProps<HTMLParagraphElement>) {
  const { t } = useTranslationSafe()
  const { date, full } = useLastUpdated()

  return (
    <LastUpdatedText className={classNames(className)}>
      <span className="ms-1" title={full}>
        {t('Last updated: {{ date }}', { date: date })}
      </span>
    </LastUpdatedText>
  )
}
