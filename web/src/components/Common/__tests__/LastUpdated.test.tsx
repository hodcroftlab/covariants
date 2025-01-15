import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { screen } from '@testing-library/react'
import React from 'react'
import { http, HttpResponse } from 'msw'
import { ErrorBoundary } from 'react-error-boundary'
import { renderWithQueryClient } from 'src/helpers/__tests__/providers'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import { LastUpdated } from 'src/components/Common/LastUpdated'

describe('LastUpdated', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => {
    server.resetHandlers()
    FETCHER.getQueryClient().clear()
  })

  test('triggers error boundary when backend call fails', async () => {
    // Arrange
    server.use(
      http.get('/data/update.json', () => {
        return new HttpResponse(null, { status: 404 })
      }),
    )
    // Disable console output
    vi.spyOn(console, 'error').mockImplementation(() => null)

    // Act
    renderWithQueryClient(
      <ErrorBoundary fallback={'Error boundary'}>
        <LastUpdated />
      </ErrorBoundary>,
    )

    // Assert
    expect(await screen.findByText('Error boundary', undefined, { timeout: 3000 })).toBeDefined()
  })
})
