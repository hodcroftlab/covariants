import { DateTime } from 'luxon'
import { z } from 'zod'
import { useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

const update = z.object({
  lastUpdated: z.string(),
})

export type Update = z.infer<typeof update>

export function useLastUpdated() {
  const { data: lastUpdated } = useValidatedAxiosQuery<Update>('/data/update.json', update)
  const utc = DateTime.fromISO(lastUpdated.lastUpdated, { zone: 'UTC' })
  const local = utc.toLocal()
  const date = local.toLocaleString({ dateStyle: 'medium' })
  const s = local.toLocaleString({ timeStyle: 'medium', dateStyle: 'full' })
  const full = `${s} (${local.zoneName})`
  return { date, full }
}
