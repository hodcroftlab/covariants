import 'reflect-metadata'
import 'resize-observer-polyfill/dist/ResizeObserver.global'

import 'css.escape'

import { enableES5 } from 'immer'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { ReactQueryDevtools } from 'react-query/devtools'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'

import { theme } from 'src/theme'
import { DOMAIN_STRIPPED } from 'src/constants'
import { Plausible } from 'src/components/Common/Plausible'
import { SeoApp } from 'src/components/Common/SeoApp'

import { mdxComponents } from 'src/components/Common/MdxComponents'

import 'src/styles/global.scss'

enableES5()

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useMemo(() => new QueryClient(), [])

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <MDXProvider components={(components) => ({ ...components, ...mdxComponents })}>
          <Plausible domain={DOMAIN_STRIPPED} />
          <SeoApp />
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </MDXProvider>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default dynamic(() => Promise.resolve(MyApp), { ssr: false })
