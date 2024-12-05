import { describe, it, expect } from 'vitest'
import { parseVariant } from 'src/components/Common/parseVariant'

describe('parseVariant', () => {
  it('should accept "20A.EU2"', async () => {
    expect(parseVariant('20A.EU2')).toEqual({
      parent: '20A',
      parentDelimiter: undefined,
      gene: undefined,
      left: undefined,
      pos: undefined,
      right: undefined,
      version: '.EU2',
    })
  })

  it('should accept "20E (EU1)"', async () => {
    expect(parseVariant('20E (EU1)')).toEqual({
      parent: '20E',
      parentDelimiter: undefined,
      gene: undefined,
      left: undefined,
      pos: undefined,
      right: undefined,
      version: ' (EU1)',
    })
  })

  it('should accept "20I/501Y.V1"', async () => {
    expect(parseVariant('20I/501Y.V1')).toEqual({
      parent: '20I',
      parentDelimiter: '/',
      gene: undefined,
      left: undefined,
      pos: 501,
      right: 'Y',
      version: '.V1',
    })
  })

  it('should accept "20C/S:452R"', async () => {
    expect(parseVariant('20C/S:452R')).toEqual({
      parent: '20C',
      parentDelimiter: '/',
      gene: 'S',
      left: undefined,
      pos: 452,
      right: 'R',
      version: undefined,
    })
  })
})
