import 'reflect-metadata'
import 'resize-observer-polyfill/dist/ResizeObserver.global'

import 'css.escape'

import dynamic from 'next/dynamic'
import React, { ReactElement, ReactNode, Suspense, useCallback, useEffect, useMemo } from 'react'
import { RecoilEnv, RecoilRoot, useRecoilCallback } from 'recoil'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { I18nextProvider } from 'react-i18next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import { NextPage } from 'next'
import { LOADING } from 'src/components/Loading/Loading'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import i18n, { changeLocale, getLocaleWithKey } from 'src/i18n/i18n'
import { theme } from 'src/theme'
import { DOMAIN_STRIPPED } from 'src/constants'
import { Plausible } from 'src/components/Common/Plausible'
import { SeoApp } from 'src/components/Common/SeoApp'
import { getMdxComponents } from 'src/components/Common/MdxComponents'
import { loadPolyfills } from 'src/polyfills'
import { localeAtom } from 'src/state/locale.state'

import 'src/styles/global.scss'

export function RecoilStateInitializer() {
  const initialize = useRecoilCallback(({ set, snapshot }) => () => {
    const snapShotRelease = snapshot.retain()
    const { getPromise } = snapshot

    void Promise.resolve()
      // eslint-disable-next-line promise/always-return
      .then(async () => {
        // const localeKeyFromUrl = getQueryParamMaybe(urlQuery, 'lang')
        const localeKey = await getPromise(localeAtom)
        const locale = getLocaleWithKey(localeKey)
        await changeLocale(i18n, locale.key)
        set(localeAtom, locale.key)
        // void setLocaleInUrl(localeKey) // eslint-disable-line no-void
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

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const initializeState = useCallback(() => {}, [])

  // Use shared QueryClient for queries inside and outside of React components
  const queryClient = useMemo(() => FETCHER.getQueryClient(), [])
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <RecoilRoot initializeState={initializeState}>
      <RecoilStateInitializer />
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <MDXProvider components={getMdxComponents}>
            <Plausible domain={DOMAIN_STRIPPED} />
            <SeoApp />
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={LOADING}>{getLayout(<Component {...pageProps} />)}</Suspense>
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
