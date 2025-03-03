import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { http, HttpResponse } from 'msw'
import { ErrorBoundary } from 'react-error-boundary'
import { renderWithQueryClient, renderWithQueryClientAndRecoilRoot } from 'src/helpers/__tests__/providers'
import { SharedMutationsTable } from 'src/components/SharedMutations/SharedMutationsTable'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'
import { FETCHER } from 'src/hooks/useAxiosQuery'

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

  afterEach(() => {
    server.resetHandlers()
    FETCHER.getQueryClient().clear()
  })
  describe('SharedMutationsTable', () => {
    test('shared button toggles between shared by commonness and shared by position', async () => {
      // Arrange
      const { container } = renderWithQueryClientAndRecoilRoot(<SharedMutationsTable />)
      await waitFor(() => expect(screen.getByRole('table')).toBeDefined())
      const sharedByToggle = container.querySelector('#toggle-advanced-controls')
      if (!sharedByToggle) {
        throw new Error('Could not find sharedByToggle')
      }

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

      // Act
      renderWithQueryClient(
        <ErrorBoundary fallback={'Error boundary'}>
          <SharedMutationsTable />
        </ErrorBoundary>,
      )

      // Assert
      expect(await screen.findByText('Error boundary', undefined, { timeout: 3000 })).toBeDefined()
    })
  })
})
