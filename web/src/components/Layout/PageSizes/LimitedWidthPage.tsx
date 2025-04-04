import React, { PropsWithChildren } from 'react'
import { Layout } from 'src/components/Layout/Base/Layout'

export function LimitedWidthPage({ children }: PropsWithChildren) {
  return (
    <Layout>
      <div className="container-xl">{children}</div>
    </Layout>
  )
}
