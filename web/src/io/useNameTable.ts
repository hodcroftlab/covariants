import { z } from 'zod'
import { useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

const nameTableEntry = z.object({
  name: z.string(),
  url: z.string().optional().nullable(),
})

const nameTableDatum = z.object({
  clade: z.string(),
  who: z.string().nullable(),
  lineages: nameTableEntry.array(),
  others: nameTableEntry.array(),
})

const nameTable = z.object({
  nameTable: nameTableDatum.array(),
})

export type NameTableEntry = z.infer<typeof nameTableEntry>
export type NameTableDatum = z.infer<typeof nameTableDatum>
export type NameTable = z.infer<typeof nameTable>

export function useNameTable(): NameTableDatum[] {
  const { data: table } = useValidatedAxiosQuery<NameTable>('/data/nameTable.json', nameTable)
  return table.nameTable
}
