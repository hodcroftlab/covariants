/* eslint-disable camelcase */
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

export const timeDomain = getTimeDomain()
