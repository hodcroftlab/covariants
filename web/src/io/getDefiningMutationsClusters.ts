import { z } from 'zod'
import clustersJson from '../../public/data/definingMutations/definingMutationClusters.json'
import { FETCHER, useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'
import { Mutation } from 'src/types'

const mutationReadSchema = z.object({
  ref: z.string(),
  alt: z.string(),
  annotation: z.string().optional(),
})
const nucleotideMutationSchema = mutationReadSchema.extend({ pos: z.number() })
const aminoAcidMutationReadSchema = mutationReadSchema.extend({ nucPos: z.array(z.number()) })
const aminoAcidMutationSchema = aminoAcidMutationReadSchema.extend({
  gene: z.string(),
  pos: z.number(),
  nucMuts: z.array(nucleotideMutationSchema),
})

const frameshiftsSchema = z.record(z.record(aminoAcidMutationReadSchema))

const definingMutationsSchema = z.object({
  nuc: z.record(mutationReadSchema),
  aa: z.record(z.record(aminoAcidMutationReadSchema)),
  frameshifts: frameshiftsSchema,
})

const definingMutationClusterSchema = z.object({
  lineage: z.string(),
  unaliased: z.string().optional(),
  parent: z.string().optional(),
  children: z.array(z.string()).optional(),
  nextstrainClade: z.string(),
  frameShifts: z.array(z.string()).optional(),
  designationDate: z.string(),
  designationIssue: z.string().optional(),
  mutations: z.record(definingMutationsSchema),
})

const definingMutationsClusterListElementSchema = z.object({
  lineage: z.string(),
  nextstrainClade: z.string(),
})

const definingMutationClusterListSchema = z.object({
  clusters: definingMutationsClusterListElementSchema.array(),
})

export type NucleotideMutation = z.infer<typeof nucleotideMutationSchema>
export type AminoAcidMutation = z.infer<typeof aminoAcidMutationSchema>
export type DefiningMutations = z.infer<typeof definingMutationsSchema>

export type DefiningMutationCluster = z.infer<typeof definingMutationClusterSchema>
export type DefiningMutationListElement = z.infer<typeof definingMutationsClusterListElementSchema>

export function getMutationFromNucleotideMutation(nucleotideMutation: NucleotideMutation): Mutation {
  return {
    pos: nucleotideMutation.pos,
    left: nucleotideMutation.ref,
    right: nucleotideMutation.alt,
  }
}

export function getMutationFromAminoAcidMutation(aminoAcidMutation: AminoAcidMutation): Mutation {
  return {
    pos: aminoAcidMutation.pos,
    left: aminoAcidMutation.ref,
    right: aminoAcidMutation.alt,
    gene: aminoAcidMutation.gene,
  }
}

export async function fetchDefiningMutationClusters() {
  const definingMutationClusters = await FETCHER.validatedFetch(
    '/data/definingMutations/definingMutationClusters.json',
    definingMutationClusterListSchema,
  )
  return definingMutationClusters.clusters
}

export function useDefiningMutationCluster(clusterName: string): DefiningMutationCluster {
  const { data } = useValidatedAxiosQuery<DefiningMutationCluster>(
    `/data/definingMutations/${clusterName}.json`,
    definingMutationClusterSchema,
  )

  return data
}

export function getDefiningMutationClustersFromDisk(): DefiningMutationListElement[] {
  const definingMutationClusters = definingMutationsClusterListElementSchema.array().safeParse(clustersJson.clusters)
  if (!definingMutationClusters.success) {
    throw new Error(`Could not read defining mutation clusters from disk. Error: ${definingMutationClusters.error}`)
  }

  return definingMutationClusters.data
}

export function getLineages(clusters: DefiningMutationListElement[]) {
  return clusters.map((cluster) => cluster.lineage)
}

export function getClades(clusters: DefiningMutationListElement[]) {
  return clusters
    .filter((cluster) => cluster.nextstrainClade !== 'recombinant')
    .map((cluster) => cluster.nextstrainClade)
}
