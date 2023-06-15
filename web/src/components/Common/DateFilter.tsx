import React, { useCallback, useEffect, useState } from 'react'

import { Label, Button } from 'reactstrap'
import { useRecoilState } from 'recoil'

import { getWeeks } from 'src/io/getParams'
import { dateFilterAtom } from 'src/state/DateFilter'
import MinMaxSlider from './MinMaxSlider'

// export interface DateFiltersProps {
// }

export function DateFilter() {
  const weeks = React.useMemo(() => getWeeks(), [])

  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(weeks.length - 1)

  const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom)

  useEffect(() => {
    if (minIndex > 0 || maxIndex < weeks.length - 1) {
      setDateFilter(() => [weeks[minIndex], weeks[maxIndex]])
    }
  }, [minIndex, maxIndex, setDateFilter, weeks])

  useEffect(() => {
    if (Array.isArray(dateFilter)) {
      const [min, max] = dateFilter
      const minI = weeks.indexOf(min)
      const maxI = weeks.indexOf(max)
      if (minI !== -1 && minI !== minIndex) {
        setMinIndex(minI)
      }
      if (maxI !== -1 && maxI !== maxIndex) {
        setMaxIndex(maxI)
      }
    } else {
      setMinIndex(0)
      setMaxIndex(weeks.length - 1)
    }
  }, [dateFilter, weeks])

  const reset = useCallback(() => {
    setDateFilter(null)
  }, [setDateFilter])

  return (
    <>
      <Label className="m-0 flex-grow-1 flex-sm-grow-0">
        <span className="mr-sm-2 text-nowrap">{'Date range:'}</span>
        <MinMaxSlider
          className="mt-2 mb-2 m-sm-0"
          min={0}
          max={weeks.length - 1}
          minValue={minIndex}
          maxValue={maxIndex}
          onMinChange={setMinIndex}
          onMaxChange={setMaxIndex}
        />
      </Label>
      <Button className="ml-3" type="button" color="link" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
