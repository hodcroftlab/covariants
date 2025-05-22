/* eslint-disable camelcase */
import { z } from 'zod'
import { FETCHER } from 'src/hooks/useAxiosQuery'
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
  aa_mutations: aminoAcidMutationSchema.array(),
  nuc_mutations: nucleotideMutationSchema.array(),
  notes: z.string().optional(),
  contains_reversion: z.boolean().optional(),
})

const codingMutationSchema = codingMutationSchemaRaw.transform(
  ({ aa_mutations, nuc_mutations, notes, contains_reversion }) => ({
    aaMutations: aa_mutations,
    nucMutations: nuc_mutations,
    notes,
    containsReversion: contains_reversion,
  }),
)

const silentMutationSchemaRaw = z.object({
  nuc_mutation: nucleotideMutationSchema,
  notes: z.string().optional(),
  contains_reversion: z.boolean().optional(),
})

const silentMutationSchema = silentMutationSchemaRaw.transform(({ nuc_mutation, notes, contains_reversion }) => ({
  nucMutation: nuc_mutation,
  notes,
  containsReversion: contains_reversion,
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
  pango_lineage: z.string().nullable(),
  nextstrain_clade: z.string(),
  mutations: definingMutationsSchemaRaw.array(),
})

const definingMutationClusterSchema = definingMutationClusterSchemaRaw.transform(
  ({ nextstrain_clade, pango_lineage, mutations }) => ({
    nextstrainClade: nextstrain_clade,
    pangoLineage: pango_lineage,
    mutations: mutations.map((mutation) => definingMutationsSchema.parse(mutation)),
  }),
)

const definingMutationsClusterListElementSchemaRaw = z.object({
  pango_lineage: z.string().nullable(),
  nextstrain_clade: z.string(),
  pango_lineage_unaliased: z.string().nullable(),
  pango_parent: z.string().nullable(),
  pango_children: z.array(z.string()).nullable(),
  designation_date: z.string().nullable(),
  nextstrain_parent: z.string().nullable(),
  nextstrain_children: z.string().array().nullable(),
})

const definingMutationsClusterListElementSchema = definingMutationsClusterListElementSchemaRaw.transform(
  ({
    pango_lineage,
    nextstrain_clade,
    pango_lineage_unaliased,
    pango_parent,
    pango_children,
    designation_date,
    nextstrain_parent,
    nextstrain_children,
  }) => ({
    pangoLineage: pango_lineage,
    nextstrainClade: nextstrain_clade,
    pangoLineageUnaliased: pango_lineage_unaliased,
    pangoParent: pango_parent,
    pangoChildren: pango_children,
    designationDate: designation_date,
    nextstrainParent: nextstrain_parent,
    nextstrainChildren: nextstrain_children,
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

export async function fetchDefiningMutationsCluster(clusterName: string) {
  const data = await FETCHER.validatedFetch(
    `/data/definingMutations/${clusterName}.json`,
    definingMutationClusterSchemaRaw,
  )

  return definingMutationClusterSchema.parse(data)
}
