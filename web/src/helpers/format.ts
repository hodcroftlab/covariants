import { DateTime, Duration, DurationObject } from 'luxon'

export const formatProportion = (value: number) => value.toFixed(2)

export const formatInteger = (value: number) => value.toFixed(0)

export const formatDate = (date: number) => DateTime.fromSeconds(date).toISODate()

export function formatDateRange(weekTimestamp: number, range: Duration | DurationObject) {
  const begin = DateTime.fromSeconds(weekTimestamp)
  const end = begin.plus(range)
  return `${begin.toFormat('dd MMM yyyy')} - ${end.toFormat('dd MMM yyyy')}`
}

export function formatDateWeekly(weekTimestamp: number) {
  return formatDateRange(weekTimestamp, { weeks: 1 })
}

export function formatDateBiweekly(weekTimestamp: number) {
  return formatDateRange(weekTimestamp, { weeks: 2 })
}

export const formatDateHumanely = (date: number) => DateTime.fromSeconds(date).toFormat('MMM yyyy').replace(' ', '\n')

export function dateStringToSeconds(date: string): number {
  return DateTime.fromFormat(date, 'yyyy-MM-dd').toSeconds()
}
