import updateJson from 'src/../data/update.json'

import { DateTime } from 'luxon'

export function getLastUpdatedDate() {
  const utc = DateTime.fromISO(updateJson.lastUpdated, { zone: 'UTC' })
  const local = utc.toLocal()
  return local.toLocaleString({ dateStyle: 'medium' })
}

export function getLastUpdatedFull() {
  const utc = DateTime.fromISO(updateJson.lastUpdated, { zone: 'UTC' })
  const local = utc.toLocal()
  const s = local.toLocaleString({ timeStyle: 'medium', dateStyle: 'full' })
  return `${s} (${local.zoneName})`
}
