import { DateTime } from 'luxon'

export const formatProportion = (value: number) => value.toFixed(2)

export const formatDate = (date: number) => DateTime.fromSeconds(date).toISODate()
