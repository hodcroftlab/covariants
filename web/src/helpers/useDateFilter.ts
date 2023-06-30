import { useMemo } from 'react'
import { getTicks, timeDomain, weeks } from 'src/io/getParams'
import { DateFilter } from 'src/state/DateFilter'
import { theme } from 'src/theme'
import { Interval } from 'luxon'
import { adjustTicks } from './adjustTicks'
import { formatDateHumanely, formatWeekHumanely } from './format'

export type ChartData = {
  week: number
  maxY: number
}[]

export function useDateFilter(dateFilter: DateFilter, data: ChartData, width: number | undefined, domainY = [0, 1]) {
  const calculatedDomainX = useMemo(() => {
    if (dateFilter) {
      if (dateFilter[0] === dateFilter[1]) {
        const i = weeks.indexOf(dateFilter[0])
        if (i === -1) return timeDomain
        if (i === 0) return [weeks[0], weeks[1]] as [number, number]
        return [weeks[i - 1], weeks[i]] as [number, number]
      }
      return dateFilter
    }
    return timeDomain
  }, [dateFilter])

  const calculatedDomainY = useMemo(() => {
    if (dateFilter) {
      let max = 0
      data.forEach((d) => {
        if (d.week >= dateFilter[0] && d.week <= dateFilter[1]) {
          max = Math.max(max, d.maxY)
        }
      })
      const maxY = max === 0 ? domainY[1] : Math.min(domainY[1], max + max * 0.1)
      return [0, maxY > 1 ? Math.round(maxY) : maxY]
    }
    return domainY
  }, [data, dateFilter, domainY])

  const ticks = useMemo(() => getTicks(calculatedDomainX), [calculatedDomainX])

  const adjustedTicks = useMemo(() => {
    const adjustedTicks = adjustTicks(ticks, width ?? 0, theme.plot.tickWidthMin)
    if (adjustedTicks.length > 1) return adjustedTicks.slice(1) // slice ensures first tick is not outside domain
    return [calculatedDomainX[0]]
  }, [width, ticks, calculatedDomainX])

  return {
    domainX: calculatedDomainX,
    domainY: calculatedDomainY,
    ticks: adjustedTicks,
  }
}
