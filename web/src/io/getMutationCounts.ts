import { mapValues, sortBy } from 'lodash'
import type { Mutation } from 'src/types'
import { parseAminoacidMutation } from 'src/components/Common/parseAminoacidMutation'

export interface MutationCountsDatum {
  mut: Mutation
  count: number
  key: string
}

export interface MutationCountsGeneRecord {
  total: number
  counts: MutationCountsDatum[]
}

export interface MutationCountsData {
  S: MutationCountsGeneRecord
  others: MutationCountsGeneRecord
}

export interface MutationCountsJsonEntry {
  mut: string
  count: number
}

export interface MutationCountsJsonGeneRecord {
  total: number
  counts: MutationCountsJsonEntry[]
}

export interface MutationCountsJson {
  S: MutationCountsJsonGeneRecord
  others: MutationCountsJsonGeneRecord
}

export function parseMutationCounts(data: MutationCountsJsonGeneRecord) {
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

export async function getMutationCounts(clusterBuildName: string): Promise<{ result: MutationCountsData | undefined }> {
  try {
    const data = (await import(`../../public/data/mutationCounts/${clusterBuildName}.json`))
      .default as MutationCountsJson // eslint-disable-line unicorn/no-await-expression-member, @typescript-eslint/no-unsafe-member-access
    const result = mapValues(data, (datum) => parseMutationCounts(datum))
    return { result }
  } catch {
    return { result: undefined }
  }
}
