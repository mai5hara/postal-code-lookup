import { describe, it, expect } from 'vitest'
import { chunkHistory } from './chunkHistory'

const makeHistory = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: String(i),
    addresses: [],
  }))

describe('chunkHistory', () => {
  it.each([
    { count: 7, pageSizes: [3, 3, 1] },
    { count: 6, pageSizes: [3, 3] },
    { count: 0, pageSizes: [] },
  ])(
    '$count 件を 3 件ずつに分けると、各ページの件数が $pageSizes になる',
    ({ count, pageSizes }) => {
      const history = makeHistory(count)
      const result = chunkHistory(history, 3)

      expect(result.map((page) => page.length)).toEqual(pageSizes)
      // 順番を保ったまま、すべての履歴が含まれている
      expect(result.flat()).toEqual(history)
    },
  )
})
