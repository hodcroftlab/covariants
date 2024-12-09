import { DateTime, Interval } from 'luxon'
import paramsJson from 'src/../public/data/params.json'
import { dateStringToSeconds } from 'src/helpers/format'

export interface GlobalParams {
  min_date: string
  max_date: string
}

export function getParams(): GlobalParams {
  return paramsJson
}

const INVALID_PARAMS = 'Invalid date params in params.json or invalid split point chosen'

export const params = getParams()

export function getTimeDomain(): [number, number] {
  const minDate = dateStringToSeconds(params.min_date)
  const maxDate = dateStringToSeconds(params.max_date)
  if (Number.isNaN(minDate) || Number.isNaN(maxDate)) {
    throw new TypeError(INVALID_PARAMS)
  }
  return [minDate, maxDate]
}

export function getTicks() {
  const timeDomain = getTimeDomain()
  const start = DateTime.fromSeconds(timeDomain[0])
  const end = DateTime.fromSeconds(timeDomain[1])
  const interval = Interval.fromDateTimes(start.startOf('month'), end.endOf('month'))
  if (!interval.isValid) {
    throw new Error(INVALID_PARAMS)
  }

  const months = interval.splitBy({ months: 1 })
  if (months.length === 0 || months.some((i) => !i.isValid)) {
    throw new Error(INVALID_PARAMS)
  }
  const validMonths = months as Interval<true>[]

  return validMonths.map((d) => d.start.toSeconds())
}

export const timeDomain = getTimeDomain()
export const ticks = getTicks()
