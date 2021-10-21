export interface MutationCountsDatum {
  mut: string
  count: number
}

export interface MutationCountsData {
  total: number
  counts: MutationCountsDatum[]
}

export async function getMutationCounts(clusterBuildName: string): Promise<MutationCountsData> {
  return (await import(`../../data/mutationCounts/${clusterBuildName}.json`)).default
}
