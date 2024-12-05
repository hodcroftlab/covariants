import { parseNucleotideMutation } from 'src/components/Common/parseNucleotideMutation'
import { describe, it, expect } from 'vitest'

describe('parseNucleotideMutation', () => {
  it('should parse left, position, right', () => {
    expect(parseNucleotideMutation('A123C')).toStrictEqual({ left: 'A', pos: 123, right: 'C' })
  })

  it('should parse position', () => {
    expect(parseNucleotideMutation('123')).toStrictEqual({ left: undefined, pos: 123, right: undefined })
  })

  it('should parse position, right', () => {
    expect(parseNucleotideMutation('123C')).toStrictEqual({ left: undefined, pos: 123, right: 'C' })
  })

  it('should parse left, position', () => {
    expect(parseNucleotideMutation('A123')).toStrictEqual({ left: 'A', pos: 123, right: undefined })
  })

  it('should parse different left, position, right', () => {
    expect(parseNucleotideMutation('T43516N')).toStrictEqual({ left: 'T', pos: 43_516, right: 'N' })
  })

  it('should parse left "-", position, right', () => {
    expect(parseNucleotideMutation('-123C')).toStrictEqual({ left: '-', pos: 123, right: 'C' })
  })

  it('should parse left, position, right "-"', () => {
    expect(parseNucleotideMutation('A123-')).toStrictEqual({ left: 'A', pos: 123, right: '-' })
  })

  it('should parse left "-", position and right "-"', () => {
    expect(parseNucleotideMutation('-123-')).toStrictEqual({ left: '-', pos: 123, right: '-' })
  })

  it('should reject empty', () => {
    expect(parseNucleotideMutation('')).toBeUndefined()
  })

  it('should reject non-mutation-like input', () => {
    expect(parseNucleotideMutation('hello!')).toBeUndefined()
  })

  it('should reject when no position', () => {
    expect(parseNucleotideMutation('AC')).toBeUndefined()
  })

  it('should reject "-"', () => {
    expect(parseNucleotideMutation('-')).toBeUndefined()
  })

  it('should reject one letter', () => {
    expect(parseNucleotideMutation('A')).toBeUndefined()
  })

  it('should reject letters in position', () => {
    expect(parseNucleotideMutation('G1X3T')).toBeUndefined()
  })
})
