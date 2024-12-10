/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { ClusterButtonGroup } from '../ClusterButtonGroup'
import { ClusterDatum } from 'src/io/getClusters'
import { renderWithThemeAndTranslations } from 'src/helpers/__tests__/theme'

describe('ClusterButtonGroup', () => {
  describe('show more / show less button', () => {
    test('toggles unimportant clusters', () => {
      // Arrange
      const importantClusters: ClusterDatum[] = [
        {
          build_name: 'foo',
          col: 'bla',
          display_name: 'foo',
          snps: [1, 2, 3],
          important: true,
        },
        {
          build_name: 'bar',
          col: 'bla',
          display_name: 'bar',
          snps: [1, 2, 3],
          important: true,
        },
        {
          build_name: 'badum',
          col: 'bla',
          display_name: 'badum',
          snps: [1, 2, 3],
          important: true,
        },
      ]
      const unimportantClusters: ClusterDatum[] = [
        {
          build_name: 'baz',
          col: 'bla',
          display_name: 'baz',
          snps: [1, 2, 3],
          important: false,
        },
        {
          build_name: 'bun',
          col: 'bla',
          display_name: 'bun',
          snps: [1, 2, 3],
        },
      ]
      const clusters = importantClusters.concat(unimportantClusters)

      // Assert
      renderWithThemeAndTranslations(<ClusterButtonGroup clusterGroup={clusters} />)
      let visibleClusters = screen.getAllByRole('link')
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
