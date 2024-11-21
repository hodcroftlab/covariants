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

export const params = getParams()

export function getTimeDomain(): [number, number] {
  const minDate = dateStringToSeconds(params.min_date)
  const maxDate = dateStringToSeconds(params.max_date)
  return [minDate, maxDate]
}

export function getTicks() {
  const timeDomain = getTimeDomain()
  const start = timeDomain[0]
  const end = timeDomain[1]
  return Interval.fromDateTimes(
    // prettier-ignore
    DateTime.fromSeconds(start).startOf('month'),
    DateTime.fromSeconds(end).endOf('month'),
  )
    .splitBy({ months: 1 })
    // TODO: remove this ts-ignore, only here to get intermediate build off the ground
    // @ts-ignore
    .map((d) => d.start.toSeconds())
}

export const timeDomain = getTimeDomain()
export const ticks = getTicks()
