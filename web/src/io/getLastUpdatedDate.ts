import updateJson from 'src/../data/update.json'

import { DateTime } from 'luxon'

export function getLastUpdatedDate() {
  const utc = DateTime.fromISO(updateJson.lastUpdated, { zone: 'UTC' })
  const local = utc.toLocal()
  return local.toISODate()
}

export function getLastUpdatedFull() {
  const utc = DateTime.fromISO(updateJson.lastUpdated, { zone: 'UTC' })
  const local = utc.toLocal()
  return `${local.toJSDate().toLocaleString()} (${local.zoneName})`
}
