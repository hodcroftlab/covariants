import { z } from 'zod'
import { FETCHER } from 'src/hooks/useAxiosQuery'

export interface GlobalParams {
  min_date: string
  max_date: string
}

const globalParamsSchema = z.object({
  // eslint-disable-next-line camelcase
  min_date: z.string(),
  // eslint-disable-next-line camelcase
  max_date: z.string(),
})

export async function fetchParams() {
  return await FETCHER.validatedFetch('/data/params.json', globalParamsSchema)
}
