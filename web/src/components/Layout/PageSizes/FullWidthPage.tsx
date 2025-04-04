import React, { PropsWithChildren } from 'react'
import { Layout } from 'src/components/Layout/Base/Layout'

export function FullWidthPage({ children }: PropsWithChildren) {
  return <Layout>{children}</Layout>
}
