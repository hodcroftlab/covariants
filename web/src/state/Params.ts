import { atom, selector } from 'recoil'
import { DateTime, Interval } from 'luxon'
import { fetchParams, GlobalParams } from 'src/io/getParams'
import { dateStringToSeconds } from 'src/helpers/format'

export const fetchParamsSelector = selector<GlobalParams>({
  key: 'fetchParams',
  get: fetchParams,
})

const paramsAtom = atom<GlobalParams>({
  key: 'params',
  default: fetchParamsSelector,
})

const INVALID_PARAMS = 'Invalid date params in params.json or invalid split point chosen'

type Ticks = number[]
type TimeDomain = [number, number]

export const timeDomainSelector = selector<TimeDomain>({
  key: 'timeDomain',
  get: ({ get }) => {
    const params = get(paramsAtom)

    const minDate = dateStringToSeconds(params.min_date)
    const maxDate = dateStringToSeconds(params.max_date)
    if (Number.isNaN(minDate) || Number.isNaN(maxDate)) {
      throw new TypeError(INVALID_PARAMS)
    }
    return [minDate, maxDate]
  },
})

export const ticksSelector = selector<Ticks>({
  key: 'ticks',
  get: ({ get }) => {
    const timeDomain = get(timeDomainSelector)
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
  },
})
