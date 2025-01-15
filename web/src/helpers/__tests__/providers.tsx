import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { I18nextProvider } from 'react-i18next'
import { QueryClientProvider } from '@tanstack/react-query'
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

export const renderWithQueryClient = (component: React.JSX.Element) => {
  return render(
    <QueryClientProvider client={FETCHER.getQueryClient()}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  )
}
