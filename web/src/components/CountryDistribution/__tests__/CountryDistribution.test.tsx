import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { screen } from '@testing-library/react'
import React from 'react'
import { http, HttpResponse } from 'msw'
import { ErrorBoundary } from 'react-error-boundary'
import ResizeObserver from 'resize-observer-polyfill'
import { renderWithQueryClient } from 'src/helpers/__tests__/providers'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import { CountryDistributionComponents } from 'src/components/CountryDistribution/CountryDistributionComponents'
import { CountryDistribution } from 'src/io/getPerCountryData'

globalThis.ResizeObserver = ResizeObserver

describe('CountryDistribution', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => {
    server.resetHandlers()
    FETCHER.getQueryClient().clear()
  })
  describe('CountryDistributionComponents', () => {
    const withClustersFiltered: CountryDistribution[] = [
      {
        country: 'USA',
        distribution: [
          {
            // eslint-disable-next-line camelcase
            total_sequences: 1114,
            week: '2020-04-27',
            // eslint-disable-next-line camelcase
            cluster_counts: {
              '20A.EU2': 0,
            },
          },
        ],
      },
    ]
    const enabledClusters = ['20A.EU2']

    test('does not trigger error boundary when backend call succeeds', async () => {
      // Act
      renderWithQueryClient(
        <ErrorBoundary fallback={'Error boundary'}>
          <CountryDistributionComponents
            withClustersFiltered={withClustersFiltered}
            enabledClusters={enabledClusters}
          />
        </ErrorBoundary>,
      )

      // Assert
      expect(await screen.findByText('USA', undefined, { timeout: 3000 })).toBeDefined()
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
          <CountryDistributionComponents
            withClustersFiltered={withClustersFiltered}
            enabledClusters={enabledClusters}
          />
        </ErrorBoundary>,
      )

      // Assert
      expect(await screen.findByText('Error boundary', undefined, { timeout: 3000 })).toBeDefined()
    })
  })
})
