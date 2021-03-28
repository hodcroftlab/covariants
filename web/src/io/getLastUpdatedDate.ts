import { lastUpdated } from 'src/../data/update.json'

import { DateTime } from 'luxon'

export function getLastUpdatedDate() {
  const utc = DateTime.fromISO(lastUpdated, { zone: 'UTC' })
  const local = utc.toLocal()
  return `${local.toJSDate().toISOString().slice(0, 10)}` //  (${local.zoneName})`
}
