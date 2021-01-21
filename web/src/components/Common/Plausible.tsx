/**
 * Taken with modifications from
 * https://github.com/4lejandrito/next-plausible/blob/a8e6c2df06b6e8943017d59903ab54e24667ffe2/index.tsx#L1
 *
 * By 4lejandrito
 */

import React, { ReactNode } from 'react'
import Head from 'next/head'
import { get, noop } from 'lodash'

export function PlausibleProvider({
  domain,
  children,
  customDomain = 'https://plausible.io',
}: {
  domain: string
  customDomain?: string
  children: ReactNode | ReactNode[]
}) {
  console.log({ domain })

  return (
    <>
      <Head>
        {process.env.NODE_ENV === 'production' && (
          <script async defer data-domain={domain} src={`${customDomain}/js/plausible.js`} />
        )}
      </Head>
      {children}
    </>
  )
}

export type PlausibleHookResult = (event: string) => void

export function usePlausible() {
  return get(window, 'plausible', noop) as PlausibleHookResult
}
