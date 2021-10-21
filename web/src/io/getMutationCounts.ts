import type { Mutation } from 'src/types'
import { parseAminoacidMutation } from 'src/components/Common/parseAminoacidMutation'
import { sortBy } from 'lodash'

export interface MutationCountsDatum {
  mut: Mutation
  count: number
  key: string
}

export interface MutationCountsData {
  total: number
  counts: MutationCountsDatum[]
}

export interface MutationCountsJsonEntry {
  mut: string
  count: number
}

export interface MutationCountsJson {
  total: number
  counts: MutationCountsJsonEntry[]
}

export async function getMutationCounts(clusterBuildName: string): Promise<MutationCountsData> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const data = (await import(`../../data/mutationCounts/${clusterBuildName}.json`)).default as MutationCountsJson

  let counts = data.counts.map((mutationCounts) => {
    const mut = parseAminoacidMutation(mutationCounts.mut)
    if (!mut) {
      throw new Error(`Unable to parse mutation: ${mutationCounts.mut}`)
    }
    return { ...mutationCounts, mut, key: mutationCounts.mut }
  })

  counts = sortBy(counts, (count) => -count.count)

  return { ...data, counts }
}
