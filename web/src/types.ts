export type SetterOrUpdater<T> = (valOrUpdater: ((currVal: T) => T) | T) => void

export interface Mutation {
  parent?: string
  parentDelimiter?: string
  gene?: string
  left?: string
  pos?: number
  right?: string
  version?: string
  note?: string
}

export type MutationColors = Record<string, string>
