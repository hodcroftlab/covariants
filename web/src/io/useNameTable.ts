import { z } from 'zod'
import { useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

const nameTableEntrySchema = z.object({
  name: z.string(),
  url: z.string().optional().nullable(),
})

const nameTableDatumSchema = z.object({
  clade: z.string(),
  who: z.string().nullable(),
  lineages: nameTableEntrySchema.array(),
  others: nameTableEntrySchema.array(),
})

const nameTableSchema = z.object({
  nameTable: nameTableDatumSchema.array(),
})

export type NameTableEntry = z.infer<typeof nameTableEntrySchema>
export type NameTableDatum = z.infer<typeof nameTableDatumSchema>
export type NameTable = z.infer<typeof nameTableSchema>

export function useNameTable(): NameTableDatum[] {
  const { data: table } = useValidatedAxiosQuery<NameTable>('/data/nameTable.json', nameTableSchema)
  return table.nameTable
}
