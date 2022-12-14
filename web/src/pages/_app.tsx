import 'reflect-metadata'
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import 'css.escape'
import { isNil } from 'lodash'
import { isFalsy } from 'utility-types'
import Route from 'route-parser'
import dynamic from 'next/dynamic'
import React, { PropsWithChildren, Suspense, useCallback, useMemo } from 'react'
import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'src/i18n/i18n'
import { theme } from 'src/theme'
import { loadPolyfills } from 'src/polyfills'
import { DOMAIN_STRIPPED } from 'src/constants'
import { Plausible } from 'src/components/Common/Plausible'
import { LOADING } from 'src/components/Loading/Loading'
import { getMdxComponents } from 'src/components/Common/MdxComponents'
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary'
import { Layout } from 'src/components/Layout/Layout'
import 'src/styles/global.scss'
import { currentClusterAtom } from 'src/state/Clusters'
import { ClusterDatum, useClusters } from 'src/io/getClusters'
import { useRouter } from 'next/router'

const VariantsPage = dynamic(() => import('src/components/Variants/VariantsPage').then((m) => m.VariantsPage))
const NotFoundPage = dynamic(() => import('src/pages/404'))

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

const VARIANTS_ROUTE = new Route<{ clusterName?: string }>('/variants/:clusterName')

function matchVariantsRoute(clusters: ClusterDatum[], asPath: string) {
  const routeMatch = VARIANTS_ROUTE.match(asPath)
  if (!isFalsy(routeMatch) && !isNil(routeMatch?.clusterName)) {
    return clusters.find((cluster) => cluster.build_name === routeMatch?.clusterName)
  }
  return undefined
}

// HACK: primitive router. Replace with something more sturdy
function Router({ children }: PropsWithChildren) {
  const { asPath, route } = useRouter()
  const clusters = useClusters()

  const result = useMemo(() => {
    const cluster = matchVariantsRoute(clusters, asPath)
    if (cluster) {
      return <VariantsPage />
    }
    if (asPath !== route) {
      return <NotFoundPage />
    }
    return children
  }, [asPath, children, clusters, route])

  const initializeState = useCallback(
    ({ set, reset }: MutableSnapshot) => {
      const cluster = matchVariantsRoute(clusters, asPath)
      if (cluster) {
        set(currentClusterAtom, cluster)
      } else {
        reset(currentClusterAtom)
      }
    },
    [asPath, clusters],
  )

  return (
    <RecoilRoot initializeState={initializeState}>
      <Layout>{result}</Layout>
    </RecoilRoot>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useMemo(() => new QueryClient(REACT_QUERY_OPTIONS), [])

  return (
    <Suspense fallback={LOADING}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <MDXProvider components={getMdxComponents}>
              <I18nextProvider i18n={i18n} />
              <Plausible domain={DOMAIN_STRIPPED} />
              <Router>
                <Suspense>
                  <Component {...pageProps} />
                </Suspense>
              </Router>
              <ReactQueryDevtools initialIsOpen={false} />
            </MDXProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  )
}

async function run() {
  await loadPolyfills()
  return MyApp
}

export default dynamic(() => run(), { ssr: false })
