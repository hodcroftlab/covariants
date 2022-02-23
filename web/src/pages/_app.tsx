import 'reflect-metadata'
import 'resize-observer-polyfill/dist/ResizeObserver.global'

import 'css.escape'

import dynamic from 'next/dynamic'
import React, { useCallback, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { ReactQueryDevtools } from 'react-query/devtools'

import type { AppProps } from 'next/app'
import { parseUrl } from 'src/helpers/parseUrl'
import { clustersAtom, ClustersDataFlavor, urlQueryToClusters } from 'src/state/Clusters'
import { continentsAtom, countriesAtom, regionAtom, urlQueryToPlaces } from 'src/state/Places'
import { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'

import { theme } from 'src/theme'
import { DOMAIN_STRIPPED } from 'src/constants'
import { Plausible } from 'src/components/Common/Plausible'
import { SeoApp } from 'src/components/Common/SeoApp'

import { mdxComponents } from 'src/components/Common/MdxComponents'

import 'src/styles/global.scss'

function MyApp({ Component, pageProps, router }: AppProps) {
  const queryClient = useMemo(() => new QueryClient(), [])

  // NOTE: We do manual parsing here, because router.query is randomly empty on the first few renders.
  const { pathname, query } = useMemo(() => parseUrl(router.asPath), [router.asPath])

  const initializeState = useCallback(
    ({ set }: MutableSnapshot) => {
      // Extract state of places from the URL query params
      const { region, continents, countries } = urlQueryToPlaces(query)

      // Set initial state
      if (pathname === '/per-country') {
        set(regionAtom, region)
        set(continentsAtom(region), continents)
        set(countriesAtom(region), countries)

        const params = { dataFlavor: ClustersDataFlavor.PerCountry, region }
        const clusters = urlQueryToClusters(query, params)
        set(clustersAtom(params), clusters)
      } else if (pathname === '/per-variant') {
        set(continentsAtom(undefined), continents)
        set(countriesAtom(undefined), countries)

        const params = { dataFlavor: ClustersDataFlavor.PerCluster, region }
        const clusters = urlQueryToClusters(query, params)
        set(clustersAtom(params), clusters)
      }
    },
    [pathname, query],
  )

  return (
    <RecoilRoot initializeState={initializeState}>
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
