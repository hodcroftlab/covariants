import { DateTime } from 'luxon'

export const formatProportion = (value: number) => value.toFixed(2)

export const formatInteger = (value: number) => value.toFixed(0)

export const formatDate = (date: number) => DateTime.fromSeconds(date).toISODate()

export function dateStringToSeconds(date: string): number {
  return DateTime.fromFormat(date, 'yyyy-MM-dd').toSeconds()
}
