import { nameTable } from 'src/../data/nameTable.json'

export interface NameTableEntry {
  name: string
  url?: string | null
}

export interface NameTableDatum {
  clade: string
  lineages: NameTableEntry[]
  others: NameTableEntry[]
}

export function getNameTable(): NameTableDatum[] {
  return nameTable
}

export const NAME_TABLE = getNameTable()
