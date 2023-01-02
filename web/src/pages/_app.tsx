import 'reflect-metadata'
import 'resize-observer-polyfill/dist/ResizeObserver.global'

import 'css.escape'

import dynamic from 'next/dynamic'
import React, { useCallback, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import type { AppProps } from 'next/app'

import { clustersAtom, ClustersDataFlavor, urlQueryToClusters } from 'src/state/Clusters'
import { clustersCasesAtom, urlQueryToClustersCases } from 'src/state/ClustersForCaseData'
import { continentsAtom, countriesAtom, regionAtom, urlQueryToPlaces } from 'src/state/Places'
import { continentsCasesAtom, countriesCasesAtom, urlQueryToPlacesCases } from 'src/state/PlacesForCaseData'
import { dateFilterAtom, urlQueryToDateFilter } from 'src/state/DateFilter'

import { parseUrl } from 'src/helpers/parseUrl'
import { theme } from 'src/theme'
import { DOMAIN_STRIPPED } from 'src/constants'
import { Plausible } from 'src/components/Common/Plausible'
import { SeoApp } from 'src/components/Common/SeoApp'
import { getMdxComponents } from 'src/components/Common/MdxComponents'
import { loadPolyfills } from 'src/polyfills'

import 'src/styles/global.scss'

function MyApp({ Component, pageProps, router }: AppProps) {
  const queryClient = useMemo(() => new QueryClient(), [])

  // NOTE: We do manual parsing here, because router.query is randomly empty on the first few renders.
  const { pathname, query } = useMemo(() => parseUrl(router.asPath), [router.asPath])

  const initializeState = useCallback(
    ({ set }: MutableSnapshot) => {
      // Set initial state
      switch (pathname) {
        case '/per-country': {
          const { region, continents, countries } = urlQueryToPlaces(query)

          set(regionAtom, region)
          set(continentsAtom(region), continents)
          set(countriesAtom(region), countries)

          const params = { dataFlavor: ClustersDataFlavor.PerCountry, region }
          const clusters = urlQueryToClusters(query, params)
          set(clustersAtom(params), clusters)

          const dateFilter = urlQueryToDateFilter(query)
          set(dateFilterAtom, dateFilter)

          break
        }
        case '/per-variant': {
          const { region, continents, countries } = urlQueryToPlaces(query)

          set(continentsAtom(undefined), continents)
          set(countriesAtom(undefined), countries)

          const params = { dataFlavor: ClustersDataFlavor.PerCluster, region }
          const clusters = urlQueryToClusters(query, params)
          set(clustersAtom(params), clusters)

          break
        }
        case '/cases': {
          const { continents, countries } = urlQueryToPlacesCases(query)

          set(continentsCasesAtom, continents)
          set(countriesCasesAtom, countries)

          const clusters = urlQueryToClustersCases(query)
          set(clustersCasesAtom, clusters)

          break
        }
        default:
          break
      }
    },
    [pathname, query],
  )

  return (
    <RecoilRoot initializeState={initializeState}>
      <ThemeProvider theme={theme}>
        <MDXProvider components={getMdxComponents}>
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

async function run() {
  await loadPolyfills()
  return MyApp
}

export default dynamic(() => run(), { ssr: false })
