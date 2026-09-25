export type HistoryByHerStats = {
  bookmarks: number
  educationalInstitutions: number
  responses: number
  updatedAt: string | null
  live: boolean
}

export const EMPTY_HISTORY_BY_HER_STATS: HistoryByHerStats = {
  bookmarks: 0,
  educationalInstitutions: 0,
  responses: 0,
  updatedAt: null,
  live: false,
}
