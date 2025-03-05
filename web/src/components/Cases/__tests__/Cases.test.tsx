import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { renderHook, screen } from '@testing-library/react'
import React, { Suspense } from 'react'
import { http, HttpResponse } from 'msw'
import { ErrorBoundary } from 'react-error-boundary'
import ResizeObserver from 'resize-observer-polyfill'
import { RecoilRoot } from 'recoil'
import { renderWithQueryClientAndRecoilRoot } from 'src/helpers/__tests__/providers'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import { CasesComponents } from 'src/components/Cases/CasesComponents'
import { fetchParamsSelector } from 'src/state/Params'
import { useResetSelectorCache } from 'src/helpers/__tests__/useResetSelectorCache'

globalThis.ResizeObserver = ResizeObserver

describe('Cases', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => {
    server.resetHandlers()
    FETCHER.getQueryClient().clear()
  })
  describe('CasesComponents', () => {
    const clusters = [
      {
        cluster: '20A.EU2',
        enabled: true,
      },
    ]
    const countries = [
      {
        country: 'USA',
        enabled: true,
      },
    ]

    test('does not trigger error boundary when backend call succeeds', async () => {
      // Act
      renderWithQueryClientAndRecoilRoot(
        <ErrorBoundary fallback={'Error boundary'}>
          <Suspense>
            <CasesComponents clusters={clusters} countries={countries} />
          </Suspense>
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

      // reset selector cache
      renderHook(() => useResetSelectorCache(fetchParamsSelector), { wrapper: RecoilRoot })

      // Act
      renderWithQueryClientAndRecoilRoot(
        <ErrorBoundary fallback={'Error boundary'}>
          <CasesComponents clusters={clusters} countries={countries} />
        </ErrorBoundary>,
      )

      // Assert
      expect(await screen.findByText('Error boundary', undefined, { timeout: 3000 })).toBeDefined()
    })
  })
})
