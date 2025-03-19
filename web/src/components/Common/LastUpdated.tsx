import React, { HTMLProps } from 'react'
import { styled } from 'styled-components'
import classNames from 'classnames'

import { useRecoilValue } from 'recoil'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { lastUpdatedAtom } from 'src/state/LastUpdated'

const LastUpdatedText = styled.small`
  font-size: 0.9rem;
`

export function LastUpdated({ className }: HTMLProps<HTMLParagraphElement>) {
  const { t } = useTranslationSafe()
  const { date, full } = useRecoilValue(lastUpdatedAtom)

  return (
    <LastUpdatedText className={classNames(className)}>
      <span title={full}>{t('Last updated: {{ date }}', { date })}</span>
    </LastUpdatedText>
  )
}
