import { useMemo } from 'react'
import { getTicks, timeDomain } from 'src/io/getParams'
import { DateFilter } from 'src/state/DateFilter'
import { theme } from 'src/theme'
import { adjustTicks } from './adjustTicks'

export type ChartData = {
  week: number
  maxY: number
}[]

export function useDateFilter(dateFilter: DateFilter, data: ChartData, width: number | undefined) {
  const { adjustedTicks, domainX, domainY } = useMemo(() => {
    const ticks = getTicks(dateFilter || timeDomain)
    const adjustedTicks = adjustTicks(ticks, width ?? 0, theme.plot.tickWidthMin).slice(1) // slice ensures first tick is not outside domain
    const domainX = [timeDomain[0], timeDomain[1]]
    const domainY = [0, 1]
    return { adjustedTicks, domainX, domainY }
  }, [width, dateFilter])

  const calculatedDomainY = useMemo(() => {
    if (dateFilter) {
      let max = 0
      data.forEach((d) => {
        if (d.week >= dateFilter[0] && d.week <= dateFilter[1]) {
          max = Math.max(max, d.maxY)
        }
      })
      return [0, max === 0 ? 1 : Math.min(1, max + max * 0.1)]
    }
    return domainY
  }, [data, dateFilter, domainY])

  return {
    domainX: dateFilter || domainX,
    domainY: calculatedDomainY,
    ticks: adjustedTicks,
  }
}
