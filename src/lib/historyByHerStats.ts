export type HistoryByHerStats = {
  bookmarks: number
  educationalInstitutions: number
  responses: number
  updatedAt: string | null
  live: boolean
  /** Why live is false / how data was loaded — safe for debugging */
  reason?: string
}

export const EMPTY_HISTORY_BY_HER_STATS: HistoryByHerStats = {
  bookmarks: 0,
  educationalInstitutions: 0,
  responses: 0,
  updatedAt: null,
  live: false,
  reason: 'missing_HISTORY_BY_HER_STATS_URL',
}
