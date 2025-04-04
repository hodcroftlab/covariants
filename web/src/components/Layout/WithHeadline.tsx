import React, { PropsWithChildren } from 'react'
import { PageHeading } from '../Common/PageHeading'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

export function WithHeadline({ children, title }: PropsWithChildren<{ title: string }>) {
  const { t } = useTranslationSafe()

  return (
    <>
      <PageHeading>{t(title)}</PageHeading>
      {children}
    </>
  )
}
