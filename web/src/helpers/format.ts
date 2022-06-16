import { DateTime, DurationLike } from 'luxon'

export function formatProportion(value: number): string {
  const percentage = value * 100

  if (percentage < 0.1) {
    return `<0.1%`
  }

  const percentageStr = percentage.toFixed(1)
  return `${percentageStr}%`
}

export const formatInteger = (value: number) => value.toFixed(0)

export const formatDate = (date: number) => DateTime.fromSeconds(date).toISODate()

export function formatDateRange(weekTimestamp: number, range: DurationLike) {
  const begin = DateTime.fromMillis(weekTimestamp)
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
