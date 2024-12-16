import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { renderWithQueryClient } from 'src/helpers/__tests__/providers'
import { SharedMutations } from 'src/components/SharedMutations/SharedMutations'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'

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

  afterEach(() => server.resetHandlers())
  describe('shared button', () => {
    test('toggles between shared by commonness and shared by position', async () => {
      // Arrange
      const { container } = renderWithQueryClient(<SharedMutations />)
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
  })
})
