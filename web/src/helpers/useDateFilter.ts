import { useMemo } from 'react'
import { getTicks, timeDomain } from 'src/io/getParams'
import { DateFilter } from 'src/state/DateFilter'
import { theme } from 'src/theme'
import { adjustTicks } from './adjustTicks'

export type ChartData = {
  week: number
  maxY: number
}[]

export function useDateFilter(dateFilter: DateFilter, data: ChartData, width: number | undefined, domainY = [0, 1]) {
  const adjustedTicks = useMemo(() => {
    const ticks = getTicks(dateFilter || timeDomain)
    return adjustTicks(ticks, width ?? 0, theme.plot.tickWidthMin).slice(1) // slice ensures first tick is not outside domain
  }, [width, dateFilter])

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

  return {
    domainX: dateFilter || timeDomain,
    domainY: calculatedDomainY,
    ticks: adjustedTicks,
  }
}
