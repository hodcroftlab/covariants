import { describe, it, expect } from 'vitest'
import { parseAminoacidMutation } from 'src/components/Common/parseAminoacidMutation'

describe('parseAminoacidMutation', () => {
  it('should parse gene, ref, position, right', () => {
    expect(parseAminoacidMutation('Gene1:V123S')).toStrictEqual({ gene: 'Gene1', left: 'V', pos: 123, right: 'S' })
  })

  it('should parse different gene, ref, position, right', () => {
    expect(parseAminoacidMutation('ORF1a:T2153I')).toStrictEqual({
      gene: 'ORF1a',
      left: 'T',
      pos: 2153,
      right: 'I',
    })
  })

  it('should parse position', () => {
    expect(parseAminoacidMutation('123')).toStrictEqual({
      gene: undefined,
      left: undefined,
      pos: 123,
      right: undefined,
    })
  })

  it('should parse gene, position, right', () => {
    expect(parseAminoacidMutation('S:123V')).toStrictEqual({
      gene: 'S',
      left: undefined,
      pos: 123,
      right: 'V',
    })
  })

  it('should parse position, right', () => {
    expect(parseAminoacidMutation('123V')).toStrictEqual({
      gene: undefined,
      left: undefined,
      pos: 123,
      right: 'V',
    })
  })

  it('should parse gene, left, position', () => {
    expect(parseAminoacidMutation('S:V123')).toStrictEqual({
      gene: 'S',
      left: 'V',
      pos: 123,
      right: undefined,
    })
  })

  it('should parse left, position', () => {
    expect(parseAminoacidMutation('V123')).toStrictEqual({
      gene: undefined,
      left: 'V',
      pos: 123,
      right: undefined,
    })
  })

  it('should reject one letter', () => {
    expect(parseAminoacidMutation('V')).toBeUndefined()
  })

  it('should reject multiple letters', () => {
    expect(parseAminoacidMutation(':VS')).toBeUndefined()
  })

  it('should reject empty input', () => {
    expect(parseAminoacidMutation('')).toBeUndefined()
  })

  it('should reject non-mutation-like input', () => {
    expect(parseAminoacidMutation('hello!')).toBeUndefined()
  })

  it('should reject letters in position', () => {
    expect(parseAminoacidMutation(':G1X3T')).toBeUndefined()
  })
})
