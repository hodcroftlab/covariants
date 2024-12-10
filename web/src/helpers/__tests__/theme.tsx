import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { I18nextProvider } from 'react-i18next'
import { theme } from 'src/theme'
import i18n from 'src/i18n/i18n'

export const renderWithThemeAndTranslations = (component: React.JSX.Element) => {
  return render(
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </ThemeProvider>,
  )
}
