import { describe, it, expect } from 'vitest'
import {
  validatePostalCode,
  INVALID_CHARACTER_TYPE_MESSAGE,
  INVALID_LENGTH_OR_FORMAT_MESSAGE,
} from './validatePostalCode'

describe('validatePostalCode', () => {
  it.each([
    ['1000001', null],
    ['100-0001', null],
    ['１０００００１', INVALID_CHARACTER_TYPE_MESSAGE],
    ['a1234567', INVALID_CHARACTER_TYPE_MESSAGE],
    ['12345678', INVALID_LENGTH_OR_FORMAT_MESSAGE],
    ['-1000001', INVALID_LENGTH_OR_FORMAT_MESSAGE],
  ])('%s のとき %s を返す', (postalCode, expected) => {
    const result = validatePostalCode(postalCode)
    expect(result).toBe(expected)
  })
})
