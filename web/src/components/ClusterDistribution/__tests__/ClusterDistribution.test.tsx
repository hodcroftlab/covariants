import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { screen } from '@testing-library/react'
import React from 'react'
import { http, HttpResponse } from 'msw'
import { ErrorBoundary } from 'react-error-boundary'
import ResizeObserver from 'resize-observer-polyfill'
import { renderWithQueryClientAndRecoilRoot } from 'src/helpers/__tests__/providers'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import { ClusterDistributionComponents } from 'src/components/ClusterDistribution/ClusterDistributionComponents'

globalThis.ResizeObserver = ResizeObserver

describe('ClusterDistribution', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => {
    server.resetHandlers()
    FETCHER.getQueryClient().clear()
  })
  describe('ClusterDistributionComponents', () => {
    const clustersSelected = [
      {
        cluster: '20I (Alpha, V1)',
        enabled: true,
      },
    ]

    const countriesSelected = [
      {
        country: 'Argentina',
        enabled: true,
      },
    ]

    test('does not trigger error boundary when backend call succeeds', async () => {
      // Act
      renderWithQueryClientAndRecoilRoot(
        <ErrorBoundary fallback={'Error boundary'}>
          <ClusterDistributionComponents clustersSelected={clustersSelected} countriesSelected={countriesSelected} />
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
      renderWithQueryClientAndRecoilRoot(
        <ErrorBoundary fallback={'Error boundary'}>
          <ClusterDistributionComponents clustersSelected={clustersSelected} countriesSelected={countriesSelected} />
        </ErrorBoundary>,
      )

      // Assert
      expect(await screen.findByText('Error boundary', undefined, { timeout: 3000 })).toBeDefined()
    })
  })
})
