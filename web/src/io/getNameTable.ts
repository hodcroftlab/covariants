import nameTableJson from 'src/../data/nameTable.json'

export interface NameTableEntry {
  name: string
  url?: string | null
}

export interface NameTableDatum {
  clade: string
  who: string | null
  lineages: NameTableEntry[]
  others: NameTableEntry[]
}

export function getNameTable(): NameTableDatum[] {
  return nameTableJson.nameTable
}

export const NAME_TABLE = getNameTable()
