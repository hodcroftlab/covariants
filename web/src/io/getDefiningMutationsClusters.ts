/* eslint-disable camelcase */
import { z } from 'zod'
import clustersJson from '../../public/data/definingMutations/definingMutationsClusters.json'
import { FETCHER, useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'
import { Mutation } from 'src/types'

const nucleotideMutationSchema = z.object({
  ref: z.string(),
  pos: z.number(),
  alt: z.string(),
  annotation: z.string().optional(),
})
const aminoAcidMutationSchema = nucleotideMutationSchema.extend({
  gene: z.string(),
})

const codingMutationSchemaRaw = z.object({
  aa_mutation: aminoAcidMutationSchema,
  nuc_mutations: nucleotideMutationSchema.array(),
  notes: z.string().optional(),
})

const codingMutationSchema = codingMutationSchemaRaw.transform(({ aa_mutation, nuc_mutations, notes }) => ({
  aaMutation: aa_mutation,
  nucMutations: nuc_mutations,
  notes,
}))

const silentMutationSchemaRaw = z.object({
  nuc_mutation: nucleotideMutationSchema,
  notes: z.string().optional(),
})

const silentMutationSchema = silentMutationSchemaRaw.transform(({ nuc_mutation, notes }) => ({
  nucMutation: nuc_mutation,
  notes,
}))

const definingMutationsSchemaRaw = z.object({
  reference: z.string(),
  coding: codingMutationSchemaRaw.array(),
  silent: silentMutationSchemaRaw.array(),
})

const definingMutationsSchema = definingMutationsSchemaRaw.transform(({ reference, coding, silent }) => ({
  reference,
  coding: coding.map((codingMutation) => codingMutationSchema.parse(codingMutation)),
  silent: silent.map((silentMutation) => silentMutationSchema.parse(silentMutation)),
}))

const definingMutationClusterSchemaRaw = z.object({
  lineage: z.string(),
  unaliased: z.string().optional(),
  parent: z.string().optional(),
  children: z.array(z.string()).optional(),
  nextstrain_clade: z.string(),
  designation_date: z.string(),
  mutations: definingMutationsSchemaRaw.array(),
})

const definingMutationClusterSchema = definingMutationClusterSchemaRaw.transform(
  ({ nextstrain_clade, designation_date, mutations, ...rest }) => ({
    nextstrainClade: nextstrain_clade,
    designationDate: designation_date,
    mutations: mutations.map((mutation) => definingMutationsSchema.parse(mutation)),
    ...rest,
  }),
)

const definingMutationsClusterListElementSchemaRaw = z.object({
  lineage: z.string(),
  nextstrain_clade: z.string(),
})

const definingMutationsClusterListElementSchema = definingMutationsClusterListElementSchemaRaw.transform(
  ({ lineage, nextstrain_clade }) => ({
    lineage,
    nextstrainClade: nextstrain_clade,
  }),
)

const definingMutationClusterListSchemaRaw = z.object({
  clusters: definingMutationsClusterListElementSchemaRaw.array(),
})

export type NucleotideMutation = z.infer<typeof nucleotideMutationSchema>
export type AminoAcidMutation = z.infer<typeof aminoAcidMutationSchema>
export type CodingMutation = z.infer<typeof codingMutationSchema>
export type SilentMutation = z.infer<typeof silentMutationSchema>
export type DefiningMutations = z.infer<typeof definingMutationsSchema>

export type DefiningMutationCluster = z.infer<typeof definingMutationClusterSchema>
export type DefiningMutationClusterRaw = z.infer<typeof definingMutationClusterSchemaRaw>
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
    '/data/definingMutations/definingMutationsClusters.json',
    definingMutationClusterListSchemaRaw,
  )
  return definingMutationsClusterListElementSchema.array().parse(definingMutationClusters.clusters)
}

export function useDefiningMutationCluster(clusterName: string): DefiningMutationCluster {
  const { data } = useValidatedAxiosQuery<DefiningMutationClusterRaw>(
    `/data/definingMutations/${clusterName}.json`,
    definingMutationClusterSchemaRaw,
  )

  return definingMutationClusterSchema.parse(data)
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
