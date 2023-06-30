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

export function getDateRange(): { start: number; end: number } {
  const minDate = dateStringToSeconds(params.min_date)
  const maxDate = dateStringToSeconds(params.max_date)
  return { start: minDate, end: maxDate }
}

function getWeeks(): number[] {
  const dateRange = getDateRange()
  return Interval.fromDateTimes(
    // prettier-ignore
    DateTime.fromSeconds(dateRange.start),
    DateTime.fromSeconds(dateRange.end),
  )
    .splitBy({ weeks: 2 })
    .map((d) => d.start.toSeconds())
}

export const weeks = getWeeks()

function getTimeDomain(): [number, number] {
  return [weeks[0], weeks[weeks.length - 1]]
}

export const timeDomain = getTimeDomain()

export function getTicks(domain = timeDomain) {
  const start = domain[0]
  const end = domain[1]
  return Interval.fromDateTimes(
    // prettier-ignore
    DateTime.fromSeconds(start).startOf('month'),
    DateTime.fromSeconds(end).endOf('month'),
  )
    .splitBy({ months: 1 })
    .map((d) => d.start.toSeconds())
}

export const ticks = getTicks()
