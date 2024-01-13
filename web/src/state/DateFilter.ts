import { atom } from 'recoil'
import { DateTime } from 'luxon'
import { ParsedUrlQuery } from 'querystring'
import Router from 'next/router'

import { parseUrl } from 'src/helpers/parseUrl'
import { setUrlQuery } from 'src/helpers/urlQuery'

export type DateFilter = [number, number] | null

export function urlQueryToDateFilter(query: ParsedUrlQuery): DateFilter {
  if (query.fromDate && !Array.isArray(query.fromDate) && query.toDate && !Array.isArray(query.toDate)) {
    const minDate = DateTime.fromISO(query.fromDate)
    const maxDate = DateTime.fromISO(query.toDate)
    return [minDate.toSeconds(), maxDate.toSeconds()]
  }
  return null
}

export const dateFilterAtom = atom<DateFilter>({
  key: 'DateFilter',
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((filter) => {
        const [minDate, maxDate] = filter || []
        const { query } = parseUrl(Router.asPath)

        // const query: Record<string, string> = {}
        if (minDate) {
          query.fromDate = DateTime.fromSeconds(minDate).toISODate()
        } else {
          delete query.fromDate
        }
        if (maxDate) {
          query.toDate = DateTime.fromSeconds(maxDate).toISODate()
        } else {
          delete query.toDate
        }
        // eslint-disable-next-line no-void
        void setUrlQuery(query)
      })
    },
  ],
})
