import type { SearchHistory } from '../types/address'

export const chunkHistory = (
  history: SearchHistory[],
  size: number,
): SearchHistory[][] => {
  const chunkedHistory: SearchHistory[][] = []

  for (let i = 0; i < history.length; i += size) {
    chunkedHistory.push(history.slice(i, i + size))
  }

  return chunkedHistory
}
