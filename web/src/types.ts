export interface Mutation {
  gene?: string
  left?: string
  pos: number
  right?: string
  note?: string
}

export type MutationColors = Record<string, string>
