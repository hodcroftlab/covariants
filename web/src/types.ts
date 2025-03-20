import { SetStateAction } from 'jotai/index'

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

// types needed for jotai setters; copied from https://stackoverflow.com/questions/77346295/typescript-error-cannot-find-name-setatom-when-using-jotai
export type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result
export type SetPrimitiveAtom<primitiveType> = SetAtom<[SetStateAction<primitiveType>], void>
