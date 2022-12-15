import 'reflect-metadata'
import 'resize-observer-polyfill/dist/ResizeObserver.global'

import 'css.escape'

import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MutableSnapshot, RecoilRoot, useRecoilCallback } from 'recoil'
import { ReactQueryDevtools } from 'react-query/devtools'
import { I18nextProvider } from 'react-i18next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { parseUrl } from 'src/helpers/parseUrl'
import { clustersAtom, ClustersDataFlavor, urlQueryToClusters } from 'src/state/Clusters'
import { clustersCasesAtom, urlQueryToClustersCases } from 'src/state/ClustersForCaseData'
import { continentsAtom, countriesAtom, regionAtom, urlQueryToPlaces } from 'src/state/Places'
import { continentsCasesAtom, countriesCasesAtom, urlQueryToPlacesCases } from 'src/state/PlacesForCaseData'
import { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import i18n, { changeLocale, getLocaleWithKey } from 'src/i18n/i18n'
import { theme } from 'src/theme'
import { DOMAIN_STRIPPED } from 'src/constants'
import { Plausible } from 'src/components/Common/Plausible'
import { SeoApp } from 'src/components/Common/SeoApp'
import { getMdxComponents } from 'src/components/Common/MdxComponents'
import { loadPolyfills } from 'src/polyfills'
import { localeAtom, setLocaleInUrl } from 'src/state/locale.state'
import { getQueryParamMaybe } from 'src/io/getQueryParamMaybe'

import 'src/styles/global.scss'

export function RecoilStateInitializer() {
  const router = useRouter()

  // NOTE: Do manual parsing, because router.query is randomly empty on the first few renders and on repeated renders.
  // This is important, because various states depend on query, and when it changes back and forth,
  // the state also changes unexpectedly.
  const { query: urlQuery } = useMemo(() => parseUrl(router.asPath), [router.asPath])

  const initialize = useRecoilCallback(({ set, snapshot }) => () => {
    const snapShotRelease = snapshot.retain()
    const { getPromise } = snapshot

    // eslint-disable-next-line no-void
    void Promise.resolve()
      .then(async () => {
        // eslint-disable-next-line promise/always-return
        const localeKey = getQueryParamMaybe(urlQuery, 'lang') ?? (await getPromise(localeAtom))
        const locale = getLocaleWithKey(localeKey)
        await changeLocale(i18n, locale.key)
        set(localeAtom, locale.key)
        void setLocaleInUrl(localeKey) // eslint-disable-line no-void
      })
      .finally(() => {
        snapShotRelease()
      })
  })

  useEffect(() => {
    initialize()
  })

  return null
}

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
      <RecoilStateInitializer />
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <MDXProvider components={getMdxComponents}>
            <Plausible domain={DOMAIN_STRIPPED} />
            <SeoApp />
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </MDXProvider>
        </I18nextProvider>
      </ThemeProvider>
    </RecoilRoot>
  )
}

async function run() {
  await loadPolyfills()
  return MyApp
}

export default dynamic(() => run(), { ssr: false })
