import React, { useEffect, useState } from 'react'

import { FormGroup, Label, Button } from 'reactstrap'
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
    setDateFilter(() => [weeks[minIndex], weeks[maxIndex]])
  }, [minIndex, maxIndex])

  useEffect(() => {
    if (dateFilter !== null) {
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
  }, [dateFilter])

  return (
    <FormGroup inline>
      <Label>
        <span className="mr-2">{'Date range:'}</span>
        <MinMaxSlider
          min={0}
          max={weeks.length - 1}
          minValue={minIndex}
          maxValue={maxIndex}
          onMinChange={setMinIndex}
          onMaxChange={setMaxIndex}
        />
      </Label>
      <Button
        className="ml-3"
        type="button"
        color="link"
        onClick={() => {
          setDateFilter(() => null)
        }}
      >
        Reset
      </Button>
    </FormGroup>
  )
}
