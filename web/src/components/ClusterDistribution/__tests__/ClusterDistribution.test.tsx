import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { screen } from '@testing-library/react'
import React from 'react'
import { http, HttpResponse } from 'msw'
import { ErrorBoundary } from 'react-error-boundary'
import ResizeObserver from 'resize-observer-polyfill'
import { renderWithQueryClient } from 'src/helpers/__tests__/providers'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import { ClusterDistributionComponents } from 'src/components/ClusterDistribution/ClusterDistributionComponents'
import { ClusterDistribution } from 'src/io/getPerClusterData'

globalThis.ResizeObserver = ResizeObserver

describe('ClusterDistribution', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => {
    server.resetHandlers()
    FETCHER.getQueryClient().clear()
  })
  describe('ClusterDistributionComponents', () => {
    const withCountriesFiltered: ClusterDistribution[] = [
      {
        cluster: '20I (Alpha, V1)',
        distribution: [
          {
            week: '2020-04-27',
            frequencies: { Argentina: 0.0 },
            interp: { Argentina: false },
            orig: { Argentina: true },
          },
        ],
      },
    ]
    const clusterBuildNames = new Map()
    const enabledCountries = ['Argentina']

    test('does not trigger error boundary when backend call succeeds', async () => {
      // Act
      renderWithQueryClient(
        <ErrorBoundary fallback={'Error boundary'}>
          <ClusterDistributionComponents
            withCountriesFiltered={withCountriesFiltered}
            clusterBuildNames={clusterBuildNames}
            enabledCountries={enabledCountries}
          />
        </ErrorBoundary>,
      )

      // Assert
      expect(await screen.findByText('20I (Alpha, V1)', undefined, { timeout: 3000 })).toBeDefined()
    })

    test('triggers error boundary when backend call fails', async () => {
      // Arrange
      server.use(
        http.get('/data/params.json', () => {
          return new HttpResponse(null, { status: 404 })
        }),
      )
      // Disable console output
      vi.spyOn(console, 'error').mockImplementation(() => null)

      // Act
      renderWithQueryClient(
        <ErrorBoundary fallback={'Error boundary'}>
          <ClusterDistributionComponents
            withCountriesFiltered={withCountriesFiltered}
            clusterBuildNames={clusterBuildNames}
            enabledCountries={enabledCountries}
          />
        </ErrorBoundary>,
      )

      // Assert
      expect(await screen.findByText('Error boundary', undefined, { timeout: 3000 })).toBeDefined()
    })
  })
})
