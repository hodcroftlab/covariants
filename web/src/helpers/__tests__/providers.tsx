import React, { ReactNode, Suspense } from 'react'
import { render, renderHook } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { I18nextProvider } from 'react-i18next'
import { QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { theme } from 'src/theme'
import i18n from 'src/i18n/i18n'
import { FETCHER } from 'src/hooks/useAxiosQuery'

export const renderWithThemeAndTranslations = (component: React.JSX.Element) => {
  return render(
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </ThemeProvider>,
  )
}

export const renderWithThemeAndRecoilRoot = (component: React.JSX.Element) => {
  return render(
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
      </ThemeProvider>
    </RecoilRoot>,
  )
}

export const renderWithQueryClient = (component: React.JSX.Element) => {
  return render(
    <QueryClientProvider client={FETCHER.getQueryClient()}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  )
}

export const renderWithQueryClientAndRecoilRoot = (component: React.JSX.Element) => {
  return render(
    <RecoilRoot>
      <QueryClientProvider client={FETCHER.getQueryClient()}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>,
  )
}

export const RecoilRootAndQueryClientWrapper = (content: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={FETCHER.getQueryClient()}>
        <Suspense>{content.children}</Suspense>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export async function renderHookWithTimeout<T>(
  useMyCustomHook: () => T,
  wrapper: (content: { children: React.ReactNode }) => React.JSX.Element,
  timeout = 100,
) {
  const { result } = renderHook(() => useMyCustomHook(), {
    wrapper: wrapper,
  })
  await new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
  return result.current
}
