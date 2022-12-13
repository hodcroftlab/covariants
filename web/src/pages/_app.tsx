import 'reflect-metadata'
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import 'css.escape'
import dynamic from 'next/dynamic'
import React, { Suspense, useMemo } from 'react'
import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import i18n from 'src/i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import { theme } from 'src/theme'
import { loadPolyfills } from 'src/polyfills'
import { DOMAIN_STRIPPED } from 'src/constants'
import { Plausible } from 'src/components/Common/Plausible'
import { LOADING } from 'src/components/Loading/Loading'
import { getMdxComponents } from 'src/components/Common/MdxComponents'
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary'
import { Layout } from 'src/components/Layout/Layout'
import 'src/styles/global.scss'

const REACT_QUERY_OPTIONS: QueryClientConfig = {
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 1,
      staleTime: Number.POSITIVE_INFINITY,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: Number.POSITIVE_INFINITY,
    },
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useMemo(() => new QueryClient(REACT_QUERY_OPTIONS), [])

  return (
    <Suspense fallback={LOADING}>
      <ErrorBoundary>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <MDXProvider components={getMdxComponents}>
              <I18nextProvider i18n={i18n} />
              <Plausible domain={DOMAIN_STRIPPED} />
              <QueryClientProvider client={queryClient}>
                <Layout>
                  <Suspense>
                    <Component {...pageProps} />
                  </Suspense>
                </Layout>
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </MDXProvider>
          </ThemeProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </Suspense>
  )
}

async function run() {
  await loadPolyfills()
  return MyApp
}

export default dynamic(() => run(), { ssr: false })
