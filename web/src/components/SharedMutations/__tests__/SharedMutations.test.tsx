import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { screen, fireEvent, waitFor, renderHook } from '@testing-library/react'
import React, { Suspense } from 'react'
import { http, HttpResponse } from 'msw'
import { ErrorBoundary } from 'react-error-boundary'
import { RecoilRoot } from 'recoil'
import { renderWithQueryClientAndRecoilRoot } from 'src/helpers/__tests__/providers'
import { SharedMutationsTable } from 'src/components/SharedMutations/SharedMutationsTable'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import { fetchMutCompSelector } from 'src/state/MutationComparison'
import { useResetSelectorCache } from 'src/helpers/__tests__/useResetSelectorCache'

const getMutationElements = () => {
  return {
    // mutation text is spread across multiple elements, so we just use the numbers to find the elements
    sharedByPositionExample: screen.queryAllByText('19'),
    sharedByCommonnessExample: screen.queryAllByText('969'),
    individualExample: screen.queryAllByText('147'),
  }
}

describe('SharedMutations', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())
  describe('SharedMutationsTable', () => {
    beforeEach(() => {
      server.resetHandlers()
      FETCHER.getQueryClient().clear()
    })
    test('shared button toggles between shared by commonness and shared by position', async () => {
      // Arrange
      renderWithQueryClientAndRecoilRoot(
        <Suspense>
          <SharedMutationsTable />
        </Suspense>,
      )
      await waitFor(() => expect(screen.getByRole('table')).toBeDefined())
      const sharedByToggle = screen.getByRole('checkbox')

      let { sharedByPositionExample, sharedByCommonnessExample, individualExample } = getMutationElements()
      expect(sharedByPositionExample.length).toBeGreaterThanOrEqual(1)
      expect(individualExample.length).toBeGreaterThanOrEqual(1)
      expect(sharedByCommonnessExample.length).toEqual(0)

      // Act
      fireEvent.click(sharedByToggle)

      // Assert
      ;({ sharedByPositionExample, sharedByCommonnessExample, individualExample } = getMutationElements())

      expect(sharedByPositionExample.length).toEqual(0)
      expect(individualExample.length).toBeGreaterThanOrEqual(1)
      expect(sharedByCommonnessExample.length).toBeGreaterThanOrEqual(1)

      // Act
      fireEvent.click(sharedByToggle)

      // Assert
      ;({ sharedByPositionExample, sharedByCommonnessExample, individualExample } = getMutationElements())

      expect(sharedByPositionExample.length).toBeGreaterThanOrEqual(1)
      expect(individualExample.length).toBeGreaterThanOrEqual(1)
      expect(sharedByCommonnessExample.length).toEqual(0)
    })

    test('triggers error boundary when backend call fails', async () => {
      // Arrange
      server.use(
        http.get('/data/mutationComparison.json', () => {
          return new HttpResponse(null, { status: 404 })
        }),
      )
      // Disable console output
      vi.spyOn(console, 'error').mockImplementation(() => null)

      // reset selector cache
      renderHook(() => useResetSelectorCache(fetchMutCompSelector), { wrapper: RecoilRoot })

      // Act
      renderWithQueryClientAndRecoilRoot(
        <ErrorBoundary fallback={'Error boundary'}>
          <Suspense>
            <SharedMutationsTable />
          </Suspense>
        </ErrorBoundary>,
      )

      // Assert
      expect(await screen.findByText('Error boundary', undefined, { timeout: 3000 })).toBeDefined()
    })
  })
})
