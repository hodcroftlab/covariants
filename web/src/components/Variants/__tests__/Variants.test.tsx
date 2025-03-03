import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { screen } from '@testing-library/react'
import React from 'react'
import { http, HttpResponse } from 'msw'
import { ErrorBoundary } from 'react-error-boundary'
import ResizeObserver from 'resize-observer-polyfill'
import { renderWithQueryClientAndRecoilRoot } from 'src/helpers/__tests__/providers'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import { PlotCard } from 'src/components/Variants/PlotCard'
import { ClusterDatum } from 'src/io/getClusters'

globalThis.ResizeObserver = ResizeObserver

describe('Variants', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => {
    server.resetHandlers()
    FETCHER.getQueryClient().clear()
  })
  describe('PlotCard', () => {
    const cluster: ClusterDatum = {
      altDisplayName: ['S.501Y.V1'],
      aquariaUrls: [
        {
          gene: 'S',
          url: 'https://aquaria.app/SARS-CoV-2/S?H69Del&V70Del&Y144Del&N501Y&A570D&D614G&P681H&T716I&S982A&D1118H',
        },
      ],
      buildName: '20I.Alpha.V1',
      col: '#D16666',
      displayName: '20I (Alpha, V1)',
      important: false,
      mutations: {
        nonsynonymous: [
          {
            gene: 'S',
            left: 'H',
            pos: 69,
            right: '-',
          },
        ],
        synonymous: [
          {
            left: 'C',
            pos: 241,
            right: 'T',
          },
        ],
      },
      nextstrainUrl: 'https://nextstrain.org/groups/neherlab/ncov/20I.Alpha.V1',
      oldBuildNames: ['S.501Y.V1'],
      snps: [23_063],
      type: 'variant',
    }

    test('does not trigger error boundary when backend call succeeds', async () => {
      // Act
      renderWithQueryClientAndRecoilRoot(
        <ErrorBoundary fallback={'Error boundary'}>
          <PlotCard cluster={cluster} />
        </ErrorBoundary>,
      )

      // Assert
      expect(
        await screen.findByText('Distribution of 20I (Alpha, V1) per country', undefined, { timeout: 3000 }),
      ).toBeDefined()
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
          <PlotCard cluster={cluster} />
        </ErrorBoundary>,
      )

      // Assert
      expect(await screen.findByText('Error boundary', undefined, { timeout: 3000 })).toBeDefined()
    })
  })
})
