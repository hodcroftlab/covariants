import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { ClusterButtonGroup } from '../ClusterButtonGroup'
import { ClusterDatum } from 'src/io/getClusters'
import { renderWithThemeAndRecoilRoot } from 'src/helpers/__tests__/providers'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'

describe('ClusterButtonGroup', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())
  describe('show more / show less button', () => {
    test('toggles unimportant clusters', async () => {
      // Arrange
      const importantClusters: ClusterDatum[] = [
        {
          buildName: 'foo',
          col: 'bla',
          displayName: 'foo',
          snps: [1, 2, 3],
          important: true,
        },
        {
          buildName: 'bar',
          col: 'bla',
          displayName: 'bar',
          snps: [1, 2, 3],
          important: true,
        },
        {
          buildName: 'badum',
          col: 'bla',
          displayName: 'badum',
          snps: [1, 2, 3],
          important: true,
        },
      ]
      const unimportantClusters: ClusterDatum[] = [
        {
          buildName: 'baz',
          col: 'bla',
          displayName: 'baz',
          snps: [1, 2, 3],
          important: false,
        },
        {
          buildName: 'bun',
          col: 'bla',
          displayName: 'bun',
          snps: [1, 2, 3],
        },
      ]
      const clusters = importantClusters.concat(unimportantClusters)

      // Assert
      renderWithThemeAndRecoilRoot(<ClusterButtonGroup clusterGroup={clusters} />)
      let visibleClusters = await screen.findAllByRole('link')
      expect(visibleClusters.length).toEqual(importantClusters.length)

      // Act
      fireEvent.click(screen.getByText('Show more'))

      // Assert
      visibleClusters = screen.getAllByRole('link')
      expect(visibleClusters.length).toEqual(clusters.length)

      // Act
      fireEvent.click(screen.getByText('Show less'))

      // Assert
      visibleClusters = screen.getAllByRole('link')
      expect(visibleClusters.length).toEqual(importantClusters.length)
    })
  })
})
