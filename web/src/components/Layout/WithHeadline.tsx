import React, { PropsWithChildren } from 'react'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

export function Title({ children }: PropsWithChildren) {
  return <h1 className="text-center">{children}</h1>
}

export function Subtitle({ children }: PropsWithChildren) {
  return <div className="text-center">{children}</div>
}

export function WithHeadline({ children, title, subtitle }: PropsWithChildren<{ title: string; subtitle?: string }>) {
  const { t } = useTranslationSafe()

  return (
    <>
      <Title>{t(title)}</Title>
      {subtitle && <Subtitle>{t(subtitle)}</Subtitle>}
      {children}
    </>
  )
}
