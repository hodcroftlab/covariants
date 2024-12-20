import { DateTime, Interval } from 'luxon'
import { z } from 'zod'
import { dateStringToSeconds } from 'src/helpers/format'
import { useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

export interface GlobalParams {
  min_date: string
  max_date: string
}

export type Ticks = number[]
export type TimeDomain = [number, number]

const globalParams = z.object({
  // eslint-disable-next-line camelcase
  min_date: z.string(),
  // eslint-disable-next-line camelcase
  max_date: z.string(),
})

export function useParams() {
  return useValidatedAxiosQuery<GlobalParams>('/data/params.json', globalParams)
}

const INVALID_PARAMS = 'Invalid date params in params.json or invalid split point chosen'

export function useTimeDomain(): TimeDomain {
  const { data: params } = useParams()
  const minDate = dateStringToSeconds(params.min_date)
  const maxDate = dateStringToSeconds(params.max_date)
  if (Number.isNaN(minDate) || Number.isNaN(maxDate)) {
    throw new TypeError(INVALID_PARAMS)
  }
  return [minDate, maxDate]
}

export function useTicks(): Ticks {
  const timeDomain = useTimeDomain()
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
