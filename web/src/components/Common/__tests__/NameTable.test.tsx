import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { screen } from '@testing-library/react'
import React from 'react'
import { http, HttpResponse } from 'msw'
import { renderWithQueryClient } from 'src/helpers/__tests__/providers'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import { NameTable } from 'src/components/Common/NameTable'

describe('NameTable', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => {
    server.resetHandlers()
    FETCHER.getQueryClient().clear()
  })

  test('triggers error boundary when backend call fails', async () => {
    // Arrange
    server.use(
      http.get('/data/nameTable.json', () => {
        return new HttpResponse(null, { status: 404 })
      }),
    )
    // Disable console output
    vi.spyOn(console, 'error').mockImplementation(() => null)

    // Act
    renderWithQueryClient(<NameTable />)

    // Assert
    expect(await screen.findByText('Unable to fetch data', undefined, { timeout: 3000 })).toBeDefined()
  })
})
