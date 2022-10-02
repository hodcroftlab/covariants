import { DateTime, Interval } from 'luxon'
import paramsJson from 'src/../data/params.json'
import { dateStringToSeconds } from 'src/helpers/format'

export interface GlobalParams {
  min_date: string
  max_date: string
}

export function getParams(): GlobalParams {
  return paramsJson
}

export const params = getParams()

export function getTimeDomain(): [number, number] {
  const minDate = dateStringToSeconds(params.min_date)
  const maxDate = dateStringToSeconds(params.max_date)
  return [minDate, maxDate]
}

export function getTimeInterval(timeDomain = getTimeDomain()): Interval {
  const start = timeDomain[0]
  const end = timeDomain[1]
  return Interval.fromDateTimes(
    // prettier-ignore
    DateTime.fromSeconds(start).startOf('month'),
    DateTime.fromSeconds(end).endOf('month'),
  )
}

export function getWeeks(): number[] {
  return getTimeInterval()
    .splitBy({ weeks: 1 })
    .map((d) => d.start.toSeconds())
}

export function getTicks(timeDomain = getTimeDomain()) {
  return getTimeInterval(timeDomain)
    .splitBy({ months: 1 })
    .map((d) => d.start.toSeconds())
}

export const timeDomain = getTimeDomain()
export const ticks = getTicks()
