import { DateTime } from 'luxon'
import { z } from 'zod'
import { useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

const updateSchema = z.object({
  lastUpdated: z.string(),
})

export type Update = z.infer<typeof updateSchema>

export function useLastUpdated() {
  const { data: lastUpdated } = useValidatedAxiosQuery<Update>('/data/update.json', updateSchema)
  const utc = DateTime.fromISO(lastUpdated.lastUpdated, { zone: 'UTC' })
  const local = utc.toLocal()
  const date = local.toLocaleString({ dateStyle: 'medium' })
  const s = local.toLocaleString({ timeStyle: 'medium', dateStyle: 'full' })
  const full = `${s} (${local.zoneName})`
  return { date, full }
}
